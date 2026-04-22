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
      await navigator.clipboard.writeText(text);
      alert('已複製到剪貼簿！');
    }
  };

  return (
    <div className="space-y-6">
      {/* 問題回顧 */}
      <div className="chinese-card p-6">
        <p className="text-sm text-gray-500 mb-1">你的問題</p>
        <p className="text-lg font-bold text-gray-900">{question}</p>
      </div>

      {/* 卦象顯示區 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 本卦 */}
        <div className="result-card">
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-1 bg-red-700 text-white rounded-full text-sm font-bold mb-3">
              本卦
            </span>
            <h2 className="text-3xl font-bold text-gray-900" style={{fontFamily: "'Ma Shan Zheng', cursive"}}>
              {originalHexagram.name}
            </h2>
          </div>

          <div className="hexagram-display mb-4">
            {originalHexagram.yaoPattern.split('').reverse().map((yao, idx) => {
              const isMoving = movingYao.includes(6 - idx);
              const isYang = yao === '1';
              return (
                <div key={idx} className="w-full mb-2">
                  <div className={`${isYang ? 'yao-yang' : 'yao-yin'} ${isMoving ? 'yao-active' : ''}`} style={{width: '200px'}}>
                    {isMoving && <span className="moving-yao-mark ml-2">★</span>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="text-gray-800 leading-relaxed text-lg">
              {originalMeaning}
            </p>
          </div>

          <p className="text-sm text-gray-500 mt-3 text-center">
            {originalHexagram.description}
          </p>
        </div>

        {/* 之卦 */}
        <div className="result-card">
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-1 bg-amber-600 text-white rounded-full text-sm font-bold mb-3">
              之卦
            </span>
            <h2 className="text-3xl font-bold text-gray-900" style={{fontFamily: "'Ma Shan Zheng', cursive"}}>
              {changedHexagram.name}
            </h2>
          </div>

          <div className="hexagram-display mb-4">
            {changedHexagram.yaoPattern.split('').reverse().map((yao, idx) => {
              const isYang = yao === '1';
              return (
                <div key={idx} className="w-full mb-2">
                  <div className={`${isYang ? 'yao-yang' : 'yao-yin'}`} style={{width: '200px'}}></div>
                </div>
              );
            })}
          </div>

          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="text-gray-800 leading-relaxed text-lg">
              {changedMeaning}
            </p>
          </div>

          <p className="text-sm text-gray-500 mt-3 text-center">
            {changedHexagram.description}
          </p>
        </div>
      </div>

      {/* 動爻解釋 */}
      {movingYao.length > 0 && (
        <div className="chinese-card p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4" style={{fontFamily: "'Ma Shan Zheng', cursive"}}>
            動爻解釋
          </h3>
          <div className="space-y-3">
            {movingYao.map(pos => {
              const yao = result.originalYao[pos - 1];
              return (
                <div key={pos} className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="font-bold text-red-700 mb-1">
                    第{pos}爻（{yao.value === 1 ? '陽' : '陰'}動）
                  </p>
                  <p className="text-gray-700 text-sm">
                    {getYaoExplanation(pos, yao.value === 1)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 操作按鈕 */}
      <div className="flex gap-4">
        <button
          onClick={handleShare}
          className="btn-secondary flex-1"
        >
          📤 分享結果
        </button>
        <button
          onClick={onReset}
          className="btn-chinese flex-1"
        >
          🔄 重新占卜
        </button>
      </div>

      {/* 免責聲明 */}
      <div className="text-center text-xs text-gray-500 mt-8 p-4">
        <p>
          💡 占卜結果僅供參考，人生掌握在自己手中。
        </p>
      </div>
    </div>
  );
}
