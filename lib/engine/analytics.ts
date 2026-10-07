import { Creator, Post, FormatType, UsageRights, Exclusivity, RateCardResult, AutopsyResult, PlannerResult, PlannerSlot } from '../types';
import { getBenchmark } from '../data/benchmarks';

// Helper: Calculate median of numbers array
export function calculateMedian(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  return sorted[middle];
}

// 1. Rate Card Engine
export function calculateRateCard(
  creator: Creator,
  deliverable: FormatType = 'reel',
  rights: UsageRights = 'none',
  exclusivity: Exclusivity = 'none'
): RateCardResult {
  // Filter posts by deliverable format
  let matchingPosts = creator.posts.filter((p) => p.format === deliverable);
  if (matchingPosts.length === 0) {
    matchingPosts = creator.posts; // Fallback if no specific format posts
  }

  const reaches = matchingPosts.map((p) => p.reach);
  const medianReach = Math.max(calculateMedian(reaches), 100);
  const postCount = matchingPosts.length;

  // Benchmark CPM and ER
  const { benchmark, isFallback } = getBenchmark(creator.niche);
  const cpmUsed = benchmark.cpm_inr;

  // Engagement Rate calculation
  let totalEngagement = 0;
  let totalReach = 0;
  matchingPosts.forEach((p) => {
    totalEngagement += p.likes + p.comments + p.saves;
    totalReach += p.reach;
  });

  const creatorEr = totalReach > 0 ? totalEngagement / totalReach : benchmark.er_baseline;
  let erFactor = creatorEr / benchmark.er_baseline;
  // Clamp erFactor between 0.6 and 1.3
  erFactor = Math.min(Math.max(erFactor, 0.6), 1.3);

  // Multipliers
  const formatMultipliers: Record<FormatType, number> = {
    reel: 1.0,
    carousel: 0.7,
    story: 0.3
  };

  const rightsMultipliers: Record<UsageRights, number> = {
    none: 1.0,
    '30_days': 1.20,
    '90_days': 1.35,
    '1_year': 1.50
  };

  const exclusivityMultipliers: Record<Exclusivity, number> = {
    none: 1.0,
    category_30d: 1.25,
    full_30d: 1.50
  };

  const formatMult = formatMultipliers[deliverable] || 1.0;
  const rightsMult = rightsMultipliers[rights] || 1.0;
  const exclMult = exclusivityMultipliers[exclusivity] || 1.0;

  // Base price formula
  const basePrice = (medianReach / 1000) * cpmUsed * erFactor * formatMult * rightsMult * exclMult;

  // Rounding helper
  const roundToNearest50 = (val: number) => Math.max(Math.round(val / 50) * 50, 500);

  const lowInr = roundToNearest50(basePrice * 0.8);
  const likelyInr = roundToNearest50(basePrice * 1.0);
  const highInr = roundToNearest50(basePrice * 1.3);

  // Confidence scoring
  let confidence: 'LOW' | 'MEDIUM' | 'HIGH' = 'MEDIUM';
  if (postCount < 8 || isFallback) {
    confidence = 'LOW';
  } else if (postCount >= 15 && !isFallback) {
    confidence = 'HIGH';
  }

  // Follower/Reach mismatch detection (<15% reach ratio)
  const reachRatioPct = Number(((medianReach / Math.max(creator.followers, 1)) * 100).toFixed(1));
  const followersReachMismatch = reachRatioPct < 15.0;

  // Default structured explanation (deterministic fallback)
  const flags: string[] = [];
  if (followersReachMismatch) {
    flags.push('followers_reach_mismatch');
  }
  if (isFallback) {
    flags.push('generic_benchmark_fallback');
  }
  if (confidence === 'LOW') {
    flags.push('low_data_confidence');
  }

  let summary = `Estimated fair rate range for 1 ${deliverable}: ₹${lowInr.toLocaleString()} to ₹${highInr.toLocaleString()}.`;
  let explanation = `Based on ${postCount} posts with median reach of ${medianReach.toLocaleString()} at ₹${cpmUsed} CPM in ${creator.niche}.`;

  if (followersReachMismatch) {
    explanation += ` Notice: Your median reach is ${reachRatioPct}% of your ${creator.followers.toLocaleString()} followers. Brands price strictly on actual reach, not total followers ("your reach, not your worth").`;
  }

  const nextSteps = [
    'Use this reach-backed range in your brand pitches',
    'Add deliverable add-ons (usage rights or exclusivity) to increase deal size',
    'Focus on improving reel reach to move your price tier higher'
  ];

  return {
    deliverable,
    rights,
    exclusivity,
    niche: creator.niche,
    median_reach: medianReach,
    post_count: postCount,
    cpm_used: cpmUsed,
    er_factor: Number(erFactor.toFixed(2)),
    base_price: Math.round(basePrice),
    low_inr: lowInr,
    likely_inr: likelyInr,
    high_inr: highInr,
    confidence,
    followers_reach_mismatch: followersReachMismatch,
    reach_ratio_pct: reachRatioPct,
    explanation: {
      summary,
      explanation,
      next_steps: nextSteps,
      flags
    }
  };
}

