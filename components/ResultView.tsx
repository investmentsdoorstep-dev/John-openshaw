
import React from 'react';
import { VibeResult } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface ResultViewProps {
  result: VibeResult;
  isPremium: boolean;
  onBack: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ result, isPremium, onBack }) => {
  const radarData = [
    { subject: 'Style', A: result.insights.style },
    { subject: 'Light', A: result.insights.lighting },
    { subject: 'Groom', A: result.insights.grooming },
    { subject: 'Conf', A: result.insights.confidence },
    { subject: 'Align', A: result.insights.alignment },
    { subject: 'Clean', A: result.insights.cleanliness },
  ];

  const getVerdictColor = (v: string) => {
    if (v === 'YES') return 'text-green-400';
    if (v === 'RISKY') return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="p-6 space-y-8 bg-black">
      <header className="flex justify-between items-center">
        <button onClick={onBack} className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-black text-xl italic tracking-tighter">VIBE SCORECARD</span>
        <button className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </header>

      {/* Hero Score Card */}
      <div className="relative bg-zinc-900 rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
        {!isPremium && <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-white/50 z-10">VIBE AI FREE</div>}
        <div className="p-8 flex flex-col items-center text-center space-y-4">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-zinc-800" />
              <circle 
                cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" 
                strokeDasharray={440} strokeDashoffset={440 - (440 * result.score) / 100}
                className="text-indigo-500 transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black">{result.score}</span>
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Aura Points</span>
            </div>
          </div>

          <div>
            <h2 className={`text-4xl font-black tracking-tighter ${getVerdictColor(result.verdict)}`}>{result.verdict}</h2>
            <p className="text-zinc-400 font-medium mt-1">Verdict for: {result.situation}</p>
          </div>
        </div>
        
        <div className="bg-zinc-950 p-6 border-t border-white/5">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Primary Fix Tip</h4>
          <p className="text-lg font-bold italic leading-tight text-indigo-400">"{result.fix_tip}"</p>
        </div>
      </div>

      {/* Insights Radar */}
      <section className="bg-zinc-900 rounded-[32px] p-6 border border-white/5">
        <h3 className="font-bold text-lg mb-4">Aesthetic Breakdown</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#333" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10, fontWeight: 'bold' }} />
              <Radar
                name="Score"
                dataKey="A"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Detailed Insights */}
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(result.insights).map(([key, val]) => (
          <div key={key} className="bg-zinc-900 p-4 rounded-3xl border border-white/5">
            <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">{key}</p>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-black">{val}</span>
              <div className="w-12 h-1 bg-zinc-800 rounded-full mb-2 overflow-hidden">
                <div className="h-full bg-indigo-500" style={{ width: `${val}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <button className="w-full py-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-95 transition-transform">
        Share to Socials
      </button>
    </div>
  );
};

export default ResultView;
