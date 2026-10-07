'use client';

import React from 'react';
import { Creator } from '../lib/types';
import { TabType } from '../lib/store/useCreatorStore';
import { calculateMedian } from '../lib/engine/analytics';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Users, Eye, TrendingUp, DollarSign, AlertTriangle, ArrowUpRight, Sparkles } from 'lucide-react';

interface DashboardTabProps {
  creator: Creator;
  onNavigateTab: (tab: TabType) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({ creator, onNavigateTab }) => {
  const reelPosts = creator.posts.filter((p) => p.format === 'reel');
  const medianReach = calculateMedian(reelPosts.map((p) => p.reach));
  const reachRatio = Number(((medianReach / creator.followers) * 100).toFixed(1));
  const isMismatch = reachRatio < 15.0;

  const totalClosedDeals = creator.deals
    .filter((d) => d.status === 'Closed' || d.status === 'Paid')
    .reduce((acc, d) => acc + (d.closed_value_inr || d.quoted_inr), 0);

  const openDealsCount = creator.deals.filter((d) => d.status === 'Pitched' || d.status === 'Negotiating').length;

  // Chart data setup (chronological order)
  const chartData = [...creator.posts]
    .reverse()
    .slice(-15)
    .map((p, idx) => ({
      name: `Post ${idx + 1}`,
      title: p.title.length > 15 ? p.title.slice(0, 15) + '...' : p.title,
      reach: p.reach,
      median: medianReach
    }));

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-sky-400 shadow-md"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-white">Hi, {creator.name}</h1>
              <span className="bg-sky-500/10 text-sky-400 text-xs px-2.5 py-0.5 rounded-full border border-sky-500/20 capitalize font-medium">
                {creator.niche} creator
              </span>
            </div>
            <p className="text-slate-400 text-sm">{creator.handle} • {creator.followers.toLocaleString()} Followers</p>
          </div>
        </div>

        {/* Data Quality Indicator */}
        <div className="flex items-center space-x-3 bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
          <div className="text-right">
            <p className="text-xs text-slate-400">Data Quality</p>
            <p className="text-sm font-semibold text-emerald-400">
              {creator.posts.length >= 10 ? 'Good (10+ posts)' : 'Low Data (Needs 8+)'}
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Mismatch Warning Banner for Rohan persona */}
      {isMismatch && (
        <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-4 flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <h4 className="font-semibold text-amber-300">Follower-to-Reach Mismatch Flagged</h4>
            <p className="text-amber-200/80 mt-1">
              Your median reel reach is {medianReach.toLocaleString()} ({reachRatio}% of your {creator.followers.toLocaleString()} followers). Brands price deals on actual reach rather than follower counts. We recommend pricing from reach data to avoid ghosted quotes.
            </p>
          </div>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Median Reel Reach</span>
            <Eye className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-white">{medianReach.toLocaleString()}</div>
          <p className="text-xs text-slate-400 mt-1">Across last {reelPosts.length} reels</p>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Followers-to-Reach</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className={`text-2xl font-bold ${isMismatch ? 'text-amber-400' : 'text-emerald-400'}`}>
            {reachRatio}%
          </div>
          <p className="text-xs text-slate-400 mt-1">{isMismatch ? 'Low (Mismatch flag active)' : 'Strong audience engagement'}</p>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Open Deals</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">{openDealsCount}</div>
          <p className="text-xs text-slate-400 mt-1">Active pitches & negotiations</p>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Closed Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">₹{totalClosedDeals.toLocaleString()}</div>
          <p className="text-xs text-slate-400 mt-1">Tracked deal revenue this month</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigateTab('ratecard')}
          className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white p-4 rounded-xl font-semibold flex items-center justify-between shadow-lg shadow-sky-500/10 transition-all group"
        >
          <div className="text-left">
            <div className="text-sm font-bold">Calculate Rate Card</div>
            <div className="text-xs text-sky-100/80">Get reach-backed fair pricing</div>
          </div>
          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        <button
          onClick={() => onNavigateTab('autopsy')}
          className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white p-4 rounded-xl font-semibold flex items-center justify-between transition-all group"
        >
          <div className="text-left">
            <div className="text-sm font-bold">Analyse Flopped Post</div>
            <div className="text-xs text-slate-400">Run statistical Post Autopsy</div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </button>

        <button
          onClick={() => onNavigateTab('outreach')}
          className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white p-4 rounded-xl font-semibold flex items-center justify-between transition-all group"
        >
          <div className="text-left">
            <div className="text-sm font-bold">Draft Brand Pitch</div>
            <div className="text-xs text-slate-400">Write pitch with verified stats</div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </button>
      </div>

      {/* Reach Trend Chart */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Reach Trend (Last {chartData.length} Posts)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
                formatter={(val: any) => [val?.toLocaleString() + ' views', 'Reach']}
              />
              <Line type="monotone" dataKey="reach" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4, fill: '#0284c7' }} />
              <Line type="monotone" dataKey="median" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
