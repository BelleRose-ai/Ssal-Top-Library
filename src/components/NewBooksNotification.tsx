import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, BookOpen, ArrowRight } from 'lucide-react';
import { ActiveTab } from '../types';

interface NewBooksNotificationProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export function NewBooksNotification({ setActiveTab }: NewBooksNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after a brief delay on mount
    const timer = setTimeout(() => {
      // Check if user already dismissed in this session
      const dismissed = sessionStorage.getItem('ssal_top_new_books_dismissed');
      if (!dismissed) {
        setIsVisible(true);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('ssal_top_new_books_dismissed', 'true');
  };

  const handleViewTextbooks = () => {
    setActiveTab('textbooks');
    setIsVisible(false);
    sessionStorage.setItem('ssal_top_new_books_dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full mx-4 sm:mx-0 bg-white border border-rose-200/80 rounded-3xl shadow-2xl p-5 overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 text-white flex items-center justify-center shadow-md flex-shrink-0">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>

            <div className="flex-1 pr-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200/50">
                  New Books Added!
                </span>
                <button
                  onClick={handleDismiss}
                  className="text-stone-400 hover:text-stone-700 transition-colors p-1"
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h4 className="text-sm font-bold text-stone-800 mt-1.5">
                Sejong Korean 1A - 2B (English Edition)
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Official King Sejong Institute beginner & elementary textbooks with audio support are now live in the library!
              </p>

              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={handleViewTextbooks}
                  className="flex-1 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>View Textbooks</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-3 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-xl transition-colors"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
