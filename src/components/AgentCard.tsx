import React from 'react';
import { Star, ArrowRight, Tag } from 'lucide-react';

export interface AgentItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  rating: number;
  createdAt: string;
}

interface AgentCardProps {
  item: AgentItem;
}

export default function AgentCard({ item }: AgentCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all flex flex-col justify-between h-full group shadow-lg">
      <div>
        {/* Card Image */}
        <div className="relative h-44 w-full overflow-hidden bg-slate-950">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md border border-slate-700 text-indigo-400 text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 font-medium">
            <Tag className="w-3 h-3" />
            {item.category}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{item.rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-slate-500">{item.createdAt}</span>
          </div>

          <h3 className="text-base font-bold text-white mb-2 line-clamp-1 group-hover:text-indigo-400 transition-colors">
            {item.title}
          </h3>

          <p className="text-slate-400 text-xs line-clamp-2 mb-4 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Card Footer Meta Info */}
      <div className="p-5 pt-0 border-t border-slate-800/60 mt-auto flex items-center justify-between pt-4">
        <div>
          <span className="text-[10px] text-slate-500 block uppercase font-medium">Price</span>
          <span className="text-indigo-400 font-extrabold text-lg">${item.price}/mo</span>
        </div>

        <a
          href={`/items/${item.id}`}
          className="px-3.5 py-2 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/20 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

{/* Skeleton Loader Component */}
export function AgentCardSkeleton() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden h-[360px] animate-pulse flex flex-col justify-between">
      <div>
        <div className="h-44 bg-slate-800/60 w-full" />
        <div className="p-5 space-y-3">
          <div className="h-3 bg-slate-800/80 rounded w-1/3" />
          <div className="h-5 bg-slate-800/80 rounded w-3/4" />
          <div className="h-3 bg-slate-800/60 rounded w-full" />
          <div className="h-3 bg-slate-800/60 rounded w-2/3" />
        </div>
      </div>
      <div className="p-5 pt-0 flex justify-between items-center">
        <div className="h-6 bg-slate-800/80 rounded w-16" />
        <div className="h-8 bg-slate-800/80 rounded w-24" />
      </div>
    </div>
  );
}