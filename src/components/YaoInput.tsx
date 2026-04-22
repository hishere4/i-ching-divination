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

  const yaoOptions: { value: YaoValue; label: string; symbol: string }[] = [
    { value: 'yang', label: '陽', symbol: '—' },
    { value: 'yin', label: '陰', symbol: '--' },
    { value: 'moving-yang', label: '動陽', symbol: '— ★' },
    { value: 'moving-yin', label: '動陰', symbol: '-- ★' },
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
      setError('請至少標記一個動爻');
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

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-ink-200 p-8">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">☯️</div>
        <h2 className="text-2xl font-serif font-bold text-ink-900 mb-2">
          請輸入六爻陰陽
        </h2>
        <p className="text-ink-500">
          從下到上：初爻 → 上爻
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {positions.map((pos, idx) => (
          <div key={idx} className="flex items-center gap-4 p-4 bg-parchment-50 rounded-xl">
            <span className="w-12 text-center font-bold text-ink-600">
              {pos}
            </span>
            <div className="flex-1 grid grid-cols-4 gap-2">
              {yaoOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleYaoChange(idx, option.value)}
                  className={`py-3 px-2 rounded-lg text-center transition-all ${
                    yaoValues[idx] === option.value
                      ? 'bg-ink-800 text-parchment-100 font-bold'
                      : 'bg-white border border-ink-200 text-ink-700 hover:bg-ink-50'
                  }`}
                >
                  <span className="text-lg block">{option.symbol}</span>
                  <span className="text-xs">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-3 border-2 border-ink-300 text-ink-700 rounded-xl font-bold hover:bg-ink-50 transition-colors"
        >
          ← 返回修改問題
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 py-3 bg-ink-800 text-parchment-100 rounded-xl font-bold hover:bg-ink-700 transition-colors"
        >
          解卦 →
        </button>
      </div>

      <div className="mt-6 p-4 bg-parchment-100 rounded-lg">
        <p className="text-sm text-ink-600">
          <span className="font-bold">📖 說明：</span>
          陽爻（—）為實線，陰爻（--）為斷線。動爻表示變化，會影響卦象解讀。
        </p>
      </div>
    </div>
  );
}
