'use client';

import { getMeaning, generateConclusion, generateFinalSummary } from '@/lib/calculator';
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

  // 渲染爻線（無★）- 從初爻到上爻（與立卦順序一致）
  const renderYaoLines = (pattern: string, highlightMoving: boolean = false) => {
    return pattern.split('').map((yao, idx) => {
      const isYang = yao === '1';
      const position = idx + 1; // 1=初爻, 2=二爻, ..., 6=上爻
      const isMoving = highlightMoving && movingYao.includes(position);
      return (
        <div key={idx} className="w-full mb-2 flex justify-center">
          <div className={`${isYang ? 'yao-yang' : 'yao-yin'} ${isMoving ? 'yao-active' : ''}`} style={{width: '120px'}}></div>
        </div>
      );
    });
  };

  // 獲取爻位名稱
  const getYaoName = (position: number): string => {
    const names = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'];
    return names[position - 1] || '';
  };

  // 獲取爻的顯示名稱
  const getYaoDisplayName = (value: number, isMoving: boolean): string => {
    if (isMoving) {
      return value === 1 ? '老陽' : '老陰';
    }
    return value === 1 ? '少陽' : '少陰';
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

      {/* 結論標題 */}
      <div className="text-center py-4">
        <h3 className="text-2xl font-bold text-gray-900" style={{fontFamily: "'Ma Shan Zheng', cursive"}}>
          結論
        </h3>
        <div className="w-24 h-1 bg-amber-500 mx-auto mt-2 rounded-full"></div>
      </div>

      {/* 你的卦象 */}
      <div className="chinese-card p-5 mb-4">
        <h4 className="text-lg font-bold text-gray-900 mb-3">【你的卦象】</h4>
        <div className="space-y-1 text-sm">
          {result.originalYao.map((yao, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-amber-700">•</span>
              <span className="font-medium">{getYaoName(yao.position)}：</span>
              <span>{getYaoDisplayName(yao.value, yao.isMoving)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 卦象分析 */}
      <div className="chinese-card p-5 mb-4">
        <h4 className="text-lg font-bold text-gray-900 mb-4">【卦象分析】</h4>
        <div className="text-gray-700 leading-relaxed space-y-4">
          <p>
            由下而上看，本卦「{originalHexagram.name}」可以理解為一種「{originalHexagram.description.replace('。', '')}」的狀態。
          </p>
          {movingYao.length > 0 ? (
            <p>
              而{movingYao.map(p => getYaoName(p)).join('、')}變，表示：
              {movingYao.length === 1 ? '局面正在發生單一的轉變。' : 
               movingYao.length === 2 ? '局面正在多個層面同時轉變。' : 
               '局面正在經歷較大的變動。'}
            </p>
          ) : (
            <p>沒有動爻，表示目前處於相對穩定的狀態。</p>
          )}
        </div>
      </div>

      {/* 簡單解讀 */}
      <div className="chinese-card p-5 mb-4">
        <h4 className="text-lg font-bold text-gray-900 mb-4">【簡單解讀】</h4>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
            <p className="text-gray-700 italic leading-relaxed">
              「{getMeaning(originalHexagram, category)}」
            </p>
          </div>
          {movingYao.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-2">變化後的之卦「{changedHexagram.name}」，則暗示：</p>
              <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                <p className="text-gray-700 italic leading-relaxed">
                  「{getMeaning(changedHexagram, category)}」
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 具體建議 */}
      <div className="chinese-card p-5 mb-4">
        <h4 className="text-lg font-bold text-gray-900 mb-4">【具體建議】</h4>
        <div className="text-gray-700 leading-relaxed whitespace-pre-line space-y-4">
          {conclusion}
        </div>
      </div>

      {/* 總結 */}
      <div className="chinese-card p-5 mb-4">
        <h4 className="text-lg font-bold text-gray-900 mb-4">【總結】</h4>
        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
          <p className="text-gray-800 leading-relaxed text-center font-medium">
            {generateFinalSummary(originalHexagram, changedHexagram, movingYao, category, movingYao.length > 0)}
          </p>
        </div>
      </div>

      {/* 提醒 */}
      <div className="bg-gray-100 border border-gray-300 p-5 rounded-lg mb-4">
        <h4 className="text-lg font-bold text-gray-900 mb-3">【提醒】</h4>
        <p className="text-gray-600 leading-relaxed">
          這類問題最終往往不是單靠卦象，而是很受「現實情況、主動程度、時間安排、客觀條件」影響。
        </p>
        <p className="text-gray-600 leading-relaxed mt-3">
          卦象提供的是一個「趨勢參考」，真正嘅結果，始終掌握在你自己手中。
        </p>
      </div>

      {/* 操作按鈕 */}
      <div className="flex gap-4 pt-4">
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
