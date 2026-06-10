import { useState } from 'react';
import { Download, Table as TableIcon, Save } from 'lucide-react';
import * as XLSX from 'xlsx';

interface ExtractedItem {
  nomor_surat: string;
  tanggal_surat: string;
  perihal: string;
  pengirim: string;
  ditujukan_kepada: string;
  ringkasan: string;
  draf_balasan: string;
  fileName?: string;
  timestamp?: string;
}

interface BulkValidationTableProps {
  initialData: ExtractedItem[];
}

export default function BulkValidationTable({ initialData }: BulkValidationTableProps) {
  const [data, setData] = useState<ExtractedItem[]>(initialData);

  const handleCellChange = (index: number, field: keyof ExtractedItem, value: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    setData(newData);
  };

  const handleSaveToHistory = () => {
    const saved = localStorage.getItem('mailai_history');
    const history = saved ? JSON.parse(saved) : [];
    
    const newEntries = data.map(item => ({
      ...item,
      timestamp: item.timestamp || new Date().toISOString()
    }));
    
    const newHistory = [...history, ...newEntries];
    localStorage.setItem('mailai_history', JSON.stringify(newHistory));
    alert(`${newEntries.length} surat berhasil disimpan ke riwayat!`);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data.map(item => ({
      'Nama File': item.fileName || '-',
      'Nomor Surat': item.nomor_surat,
      'Tanggal Surat': item.tanggal_surat,
      'Perihal': item.perihal,
      'Pengirim': item.pengirim,
      'Ditujukan Kepada': item.ditujukan_kepada,
      'Ringkasan': item.ringkasan,
      'Draf Balasan': item.draf_balasan
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rekap Surat");
    XLSX.writeFile(wb, "Rekap_Surat_Masuk.xlsx");
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex-1 flex flex-col h-[calc(100vh-200px)] overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <TableIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Verifikasi Massal ({data.length} Surat)</h2>
            <p className="text-sm text-gray-500">Edit langsung pada tabel di bawah ini jika terdapat kesalahan</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSaveToHistory}
            className="px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium rounded-xl transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Simpan ke Riwayat
          </button>
          <button 
            onClick={exportToExcel}
            className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-green-200 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Ekspor ke Excel (XLSX)
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-0">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 sticky top-0 shadow-sm z-10">
            <tr>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-[150px]">File</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-[150px]">Nomor Surat</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-[150px]">Tanggal</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-[200px]">Perihal</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-[200px]">Pengirim</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-[300px]">Ringkasan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-indigo-50/30 transition-colors">
                <td className="p-3">
                  <div className="text-xs text-gray-500 truncate max-w-[150px]" title={row.fileName}>{row.fileName || '-'}</div>
                </td>
                <td className="p-2">
                  <input 
                    type="text" 
                    value={row.nomor_surat || ''} 
                    onChange={(e) => handleCellChange(index, 'nomor_surat', e.target.value)}
                    className="w-full p-2 text-sm bg-transparent border border-transparent hover:border-gray-200 focus:border-indigo-500 focus:bg-white rounded outline-none transition-all"
                  />
                </td>
                <td className="p-2">
                  <input 
                    type="text" 
                    value={row.tanggal_surat || ''} 
                    onChange={(e) => handleCellChange(index, 'tanggal_surat', e.target.value)}
                    className="w-full p-2 text-sm bg-transparent border border-transparent hover:border-gray-200 focus:border-indigo-500 focus:bg-white rounded outline-none transition-all"
                  />
                </td>
                <td className="p-2">
                  <input 
                    type="text" 
                    value={row.perihal || ''} 
                    onChange={(e) => handleCellChange(index, 'perihal', e.target.value)}
                    className="w-full p-2 text-sm bg-transparent border border-transparent hover:border-gray-200 focus:border-indigo-500 focus:bg-white rounded outline-none transition-all"
                  />
                </td>
                <td className="p-2">
                  <input 
                    type="text" 
                    value={row.pengirim || ''} 
                    onChange={(e) => handleCellChange(index, 'pengirim', e.target.value)}
                    className="w-full p-2 text-sm bg-transparent border border-transparent hover:border-gray-200 focus:border-indigo-500 focus:bg-white rounded outline-none transition-all"
                  />
                </td>
                <td className="p-2">
                  <textarea 
                    value={row.ringkasan || ''} 
                    onChange={(e) => handleCellChange(index, 'ringkasan', e.target.value)}
                    rows={2}
                    className="w-full p-2 text-sm bg-transparent border border-transparent hover:border-gray-200 focus:border-indigo-500 focus:bg-white rounded outline-none resize-none transition-all"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
