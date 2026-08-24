import React, { useEffect, useRef } from 'react';

interface BannerAdProps {
  className?: string;
}

export const BannerAd: React.FC<BannerAdProps> = ({ className = '' }) => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bannerRef.current) return;

    // Prevent duplicate injection
    if (bannerRef.current.querySelector('script')) return;

    const invokeScript = document.createElement('script');
    invokeScript.async = true;
    invokeScript.setAttribute('data-cfasync', 'false');
    invokeScript.src = 'https://pl31005034.profitableratecpmnetwork.com/c756321adecd741cfe4708e5348fe6db/invoke.js';

    const containerDiv = document.createElement('div');
    containerDiv.id = 'container-c756321adecd741cfe4708e5348fe6db';

    bannerRef.current.appendChild(invokeScript);
    bannerRef.current.appendChild(containerDiv);
  }, []);

  return (
    <div
      className={`bg-stone-50 border border-stone-200/80 rounded-2xl p-3 text-center overflow-hidden shadow-sm flex items-center justify-center min-h-[90px] ${className}`}
      ref={bannerRef}
    >
      <div className="text-[11px] text-stone-400">Loading Advertisement...</div>
    </div>
  );
};
