'use client';

import React from 'react';
import { TabType } from '../lib/store/useCreatorStore';
import { SEEDED_CREATORS } from '../lib/data/seededCreators';
import { Sparkles, LayoutDashboard, Calculator, Stethoscope, Send, Calendar, CheckCircle2, Upload } from 'lucide-react';

interface HeaderProps {
  activeCreatorId: string;
  activeTab: TabType;
  onSelectCreator: (id: string) => void;
  onSelectTab: (tab: TabType) => void;
  onOpenIngestion: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCreatorId,
  activeTab,
  onSelectCreator,
  onSelectTab,
  onOpenIngestion
}) => {
  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ratecard', label: 'Rate Card Engine', icon: Calculator },
    { id: 'autopsy', label: 'Post Autopsy', icon: Stethoscope },
    { id: 'outreach', label: 'Outreach & Deals', icon: Send },
    { id: 'planner', label: '2-Week Planner', icon: Calendar },
    { id: 'evals', label: 'Appendix A Evals', icon: CheckCircle2 }
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-white">CreatorPilot</span>
                <span className="text-xs bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded-full font-medium">
                  v1.0 Pro
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono hidden sm:block">Code decides, AI explains</p>
            </div>
          </div>

          {/* Demo Creator Selector */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center bg-slate-800/80 p-1 rounded-lg border border-slate-700">
              <span className="text-xs text-slate-400 px-2 font-medium">Demo:</span>
              <button
                onClick={() => onSelectCreator('aanya')}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                  activeCreatorId === 'aanya'
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Aanya <span className="opacity-70">(Good data)</span>
              </button>
              <button
                onClick={() => onSelectCreator('rohan')}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                  activeCreatorId === 'rohan'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Rohan <span className="opacity-70">(Mismatch)</span>
              </button>
              <button
                onClick={() => onSelectCreator('meera')}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                  activeCreatorId === 'meera'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Meera <span className="opacity-70">(Low data)</span>
              </button>
            </div>

            <button
              onClick={onOpenIngestion}
              className="flex items-center space-x-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors font-medium"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import CSV</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 overflow-x-auto no-scrollbar py-2 border-t border-slate-800/60">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.id === 'ratecard' && (
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
