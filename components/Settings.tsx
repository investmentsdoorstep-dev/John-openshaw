
import React from 'react';
import { UserProfile } from '../types';
import { storageService } from '../services/storageService';

interface SettingsProps {
  user: UserProfile;
  setUser: (user: UserProfile) => void;
}

const Settings: React.FC<SettingsProps> = ({ user, setUser }) => {
  const togglePremium = () => {
    const updated = { ...user, isPremium: !user.isPremium };
    storageService.setUser(updated);
    setUser(updated);
  };

  const resetProgress = () => {
    if (confirm('Are you sure? This will delete all scan history.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="p-6 space-y-8">
      <header>
        <h1 className="text-3xl font-black">Settings</h1>
      </header>

      {/* Profile Card */}
      <div className="bg-zinc-900 rounded-[32px] p-6 border border-white/5 flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-black italic">
          {user.isPremium ? '💎' : '👤'}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg">Vibe Architect</h3>
          <p className="text-zinc-500 text-sm">Level 12 • {user.streak} day streak</p>
        </div>
        {user.isPremium && (
          <span className="bg-indigo-500 px-3 py-1 rounded-full text-[10px] font-black uppercase italic">PRO</span>
        )}
      </div>

      {/* Sections */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-4">Account</h4>
        <div className="bg-zinc-900 rounded-[32px] overflow-hidden border border-white/5">
          <button onClick={togglePremium} className="w-full p-6 flex justify-between items-center border-b border-white/5">
            <span className="font-bold">Subscription Status</span>
            <span className={user.isPremium ? 'text-indigo-400 font-bold' : 'text-zinc-500'}>{user.isPremium ? 'Premium Active' : 'Free Tier'}</span>
          </button>
          <div className="w-full p-6 flex justify-between items-center border-b border-white/5">
            <span className="font-bold">App Theme</span>
            <span className="text-zinc-500">OLED Black</span>
          </div>
          <div className="w-full p-6 flex justify-between items-center">
            <span className="font-bold">Notifications</span>
            <div className="w-12 h-6 bg-indigo-500 rounded-full flex items-center px-1">
              <div className="w-4 h-4 bg-white rounded-full ml-auto" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-4">Security</h4>
        <div className="bg-zinc-900 rounded-[32px] overflow-hidden border border-white/5">
          <div className="w-full p-6 flex justify-between items-center border-b border-white/5">
            <span className="font-bold">Privacy Policy</span>
            <svg className="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <button onClick={resetProgress} className="w-full p-6 flex justify-between items-center text-red-500">
            <span className="font-bold">Reset All Data</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="text-center pt-8">
        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Vibe AI v2.4.0</p>
        <p className="text-[10px] text-zinc-800 mt-1 uppercase">Powered by Gemini 3 Flash</p>
      </div>
    </div>
  );
};

export default Settings;
