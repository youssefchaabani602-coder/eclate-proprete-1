import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? Number(process.env.PORT || 8080) : 3000;

app.use(express.json());

// Standard healthcheck endpoint for Cloud Run and platform monitors
app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

interface QuoteRequest {
  id: string;
  createdAt: string;
  serviceType: string;
  surface: number;
  frequency: string;
  postalCode: string;
  fullName: string;
  companyName?: string;
  phone: string;
  email: string;
  preferredTime: string;
  notes?: string;
  estimate: { min: number; max: number; type: string };
}

const quotesDatabase: QuoteRequest[] = [];

// Working backend endpoint for quote submissions
app.post('/api/quote', (req, res) => {
  const {
    serviceType,
    surface,
    frequency,
    postalCode,
    fullName,
    companyName,
    phone,
    email,
    preferredTime,
    notes,
  } = req.body;

  // Server-side validation
  const errors: Record<string, string> = {};
  if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
    errors.fullName = 'Le nom et prénom sont obligatoires.';
  }
  if (!phone || typeof phone !== 'string' || !/^[0-9+ \.\-]{8,20}$/.test(phone.trim())) {
    errors.phone = 'Le numéro de téléphone est invalide.';
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = "L'adresse e-mail est invalide.";
  }
  const numericSurface = Number(surface);
  if (!numericSurface || numericSurface < 10 || numericSurface > 10000) {
    errors.surface = 'La surface saisie est invalide.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // Calculate verified server-side estimate
  let min = 70;
  let max = 150;
  let type = 'par intervention';

  if (serviceType === 'tertiaire') {
    const base = Math.round(numericSurface * 1.8);
    min = Math.max(110, Math.round(base * 0.9));
    max = Math.max(140, Math.round(base * 1.2));
    type = 'HT par intervention';
  } else if (serviceType === 'specialise') {
    const base = Math.round(numericSurface * 3.8);
    min = Math.max(180, Math.round(base * 0.9));
    max = Math.max(240, Math.round(base * 1.25));
    type = 'forfaitaire indicatif';
  } else {
    const base = Math.round(numericSurface * 1.6);
    min = Math.max(70, Math.round(base * 0.9));
    max = Math.max(90, Math.round(base * 1.15));
    type = 'par intervention';
  }

  const referenceId = `LYON-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

  const newQuote: QuoteRequest = {
    id: referenceId,
    createdAt: new Date().toISOString(),
    serviceType: String(serviceType),
    surface: numericSurface,
    frequency: String(frequency || 'hebdomadaire'),
    postalCode: String(postalCode || '69002'),
    fullName: fullName.trim(),
    companyName: companyName ? String(companyName).trim() : undefined,
    phone: phone.trim(),
    email: email.trim(),
    preferredTime: String(preferredTime || 'matin'),
    notes: notes ? String(notes).trim() : undefined,
    estimate: { min, max, type },
  };

  quotesDatabase.push(newQuote);

  console.log(`[Quote API] Devis enregistré: ${referenceId} pour ${newQuote.fullName} (${newQuote.surface}m²)`);

  return res.status(200).json({
    success: true,
    referenceId,
    receivedAt: newQuote.createdAt,
    estimate: { min, max, type },
    summary: {
      fullName: newQuote.fullName,
      email: newQuote.email,
      phone: newQuote.phone,
      serviceType: newQuote.serviceType,
      surface: newQuote.surface,
      frequency: newQuote.frequency,
      postalCode: newQuote.postalCode,
    },
    message: "Demande enregistrée avec succès par l'API locale.",
  });
});

// Endpoint to list quotes for admin check or verification
app.get('/api/quotes', (_req, res) => {
  return res.status(200).json({
    count: quotesDatabase.length,
    quotes: quotesDatabase,
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Serveur Rhône Propreté actif sur http://0.0.0.0:${port}`);
  });
}

startServer();
