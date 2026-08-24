import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';

interface BannerAdProps {
  size?: 'leaderboard' | 'rectangle' | 'inline';
  className?: string;
}

export const BannerAd: React.FC<BannerAdProps> = ({ size = 'leaderboard', className = '' }) => {
  if (size === 'rectangle') {
    return (
      <div className={`bg-gradient-to-br from-stone-100 to-rose-50/50 border border-rose-200/40 rounded-2xl p-4 text-center relative overflow-hidden shadow-sm ${className}`}>
        <div className="absolute top-2 right-2 text-[10px] uppercase tracking-wider bg-rose-100/80 text-rose-700 px-2 py-0.5 rounded-full font-medium">
          Sponsored Ad
        </div>
        <div className="flex flex-col items-center justify-center min-h-[200px] py-6">
          <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 mb-3 shadow-inner">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h4 className="font-semibold text-stone-800 text-sm mb-1">Learn Korean 3x Faster</h4>
          <p className="text-xs text-stone-500 max-w-xs mb-4">
            Unlock premium AI conversation practice & structured TOPIK video courses today.
          </p>
          <a
            href="https://www.example.com/smartlink-ad-redirect"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium rounded-xl transition-all shadow-sm"
          >
            <span>Explore Partner Offer</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-stone-100 via-rose-50/40 to-amber-50/40 border border-stone-200/60 rounded-2xl p-3 md:p-4 text-center relative overflow-hidden shadow-sm ${className}`}>
      <div className="absolute top-1.5 right-3 text-[10px] uppercase tracking-wider bg-stone-200/70 text-stone-600 px-2 py-0.5 rounded-full font-medium">
        Advertisement
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-left">
            <span className="text-xs font-semibold text-stone-800 block">Study Abroad in Seoul & Busan 🇰🇷</span>
            <span className="text-[11px] text-stone-500">Get verified visa guidance & university admission textbooks.</span>
          </div>
        </div>
        <a
          href="https://www.example.com/smartlink-ad-redirect"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-xl transition-all shrink-0 shadow-sm"
        >
          <span>Learn More</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
