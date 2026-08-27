import React, { useState } from 'react';
import { BookOpen, Download, Bookmark, Sparkles } from 'lucide-react';
import { Textbook, TextbookFilter } from '../types';

interface TextbookListProps {
  textbooks: Textbook[];
  onOpenDownloadModal: (title: string, type: 'book', url: string) => void;
}

export const TextbookList: React.FC<TextbookListProps> = ({ textbooks, onOpenDownloadModal }) => {
  const [filter, setFilter] = useState<TextbookFilter>('All');

  const filteredBooks = textbooks.filter((book) => {
    if (filter === 'All') return true;
    return book.level === filter;
  });

  const getCoverColorClass = (style: Textbook['coverStyle']) => {
    switch (style) {
      case 'billygo':
      case 'billygo2':
      case 'billygo3':
        return 'bg-[#E2EEF8] border-[#B5D5F0] text-stone-900';
      case 'routledge':
        return 'bg-[#D49D24] border-[#C28B1C] text-white';
      case 'yellow':
        return 'bg-[#FFE600] border-amber-300 text-stone-900';
      case 'rose':
        return 'bg-gradient-to-br from-rose-100 to-rose-200/60 border-rose-300/60 text-rose-800';
      case 'sage':
        return 'bg-gradient-to-br from-emerald-100 to-emerald-200/60 border-emerald-300/60 text-emerald-900';
      case 'lavender':
        return 'bg-gradient-to-br from-purple-100 to-purple-200/60 border-purple-300/60 text-purple-900';
      case 'amber':
        return 'bg-gradient-to-br from-amber-100 to-amber-200/60 border-amber-300/60 text-amber-900';
      case 'sky':
        return 'bg-gradient-to-br from-sky-100 to-sky-200/60 border-sky-300/60 text-sky-900';
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-filter pills for Textbooks */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {(
          [
            'All',
            'Level 1 (Beginner)',
            'Level 2 (Elementary)',
            'Level 3 (Intermediate)',
            'Level 4 (Advanced)',
          ] as TextbookFilter[]
        ).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-2xl text-xs font-medium whitespace-nowrap transition-all ${
              filter === f
                ? 'bg-stone-800 text-white shadow-sm'
                : 'bg-white hover:bg-stone-100 text-stone-600 border border-stone-200/80'
            }`}
          >
            {f === 'All' ? 'All Levels' : f}
          </button>
        ))}
      </div>

      {/* Grid of Textbook Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            style={{ transform: 'translateZ(0)', willChange: 'auto' }}
            className="bg-white border border-stone-200/80 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group overflow-hidden"
          >
            <div>
              {/* Aesthetic Pastel Book Placeholder Card */}
              <div
                className={`w-full h-40 rounded-2xl p-4 flex flex-col justify-between mb-4 border shadow-md relative overflow-hidden ${book.coverImageUrl ? 'p-0 bg-stone-100' : getCoverColorClass(
                  book.coverStyle
                )}`}
              >
                {book.coverImageUrl ? (
                  <div className="relative w-full h-full">
                    <img
                      src={book.coverImageUrl}
                      alt={book.title}
                      className="w-full h-full object-cover rounded-2xl"
                      referrerPolicy="no-referrer"
                    />
                    {book.tag && (
                      <span className="absolute top-2.5 right-2.5 bg-rose-600 text-white text-[9px] font-bold px-2 py-1 rounded-full shadow-md uppercase tracking-wider">
                        {book.tag}
                      </span>
                    )}
                  </div>
                ) : book.coverStyle === 'routledge' ? (
                  <div className="relative h-full flex flex-col justify-between py-1">
                    {/* Top right vertical Routledge Comprehensive Grammars text */}
                    <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center pointer-events-none">
                      <span className="text-[9px] tracking-widest text-white/80 uppercase transform rotate-95 whitespace-nowrap">
                        Routledge Comprehensive Grammars
                      </span>
                    </div>
                    {/* Curved swoosh decoration line representation */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
                      <svg className="w-full h-full text-white" viewBox="0 0 200 160" fill="none" preserveAspectRatio="none">
                        <path d="M0 20 L200 135 Q180 155 160 160" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </div>

                    <div>
                      <h3 className="text-2xl font-light tracking-tight text-white mb-0.5">
                        Korean
                      </h3>
                      <p className="text-xs text-white/90 font-normal">
                        A Comprehensive Grammar
                      </p>
                    </div>

                    <div className="flex justify-between items-end z-10">
                      <div>
                        <span className="text-[10px] text-white/90 font-medium block">
                          Jaehoon Yeon and Lucien Brown
                        </span>
                      </div>
                      <div className="bg-white/20 px-2 py-1 rounded text-[9px] font-bold text-white border border-white/20">
                        R
                      </div>
                    </div>
                  </div>
                ) : book.coverStyle === 'billygo2' ? (
                  <div className="relative h-full flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start bg-blue-900/90 text-white -mx-4 -mt-4 p-2 px-3 rounded-t-2xl">
                      <div>
                        <h3 className="text-sm font-black tracking-wider leading-none">KOREAN</h3>
                        <span className="text-xs font-bold tracking-tight text-blue-200">MADE SIMPLE 2</span>
                      </div>
                      <div className="text-[10px] font-bold text-right leading-tight">
                        GO! Billy<br />Korean
                      </div>
                    </div>
                    <div className="text-center py-2">
                      <div className="w-10 h-10 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xs shadow-inner mb-1">
                        🇰🇷 2
                      </div>
                      <span className="text-[9px] font-semibold text-stone-700 block">The next step in learning</span>
                    </div>
                    <div className="flex justify-between items-end text-[10px] text-stone-600 font-medium">
                      <span>Billy Go</span>
                      <span>{book.pages}</span>
                    </div>
                  </div>
                ) : book.coverStyle === 'billygo3' ? (
                  <div className="relative h-full flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start bg-blue-900/90 text-white -mx-4 -mt-4 p-2 px-3 rounded-t-2xl">
                      <div>
                        <h3 className="text-sm font-black tracking-wider leading-none">KOREAN</h3>
                        <span className="text-xs font-bold tracking-tight text-blue-200">MADE SIMPLE 3</span>
                      </div>
                      <div className="text-[10px] font-bold text-right leading-tight">
                        GO! Billy<br />Korean
                      </div>
                    </div>
                    <div className="text-center py-2">
                      <div className="w-10 h-10 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xs shadow-inner mb-1">
                        🇰🇷 3
                      </div>
                      <span className="text-[9px] font-semibold text-stone-700 block">Continuing your journey</span>
                    </div>
                    <div className="flex justify-between items-end text-[10px] text-stone-600 font-medium">
                      <span>Billy Go</span>
                      <span>{book.pages}</span>
                    </div>
                  </div>
                ) : book.coverStyle === 'yellow' ? (
                  <>
                    <div className="text-center">
                      <span className="text-[9px] font-bold tracking-tight text-stone-800 uppercase block">
                        Mastering Korean for Beginners in 31 days
                      </span>
                      <span className="text-[8px] text-stone-600 block">31일 완성 초급 한국어</span>
                    </div>
                    <div className="text-center py-1">
                      <h3 className="text-xl font-black tracking-tighter text-stone-900 leading-none">
                        MAGIC KOREAN
                      </h3>
                      <span className="text-xs font-bold text-stone-900 mt-0.5 block tracking-wide">
                        매직 코리안 1
                      </span>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-[9px] font-semibold text-stone-700 bg-white/80 px-2 py-0.5 rounded-md">
                        {book.pages}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-red-600 text-white flex flex-col items-center justify-center text-[7px] font-bold shadow-md p-0.5 leading-tight text-center transform rotate-6">
                        <span>FREE MP3</span>
                        <span>DOWNLOAD</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] uppercase tracking-wider font-bold bg-white/90 px-2 py-0.5 rounded-full">
                        {book.category}
                      </span>
                      <Bookmark className="w-4 h-4 opacity-60" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm line-clamp-2 leading-snug mb-1">
                        {book.title}
                      </h4>
                      <span className="text-[11px] opacity-80 block font-medium">
                        {book.pages}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Level & Title */}
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 bg-stone-100 text-stone-700 text-[11px] font-medium rounded-lg border border-stone-200/60">
                  {book.level}
                </span>
                <span className="text-xs text-stone-400">•</span>
                <span className="text-xs text-stone-500">{book.downloadsCount.toLocaleString()} downloads</span>
              </div>

              <h3 className="text-base font-bold text-stone-800 mb-1.5 group-hover:text-rose-600 transition-colors">
                {book.title}
              </h3>

              <p className="text-xs text-stone-500 mb-6 leading-relaxed line-clamp-2">
                {book.description}
              </p>
            </div>

            {/* Prominent Download Button */}
            <button
              onClick={() => onOpenDownloadModal(book.title, 'book', book.downloadUrl)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-2xl text-xs font-semibold shadow-sm transition-all group-hover:bg-rose-500"
            >
              <Download className="w-4 h-4" />
              <span>Download Book</span>
            </button>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200">
          <p className="text-stone-500 text-sm">No textbooks found matching your selection.</p>
        </div>
      )}
    </div>
  );
};
