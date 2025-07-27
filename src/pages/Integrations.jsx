import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Key,
  Copy,
  Plus,
  Webhook,
  Link2,
  Trash2,
  X,
  Zap,
  Slack,
  Globe,
  Search,
} from "lucide-react";

export default function Integrations() {
  const [apiKeys, setApiKeys] = useState([
    { id: 1, key: "sk_live_123456789", created: "2025-07-01" },
  ]);
  const [webhooks, setWebhooks] = useState([
    { id: 1, url: "https://example.com/webhook", event: "order.created", active: true },
    { id: 2, url: "https://example.com/logs", event: "logs.updated", active: false },
  ]);
  const [integrations] = useState([
    { name: "Slack", icon: <Slack className="text-pink-500" size={32} /> },
    { name: "Zapier", icon: <Globe className="text-yellow-400" size={32} /> },
    { name: "Stripe", icon: <Zap className="text-purple-400" size={32} /> },
  ]);

  const [searchIntegration, setSearchIntegration] = useState("");
  const [showAddApiKey, setShowAddApiKey] = useState(false);
  const [showAddWebhook, setShowAddWebhook] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const copyKey = (key) => {
    navigator.clipboard.writeText(key);
    alert("API Key disalin!");
  };

  const toggleWebhook = (id) => {
    setWebhooks(webhooks.map((w) => (w.id === id ? { ...w, active: !w.active } : w)));
  };

  const addApiKey = () => {
    const newKey = `sk_live_${Math.random().toString(36).substr(2, 9)}`;
    setApiKeys([
      ...apiKeys,
      { id: Date.now(), key: newKey, created: new Date().toISOString().split("T")[0] },
    ]);
    setShowAddApiKey(false);
  };

  const addWebhook = (url, event) => {
    if (!url || !event) return alert("Isi URL dan Event!");
    setWebhooks([...webhooks, { id: Date.now(), url, event, active: true }]);
    setShowAddWebhook(false);
  };

  const filteredIntegrations = integrations.filter((i) =>
    i.name.toLowerCase().includes(searchIntegration.toLowerCase())
  );

  return (
    <div className="space-y-10 px-4">
      <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-3xl font-bold flex items-center gap-2">
        <Link2 className="text-indigo-500" /> Integrasi
      </motion.h1>

      {/* API Keys */}
      <div className="bg-gray-900 p-6 rounded-xl shadow border border-gray-700 space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Key className="text-indigo-500" /> API Keys
          </h2>
          <button onClick={() => setShowAddApiKey(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
            <Plus size={16} /> Tambah Key
          </button>
        </div>
        <ul className="space-y-3">
          {apiKeys.map((k) => (
            <li key={k.id} className="flex justify-between items-center bg-gray-800 p-4 rounded border border-gray-700">
              <div>
                <p className="font-medium">{k.key}</p>
                <p className="text-xs text-gray-400">Dibuat: {k.created}</p>
              </div>
              <button onClick={() => copyKey(k.key)} className="p-2 rounded bg-gray-700 hover:bg-gray-600">
                <Copy size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Webhooks */}
      <div className="bg-gray-900 p-6 rounded-xl shadow border border-gray-700 space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Webhook className="text-indigo-500" /> Webhooks
          </h2>
          <button onClick={() => setShowAddWebhook(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
            <Plus size={16} /> Tambah Webhook
          </button>
        </div>
        <ul className="space-y-3">
          {webhooks.map((w) => (
            <motion.li key={w.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex justify-between items-center bg-gray-800 p-4 rounded border border-gray-700">
              <div>
                <p className="font-medium">{w.url}</p>
                <p className="text-xs text-gray-400">Event: {w.event}</p>
              </div>
              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={w.active} onChange={() => toggleWebhook(w.id)} />
                  <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-green-500 transition-all"></div>
                  <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></span>
                </label>
                <button onClick={() => setConfirmDelete(w)} className="p-2 rounded bg-red-600 hover:bg-red-700">
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Integrasi Pihak Ketiga */}
      <div className="bg-gray-900 p-6 rounded-xl shadow border border-gray-700 space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Zap className="text-indigo-500" /> Integrasi Pihak Ketiga
          </h2>
          <div className="relative w-full sm:w-64">
            <input type="text" placeholder="Cari integrasi..." value={searchIntegration} onChange={(e) => setSearchIntegration(e.target.value)} className="pl-8 pr-3 py-2 rounded bg-gray-800 text-white border border-gray-700 w-full" />
            <Search size={18} className="absolute left-2 top-2.5 text-gray-400" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIntegrations.map((i, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-gray-800 p-4 rounded border border-gray-700 flex items-center gap-3 hover:bg-gray-700 transition cursor-pointer">
              {i.icon}
              <span>{i.name}</span>
            </motion.div>
          ))}
          {filteredIntegrations.length === 0 && <p className="text-gray-400 col-span-full">Integrasi tidak ditemukan.</p>}
        </div>
      </div>

      {/* Modal Konfirmasi Hapus Webhook */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setConfirmDelete(null)}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-xl text-center space-y-4">
              <h3 className="text-xl font-semibold">Mau hapus webhook ini? 🚀</h3>
              <p className="text-gray-400">{confirmDelete.url} <br /> Event: <span className="font-medium">{confirmDelete.event}</span></p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Batal</button>
                <button onClick={() => setWebhooks(webhooks.filter((w) => w.id !== confirmDelete.id))} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">Ya, Hapus!</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Tambah API Key */}
      <AnimatePresence>
        {showAddApiKey && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddApiKey(false)}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-xl text-center space-y-4">
              <h3 className="text-xl font-semibold">Buat API Key Baru?</h3>
              <p className="text-gray-400">API Key baru akan dibuat secara acak.</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setShowAddApiKey(false)} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Batal</button>
                <button onClick={addApiKey} className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 text-white">Buat</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Tambah Webhook */}
      <AnimatePresence>
        {showAddWebhook && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddWebhook(false)}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-xl space-y-4">
              <h3 className="text-xl font-semibold">Tambah Webhook</h3>
              <input type="text" placeholder="URL Webhook" id="webhook-url" className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700" />
              <input type="text" placeholder="Event (contoh: order.created)" id="webhook-event" className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700" />
              <div className="flex justify-end gap-4">
                <button onClick={() => setShowAddWebhook(false)} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Batal</button>
                <button onClick={() => addWebhook(document.getElementById("webhook-url").value, document.getElementById("webhook-event").value)} className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 text-white">Tambah</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}