import { Search, Sparkles, MapPin } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative h-[65vh] min-h-[500px] w-full bg-slate-900 flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1920')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <span className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-blue-400" /> Powered by Agentic AI
        </span>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
          Plan Your Dream Trip in Seconds with <span className="text-blue-400">AI Intelligence</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Personalized itineraries, smart budget calculations, and real-time travel assistance tailored just for you.
        </p>

        {/* Quick Search / Interactive CTA */}
        <div className="bg-white p-2.5 rounded-2xl shadow-xl max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-2">
          <div className="flex items-center gap-2 px-3 w-full border-b md:border-b-0 md:border-r border-gray-200 py-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Where do you want to go?" 
              className="w-full text-gray-800 outline-none text-sm placeholder-gray-400"
            />
          </div>
          <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 shrink-0">
            <Search className="w-4 h-4" /> Search
          </button>
        </div>
      </div>
    </div>
  );
};