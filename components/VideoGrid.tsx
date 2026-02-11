
import React from 'react';
import { Play, MoreVertical, Trash2, Calendar, Tag } from 'lucide-react';
import { Video, ViewMode } from '../types';

interface VideoGridProps {
  videos: Video[];
  viewMode: ViewMode;
  onSelect: (v: Video) => void;
  onDelete: (id: string) => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, viewMode, onSelect, onDelete }) => {
  if (viewMode === 'list') {
    return (
      <div className="space-y-3">
        {videos.map((video) => (
          <div 
            key={video.id}
            className="group flex items-center gap-4 bg-gray-900/50 border border-gray-800 p-3 rounded-xl hover:bg-gray-800/50 hover:border-gray-700 transition-all cursor-pointer"
            onClick={() => onSelect(video)}
          >
            <div className="relative w-40 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-800">
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <Play className="w-5 h-5 fill-white text-white ml-1" />
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold truncate group-hover:text-blue-400 transition-colors">{video.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-1 mt-1">{video.description}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  {new Date(video.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-blue-400/70">
                  <Tag className="w-3 h-3" />
                  {video.category}
                </span>
              </div>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(video.id); }}
              className="p-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <div 
          key={video.id}
          className="group flex flex-col bg-gray-900/40 border border-gray-800 rounded-2xl overflow-hidden hover:bg-gray-800/40 hover:border-gray-700 transition-all cursor-pointer shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1"
          onClick={() => onSelect(video)}
        >
          <div className="relative aspect-video bg-gray-800 overflow-hidden">
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                <Play className="w-6 h-6 fill-white text-white ml-1" />
              </div>
            </div>
            <div className="absolute top-2 right-2 flex gap-1">
              <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-bold text-white uppercase tracking-wider">
                {video.category}
              </span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-100 line-clamp-1 group-hover:text-blue-400 transition-colors">{video.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2 mt-2 leading-relaxed">{video.description}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-[10px] text-gray-600 font-medium uppercase">{new Date(video.createdAt).toLocaleDateString()}</span>
              <div className="flex -space-x-1">
                {video.tags.slice(0, 3).map((tag, i) => (
                  <div key={i} className="w-5 h-5 rounded-full bg-gray-800 border-2 border-gray-900 flex items-center justify-center text-[8px] font-bold text-blue-400">
                    {tag.charAt(0).toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
