import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Trash2, Search, User, Download, Plus, X } from "lucide-react";

export default function UserFeedback() {
  const [feedback, setFeedback] = useState([
    { id: 1, user: "Awin Nata", rating: 5, comment: "Aplikasi sangat membantu!", date: "2025-07-20" },
    { id: 2, user: "Rina Oktavia", rating: 4, comment: "UI keren dan responsif", date: "2025-07-21" },
    { id: 3, user: "Budi Pratama", rating: 3, comment: "Butuh perbaikan fitur integrasi", date: "2025-07-22" },
    { id: 4, user: "Doni Saputra", rating: 2, comment: "Sering error di halaman transaksi", date: "2025-07-22" },
  ]);

  const [ratingFilter, setRatingFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFeedback, setNewFeedback] = useState({ user: "", rating: 5, comment: "" });

  const filteredFeedback = feedback.filter(
    (f) =>
      (ratingFilter === "all" || f.rating === parseInt(ratingFilter)) &&
      f.comment.toLowerCase().includes(search.toLowerCase())
  );

  const clearFeedback = () => {
    setFeedback([]);
    setConfirmClear(false);
  };

  const renderStars = (count) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < count ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}
        />
      ))}
    </div>
  );

  const exportFeedback = (format) => {
    let content;
    let fileName = `user-feedback.${format}`;

    if (format === "csv") {
      const headers = "User,Rating,Comment,Date\n";
      const rows = feedback
        .map((f) => `"${f.user}",${f.rating},"${f.comment}","${f.date}"`)
        .join("\n");
      content = headers + rows;
    } else {
      content = JSON.stringify(feedback, null, 2);
    }

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  const addFeedback = () => {
    if (!newFeedback.user || !newFeedback.comment) return alert("Isi nama dan komentar!");
    const newItem = {
      id: Date.now(),
      user: newFeedback.user,
      rating: parseInt(newFeedback.rating),
      comment: newFeedback.comment,
      date: new Date().toISOString().split("T")[0],
    };
    setFeedback([newItem, ...feedback]);
    setNewFeedback({ user: "", rating: 5, comment: "" });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-10 px-4">
      <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-3xl font-bold flex items-center gap-2">
        <User className="text-indigo-500" /> Feedback Pengguna
      </motion.h1>

      {/* Tombol Tambah Feedback */}
      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
        >
          <Plus size={18} /> Tambah Feedback
        </motion.button>
      </div>

      {/* Filter & Pencarian */}
      <div className="flex flex-wrap justify-between gap-4">
        <div className="relative flex-1 min-w-[200px] sm:max-w-xs">
          <input
            type="text"
            placeholder="Cari komentar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-2 rounded bg-gray-800 text-white border border-gray-700 w-full"
          />
          <Search size={18} className="absolute left-2 top-2.5 text-gray-400" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
          >
            <option value="all">Semua Rating</option>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{`${r} Bintang`}</option>
            ))}
          </select>
          <button
            onClick={() => exportFeedback("csv")}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white"
          >
            <Download size={16} /> CSV
          </button>
          <button
            onClick={() => exportFeedback("json")}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white"
          >
            <Download size={16} /> JSON
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setConfirmClear(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
          >
            <Trash2 size={18} /> Hapus Semua
          </motion.button>
        </div>
      </div>

      {/* Daftar Feedback */}
      <div className="bg-gray-900 p-6 rounded-xl shadow border border-gray-700">
        {filteredFeedback.length > 0 ? (
          <ul className="space-y-3">
            <AnimatePresence>
              {filteredFeedback.map((f, index) => (
                <motion.li
                  key={f.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded bg-gray-800 hover:bg-gray-700 transition border border-gray-700"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{f.user}</p>
                      <span className="text-xs text-gray-400">{f.date}</span>
                    </div>
                    {renderStars(f.rating)}
                  </div>
                  <p className="mt-2 text-gray-300">{f.comment}</p>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          <p className="text-gray-400">Tidak ada feedback yang cocok.</p>
        )}
      </div>

      {/* Modal Tambah Feedback */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-xl space-y-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Tambah Feedback</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded hover:bg-gray-700 transition"
                >
                  <X size={20} />
                </button>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Nama</label>
                <input
                  type="text"
                  value={newFeedback.user}
                  onChange={(e) => setNewFeedback({ ...newFeedback, user: e.target.value })}
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Rating</label>
                <select
                  value={newFeedback.rating}
                  onChange={(e) => setNewFeedback({ ...newFeedback, rating: e.target.value })}
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>{`${r} Bintang`}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Komentar</label>
                <textarea
                  value={newFeedback.comment}
                  onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
                />
              </div>
              <button
                onClick={addFeedback}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition"
              >
                <Plus size={16} /> Tambah Feedback
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Konfirmasi Hapus Semua */}
      <AnimatePresence>
        {confirmClear && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setConfirmClear(false)}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-xl text-center space-y-4">
              <h3 className="text-xl font-semibold">Hapus semua feedback? 🗑️</h3>
              <p className="text-gray-400">Tindakan ini akan menghapus semua feedback yang ada.</p>
              <p className="text-sm text-gray-500">Tenang, kamu masih bisa menerima feedback baru kok 😉</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setConfirmClear(false)} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Batal</button>
                <button onClick={clearFeedback} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">Ya, Hapus!</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}