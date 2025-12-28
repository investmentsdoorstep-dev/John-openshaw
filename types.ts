
export type Verdict = 'YES' | 'RISKY' | 'NO';

export interface VibeResult {
  id: string;
  timestamp: number;
  score: number;
  verdict: Verdict;
  fix_tip: string;
  situation: string;
  imageUrl: string;
  insights: {
    lighting: number;
    style: number;
    cleanliness: number;
    grooming: number;
    confidence: number;
    alignment: number;
  };
}

export interface UserProfile {
  onboarded: boolean;
  isPremium: boolean;
  lastScanDate: string | null;
  dailyScanCount: number;
  streak: number;
  onboardingAnswers: Record<string, any>;
  badges: string[];
}

export enum AppScreen {
  ONBOARDING = 'ONBOARDING',
  PAYWALL = 'PAYWALL',
  HOME = 'HOME',
  SCAN = 'SCAN',
  PROGRESS = 'PROGRESS',
  SETTINGS = 'SETTINGS',
  RESULT = 'RESULT'
}

export interface OnboardingQuestion {
  id: string;
  question: string;
  type: 'select' | 'slider' | 'toggle';
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}
