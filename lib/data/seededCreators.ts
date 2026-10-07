import { Creator } from '../types';

export const SEEDED_CREATORS: Record<string, Creator> = {
  aanya: {
    id: 'aanya',
    name: 'Aanya Sharma',
    handle: '@aanyabeauty',
    followers: 18000,
    niche: 'beauty',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    deals: [
      {
        id: 'deal_1',
        brand: 'GlowLabs',
        product: 'Vitamin C Serum',
        deliverable: 'reel',
        quoted_inr: 3500,
        status: 'Pitched',
        is_sponsored: true
      },
      {
        id: 'deal_2',
        brand: 'Minimalist',
        product: 'Sunscreeen SPF 50',
        deliverable: 'reel',
        quoted_inr: 3000,
        status: 'Closed',
        closed_value_inr: 3500,
        is_sponsored: true
      }
    ],
    posts: [
      { id: 'p1', date: '2026-10-01', format: 'reel', title: '5 Skincare Mistakes in Winter', reach: 9800, likes: 410, comments: 45, saves: 120, post_hour: 19, hook_type: 'question', hashtag_count: 5, topic: 'skincare_tips', length_seconds: 35 },
      { id: 'p2', date: '2026-09-28', format: 'reel', title: 'Get Ready With Me: Glowy Base', reach: 9100, likes: 380, comments: 38, saves: 95, post_hour: 19, hook_type: 'grwm', hashtag_count: 6, topic: 'makeup_tutorial', length_seconds: 45 },
      { id: 'p3', date: '2026-09-25', format: 'reel', title: 'Hydrating Serums Ranked 1 to 5', reach: 10400, likes: 460, comments: 52, saves: 150, post_hour: 18, hook_type: 'listicle', hashtag_count: 4, topic: 'product_review', length_seconds: 30 },
      { id: 'p4', date: '2026-09-22', format: 'reel', title: 'Night Routine for Glass Skin', reach: 8900, likes: 350, comments: 32, saves: 88, post_hour: 20, hook_type: 'routine', hashtag_count: 5, topic: 'skincare_routine', length_seconds: 40 },
      { id: 'p5', date: '2026-09-19', format: 'reel', title: 'Get Ready With Me for Event', reach: 3100, likes: 110, comments: 12, saves: 20, post_hour: 23, hook_type: 'grwm', hashtag_count: 8, topic: 'makeup_tutorial', length_seconds: 60 }, // Flopped post (late hour)
      { id: 'p6', date: '2026-09-16', format: 'reel', title: 'Drugstore vs High-End Lipsticks', reach: 9400, likes: 400, comments: 41, saves: 110, post_hour: 19, hook_type: 'versus', hashtag_count: 5, topic: 'makeup_review', length_seconds: 35 },
      { id: 'p7', date: '2026-09-13', format: 'reel', title: 'Sunscreen Reapplication Hack', reach: 8700, likes: 340, comments: 30, saves: 82, post_hour: 18, hook_type: 'hack', hashtag_count: 4, topic: 'skincare_hacks', length_seconds: 25 },
      { id: 'p8', date: '2026-09-10', format: 'reel', title: 'Clean Beauty Haul Unboxing', reach: 9200, likes: 390, comments: 36, saves: 90, post_hour: 19, hook_type: 'unboxing', hashtag_count: 6, topic: 'haul', length_seconds: 50 },
      { id: 'p9', date: '2026-09-07', format: 'reel', title: 'My Top 3 Holy Grail Cleansers', reach: 9600, likes: 420, comments: 48, saves: 130, post_hour: 19, hook_type: 'listicle', hashtag_count: 5, topic: 'skincare_tips', length_seconds: 30 },
      { id: 'p10', date: '2026-09-04', format: 'reel', title: 'Late Night Skincare Chat', reach: 2900, likes: 95, comments: 10, saves: 15, post_hour: 23, hook_type: 'vlog', hashtag_count: 12, topic: 'chitchat', length_seconds: 55 }, // Flopped
      { id: 'p11', date: '2026-09-01', format: 'reel', title: 'Acne Scars Routine That Works', reach: 9300, likes: 390, comments: 40, saves: 105, post_hour: 18, hook_type: 'solution', hashtag_count: 5, topic: 'skincare_routine', length_seconds: 35 },
      { id: 'p12', date: '2026-08-29', format: 'reel', title: 'Monsoon Makeup Proof Test', reach: 8800, likes: 360, comments: 33, saves: 85, post_hour: 19, hook_type: 'test', hashtag_count: 5, topic: 'makeup_tutorial', length_seconds: 40 },
      { id: 'p13', date: '2026-08-26', format: 'carousel', title: 'Ingredient Spotlight: Niacinamide 101', reach: 6200, likes: 280, comments: 25, saves: 140, post_hour: 19, hook_type: 'educational', hashtag_count: 4, topic: 'skincare_education', length_seconds: 0 },
      { id: 'p14', date: '2026-08-23', format: 'story', title: 'Poll: Which Vitamin C to test next?', reach: 2700, likes: 90, comments: 15, saves: 5, post_hour: 12, hook_type: 'poll', hashtag_count: 0, topic: 'engagement', length_seconds: 0 }
    ]
  },
  rohan: {
    id: 'rohan',
    name: 'Rohan Varma',
    handle: '@rohanfitfinance',
    followers: 85000,
    niche: 'fitness',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    deals: [
      {
        id: 'deal_rohan_1',
        brand: 'Optimum Protein',
        product: 'Whey Isolate 1kg',
        deliverable: 'reel',
        quoted_inr: 140000, // Quote rejected by brand!
        status: 'Pitched',
        is_sponsored: true
      }
    ],
    posts: [
      { id: 'r1', date: '2026-10-02', format: 'reel', title: 'Full Body HIIT Workout in 20 Mins', reach: 6800, likes: 45, comments: 5, saves: 18, post_hour: 18, hook_type: 'workout', hashtag_count: 15, topic: 'hiit', length_seconds: 45 },
      { id: 'r2', date: '2026-09-29', format: 'reel', title: 'How I Prep 150g Protein Daily', reach: 7200, likes: 52, comments: 6, saves: 25, post_hour: 18, hook_type: 'mealprep', hashtag_count: 12, topic: 'nutrition', length_seconds: 40 },
      { id: 'r3', date: '2026-09-26', format: 'reel', title: '3 Muscle Building Myths Debunked', reach: 6500, likes: 40, comments: 4, saves: 14, post_hour: 17, hook_type: 'myths', hashtag_count: 10, topic: 'fitness_education', length_seconds: 35 },
      { id: 'r4', date: '2026-09-23', format: 'reel', title: 'Creatine Monohydrate: Honest Review', reach: 6200, likes: 38, comments: 3, saves: 12, post_hour: 19, hook_type: 'review', hashtag_count: 14, topic: 'supplements', length_seconds: 50 },
      { id: 'r5', date: '2026-09-20', format: 'reel', title: 'Leg Day Progression Routine', reach: 5900, likes: 35, comments: 3, saves: 10, post_hour: 18, hook_type: 'routine', hashtag_count: 15, topic: 'workout', length_seconds: 45 },
      { id: 'r6', date: '2026-09-17', format: 'reel', title: 'Budget Grocery Haul for Muscle Gain', reach: 7500, likes: 58, comments: 8, saves: 30, post_hour: 18, hook_type: 'haul', hashtag_count: 11, topic: 'budget_nutrition', length_seconds: 40 },
      { id: 'r7', date: '2026-09-14', format: 'reel', title: 'Why Calorie Deficit Fails Most People', reach: 6400, likes: 42, comments: 4, saves: 16, post_hour: 18, hook_type: 'educational', hashtag_count: 13, topic: 'fatloss', length_seconds: 35 },
      { id: 'r8', date: '2026-09-11', format: 'reel', title: 'Upper Body Workout Blueprint', reach: 6600, likes: 44, comments: 5, saves: 17, post_hour: 17, hook_type: 'blueprint', hashtag_count: 15, topic: 'workout', length_seconds: 45 },
      { id: 'r9', date: '2026-09-08', format: 'reel', title: 'Morning Mobility Routine for Desks', reach: 7100, likes: 50, comments: 7, saves: 22, post_hour: 18, hook_type: 'routine', hashtag_count: 12, topic: 'mobility', length_seconds: 30 },
      { id: 'r10', date: '2026-09-05', format: 'reel', title: 'Supplements You Actually Need', reach: 6300, likes: 39, comments: 4, saves: 13, post_hour: 19, hook_type: 'listicle', hashtag_count: 14, topic: 'supplements', length_seconds: 40 },
      { id: 'r11', date: '2026-09-02', format: 'reel', title: 'Abs Workout at Home No Equipment', reach: 7400, likes: 55, comments: 8, saves: 28, post_hour: 18, hook_type: 'home_workout', hashtag_count: 10, topic: 'abs', length_seconds: 35 },
      { id: 'r12', date: '2026-08-30', format: 'reel', title: 'Sleep and Recovery Secrets', reach: 6000, likes: 36, comments: 3, saves: 11, post_hour: 18, hook_type: 'tips', hashtag_count: 15, topic: 'recovery', length_seconds: 45 },
      { id: 'r13', date: '2026-08-27', format: 'reel', title: 'Bicep Peak Triceps Drop Set', reach: 6700, likes: 46, comments: 5, saves: 19, post_hour: 17, hook_type: 'workout', hashtag_count: 14, topic: 'arms', length_seconds: 40 },
      { id: 'r14', date: '2026-08-24', format: 'reel', title: 'Pre Workout vs Coffee Comparison', reach: 6900, likes: 48, comments: 6, saves: 21, post_hour: 18, hook_type: 'versus', hashtag_count: 13, topic: 'supplements', length_seconds: 35 },
      { id: 'r15', date: '2026-08-21', format: 'reel', title: '5 Min Post Workout Stretching', reach: 6100, likes: 37, comments: 3, saves: 12, post_hour: 18, hook_type: 'stretching', hashtag_count: 15, topic: 'recovery', length_seconds: 30 }
    ]
  },
  meera: {
    id: 'meera',
    name: 'Meera Patel',
    handle: '@meeracreates',
    followers: 2400,
    niche: 'lifestyle',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    deals: [],
    posts: [
      { id: 'm1', date: '2026-10-03', format: 'reel', title: 'College Study Vlog & Desk Setup', reach: 650, likes: 25, comments: 3, saves: 8, post_hour: 18, hook_type: 'vlog', hashtag_count: 5, topic: 'study_vlog', length_seconds: 45 },
      { id: 'm2', date: '2026-09-25', format: 'reel', title: '3 Aesthetic Stationery Finds', reach: 580, likes: 22, comments: 2, saves: 6, post_hour: 17, hook_type: 'finds', hashtag_count: 4, topic: 'stationery', length_seconds: 30 },
      { id: 'm3', date: '2026-09-15', format: 'reel', title: 'OOTD College Fit Check', reach: 620, likes: 24, comments: 3, saves: 5, post_hour: 19, hook_type: 'ootd', hashtag_count: 6, topic: 'fashion', length_seconds: 20 },
      { id: 'm4', date: '2026-09-01', format: 'reel', title: 'Matcha Latte Morning Routine', reach: 550, likes: 19, comments: 2, saves: 4, post_hour: 10, hook_type: 'routine', hashtag_count: 5, topic: 'routine', length_seconds: 35 }
    ]
  }
};
