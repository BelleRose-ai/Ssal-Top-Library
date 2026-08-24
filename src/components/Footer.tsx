import React from 'react';
import { Heart, Sparkles, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-stone-200/80 bg-white/50 py-10 px-4 md:px-8 text-center text-stone-500 text-xs">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-2">
          <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold">
            🇰🇷
          </span>
          <span className="font-semibold text-stone-800 text-sm">Ssal-Top</span>
        </div>
        <p className="max-w-md mx-auto text-stone-500">
          Providing free educational TOPIK past examination papers and beginner to advanced Korean study textbooks for global learners.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-stone-400 pt-2">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Verified Secure PDFs
          </span>
          <span>•</span>
          <span>Updated Weekly</span>
          <span>•</span>
          <span>Open Educational Resource</span>
        </div>
        <p className="text-[11px] text-stone-400 pt-4">
          © 2026 Ssal-Top Archive. All trademarks and copyrighted textbook materials belong to their respective publishers.
        </p>
      </div>
    </footer>
  );
};
