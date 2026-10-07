'use client';

import React, { useState } from 'react';
import { Creator, Deal } from '../lib/types';
import { generateOutreachPitch } from '../lib/engine/llm';
import { Send, Copy, Plus, Check, ShieldCheck, DollarSign, Tag, Briefcase } from 'lucide-react';

interface OutreachTabProps {
  creator: Creator;
  onAddDeal: (deal: Deal) => void;
  onUpdateDealStatus: (dealId: string, status: Deal['status']) => void;
}

export const OutreachTab: React.FC<OutreachTabProps> = ({ creator, onAddDeal, onUpdateDealStatus }) => {
  const [brand, setBrand] = useState<string>('GlowLabs');
  const [product, setProduct] = useState<string>('Vitamin C Serum');
  const [tone, setTone] = useState<string>('friendly');
  const [isSponsored, setIsSponsored] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [pitchResult, setPitchResult] = useState<{ subject: string; body: string; flags: string[] } | null>(null);

  const handleGeneratePitch = async () => {
    const res = await generateOutreachPitch(creator, brand, product, tone, isSponsored);
    setPitchResult(res);
  };

  const handleCopy = () => {
    if (!pitchResult) return;
    navigator.clipboard.writeText(`${pitchResult.subject}\n\n${pitchResult.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveDeal = () => {
    const newDeal: Deal = {
      id: `deal_${Date.now()}`,
      brand: brand || 'Target Brand',
      product: product || 'Campaign Product',
      deliverable: 'reel',
      quoted_inr: Math.round(creator.posts.reduce((a, b) => a + b.reach, 0) / creator.posts.length * 0.4),
      status: 'Pitched',
      is_sponsored: isSponsored
    };
    onAddDeal(newDeal);
  };

  const columns: Deal['status'][] = ['Pitched', 'Negotiating', 'Closed', 'Paid'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold text-white">Outreach Drafter & Deal Tracker</h2>
          <span className="bg-sky-500/10 text-sky-400 text-xs px-2.5 py-0.5 rounded-full border border-sky-500/20 font-semibold">
            Data-Backed Pitches
          </span>
        </div>
        <p className="text-slate-400 text-sm mt-1">
          Writes brand pitches grounded strictly in your verified reach stats. Never invents stats. Enforces disclosure rules.
        </p>
      </div>

      {/* Drafter Form & Result */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pitch Inputs */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-sky-400" />
            <span>Brand Pitch Parameters</span>
          </h3>

          <div>
            <label className="block text-xs text-slate-400 font-medium mb-1">Target Brand Name</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g. GlowLabs"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 font-medium mb-1">Product / Campaign</label>
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="e.g. Vitamin C Serum"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 font-medium mb-1">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
              >
                <option value="friendly">Friendly & Warm</option>
                <option value="professional">Professional</option>
                <option value="direct">Short & Direct</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 font-medium mb-1">Paid Sponsorship?</label>
              <label className="flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white cursor-pointer h-10">
                <input
                  type="checkbox"
                  checked={isSponsored}
                  onChange={(e) => setIsSponsored(e.target.checked)}
                  className="rounded text-sky-500 focus:ring-sky-500"
                />
                <span className="text-xs">Adds #ad disclosure</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleGeneratePitch}
            className="w-full bg-sky-500 hover:bg-sky-400 text-white font-semibold py-2.5 rounded-xl text-sm transition-all shadow-md shadow-sky-500/20"
          >
            Generate Grounded Pitch
          </button>
        </div>

        {/* Pitch Preview Box */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Generated Pitch Draft</h3>
              {pitchResult?.flags.includes('sponsored_disclosure_enforced') && (
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  Disclosure Added
                </span>
              )}
            </div>

            {pitchResult ? (
              <div className="space-y-2">
                <div className="text-xs font-bold text-sky-400 bg-slate-900 p-2 rounded-lg border border-slate-800">
                  Subject: {pitchResult.subject}
                </div>
                <textarea
                  readOnly
                  value={pitchResult.body}
                  className="w-full h-48 bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 leading-relaxed font-mono resize-none focus:outline-none"
                />
              </div>
            ) : (
              <div className="h-48 border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center text-slate-500 text-xs">
                Click &quot;Generate Grounded Pitch&quot; to preview draft
              </div>
            )}
          </div>

          {pitchResult && (
            <div className="flex space-x-3 pt-2">
              <button
                onClick={handleCopy}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold py-2 rounded-lg flex items-center justify-center space-x-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Pitch'}</span>
              </button>
              <button
                onClick={handleSaveDeal}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-2 rounded-lg flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save to Tracker</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Deal Tracker Kanban Pipeline */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          <span>Deal Tracker Pipeline</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((colStatus) => {
            const dealsInCol = creator.deals.filter((d) => d.status === colStatus);
            return (
              <div key={colStatus} className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">{colStatus}</span>
                  <span className="bg-slate-800 text-slate-400 text-xs px-2 py-0.5 rounded-full font-mono">
                    {dealsInCol.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {dealsInCol.map((deal) => (
                    <div key={deal.id} className="bg-slate-800 border border-slate-700/70 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white">{deal.brand}</span>
                        <span className="text-xs text-emerald-400 font-semibold font-mono">
                          ₹{(deal.closed_value_inr || deal.quoted_inr).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">{deal.product} • {deal.deliverable}</div>

                      {/* Status Selector */}
                      <div className="pt-2 border-t border-slate-700/50 flex justify-between items-center">
                        <span className="text-[10px] text-slate-500 font-mono">Status:</span>
                        <select
                          value={deal.status}
                          onChange={(e) => onUpdateDealStatus(deal.id, e.target.value as Deal['status'])}
                          className="bg-slate-900 border border-slate-700 text-[11px] text-slate-300 rounded px-1.5 py-0.5 focus:outline-none"
                        >
                          <option value="Pitched">Pitched</option>
                          <option value="Negotiating">Negotiating</option>
                          <option value="Closed">Closed</option>
                          <option value="Paid">Paid</option>
                        </select>
                      </div>
                    </div>
                  ))}

                  {dealsInCol.length === 0 && (
                    <div className="text-center py-6 text-slate-600 text-xs italic">No deals in {colStatus}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
