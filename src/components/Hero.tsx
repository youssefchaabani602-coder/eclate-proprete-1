import React from 'react';
import { COMPANY_INFO, IMAGES } from '../data/companyData';
import { Phone, ArrowRight, ShieldCheck, Clock, MapPin, Sparkles } from 'lucide-react';

interface HeroProps {
  onQuoteClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick }) => {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Background subtle gradient pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & Clear Headline */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Unboxed editorial location marker (Anti-pill discipline) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-cyan-300 mb-4">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Lyon intra-muros &amp; Métropole</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>Devis gratuit sous 24&nbsp;h</span>
            </div>

            {/* Clear, direct headline explaining the service */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance mb-5">
              Nettoyage professionnel résidentiel et tertiaire à Lyon.
            </h1>

            {/* Descriptive subtitle */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mb-8">
              Entretien régulier de bureaux, remise en état d'appartements et nettoyage de locaux d'activité. Des interventions précises, encadrées par un cahier des charges clair et des agents de propreté qualifiés.
            </p>

            {/* Prominent CTAs: Quote request and phone button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
              <button
                type="button"
                onClick={onQuoteClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 rounded-lg shadow-md transition-all cursor-pointer whitespace-nowrap focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Demander un devis gratuit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={COMPANY_INFO.phoneRaw}
                className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 text-sm sm:text-base font-medium text-white hover:text-cyan-200 bg-slate-800/90 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Appeler Rhône Propreté au 04 72 00 00 00"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Appeler le {COMPANY_INFO.phone}</span>
              </a>
            </div>

            {/* Unboxed trust parameters (Zero pill - clean text with bullet separators) */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Interventions programmées 7j/7 selon contrat</span>
              </div>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Assurance responsabilité civile professionnelle</span>
              </div>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Produits et matériel professionnel inclus</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset (Clean single-elevation container) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-800 aspect-16/10 lg:aspect-4/3 group">
              <picture>
                <source srcSet={IMAGES.heroWebp} type="image/webp" />
                <img
                  src={IMAGES.hero}
                  alt="Intérieur lumineux d'un appartement lyonnais avec vue sur la ville et matériel de nettoyage soigné"
                  width={1600}
                  height={1000}
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </picture>
              {/* Subtle protective gradient scrim for high readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none"></div>

              {/* Contextual caption in bottom overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs bg-slate-900/90 backdrop-blur-sm p-3 rounded-lg border border-slate-700/80">
                <p className="font-semibold text-slate-100">
                  Prestations méticuleuses au cœur de Lyon
                </p>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Appartements anciens, surfaces contemporaines et espaces de travail
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
