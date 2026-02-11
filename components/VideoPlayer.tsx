
import React from 'react';
import { X, Maximize, Settings, Volume2 } from 'lucide-react';
import { Video } from '../types';

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onClose }) => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-black aspect-video group shadow-2xl ring-1 ring-gray-800">
      <video 
        className="w-full h-full object-contain"
        controls
        autoPlay
        src={video.url}
      />
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
      >
        <X className="w-5 h-5" />
      </button>
      
      {/* Visual Overlay elements */}
      <div className="absolute top-4 left-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="px-3 py-1 bg-blue-600/80 backdrop-blur-sm rounded-lg text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          Sekarang Diputar
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
