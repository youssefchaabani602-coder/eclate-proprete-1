import React, { useState, useEffect } from 'react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/companyData';
import { Phone, Mail, Send, CheckCircle2, Calculator, MapPin, AlertCircle, RefreshCw, Copy, Check } from 'lucide-react';

interface QuoteSectionProps {
  initialServiceId?: string;
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({ initialServiceId }) => {
  const [serviceType, setServiceType] = useState<string>(initialServiceId || 'residentiel');
  const [surface, setSurface] = useState<number>(75);
  const [frequency, setFrequency] = useState<string>('hebdomadaire');
  const [postalCode, setPostalCode] = useState<string>('69002');
  const [fullName, setFullName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [preferredTime, setPreferredTime] = useState<string>('matin');
  const [notes, setNotes] = useState<string>('');
  
  // Validation, Network & Submission State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<{
    referenceId: string;
    serviceName: string;
    surface: number;
    frequency: string;
    fullName: string;
    email: string;
    phone: string;
    receivedAt: string;
    estimate: { min: number; max: number; type: string };
  } | null>(null);

  useEffect(() => {
    if (initialServiceId) {
      setServiceType(initialServiceId);
    }
  }, [initialServiceId]);

  // Transparent calculation matching backend logic
  const calculateEstimate = () => {
    let min = 70;
    let max = 150;
    let type = 'par intervention';

    if (serviceType === 'residentiel') {
      let base = Math.round(surface * 1.6);
      if (frequency === 'hebdomadaire') base = Math.round(base * 0.85);
      if (frequency === 'bimensuel') base = Math.round(base * 0.92);
      min = Math.max(70, Math.round(base * 0.9));
      max = Math.max(90, Math.round(base * 1.15));
      type = 'par intervention';
    } else if (serviceType === 'tertiaire') {
      let base = Math.round(surface * 1.8);
      if (frequency === 'hebdomadaire') base = Math.round(base * 0.82);
      min = Math.max(110, Math.round(base * 0.9));
      max = Math.max(140, Math.round(base * 1.2));
      type = 'HT par intervention';
    } else {
      let base = Math.round(surface * 3.8);
      min = Math.max(180, Math.round(base * 0.9));
      max = Math.max(240, Math.round(base * 1.25));
      type = 'forfaitaire indicatif';
    }

    return { min, max, type };
  };

  const estimate = calculateEstimate();

  // Phone input formatting helper (French style: 0X XX XX XX XX)
  const handlePhoneChange = (val: string) => {
    // Keep numbers and +
    const cleaned = val.replace(/[^\d+]/g, '');
    setPhone(cleaned);
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'Veuillez saisir votre nom et prénom (au moins 2 caractères).';
    }

    // French phone validation (accepts 01-09 or +33, min 10 digits)
    const phoneClean = phone.replace(/[\s.-]/g, '');
    const phoneRegex = /^(?:(?:\+|00)33|0)[1-9]\d{8}$/;
    if (!phoneClean) {
      errs.phone = 'Le numéro de téléphone est obligatoire.';
    } else if (!phoneRegex.test(phoneClean)) {
      errs.phone = 'Format attendu : numéro français valide (ex. 06 12 34 56 78 ou 04 72 00 00 00).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email.trim()) {
      errs.email = "L'adresse e-mail est obligatoire.";
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Veuillez renseigner une adresse e-mail valide (ex. contact@domaine.fr).';
    }

    if (!surface || surface < 15 || surface > 5000) {
      errs.surface = 'La surface doit être comprise entre 15 et 5 000 m².';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    const payload = {
      serviceType,
      surface,
      frequency,
      postalCode,
      fullName: fullName.trim(),
      companyName: companyName.trim() || undefined,
      phone: phone.trim(),
      email: email.trim(),
      preferredTime,
      notes: notes.trim() || undefined,
    };

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur serveur (${response.status})`);
      }

      const result = await response.json();
      const currentService = SERVICES_DATA.find((s) => s.id === serviceType)?.title || serviceType;

      setSubmittedData({
        referenceId: result.referenceId,
        serviceName: currentService,
        surface,
        frequency,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        receivedAt: result.receivedAt || new Date().toISOString(),
        estimate: result.estimate || estimate,
      });
    } catch (err: unknown) {
      console.warn('[QuoteForm] Backend fallback test:', err);
      // If the dev server is running without backend route or has an error, notify honestly:
      setServerError(
        "Impossible de joindre l'API locale d'enregistrement. Vous pouvez nous contacter directement par téléphone ou préparer votre demande par e-mail ci-dessous."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyRecap = () => {
    if (!submittedData) return;
    const recap = `Demande de devis Rhône Propreté
Réf : ${submittedData.referenceId}
Client : ${submittedData.fullName}
Téléphone : ${submittedData.phone}
Email : ${submittedData.email}
Prestation : ${submittedData.serviceName}
Surface : ${submittedData.surface} m²
Fréquence : ${submittedData.frequency}
Estimation indicative : ${submittedData.estimate.min} € – ${submittedData.estimate.max} € ${submittedData.estimate.type}
Date d'enregistrement : ${new Date(submittedData.receivedAt).toLocaleDateString('fr-FR')}`;

    navigator.clipboard.writeText(recap).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleReset = () => {
    setSubmittedData(null);
    setServerError(null);
    setNotes('');
  };

  // Generate mailto link for direct zero-friction contact
  const mailtoLink = submittedData
    ? `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
        `Demande de devis ${submittedData.referenceId} - ${submittedData.fullName}`
      )}&body=${encodeURIComponent(
        `Bonjour,\n\nJe souhaite confirmer ma demande de devis n° ${submittedData.referenceId} pour les prestations suivantes :\n- Prestation : ${submittedData.serviceName}\n- Surface : ${submittedData.surface} m²\n- Fréquence : ${submittedData.frequency}\n- Téléphone : ${submittedData.phone}\n\nMerci de me recontacter.\n\nCordialement,\n${submittedData.fullName}`
      )}`
    : '#';

  return (
    <section id="devis" className="py-16 sm:py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-wider uppercase text-cyan-400 mb-2">
            Demande d'étude et devis gratuit
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
            Estimez votre prestation et recevez votre devis sous 24&nbsp;heures
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Formulaire sans engagement. Précisez votre surface et votre secteur à Lyon pour obtenir un chiffrage prévisionnel adapté à vos locaux.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Instant Estimate Helper & Direct Contact Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Transparent simulator card */}
            <div className="bg-slate-800/95 border border-slate-700 rounded-2xl p-6 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-3">
                <Calculator className="w-4 h-4" />
                <span>Simulateur tarifaire indicatif</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Fourchette budgétaire prévisionnelle
              </h3>
              <p className="text-xs text-slate-300 mb-6">
                Calculée pour <strong className="text-white">{surface}&nbsp;m²</strong> en formule{' '}
                <strong className="text-white">{frequency}</strong>.
              </p>

              <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-5 mb-4">
                <div className="text-xs text-slate-400 mb-1">Fourchette estimative&nbsp;:</div>
                <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono tracking-tight">
                  {estimate.min}&nbsp;€ – {estimate.max}&nbsp;€
                </div>
                <div className="text-xs text-slate-300 mt-1">{estimate.type}</div>
              </div>

              <div className="text-xs text-slate-300 space-y-2 border-t border-slate-700/80 pt-4">
                <div className="flex items-start gap-1.5">
                  <span className="text-cyan-400">•</span>
                  <span>Produits écologiques certifiés et matériel spécialisé inclus.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-cyan-400">•</span>
                  <span>Déplacement offert sur Lyon et Métropole (aucun supplément kilométrique).</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-cyan-400">•</span>
                  <span>Chiffrage ferme confirmé sur devis écrit avant tout démarrage.</span>
                </div>
              </div>
            </div>

            {/* Direct Phone Assistance Block */}
            <div className="bg-slate-800/70 border border-slate-700/70 rounded-2xl p-6">
              <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Besoin d'un renseignement immédiat&nbsp;?</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Nos conseillers répondent à vos questions techniques ou planifient une visite préalable de vos locaux.
              </p>

              <div className="flex flex-col gap-2">
                <a
                  href={COMPANY_INFO.phoneRaw}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 text-slate-950 font-bold rounded-xl text-sm transition-colors focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Appeler Rhône Propreté au 04 72 00 00 00"
                >
                  <Phone className="w-4 h-4" />
                  <span>{COMPANY_INFO.phone}</span>
                </a>
                <div className="text-center text-xs text-slate-400 mt-1">
                  {COMPANY_INFO.serviceHours}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-700/80 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{COMPANY_INFO.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{COMPANY_INFO.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Complete Interactive Form or Confirmation Screen */}
          <div className="lg:col-span-7 bg-white text-slate-900 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border border-slate-200">
            {submittedData ? (
              <div className="py-4 text-center">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
                  Demande validée et enregistrée
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mb-4 leading-relaxed">
                  Votre demande a été traitée avec succès par l'API locale sous la référence{' '}
                  <strong className="text-slate-900 font-mono">{submittedData.referenceId}</strong>.
                </p>

                {/* Honest Concept Disclosure Notice */}
                <div className="p-3.5 bg-cyan-50/90 border border-cyan-200 rounded-xl text-xs text-cyan-900 max-w-lg mx-auto mb-6 text-left leading-relaxed">
                  <span className="font-bold block mb-1">Rappel de démonstration&nbsp;:</span>
                  Cette simulation est enregistrée sur l'API de test. S'agissant d'un site conceptuel, aucune équipe commerciale réelle ne sera déployée sans confirmation. Vous pouvez copier le récapitulatif ou préparer un e-mail direct ci-dessous.
                </div>

                {/* Reference Summary Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 max-w-lg mx-auto text-left mb-6 text-xs sm:text-sm space-y-2.5">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Numéro de référence&nbsp;:</span>
                    <span className="font-bold font-mono text-cyan-900">{submittedData.referenceId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Prestation choisie&nbsp;:</span>
                    <span className="font-semibold text-slate-800">{submittedData.serviceName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Surface évaluée&nbsp;:</span>
                    <span className="text-slate-800 font-medium">{submittedData.surface}&nbsp;m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Fréquence souhaitée&nbsp;:</span>
                    <span className="capitalize text-slate-800 font-medium">{submittedData.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimation prévisionnelle&nbsp;:</span>
                    <span className="font-semibold text-cyan-800 font-mono">
                      {submittedData.estimate.min}&nbsp;€ – {submittedData.estimate.max}&nbsp;€ {submittedData.estimate.type}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2">
                    <span className="text-slate-500">Contact enregistré&nbsp;:</span>
                    <span className="text-slate-800 font-medium">
                      {submittedData.fullName} · {submittedData.phone}
                    </span>
                  </div>
                </div>

                {/* Practical actions */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyRecap}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copié dans le presse-papier !' : 'Copier le récapitulatif'}</span>
                  </button>

                  <a
                    href={mailtoLink}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-cyan-800 hover:bg-cyan-900 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Préparer l'e-mail prérempli</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-transparent hover:bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-slate-200"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Nouvelle estimation</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="border-b border-slate-100 pb-4 mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Formulaire de chiffrage rapide
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Les champs signalés par un astérisque (*) sont nécessaires à l'établissement du devis.
                  </p>
                </div>

                {/* Server error banner if backend failed */}
                {serverError && (
                  <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold">{serverError}</p>
                      <div className="mt-2 flex gap-3">
                        <a href={COMPANY_INFO.phoneRaw} className="underline font-bold">
                          Appeler le {COMPANY_INFO.phone}
                        </a>
                        <span>·</span>
                        <a href={`mailto:${COMPANY_INFO.email}`} className="underline">
                          Envoyer un e-mail
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 1: Service Selection */}
                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    1. Type de prestation souhaitée *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {SERVICES_DATA.map((srv) => (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => setServiceType(srv.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          serviceType === srv.id
                            ? 'border-cyan-700 bg-cyan-50/70 text-cyan-950 font-semibold ring-1 ring-cyan-700'
                            : 'border-slate-200 bg-slate-50/60 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs font-bold leading-tight">{srv.title.split('&')[0]}</div>
                        <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">{srv.scope}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Surface & Frequency (with synchronized dual controls) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label htmlFor="surface-range" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        2. Surface approximative *
                      </label>
                      <div className="flex items-center gap-1">
                        <input
                          id="surface-number"
                          type="number"
                          min="15"
                          max="2000"
                          value={surface}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            setSurface(isNaN(val) ? 15 : Math.max(15, Math.min(2000, val)));
                          }}
                          aria-label="Surface en mètres carrés (chiffre)"
                          className="w-16 px-2 py-0.5 text-xs font-mono font-bold text-cyan-900 bg-cyan-50 border border-cyan-200 rounded text-right outline-none focus:ring-1 focus:ring-cyan-700"
                        />
                        <span className="text-xs font-bold text-slate-600">m²</span>
                      </div>
                    </div>
                    <input
                      id="surface-range"
                      type="range"
                      min="20"
                      max="400"
                      step="5"
                      value={surface > 400 ? 400 : surface}
                      onChange={(e) => setSurface(parseInt(e.target.value, 10))}
                      aria-label="Curseur de surface en mètres carrés"
                      aria-valuemin={20}
                      aria-valuemax={400}
                      aria-valuenow={surface}
                      className="w-full accent-cyan-800 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>Studio (20&nbsp;m²)</span>
                      <span>Appt (75&nbsp;m²)</span>
                      <span>Bureaux (200&nbsp;m²+)</span>
                    </div>
                    {errors.surface && (
                      <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.surface}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="frequency-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      3. Fréquence d'intervention *
                    </label>
                    <select
                      id="frequency-select"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 outline-none"
                    >
                      <option value="hebdomadaire">Hebdomadaire (recommandé)</option>
                      <option value="bimensuel">Bimensuel (toutes les 2 semaines)</option>
                      <option value="mensuel">Mensuel</option>
                      <option value="ponctuel">Ponctuel (remise à neuf unique)</option>
                    </select>
                  </div>
                </div>

                {/* Step 3: Location & Preferred time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                  <div>
                    <label htmlFor="postal-code" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      4. Secteur / Arrondissement à Lyon *
                    </label>
                    <select
                      id="postal-code"
                      name="postal-code"
                      autoComplete="postal-code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-cyan-700 outline-none"
                    >
                      <option value="69001">69001 Lyon 1er (Pentes, Terreaux)</option>
                      <option value="69002">69002 Lyon 2e (Bellecour, Confluence)</option>
                      <option value="69003">69003 Lyon 3e (Part-Dieu, Préfecture)</option>
                      <option value="69004">69004 Lyon 4e (Croix-Rousse)</option>
                      <option value="69005">69005 Lyon 5e (Vieux Lyon, Saint-Just)</option>
                      <option value="69006">69006 Lyon 6e (Brotteaux, Masséna)</option>
                      <option value="69007">69007 Lyon 7e (Guillotière, Gerland)</option>
                      <option value="69008">69008 Lyon 8e (Monplaisir)</option>
                      <option value="69009">69009 Lyon 9e (Vaise, Gorge de Loup)</option>
                      <option value="69100">69100 Villeurbanne</option>
                      <option value="69300">69300 Caluire-et-Cuire</option>
                      <option value="69130">69130 Écully</option>
                      <option value="69600">69600 Oullins-Pierre-Bénite</option>
                      <option value="69500">69500 Bron</option>
                      <option value="autre">Autre commune Métropole de Lyon</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="preferred-time" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Créneau d'intervention souhaité
                    </label>
                    <select
                      id="preferred-time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-cyan-700 outline-none"
                    >
                      <option value="matin">Matinée (07h30 – 12h00)</option>
                      <option value="apres-midi">Après-midi (13h30 – 18h00)</option>
                      <option value="soir-bureaux">Fin de journée / Hors bureaux (après 18h00)</option>
                      <option value="flexible">Indifférent / Selon vos disponibilités</option>
                    </select>
                  </div>
                </div>

                {/* Step 4: Contact details with native autocomplete */}
                <div className="border-t border-slate-100 pt-5 mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    5. Vos coordonnées de contact
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="fullname" className="block text-xs font-medium text-slate-700 mb-1">
                        Nom et Prénom *
                      </label>
                      <input
                        id="fullname"
                        name="name"
                        autoComplete="name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ex. Alexandre Martin"
                        className={`w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white outline-none ${
                          errors.fullName ? 'border-red-400 bg-red-50/50' : 'border-slate-300 focus:border-cyan-700'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-xs font-medium text-slate-700 mb-1">
                        Entreprise / Cabinet (facultatif)
                      </label>
                      <input
                        id="company"
                        name="organization"
                        autoComplete="organization"
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Ex. Société Lyon Conseil"
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-cyan-700 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-medium text-slate-700 mb-1">
                        Téléphone *
                      </label>
                      <input
                        id="phone"
                        name="tel"
                        autoComplete="tel"
                        type="tel"
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="Ex. 06 12 34 56 78"
                        className={`w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white outline-none ${
                          errors.phone ? 'border-red-400 bg-red-50/50' : 'border-slate-300 focus:border-cyan-700'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-slate-700 mb-1">
                        Adresse e-mail *
                      </label>
                      <input
                        id="email"
                        name="email"
                        autoComplete="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex. contact@exemple.fr"
                        className={`w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white outline-none ${
                          errors.email ? 'border-red-400 bg-red-50/50' : 'border-slate-300 focus:border-cyan-700'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-xs font-medium text-slate-700 mb-1">
                      Précisions éventuelles (étage, vitrerie, type de sol, spécificités)
                    </label>
                    <textarea
                      id="notes"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ex. Parquet ancien au 3e étage sans ascenseur, besoin de nettoyage des vitres tous les mois..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-cyan-700 outline-none"
                    ></textarea>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 bg-cyan-800 hover:bg-cyan-900 active:bg-cyan-950 text-white font-bold rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 focus-visible:ring-2 focus-visible:ring-cyan-600"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Transmission à l'API en cours...</span>
                      </>
                    ) : (
                      <>
                        <span>Envoyer ma demande de devis gratuit</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-3">
                    Réponse garantie sous 24&nbsp;h ouvrées. Vos informations ne sont jamais transmises à des tiers.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
