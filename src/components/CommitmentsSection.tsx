import React from 'react';
import { ShieldCheck, Leaf, Sparkles, UserCheck, FileText, Lock } from 'lucide-react';

export const CommitmentsSection: React.FC = () => {
  const commitments = [
    {
      title: "Produits éco-responsables",
      description: "Utilisation exclusive de détergents et désinfectants certifiés Écolabel européen, limitant l'impact environnemental et préservant la qualité de l'air intérieur.",
      icon: <Leaf className="w-5 h-5 text-emerald-700" />
    },
    {
      title: "Matériel professionnel inclus",
      description: "Aspirateurs industriels équipés de filtres HEPA, monobrosses et microfibres spécialisées avec code couleur par zone pour prévenir les contaminations croisées.",
      icon: <Sparkles className="w-5 h-5 text-cyan-700" />
    },
    {
      title: "Personnel salarié & qualifié",
      description: "Nos agents de service sont formés aux protocoles de propreté, déclarés et rémunérés selon les standards de la branche professionnelle.",
      icon: <UserCheck className="w-5 h-5 text-cyan-700" />
    },
    {
      title: "Assurance RC Professionnelle",
      description: "Chaque prestation est couverte par un contrat d'assurance responsabilité civile professionnelle protégeant vos biens, équipements et locaux.",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-700" />
    },
    {
      title: "Cahier des charges transparent",
      description: "Liste précise des tâches validée à la commande. Aucun coût masqué ni facturation imprévue : tout est convenu par écrit dans le devis.",
      icon: <FileText className="w-5 h-5 text-cyan-700" />
    },
    {
      title: "Confidentialité & Sécurité des accès",
      description: "Gestion rigoureuse des clés, badges et codes d'immeubles. Engagement de discrétion absolue pour les résidences comme pour les entreprises.",
      icon: <Lock className="w-5 h-5 text-cyan-700" />
    }
  ];

  return (
    <section id="engagements" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-wider uppercase text-cyan-800 mb-2">
            Standards &amp; Rigueur
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Des engagements concrets pour votre sérénité
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Notre priorité est de vous fournir un cadre de vie ou de travail sain, sans compromis sur la sécurité et le respect de votre environnement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {commitments.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors"
            >
              <div className="p-2.5 bg-white w-fit rounded-xl border border-slate-200/60 shadow-xs mb-4">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
