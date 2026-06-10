import { Upload, Clock } from 'lucide-react';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-100 h-screen flex flex-col justify-between p-4 shrink-0">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 px-2 mt-2">
          <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white font-bold">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <span className="font-bold text-xl text-gray-800 tracking-tight">MailAI <span className="text-indigo-600">Reader</span></span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          <button 
            onClick={() => onNavigate('upload')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium transition-colors ${
              activePage !== 'history' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Upload className={`w-5 h-5 ${activePage !== 'history' ? 'text-indigo-500' : ''}`} />
            Unggah Baru
          </button>
          
          <button 
            onClick={() => onNavigate('history')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium transition-colors ${
              activePage === 'history' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Clock className={`w-5 h-5 ${activePage === 'history' ? 'text-indigo-500' : ''}`} />
            Riwayat Surat
          </button>
        </nav>
      </div>

      {/* Status Card */}
      <div className="bg-indigo-600 rounded-2xl p-4 text-white shadow-lg shadow-indigo-200">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-5 h-5 text-indigo-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          <span className="text-xs font-semibold text-indigo-200 tracking-wider">STATUS SISTEM</span>
        </div>
        <div className="font-semibold text-lg">AI Reader Siap</div>
      </div>
    </aside>
  );
}
