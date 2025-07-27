import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CheckCircle,
  Info,
  AlertTriangle,
  XCircle,
  Search,
  Filter,
  Inbox,
  Mail,
  MailCheck,
  ChevronLeft,
  ChevronRight,
  X,
  CheckSquare,
  Trash2
} from "lucide-react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      message: "Pembayaran berhasil diproses",
      detail:
        "Transaksi #TRX-123 senilai Rp 500.000 telah berhasil diproses dan saldo terupdate.",
      time: "2 menit lalu",
      read: false,
    },
    {
      id: 2,
      type: "info",
      message: "Update sistem versi 1.2 telah dirilis",
      detail:
        "Sistem backend telah diperbarui ke versi 1.2 dengan perbaikan bug dan peningkatan keamanan.",
      time: "10 menit lalu",
      read: false,
    },
    {
      id: 3,
      type: "warning",
      message: "Slot langganan hampir penuh",
      detail:
        "Slot langganan anda telah mencapai 90%. Segera upgrade ke paket yang lebih tinggi.",
      time: "30 menit lalu",
      read: true,
    },
    {
      id: 4,
      type: "error",
      message: "Gagal memproses transaksi #TRX-123",
      detail:
        "Transaksi gagal karena saldo tidak mencukupi atau koneksi ke server pembayaran terputus.",
      time: "1 jam lalu",
      read: false,
    },
  ]);

  const [tab, setTab] = useState("Semua");
  const [page, setPage] = useState(1);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const perPage = 4;

  const totalUnread = notifications.filter((n) => !n.read).length;
  const totalRead = notifications.filter((n) => n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (tab === "Belum Dibaca") return !n.read;
    if (tab === "Sudah Dibaca") return n.read;
    return true;
  });

  const startIndex = (page - 1) * perPage;
  const paginatedNotifications = filteredNotifications.slice(
    startIndex,
    startIndex + perPage
  );
  const totalPages = Math.ceil(filteredNotifications.length / perPage);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    if (confirm("Yakin ingin menghapus semua notifikasi?")) {
      setNotifications([]);
      setSelectedNotification(null);
    }
  };

  const icons = {
    success: <CheckCircle className="text-green-400" size={24} />,
    info: <Info className="text-blue-400" size={24} />,
    warning: <AlertTriangle className="text-yellow-400" size={24} />,
    error: <XCircle className="text-red-400" size={24} />,
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Bell className="text-indigo-500" /> Notifikasi
        </h1>
        <div className="flex flex-wrap gap-2 justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 text-white"
          >
            <Filter size={18} /> Filter
          </motion.button>
          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              placeholder="Cari notifikasi..."
              className="pl-8 pr-3 py-2 rounded bg-gray-800 text-white border border-gray-700 w-full"
            />
            <Search
              size={18}
              className="absolute left-2 top-2.5 text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative p-5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow"
        >
          <div className="absolute right-4 top-4 opacity-30">
            <Inbox size={32} />
          </div>
          <p className="text-lg font-semibold">Belum Dibaca</p>
          <p className="text-3xl font-bold">{totalUnread}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative p-5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow"
        >
          <div className="absolute right-4 top-4 opacity-30">
            <MailCheck size={32} />
          </div>
          <p className="text-lg font-semibold">Sudah Dibaca</p>
          <p className="text-3xl font-bold">{totalRead}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative p-5 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow"
        >
          <div className="absolute right-4 top-4 opacity-30">
            <Mail size={32} />
          </div>
          <p className="text-lg font-semibold">Total Notifikasi</p>
          <p className="text-3xl font-bold">{notifications.length}</p>
        </motion.div>
      </div>

      {/* Tabs Filter & Tombol Aksi */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4">
          {["Semua", "Belum Dibaca", "Sudah Dibaca"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setPage(1);
              }}
              className={`px-4 py-2 rounded transition ${
                tab === t
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-3 py-2 rounded bg-green-600 hover:bg-green-700 text-white shadow"
          >
            <CheckSquare size={18} /> Tandai Semua Dibaca
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={clearAll}
            className="flex items-center gap-2 px-3 py-2 rounded bg-red-600 hover:bg-red-700 text-white shadow"
          >
            <Trash2 size={18} /> Hapus Semua
          </motion.button>
        </div>
      </div>

      {/* Daftar Notifikasi */}
      <div className="bg-gray-900 p-5 rounded-xl shadow overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Daftar Notifikasi</h2>
        <ul className="space-y-3">
          <AnimatePresence>
            {paginatedNotifications.map((n, index) => (
              <motion.li
                key={n.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center justify-between p-4 rounded-lg cursor-pointer transition overflow-hidden ${
                  n.read
                    ? "bg-gray-800 text-gray-400"
                    : "bg-gray-700 hover:bg-gray-600 text-white"
                }`}
                onClick={() => {
                  markAsRead(n.id);
                  setSelectedNotification(n);
                }}
              >
                <span className="absolute inset-0 opacity-0 hover:opacity-10 bg-indigo-400 transition" />
                <div className="flex items-center gap-3 relative z-10">
                  {icons[n.type]}
                  <div>
                    <p className="font-medium">{n.message}</p>
                    <span className="text-xs text-gray-400">{n.time}</span>
                  </div>
                </div>
                <AnimatePresence>
                  {!n.read && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="px-2 py-1 bg-indigo-500 text-xs rounded relative z-10"
                    >
                      Baru
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="p-2 rounded bg-gray-800 text-white disabled:opacity-30 hover:bg-gray-700 transition"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 rounded transition ${
                  page === p
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="p-2 rounded bg-gray-800 text-white disabled:opacity-30 hover:bg-gray-700 transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Modal Detail Notifikasi */}
      <AnimatePresence>
        {selectedNotification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setSelectedNotification(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  {icons[selectedNotification.type]}{" "}
                  {selectedNotification.message}
                </h3>
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="p-1 rounded hover:bg-gray-700 transition"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-gray-300 mb-4">{selectedNotification.detail}</p>
              <p className="text-sm text-gray-500">{selectedNotification.time}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}