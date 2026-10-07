'use client';

import React, { useState } from 'react';
import { Post, FormatType } from '../lib/types';
import { X, Upload, Plus } from 'lucide-react';

interface IngestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPost: (post: Post) => void;
}

export const IngestionModal: React.FC<IngestionModalProps> = ({ isOpen, onClose, onAddPost }) => {
  const [title, setTitle] = useState('');
  const [format, setFormat] = useState<FormatType>('reel');
  const [reach, setReach] = useState('');
  const [likes, setLikes] = useState('');
  const [comments, setComments] = useState('');
  const [saves, setSaves] = useState('');
  const [postHour, setPostHour] = useState('19');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !reach) return;

    const newPost: Post = {
      id: `p_manual_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      format,
      title,
      reach: parseInt(reach) || 1000,
      likes: parseInt(likes) || 50,
      comments: parseInt(comments) || 5,
      saves: parseInt(saves) || 10,
      post_hour: parseInt(postHour) || 19,
      hook_type: 'manual',
      hashtag_count: 5,
      topic: 'general'
    };

    onAddPost(newPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-sky-400" />
            <h3 className="text-lg font-bold text-white">Import Post Data</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 font-medium mb-1">Post Title / Hook</label>
            <input
              type="text"
              required
              placeholder="e.g. 5 Winter Skincare Hacks"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 font-medium mb-1">Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as FormatType)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
              >
                <option value="reel">Reel</option>
                <option value="carousel">Carousel</option>
                <option value="story">Story</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 font-medium mb-1">Reach / Views</label>
              <input
                type="number"
                required
                placeholder="e.g. 8500"
                value={reach}
                onChange={(e) => setReach(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-slate-400 font-medium mb-1">Likes</label>
              <input
                type="number"
                placeholder="350"
                value={likes}
                onChange={(e) => setLikes(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 font-medium mb-1">Comments</label>
              <input
                type="number"
                placeholder="35"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 font-medium mb-1">Saves</label>
              <input
                type="number"
                placeholder="80"
                value={saves}
                onChange={(e) => setSaves(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 font-medium mb-1">Posting Hour (0 - 23)</label>
            <input
              type="number"
              min="0"
              max="23"
              value={postHour}
              onChange={(e) => setPostHour(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-400 text-white font-semibold py-2.5 rounded-xl text-sm transition-all shadow-md shadow-sky-500/20"
          >
            Add Post to Creator Profile
          </button>
        </form>
      </div>
    </div>
  );
};
