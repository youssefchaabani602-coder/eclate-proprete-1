import React, { useState } from 'react';
import { SERVICE_AREAS } from '../data/companyData';
import { MapPin, Search, CheckCircle2, AlertCircle, Clock, Navigation } from 'lucide-react';

export const ServiceAreaSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);

  // Quick checker logic
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const searchResult = searchQuery.trim().length > 0 ? (() => {
    // Check if query matches any postal code or neighborhood
    const foundArea = SERVICE_AREAS.find((area) =>
      area.postalCodes.some((code) => code.includes(normalizedQuery)) ||
      area.neighborhoods.some((neigh) => neigh.toLowerCase().includes(normalizedQuery)) ||
      area.zone.toLowerCase().includes(normalizedQuery)
    );

    if (foundArea) {
      return {
        matched: true,
        area: foundArea,
        message: `Secteur couvert par nos équipes ! Délai indicatif : ${foundArea.leadTime}.`,
      };
    } else if (normalizedQuery.startsWith('69') && normalizedQuery.length === 5) {
      return {
        matched: true,
        area: null,
        message: `Code postal ${normalizedQuery} (Rhône) : intervention possible sur étude de faisabilité et planning sous 48h.`,
      };
    } else {
      return {
        matched: false,
        area: null,
        message: `Commune non répertoriée dans la zone prioritaire immédiate. N'hésitez pas à nous contacter pour une intervention sur-mesure dans le département du Rhône.`,
      };
    }
  })() : null;

  return (
    <section id="secteurs" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-wider uppercase text-cyan-800 mb-2">
            Zone Géographique d'Intervention
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Interventions sur Lyon intra-muros et sa première couronne
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Nos équipes mobiles sont réparties stratégiquement pour intervenir rapidement tant au cœur de la Presqu'île que dans les pôles d'activités tertiaires et résidentiels de la métropole.
          </p>
        </div>

        {/* Interactive Postal Code / Neighborhood Verification Widget */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm mb-12">
          <div className="max-w-2xl">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-cyan-700" />
              <span>Vérifier la couverture de votre adresse</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              Saisissez votre code postal (ex: 69002, 69006, 69100) ou le nom de votre quartier pour vérifier nos délais d'intervention.
            </p>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ex. 69003, Part-Dieu, Villeurbanne, Croix-Rousse..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 transition-all outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 hover:text-slate-700"
                >
                  Effacer
                </button>
              )}
            </div>

            {/* Live Verification Result */}
            {searchResult && (
              <div
                className={`mt-4 p-4 rounded-xl border text-xs sm:text-sm flex items-start gap-3 ${
                  searchResult.matched
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50/80 border-amber-200 text-amber-900'
                }`}
              >
                {searchResult.matched ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold">{searchResult.message}</p>
                  {searchResult.area && (
                    <p className="mt-1 text-emerald-700 text-xs">
                      Zone : {searchResult.area.zone} · Déplacement inclus.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4 Interactive Zone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICE_AREAS.map((area, idx) => (
            <div
              key={area.zone}
              onClick={() => setActiveZoneIndex(idx)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                activeZoneIndex === idx
                  ? 'bg-white border-cyan-700 shadow-md ring-1 ring-cyan-700'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-slate-500">
                  Zone 0{idx + 1}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-800">
                  <Clock className="w-3 h-3 text-cyan-700" />
                  <span>{area.leadTime}</span>
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-2">
                {area.zone}
              </h4>

              {/* Postal codes badge strip */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {area.postalCodes.map((cp) => (
                  <span
                    key={cp}
                    className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 text-slate-700 rounded"
                  >
                    {cp}
                  </span>
                ))}
              </div>

              {/* Neighborhoods list */}
              <div className="border-t border-slate-100 pt-3">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Quartiers &amp; Communes :
                </p>
                <ul className="text-xs text-slate-600 space-y-1">
                  {area.neighborhoods.slice(0, 4).map((n, nIdx) => (
                    <li key={nIdx} className="flex items-center gap-1.5 truncate">
                      <span className="w-1 h-1 rounded-full bg-cyan-700 shrink-0"></span>
                      <span className="truncate">{n}</span>
                    </li>
                  ))}
                  {area.neighborhoods.length > 4 && (
                    <li className="text-[11px] text-slate-400 italic">
                      + {area.neighborhoods.length - 4} autres secteurs
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Travel Policy Note */}
        <div className="mt-8 p-4 bg-slate-100/70 rounded-xl text-xs text-slate-600 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-800 shrink-0" />
            <span>Frais de déplacement intégrés aux forfaits dans toute la Métropole de Lyon.</span>
          </div>
          <span className="text-slate-500">Rayon d'action étendu jusqu'à 25 km sur demande.</span>
        </div>
      </div>
    </section>
  );
};
