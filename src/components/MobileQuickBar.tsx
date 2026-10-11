import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Phone, ArrowUpRight } from 'lucide-react';

interface MobileQuickBarProps {
  onQuoteClick: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onQuoteClick }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] shadow-2xl">
      <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto h-11 items-center">
        {/* Call button */}
        <a
          href={COMPANY_INFO.phoneRaw}
          className="flex items-center justify-center gap-1.5 h-full px-2 bg-slate-100 active:bg-slate-200 text-slate-900 rounded-lg text-xs font-bold transition-colors min-h-[44px]"
          aria-label="Appeler Rhône Propreté au 04 72 00 00 00"
        >
          <Phone className="w-3.5 h-3.5 text-cyan-800 shrink-0" />
          <span className="truncate">04 72 00 00 00</span>
        </a>

        {/* Quote button */}
        <button
          type="button"
          onClick={onQuoteClick}
          className="flex items-center justify-center gap-1.5 h-full px-2 bg-cyan-800 active:bg-cyan-900 text-white rounded-lg text-xs font-bold transition-colors shadow-xs cursor-pointer min-h-[44px]"
        >
          <span>Devis gratuit</span>
          <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
        </button>
      </div>
    </div>
  );
};
