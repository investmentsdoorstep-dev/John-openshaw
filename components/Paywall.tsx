
import React from 'react';

interface PaywallProps {
  onComplete: () => void;
  onSuccess: () => void;
}

const Paywall: React.FC<PaywallProps> = ({ onComplete, onSuccess }) => {
  const perks = [
    { title: 'Unlimited Scans', desc: 'No daily limits. Rate everything.' },
    { title: 'Full Insights', desc: 'Deep dive into lighting, symmetry & style.' },
    { title: 'No Watermarks', desc: 'Clean cards ready for Instagram.' },
    { title: 'AI Wardrobe Advice', desc: 'Personalized tips for your specific style.' }
  ];

  return (
    <div className="h-full bg-black relative flex flex-col p-8 overflow-y-auto">
      <button onClick={onComplete} className="absolute top-8 right-8 text-zinc-500">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="mt-12 space-y-12">
        <div className="text-center space-y-4">
          <span className="px-4 py-1 bg-indigo-500 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">Limited Offer</span>
          <h1 className="text-4xl font-black tracking-tight leading-none">Unlock Your <br/><span className="text-indigo-500">Full Potential.</span></h1>
          <p className="text-zinc-500 font-medium">Join 50k+ users leveling up their vibe every day.</p>
        </div>

        <div className="space-y-6">
          {perks.map((p, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-white">{p.title}</h4>
                <p className="text-zinc-500 text-sm leading-tight">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <button 
            onClick={onSuccess}
            className="w-full bg-white text-black font-black py-5 rounded-3xl shadow-2xl hover:bg-zinc-200 transition-colors flex flex-col items-center"
          >
            <span>START FREE TRIAL</span>
            <span className="text-[10px] opacity-60">then $29.99 / year</span>
          </button>
          
          <button 
            onClick={onSuccess}
            className="w-full bg-zinc-900 border border-white/10 text-white font-bold py-5 rounded-3xl hover:bg-zinc-800 transition-colors"
          >
            $3.99 / MONTH
          </button>

          <p className="text-center text-[10px] text-zinc-600 px-8">
            Cancel anytime. Subscription automatically renews unless turned off. By continuing, you agree to our Terms and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Paywall;
