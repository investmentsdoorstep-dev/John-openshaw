
import React, { useState, useRef } from 'react';
import { SITUATIONS } from '../constants';
import { analyzeVibe } from '../services/geminiService';
import { storageService } from '../services/storageService';
import { VibeResult } from '../types';

interface VibeScanProps {
  isPremium: boolean;
  dailyCount: number;
  onComplete: (result: VibeResult) => void;
  onBack: () => void;
  onPaywall: () => void;
}

const VibeScan: React.FC<VibeScanProps> = ({ isPremium, dailyCount, onComplete, onBack, onPaywall }) => {
  const [image, setImage] = useState<string | null>(null);
  const [situation, setSituation] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Upload, 2: Situation, 3: Processing
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = async () => {
    if (!isPremium && dailyCount >= 1) {
      onPaywall();
      return;
    }

    if (!image || !situation) return;
    setLoading(true);
    setStep(3);

    try {
      const aiResponse = await analyzeVibe(image, situation);
      const newResult: VibeResult = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        imageUrl: image,
        situation,
        ...aiResponse
      };
      storageService.addResult(newResult);
      onComplete(newResult);
    } catch (error) {
      alert("Analysis failed. Please check your connection or API key.");
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-white/5">
        <button onClick={onBack} className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-bold text-lg">New Scan</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 p-6 flex flex-col">
        {step === 1 && (
          <div className="flex-1 flex flex-col items-center justify-center space-y-8">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-[4/5] bg-zinc-900 rounded-3xl border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center p-12 text-center cursor-pointer hover:bg-zinc-800 transition-colors"
            >
              <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Upload Your Vibe</h3>
              <p className="text-zinc-500 mt-2">Pick a photo of your outfit, room, or yourself.</p>
            </div>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="hidden" 
            />
          </div>
        )}

        {step === 2 && image && (
          <div className="space-y-8">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
              <img src={image} className="w-full h-full object-cover" alt="Selected" />
              <button onClick={() => setStep(1)} className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg">Select Situation</h3>
              <div className="space-y-6 overflow-y-auto max-h-[300px] pr-2 scrollbar-hide">
                {Object.entries(SITUATIONS).map(([category, items]) => (
                  <div key={category} className="space-y-3">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{category}</p>
                    <div className="flex flex-wrap gap-2">
                      {items.map(item => (
                        <button
                          key={item}
                          onClick={() => setSituation(item)}
                          className={`px-4 py-2 rounded-xl border font-semibold text-sm transition-all ${situation === item ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleProcess}
              disabled={!situation}
              className="w-full py-5 bg-white text-black font-black text-lg rounded-2xl shadow-xl disabled:opacity-50"
            >
              Rate My Vibe
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-12">
            <div className="relative">
              <div className="w-32 h-32 border-4 border-indigo-500/20 rounded-full" />
              <div className="absolute inset-0 w-32 h-32 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl animate-pulse">✨</span>
              </div>
            </div>
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-black">Analyzing Aura...</h2>
              <p className="text-zinc-500 leading-relaxed">
                Our AI is checking your lighting, symmetry, and overall aesthetic alignment.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VibeScan;
