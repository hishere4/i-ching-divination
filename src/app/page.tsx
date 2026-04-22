'use client';

import { useState } from 'react';
import QuestionInput from '@/components/QuestionInput';
import YaoInput from '@/components/YaoInput';
import ResultDisplay from '@/components/ResultDisplay';
import { calculateHexagram, detectCategory } from '@/lib/calculator';
import type { YaoInput as YaoType, DivinationResult } from '@/lib/calculator';

export default function Home() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState<DivinationResult | null>(null);

  const handleQuestionSubmit = (q: string) => {
    setQuestion(q);
    setStep(2);
  };

  const handleYaoSubmit = (yaoInputs: YaoType[]) => {
    const category = detectCategory(question);
    const calcResult = calculateHexagram(yaoInputs);
    
    if (calcResult) {
      calcResult.question = question;
      calcResult.category = category;
      setResult(calcResult);
      setStep(3);
    }
  };

  const handleReset = () => {
    setStep(1);
    setQuestion('');
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-parchment-50">
      {/* Header */}
      <header className="bg-ink-900 text-parchment-100 py-6 shadow-lg">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-serif font-bold text-gold-400 tracking-wider">
            易經占卜
          </h1>
          <p className="text-sm mt-2 text-parchment-300">
            問天機 · 觀陰陽 · 明進退
          </p>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-ink-800 py-3">
        <div className="max-w-2xl mx-auto px-4 flex justify-center gap-4 text-sm">
          <span className={step === 1 ? 'text-gold-400 font-bold' : 'text-parchment-400'}>
            ① 問事
          </span>
          <span className="text-parchment-500">→</span>
          <span className={step === 2 ? 'text-gold-400 font-bold' : 'text-parchment-400'}>
            ② 立卦
          </span>
          <span className="text-parchment-500">→</span>
          <span className={step === 3 ? 'text-gold-400 font-bold' : 'text-parchment-400'}>
            ③ 解卦
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {step === 1 && (
          <QuestionInput onSubmit={handleQuestionSubmit} />
        )}
        
        {step === 2 && (
          <YaoInput 
            onSubmit={handleYaoSubmit} 
            onBack={() => setStep(1)}
          />
        )}
        
        {step === 3 && result && (
          <ResultDisplay 
            result={result} 
            onReset={handleReset}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-ink-900 text-parchment-400 py-6 mt-12 text-center text-sm">
        <p>易經占卜 · 傳統智慧 · 現代解讀</p>
      </footer>
    </main>
  );
}
