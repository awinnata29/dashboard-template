import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Lock,
  EyeOff,
  Eye,
  UploadCloud,
  Save,
} from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState({
    name: "Awin Nata",
    email: "awin@example.com",
    phone: "081234567890",
    avatar: "",
  });

  const [avatarPreview, setAvatarPreview] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, avatar: file });
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-10 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold flex items-center gap-2"
      >
        <User className="text-indigo-500" /> Profil Pengguna
      </motion.h1>

      {/* Avatar Upload */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col sm:flex-row items-center gap-6 bg-gray-900/80 backdrop-blur-md p-6 rounded-xl shadow-xl border border-gray-700"
      >
        <div className="relative">
          <motion.img
            key={avatarPreview || "default"}
            src={avatarPreview || "https://i.pravatar.cc/150?img=68"}
            alt="avatar"
            className="w-32 h-32 rounded-full border-4 border-indigo-500 object-cover shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 text-sm cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded hover:scale-105 transition">
            <UploadCloud size={18} />
            Upload Avatar
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </label>
          <p className="text-xs text-gray-400">Format JPG/PNG. Max 2MB.</p>
        </div>
      </motion.div>

      {/* Form Profil */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900/80 backdrop-blur-md p-6 rounded-xl shadow-xl border border-gray-700 space-y-6"
      >
        <h2 className="text-xl font-semibold mb-2">Informasi Akun</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 flex items-center gap-2 mb-1">
              <User size={16} /> Nama Lengkap
            </label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 flex items-center gap-2 mb-1">
              <Mail size={16} /> Email
            </label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 flex items-center gap-2 mb-1">
              <Phone size={16} /> Nomor HP
            </label>
            <input
              type="text"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded shadow"
        >
          <Save size={16} /> Simpan Perubahan
        </motion.button>
      </motion.div>

      {/* Ubah Password */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/80 backdrop-blur-md p-6 rounded-xl shadow-xl border border-gray-700 space-y-6"
      >
        <h2 className="text-xl font-semibold mb-2">Ubah Password</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 flex items-center gap-2 mb-1">
              <Lock size={16} /> Password Lama
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 flex items-center gap-2 mb-1">
              <Lock size={16} /> Password Baru
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 pr-10 focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                className="absolute top-2 right-3 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow"
        >
          <Save size={16} /> Simpan Password
        </motion.button>
      </motion.div>
    </div>
  );
}