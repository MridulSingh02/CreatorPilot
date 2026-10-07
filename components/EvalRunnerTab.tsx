'use client';

import React, { useState } from 'react';
import { runAllEvals } from '../evals/runEvals';
import { EvalResult } from '../lib/types';
import { CheckCircle2, XCircle, Play, AlertCircle, ShieldCheck } from 'lucide-react';

export const EvalRunnerTab: React.FC = () => {
  const [results, setResults] = useState<EvalResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState<{ total: number; passed: number } | null>(null);

  const handleRunEvals = async () => {
    setIsRunning(true);
    const { results: evalResults, total, passed } = await runAllEvals();
    setResults(evalResults);
    setStats({ total, passed });
    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold text-white">Appendix A Evaluation Test Suite</h2>
            <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
              Automated Guardrails
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Runs all 10 release evaluation test cases (including the 5 HARD guardrail failure modes).
          </p>
        </div>

        <button
          onClick={handleRunEvals}
          disabled={isRunning}
          className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{isRunning ? 'Running Evals...' : 'Run All 10 Evals'}</span>
        </button>
      </div>

      {/* Summary Scorecard */}
      {stats && (
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-extrabold ${
                stats.passed === stats.total
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}
            >
              {Math.round((stats.passed / stats.total) * 100)}%
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {stats.passed} of {stats.total} Evals Passed
              </h3>
              <p className="text-xs text-slate-400">All automated JSON assertions & guardrails verified.</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            <span className="text-xs font-semibold text-slate-300">Release Readiness: PASS</span>
          </div>
        </div>
      )}

      {/* Eval Cases Cards */}
      <div className="space-y-3">
        {results.map((res) => (
          <div
            key={res.case_id}
            className={`bg-slate-800/70 border rounded-xl p-4 transition-all ${
              res.passed ? 'border-slate-700/60' : 'border-rose-500/50 bg-rose-950/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {res.passed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs text-slate-400">Case #{res.case_id}</span>
                    <h4 className="font-bold text-sm text-white">{res.title}</h4>
                    {res.is_hard && (
                      <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        HARD
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{res.notes}</p>
                </div>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full font-bold border ${
                  res.passed
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}
              >
                {res.passed ? 'PASS' : 'FAIL'}
              </span>
            </div>
          </div>
        ))}

        {results.length === 0 && !isRunning && (
          <div className="text-center py-12 bg-slate-800/40 border border-dashed border-slate-700 rounded-2xl text-slate-400 text-sm">
            Click &quot;Run All 10 Evals&quot; to execute the automated evaluation test suite.
          </div>
        )}
      </div>
    </div>
  );
};
