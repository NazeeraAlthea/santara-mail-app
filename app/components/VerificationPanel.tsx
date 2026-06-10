import { FileText } from 'lucide-react';
import { useState } from 'react';

interface VerificationPanelProps {
  data: any;
  onReset: () => void;
}

export default function VerificationPanel({ data, onReset }: VerificationPanelProps) {
  // Use state to allow editing
  const [formData, setFormData] = useState({
    nomor_surat: data?.nomor_surat || 'Tanpa Nomor',
    tanggal_surat: data?.tanggal_surat || 'Tanpa Tanggal',
    perihal: data?.perihal || '',
    pengirim: data?.pengirim || '',
    ditujukan_kepada: data?.ditujukan_kepada || '',
    ringkasan: data?.ringkasan || '',
    draf_balasan: data?.draf_balasan || '',
    fileName: data?.fileName || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveToHistory = () => {
    const saved = localStorage.getItem('mailai_history');
    const history = saved ? JSON.parse(saved) : [];
    history.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem('mailai_history', JSON.stringify(history));
    alert('Data berhasil disimpan ke riwayat!');
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex-1">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Verifikasi Data Surat</h2>
          <p className="text-sm text-gray-500">Pastikan data di bawah ini sudah sesuai dengan isi surat asli</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-6">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide"># NOMOR SURAT</label>
          <input 
            type="text" 
            name="nomor_surat"
            value={formData.nomor_surat}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-800 font-medium" 
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">TANGGAL SURAT</label>
          <input 
            type="text" 
            name="tanggal_surat"
            value={formData.tanggal_surat}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-800 font-medium" 
          />
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">PERIHAL / SUBJEK</label>
          <input 
            type="text" 
            name="perihal"
            value={formData.perihal}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-800 font-medium" 
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">PENGIRIM</label>
          <input 
            type="text" 
            name="pengirim"
            value={formData.pengirim}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-800 font-medium" 
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">DITUJUKAN KEPADA</label>
          <input 
            type="text" 
            name="ditujukan_kepada"
            value={formData.ditujukan_kepada}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-800 font-medium" 
          />
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">RINGKASAN ISI</label>
          <textarea 
            name="ringkasan"
            value={formData.ringkasan}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-800 resize-none font-medium leading-relaxed" 
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
        <button 
          onClick={onReset}
          className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-xl transition-colors"
        >
          Batal
        </button>
        <button 
          onClick={handleSaveToHistory}
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center gap-2"
        >
          Simpan ke Riwayat
        </button>
      </div>
    </div>
  );
}
