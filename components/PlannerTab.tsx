'use client';

import React from 'react';
import { Creator } from '../lib/types';
import { generatePostingPlan } from '../lib/engine/analytics';
import { Calendar, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

interface PlannerTabProps {
  creator: Creator;
}

export const PlannerTab: React.FC<PlannerTabProps> = ({ creator }) => {
  const planResult = generatePostingPlan(creator);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold text-white">Next-Post 2-Week Planner</h2>
            <span className="bg-indigo-500/10 text-indigo-400 text-xs px-2.5 py-0.5 rounded-full border border-indigo-500/20 font-semibold">
              Data-Grounded Schedule
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Proposes 6 posting slots based on your historical top 5 posts. Every slot cites proof from your data.
          </p>
        </div>

        <div>
          <span
            className={`text-xs px-3 py-1 rounded-full border font-bold ${
              planResult.confidence === 'LOW'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            }`}
          >
            Confidence: {planResult.confidence}
          </span>
        </div>
      </div>

      {/* Low Data Warning for Meera */}
      {planResult.confidence === 'LOW' && (
        <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-4 flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <h4 className="font-semibold text-amber-300">Low Data Mode Active</h4>
            <p className="text-amber-200/80 mt-1">{planResult.explanation}</p>
          </div>
        </div>
      )}

      {/* Plan Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {planResult.plan.map((slot, idx) => (
          <div key={idx} className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-3 relative">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">{slot.day}</span>
              <span className="bg-slate-900 text-slate-300 text-[11px] px-2.5 py-0.5 rounded-full font-mono font-medium">
                {slot.time}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-base font-bold text-white capitalize">{slot.topic}</div>
              <div className="text-xs text-slate-400 capitalize">Deliverable: {slot.format}</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-start space-x-2 text-xs text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-indigo-300">Based on: </span>
                <span>{slot.based_on}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
