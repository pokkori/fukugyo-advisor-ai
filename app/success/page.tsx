"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

function Confetti() {
  const [particles, setParticles] = useState<{ id: number; left: number; delay: number; color: string; size: number }[]>([]);

  useEffect(() => {
    const colors = ["#f59e0b", "#f97316", "#22c55e", "#3b82f6", "#8b5cf6", "#ef4444"];
    const ps = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 6,
    }));
    setParticles(ps);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti"
          style={{
            left: `${p.left}%`,
            top: -20,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti 3s ease-in forwards;
        }
      `}</style>
    </div>
  );
}

function SuccessContent() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="max-w-lg w-full mx-auto px-4">
        <div className="text-center mb-10">
          <div className="text-7xl mb-4">&#x1F4B0;</div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">プレミアム会員へようこそ！</h1>
          <p className="text-gray-500">副業アドバイザーAIの全機能が使えます</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-amber-800 mb-3 text-sm">あなたの特典</h2>
          <ul className="space-y-2 text-sm text-amber-900">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5">&#10003;</span>
              AIによる副業診断が無制限
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5">&#10003;</span>
              あなたに最適な副業提案
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5">&#10003;</span>
              具体的な収益化ステップ
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5">&#10003;</span>
              リスク分析・市場調査レポート
            </li>
          </ul>
        </div>

        <div className="space-y-4 mb-8">
          <h2 className="font-bold text-gray-800 text-center text-sm">副業成功への3ステップ</h2>

          <Link href="/tool" className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:border-amber-400 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0 group-hover:bg-amber-400">1</div>
            <div className="flex-1">
              <p className="font-bold text-gray-800 text-sm">あなたに合う副業を診断</p>
              <p className="text-xs text-gray-400">スキル・時間・目標から最適な副業を提案</p>
            </div>
            <span className="text-gray-300 group-hover:text-amber-500 transition-colors">&rarr;</span>
          </Link>

          <Link href="/tool" className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:border-amber-400 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0 group-hover:bg-amber-400">2</div>
            <div className="flex-1">
              <p className="font-bold text-gray-800 text-sm">収益化プランを確認</p>
              <p className="text-xs text-gray-400">具体的な行動ステップと収益目標</p>
            </div>
            <span className="text-gray-300 group-hover:text-amber-500 transition-colors">&rarr;</span>
          </Link>

          <Link href="/tool" className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:border-amber-400 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0 group-hover:bg-amber-400">3</div>
            <div className="flex-1">
              <p className="font-bold text-gray-800 text-sm">条件を変えて再診断</p>
              <p className="text-xs text-gray-400">異なる条件で比較して最良の選択を</p>
            </div>
            <span className="text-gray-300 group-hover:text-amber-500 transition-colors">&rarr;</span>
          </Link>
        </div>

        <div className="text-center bg-gray-50 rounded-xl p-4 border border-gray-100">
          <p className="text-xs text-gray-500 mb-1">副業の一歩を踏み出すために</p>
          <p className="text-sm font-bold text-gray-700">このサイトをブックマークしておきましょう</p>
        </div>
      </div>
    </>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Suspense fallback={<div className="text-gray-400">読み込み中...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
