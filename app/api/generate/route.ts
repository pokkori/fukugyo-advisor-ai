import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const APP_ID = "fukugyo";
const FREE_LIMIT = 3;

const rateLimit = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) { rateLimit.set(ip, { count: 1, resetAt: now + 60000 }); return true; }
  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "リクエストが多すぎます。しばらく待ってから再試行してください。" }, { status: 429 });
  }

  const { skills, hoursPerWeek, targetIncome, hasExperience } = await req.json();
  if (!skills?.trim()) {
    return NextResponse.json({ error: "スキルを入力してください" }, { status: 400 });
  }

  const email = req.cookies.get("user_email")?.value;
  let isPremium = false;

  if (email) {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from("subscriptions")
      .select("status, current_period_end")
      .eq("email", email)
      .eq("app_id", APP_ID)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
    if (data?.status === "active") {
      isPremium = data.current_period_end
        ? new Date(data.current_period_end) > new Date()
        : true;
    }
  }

  if (!isPremium && req.cookies.get("stripe_premium")?.value === "1") isPremium = true;

  if (!isPremium) {
    const supabase = getSupabaseAdmin();
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const key = `fukugyo:${ip}`;
    const { data: usageData } = await supabase
      .from("usage_counts")
      .select("count")
      .eq("key", key)
      .single();
    const count = usageData?.count ?? 0;
    if (count >= FREE_LIMIT) {
      return NextResponse.json({ error: "Free limit reached" }, { status: 429 });
    }
    await supabase.from("usage_counts").upsert(
      { key, count: count + 1, updated_at: new Date().toISOString() },
      { onConflict: "key" }
    );
  }

  const prompt = `あなたは副業コンサルタントです。以下の情報を持つ人に最適な副業アドバイスを作成してください。

スキル・経験: ${skills}
週に使える時間: ${hoursPerWeek}
月の目標収入: ${targetIncome}
副業経験: ${hasExperience}

以下の4セクションで回答してください。各セクションは「---」で区切ること。

## おすすめ副業
この人に最も適した副業を3つ、理由と月収見込みと一緒に提示してください。実現可能性の高い順に並べてください。

---

## 30日ロードマップ
最もおすすめの副業で、今日から30日間で最初の収益を得るための具体的なアクションプランを作成してください。
Week 1、Week 2、Week 3、Week 4に分けて書いてください。

---

## 収益化戦略
- 適切な単価設定（相場と理由）
- 最初のクライアント/顧客を獲得する具体的な方法
- 月${targetIncome}を安定して稼ぐための戦略

---

## SNS集客戦略
- 使うべきSNS（X/Instagram/クラウドワークス等）と理由
- 最初の1ヶ月で投稿すべきコンテンツの種類と頻度
- プロフィールの書き方のポイント
- バズりやすいネタの具体例3つ`;

  try {
    const client = getClient();
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });
    const result = message.content[0].type === "text" ? message.content[0].text : "";
    return NextResponse.json({ result });
  } catch {
    return NextResponse.json({ error: "AI処理中にエラーが発生しました" }, { status: 500 });
  }
}
