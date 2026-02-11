
import React, { useState } from 'react';
import { X, Upload, Link, Info, FileVideo, Sparkles } from 'lucide-react';
import { Video } from '../types';

interface UploadModalProps {
  onClose: () => void;
  onUpload: (v: Video) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUpload }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('Education');
  const [tags, setTags] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    const newVideo: Video = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      url,
      thumbnail: `https://picsum.photos/seed/${Math.random()}/600/400`,
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      createdAt: Date.now()
    };

    onUpload(newVideo);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-gray-900 border border-gray-800 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between bg-gray-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center border border-blue-600/20">
              <FileVideo className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Tambah Video Baru</h2>
              <p className="text-xs text-gray-500">Video akan disimpan ke database lokal</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Judul Video</label>
            <input 
              required
              type="text" 
              placeholder="Masukkan judul yang menarik..."
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">URL Video (Direct MP4 / Youtube)</label>
            <div className="relative">
              <Link className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input 
                required
                type="url" 
                placeholder="Contoh: https://example.com/video.mp4"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Kategori</label>
              <select 
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Education</option>
                <option>Entertainment</option>
                <option>Music</option>
                <option>Vlogs</option>
                <option>AI Gen</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Tag (Pisahkan koma)</label>
              <input 
                type="text" 
                placeholder="ai, tech, react"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Deskripsi</label>
            <textarea 
              rows={3}
              placeholder="Berikan deskripsi singkat untuk dianalisis oleh Gemini..."
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="bg-blue-600/10 border border-blue-600/20 p-4 rounded-2xl flex gap-3">
            <Sparkles className="w-5 h-5 text-blue-500 shrink-0" />
            <p className="text-xs text-blue-300 leading-relaxed">
              <strong>Tip AI:</strong> Masukkan deskripsi yang jelas agar fitur Gemini bisa memberikan insight, bab, dan tag yang lebih akurat secara otomatis.
            </p>
          </div>

          <div className="pt-2 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm font-bold transition-all"
            >
              Batal
            </button>
            <button 
              type="submit"
              className="flex-[2] px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20"
            >
              Simpan Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
