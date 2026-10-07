import { Benchmark } from '../types';

export const BENCHMARKS: Record<string, Benchmark> = {
  beauty: { niche: 'beauty', cpm_inr: 1200, er_baseline: 0.033 },
  fitness: { niche: 'fitness', cpm_inr: 1250, er_baseline: 0.025 },
  finance: { niche: 'finance', cpm_inr: 1600, er_baseline: 0.020 },
  tech: { niche: 'tech', cpm_inr: 1500, er_baseline: 0.022 },
  fashion: { niche: 'fashion', cpm_inr: 1100, er_baseline: 0.030 },
  lifestyle: { niche: 'lifestyle', cpm_inr: 1150, er_baseline: 0.028 },
  food: { niche: 'food', cpm_inr: 1050, er_baseline: 0.035 },
  gaming: { niche: 'gaming', cpm_inr: 900, er_baseline: 0.040 },
  // Generic fallback
  default: { niche: 'generic', cpm_inr: 1000, er_baseline: 0.025 }
};

export function getBenchmark(niche: string): { benchmark: Benchmark; isFallback: boolean } {
  const normalized = niche.trim().toLowerCase();
  if (BENCHMARKS[normalized]) {
    return { benchmark: BENCHMARKS[normalized], isFallback: false };
  }
  return { benchmark: BENCHMARKS['default'], isFallback: true };
}
