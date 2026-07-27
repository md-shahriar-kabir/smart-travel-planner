"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bot, Trash2, Edit, PlusCircle, ExternalLink, 
  Search, Loader2, AlertCircle, RefreshCw, CheckCircle2 
} from 'lucide-react';

export default function ManageItemsPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  
  // Action States
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/agents';

  // 1. Fetch Agents
  const fetchAgents = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}?limit=100`); // Fetch all items
      if (!res.ok) throw new Error('Failed to fetch items from backend');
      
      const data = await res.json();
      setAgents(data.agents || []);
    } catch (err: any) {
      setError(err.message || 'Something went wrong while fetching items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  // 2. Handle Delete Agent
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this AI Agent? This action cannot be undone.');
    if (!confirmDelete) return;

    setDeletingId(id);
    setSuccessMsg('');

    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to delete agent');
      }

      // Remove from UI state
      setAgents((prev) => prev.filter((agent) => agent._id !== id));
      setSuccessMsg('Agent successfully deleted!');
      
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      alert(err.message || 'Could not delete item.');
    } finally {
      setDeletingId(null);
    }
  };

  // Filtered Agents based on local search
  const filteredAgents = agents.filter(
    (agent) =>
      agent.title.toLowerCase().includes(search.toLowerCase()) ||
      agent.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Bot className="w-4 h-4" /> Admin Management
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Manage AI Agents
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              View, edit, or remove published AI Agents stored in MongoDB.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAgents}
              className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 transition-colors"
              title="Refresh Items"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <Link
              href="/add-agent"
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" /> Add New Agent
            </Link>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Search & Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items by title or category..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-400 flex items-center justify-between">
            <span>Total Agents Listed:</span>
            <span className="text-white font-bold text-sm">{agents.length}</span>
          </div>
        </div>

        {/* Content Table / Cards */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            <p className="text-xs font-medium">Loading management dashboard...</p>
          </div>
        ) : error ? (
          <div className="py-12 text-center text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 text-xs flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        ) : filteredAgents.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
            <Bot className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-white">No Items Found</h3>
            <p className="text-xs text-slate-400">No agents match your search or exist in the database.</p>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th scope="col" className="py-4 px-6">Agent</th>
                    <th scope="col" className="py-4 px-6">Category</th>
                    <th scope="col" className="py-4 px-6">Price</th>
                    <th scope="col" className="py-4 px-6">Rating</th>
                    <th scope="col" className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredAgents.map((agent) => (
                    <tr key={agent._id} className="hover:bg-slate-800/40 transition-colors">
                      
                      {/* Title & Image */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={agent.image}
                            alt={agent.title}
                            className="w-10 h-10 rounded-xl object-cover bg-slate-950 border border-slate-800"
                          />
                          <div>
                            <div className="font-bold text-white text-sm line-clamp-1">
                              {agent.title}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1 max-w-xs">
                              {agent.tagline || agent.description}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-semibold">
                          {agent.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-6 font-bold text-white">
                        ${agent.price}/mo
                      </td>

                      {/* Rating */}
                      <td className="py-4 px-6 text-amber-400 font-semibold">
                        ★ {agent.rating ? agent.rating.toFixed(1) : '5.0'}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          
                          {/* View Details Link */}
                          <Link
                            href={`/explore/${agent._id}`}
                            className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                            title="View Public Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(agent._id)}
                            disabled={deletingId === agent._id}
                            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors disabled:opacity-50 cursor-pointer"
                            title="Delete Item"
                          >
                            {deletingId === agent._id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}