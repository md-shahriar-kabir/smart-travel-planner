"use client"
import React, { useState } from 'react';
import { 
  Bot, Menu, X, PlusCircle, LayoutDashboard, User, 
  LogOut, Compass, Home, Info, Sparkles 
} from 'lucide-react';
import { authClient } from '@/src/lib/auth-client';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Better Auth Session Hook
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setIsProfileOpen(false);
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2.5 font-bold text-xl text-white">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                <Bot className="w-5 h-5" />
              </div>
              <span>Agentic<span className="text-indigo-500">AI</span></span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="/" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              <Home className="w-4 h-4" /> Home
            </a>
            <a href="/explore" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              <Compass className="w-4 h-4" /> Explore
            </a>
            
            {/* Authenticated Only Links */}
            {session && (
              <>
                <a href="/add-agent" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <PlusCircle className="w-4 h-4" /> Add Agent
                </a>
                <a href="/items/manage" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <LayoutDashboard className="w-4 h-4" /> Manage Items
                </a>
              </>
            )}

            <a href="/about" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              <Info className="w-4 h-4" /> About Us
            </a>
          </div>

          {/* Auth Actions Area */}
          <div className="hidden md:flex items-center gap-4">
            {isPending ? (
              /* Loading Skeleton */
              <div className="w-8 h-8 rounded-full bg-slate-800 animate-pulse" />
            ) : session ? (
              /* User Profile Dropdown */
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 p-1.5 rounded-full hover:bg-slate-800 border border-slate-700/60 transition-all focus:outline-none"
                >
                  <img
                    src={session.user?.image || "https://avatar.iran.liara.run/public"}
                    alt={session.user?.name || "User"}
                    className="w-8 h-8 rounded-full object-cover border border-indigo-500"
                  />
                  <span className="text-sm font-medium text-white pr-2">
                    {session.user?.name ? session.user.name.split(' ')[0] : 'User'}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl py-2 z-50 text-sm">
                    <div className="px-4 py-2 border-b border-slate-800">
                      <p className="text-white font-semibold truncate">{session.user?.name}</p>
                      <p className="text-xs text-slate-400 truncate">{session.user?.email}</p>
                    </div>

                    <a href="/profile" className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white">
                      <User className="w-4 h-4 text-indigo-400" /> My Profile
                    </a>
                    <a href="/items/manage" className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white">
                      <LayoutDashboard className="w-4 h-4 text-indigo-400" /> Dashboard
                    </a>

                    <div className="border-t border-slate-800 my-1"></div>

                    <button
                      onClick={handleSignOut}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Logged Out Buttons */
              <div className="flex items-center gap-3">
                <a
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </a>
                <a
                  href="/register"
                  className="px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all shadow-md shadow-indigo-600/20"
                >
                  Get Started
                </a>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <a href="/" className="block py-2 text-slate-300 hover:text-indigo-400 font-medium">
            Home
          </a>
          <a href="/explore" className="block py-2 text-slate-300 hover:text-indigo-400 font-medium">
            Explore Agents
          </a>
          
          {session && (
            <>
              <a href="/items/add" className="block py-2 text-slate-300 hover:text-indigo-400 font-medium">
                Add Agent
              </a>
              <a href="/items/manage" className="block py-2 text-slate-300 hover:text-indigo-400 font-medium">
                Manage Items
              </a>
            </>
          )}

          <a href="/about" className="block py-2 text-slate-300 hover:text-indigo-400 font-medium">
            About Us
          </a>

          <div className="border-t border-slate-800 pt-4">
            {isPending ? (
              <div className="h-10 bg-slate-800 rounded-xl animate-pulse" />
            ) : session ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={session.user?.image || "https://avatar.iran.liara.run/public"}
                    alt={session.user?.name || "User"}
                    className="w-10 h-10 rounded-full border border-indigo-500 object-cover"
                  />
                  <div>
                    <p className="text-white font-medium text-sm">{session.user?.name}</p>
                    <p className="text-xs text-slate-400">{session.user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full mt-2 py-2.5 text-center text-sm font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                <a
                  href="/login"
                  className="w-full text-center py-2.5 border border-slate-700 text-slate-200 rounded-xl font-semibold text-sm"
                >
                  Sign In
                </a>
                <a
                  href="/register"
                  className="w-full text-center py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm"
                >
                  Get Started
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}