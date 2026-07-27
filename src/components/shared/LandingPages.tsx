
"use client"
import React, { useState } from 'react';
import { 
  Bot, Sparkles, FileText, Cpu, CheckCircle2, ArrowRight, 
  BarChart3, Star, Mail, PlayCircle, Zap, ShieldCheck 
} from 'lucide-react';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('doc');
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased">
      
      {/* SECTION 1: HERO SECTION */}
      <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" /> Next-Gen Agentic AI Platform
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            Autonomous AI Agents Working for Your Business, <span className="text-indigo-500">24/7</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Automate complex workflows, parse unstructured documents, and supercharge team productivity with our context-aware agentic framework.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2">
              Try Live Demo <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2">
              <PlayCircle className="w-4 h-4" /> Watch Video
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: LIVE FEATURE SHOWCASE / INTERACTIVE PLAYGROUND */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">See Agents in Action</h2>
            <p className="text-slate-400">Select a capability below to preview real-time AI tool execution.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            {/* Tabs */}
            <div className="flex border-b border-slate-800 pb-4 gap-4 overflow-x-auto">
              <button 
                onClick={() => setActiveTab('doc')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'doc' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Document Parsing
              </button>
              <button 
                onClick={() => setActiveTab('classify')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'classify' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Auto-Tagging
              </button>
              <button 
                onClick={() => setActiveTab('rec')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'rec' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Smart Recommendations
              </button>
            </div>

            {/* Output Preview Area */}
            <div className="mt-6 bg-slate-950 rounded-xl p-6 font-mono text-sm text-slate-300 border border-slate-800/80 min-h-[160px]">
              {activeTab === 'doc' && (
                <div>
                  <p className="text-indigo-400 mb-2">&gt; Uploading PDF: "Q4_Financial_Report.pdf"...</p>
                  <p className="text-slate-400">[Agent Tool Executing]: Extracting key financial summaries and action items...</p>
                  <p className="text-emerald-400 mt-2">✓ Success: Generated 3 summary points and 2 follow-up tasks.</p>
                </div>
              )}
              {activeTab === 'classify' && (
                <div>
                  <p className="text-indigo-400 mb-2">&gt; Analyzing user query: "How do I upgrade my billing tier?"</p>
                  <p className="text-slate-400">[Agent Tool Executing]: Classifying ticket category...</p>
                  <p className="text-emerald-400 mt-2">✓ Category: "Billing" | Urgency: "Medium" | Auto-Tags: #Subscription, #Account</p>
                </div>
              )}
              {activeTab === 'rec' && (
                <div>
                  <p className="text-indigo-400 mb-2">&gt; Reading user interaction history...</p>
                  <p className="text-slate-400">[Agent Tool Executing]: Context-aware matching algorithms...</p>
                  <p className="text-emerald-400 mt-2">✓ Recommended Workflows: [1] Auto-Invoice Parsing, [2] Slack AI Summary Bot</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: KEY CAPABILITIES / SERVICES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Core Agent Capabilities</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Designed for enterprise-level automation with high precision and flexibility.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FileText, title: "Document Intelligence", desc: "Extract insights, tables, and summary actions directly from PDFs and raw text." },
              { icon: Zap, title: "Smart Recommendation", desc: "Context-driven suggestions tailored dynamically to user preferences and activity." },
              { icon: Bot, title: "Autonomous Chat Assistant", desc: "Conversational reasoning agents equipped with multi-turn memory and tool execution." },
              { icon: Cpu, title: "Auto Classification", desc: "Automatic tagging, category detection, and structured metadata generation." },
            ].map((feature, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 bg-indigo-600/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 mb-6">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS / WORKFLOW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">How The AI Workflow Works</h2>
            <p className="text-slate-400">3 simple steps to complete complex tasks autonomously.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Define Goal & Input Data", desc: "Provide instructions, upload files, or choose from pre-built agent templates." },
              { step: "02", title: "Agent Reasoning & Execution", desc: "The AI agent formulates a plan, calls appropriate tools, and processes data." },
              { step: "03", title: "Review & Export Results", desc: "Receive structured JSON outputs, actionable summaries, or trigger direct API webhooks." },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 relative">
                <span className="text-5xl font-extrabold text-slate-800 absolute top-6 right-6">{item.step}</span>
                <h3 className="text-xl font-semibold text-white mb-3 mt-4 relative z-10">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: METRICS & IMPACT STATS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Processing Accuracy", value: "99.8%" },
              { label: "Task Execution Speed", value: "10x Faster" },
              { label: "Workflows Executed", value: "50,000+" },
              { label: "Uptime & Availability", value: "99.9%" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-indigo-400 mb-2">{stat.value}</p>
                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS & REVIEWS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">User Feedback</h2>
            <p className="text-slate-400">See how developer teams are scaling operations with our AI platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Alex Rivera", role: "Product Manager", quote: "The document intelligence agent saved our team over 15 hours a week in manual parsing." },
              { name: "Sarah Chen", role: "Lead Engineer", quote: "Integrating the context-aware recommendation engine into our stack was seamless and fast." },
              { name: "Michael Vance", role: "Operations Lead", quote: "The autonomous agent workflows handle our customer ticket tagging with zero manual intervention." },
            ].map((review, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm italic mb-6">"{review.quote}"</p>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{review.name}</p>
                  <p className="text-slate-500 text-xs">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: NEWSLETTER & CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto text-center bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Automate Your Workflows?</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">Join thousands of developers and teams building next-generation agentic workflows today.</p>

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-white placeholder-slate-500 px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 flex-1 text-sm"
                required
              />
              <button 
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm whitespace-nowrap shadow-lg shadow-indigo-600/20"
              >
                Get Started Free
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}