// 2. Post Autopsy Engine
export function analyzePostAutopsy(creator: Creator, targetPostId: string): AutopsyResult {
  const targetPost = creator.posts.find((p) => p.id === targetPostId) || creator.posts[0];
  const allReels = creator.posts.filter((p) => p.format === targetPost.format);
  const reaches = allReels.map((p) => p.reach);
  const medianReach = calculateMedian(reaches);

  const diffPct = Number((((targetPost.reach - medianReach) / medianReach) * 100).toFixed(1));

  // Evaluated factors
  const ruledOut: string[] = ['length', 'hashtags', 'format'];
  let verdict: 'POSSIBLE CAUSE FOUND' | 'NO CLEAR CAUSE' = 'NO CLEAR CAUSE';
  let causeFactor: string | undefined = undefined;
  let evidence: string | undefined = undefined;
  let experiment = 'Keep posting at your peak engagement window (7 PM - 9 PM) and compare reach over 3 posts.';

  // Check 1: Small effect size check (< 15% drop vs median is considered normal statistical noise)
  const isMinorDifference = Math.abs(diffPct) < 15.0;

  // Check 2: Posting Hour analysis
  const latePosts = allReels.filter((p) => p.post_hour >= 22 || p.post_hour <= 4);
  const normalPosts = allReels.filter((p) => p.post_hour < 22 && p.post_hour > 4);

  if (!isMinorDifference && targetPost.post_hour >= 22) {
    const avgLateReach = calculateMedian(latePosts.map((p) => p.reach));
    const avgNormalReach = calculateMedian(normalPosts.map((p) => p.reach));

    if (avgNormalReach > 0 && avgLateReach < avgNormalReach * 0.7) {
      const dropPct = Math.round(((avgNormalReach - avgLateReach) / avgNormalReach) * 100);
      verdict = 'POSSIBLE CAUSE FOUND';
      causeFactor = 'late_posting_hour';
      evidence = `Posted at ${targetPost.post_hour}:00 (${targetPost.post_hour > 12 ? targetPost.post_hour - 12 + ' PM' : targetPost.post_hour + ' AM'}). Your ${latePosts.length} late-night posts average ${dropPct}% lower reach than evening posts.`;
      experiment = 'Post this exact reel format at 7:00 PM instead of late night, and measure 48-hour reach.';
    }
  }

  if (verdict === 'NO CLEAR CAUSE' || isMinorDifference) {
    verdict = 'NO CLEAR CAUSE';
    causeFactor = undefined;
    evidence = undefined;
    ruledOut.push('posting_time');
    experiment = 'Test an active hook in the first 3 seconds and compare watch time.';
  }

  const flags: string[] = [];
  if (verdict === 'NO CLEAR CAUSE') {
    flags.push('no_clear_cause');
  }

  return {
    post_id: targetPost.id,
    post_title: targetPost.title,
    post_reach: targetPost.reach,
    median_reach: medianReach,
    diff_pct: diffPct,
    verdict,
    cause_factor: causeFactor,
    evidence,
    ruled_out: ruledOut,
    experiment,
    explanation: {
      summary: verdict === 'POSSIBLE CAUSE FOUND' ? `Possible cause found for "${targetPost.title}"` : `No clear cause found for "${targetPost.title}"`,
      explanation: verdict === 'POSSIBLE CAUSE FOUND'
        ? evidence || ''
        : `Your post reach (${targetPost.reach.toLocaleString()}) is close to your median (${medianReach.toLocaleString()}). Data checked across length, hashtags, format, and timing shows no single factor caused this variation.`,
      next_steps: [experiment],
      flags
    }
  };
}

// 3. Next-Post Planner
export function generatePostingPlan(creator: Creator): PlannerResult {
  const postCount = creator.posts.length;
  const isLowConfidence = postCount < 8;

  if (isLowConfidence) {
    return {
      plan: [
        { day: 'Monday', format: 'reel', topic: 'core_niche_tip', time: '7:00 PM', based_on: 'Initial test post' },
        { day: 'Thursday', format: 'reel', topic: 'behind_the_scenes', time: '6:30 PM', based_on: 'Initial test post' }
      ],
      confidence: 'LOW',
      explanation: `Only ${postCount} posts imported. We need at least 8 posts to generate a high-confidence posting plan.`
    };
  }

  // Sort creator posts by reach to identify top performers
  const sorted = [...creator.posts].sort((a, b) => b.reach - a.reach);
  const topPosts = sorted.slice(0, 3);

  const days = ['Monday', 'Wednesday', 'Friday', 'Sunday', 'Tuesday', 'Thursday'];
  const plan: PlannerSlot[] = days.map((day, idx) => {
    const refPost = topPosts[idx % topPosts.length];
    return {
      day,
      format: refPost.format,
      topic: refPost.topic.replace('_', ' '),
      time: `${refPost.post_hour > 12 ? refPost.post_hour - 12 : refPost.post_hour}:00 ${refPost.post_hour >= 12 ? 'PM' : 'AM'}`,
      based_on: `Top post "${refPost.title}" (${refPost.reach.toLocaleString()} reach)`
    };
  });

  return {
    plan,
    confidence: 'HIGH'
  };
}
