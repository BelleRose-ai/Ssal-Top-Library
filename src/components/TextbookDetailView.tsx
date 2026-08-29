import React, { useEffect } from 'react';
import { Textbook } from '../types';
import { ArrowLeft, Download, BookOpen, Bookmark, Sparkles, CheckCircle2 } from 'lucide-react';
import { BannerAd } from './BannerAd';
import { Footer } from './Footer';

interface TextbookDetailViewProps {
  book: Textbook;
  onBack: () => void;
  onOpenDownloadModal: (title: string, type: 'book', url: string) => void;
}

export const TextbookDetailView: React.FC<TextbookDetailViewProps> = ({ book, onBack, onOpenDownloadModal }) => {
  const canonicalUrl = `https://ssal-top-library.vercel.app/book/${book.id}`;

  useEffect(() => {
    document.title = `${book.title} - Free PDF Download | Ssal-Top Library`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        `Download ${book.title} (${book.pages}) PDF textbook. ${book.description} 100% free Korean learning materials.`
      );
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    window.scrollTo(0, 0);
  }, [book, canonicalUrl]);

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
    <div className="min-h-screen bg-[#FAFAF8] text-stone-800 font-sans selection:bg-rose-100 selection:text-rose-800 flex flex-col justify-between">
      <div>
        {/* Header Navigation / Back Bar */}
        <div className="bg-white border-b border-stone-200/80 sticky top-0 z-40 backdrop-blur-md bg-white/90">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs font-semibold text-stone-700 hover:text-rose-600 bg-stone-100 hover:bg-stone-200 px-3.5 py-2 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Library</span>
            </button>
            <div className="text-xs font-medium text-stone-500">
              Korean Textbook Library
            </div>
          </div>
        </div>

        {/* Main Container */}
        <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-stone-500 flex items-center gap-2 flex-wrap">
            <a href="/" onClick={(e) => { e.preventDefault(); onBack(); }} className="hover:text-rose-600 transition-colors">
              Home
            </a>
            <span>→</span>
            <a href="/#textbooks" onClick={(e) => { e.preventDefault(); onBack(); }} className="hover:text-rose-600 transition-colors">
              Textbooks
            </a>
            <span>→</span>
            <span className="text-stone-800 font-medium">{book.level}</span>
            <span>→</span>
            <span className="text-rose-600 font-semibold truncate max-w-xs">{book.title}</span>
          </nav>

          {/* Top Banner Ad */}
          <BannerAd size="leaderboard" />

          {/* Textbook Detail Card */}
          <div className="bg-white border border-stone-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* Cover Preview */}
              <div className={`w-full h-72 rounded-2xl p-6 flex flex-col justify-between border shadow-md relative overflow-hidden ${book.coverImageUrl ? 'p-0 bg-stone-100' : getCoverColorClass(book.coverStyle)}`}>
                {book.coverImageUrl ? (
                  <div className="relative w-full h-full">
                    <img
                      src={book.coverImageUrl}
                      alt={book.title}
                      className="w-full h-full object-cover rounded-2xl"
                      referrerPolicy="no-referrer"
                    />
                    {book.tag && (
                      <span className="absolute top-3 right-3 bg-rose-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider">
                        {book.tag}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="relative h-full flex flex-col justify-between py-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold opacity-75">
                        {book.category}
                      </span>
                      <h3 className="text-2xl font-bold tracking-tight mt-1 leading-snug">
                        {book.title}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between text-xs font-medium opacity-90">
                      <span>📖 {book.pages}</span>
                      <span>⭐ Verified PDF</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Info & Download */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-stone-100 text-stone-700 text-xs font-semibold rounded-xl border border-stone-200/60">
                    {book.level}
                  </span>
                  <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-xl border border-amber-200/60">
                    {book.category}
                  </span>
                  {book.tag && (
                    <span className="px-3 py-1 bg-rose-50 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200/60">
                      {book.tag}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-snug">
                  {book.title}
                </h1>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {book.description}
                </p>

                <div className="flex items-center gap-6 py-3 border-t border-b border-stone-100 text-xs text-stone-500">
                  <span>📖 <strong>Pages:</strong> {book.pages}</span>
                  <span>📥 <strong>Downloads:</strong> {book.downloadsCount.toLocaleString()}</span>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onOpenDownloadModal(book.title, 'book', book.downloadUrl)}
                    className="w-full sm:w-auto px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2.5 group text-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Textbook (PDF)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mid Rectangle Ad */}
          <div className="py-4">
            <BannerAd size="rectangle" className="max-w-md mx-auto" />
          </div>

          {/* Study Overview */}
          <div className="bg-white border border-stone-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-stone-800">
              About This Textbook
            </h3>
            <div className="text-xs text-stone-600 space-y-2 leading-relaxed">
              <p>
                This official Korean learning resource is provided in high-resolution PDF format for self-study and classroom use.
              </p>
              <p>
                For best results, pair this textbook with authentic TOPIK past exam papers and daily vocabulary practice.
              </p>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
