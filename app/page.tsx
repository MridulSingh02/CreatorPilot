'use client';

import React from 'react';
import { useCreatorStore } from '../lib/store/useCreatorStore';
import { Header } from '../components/Header';
import { DashboardTab } from '../components/DashboardTab';
import { RateCardTab } from '../components/RateCardTab';
import { AutopsyTab } from '../components/AutopsyTab';
import { OutreachTab } from '../components/OutreachTab';
import { PlannerTab } from '../components/PlannerTab';
import { EvalRunnerTab } from '../components/EvalRunnerTab';
import { IngestionModal } from '../components/IngestionModal';

export default function Home() {
  const {
    activeCreator,
    activeCreatorId,
    activeTab,
    isIngestionOpen,
    switchCreator,
    setActiveTab,
    setIsIngestionOpen,
    addCustomPost,
    addDeal,
    updateDealStatus
  } = useCreatorStore();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white">
      {/* Top Sticky Navigation */}
      <Header
        activeCreatorId={activeCreatorId}
        activeTab={activeTab}
        onSelectCreator={switchCreator}
        onSelectTab={setActiveTab}
        onOpenIngestion={() => setIsIngestionOpen(true)}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <DashboardTab creator={activeCreator} onNavigateTab={setActiveTab} />
        )}

        {activeTab === 'ratecard' && (
          <RateCardTab
            creator={activeCreator}
            onNavigateToPitch={() => setActiveTab('outreach')}
          />
        )}

        {activeTab === 'autopsy' && <AutopsyTab creator={activeCreator} />}

        {activeTab === 'outreach' && (
          <OutreachTab
            creator={activeCreator}
            onAddDeal={addDeal}
            onUpdateDealStatus={updateDealStatus}
          />
        )}

        {activeTab === 'planner' && <PlannerTab creator={activeCreator} />}

        {activeTab === 'evals' && <EvalRunnerTab />}
      </main>

      {/* CSV & Manual Ingestion Modal */}
      <IngestionModal
        isOpen={isIngestionOpen}
        onClose={() => setIsIngestionOpen(false)}
        onAddPost={addCustomPost}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            CreatorPilot v1.0 • Built for Micro-Creators (5k - 100k followers)
          </div>
          <div className="font-mono text-slate-400">
            Code decides math, LLM narrates facts • 100% Free Tier Architecture
          </div>
        </div>
      </footer>
    </div>
  );
}
