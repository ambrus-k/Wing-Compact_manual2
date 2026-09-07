import React, { useState } from 'react';
import { Mic2, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MICROPHONES_DATA } from '../data/microphonesData';
import { Microphone } from '../types';

const getBrand = (name: string) => {
  if (name.startsWith('sE Electronics')) return 'sE Electronics';
  if (name.startsWith('Electro-Voice')) return 'Electro-Voice';
  if (name.startsWith('Audio-Technica')) return 'Audio-Technica';
  return name.split(' ')[0];
};

export const MicrophonesLocker: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedBrands, setExpandedBrands] = useState<Record<string, boolean>>({});

  const filteredMics = MICROPHONES_DATA.filter(mic => 
    mic.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    mic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mic.application.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedMics = filteredMics.reduce((acc, mic) => {
    const brand = getBrand(mic.name);
    if (!acc[brand]) acc[brand] = [];
    acc[brand].push(mic);
    return acc;
  }, {} as Record<string, Microphone[]>);

  const brands = Object.keys(groupedMics).sort();

  const toggleBrand = (brand: string) => {
    setExpandedBrands(prev => ({
      ...prev,
      [brand]: !prev[brand]
    }));
  };

  const toggleAll = (expand: boolean) => {
    const next: Record<string, boolean> = {};
    brands.forEach(b => next[b] = expand);
    setExpandedBrands(next);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Mic2 className="w-6 h-6 text-emerald-400" />
            Přehled průmyslových mikrofonů
            <span className="text-sm font-mono bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full ml-2">
              {MICROPHONES_DATA.length} modelů
            </span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Katalog standardních mikrofonů roztříděný podle výrobců
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Hledat mikrofon nebo použití..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121212] border border-white/10 text-white rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-[#1a1a1a] transition-all"
          />
        </div>
      </div>

      {brands.length > 0 && (
        <div className="flex justify-end gap-3 mb-2">
          <button onClick={() => toggleAll(true)} className="text-xs text-gray-400 hover:text-white transition-colors">
            Rozbalit vše
          </button>
          <button onClick={() => toggleAll(false)} className="text-xs text-gray-400 hover:text-white transition-colors">
            Sbalit vše
          </button>
        </div>
      )}

      <div className="space-y-4">
        {brands.map(brand => {
          const isExpanded = expandedBrands[brand] || false;
          return (
            <div key={brand} className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleBrand(brand)}
                className="w-full px-6 py-4 flex items-center justify-between bg-black/40 hover:bg-black/60 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-white">{brand}</h3>
                  <span className="text-xs font-mono bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">
                    {groupedMics[brand].length}
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 border-t border-white/5 bg-black/20">
                      {groupedMics[brand].map(mic => (
                        <div key={mic.id} className="bg-[#1a1a1a] border border-white/5 rounded-xl overflow-hidden flex flex-row group hover:border-emerald-500/30 transition-all shadow-md hover:shadow-emerald-900/10 h-32">
                          <div className="w-32 bg-black/50 p-2 flex items-center justify-center shrink-0 border-r border-white/5 relative">
                            <img 
                              src={mic.imageUrl} 
                              alt={mic.name} 
                              className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-300"
                              crossOrigin="anonymous"
                              onError={(e) => {
                                // Fallback image if broken or not found
                                (e.target as HTMLImageElement).src = '/mics/universal-mic.svg';
                              }}
                            />
                          </div>
                          <div className="p-4 flex-1 flex flex-col justify-center min-w-0">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="text-base font-bold text-white truncate mr-2" title={mic.name}>{mic.name}</h4>
                              <span className="shrink-0 px-1.5 py-0.5 bg-black/60 border border-white/10 rounded text-[9px] font-mono font-medium text-emerald-400 uppercase tracking-wider">
                                {mic.type.split(' ')[0]}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <Filter className="w-3 h-3 text-emerald-500 shrink-0" />
                              <p className="text-xs font-medium text-gray-300 truncate">{mic.application}</p>
                            </div>
                            <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed" title={mic.description}>
                              {mic.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {brands.length === 0 && (
          <div className="col-span-full py-12 text-center bg-[#121212] border border-white/10 rounded-2xl text-white/40">
            <Mic2 className="w-8 h-8 mx-auto mb-3 opacity-20" />
            <p>Žádný mikrofon neodpovídá vašemu hledání.</p>
          </div>
        )}
      </div>
    </div>
  );
};
