import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Phone, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onQuoteClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onQuoteClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top micro bar with contact & fictional disclaimer notice */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] sm:text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-300">Lyon intra-muros &amp; Métropole</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span className="text-slate-300">{COMPANY_INFO.serviceHours}</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={COMPANY_INFO.phoneRaw}
              className="text-white hover:text-cyan-300 font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap focus-visible:ring-1 focus-visible:ring-cyan-400"
              aria-label="Appeler Rhône Propreté au 04 72 00 00 00"
            >
              <Phone className="w-3 h-3 text-cyan-400" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <span aria-hidden="true" className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-300 hidden sm:inline">Entreprise fictive (concept)</span>
          </div>
        </div>
      </div>

      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-cyan-600 rounded"
        >
          <span className="w-2.5 h-2.5 bg-cyan-700 rounded-sm"></span>
          <span>Rhône Propreté</span>
        </a>

        {/* Zone 2: 4-5 concise single-line text nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
          <a
            href="#services"
            className="hover:text-cyan-800 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Services
          </a>
          <a
            href="#methode"
            className="hover:text-cyan-800 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Démarche
          </a>
          <a
            href="#secteurs"
            className="hover:text-cyan-800 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Secteurs Lyon
          </a>
          <a
            href="#engagements"
            className="hover:text-cyan-800 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Engagements
          </a>
          <a
            href="#faq"
            className="hover:text-cyan-800 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Questions
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href={COMPANY_INFO.phoneRaw}
            className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-slate-600" />
            <span>04 72 00 00 00</span>
          </a>
          <button
            type="button"
            onClick={onQuoteClick}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-cyan-800 hover:bg-cyan-900 active:bg-cyan-950 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Demander un devis</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={onQuoteClick}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-cyan-800 rounded-lg whitespace-nowrap"
          >
            Devis
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 rounded-lg border border-slate-200"
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-5 shadow-lg">
          <div className="flex flex-col gap-3 text-base font-medium text-slate-800">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100 hover:text-cyan-800"
            >
              Nos 3 Services
            </a>
            <a
              href="#methode"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100 hover:text-cyan-800"
            >
              Notre Démarche en 4 étapes
            </a>
            <a
              href="#secteurs"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100 hover:text-cyan-800"
            >
              Zones d'intervention (Lyon &amp; Grand Lyon)
            </a>
            <a
              href="#engagements"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100 hover:text-cyan-800"
            >
              Engagements de service
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100 hover:text-cyan-800"
            >
              Foire aux questions
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={COMPANY_INFO.phoneRaw}
                className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 text-slate-900 rounded-lg text-sm font-semibold"
              >
                <Phone className="w-4 h-4 text-cyan-800" />
                <span>Appeler le {COMPANY_INFO.phone}</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onQuoteClick();
                }}
                className="w-full py-3 bg-cyan-800 text-white rounded-lg text-sm font-semibold text-center"
              >
                Demander un devis gratuit
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
