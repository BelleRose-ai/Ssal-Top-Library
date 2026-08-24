import React, { useState } from 'react';
import { FileText, CheckCircle2, Headphones, Download, Calendar, ArrowUpRight, Award } from 'lucide-react';
import { TopikPaper, TopikFilter } from '../types';

interface TopikListProps {
  papers: TopikPaper[];
  onOpenDownloadModal: (title: string, type: 'question' | 'answer' | 'audio', url: string) => void;
}

export const TopikList: React.FC<TopikListProps> = ({ papers, onOpenDownloadModal }) => {
  const [filter, setFilter] = useState<TopikFilter>('All');

  const filteredPapers = papers.filter((paper) => {
    if (filter === 'All') return true;
    return paper.level === filter || paper.level === 'Both';
  });

  return (
    <div className="space-y-6">
      {/* Sub-filter pills for TOPIK */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {(['All', 'TOPIK I', 'TOPIK II'] as TopikFilter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-2xl text-xs font-medium whitespace-nowrap transition-all ${
              filter === f
                ? 'bg-stone-800 text-white shadow-sm'
                : 'bg-white hover:bg-stone-100 text-stone-600 border border-stone-200/80'
            }`}
          >
            {f === 'All' ? 'All Exam Sessions' : f === 'TOPIK I' ? 'TOPIK I (Beginner 1-2)' : 'TOPIK II (Intermediate-Advanced 3-6)'}
          </button>
        ))}
      </div>

      {/* Grid of TOPIK Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPapers.map((paper) => (
          <div
            key={paper.id}
            className={`border rounded-3xl p-6 shadow-sm transition-all flex flex-col justify-between relative group ${
              paper.isComingSoon
                ? 'bg-stone-50/90 border-stone-200/60 opacity-85'
                : 'bg-white border-stone-200/80 hover:shadow-md'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="inline-flex items-center gap-2">
                  <span className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs shadow-inner ${
                    paper.isComingSoon ? 'bg-stone-200 text-stone-500' : 'bg-rose-100/80 text-rose-600'
                  }`}>
                    🇰🇷
                  </span>
                  <div>
                    <span className={`text-[11px] uppercase tracking-wider font-semibold ${
                      paper.isComingSoon ? 'text-stone-400' : 'text-rose-600'
                    }`}>
                      {paper.year} • {paper.date}
                    </span>
                    <h3 className={`text-lg font-bold transition-colors ${
                      paper.isComingSoon ? 'text-stone-600' : 'text-stone-800 group-hover:text-rose-600'
                    }`}>
                      {paper.session}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {paper.isComingSoon && (
                    <span className="px-3 py-1 bg-stone-200/80 text-stone-600 text-xs font-semibold rounded-xl border border-stone-300/60">
                      Coming Soon
                    </span>
                  )}
                  <span className="px-3 py-1 bg-stone-100 text-stone-700 text-xs font-medium rounded-xl border border-stone-200/60 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>{paper.level}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-stone-500 mb-6">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  Released {paper.year}
                </span>
                <span>•</span>
                <span>{paper.downloadsCount.toLocaleString()} downloads</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-stone-100">
              {paper.isComingSoon ? (
                <div className="py-2.5 px-4 bg-stone-100/80 text-stone-500 rounded-2xl text-xs font-medium text-center border border-stone-200/60 flex items-center justify-center gap-2">
                  <span>⏳ Coming Soon — Papers & Audio releasing shortly</span>
                </div>
              ) : paper.files && paper.files.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {paper.files.map((file, idx) => {
                    const isAudio = file.type === 'audio';
                    const isAnswer = file.type === 'answer';
                    const isTranscript = file.type === 'transcript';
                    const bgClass = isAudio 
                      ? 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200/40' 
                      : isAnswer 
                      ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200/40' 
                      : isTranscript
                      ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200/40'
                      : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200/40';

                    return (
                      <button
                        key={idx}
                        onClick={() => onOpenDownloadModal(`${paper.session} - ${file.title}`, file.type === 'audio' ? 'audio' : file.type === 'answer' ? 'answer' : 'question', file.url)}
                        className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl text-xs font-medium transition-all shadow-sm border ${bgClass}`}
                      >
                        {isAudio ? <Headphones className="w-3.5 h-3.5" /> : isAnswer ? <CheckCircle2 className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
                        <span className="truncate">{file.title}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => onOpenDownloadModal(`${paper.session} - Question Paper`, 'question', paper.questionPdfUrl)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-2xl text-xs font-medium transition-all shadow-sm border border-rose-200/40"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Question (PDF)</span>
                  </button>

                  <button
                    onClick={() => onOpenDownloadModal(`${paper.session} - Answer Key`, 'answer', paper.answerPdfUrl)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-2xl text-xs font-medium transition-all shadow-sm border border-emerald-200/40"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Answer Key</span>
                  </button>

                  <button
                    onClick={() => onOpenDownloadModal(`${paper.session} - Listening Audio`, 'audio', paper.audioUrl || paper.questionPdfUrl)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-800 rounded-2xl text-xs font-medium transition-all shadow-sm border border-purple-200/40"
                  >
                    <Headphones className="w-3.5 h-3.5" />
                    <span>Audio (.mp3)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredPapers.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200">
          <p className="text-stone-500 text-sm">No TOPIK exam papers found matching your search.</p>
        </div>
      )}
    </div>
  );
};
