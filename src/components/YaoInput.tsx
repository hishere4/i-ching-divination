'use client';

import { useState } from 'react';
import type { YaoInput } from '@/lib/calculator';

interface Props {
  onSubmit: (yao: YaoInput[]) => void;
  onBack: () => void;
}

type YaoValue = undefined | 'old-yin' | 'young-yang' | 'young-yin' | 'old-yang';

export default function YaoInput({ onSubmit, onBack }: Props) {
  const [yaoValues, setYaoValues] = useState<YaoValue[]>(Array(6).fill(undefined));
  const [error, setError] = useState('');

  const handleYaoChange = (position: number, value: YaoValue) => {
    const newValues = [...yaoValues];
    newValues[position] = value;
    setYaoValues(newValues);
    setError('');
  };

  const handleSubmit = () => {
    if (yaoValues.some(v => v === undefined)) {
      setError('請為每個爻選擇一個選項');
      return;
    }

    const yaoInputs: YaoInput[] = yaoValues.map((val, idx) => {
      let value = 0;
      let isMoving = false;
      
      switch (val) {
        case 'old-yin':
          value = 0;
          isMoving = true;
          break;
        case 'young-yang':
          value = 1;
          isMoving = false;
          break;
        case 'young-yin':
          value = 0;
          isMoving = false;
          break;
        case 'old-yang':
          value = 1;
          isMoving = true;
          break;
      }
      
      return { position: idx + 1, value, isMoving };
    });

    onSubmit(yaoInputs);
  };

  // 從第六次開始顯示（初爻在最上）
  const displayOrder = [
    { idx: 0, label: '第六次（初爻）' },
    { idx: 1, label: '第五次（二爻）' },
    { idx: 2, label: '第四次（三爻）' },
    { idx: 3, label: '第三次（四爻）' },
    { idx: 4, label: '第二次（五爻）' },
    { idx: 5, label: '第一次（上爻）' },
  ];

  const options = [
    { value: 'old-yin' as YaoValue, label: '老陰' },
    { value: 'young-yang' as YaoValue, label: '少陽' },
    { value: 'young-yin' as YaoValue, label: '少陰' },
    { value: 'old-yang' as YaoValue, label: '老陽' },
  ];

  const getYaoLabel = (value: YaoValue) => {
    if (!value) return '未選擇';
    switch(value) {
      case 'old-yin': return '老陰';
      case 'young-yang': return '少陽';
      case 'young-yin': return '少陰';
      case 'old-yang': return '老陽';
    }
  };

  return (
    <div className="chinese-card p-6 md:p-8">
      <div className="text-center mb-6">
        <div className="text-5xl mb-3">☯</div>
        <h2 className="title-section mb-2">
          請輸入本卦六爻之結果
        </h2>
        <p className="text-gray-600 text-sm">
          從上到下填寫：上爻 → 初爻
        </p>
      </div>

      {/* 六爻輸入區 */}
      <div className="space-y-2 mb-6">
        {displayOrder.map(({ idx, label }, displayIndex) => {
          const currentValue = yaoValues[idx];
          return (
            <div key={idx}>
              {/* 單行：標籤 + 狀態 + 按鈕 */}
              <div className="flex items-center gap-2 py-2">
                {/* 標籤 + 狀態 */}
                <div className="w-36 shrink-0 text-sm">
                  <span className="font-bold text-amber-900">{label}</span>
                  <span className="text-gray-500 ml-1">：{getYaoLabel(currentValue)}</span>
                </div>
                
                {/* 按鈕 */}
                <div className="flex gap-1 flex-1 justify-end">
                  {options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleYaoChange(idx, opt.value)}
                      className={`px-3 py-1.5 rounded text-sm font-medium transition-all border ${
                        currentValue === opt.value
                          ? 'bg-amber-400 text-amber-900 border-amber-500 shadow-md'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 分隔線（除最後一項） */}
              {displayIndex < displayOrder.length - 1 && (
                <div className="border-b border-amber-200"></div>
              )}
            </div>
          );
        })}
      </div>

      {error && (
        <p className="text-red-600 text-sm text-center mb-4 bg-red-50 p-3 rounded-lg">{error}</p>
      )}

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="btn-secondary flex-1"
        >
          ← 返回修改
        </button>
        <button
          onClick={handleSubmit}
          className="btn-chinese flex-1"
        >
          解卦 →
        </button>
      </div>

      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800">
          <span className="font-bold">📖 說明：</span>
          <br/>• <span className="font-bold">少陽/少陰</span>：靜爻，不會變動
          <br/>• <span className="font-bold text-red-700">老陽/老陰</span>：動爻，會變化成相反屬性
          <br/>• 沒有動爻也可以解卦，顯示當前狀態
          <br/><br/>
          <span className="font-bold text-red-700">本卦</span>：代表事情目前的整體處境，幫助你看清現況
          <br/><span className="font-bold text-red-700">變爻</span>：代表事情中最關鍵、最值得留意的轉折點
          <br/><span className="font-bold text-red-700">之卦</span>：代表事情的發展趨勢與可能結果
        </p>
      </div>
    </div>
  );
}
