import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  List,
  Trash2,
  Filter,
  Search,
  Clock,
  User,
  Settings,
  LogIn,
  AlertTriangle,
} from "lucide-react";

export default function ActivityLog() {
  const [logs, setLogs] = useState([
    { id: 1, user: "Awin Nata", action: "Login berhasil", category: "Auth", time: "2025-07-20 10:00" },
    { id: 2, user: "Rina Oktavia", action: "Mengubah pengaturan sistem", category: "Settings", time: "2025-07-20 10:30" },
    { id: 3, user: "Budi Pratama", action: "Gagal login (password salah)", category: "Auth", time: "2025-07-20 11:00" },
    { id: 4, user: "Tono Saputra", action: "Menghapus data produk", category: "Data", time: "2025-07-21 09:00" },
    { id: 5, user: "Awin Nata", action: "Menambahkan user baru", category: "User", time: "2025-07-22 12:15" },
  ]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [confirmClear, setConfirmClear] = useState(false);

  const filteredLogs = logs.filter(
    (log) =>
      log.action.toLowerCase().includes(search.toLowerCase()) &&
      (category ? log.category === category : true)
  );

  const startIndex = (page - 1) * perPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + perPage);
  const totalPages = Math.ceil(filteredLogs.length / perPage);

  const clearLogs = () => {
    setLogs([]);
    setConfirmClear(false);
  };

  const categoryIcons = {
    Auth: <LogIn className="text-blue-400" size={20} />,
    Settings: <Settings className="text-yellow-400" size={20} />,
    User: <User className="text-green-400" size={20} />,
    Data: <AlertTriangle className="text-red-400" size={20} />,
  };

  return (
    <div className="space-y-10">
      <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-3xl font-bold flex items-center gap-2">
        <List className="text-indigo-500" /> Log Aktivitas
      </motion.h1>

      {/* Filter dan Pencarian */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Cari aktivitas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-2 rounded bg-gray-800 text-white border border-gray-700 w-full"
          />
          <Search size={18} className="absolute left-2 top-2.5 text-gray-400" />
        </div>
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
        >
          <option value="">Semua Kategori</option>
          {[...new Set(logs.map((l) => l.category))].map((c, idx) => (
            <option key={idx} value={c}>{c}</option>
          ))}
        </select>
        <motion.button whileHover={{ scale: 1.05 }} onClick={() => setConfirmClear(true)} className="flex items-center gap-2 px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white shadow">
          <Trash2 size={18} /> Hapus Semua
        </motion.button>
      </div>

      {/* List Log */}
      <div className="bg-gray-900 p-5 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Riwayat Aktivitas</h2>
        <ul className="space-y-3">
          <AnimatePresence>
            {paginatedLogs.map((log, index) => (
              <motion.li
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
              >
                <div className="flex items-center gap-3">
                  {categoryIcons[log.category] || <Clock size={20} className="text-gray-400" />}
                  <div>
                    <p className="font-medium">{log.action}</p>
                    <span className="text-xs text-gray-400">{log.user} - {log.time}</span>
                  </div>
                </div>
                <span className="px-2 py-1 bg-indigo-500 text-xs rounded">{log.category}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 rounded transition ${
                  page === p ? "bg-indigo-500 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal Konfirmasi Clear Logs */}
      <AnimatePresence>
        {confirmClear && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setConfirmClear(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-xl text-center space-y-4"
            >
              <h3 className="text-xl font-semibold">Yakin ingin menghapus semua log?</h3>
              <p className="text-gray-400">Aksi ini tidak dapat dibatalkan.</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setConfirmClear(false)} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Batal</button>
                <button onClick={clearLogs} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">Hapus Semua</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
