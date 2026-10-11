import React from 'react';
import { ClipboardCheck, Calendar, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

interface ProcessSectionProps {
  onQuoteClick: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onQuoteClick }) => {
  const steps = [
    {
      number: "01",
      title: "Évaluation & Devis sous 24h",
      description: "Vous nous transmettez la typologie de votre bien, la surface en m² et vos besoins spécifiques. Nous établissons une proposition chiffrée détaillée sans engagement.",
      icon: <ClipboardCheck className="w-5 h-5 text-cyan-800" />
    },
    {
      number: "02",
      title: "Cahier des charges & Créneaux",
      description: "Nous validons la fréquence d'intervention, les horaires de passage (y compris tôt le matin ou en soirée pour les bureaux) et les modalités d'accès sécurisé.",
      icon: <Calendar className="w-5 h-5 text-cyan-800" />
    },
    {
      number: "03",
      title: "Intervention professionnelle",
      description: "Nos agents arrivent avec les équipements requis et des produits d'entretien écologiques certifiés. Chaque consigne est scrupuleusement exécutée.",
      icon: <Sparkles className="w-5 h-5 text-cyan-800" />
    },
    {
      number: "04",
      title: "Contrôle & Suivi personnalisé",
      description: "Un point régulier permet d'ajuster les prestations selon vos retours. Votre interlocuteur dédié à Lyon reste directement joignable à tout moment.",
      icon: <ShieldCheck className="w-5 h-5 text-cyan-800" />
    }
  ];

  return (
    <section id="methode" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-wider uppercase text-cyan-800 mb-2">
            Méthodologie d'intervention
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Une organisation claire, sans mauvaise surprise
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            De la prise de contact initiale jusqu'au suivi régulier de la propreté, chaque étape est structurée pour vous faire gagner du temps en toute sérénité.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-slate-50 p-6 sm:p-7 rounded-2xl border border-slate-200/80 flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                {/* Number & Icon header */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl font-black tracking-tight text-cyan-800 font-mono">
                    {step.number}
                  </span>
                  <div className="p-2.5 bg-white rounded-xl shadow-xs border border-slate-200/60">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2.5 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/50 text-[11px] font-medium text-slate-500">
                Étape {step.number} sur 04
              </div>
            </div>
          ))}
        </div>

        {/* Action Banner */}
        <div className="mt-12 p-6 sm:p-8 bg-slate-900 text-white rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">
              Besoin d'une première estimation chiffrée ?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              Remplissez notre formulaire en ligne en 2 minutes ou contactez notre équipe pour fixer une visite sur site.
            </p>
          </div>
          <button
            type="button"
            onClick={onQuoteClick}
            className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors shrink-0 cursor-pointer"
          >
            <span>Lancer ma demande</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
