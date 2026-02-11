
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plus, 
  LayoutGrid, 
  List, 
  Search, 
  Play, 
  Trash2, 
  Sparkles, 
  Info,
  History,
  FolderVideo,
  Settings,
  ChevronRight,
  MonitorPlay
} from 'lucide-react';
import { Video, ViewMode } from './types';
import Sidebar from './components/Sidebar';
import VideoGrid from './components/VideoGrid';
import VideoPlayer from './components/VideoPlayer';
import UploadModal from './components/UploadModal';
import AIInsights from './components/AIInsights';

const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeCategory, setActiveCategory] = useState('All');

  // Load from "database" (localStorage)
  useEffect(() => {
    const storedVideos = localStorage.getItem('vidi_genius_db');
    if (storedVideos) {
      setVideos(JSON.parse(storedVideos));
    } else {
      // Seed initial data
      const initialVideos: Video[] = [
        {
          id: '1',
          title: 'Explaining the Gemini 3 Pro API',
          description: 'A deep dive into the latest multimodal features from Google Generative AI.',
          url: 'https://www.w3schools.com/html/mov_bbb.mp4',
          thumbnail: 'https://picsum.photos/seed/ai/600/400',
          category: 'Education',
          tags: ['AI', 'Tech', 'Gemini'],
          createdAt: Date.now()
        },
        {
          id: '2',
          title: 'Lofi Hip Hop Mix for Coding',
          description: 'Relaxing beats to stay focused and productive while developing apps.',
          url: 'https://www.w3schools.com/html/movie.mp4',
          thumbnail: 'https://picsum.photos/seed/music/600/400',
          category: 'Music',
          tags: ['Lofi', 'Focus', 'Productivity'],
          createdAt: Date.now() - 3600000
        }
      ];
      setVideos(initialVideos);
      localStorage.setItem('vidi_genius_db', JSON.stringify(initialVideos));
    }
  }, []);

  const saveToDb = (newVideos: Video[]) => {
    setVideos(newVideos);
    localStorage.setItem('vidi_genius_db', JSON.stringify(newVideos));
  };

  const handleAddVideo = (newVideo: Video) => {
    saveToDb([newVideo, ...videos]);
    setIsUploadModalOpen(false);
  };

  const handleDeleteVideo = (id: string) => {
    if (confirm('Yakin ingin menghapus video ini?')) {
      const filtered = videos.filter(v => v.id !== id);
      saveToDb(filtered);
      if (selectedVideo?.id === id) setSelectedVideo(null);
    }
  };

  const filteredVideos = videos.filter(v => {
    const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || v.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-gray-900/50 backdrop-blur-md border-b border-gray-800 shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors w-4 h-4" />
              <input 
                type="text" 
                placeholder="Cari video atau tag..."
                className="w-full bg-gray-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-800 rounded-lg p-1 mr-2">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-gray-700 text-blue-400' : 'text-gray-400 hover:text-white'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-gray-700 text-blue-400' : 'text-gray-400 hover:text-white'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-900/20"
            >
              <Plus className="w-4 h-4" />
              Tambah Video
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedVideo ? (
            <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex-1 space-y-4">
                <VideoPlayer 
                  video={selectedVideo} 
                  onClose={() => setSelectedVideo(null)} 
                />
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold">{selectedVideo.title}</h1>
                    <p className="text-gray-400 mt-1">{selectedVideo.description}</p>
                    <div className="flex gap-2 mt-3">
                      {selectedVideo.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300">#{tag}</span>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteVideo(selectedVideo.id)}
                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="w-full lg:w-96">
                <AIInsights video={selectedVideo} />
              </div>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  Halo, Selamat Datang di VidiGenius
                </h2>
                <p className="text-gray-400 mt-2">Atur dan analisis koleksi video Anda dengan kekuatan AI Gemini.</p>
              </div>

              {filteredVideos.length > 0 ? (
                <VideoGrid 
                  videos={filteredVideos} 
                  viewMode={viewMode}
                  onSelect={setSelectedVideo}
                  onDelete={handleDeleteVideo}
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                  <MonitorPlay className="w-16 h-16 mb-4 opacity-20" />
                  <p className="text-lg">Belum ada video yang ditemukan.</p>
                  <button 
                    onClick={() => setIsUploadModalOpen(true)}
                    className="mt-4 text-blue-400 hover:underline"
                  >
                    Mulai dengan menambahkan video baru
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {isUploadModalOpen && (
        <UploadModal 
          onClose={() => setIsUploadModalOpen(false)} 
          onUpload={handleAddVideo} 
        />
      )}
    </div>
  );
};

export default App;
