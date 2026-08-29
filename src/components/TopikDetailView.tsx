import React, { useEffect } from 'react';
import { TopikPaper } from '../types';
import { ArrowLeft, Download, Headphones, FileText, Calendar, Award, CheckCircle2, Share2, BookOpen } from 'lucide-react';
import { BannerAd } from './BannerAd';
import { Footer } from './Footer';

interface TopikDetailViewProps {
  paper: TopikPaper;
  onBack: () => void;
  onOpenDownloadModal: (title: string, type: 'question' | 'answer' | 'audio', url: string) => void;
}

export const TopikDetailView: React.FC<TopikDetailViewProps> = ({ paper, onBack, onOpenDownloadModal }) => {
  const paperSlug = paper.id.replace(/^topik-/, '');
  const canonicalUrl = `https://ssal-top-library.vercel.app/topik/${paperSlug}`;

  useEffect(() => {
    document.title = `${paper.session} - Free PDF & Audio Download | Ssal-Top Library`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        `Download official ${paper.session} (${paper.year}) reading test paper, answer keys, and listening audio (.mp3). 100% free TOPIK study materials.`
      );
    }

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    window.scrollTo(0, 0);
  }, [paper, canonicalUrl]);

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
              Official TOPIK Archive
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
            <a href="/#topik" onClick={(e) => { e.preventDefault(); onBack(); }} className="hover:text-rose-600 transition-colors">
              TOPIK Papers
            </a>
            <span>→</span>
            <span className="text-stone-800 font-medium">{paper.level}</span>
            <span>→</span>
            <span className="text-rose-600 font-semibold">{paper.session}</span>
          </nav>

          {/* Top Banner Ad */}
          <BannerAd size="leaderboard" />

          {/* Paper Header Card */}
          <div className="bg-white border border-stone-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 font-bold flex items-center justify-center text-base shadow-inner">
                    🇰🇷
                  </span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200/50">
                      {paper.year} • {paper.date}
                    </span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  {paper.session}
                </h1>
                <p className="text-sm text-stone-600 max-w-2xl leading-relaxed">
                  Official Korean proficiency test materials for {paper.session}. Includes complete exam papers, answer keys, transcripts, and listening audio files in high quality.
                </p>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-2 bg-stone-50 p-4 rounded-2xl border border-stone-200/60 self-start">
                <span className="px-3 py-1 bg-white text-stone-700 text-xs font-semibold rounded-xl border border-stone-200/80 shadow-sm flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>{paper.level}</span>
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  📥 {paper.downloadsCount.toLocaleString()} downloads
                </span>
              </div>
            </div>

            {paper.isComingSoon ? (
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-5 text-center space-y-2">
                <h3 className="text-sm font-bold text-amber-900">Coming Soon</h3>
                <p className="text-xs text-amber-700">
                  This exam paper and associated audio files are currently being prepared and will be released this Friday.
                </p>
              </div>
            ) : (
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                  Available Files & Downloads
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {paper.files && paper.files.map((file, idx) => (
                    <button
                      key={idx}
                      onClick={() => onOpenDownloadModal(
                        `${paper.session} - ${file.title}`,
                        file.type === 'audio' ? 'audio' : file.type === 'answer' ? 'answer' : 'question',
                        file.url
                      )}
                      className="flex items-center justify-between p-4 bg-stone-50 hover:bg-rose-50/60 border border-stone-200/80 hover:border-rose-300/80 rounded-2xl transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          file.type === 'audio'
                            ? 'bg-amber-100 text-amber-700'
                            : file.type === 'answer'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-rose-100 text-rose-700'
                        }`}>
                          {file.type === 'audio' ? <Headphones className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-stone-800 group-hover:text-rose-700 block transition-colors">
                            {file.title}
                          </span>
                          <span className="text-[10px] text-stone-500 uppercase font-semibold">
                            {file.type === 'audio' ? 'MP3 Audio File' : 'PDF Document'}
                          </span>
                        </div>
                      </div>

                      <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-700 group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600 transition-all shadow-sm">
                        <Download className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mid Rectangle Ad */}
          <div className="py-4">
            <BannerAd size="rectangle" className="max-w-md mx-auto" />
          </div>

          {/* Study Tips & Information */}
          <div className="bg-white border border-stone-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-stone-800">
              How to Prepare for {paper.session}
            </h3>
            <div className="text-xs text-stone-600 space-y-2 leading-relaxed">
              <p>
                1. <strong>Simulate Real Exam Conditions:</strong> Print out the Reading test paper and set a timer for 60 minutes (TOPIK I) or 100 minutes (TOPIK II).
              </p>
              <p>
                2. <strong>Practice Listening:</strong> Download the official MP3 listening audio file and practice answering listening comprehension questions without pausing.
              </p>
              <p>
                3. <strong>Review Answer Keys:</strong> Check your answers against the official answer key PDF to identify weak grammar points and vocabulary gaps.
              </p>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
