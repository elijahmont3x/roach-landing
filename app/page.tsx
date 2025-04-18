"use client";

import React, { Suspense, lazy } from 'react';
// Layout Components
import { LoadingSpinner } from '@/components/internal/spinner';
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Section } from '@/components/layout/section';

// Section Components (Use React.lazy for code splitting non-critical sections)
import { Hero } from "@/components/sections/00_Hero";
const TheAntifragileEdge = lazy(() => import('@/components/sections/01_TheAntifragileEdge').then(module => ({ default: module.TheAntifragileEdge })));
const CockroachConnection = lazy(() => import('@/components/sections/02_CockroachConnection').then(module => ({ default: module.CockroachConnection })));
const TokenMechanics = lazy(() => import('@/components/sections/03_TokenMechanics').then(module => ({ default: module.TokenMechanics })));
const MarketScenarios = lazy(() => import('@/components/sections/04_MarketScenarios').then(module => ({ default: module.MarketScenarios })));
const Tokenomics = lazy(() => import('@/components/sections/05_Tokenomics').then(module => ({ default: module.Tokenomics })));
const SecuritySection = lazy(() => import('@/components/sections/06_SecuritySection').then(module => ({ default: module.SecuritySection })));
const Roadmap = lazy(() => import('@/components/sections/07_Roadmap').then(module => ({ default: module.Roadmap })));
const HowToBuy = lazy(() => import('@/components/sections/08_HowToBuy').then(module => ({ default: module.HowToBuy })));
const SocialProof = lazy(() => import('@/components/sections/09_SocialProof').then(module => ({ default: module.SocialProof })));
const FAQ = lazy(() => import('@/components/sections/10_FAQ').then(module => ({ default: module.FAQ })));

// UI Components
const SectionConnector = lazy(() => import('@/components/layout/section').then(module => ({ default: module.SectionConnector })));


export default function Home() {

  // Smooth scroll handler (Remains efficient)
  const handleScrollTo = React.useCallback((id: string) => {
    const element = document.getElementById(id);
    const headerOffset = 80; // Match header height
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  }, []); // No dependencies, use useCallback

  // Suspense fallback UI
  const sectionFallback = (
    <Section className="flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </Section>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header onScrollTo={handleScrollTo} /> {/* Pass handler */}
      {/* Main content area using mandatory scroll-snap on main element */}
      <main className="flex-grow scroll-smooth snap-y snap-mandatory">
        {/* --- 1. Hero (Eager Load) --- */}
        <Hero onScrollDown={() => handleScrollTo('the-antifragile-edge')} />

        {/* Wrap lazy-loaded components in Suspense */}
        <Suspense fallback={sectionFallback}>
          {/* --- Connector --- */}
          <SectionConnector
            prevSection="Introduction"
            summary="Conventional tokens often weaken under market pressure."
            nextConcept="Understanding Antifragility"
            className="!py-10" // Override padding for density
          />
          {/* --- 2. Antifragility Concept --- */}
          <TheAntifragileEdge id="the-antifragile-edge" />

          {/* --- Connector --- */}
          <SectionConnector
            prevSection="Antifragility: Fragile vs. Resilient vs. Antifragile"
            summary="Antifragility means actively *gaining* from chaos, unlike resilience (just surviving)."
            nextConcept="Why the Cockroach Emblem?"
            className="!py-10"
          />
          {/* --- 3. Cockroach Connection --- */}
          <CockroachConnection id="cockroach-connection" />

          {/* --- Connector --- */}
          <SectionConnector
            prevSection="Nature's Survivor"
            summary="Specific cockroach traits (resilience, defense, adaptation) inspired $ROACH's adaptive mechanics."
            nextConcept="Core Engine: How $ROACH Adapts"
            className="!py-10"
          />
          {/* --- 4. Token Mechanics (5-Tier System) --- */}
          <TokenMechanics id="mechanics" />

          {/* --- Connector --- */}
          <SectionConnector
            prevSection="Dynamic 5-Tier System"
            summary="The system auto-adjusts taxes and rewards based on real-time sell/buy pressure (4hr window)."
            nextConcept="Performance Simulation: Stress Tests"
            className="!py-10"
          />
          {/* --- 5. Market Scenarios Comparison --- */}
          <MarketScenarios id="market-scenarios" />

          {/* --- Connector --- */}
          <SectionConnector
            prevSection="Scenario Simulation"
            summary="$ROACH's adaptive model aims to leverage volatility, potentially outperforming static systems under stress."
            nextConcept="Token Supply & Allocation Strategy"
            className="!py-10"
          />
          {/* --- 6. Tokenomics --- */}
          <Tokenomics id="tokenomics" />

          {/* --- Connector --- */}
          <SectionConnector
            prevSection="Tokenomics & Supply"
            summary="Fixed supply strategically allocated for liquidity, growth, security, and future expansion."
            nextConcept="Security Measures & Trust"
            className="!py-10"
          />
          {/* --- 7. Security --- */}
          <SecuritySection id="security" />

          {/* --- Connector --- */}
          <SectionConnector
            prevSection="Security & Trust Pillars"
            summary="Audited contract, locked liquidity, vested team, and fixed supply establish a secure foundation."
            nextConcept="Project Development Trajectory"
            className="!py-10"
          />
          {/* --- 8. Roadmap --- */}
          <Roadmap id="roadmap" />

          {/* --- Connector --- */}
          <SectionConnector
            prevSection="Development Roadmap"
            summary="Phased development focuses on launch, stabilization, ecosystem growth, and feature expansion."
            nextConcept="How to Acquire $ROACH"
            className="!py-10"
          />
          {/* --- 9. How To Buy --- */}
          <HowToBuy id="how-to-buy" />

          {/* --- Connector --- */}
          <SectionConnector
            prevSection="Secure Acquisition Guide"
            summary="Acquire $ROACH safely via trusted Solana wallets and DEX aggregators like Jupiter."
            nextConcept="Community Strength & Voice"
            className="!py-10"
          />
          {/* --- 10. Social Proof --- */}
          <SocialProof id="social-proof" />

          {/* --- Connector --- */}
          <SectionConnector
            prevSection="Community Voices"
            summary="Join a rapidly growing, engaged community supporting the antifragile vision."
            nextConcept="Common Questions Answered"
            className="!py-10"
          />
          {/* --- 11. FAQ --- */}
          <FAQ id="faq" />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}