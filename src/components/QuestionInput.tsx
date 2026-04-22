'use client';

import { useState } from 'react';

interface Props {
  onSubmit: (question: string) => void;
}

export default function QuestionInput({ onSubmit }: Props) {
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!question.trim()) {
      setError('請輸入你的問題');
      return;
    }
    if (question.length > 100) {
      setError('問題請控制在100字以內');
      return;
    }
    setError('');
    onSubmit(question.trim());
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-ink-200 p-8">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">🎯</div>
        <h2 className="text-2xl font-serif font-bold text-ink-900 mb-2">
          你想占什麼問題？
        </h2>
        <p className="text-ink-500">
          請用一句話描述，越具體越好
        </p>
      </div>

      <div className="space-y-4">
        <textarea
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
            setError('');
          }}
          placeholder="例如：下個月面試會不會成功 / 我們能不能和好 / 接下來該怎麼做"
          className="w-full p-4 border-2 border-ink-200 rounded-xl focus:border-gold-400 focus:outline-none resize-none h-32 text-ink-800 placeholder:text-ink-300"
        />
        
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-ink-800 text-parchment-100 rounded-xl font-bold hover:bg-ink-700 transition-colors text-lg"
        >
          下一步：輸入六爻 →
        </button>
      </div>

      <div className="mt-6 p-4 bg-parchment-100 rounded-lg">
        <p className="text-sm text-ink-600">
          <span className="font-bold">💡 小提示：</span>
          問具體問題比問籠統問題更準確。例如「這次考試能不能及格」比「我的未來怎樣」更好。
        </p>
      </div>
    </div>
  );
}
