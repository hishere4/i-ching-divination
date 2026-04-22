'use client';

import { getMeaning, getYaoExplanation } from '@/lib/calculator';
import type { DivinationResult } from '@/lib/calculator';

interface Props {
  result: DivinationResult;
  onReset: () => void;
}

export default function ResultDisplay({ result, onReset }: Props) {
  const { originalHexagram, changedHexagram, movingYao, category, question } = result;

  const originalMeaning = getMeaning(originalHexagram, category);
  const changedMeaning = getMeaning(changedHexagram, category);

  const handleShare = async () => {
    const text = `【易經占卜】\n問：${question}\n\n本卦：${originalHexagram.name}\n${originalMeaning}\n\n之卦：${changedHexagram.name}\n${changedMeaning}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '易經占卜結果',
          text: text,
        });
      } catch {
        // 用戶取消分享
      }
    } else {
      // 複製到剪貼簿
      await navigator.clipboard.writeText(text);
      alert('已複製到剪貼簿！');
    }
  };

  return (
    <div className="space-y-6">
      {/* 問題回顧 */}
      <div className="bg-white rounded-2xl shadow-lg border border-ink-200 p-6">
        <p className="text-sm text-ink-500 mb-1">你的問題</p>
        <p className="text-lg font-bold text-ink-800">{question}</p>
      </div>

      {/* 本卦 */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-gold-300 p-8">
        <div className="text-center mb-6">
          <span className="inline-block px-4 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-bold mb-3">
            本卦
          </span>
          <h2 className="text-3xl font-serif font-bold text-ink-900">
            {originalHexagram.name}
          </h2>
          <p className="text-ink-500 mt-1">{originalHexagram.symbol}</p>
        </div>

        <div className="bg-parchment-50 rounded-xl p-6">
          <p className="text-ink-700 leading-relaxed text-lg">
            {originalMeaning}
          </p>
        </div>

        <p className="text-sm text-ink-400 mt-4 text-center">
          {originalHexagram.description}
        </p>
      </div>

      {/* 動爻 */}
      {movingYao.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-ink-200 p-6">
          <h3 className="text-lg font-bold text-ink-800 mb-4">
            動爻解釋
          </h3>
          <div className="space-y-3">
            {movingYao.map(pos => {
              const yao = result.originalYao[pos - 1];
              return (
                <div key={pos} className="p-4 bg-parchment-50 rounded-lg">
                  <p className="font-bold text-ink-700 mb-1">
                    第{pos}爻（{yao.value === 1 ? '陽' : '陰'}動）
                  </p>
                  <p className="text-ink-600 text-sm">
                    {getYaoExplanation(pos, yao.value === 1)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 之卦 */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-ink-300 p-8">
        <div className="text-center mb-6">
          <span className="inline-block px-4 py-1 bg-ink-100 text-ink-600 rounded-full text-sm font-bold mb-3">
            之卦
          </span>
          <h2 className="text-3xl font-serif font-bold text-ink-900">
            {changedHexagram.name}
          </h2>
          <p className="text-ink-500 mt-1">{changedHexagram.symbol}</p>
        </div>

        <div className="bg-parchment-50 rounded-xl p-6">
          <p className="text-ink-700 leading-relaxed text-lg">
            {changedMeaning}
          </p>
        </div>

        <p className="text-sm text-ink-400 mt-4 text-center">
          {changedHexagram.description}
        </p>
      </div>

      {/* 操作按鈕 */}
      <div className="flex gap-4">
        <button
          onClick={handleShare}
          className="flex-1 py-3 bg-gold-400 text-ink-900 rounded-xl font-bold hover:bg-gold-500 transition-colors"
        >
          📤 分享結果
        </button>
        <button
          onClick={onReset}
          className="flex-1 py-3 bg-ink-800 text-parchment-100 rounded-xl font-bold hover:bg-ink-700 transition-colors"
        >
          🔄 重新占卜
        </button>
      </div>

      {/* 免責聲明 */}
      <div className="text-center text-xs text-ink-400 mt-8">
        <p>
          💡 占卜結果僅供參考，人生掌握在自己手中。
        </p>
      </div>
    </div>
  );
}
