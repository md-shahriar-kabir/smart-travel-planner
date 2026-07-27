"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Star, Tag, Terminal, Play, Loader2, 
  CheckCircle, Zap, ShieldAlert, Copy, Check 
} from 'lucide-react';

export default function AgentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [agent, setAgent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Interactive Sandbox State
  const [prompt, setPrompt] = useState('');
  const [executing, setExecuting] = useState(false);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/agents';

  // 1. Fetch Agent Details from Express & MongoDB
  useEffect(() => {
    const fetchAgentDetails = async () => {
      if (!id) return;
      setLoading(true);
      setError('');

      try {
        const res = await fetch(`${API_BASE_URL}/${id}`);
        if (!res.ok) {
          throw new Error('Agent not found or server error');
        }
        const data = await res.json();
        setAgent(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load agent details.');
      } finally {
        setLoading(false);
      }
    };

    fetchAgentDetails();
  }, [id, API_BASE_URL]);

  // 2. Handle Deploy Button Click -> Redirect to Login Page
  const handleDeploy = () => {
    // Redirects user to /login with callback query parameter to return after login
    router.push(`/login?redirectTo=/explore/${id}`);
  };

  // 3. Handle Sandbox Execution API Call
  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setExecuting(true);
    setOutput('');

    try {
      const res = await fetch(`${API_BASE_URL}/${id}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Execution failed');
      }

      setOutput(data.output || 'No output received.');
    } catch (err: any) {
      setOutput(`Error: ${err.message || 'Failed to execute prompt'}`);
    } finally {
      setExecuting(false);
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-200">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
          <span>Loading agent details...</span>
        </div>
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-200 p-4">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md text-center space-y-4">
          <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-xl font-bold">Error Loading Agent</h2>
          <p className="text-sm text-slate-400">{error || 'Could not find the requested agent.'}</p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-xl text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Back Link */}
        <div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Marketplace
          </Link>
        </div>

        {/* Agent Main Header & Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
          
          {/* Banner Image */}
          <div className="lg:col-span-1 rounded-2xl overflow-hidden border border-slate-800 aspect-video lg:aspect-auto h-64 lg:h-full relative">
            <img
              src={agent.image}
              alt={agent.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-indigo-400 border border-indigo-500/20 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              {agent.category}
            </span>
          </div>

          {/* Details Overview */}
          <div className="lg:col-span-2 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h1 className="text-3xl font-extrabold text-white tracking-tight">
                  {agent.title}
                </h1>
                <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{agent.rating || '5.0'}</span>
                  <span className="text-slate-500">({agent.totalReviews || 0} reviews)</span>
                </div>
              </div>

              {agent.tagline && (
                <p className="text-indigo-400 text-sm font-medium">
                  {agent.tagline}
                </p>
              )}

              <p className="text-slate-300 text-sm leading-relaxed">
                {agent.description}
              </p>
            </div>

            {/* Price & Action */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Subscription Price</span>
                <div className="text-2xl font-bold text-white">
                  ${agent.price} <span className="text-xs text-slate-500 font-normal">/ month</span>
                </div>
              </div>

              {/* Deploy Agent Button with Redirect Functionality */}
              <button 
                onClick={handleDeploy}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4" /> Deploy Agent
              </button>
            </div>
          </div>

        </div>

        {/* Features & Interactive Sandbox Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Key Features List */}
          <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-indigo-400" /> Key Features
            </h3>
            {agent.features && agent.features.length > 0 ? (
              <ul className="space-y-3">
                {agent.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500">No specific features listed.</p>
            )}
          </div>

          {/* Interactive Agent Sandbox */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-indigo-400" /> Interactive Agent Sandbox
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Test prompt execution directly against this agent backend API.
                </p>
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleExecute} className="space-y-3">
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter input prompt or context for this agent..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={executing || !prompt.trim()}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
                >
                  {executing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" /> Execute Prompt
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Output Display Terminal */}
            {output && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Execution Output</span>
                  <button
                    onClick={copyToClipboard}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-emerald-400 whitespace-pre-wrap overflow-x-auto max-h-60">
                  {output}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}