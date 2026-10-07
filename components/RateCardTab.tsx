'use client';

import React, { useState } from 'react';
import { Creator, FormatType, UsageRights, Exclusivity } from '../lib/types';
import { calculateRateCard } from '../lib/engine/analytics';
import { generateRateCardNarration } from '../lib/engine/llm';
import { Calculator, AlertTriangle, ArrowRight, ShieldAlert } from 'lucide-react';

interface RateCardTabProps {
  creator: Creator;
  onNavigateToPitch: () => void;
}

export const RateCardTab: React.FC<RateCardTabProps> = ({ creator, onNavigateToPitch }) => {
  const [deliverable, setDeliverable] = useState<FormatType>('reel');
  const [rights, setRights] = useState<UsageRights>('none');
  const [exclusivity, setExclusivity] = useState<Exclusivity>('none');
  const [isCalculating, setIsCalculating] = useState(false);

  const rateCardResult = calculateRateCard(creator, deliverable, rights, exclusivity);
  const [narration, setNarration] = useState<{ summary: string; explanation: string; next_steps: string[]; flags: string[] }>(
    rateCardResult.explanation
  );

  const handleRecalculate = async () => {
    setIsCalculating(true);
    const updatedResult = calculateRateCard(creator, deliverable, rights, exclusivity);
    const updatedNarration = await generateRateCardNarration(updatedResult);
    setNarration(updatedNarration);
    setIsCalculating(false);
  };

  const confidenceColors = {
    LOW: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    MEDIUM: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    HIGH: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  };

  return (
    <div className="space-y-6">
      {/* Title & Introduction */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold text-white">Rate Card Engine</h2>
            <span className="bg-sky-500/10 text-sky-400 text-xs px-2.5 py-0.5 rounded-full border border-sky-500/20 font-semibold">
              Deterministic Pricing
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Prices are computed from your median reach ({rateCardResult.median_reach.toLocaleString()} views) and benchmark CPM. Code calculates, AI narrates.
          </p>
        </div>
      </div>

      {/* Selectors Form */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Deal Parameters</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Deliverable */}
          <div>
            <label className="block text-xs text-slate-400 font-medium mb-1.5">Deliverable Format</label>
            <select
              value={deliverable}
              onChange={(e) => {
                setDeliverable(e.target.value as FormatType);
                handleRecalculate();
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
            >
              <option value="reel">1 Instagram Reel (1.0x)</option>
              <option value="carousel">1 Carousel Post (0.7x)</option>
              <option value="story">1 Story Set (0.3x)</option>
            </select>
          </div>

          {/* Usage Rights */}
          <div>
            <label className="block text-xs text-slate-400 font-medium mb-1.5">Brand Usage Rights</label>
            <select
              value={rights}
              onChange={(e) => {
                setRights(e.target.value as UsageRights);
                handleRecalculate();
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
            >
              <option value="none">Organic Post Only (1.0x)</option>
              <option value="30_days">30 Days Digital Rights (+20%)</option>
              <option value="90_days">90 Days Digital Rights (+35%)</option>
              <option value="1_year">1 Year Full Rights (+50%)</option>
            </select>
          </div>

          {/* Exclusivity */}
          <div>
            <label className="block text-xs text-slate-400 font-medium mb-1.5">Category Exclusivity</label>
            <select
              value={exclusivity}
              onChange={(e) => {
                setExclusivity(e.target.value as Exclusivity);
                handleRecalculate();
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
            >
              <option value="none">No Exclusivity (1.0x)</option>
              <option value="category_30d">30 Days Category Exclusivity (+25%)</option>
              <option value="full_30d">30 Days Full Exclusivity (+50%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Hero Pricing Range Display */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Verified Fair Price Range</span>
            <div className="text-sm font-medium text-slate-300 capitalize">{creator.niche} • {deliverable}</div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-xs px-3 py-1 rounded-full border font-bold ${confidenceColors[rateCardResult.confidence]}`}>
              Confidence: {rateCardResult.confidence} ({rateCardResult.post_count} posts)
            </span>
          </div>
        </div>

        {/* 3 Price Cards (Low / Likely / High) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5 text-center">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Low Range</div>
            <div className="text-3xl font-extrabold text-slate-300">₹{rateCardResult.low_inr.toLocaleString()}</div>
            <div className="text-xs text-slate-500 mt-1">Discount / Package Rate</div>
          </div>

          <div className="bg-gradient-to-b from-sky-950/60 to-slate-800 border-2 border-sky-500/80 rounded-xl p-6 text-center shadow-xl shadow-sky-500/10 relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
              Recommended Quote
            </span>
            <div className="text-xs text-sky-400 uppercase tracking-wider font-bold mb-1">Likely Fair Price</div>
            <div className="text-4xl font-black text-white">₹{rateCardResult.likely_inr.toLocaleString()}</div>
            <div className="text-xs text-sky-300/80 mt-1">Based on ₹{rateCardResult.cpm_used} CPM</div>
          </div>

          <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5 text-center">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">High Range</div>
            <div className="text-3xl font-extrabold text-slate-300">₹{rateCardResult.high_inr.toLocaleString()}</div>
            <div className="text-xs text-slate-500 mt-1">Premium Brand / High Demand</div>
          </div>
        </div>

        {/* Follower-Reach Mismatch Warning Banner */}
        {rateCardResult.followers_reach_mismatch && (
          <div className="bg-amber-950/50 border border-amber-500/50 rounded-xl p-4 flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-amber-300">Follower-to-Reach Mismatch Warning: </span>
              <span className="text-amber-200/90">
                Your median reach ({rateCardResult.median_reach.toLocaleString()}) is {rateCardResult.reach_ratio_pct}% of your total followers ({creator.followers.toLocaleString()}). Brands evaluate deals on reach, not follower count. Followers don't pay bills, reach does ("your reach, not your worth").
              </span>
            </div>
          </div>
        )}

        {/* Generic Fallback Banner */}
        {rateCardResult.explanation.flags.includes('generic_benchmark_fallback') && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-start space-x-3">
            <ShieldAlert className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300">
              <span className="font-bold">Generic Benchmark Fallback: </span>
              <span>
                Niche &quot;{creator.niche}&quot; uses a fallback ₹1,000 CPM estimate. Confidence is set to LOW. Collect more deal data to refine your niche baseline.
              </span>
            </div>
          </div>
        )}

        {/* AI Plain Language Explanation Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-sky-400"></div>
            <h4 className="text-sm font-semibold text-white">Why this price</h4>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{narration.explanation}</p>
          <div className="border-t border-slate-800 pt-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Recommended Next Steps</div>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              {narration.next_steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Button to Pitch */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onNavigateToPitch}
            className="bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg shadow-sky-500/20 transition-all"
          >
            <span>Draft Brand Pitch with this Rate</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
