import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, X, Search, Users as UsersIcon, UserCheck, UserX } from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: "Awin Nata", email: "awinnata@web.app", status: "Aktif", plan: "Premium" },
    { id: 2, name: "Anna Smith", email: "anna@example.com", status: "Pending", plan: "Standar" },
    { id: 3, name: "Michael Lee", email: "michael@example.com", status: "Nonaktif", plan: "Basic" },
  ]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const filteredUsers = users.filter(
    (u) =>
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())) &&
      (filter === "Semua" || u.status === filter)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newUser = {
      id: editUser ? editUser.id : Date.now(),
      name: formData.get("name"),
      email: formData.get("email"),
      status: formData.get("status"),
      plan: formData.get("plan"),
    };

    if (editUser) {
      setUsers(users.map((u) => (u.id === editUser.id ? newUser : u)));
    } else {
      setUsers([...users, newUser]);
    }
    setModalOpen(false);
    setEditUser(null);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const countActive = users.filter((u) => u.status === "Aktif").length;
  const countPending = users.filter((u) => u.status === "Pending").length;
  const countNonaktif = users.filter((u) => u.status === "Nonaktif").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header + Tombol */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Manajemen Pengguna
        </h1>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded text-white font-semibold shadow"
        >
          <Plus size={20} /> Tambah Pengguna
        </button>
      </div>

      {/* Ringkasan Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Aktif */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative overflow-hidden rounded-xl p-5 bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-xl"
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-20"></div>
          <div className="flex justify-between relative z-10">
            <div>
              <p className="text-sm opacity-80">Aktif</p>
              <p className="text-2xl font-bold">{countActive}</p>
            </div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="p-3 bg-white/20 rounded-full"
            >
              <UserCheck size={24} />
            </motion.div>
          </div>
        </motion.div>
        {/* Pending */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative overflow-hidden rounded-xl p-5 bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-xl"
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-20"></div>
          <div className="flex justify-between relative z-10">
            <div>
              <p className="text-sm opacity-80">Pending</p>
              <p className="text-2xl font-bold">{countPending}</p>
            </div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="p-3 bg-white/20 rounded-full"
            >
              <UsersIcon size={24} />
            </motion.div>
          </div>
        </motion.div>
        {/* Nonaktif */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative overflow-hidden rounded-xl p-5 bg-gradient-to-br from-red-400 to-pink-500 text-white shadow-xl"
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-20"></div>
          <div className="flex justify-between relative z-10">
            <div>
              <p className="text-sm opacity-80">Nonaktif</p>
              <p className="text-2xl font-bold">{countNonaktif}</p>
            </div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="p-3 bg-white/20 rounded-full"
            >
              <UserX size={24} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Pencarian & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 border border-gray-700 rounded px-3 py-2 bg-gray-800 w-full sm:w-1/2">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama atau email..."
            className="bg-transparent outline-none flex-1 text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
        >
          <option>Semua</option>
          <option>Aktif</option>
          <option>Pending</option>
          <option>Nonaktif</option>
        </select>
      </div>

      {/* Tabel Pengguna */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="p-4 sm:p-6 rounded-xl bg-gray-800 shadow-lg overflow-x-auto"
      >
        <table className="min-w-[700px] w-full text-left text-white">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Paket</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-gray-700 hover:bg-gray-700"
              >
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      user.status === "Aktif"
                        ? "bg-green-500/20 text-green-400"
                        : user.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-2">{user.plan}</td>
                <td className="px-4 py-2 flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setEditUser(user);
                      setModalOpen(true);
                    }}
                    className="p-2 rounded bg-blue-500 hover:bg-blue-600"
                  >
                    <Edit size={16} />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(user.id)}
                    className="p-2 rounded bg-red-500 hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Modal Tambah/Edit User */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">
                  {editUser ? "Edit Pengguna" : "Tambah Pengguna"}
                </h2>
                <button onClick={() => { setModalOpen(false); setEditUser(null); }}>
                  <X size={20} className="text-gray-400 hover:text-white" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-1">Nama</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editUser?.name || ""}
                    required
                    className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={editUser?.email || ""}
                    required
                    className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-gray-300 mb-1">Status</label>
                    <select
                      name="status"
                      defaultValue={editUser?.status || "Aktif"}
                      className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
                    >
                      <option>Aktif</option>
                      <option>Pending</option>
                      <option>Nonaktif</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-300 mb-1">Paket</label>
                    <select
                      name="plan"
                      defaultValue={editUser?.plan || "Premium"}
                      className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
                    >
                      <option>Premium</option>
                      <option>Standar</option>
                      <option>Basic</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded text-white font-semibold shadow"
                >
                  Simpan
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
