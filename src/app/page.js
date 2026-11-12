'use client';

import { useState } from 'react';
import { VEHICLES } from '@/data/vehicles';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BrandLineup from '@/components/BrandLineup';
import CatalogSection from '@/components/CatalogSection';
import TrustBar from '@/components/TrustBar';
import PromoBanners from '@/components/PromoBanners';
import EventsSection from '@/components/EventsSection';
import FinanceCalculator from '@/components/FinanceCalculator';
import LocationMapSection from '@/components/LocationMapSection';
import TestDriveForm from '@/components/TestDriveForm';
import VehicleModal from '@/components/VehicleModal';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

export default function HomePage() {
  const [modalVehicle, setModalVehicle] = useState(null);
  const [externalBrandFilter, setExternalBrandFilter] = useState(null);
  const [financeVehicle, setFinanceVehicle] = useState(VEHICLES[0]);
  const [contactVehicle, setContactVehicle] = useState(VEHICLES[0]);
  const [prefilledNote, setPrefilledNote] = useState('');

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBrandFilterSelect = (filterPayload) => {
    if (typeof filterPayload === 'object' && filterPayload !== null) {
      setExternalBrandFilter({ ...filterPayload, timestamp: Date.now() });
    } else {
      setExternalBrandFilter({ brand: filterPayload, timestamp: Date.now() });
    }
  };

  const handleSelectFinance = (vehicle) => {
    setModalVehicle(null);
    setFinanceVehicle(vehicle);
    scrollToSection('financiamiento');
  };

  const handleScheduleTestDrive = (vehicle) => {
    setModalVehicle(null);
    setContactVehicle(vehicle);
    setPrefilledNote({
      note: `Deseo agendar una prueba de manejo (Test Drive) para ${vehicle.brand} ${vehicle.model} (${vehicle.year}) en la sede de Maracaibo.`,
      requestType: 'Test Drive Presencial',
      timestamp: Date.now(),
    });
    scrollToSection('test-drive');
  };

  const handleSendFinanceToContact = (vehicle, note) => {
    if (vehicle) {
      setContactVehicle(vehicle);
    }
    setPrefilledNote({
      note,
      requestType: 'Cotización y Financiamiento',
      timestamp: Date.now(),
    });
    scrollToSection('test-drive');
  };

  return (
    <>
      <ScrollReveal />
      <Navbar onSelectBrandFilter={handleBrandFilterSelect} />

      <main>
        <Hero
          vehicles={VEHICLES}
          onInspectVehicle={(vehicle) => setModalVehicle(vehicle)}
        />

        <BrandLineup onSelectBrand={handleBrandFilterSelect} />

        <CatalogSection
          vehicles={VEHICLES}
          externalBrandFilter={externalBrandFilter}
          onSelectDetail={(vehicle) => setModalVehicle(vehicle)}
          onSelectFinance={handleSelectFinance}
        />

        <PromoBanners
          onSelectPromoAction={(actionPayload) => {
            setPrefilledNote({
              ...(typeof actionPayload === 'object'
                ? actionPayload
                : { note: actionPayload }),
              timestamp: Date.now(),
            });
          }}
        />

        <TrustBar />

        <EventsSection />

        <FinanceCalculator
          vehicles={VEHICLES}
          selectedVehicle={financeVehicle}
          onSendToContact={handleSendFinanceToContact}
        />

        <LocationMapSection />

        <TestDriveForm
          vehicles={VEHICLES}
          preselectedVehicle={contactVehicle}
          prefilledNote={prefilledNote}
        />
      </main>

      <Footer />

      <VehicleModal
        vehicle={modalVehicle}
        onClose={() => setModalVehicle(null)}
        onQuoteFinance={handleSelectFinance}
        onScheduleTestDrive={handleScheduleTestDrive}
      />
    </>
  );
}
