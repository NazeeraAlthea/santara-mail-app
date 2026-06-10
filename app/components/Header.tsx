import { Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between py-4 px-8 bg-[#F8F9FB]">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Cari nomor atau perihal..."
          className="w-full pl-10 pr-4 py-2 bg-white rounded-full text-sm outline-none border border-transparent focus:border-gray-200 shadow-sm text-gray-700 placeholder-gray-400 transition-all"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-800">Admin Kantor</div>
          <div className="text-xs text-gray-500">Super Admin</div>
        </div>
        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm border border-indigo-200">
          AK
        </div>
      </div>
    </header>
  );
}
