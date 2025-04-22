"use client";

import React, { Suspense, lazy, useCallback } from 'react';
// Layout Components
import { LoadingSpinner } from '@/components/internal/spinner';
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Section, SectionConnector } from '@/components/layout/section';
// *** IMPORT NEW ThemeToggleButton ***
import { ThemeToggleButton } from '@/components/internal/theme-toggle-button';

// Section Components (Lazy Loaded)
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

export default function Home() {
    // REMOVE particle state and handler
    // const [particles, setParticles] = useState<ParticleData[]>([]);
    // const handleAddParticles = useCallback(() => { ... }, []);

    // Smooth scroll handler (keep)
    const handleScrollTo = useCallback((id: string) => {
        const element = document.getElementById(id);
        const headerOffset = 80;
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    }, []);

    // Suspense fallback UI (keep)
    const sectionFallback = (
        <Section className="flex items-center justify-center min-h-[70vh]">
            <LoadingSpinner size="xl" text="Loading Section..." />
        </Section>
    );

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary-foreground">
            <Header onScrollTo={handleScrollTo} />
            <main className="flex-grow scroll-smooth">
                <Hero onScrollDown={() => handleScrollTo('the-antifragile-edge')} />
                
                {/* Each section now handles its own suspense boundary */}
                <Section useSuspense>
                    <TheAntifragileEdge id="the-antifragile-edge" />
                </Section>
                
                <Section useSuspense>
                    <CockroachConnection id="cockroach-connection" />
                </Section>
                
                <Section useSuspense>
                    <TokenMechanics id="mechanics" />
                </Section>
                
                <Section useSuspense>
                    <MarketScenarios id="market-scenarios" />
                </Section>
                
                <Section useSuspense>
                    <Tokenomics id="tokenomics" />
                </Section>
                
                <Section useSuspense>
                    <SecuritySection id="security" />
                </Section>
                
                <Section useSuspense>
                    <Roadmap id="roadmap" />
                </Section>
                
                <Section useSuspense>
                    <HowToBuy id="how-to-buy" />
                </Section>
                
                <SectionConnector 
                    prevSection="Secure Purchase Guide" 
                    summary="Acquire easily via Solana wallets and trusted DEXs." 
                    nextConcept="Community Signals & Voices" 
                    className="!py-12" 
                />
                
                <Section useSuspense>
                    <SocialProof id="social-proof" />
                </Section>
                
                <SectionConnector 
                    prevSection="The $ROACH Colony" 
                    summary="Explore community sentiment and projected growth." 
                    nextConcept="Frequently Asked Questions" 
                    className="!py-12" 
                />
                
                <Section useSuspense>
                    <FAQ id="faq" />
                </Section>
            </main>
            <Footer />
            <ThemeToggleButton />
        </div>
    );
}