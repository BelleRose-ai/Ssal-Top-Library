import React from 'react';
import { BookOpen, Sparkles, Languages, Heart } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  totalPapers: number;
  totalBooks: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  totalPapers,
  totalBooks,
}) => {
  return (
    <header className="pt-8 pb-6 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/70 text-rose-700 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Updated for 2026 • Free Educational Archives</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-800 flex items-center gap-3">
            <span className="text-2xl md:text-3xl p-2 bg-rose-100 rounded-2xl shadow-inner">🇰🇷</span>
            <span>Ssal-Top</span>
          </h1>
          <p className="text-stone-600 text-sm md:text-base mt-1.5 font-normal">
            Free TOPIK Past Papers & Korean Study Textbooks
          </p>
        </div>

        <div className="flex items-center gap-3 bg-stone-200/50 p-1.5 rounded-3xl self-start md:self-auto border border-stone-200/80">
          <button
            onClick={() => setActiveTab('topik')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium transition-all ${
              activeTab === 'topik'
                ? 'bg-white text-stone-800 shadow-sm border border-stone-200/60'
                : 'text-stone-600 hover:text-stone-800'
            }`}
          >
            <Languages className="w-4 h-4 text-rose-500" />
            <span>TOPIK Papers</span>
            <span className="ml-1 text-[11px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-semibold">
              {totalPapers}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('textbooks')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium transition-all ${
              activeTab === 'textbooks'
                ? 'bg-white text-stone-800 shadow-sm border border-stone-200/60'
                : 'text-stone-600 hover:text-stone-800'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>Textbooks</span>
            <span className="ml-1 text-[11px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">
              {totalBooks}
            </span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            activeTab === 'topik'
              ? 'Search TOPIK sessions (e.g., 93rd, 2024)...'
              : 'Search textbooks (e.g., Yonsei, Grammar, Talk To Me)...'
          }
          className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3 pl-11 text-stone-800 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:border-rose-400 shadow-sm transition-all"
        />
        <svg
          className="w-4 h-4 text-stone-400 absolute left-4 top-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-3 text-xs text-stone-400 hover:text-stone-600 bg-stone-100 hover:bg-stone-200 px-2 py-1 rounded-lg"
          >
            Clear
          </button>
        )}
      </div>
    </header>
  );
};
