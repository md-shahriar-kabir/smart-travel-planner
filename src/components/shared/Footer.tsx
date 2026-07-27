import React from 'react';
import { Bot, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { BsGithub, BsTwitterX } from 'react-icons/bs';
import { LiaLinkedin } from 'react-icons/lia';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & About Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                <Bot className="w-5 h-5" />
              </div>
              <span>Agentic<span className="text-indigo-500">AI</span></span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering businesses with autonomous AI agents, multi-modal document intelligence, and context-aware smart workflows.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 transition-all"
              >
                <BsGithub className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 transition-all"
              >
                <LiaLinkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 transition-all"
              >
                <BsTwitterX className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/" className="hover:text-indigo-400 transition-colors">Home</a></li>
              <li><a href="/explore" className="hover:text-indigo-400 transition-colors">Explore Agents</a></li>
              <li><a href="/about" className="hover:text-indigo-400 transition-colors">About Us</a></li>
              <li><a href="/blogs" className="hover:text-indigo-400 transition-colors">Blog & News</a></li>
              <li><a href="/contact" className="hover:text-indigo-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Features / Services Column */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">AI Features</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/explore" className="hover:text-indigo-400 transition-colors">Doc Intelligence</a></li>
              <li><a href="/explore" className="hover:text-indigo-400 transition-colors">Smart Recommendations</a></li>
              <li><a href="/explore" className="hover:text-indigo-400 transition-colors">Chat Assistant</a></li>
              <li><a href="/explore" className="hover:text-indigo-400 transition-colors">Auto Classification</a></li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">Get In Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Mirpur DOHS, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href="mailto:support@agentic.ai" className="hover:text-indigo-400 transition-colors">support@agentic.ai</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href="tel:+8801322901105" className="hover:text-indigo-400 transition-colors">+880 1322 901105</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Agentic AI Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="/support" className="hover:text-slate-400 transition-colors">Help Center</a>
          </div>
        </div>
      </div>
    </footer>
  );
}