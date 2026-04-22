'use client';

import { getMeaning, getYaoExplanation, generateConclusion } from '@/lib/calculator';
import type { DivinationResult } from '@/lib/calculator';

interface Props {
  result: DivinationResult;
  onReset: () => void;
}

export default function ResultDisplay({ result, onReset }: Props) {
  if (!result || !result.originalHexagram || !result.changedHexagram) {
    return (
      <div className="chinese-card p-8 text-center">
        <p className="text-red-600 mb-4">⚠️ 數據加載失敗，請重新占卜</p>
        <button onClick={onReset} className="btn-chinese">
          🔄 重新開始
        </button>
      </div>
    );
  }

  const { originalHexagram, changedHexagram, movingYao, category, question } = result;

  const originalMeaning = getMeaning(originalHexagram, category);
  const changedMeaning = getMeaning(changedHexagram, category);
  const conclusion = generateConclusion(originalHexagram, changedHexagram, movingYao, category, question, result.originalYao);

  const handleShare = async () => {
    const text = `【妙算申帷幄】\n問：${question}\n\n本卦：${originalHexagram.name}\n${originalMeaning}\n\n之卦：${changedHexagram.name}\n${changedMeaning}\n\n${conclusion}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '妙算申帷幄 - 占卜結果',
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

  // 渲染爻線（無★）
  const renderYaoLines = (pattern: string, highlightMoving: boolean = false) => {
    return pattern.split('').reverse().map((yao, idx) => {
      const isYang = yao === '1';
      const isMoving = highlightMoving && movingYao.includes(6 - idx);
      return (
        <div key={idx} className="w-full mb-2 flex justify-center">
          <div className={`${isYang ? 'yao-yang' : 'yao-yin'} ${isMoving ? 'yao-active' : ''}`} style={{width: '120px'}}></div>
        </div>
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* 問題回顧 */}
      <div className="chinese-card p-6">
        <p className="text-sm text-amber-700 mb-1">你的問題</p>
        <p className="text-lg font-bold text-gray-900">{question || '未輸入問題'}</p>
      </div>

      {/* 本卦 */}
      <div className="result-card">
        <div className="text-center mb-4">
          <span className="inline-block px-4 py-1 bg-gray-800 text-white rounded-full text-sm font-bold mb-3">
            本卦
          </span>
          <h2 className="text-3xl font-bold text-gray-900" style={{fontFamily: "'Ma Shan Zheng', cursive"}}>
            {originalHexagram.name || '未知'}
          </h2>
        </div>

        <div className="hexagram-display mb-4 flex flex-col items-center">
          {originalHexagram.pattern ? renderYaoLines(originalHexagram.pattern, true) : <p>無法顯示卦象</p>}
        </div>

        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-gray-800 leading-relaxed text-lg">
            {originalMeaning || '暫無解釋'}
          </p>
        </div>

        <p className="text-sm text-gray-500 mt-3 text-center">
          {originalHexagram.description || ''}
        </p>
      </div>

      {/* 變卦（動爻解釋）*/}
      {movingYao && movingYao.length > 0 && (
        <div className="chinese-card p-6">
          <h3 className="text-xl font-bold text-red-700 mb-4 text-center" style={{fontFamily: "'Ma Shan Zheng', cursive"}}>
            變卦
          </h3>
          <p className="text-center text-sm text-gray-600 mb-4">
            共 {movingYao.length} 個動爻，局面正在轉變
          </p>
          <div className="space-y-3">
            {movingYao.map(pos => {
              const yao = result.originalYao?.[pos - 1];
              if (!yao) return null;
              return (
                <div key={pos} className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="font-bold text-red-700 mb-1">
                    第{pos}爻（{yao.value === 1 ? '陽' : '陰'}動 → {yao.value === 1 ? '陰' : '陽'}）
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

      {/* 之卦 */}
      <div className="result-card">
        <div className="text-center mb-4">
          <span className="inline-block px-4 py-1 bg-amber-600 text-white rounded-full text-sm font-bold mb-3">
            之卦
          </span>
          <h2 className="text-3xl font-bold text-gray-900" style={{fontFamily: "'Ma Shan Zheng', cursive"}}>
            {changedHexagram.name || '未知'}
          </h2>
        </div>

        <div className="hexagram-display mb-4 flex flex-col items-center">
          {changedHexagram.pattern ? renderYaoLines(changedHexagram.pattern) : <p>無法顯示卦象</p>}
        </div>

        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-gray-800 leading-relaxed text-lg">
            {changedMeaning || '暫無解釋'}
          </p>
        </div>

        <p className="text-sm text-gray-500 mt-3 text-center">
          {changedHexagram.description || ''}
        </p>
      </div>

      {/* 結論 */}
      <div className="chinese-card p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center" style={{fontFamily: "'Ma Shan Zheng', cursive"}}>
          結論
        </h3>
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-5 border-2 border-amber-300">
          <div className="text-gray-800 leading-relaxed whitespace-pre-line text-base">
            {conclusion}
          </div>
        </div>
      </div>

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
      <div className="text-center text-xs text-gray-500 mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="mb-1">
          💡 本活動以文化體驗為主，占卜結果僅供參考，並非對未來作出絕對預測。
        </p>
        <p>
          人生掌握在自己手中，請理性看待占卜結果。
        </p>
      </div>
    </div>
  );
}
