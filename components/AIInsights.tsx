
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  Loader2, 
  ChevronDown, 
  Send,
  Hash,
  BookOpen,
  PieChart
} from 'lucide-react';
import { Video, AIAnalysis } from '../types';
import { analyzeVideoContent, chatWithVideo } from '../services/geminiService';

interface AIInsightsProps {
  video: Video;
}

const AIInsights: React.FC<AIInsightsProps> = ({ video }) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<'insights' | 'chat'>('insights');
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      try {
        const result = await analyzeVideoContent(video.title, video.description);
        setAnalysis(result);
      } catch (error) {
        console.error("AI Analysis failed", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalysis();
    setChatHistory([]); // Reset chat when video changes
  }, [video]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = { role: 'user' as const, text: query };
    setChatHistory(prev => [...prev, userMessage]);
    setQuery('');
    setIsTyping(true);

    try {
      const response = await chatWithVideo(query, JSON.stringify(video), chatHistory);
      setChatHistory(prev => [...prev, { role: 'model' as const, text: response || 'Sorry, I couldn\'t answer that.' }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'model' as const, text: "Gagal menghubungkan ke AI Gemini. Periksa API Key." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl flex flex-col h-[600px] overflow-hidden backdrop-blur-sm">
      <div className="flex border-b border-gray-800 shrink-0">
        <button 
          onClick={() => setActiveTab('insights')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${activeTab === 'insights' ? 'text-blue-400 bg-blue-400/5 border-b-2 border-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
        >
          <Sparkles className="w-4 h-4" />
          Insight AI
        </button>
        <button 
          onClick={() => setActiveTab('chat')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${activeTab === 'chat' ? 'text-blue-400 bg-blue-400/5 border-b-2 border-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
        >
          <MessageSquare className="w-4 h-4" />
          Tanya AI
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
        {activeTab === 'insights' ? (
          loading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-500">
              <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
              <div className="text-center">
                <p className="text-sm font-medium text-gray-300">Menganalisis konten...</p>
                <p className="text-xs text-gray-500 mt-1">Menggunakan model Gemini Flash</p>
              </div>
            </div>
          ) : analysis ? (
            <div className="space-y-6 animate-in fade-in duration-500">
              <section>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <BookOpen className="w-3 h-3" /> Ringkasan Pintar
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed bg-gray-800/50 p-3 rounded-xl border border-gray-700/50">
                  {analysis.summary}
                </p>
              </section>

              <section>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Hash className="w-3 h-3" /> Tag Rekomendasi
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.suggestedTags.map(tag => (
                    <span key={tag} className="text-[10px] bg-blue-600/10 text-blue-400 px-2 py-1 rounded-md border border-blue-600/20 font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <ChevronDown className="w-3 h-3" /> Timestamp / Bab
                </h4>
                <div className="space-y-2">
                  {analysis.potentialChapters.map((chapter, i) => (
                    <div key={i} className="text-sm text-gray-400 flex items-start gap-3 bg-gray-800/30 p-2 rounded-lg border border-gray-700/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                      {chapter}
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <PieChart className="w-3 h-3" /> Sentimen Konten
                </h4>
                <div className="flex items-center gap-3 bg-gradient-to-r from-gray-800 to-gray-800/0 p-3 rounded-xl">
                   <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/20">
                    {analysis.sentiment}
                   </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Sparkles className="w-12 h-12 mb-2 opacity-20" />
              <p className="text-sm">Gagal memuat analisis.</p>
            </div>
          )
        ) : (
          <div className="h-full flex flex-col">
            <div className="flex-1 space-y-4 mb-4">
              {chatHistory.length === 0 && (
                <div className="text-center text-gray-500 mt-10 space-y-2">
                  <MessageSquare className="w-10 h-10 mx-auto opacity-20" />
                  <p className="text-sm">Tanyakan apa saja tentang video ini.</p>
                  <p className="text-xs opacity-60">"Apa poin utama video ini?"</p>
                </div>
              )}
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-600/10' 
                      : 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-gray-400 px-4 py-2 rounded-2xl rounded-tl-none text-xs flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-75">.</span>
                    <span className="animate-bounce delay-150">.</span>
                  </div>
                </div>
              )}
            </div>
            
            <form onSubmit={handleSendMessage} className="mt-auto shrink-0 relative">
              <input 
                type="text" 
                placeholder="Tulis pesan..."
                className="w-full bg-gray-800/80 border border-gray-700 rounded-xl pl-4 pr-12 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button 
                type="submit"
                disabled={!query.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-lg"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
