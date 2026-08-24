import React, { useState } from 'react';
import { ActiveTab } from './types';
import { topikPapers, textbooks } from './data';
import { Header } from './components/Header';
import { BannerAd } from './components/BannerAd';
import { TopikList } from './components/TopikList';
import { TextbookList } from './components/TextbookList';
import { DownloadModal } from './components/DownloadModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('topik');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalType, setModalType] = useState<'question' | 'answer' | 'audio' | 'book'>('book');
  const [modalUrl, setModalUrl] = useState('');

  const handleOpenDownloadModal = (
    title: string,
    type: 'question' | 'answer' | 'audio' | 'book',
    url: string
  ) => {
    setModalTitle(title);
    setModalType(type);
    setModalUrl(url);
    setIsModalOpen(true);
  };

  // Filter items based on search query
  const filteredPapers = topikPapers.filter((paper) => {
    const q = searchQuery.toLowerCase();
    return (
      paper.session.toLowerCase().includes(q) ||
      paper.year.includes(q) ||
      paper.date.toLowerCase().includes(q) ||
      paper.level.toLowerCase().includes(q)
    );
  });

  const filteredTextbooks = textbooks.filter((book) => {
    const q = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(q) ||
      book.description.toLowerCase().includes(q) ||
      book.category.toLowerCase().includes(q) ||
      book.level.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-stone-800 font-sans selection:bg-rose-100 selection:text-rose-800">
      {/* Header with Tabs & Search */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalPapers={topikPapers.length}
        totalBooks={textbooks.length}
      />

      {/* Friday Update Banner */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-4">
        <div className="bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-rose-500/10 border border-rose-200/60 p-4 rounded-2xl flex items-center gap-3 text-stone-800 shadow-sm">
          <span className="text-xl">📅</span>
          <div>
            <p className="text-sm font-semibold text-stone-800">Books are updated every Friday! Check back to see your books.</p>
            <p className="text-xs text-stone-600">New TOPIK exam papers and study guides are refreshed weekly.</p>
          </div>
        </div>
      </div>

      {/* Top Banner Ad Slot immediately below header */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-8">
        <BannerAd size="leaderboard" />
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 space-y-12">
        {activeTab === 'topik' ? (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-rose-50/50 border border-rose-200/50 p-5 rounded-3xl">
              <div>
                <h2 className="text-lg font-bold text-stone-800 mb-1">
                  TOPIK Past Exam Papers Archive
                </h2>
                <p className="text-xs text-stone-600">
                  Download authentic question papers, answer keys, and listening audio (.mp3) from past Korean proficiency tests.
                </p>
              </div>
              <div className="text-xs bg-white px-3.5 py-2 rounded-2xl border border-rose-200/60 font-medium text-rose-700 shadow-sm self-start sm:self-auto">
                ⚡ 100% Free Downloads
              </div>
            </div>

            <TopikList
              papers={filteredPapers}
              onOpenDownloadModal={handleOpenDownloadModal}
            />

            {/* Mid page rectangle banner ad */}
            <div className="py-6">
              <BannerAd size="rectangle" className="max-w-md mx-auto" />
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-amber-50/50 border border-amber-200/50 p-5 rounded-3xl">
              <div>
                <h2 className="text-lg font-bold text-stone-800 mb-1">
                  Korean Study Textbooks & Grammar Guides
                </h2>
                <p className="text-xs text-stone-600">
                  Curated PDF textbooks from beginner (Level 1) to advanced (Level 4) with grammar points and vocabulary lists.
                </p>
              </div>
              <div className="text-xs bg-white px-3.5 py-2 rounded-2xl border border-amber-200/60 font-medium text-amber-800 shadow-sm self-start sm:self-auto">
                📚 Verified Study Materials
              </div>
            </div>

            <TextbookList
              textbooks={filteredTextbooks}
              onOpenDownloadModal={handleOpenDownloadModal}
            />

            {/* Mid page rectangle banner ad */}
            <div className="py-6">
              <BannerAd size="rectangle" className="max-w-md mx-auto" />
            </div>
          </div>
        )}

        {/* Make a Request Box */}
        <div className="bg-white border border-stone-200/80 rounded-3xl p-6 shadow-sm max-w-xl mx-auto my-12 text-center space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-lg">
            ✉️
          </div>
          <h3 className="text-base font-bold text-stone-800">Make a Request</h3>
          <p className="text-xs text-stone-600 max-w-sm mx-auto">
            Want a specific textbook or past paper that isn't listed here? Request the books you want, and they will be added!
          </p>
          <div className="inline-flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-xl border border-stone-200/80 select-all font-mono text-xs text-stone-800 font-semibold cursor-pointer" title="Click or copy email">
            info.ssal.top.academy@gmail.com
          </div>
          <p className="text-[11px] text-stone-400">
            Copy the email address above and send your request to our team.
          </p>
        </div>

        {/* Footer Banner Ad */}
        <div className="max-w-6xl mx-auto pb-8">
          <BannerAd />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Ad-Gate & Download Flow Modal */}
      <DownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        resourceTitle={modalTitle}
        resourceType={modalType}
        targetUrl={modalUrl}
      />
    </div>
  );
}
