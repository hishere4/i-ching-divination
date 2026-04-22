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
    // 檢查是否全部已選擇
    if (yaoValues.some(v => v === undefined)) {
      setError('請為每個爻選擇一個選項');
      return;
    }

    const yaoInputs: YaoInput[] = yaoValues.map((val, idx) => {
      // idx 0=初爻, 1=二爻, 2=三爻, 3=四爻, 4=五爻, 5=上爻
      let value = 0;
      let isMoving = false;
      
      switch (val) {
        case 'old-yin':    // 老陰 = 陰動
          value = 0;
          isMoving = true;
          break;
        case 'young-yang': // 少陽 = 陽靜
          value = 1;
          isMoving = false;
          break;
        case 'young-yin':  // 少陰 = 陰靜
          value = 0;
          isMoving = false;
          break;
        case 'old-yang':   // 老陽 = 陽動
          value = 1;
          isMoving = true;
          break;
      }
      
      return {
        position: idx + 1,
        value,
        isMoving,
      };
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
    { value: 'old-yin' as YaoValue, label: '老陰', desc: '陰動', color: 'bg-blue-900' },
    { value: 'young-yang' as YaoValue, label: '少陽', desc: '陽靜', color: 'bg-gray-600' },
    { value: 'young-yin' as YaoValue, label: '少陰', desc: '陰靜', color: 'bg-gray-400' },
    { value: 'old-yang' as YaoValue, label: '老陽', desc: '陽動', color: 'bg-red-700' },
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

  const renderYaoVisual = (value: YaoValue) => {
    if (!value) return <div className="text-gray-400 text-sm">請選擇</div>;
    
    const isMoving = value === 'old-yin' || value === 'old-yang';
    const isYang = value === 'young-yang' || value === 'old-yang';
    
    if (isYang) {
      return (
        <div className="flex items-center justify-center w-full py-2">
          <div 
            className={`h-2 rounded-full flex-1 ${isMoving ? 'bg-red-700 shadow-lg shadow-red-300' : 'bg-gray-900'}`}
            style={{maxWidth: '120px'}}
          ></div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center w-full py-2 gap-1">
          <div 
            className={`h-2 rounded-full w-12 ${isMoving ? 'bg-red-700 shadow-lg shadow-red-300' : 'bg-gray-900'}`}
          ></div>
          <div className="w-2"></div>
          <div 
            className={`h-2 rounded-full w-12 ${isMoving ? 'bg-red-700 shadow-lg shadow-red-300' : 'bg-gray-900'}`}
          ></div>
        </div>
      );
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

      {/* 六爻輸入區 - 從上爻到初爻 */}
      <div className="space-y-3 mb-6">
        {displayOrder.map(({ idx, label }) => {
          const currentValue = yaoValues[idx];
          return (
            <div key={idx} className={`border rounded-xl p-3 ${currentValue ? 'border-amber-300 bg-amber-50/30' : 'border-gray-200 bg-gray-50/50'}`}>
              {/* 爻位標籤 + 視覺 + 按鈕 */}
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                
                {/* 位置標籤 */}
                <div className="w-28 shrink-0">
                  <span className="text-sm font-bold text-amber-900">
                    {label}
                  </span>
                </div>
                
                {/* 視覺化爻 */}
                <div className="flex-1 flex justify-center bg-white rounded-lg py-2 px-4 shadow-inner min-h-[40px]">
                  {renderYaoVisual(currentValue)}
                </div>
                
                {/* 選擇按鈕 */}
                <div className="flex gap-1 shrink-0">
                  {options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleYaoChange(idx, opt.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                        currentValue === opt.value
                          ? 'bg-amber-400 text-amber-900 border-amber-500 shadow-md ring-2 ring-amber-300'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 當前選擇顯示 */}
              <div className="mt-2 text-center">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  currentValue 
                    ? (currentValue.includes('old') ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700')
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {label}：{getYaoLabel(currentValue)}
                </span>
              </div>
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
