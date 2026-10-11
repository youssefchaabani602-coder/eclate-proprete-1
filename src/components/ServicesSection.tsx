import React from 'react';
import { SERVICES_DATA, ServiceItem } from '../data/companyData';
import { Check, ArrowRight, Home, Building2, Sparkles, Clock, Layers } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getCategoryIcon = (category: ServiceItem['category']) => {
    switch (category) {
      case 'residential':
        return <Home className="w-5 h-5 text-cyan-700" />;
      case 'commercial':
        return <Building2 className="w-5 h-5 text-cyan-700" />;
      case 'specialized':
        return <Sparkles className="w-5 h-5 text-cyan-700" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-wider uppercase text-cyan-800 mb-2">
            Nos Prestations Dédiées
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Trois pôles d'expertise pour particuliers et entreprises à Lyon
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Chaque environnement requiert des méthodes, des produits et un équipement adaptés. Nos interventions font l'objet d'un cahier des charges précis convenu avant toute première mission.
          </p>
        </div>

        {/* 3 Service Blocks with detailed scope and imagery */}
        <div className="flex flex-col gap-12 sm:gap-16">
          {SERVICES_DATA.map((service, index) => {
            const isReversed = index % 2 === 1;

            return (
              <article
                key={service.id}
                id={`service-${service.id}`}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all hover:shadow-md scroll-mt-24"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Image container with WebP support and dimensions */}
                  <div
                    className={`lg:col-span-5 relative min-h-[260px] sm:min-h-[320px] lg:min-h-full bg-slate-100 ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <picture>
                      <source srcSet={service.imageWebp} type="image/webp" />
                      <img
                        src={service.image}
                        alt={service.title}
                        width={1600}
                        height={1200}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-slate-900/10 pointer-events-none"></div>
                  </div>

                  {/* Content Container */}
                  <div
                    className={`lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div>
                      {/* Service Category Tag and Title */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-cyan-50 rounded-lg">
                          {getCategoryIcon(service.category)}
                        </div>
                        <span className="text-xs font-semibold text-cyan-900 uppercase tracking-wider">
                          Service {index + 1} sur 3
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm font-medium text-cyan-800 mb-4">
                        {service.subtitle}
                      </p>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Scope & Duration indicators (Unboxed, clean) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 mb-6 bg-slate-50 rounded-xl border border-slate-200/60 text-xs">
                        <div className="flex items-start gap-2">
                          <Layers className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-800 block">Périmètre d'application :</span>
                            <span className="text-slate-600">{service.scope}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Clock className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-800 block">Rythme préconisé :</span>
                            <span className="text-slate-600">{service.typicalDuration}</span>
                          </div>
                        </div>
                      </div>

                      {/* Checklist */}
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                        Opérations comprises dans ce service :
                      </h4>
                      <ul className="space-y-2.5 mb-8">
                        {service.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                            <span className="mt-0.5 w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action button */}
                    <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <span className="text-xs text-slate-500">
                        Devis détaillé gratuit sans engagement
                      </span>
                      <button
                        type="button"
                        onClick={() => onSelectService(service.id)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-cyan-900 rounded-lg transition-colors cursor-pointer"
                      >
                        <span>Estimer ce service</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
