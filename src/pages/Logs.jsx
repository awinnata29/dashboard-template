import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bug,
  Server,
  Trash2,
  Search,
  Download,
  Play,
  Pause,
  AlertTriangle,
  Info,
} from "lucide-react";

export default function Logs() {
  const [tab, setTab] = useState("error");
  const [search, setSearch] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);
  const [liveTail, setLiveTail] = useState(false);
  const [levelFilter, setLevelFilter] = useState("all");

  const [logs, setLogs] = useState({
    error: [
      { id: 1, message: "Error 500 - Internal Server Error", time: "2025-07-20 12:00", level: "error" },
      { id: 2, message: "Warning: Memory usage high", time: "2025-07-20 12:10", level: "warning" },
    ],
    server: [
      { id: 1, message: "Server started on port 3000", time: "2025-07-20 10:00", level: "info" },
      { id: 2, message: "Database connected successfully", time: "2025-07-20 10:05", level: "info" },
    ],
  });

  // Mode Live Tail (dummy generator)
  useEffect(() => {
    let interval;
    if (liveTail) {
      interval = setInterval(() => {
        const levels = ["info", "warning", "error"];
        const randomLevel = levels[Math.floor(Math.random() * levels.length)];
        const newLog = {
          id: Date.now(),
          message:
            randomLevel === "error"
              ? `Error dummy ${Math.floor(Math.random() * 100)}`
              : randomLevel === "warning"
              ? `Warning dummy ${Math.floor(Math.random() * 100)}`
              : `Info dummy ${Math.floor(Math.random() * 100)}`,
          time: new Date().toLocaleTimeString(),
          level: randomLevel,
        };
        setLogs((prev) => ({
          ...prev,
          [tab]: [newLog, ...prev[tab]].slice(0, 50),
        }));
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [liveTail, tab]);

  const clearLogs = () => {
    setLogs({ ...logs, [tab]: [] });
    setConfirmClear(false);
  };

  const filteredLogs = logs[tab].filter(
    (log) =>
      log.message.toLowerCase().includes(search.toLowerCase()) &&
      (levelFilter === "all" || log.level === levelFilter)
  );

  const downloadLogs = (format) => {
    const data = logs[tab];
    let content;
    let fileName = `${tab}-logs.${format}`;

    if (format === "csv") {
      const headers = "Message,Time,Level\n";
      const rows = data.map((log) => `"${log.message}","${log.time}","${log.level}"`).join("\n");
      content = headers + rows;
    } else {
      content = JSON.stringify(data, null, 2);
    }

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "error":
        return "bg-red-600";
      case "warning":
        return "bg-yellow-500 text-black";
      default:
        return "bg-green-500";
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case "error":
        return <Bug size={16} />;
      case "warning":
        return <AlertTriangle size={16} />;
      default:
        return <Info size={16} />;
    }
  };

  return (
    <div className="space-y-10 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold flex items-center gap-2"
      >
        <Server className="text-indigo-500" /> Logs
      </motion.h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setTab("error")}
          className={`px-4 py-2 rounded ${
            tab === "error" ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-400"
          }`}
        >
          <Bug size={16} className="inline mr-2" /> Error Logs
        </button>
        <button
          onClick={() => setTab("server")}
          className={`px-4 py-2 rounded ${
            tab === "server" ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-400"
          }`}
        >
          <Server size={16} className="inline mr-2" /> Server Logs
        </button>
      </div>

      {/* Search & Actions */}
      <div className="flex flex-wrap justify-between gap-4">
        <div className="relative flex-1 min-w-[180px] sm:max-w-xs">
          <input
            type="text"
            placeholder="Cari log..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-2 rounded bg-gray-800 text-white border border-gray-700 w-full"
          />
          <Search size={18} className="absolute left-2 top-2.5 text-gray-400" />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
          >
            <option value="all">Semua Level</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
          <button
            onClick={() => setLiveTail(!liveTail)}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              liveTail ? "bg-green-600 hover:bg-green-700" : "bg-gray-700 hover:bg-gray-600"
            } text-white`}
          >
            {liveTail ? <Pause size={16} /> : <Play size={16} />}
            {liveTail ? "Stop Tail" : "Live Tail"}
          </button>
          <button
            onClick={() => downloadLogs("csv")}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white"
          >
            <Download size={16} /> CSV
          </button>
          <button
            onClick={() => downloadLogs("json")}
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

      {/* Log List */}
      <div className="bg-gray-900 p-6 rounded-xl shadow border border-gray-700">
        {filteredLogs.length > 0 ? (
          <ul className="space-y-3">
            <AnimatePresence>
              {filteredLogs.map((log, index) => (
                <motion.li
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded bg-gray-800 hover:bg-gray-700 transition flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${getLevelColor(
                        log.level
                      )}`}
                    >
                      {getLevelIcon(log.level)} {log.level.toUpperCase()}
                    </span>
                    <div>
                      <p className="font-medium">{log.message}</p>
                      <span className="text-xs text-gray-400">{log.time}</span>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          <p className="text-gray-400">Tidak ada log untuk ditampilkan.</p>
        )}
      </div>

      {/* Modal Konfirmasi Hapus Semua */}
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
              <h3 className="text-xl font-semibold">Mau bersihin semua jejak? 🚀</h3>
              <p className="text-gray-400">
                Semua log di tab <span className="font-medium">{tab}</span> akan hilang.
              </p>
              <p className="text-sm text-gray-500">Jangan khawatir, server kita tetap kuat 💪</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setConfirmClear(false)} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
                  Batal
                </button>
                <button onClick={clearLogs} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">
                  Ya, Hapus!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}