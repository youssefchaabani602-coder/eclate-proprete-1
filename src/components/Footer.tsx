import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Phone, Mail, MapPin, Clock, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-12">
          {/* Col 1 & 2: Brand identity & legal disclosure */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-white text-lg font-bold tracking-tight mb-3">
              <span className="w-2.5 h-2.5 bg-cyan-400 rounded-sm"></span>
              <span>{COMPANY_INFO.name}</span>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 max-w-sm">
              Services professionnels d'entretien ménager résidentiel et tertiaire sur la métropole lyonnaise. Méthodes rigoureuses et produits éco-labellisés.
            </p>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-[11px] text-slate-400 max-w-sm">
              <span className="font-semibold text-slate-300 block mb-0.5">Mentions du concept :</span>
              {COMPANY_INFO.disclaimer}
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors">
                  Nos 3 Pôles de Services
                </a>
              </li>
              <li>
                <a href="#methode" className="hover:text-cyan-300 transition-colors">
                  Démarche &amp; Méthode
                </a>
              </li>
              <li>
                <a href="#secteurs" className="hover:text-cyan-300 transition-colors">
                  Secteurs d'intervention Lyon
                </a>
              </li>
              <li>
                <a href="#engagements" className="hover:text-cyan-300 transition-colors">
                  Engagements &amp; Matériel
                </a>
              </li>
              <li>
                <a href="#devis" className="hover:text-cyan-300 transition-colors">
                  Simulateur &amp; Devis gratuit
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-300 transition-colors">
                  Questions fréquentes
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Prestations */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Prestations
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#service-residentiel" className="hover:text-cyan-300 transition-colors">
                  Nettoyage appartements &amp; maisons
                </a>
              </li>
              <li>
                <a href="#service-tertiaire" className="hover:text-cyan-300 transition-colors">
                  Entretien de bureaux &amp; tertiaire
                </a>
              </li>
              <li>
                <a href="#service-specialise" className="hover:text-cyan-300 transition-colors">
                  Remise en état fin de chantier
                </a>
              </li>
              <li>
                <a href="#service-specialise" className="hover:text-cyan-300 transition-colors">
                  Nettoyage avant / après déménagement
                </a>
              </li>
              <li>
                <a href="#service-residentiel" className="hover:text-cyan-300 transition-colors">
                  Lavage de vitres &amp; baies vitrées
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Coordonnées Fictives */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Agence Lyon (Fictif)
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a href={COMPANY_INFO.phoneRaw} className="text-white hover:text-cyan-300 font-semibold">
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{COMPANY_INFO.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.serviceHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2026 {COMPANY_INFO.name} — Tous droits réservés.</span>
            <span>·</span>
            <span>SIRET (fictif) : {COMPANY_INFO.siretFictif}</span>
            <span>·</span>
            <span>RCS Lyon</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer py-1"
            aria-label="Retour en haut de page"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
