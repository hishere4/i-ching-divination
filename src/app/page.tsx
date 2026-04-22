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
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-6 shadow-lg sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="title-main text-white">
            妙算申帷幄 - 啟示
          </h1>
          <p className="text-sm mt-2 text-amber-200">
            問天機 · 觀陰陽 · 明進退
          </p>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 py-4 sticky top-[88px] z-40 shadow-md">
        <div className="max-w-2xl mx-auto px-4">
          <div className="step-indicator">
            <div className={`step ${step === 1 ? 'step-active' : step > 1 ? 'bg-amber-100 text-amber-800' : 'step-inactive'}`}>
              <span className="text-lg">①</span>
              <span>問事</span>
            </div>
            <div className="step-connector"></div>
            <div className={`step ${step === 2 ? 'step-active' : step > 2 ? 'bg-amber-100 text-amber-800' : 'step-inactive'}`}>
              <span className="text-lg">②</span>
              <span>立卦</span>
            </div>
            <div className="step-connector"></div>
            <div className={`step ${step === 3 ? 'step-active' : 'step-inactive'}`}>
              <span className="text-lg">③</span>
              <span>解卦</span>
            </div>
          </div>
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
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-amber-200/60 py-8 mt-12 text-center text-sm">
        <div className="footer-pattern"></div>
        <p>妙算申帷幄 · 傳統智慧 · 現代解讀</p>
        <p className="mt-2 text-xs text-amber-200/40">
          本活動以文化體驗為主，占卜結果僅供參考
        </p>
        <p className="mt-1 text-xs text-amber-200/40">
          © 2026 妙算申帷幄
        </p>
      </footer>
    </main>
  );
}
