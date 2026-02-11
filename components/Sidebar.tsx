
import React from 'react';
import { 
  Home, 
  Compass, 
  Library, 
  Clock, 
  Heart, 
  Film, 
  Mic2, 
  Cpu, 
  Layers,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { name: 'All', icon: Home },
    { name: 'Education', icon: Cpu },
    { name: 'Entertainment', icon: Film },
    { name: 'Music', icon: Mic2 },
    { name: 'Vlogs', icon: Compass },
    { name: 'AI Gen', icon: Sparkles },
  ];

  const menuItems = [
    { label: 'Pustaka', icon: Library },
    { label: 'Riwayat', icon: Clock },
    { label: 'Favorit', icon: Heart },
    { label: 'Koleksi', icon: Layers },
  ];

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col shrink-0 hidden md:flex">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">VidiGenius</span>
        </div>

        <nav className="space-y-6">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">Discover</p>
            <ul className="space-y-1">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <li key={cat.name}>
                    <button
                      onClick={() => onCategoryChange(cat.name)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeCategory === cat.name 
                          ? 'bg-blue-600/10 text-blue-400' 
                          : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {cat.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">Library</p>
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition-all">
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-gray-800">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-4 relative overflow-hidden group">
          <Sparkles className="absolute -right-2 -bottom-2 w-16 h-16 text-white/10 group-hover:scale-110 transition-transform" />
          <p className="text-xs font-bold text-blue-100 uppercase mb-1">Pro Feature</p>
          <p className="text-sm font-medium text-white mb-3">Gunakan Gemini Pro untuk analisis video 4K.</p>
          <button className="w-full bg-white text-blue-600 text-xs font-bold py-2 rounded-lg shadow-sm">
            Upgrade Sekarang
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
