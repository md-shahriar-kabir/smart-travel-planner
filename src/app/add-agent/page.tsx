"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Bot, ArrowLeft, Image as ImageIcon, Tag, DollarSign, 
  Plus, Trash2, Send, AlertCircle, Loader2 
} from 'lucide-react';

export default function AddAgentPage() {
  const router = useRouter();

  // Form Field States
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  
  // Features (Dynamic List)
  const [features, setFeatures] = useState<string[]>(['']);

  // Loading & Error States
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Environment Variable / Fallback Express URL
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/agents';

  // Dynamic Feature Operations
  const handleAddFeature = () => {
    setFeatures([...features, '']);
  };

  const handleRemoveFeature = (index: number) => {
    const updated = features.filter((_, i) => i !== index);
    setFeatures(updated);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  // Form Submission Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!category) {
      setError('Please select a valid category');
      return;
    }

    setIsLoading(true);

    // Payload for Express + MongoDB backend
    const payload = {
      title,
      tagline,
      description,
      image,
      category,
      price: parseFloat(price) || 0,
      features: features.filter((f) => f.trim() !== ''),
    };

    try {
      // POST Request to Express Server
      const res = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to publish AI Agent');
      }

      // On successful creation -> Redirect to explore page
      router.push('/explore');
    } catch (err: any) {
      setError(err.message || 'Something went wrong while connecting to the backend server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Navigation / Header Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Explore
          </Link>
        </div>

        {/* Main Card Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Header */}
          <div className="mb-8 border-b border-slate-800 pb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 mb-3">
              <Bot className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Publish New AI Agent
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Add your custom AI agent and save it directly to MongoDB backend.
            </p>
          </div>

          {/* Error Message Box */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Agent Title */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Agent Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. DocuMind AI Parser"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Short Tagline */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Short Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Autonomous document parser for automated key data extraction"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Category & Price Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Category Dropdown */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Category <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Tag className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <select
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                  >
                    <option value="" disabled>Select Category</option>
                    <option value="Document Intelligence">Document Intelligence</option>
                    <option value="Recommendation">Recommendation</option>
                    <option value="Chat Assistant">Chat Assistant</option>
                    <option value="Auto Classification">Auto Classification</option>
                    <option value="Data Analytics">Data Analytics</option>
                  </select>
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Monthly Price ($) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="29"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

            </div>

            {/* Banner Image URL */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Image Banner URL <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <ImageIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="url"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Full Description */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Full Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail what this agent accomplishes, its features, architecture, memory, and output format..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              />
            </div>

            {/* Dynamic Features Fields */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Key Features / Highlights
              </label>
              <div className="space-y-2.5">
                {features.map((feat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={feat}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder={`Feature #${index + 1}`}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    {features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddFeature}
                className="mt-3 text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Feature
              </button>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-800">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving Agent to MongoDB...
                  </>
                ) : (
                  <>
                    Publish Agent
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}