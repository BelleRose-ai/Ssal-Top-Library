import React, { useEffect, useState } from 'react';
import { X, Sparkles, Download, Headphones, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { AD_SMARTLINK } from '../data';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceTitle: string;
  resourceType: 'question' | 'answer' | 'audio' | 'book';
  targetUrl: string;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  resourceTitle,
  resourceType,
  targetUrl,
}) => {
  const [countdown, setCountdown] = useState(7);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(7);
      setIsReady(false);
      return;
    }

    // Trigger Smartlink Ad in new tab immediately when modal opens
    try {
      window.open(AD_SMARTLINK, '_blank');
    } catch (e) {
      console.log('Popup blocked or handled');
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsReady(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownloadNow = () => {
    window.open(targetUrl, '_blank');
    onClose();
  };

  const getIcon = () => {
    switch (resourceType) {
      case 'question':
        return <FileText className="w-6 h-6 text-rose-500" />;
      case 'answer':
        return <CheckCircle2 className="w-6 h-6 text-emerald-600" />;
      case 'audio':
        return <Headphones className="w-6 h-6 text-purple-600" />;
      case 'book':
        return <Download className="w-6 h-6 text-amber-600" />;
    }
  };

  const getTypeLabel = () => {
    switch (resourceType) {
      case 'question':
        return 'Question Paper PDF';
      case 'answer':
        return 'Answer Key PDF';
      case 'audio':
        return 'Listening Audio (.mp3)';
      case 'book':
        return 'Study Textbook (.pdf)';
    }
  };

  const progressPercentage = ((7 - countdown) / 7) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAFAF8] border border-stone-200 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 p-2 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center shadow-inner">
            {getIcon()}
          </div>
          <div>
            <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider block">
              {getTypeLabel()}
            </span>
            <h3 className="text-lg md:text-xl font-bold text-stone-800 line-clamp-1">
              {resourceTitle}
            </h3>
          </div>
        </div>

        <p className="text-xs text-stone-500 mb-6 bg-amber-50 border border-amber-200/60 p-3 rounded-xl">
          ✨ Supporting our free educational archive. A direct ad has opened in a new tab. Please wait a few seconds while your secure link is generated.
        </p>

        {/* Ad Slot Placeholder in Modal */}
        <div className="bg-stone-100 border border-stone-200/80 rounded-2xl p-4 mb-6 text-center relative">
          <div className="absolute top-2 right-2 text-[9px] uppercase bg-stone-200 text-stone-600 px-2 py-0.5 rounded font-medium">
            Interstitial Ad Slot
          </div>
          <div className="flex flex-col items-center justify-center py-4">
            <Sparkles className="w-5 h-5 text-rose-400 mb-2 animate-bounce" />
            <span className="text-xs font-semibold text-stone-700">Recommended Korean Learning Tool</span>
            <span className="text-[11px] text-stone-500 mt-0.5">Master Korean with 1-on-1 native tutors online.</span>
          </div>
        </div>

        {/* Countdown Progress Bar */}
        {!isReady ? (
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center text-xs font-medium text-stone-700">
              <span>Generating secure download link...</span>
              <span className="text-rose-600 font-bold">{countdown}s</span>
            </div>
            <div className="w-full bg-stone-200 h-3 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-rose-400 to-amber-400 h-full rounded-full transition-all duration-1000"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-stone-400 text-center">
              Your link will be ready automatically in {countdown} seconds.
            </p>
          </div>
        ) : (
          <div className="space-y-3 mb-6 animate-fade-in">
            <div className="p-3 bg-emerald-50 border border-emerald-200/70 rounded-xl text-center text-emerald-800 text-xs font-medium flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Link generated successfully! Ready for download.</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-2xl border border-stone-200 hover:bg-stone-100 text-stone-700 text-sm font-medium transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleDownloadNow}
            disabled={!isReady}
            className={`flex-2 py-3 px-6 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all ${
              isReady
                ? 'bg-rose-500 hover:bg-rose-600 text-white cursor-pointer shadow-rose-200'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            <span>{isReady ? '📥 Download Now (Ready)' : `Please wait (${countdown}s)`}</span>
            {isReady && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
