'use client';

import { useState } from 'react';
import type { YaoInput } from '@/lib/calculator';

interface Props {
  onSubmit: (yao: YaoInput[]) => void;
  onBack: () => void;
}

type YaoValue = 'yang' | 'yin' | 'moving-yang' | 'moving-yin';

export default function YaoInput({ onSubmit, onBack }: Props) {
  const [yaoValues, setYaoValues] = useState<YaoValue[]>(Array(6).fill('yang'));
  const [error, setError] = useState('');

  const handleYaoChange = (position: number, value: YaoValue) => {
    const newValues = [...yaoValues];
    newValues[position] = value;
    setYaoValues(newValues);
    setError('');
  };

  const handleSubmit = () => {
    const hasMoving = yaoValues.some(v => v.includes('moving'));
    if (!hasMoving) {
      setError('請至少標記一個動爻（動陽或動陰）');
      return;
    }

    const yaoInputs: YaoInput[] = yaoValues.map((val, idx) => ({
      position: idx + 1,
      value: val.includes('yang') ? 1 : 0,
      isMoving: val.includes('moving'),
    }));

    onSubmit(yaoInputs);
  };

  const positions = ['初爻（最下）', '二爻', '三爻', '四爻', '五爻', '上爻（最上）'];

  // 渲染單個爻的視覺顯示
  const renderYaoVisual = (value: YaoValue) => {
    const isMoving = value.includes('moving');
    const isYang = value.includes('yang');
    
    if (isYang) {
      return (
        <div className="flex items-center justify-center w-full py-2">
          <div 
            className={`h-1.5 rounded-full flex-1 ${isMoving ? 'bg-red-700 shadow-lg shadow-red-300' : 'bg-gray-900'}`}
            style={{maxWidth: '120px'}}
          ></div>
          {isMoving && (
            <span className="text-red-600 font-bold ml-2 text-lg animate-pulse">★</span>
          )}
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center w-full py-2 gap-1">
          <div 
            className={`h-1.5 rounded-full w-12 ${isMoving ? 'bg-red-700 shadow-lg shadow-red-300' : 'bg-gray-900'}`}
          ></div>
          <div className="w-2"></div>
          <div 
            className={`h-1.5 rounded-full w-12 ${isMoving ? 'bg-red-700 shadow-lg shadow-red-300' : 'bg-gray-900'}`}
          ></div>
          {isMoving && (
            <span className="text-red-600 font-bold ml-2 text-lg animate-pulse">★</span>
          )}
        </div>
      );
    }
  };

  const getYaoLabel = (value: YaoValue) => {
    switch(value) {
      case 'yang': return '陽';
      case 'yin': return '陰';
      case 'moving-yang': return '動陽';
      case 'moving-yin': return '動陰';
    }
  };

  return (
    <div className="chinese-card p-6 md:p-8">
      <div className="text-center mb-6">
        <div className="text-5xl mb-3">☯</div>
        <h2 className="title-section mb-2">
          請輸入六爻陰陽
        </h2>
        <p className="text-gray-600 text-sm">
          從下到上：初爻 → 上爻
        </p>
      </div>

      {/* 六爻輸入區 */}
      <div className="space-y-3 mb-6">
        {positions.map((pos, idx) => {
          const currentValue = yaoValues[idx];
          return (
            <div key={idx} className="border border-amber-200 rounded-xl p-3 bg-amber-50/50">
              {/* 爻位標籤 + 視覺 + 按鈕 */}
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                
                {/* 位置標籤 */}
                <div className="w-20 shrink-0">
                  <span className="text-sm font-bold text-amber-900">
                    {pos}
                  </span>
                </div>
                
                {/* 視覺化爻 */}
                <div className="flex-1 flex justify-center bg-white rounded-lg py-2 px-4 shadow-inner">
                  {renderYaoVisual(currentValue)}
                </div>
                
                {/* 選擇按鈕 */}
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => handleYaoChange(idx, 'yang')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentValue === 'yang'
                        ? 'bg-gray-800 text-white shadow-md'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    陽
                  </button>
                  <button
                    onClick={() => handleYaoChange(idx, 'yin')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentValue === 'yin'
                        ? 'bg-gray-800 text-white shadow-md'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    陰
                  </button>
                  <button
                    onClick={() => handleYaoChange(idx, 'moving-yang')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentValue === 'moving-yang'
                        ? 'bg-red-700 text-white shadow-md'
                        : 'bg-white border border-red-300 text-red-700 hover:bg-red-50'
                    }`}
                  >
                    動陽
                  </button>
                  <button
                    onClick={() => handleYaoChange(idx, 'moving-yin')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentValue === 'moving-yin'
                        ? 'bg-red-700 text-white shadow-md'
                        : 'bg-white border border-red-300 text-red-700 hover:bg-red-50'
                    }`}
                  >
                    動陰
                  </button>
                </div>
              </div>
              
              {/* 當前選擇顯示 */}
              <div className="mt-2 text-center">
                <span className={`inline-block px-2 py-0.5 rounded text-xs ${
                  currentValue.includes('moving') 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  當前：{getYaoLabel(currentValue)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <p className="text-red-600 text-sm text-center mb-4 bg-red-50 p-2 rounded-lg">{error}</p>
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
          點擊按鈕選擇每個爻的類型。
          <span className="font-bold text-red-700">必須至少選擇一個「動陽」或「動陰」</span>作為動爻。
        </p>
      </div>
    </div>
  );
}
