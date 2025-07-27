import { motion } from "framer-motion";
import {
  Upload,
  AtSign,
  Globe,
  LayoutDashboard,
  Bell,
  Moon,
  Sun,
} from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [notif, setNotif] = useState(true);
  const [logo, setLogo] = useState(null);

  const handleLogoUpload = (e) => {
    if (e.target.files[0]) setLogo(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pengaturan disimpan! (dummy)");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
        Pengaturan Aplikasi
      </h1>

      <motion.form
        onSubmit={handleSubmit}
        className="p-4 sm:p-6 w-full bg-gray-800 rounded-xl shadow-2xl space-y-6 backdrop-blur-sm bg-opacity-90"
      >
        {/* Nama Aplikasi */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <label className="text-gray-300 flex items-center gap-2 text-sm sm:text-base">
            <LayoutDashboard size={18} className="text-indigo-400" /> Nama Aplikasi
          </label>
          <div className="relative">
            <input
              type="text"
              defaultValue="MyApp"
              className="w-full pl-10 pr-4 py-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <LayoutDashboard size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </motion.div>

        {/* Email Support */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <label className="text-gray-300 flex items-center gap-2 text-sm sm:text-base">
            <AtSign size={18} className="text-indigo-400" /> Email Support
          </label>
          <div className="relative">
            <input
              type="email"
              defaultValue="support@myapp.com"
              className="w-full pl-10 pr-4 py-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <AtSign size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </motion.div>

        {/* URL Website */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <label className="text-gray-300 flex items-center gap-2 text-sm sm:text-base">
            <Globe size={18} className="text-indigo-400" /> URL Website
          </label>
          <div className="relative">
            <input
              type="url"
              defaultValue="https://www.myapp.com"
              className="w-full pl-10 pr-4 py-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <Globe size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </motion.div>

        {/* Upload Logo */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <label className="text-gray-300 flex items-center gap-2 text-sm sm:text-base">
            <Upload size={18} className="text-indigo-400" /> Logo Aplikasi
          </label>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="w-20 h-20 rounded-lg border-2 border-dashed border-indigo-400 flex items-center justify-center bg-gray-700 overflow-hidden">
              {logo ? (
                <motion.img
                  key={logo}
                  src={logo}
                  alt="Logo"
                  className="object-cover w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              ) : (
                <Upload />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="text-gray-300 text-sm"
            />
          </div>
        </motion.div>

        {/* Switch Notifikasi */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
        >
          <span className="flex items-center gap-2 text-gray-300">
            <Bell size={18} className="text-indigo-400" /> Aktifkan Notifikasi
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notif}
              onChange={() => setNotif(!notif)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer-checked:bg-indigo-500 transition"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 transition-transform"></div>
          </label>
        </motion.div>

        {/* Switch Dark Mode */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
        >
          <span className="flex items-center gap-2 text-gray-300">
            {darkMode ? (
              <Moon size={18} className="text-indigo-400" />
            ) : (
              <Sun size={18} className="text-yellow-400" />
            )}{" "}
            Dark Mode
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer-checked:bg-indigo-500 transition"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 transition-transform"></div>
          </label>
        </motion.div>

        {/* Tombol Simpan */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          className="w-full sm:w-auto px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-semibold shadow-lg"
        >
          Simpan Perubahan
        </motion.button>
      </motion.form>
    </motion.div>
  );
}