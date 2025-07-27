import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  UserPlus,
  Trash2,
  Edit3,
  Mail,
  Briefcase,
  UploadCloud,
  Save,
  Search,
  X,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Team() {
  const [team, setTeam] = useState([
    { id: 1, name: "Awin Nata", role: "CEO", email: "awin@example.com", avatar: "https://i.pravatar.cc/100?img=68" },
    { id: 2, name: "Rina Oktavia", role: "CTO", email: "rina@example.com", avatar: "https://i.pravatar.cc/100?img=32" },
    { id: 3, name: "Budi Pratama", role: "UI/UX Designer", email: "budi@example.com", avatar: "https://i.pravatar.cc/100?img=12" },
  ]);

  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [newMember, setNewMember] = useState({ name: "", role: "", email: "", avatar: "" });
  const [editMember, setEditMember] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAvatarChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (isEdit) setEditMember({ ...editMember, avatar: reader.result });
        else {
          setAvatarPreview(reader.result);
          setNewMember({ ...newMember, avatar: file });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addMember = () => {
    if (!newMember.name || !newMember.role || !newMember.email) return;
    const newId = team.length + 1;
    setTeam([
      ...team,
      {
        id: newId,
        name: newMember.name,
        role: newMember.role,
        email: newMember.email,
        avatar: avatarPreview || "https://i.pravatar.cc/100?img=1",
      },
    ]);
    setNewMember({ name: "", role: "", email: "", avatar: "" });
    setAvatarPreview("");
    setShowAddModal(false);
  };

  const updateMember = () => {
    setTeam(team.map((m) => (m.id === editMember.id ? editMember : m)));
    setEditMember(null);
  };

  const deleteMember = (id) => {
    setTeam(team.filter((member) => member.id !== id));
    setConfirmDelete(null);
  };

  const filteredTeam = team.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterRole ? m.role === filterRole : true)
  );

  // Grafik data per role
  const roleCount = team.reduce((acc, member) => {
    acc[member.role] = (acc[member.role] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.entries(roleCount).map(([role, count]) => ({
    name: role,
    value: count,
  }));
  const COLORS = ["#6366f1", "#f59e0b", "#10b981", "#ef4444"];

  return (
    <div className="space-y-10">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold flex items-center gap-2"
      >
        <Users className="text-indigo-500" /> Tim Kami
      </motion.h1>

      {/* Filter dan Tombol Tambah */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Cari nama anggota..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-2 rounded bg-gray-800 text-white border border-gray-700 w-full"
          />
          <Search size={18} className="absolute left-2 top-2.5 text-gray-400" />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
        >
          <option value="">Semua Role</option>
          {[...new Set(team.map((m) => m.role))].map((role, idx) => (
            <option key={idx} value={role}>{role}</option>
          ))}
        </select>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow"
        >
          <UserPlus size={18} /> Tambah Anggota
        </motion.button>
      </div>

      {/* List Tim */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredTeam.map((member, index) => (
            <motion.div
  key={member.id}
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.9 }}
  transition={{ delay: index * 0.1 }}
  className="relative p-5 rounded-xl shadow flex flex-col items-center text-center space-y-3
             bg-gray-900 overflow-hidden border-2 border-transparent premium-border"
>
  <div className="relative z-10 flex flex-col items-center">
    <img
      src={member.avatar}
      alt={member.name}
      className="w-24 h-24 rounded-full border-4 border-indigo-500 object-cover"
    />
    <p className="text-lg font-semibold">{member.name}</p>
    <p className="text-sm text-gray-400">{member.role}</p>
    <p className="text-xs text-gray-500">{member.email}</p>
    <div className="flex gap-2 mt-3">
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={() => setEditMember(member)}
        className="p-2 rounded bg-gray-700 hover:bg-gray-600 transition text-white"
      >
        <Edit3 size={16} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={() => setConfirmDelete(member)}
        className="p-2 rounded bg-red-600 hover:bg-red-700 transition text-white"
      >
        <Trash2 size={16} />
      </motion.button>
    </div>
  </div>
</motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Grafik Statistik */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-gray-900 p-6 rounded-xl shadow w-full h-80">
        <h2 className="text-xl font-semibold mb-4">Statistik Anggota per Role</h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100} label>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Modal Tambah Anggota */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-auto"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-xl"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <UserPlus /> Tambah Anggota
              </h3>
              <input type="text" placeholder="Nama Lengkap"
                value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                className="w-full mb-3 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700" />
              <input type="text" placeholder="Posisi"
                value={newMember.role} onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                className="w-full mb-3 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700" />
              <input type="email" placeholder="Email"
                value={newMember.email} onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                className="w-full mb-3 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700" />
              <label className="flex items-center gap-2 text-sm cursor-pointer bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition">
                <UploadCloud size={18} /> Upload Avatar
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleAvatarChange(e, false)} />
              </label>
              {avatarPreview && <motion.img src={avatarPreview} alt="Preview" className="w-20 h-20 rounded-full border border-gray-600 mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />}
              <button onClick={addMember} className="mt-4 w-full flex items-center gap-2 justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition">
                <Save size={16} /> Simpan Anggota
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Edit Anggota */}
      <AnimatePresence>
        {editMember && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-auto"
            onClick={() => setEditMember(null)}
          >
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Edit Anggota</h3>
                <button onClick={() => setEditMember(null)} className="p-1 rounded hover:bg-gray-700 transition"><X size={20} /></button>
              </div>
              <input type="text" value={editMember.name} onChange={(e) => setEditMember({ ...editMember, name: e.target.value })}
                className="w-full mb-3 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700" />
              <input type="text" value={editMember.role} onChange={(e) => setEditMember({ ...editMember, role: e.target.value })}
                className="w-full mb-3 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700" />
              <input type="email" value={editMember.email} onChange={(e) => setEditMember({ ...editMember, email: e.target.value })}
                className="w-full mb-3 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700" />
              <label className="flex items-center gap-2 text-sm cursor-pointer bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition">
                <UploadCloud size={18} /> Ubah Avatar
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleAvatarChange(e, true)} />
              </label>
              {editMember.avatar && <img src={editMember.avatar} alt="Preview" className="w-20 h-20 rounded-full border border-gray-600 mt-2" />}
              <button onClick={updateMember} className="mt-4 w-full flex items-center gap-2 justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition">
                <Save size={16} /> Simpan Perubahan
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Konfirmasi Hapus */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setConfirmDelete(null)}
          >
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-xl text-center space-y-4"
            >
              <h3 className="text-xl font-semibold">Yakin ingin menghapus {confirmDelete.name}?</h3>
              <p className="text-gray-400">Aksi ini tidak dapat dibatalkan.</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Batal</button>
                <button onClick={() => deleteMember(confirmDelete.id)} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">Hapus</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}