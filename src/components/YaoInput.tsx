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

  const yaoOptions: { value: YaoValue; label: string }[] = [
    { value: 'yang', label: '陽' },
    { value: 'yin', label: '陰' },
    { value: 'moving-yang', label: '動陽' },
    { value: 'moving-yin', label: '動陰' },
  ];

  const handleYaoChange = (position: number, value: YaoValue) => {
    const newValues = [...yaoValues];
    newValues[position] = value;
    setYaoValues(newValues);
    setError('');
  };

  const handleSubmit = () => {
    const hasMoving = yaoValues.some(v => v.includes('moving'));
    if (!hasMoving) {
      setError('請至少標記一個動爻（動爻代表變化）');
      return;
    }

    const yaoInputs: YaoInput[] = yaoValues.map((val, idx) => ({
      position: idx + 1,
      value: val.includes('yang') ? 1 : 0,
      isMoving: val.includes('moving'),
    }));

    onSubmit(yaoInputs);
  };

  const positions = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'];

  const renderYao = (value: YaoValue) => {
    const isMoving = value.includes('moving');
    const isYang = value.includes('yang');
    return (
      <div className={`${isYang ? 'yao-yang' : 'yao-yin'} ${isMoving ? 'yao-active' : ''}`}>
        {isMoving && <span className="moving-yao-mark ml-2">★</span>}
      </div>
    );
  };

  return (
    <div className="chinese-card p-8">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">⚊</div>
        <h2 className="title-section mb-2">
          請輸入六爻陰陽
        </h2>
        <p className="text-gray-600">
          從下到上：初爻 → 上爻
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {positions.map((pos, idx) => (
          <div key={idx} className="flex items-center gap-4 p-4 bg-amber-50/50 rounded-xl border border-amber-100">
            <span className="w-16 text-center font-bold text-amber-900 text-lg">
              {pos}
            </span>
            
            <div className="flex-1">
              {renderYao(yaoValues[idx])}
            </div>
            
            <div className="flex gap-2">
              {yaoOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleYaoChange(idx, option.value)}
                  className={`py-2 px-3 rounded-lg text-center transition-all text-sm ${
                    yaoValues[idx] === option.value
                      ? 'bg-red-800 text-white font-bold shadow-lg'
                      : 'bg-white border border-amber-200 text-amber-900 hover:bg-amber-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p className="text-red-600 text-sm text-center mb-4">{error}</p>
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
          陽爻（—）為實線，陰爻（--）為斷線。動爻表示變化，會影響卦象解讀。
        </p>
      </div>
    </div>
  );
}
