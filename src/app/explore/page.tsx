"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, SlidersHorizontal, ArrowUpDown, Star, Tag, 
  ChevronLeft, ChevronRight, Loader2, Bot, PlusCircle, ArrowRight 
} from 'lucide-react';

export default function ExplorePage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Search & Filter States
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  
  // Pagination States
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAgents, setTotalAgents] = useState(0);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/agents';

  // Debounce search input to prevent excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to page 1 on new search
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch Agents from Express + MongoDB Backend
  const fetchAgents = async () => {
    setLoading(true);
    setError('');

    try {
      const queryParams = new URLSearchParams({
        search: debouncedSearch,
        category,
        priceRange,
        sortBy,
        page: page.toString(),
        limit: '6', // Number of items per page
      });

      const res = await fetch(`${API_BASE_URL}?${queryParams.toString()}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch agents from server');
      }

      const data = await res.json();
      setAgents(data.agents || []);
      setTotalPages(data.totalPages || 1);
      setTotalAgents(data.totalAgents || 0);
    } catch (err: any) {
      setError(err.message || 'Something went wrong while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when any filter or page changes
  useEffect(() => {
    fetchAgents();
  }, [debouncedSearch, category, priceRange, sortBy, page]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Bot className="w-4 h-4" /> AI Marketplace
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Explore AI Agents
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Discover, test, and deploy autonomous workflows and specialized AI agents.
            </p>
          </div>

          <Link
            href="/add-agent"
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" /> Publish Agent
          </Link>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-xl">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search agents by title or description..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <SlidersHorizontal className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors appearance-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Document Intelligence">Document Intelligence</option>
                <option value="Recommendation">Recommendation</option>
                <option value="Chat Assistant">Chat Assistant</option>
                <option value="Auto Classification">Auto Classification</option>
                <option value="Data Analytics">Data Analytics</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <select
                value={priceRange}
                onChange={(e) => {
                  setPriceRange(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
              >
                <option value="All">All Prices</option>
                <option value="under30">Under $30/mo</option>
                <option value="30to50">$30 - $50/mo</option>
                <option value="above50">Above $50/mo</option>
              </select>
            </div>

          </div>

          {/* Sub-bar: Sort & Results Count */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
            <div>
              Found <span className="font-semibold text-white">{totalAgents}</span> Agents
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

        </div>

        {/* Content Section */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            <p className="text-xs font-medium">Fetching Agents from Database...</p>
          </div>
        ) : error ? (
          <div className="py-16 text-center text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 text-xs">
            {error}
          </div>
        ) : agents.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
            <Bot className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No AI Agents Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No results matched your search or filters. Try adjusting your search query or selecting a different category.
            </p>
          </div>
        ) : (
          <>
            {/* Agent Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <div
                  key={agent._id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-700 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between group"
                >
                  {/* Card Banner Image */}
                  <div>
                    <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                      <img
                        src={agent.image}
                        alt={agent.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] font-semibold text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {agent.category}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-base text-white line-clamp-1 group-hover:text-indigo-400 transition-colors">
                          {agent.title}
                        </h3>
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold shrink-0">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{agent.rating ? agent.rating.toFixed(1) : '5.0'}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {agent.tagline || agent.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-5 pt-0 mt-auto border-t border-slate-800/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Price</span>
                      <span className="text-base font-extrabold text-white">${agent.price}</span>
                      <span className="text-[10px] text-slate-400">/mo</span>
                    </div>

                    <Link
                      href={`/explore/${agent._id}`}
                      className="px-3.5 py-2 bg-slate-950 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-all border border-slate-800 hover:border-indigo-500 flex items-center gap-1.5"
                    >
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-slate-800 pt-6">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 flex items-center gap-1 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                <div className="text-xs text-slate-400">
                  Page <span className="font-bold text-white">{page}</span> of{' '}
                  <span className="font-bold text-white">{totalPages}</span>
                </div>

                <button
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 flex items-center gap-1 transition-all"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}