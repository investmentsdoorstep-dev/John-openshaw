
import React, { useState } from 'react';
import { ONBOARDING_QUESTIONS } from '../constants';

interface OnboardingProps {
  onComplete: (answers: any) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const currentQuestion = ONBOARDING_QUESTIONS[step];

  const handleNext = () => {
    if (step < ONBOARDING_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(answers);
    }
  };

  const updateAnswer = (val: any) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: val }));
  };

  const progress = ((step + 1) / ONBOARDING_QUESTIONS.length) * 100;

  return (
    <div className="h-full flex flex-col p-8 pt-12 bg-black">
      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-zinc-800 rounded-full mb-12 overflow-hidden">
        <div 
          className="h-full bg-indigo-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 space-y-10">
        <div>
          <span className="text-indigo-400 font-bold tracking-widest text-xs uppercase block mb-2">Step {step + 1} of {ONBOARDING_QUESTIONS.length}</span>
          <h2 className="text-3xl font-extrabold leading-tight text-white">{currentQuestion.question}</h2>
        </div>

        <div className="space-y-4">
          {currentQuestion.type === 'select' && (
            <div className="grid gap-3">
              {currentQuestion.options?.map(opt => (
                <button
                  key={opt}
                  onClick={() => updateAnswer(opt)}
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${answers[currentQuestion.id] === opt ? 'border-indigo-500 bg-indigo-500/10 text-white' : 'border-zinc-800 bg-zinc-900 text-zinc-400'}`}
                >
                  <span className="font-bold">{opt}</span>
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'slider' && (
            <div className="space-y-8 pt-4">
              <input
                type="range"
                min={currentQuestion.min}
                max={currentQuestion.max}
                step={currentQuestion.step}
                value={answers[currentQuestion.id] || currentQuestion.min}
                onChange={(e) => updateAnswer(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-zinc-500 font-bold text-sm">
                <span>{currentQuestion.min}</span>
                <span className="text-indigo-400 text-2xl">{answers[currentQuestion.id] || currentQuestion.min}</span>
                <span>{currentQuestion.max}</span>
              </div>
            </div>
          )}

          {currentQuestion.type === 'toggle' && (
            <div className="flex items-center justify-between p-6 bg-zinc-900 rounded-2xl border border-zinc-800">
              <span className="font-bold text-lg">Yes, absolutely</span>
              <button 
                onClick={() => updateAnswer(!answers[currentQuestion.id])}
                className={`w-14 h-8 rounded-full transition-colors relative ${answers[currentQuestion.id] ? 'bg-indigo-500' : 'bg-zinc-700'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all ${answers[currentQuestion.id] ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={currentQuestion.type === 'select' && !answers[currentQuestion.id]}
        className="w-full py-5 bg-white text-black font-black text-lg rounded-2xl shadow-xl hover:bg-zinc-200 transition-colors disabled:opacity-50 mt-12 mb-8"
      >
        {step === ONBOARDING_QUESTIONS.length - 1 ? 'Finish Profile' : 'Continue'}
      </button>
    </div>
  );
};

export default Onboarding;
