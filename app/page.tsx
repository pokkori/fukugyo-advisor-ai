"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [loading, setLoading] = useState(false);

  async function startCheckout() {
    setLoading(true);
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="inline-block bg-amber-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-6">
          AI × 副業診断
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
          あなたに合った副業、<br />
          <span className="text-amber-400">AIが診断</span>
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          スキル・時間・目標金額を入力するだけで、最適な副業ロードマップを生成。
          競合調査・収益化ステップ・SNS集客戦略まで完全自動生成します。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/tool"
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all"
          >
            無料で試す（3回）
          </Link>
          <button
            onClick={startCheckout}
            disabled={loading}
            className="bg-white text-slate-900 hover:bg-slate-100 font-bold py-4 px-8 rounded-xl text-lg transition-all disabled:opacity-50"
          >
            {loading ? "処理中..." : "¥980/月で無制限に使う"}
          </button>
        </div>
        <p className="text-slate-400 text-sm">クレジットカード不要で3回無料 • いつでもキャンセル可能</p>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-black text-center mb-12">こんなことができます</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "🎯",
              title: "あなたに最適な副業を診断",
              desc: "スキルと使える時間から、最もROIの高い副業を3つ提案。月収見込みと理由も明示します。",
            },
            {
              icon: "📅",
              title: "30日間ロードマップ",
              desc: "今日から始められる具体的なアクションプラン。Week 1から4まで何をすべきかが明確になります。",
            },
            {
              icon: "💰",
              title: "収益化戦略まで自動生成",
              desc: "適切な単価設定・最初のクライアント獲得方法・月の目標達成戦略まで一気通貫で生成。",
            },
          ].map((f) => (
            <div key={f.title} className="bg-slate-800 rounded-2xl p-6">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-slate-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-black text-center mb-4">副業AIを使うメリット</h2>
        <p className="text-slate-400 text-center mb-10">AIを使って副業をしている人は、使っていない人の<span className="text-amber-400 font-bold">1.84倍の収入</span>を得ています</p>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { stat: "3回", desc: "無料で診断できます" },
            { stat: "4タブ", desc: "副業診断・ロードマップ・収益化・SNS戦略" },
            { stat: "2分", desc: "入力から診断結果まで" },
            { stat: "¥980", desc: "月額。弁護士や副業スクールより圧倒的に安い" },
          ].map((s) => (
            <div key={s.stat} className="bg-slate-800 rounded-xl p-5 flex items-center gap-4">
              <div className="text-3xl font-black text-amber-400">{s.stat}</div>
              <div className="text-slate-300">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-black mb-12">シンプルな料金体系</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <h3 className="text-xl font-bold mb-2">無料プラン</h3>
            <div className="text-4xl font-black mb-4">¥0</div>
            <ul className="text-slate-300 space-y-2 mb-6 text-left">
              <li>✓ 3回まで無料</li>
              <li>✓ 4タブ診断結果</li>
              <li>✗ 回数制限あり</li>
            </ul>
            <Link href="/tool" className="block bg-slate-700 hover:bg-slate-600 font-bold py-3 px-6 rounded-xl transition-all">
              無料で試す
            </Link>
          </div>
          <div className="bg-amber-500 rounded-2xl p-8">
            <div className="inline-block bg-white text-amber-600 text-xs font-black px-3 py-1 rounded-full mb-3">おすすめ</div>
            <h3 className="text-xl font-bold mb-2">プレミアム</h3>
            <div className="text-4xl font-black mb-4">¥980<span className="text-lg font-normal">/月</span></div>
            <ul className="space-y-2 mb-6 text-left">
              <li>✓ 無制限に診断できる</li>
              <li>✓ 4タブ詳細結果</li>
              <li>✓ いつでもキャンセル</li>
            </ul>
            <button
              onClick={startCheckout}
              disabled={loading}
              className="w-full bg-white text-amber-600 hover:bg-amber-50 font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50"
            >
              {loading ? "処理中..." : "今すぐ始める"}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <div className="flex justify-center gap-6 mb-4">
          <Link href="/legal" className="hover:text-white">特定商取引法</Link>
          <Link href="/privacy" className="hover:text-white">プライバシーポリシー</Link>
          <Link href="/terms" className="hover:text-white">利用規約</Link>
        </div>
        <p>© 2025 AI副業アドバイザー</p>
      </footer>
    </main>
  );
}
