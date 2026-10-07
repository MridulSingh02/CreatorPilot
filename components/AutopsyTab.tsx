'use client';

import React, { useState } from 'react';
import { Creator } from '../lib/types';
import { analyzePostAutopsy } from '../lib/engine/analytics';
import { Stethoscope, CheckCircle, XCircle, AlertCircle, RefreshCw, Lightbulb } from 'lucide-react';

interface AutopsyTabProps {
  creator: Creator;
}

export const AutopsyTab: React.FC<AutopsyTabProps> = ({ creator }) => {
  const [selectedPostId, setSelectedPostId] = useState<string>(creator.posts[4]?.id || creator.posts[0]?.id || '');

  const autopsyResult = analyzePostAutopsy(creator, selectedPostId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold text-white">Post Autopsy Engine</h2>
          <span className="bg-purple-500/10 text-purple-400 text-xs px-2.5 py-0.5 rounded-full border border-purple-500/20 font-semibold">
            Statistical Cause Analysis
          </span>
        </div>
        <p className="text-slate-400 text-sm mt-1">
          Compares a post to your own historical baseline. Reports a cause only if sample size and effect size pass statistical threshold. No algorithm excuses.
        </p>
      </div>

      {/* Post Selector Dropdown */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
          Select Post to Analyze
        </label>
        <select
          value={selectedPostId}
          onChange={(e) => setSelectedPostId(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-500"
        >
          {creator.posts.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title} — {p.reach.toLocaleString()} views ({p.format}, {p.date})
            </option>
          ))}
        </select>
      </div>

      {/* Autopsy Results Card */}
      <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Post Comparison Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/80 pb-6">
          <div>
            <h3 className="text-xl font-bold text-white">&quot;{autopsyResult.post_title}&quot;</h3>
            <div className="text-sm text-slate-400 mt-1">
              Reach: <span className="font-semibold text-white">{autopsyResult.post_reach.toLocaleString()}</span> vs your median{' '}
              <span className="font-semibold text-white">{autopsyResult.median_reach.toLocaleString()}</span>
            </div>
          </div>

          <div
            className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center space-x-2 border ${
              autopsyResult.diff_pct < 0
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            }`}
          >
            <span>{autopsyResult.diff_pct > 0 ? `+${autopsyResult.diff_pct}%` : `${autopsyResult.diff_pct}%`}</span>
            <span className="text-xs opacity-80">vs median baseline</span>
          </div>
        </div>

        {/* Verdict Badge */}
        <div className="flex items-center space-x-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Verdict:</span>
          {autopsyResult.verdict === 'POSSIBLE CAUSE FOUND' ? (
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>POSSIBLE CAUSE FOUND</span>
            </span>
          ) : (
            <span className="bg-sky-500/20 text-sky-300 border border-sky-500/40 px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4" />
              <span>NO CLEAR CAUSE</span>
            </span>
          )}
        </div>

        {/* Evidence or Honest Explanation */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
          <h4 className="text-sm font-semibold text-white flex items-center space-x-2">
            <Stethoscope className="w-4 h-4 text-purple-400" />
            <span>Statistical Findings</span>
          </h4>

          {autopsyResult.verdict === 'POSSIBLE CAUSE FOUND' ? (
            <div className="text-sm text-amber-200/90 leading-relaxed font-medium">
              Evidence: {autopsyResult.evidence}
            </div>
          ) : (
            <div className="text-sm text-slate-300 leading-relaxed">
              We couldn&apos;t find a clear reason in your data. Reach ({autopsyResult.post_reach.toLocaleString()}) is within normal variation. We checked length, hashtags, format, and timing and ruled them out as culprits. CreatorPilot never invents excuses like &quot;the algorithm changed&quot;.
            </div>
          )}
        </div>

        {/* Checked & Ruled Out Factors */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Factors Checked & Ruled Out
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {autopsyResult.ruled_out.map((factor) => (
              <div key={factor} className="bg-slate-900/60 border border-slate-800 rounded-lg p-3 flex items-center space-x-2 text-xs text-slate-300 capitalize">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{factor.replace('_', ' ')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Propose 1 Experiment */}
        <div className="bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-xl p-5 flex items-start space-x-3">
          <Lightbulb className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-indigo-200">Recommended Experiment to Try Next</h4>
            <p className="text-xs sm:text-sm text-indigo-100/80 mt-1">{autopsyResult.experiment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
