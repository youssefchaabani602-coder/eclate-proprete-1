/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { ServiceAreaSection } from './components/ServiceAreaSection';
import { CommitmentsSection } from './components/CommitmentsSection';
import { QuoteSection } from './components/QuoteSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('residentiel');

  const scrollToQuote = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    const quoteElement = document.getElementById('devis');
    if (quoteElement) {
      quoteElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased pb-[calc(4rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      {/* Top Navigation */}
      <Header onQuoteClick={() => scrollToQuote()} />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onQuoteClick={() => scrollToQuote()} />

        {/* 3 Core Services Section */}
        <ServicesSection onSelectService={(serviceId) => scrollToQuote(serviceId)} />

        {/* 4-Step Process Section */}
        <ProcessSection onQuoteClick={() => scrollToQuote()} />

        {/* Service Area / Postal Code Checker Section */}
        <ServiceAreaSection />

        {/* Professional Commitments & Standards Section */}
        <CommitmentsSection />

        {/* Interactive Quote Calculator & Contact Form */}
        <QuoteSection initialServiceId={selectedServiceId} />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Quick-Action Bar (<15% viewport height) */}
      <MobileQuickBar onQuoteClick={() => scrollToQuote()} />
    </div>
  );
}
