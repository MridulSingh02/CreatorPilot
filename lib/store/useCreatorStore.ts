'use client';

import { useState } from 'react';
import { Creator, Post, Deal } from '../types';
import { SEEDED_CREATORS } from '../data/seededCreators';

export type TabType = 'dashboard' | 'ratecard' | 'autopsy' | 'outreach' | 'planner' | 'evals';

export function useCreatorStore() {
  const [creators, setCreators] = useState<Record<string, Creator>>(SEEDED_CREATORS);
  const [activeCreatorId, setActiveCreatorId] = useState<string>('aanya');
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isIngestionOpen, setIsIngestionOpen] = useState<boolean>(false);

  const activeCreator = creators[activeCreatorId] || creators['aanya'];

  const switchCreator = (id: string) => {
    if (creators[id]) {
      setActiveCreatorId(id);
    }
  };

  const addCustomPost = (post: Post) => {
    setCreators((prev) => {
      const current = prev[activeCreatorId];
      if (!current) return prev;
      return {
        ...prev,
        [activeCreatorId]: {
          ...current,
          posts: [post, ...current.posts]
        }
      };
    });
  };

  const addDeal = (deal: Deal) => {
    setCreators((prev) => {
      const current = prev[activeCreatorId];
      if (!current) return prev;
      return {
        ...prev,
        [activeCreatorId]: {
          ...current,
          deals: [deal, ...current.deals]
        }
      };
    });
  };

  const updateDealStatus = (dealId: string, status: Deal['status']) => {
    setCreators((prev) => {
      const current = prev[activeCreatorId];
      if (!current) return prev;
      return {
        ...prev,
        [activeCreatorId]: {
          ...current,
          deals: current.deals.map((d) => (d.id === dealId ? { ...d, status } : d))
        }
      };
    });
  };

  return {
    creators,
    activeCreator,
    activeCreatorId,
    activeTab,
    isIngestionOpen,
    switchCreator,
    setActiveTab,
    setIsIngestionOpen,
    addCustomPost,
    addDeal,
    updateDealStatus
  };
}
