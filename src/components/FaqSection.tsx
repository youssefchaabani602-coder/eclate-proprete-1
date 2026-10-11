import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Fournissez-vous l'ensemble des produits et du matériel d'entretien ?",
      answer: "Oui, l'intégralité du matériel professionnel (aspirateurs industriels avec filtration HEPA, matériel de lavage des sols, microfibres dédiées) et des produits éco-labellisés est fournie sans aucun supplément par nos équipes. Vous n'avez rien à préparer."
    },
    {
      question: "Quels sont vos délais pour établir un devis et démarrer les prestations à Lyon ?",
      answer: "Après réception de votre demande, votre devis gratuit et détaillé vous est transmis sous 24 heures ouvrées. Selon l'urgence (déménagement, fin de chantier ou reprise d'entretien de bureaux), une première intervention peut être planifiée sous 48 à 72 heures."
    },
    {
      question: "Proposez-vous des interventions en horaires décalés pour les entreprises ?",
      answer: "Absolument. Pour les bureaux, commerces, cabinets médicaux et espaces de coworking, nos agents interviennent avant l'ouverture (dès 06h30 le matin) ou après la fermeture (en soirée), afin de ne pas perturber l'activité de vos collaborateurs et visiteurs."
    },
    {
      question: "Comment s'organise la gestion des clés et des accès aux logements ou locaux ?",
      answer: "Chaque remise de clé, badge Vigik ou code d'accès fait l'objet d'une décharge de responsabilité écrite et d'un enregistrement sécurisé. Nos agents sont formés au respect strict des protocoles de fermeture et d'armement d'alarmes."
    },
    {
      question: "Les prestations d'entretien régulier sont-elles avec engagement de durée ?",
      answer: "Pour les particuliers, nos contrats d'entretien régulier sont sans engagement contraignant : vous pouvez suspendre ou résilier les passages avec un simple préavis de 15 jours. Pour les professionnels, nous proposons des forfaits modulables révisables selon vos besoins."
    },
    {
      question: "Que se passe-t-il en cas de congés ou d'indisponibilité de l'agent habituel ?",
      answer: "Nous assurons la continuité de service en attribuant un agent remplaçant préalablement briefé sur votre cahier des charges et vos consignes d'accès, évitant ainsi toute rupture d'entretien dans vos locaux."
    }
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-wider uppercase text-cyan-800 mb-2">
            Questions Fréquentes
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Tout ce qu'il faut savoir avant votre première prestation
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Une totale transparence sur nos méthodes de travail, nos modalités de gestion et nos engagements.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200/90 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-4.5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-lg bg-slate-100 text-slate-600 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 bg-cyan-100 text-cyan-900' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
