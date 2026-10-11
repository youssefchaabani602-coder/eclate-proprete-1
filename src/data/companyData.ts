// Fictional company configuration and assets for Lyon Cleaning Company concept

import heroImg from '../assets/images/hero_cleaning_lyon_1791717719413.jpg';
import heroWebp from '../assets/images/hero_cleaning_lyon_1791717719413.webp';
import resImg from '../assets/images/service_residential_clean_1791717732002.jpg';
import resWebp from '../assets/images/service_residential_clean_1791717732002.webp';
import commImg from '../assets/images/service_office_commercial_1791717744836.jpg';
import commWebp from '../assets/images/service_office_commercial_1791717744836.webp';
import specImg from '../assets/images/service_renovation_windows_1791717755789.jpg';
import specWebp from '../assets/images/service_renovation_windows_1791717755789.webp';

export const COMPANY_INFO = {
  name: "Rhône Propreté",
  tagline: "Services de propreté résidentielle et tertiaire à Lyon",
  phone: "04 72 00 00 00",
  phoneRaw: "tel:+33472000000",
  email: "contact@rhone-proprete-concept.fr",
  address: "14 Rue de la République, 69002 Lyon",
  serviceHours: "Lundi au vendredi : 07h30 – 19h00 | Samedi : 08h30 – 13h00",
  siretFictif: "987 654 321 00018 (Fictif)",
  disclaimer: "Concept de site vitrine professionnel pour entreprise de nettoyage à Lyon. Coordonnées et mentions fournies à titre fictif et démonstratif.",
};

export const IMAGES = {
  hero: heroImg,
  heroWebp: heroWebp,
  residential: resImg,
  residentialWebp: resWebp,
  commercial: commImg,
  commercialWebp: commWebp,
  specialized: specImg,
  specializedWebp: specWebp,
};

export interface ServiceItem {
  id: string;
  category: "residential" | "commercial" | "specialized";
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageWebp: string;
  features: string[];
  scope: string;
  typicalDuration: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "residentiel",
    category: "residential",
    title: "Nettoyage résidentiel et particuliers",
    subtitle: "Entretien régulier ou ponctuel d'appartements et maisons",
    description: "Prise en charge complète de vos espaces de vie intérieurs avec soin méticuleux pour vos sols, boiseries, sanitaires et cuisine. Interventions planifiées selon votre rythme.",
    image: IMAGES.residential,
    imageWebp: IMAGES.residentialWebp,
    features: [
      "Dépoussiérage méticuleux des surfaces et plinthes",
      "Nettoyage et désinfection approfondie des sanitaires et pièces d'eau",
      "Traitement des sols adaptés (parquet haussmannien, carrelage, pierre)",
      "Entretien des surfaces de cuisine, façades et électroménager extérieur",
      "Option vitrerie intérieure et miroiterie"
    ],
    scope: "Studios, appartements familiaux et maisons individuelles",
    typicalDuration: "À partir de 2h par intervention (hebdomadaire ou bimensuel)"
  },
  {
    id: "tertiaire",
    category: "commercial",
    title: "Nettoyage de bureaux et espaces tertiaires",
    subtitle: "Maintien de locaux de travail impeccables et accueillants",
    description: "Protocole rigoureux destiné aux sièges d'entreprises, cabinets d'avocats, agences créatives et espaces de coworking de la métropole lyonnaise. Interventions hors heures ouvrées disponibles.",
    image: IMAGES.commercial,
    imageWebp: IMAGES.commercialWebp,
    features: [
      "Aspiration et lavage des sols de travail et zones de passage",
      "Désinfection des points de contact fréquents (poignées, claviers, interrupteurs)",
      "Vidage et tri des corbeilles selon les filières de recyclage",
      "Entretien complet des espaces communs, tisaneries et salles de réunion",
      "Réapprovisionnement des consommables sanitaires (savon, essuie-mains)"
    ],
    scope: "Plateaux de bureaux de 50 m² à plus de 2 500 m²",
    typicalDuration: "Quotidien, 2 à 3 fois par semaine ou hebdomadaire"
  },
  {
    id: "specialise",
    category: "specialized",
    title: "Remise en état, fin de chantier et déménagement",
    subtitle: "Intervention intensive pour transitions immobilières",
    description: "Opération en profondeur après travaux de rénovation, avant état des lieux de sortie ou après un déménagement. Élimination des poussières de plâtre, résidus d'enduit et vitrerie complexe.",
    image: IMAGES.specialized,
    imageWebp: IMAGES.specializedWebp,
    features: [
      "Aspiration industrielle des poussières fines de travaux",
      "Décapage et dégraissage soigné des carrelages et joints",
      "Nettoyage intégral de la vitrerie recto-verso, menuiseries et rails",
      "Lessivage des placards, placards encastrés et plinthes",
      "Remise à blanc des sanitaires et appareils ménagers"
    ],
    scope: "Livraisons de chantiers, états des lieux de location, vente de biens",
    typicalDuration: "Intervention ponctuelle par équipe dédiée (une demi-journée à 2 jours)"
  }
];

export const SERVICE_AREAS = [
  {
    zone: "Lyon Centre & Presqu'île",
    postalCodes: ["69001", "69002"],
    neighborhoods: ["Pentes de la Croix-Rousse", "Terreaux", "Bellecour", "Cordeliers", "Ainay", "Perrache"],
    leadTime: "Sous 24h"
  },
  {
    zone: "Lyon Rive Gauche & Part-Dieu",
    postalCodes: ["69003", "69006", "69007", "69008"],
    neighborhoods: ["Brotteaux", "Masséna", "Préfecture", "Part-Dieu", "Guillotière", "Jean Macé", "Gerland", "Monplaisir"],
    leadTime: "Sous 24h"
  },
  {
    zone: "Lyon Rive Droite & Collines",
    postalCodes: ["69004", "69005", "69009"],
    neighborhoods: ["Plateau Croix-Rousse", "Vieux-Lyon", "Fourvière", "Saint-Just", "Point du Jour", "Vaise", "Gorge de Loup"],
    leadTime: "Sous 24h"
  },
  {
    zone: "Première Couronne Métropolitaine",
    postalCodes: ["69100", "69300", "69130", "69600", "69500", "69160"],
    neighborhoods: ["Villeurbanne (Gratte-Ciel, Charpennes, Doua)", "Caluire-et-Cuire", "Écully", "Oullins", "Bron", "Tassin-la-Demi-Lune"],
    leadTime: "Sous 24h à 48h"
  }
];
