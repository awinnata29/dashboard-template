import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Home, FileBarChart, Package, CreditCard, Bell,
  User, Settings, Users, ListChecks, HelpCircle,
  Layers, TerminalSquare, MessageSquare
} from "lucide-react";

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/" },
    { name: "Laporan", icon: <FileBarChart size={20} />, path: "/reports" },
    { name: "Produk / Layanan", icon: <Package size={20} />, path: "/products" },
    { name: "Transaksi", icon: <CreditCard size={20} />, path: "/transactions" },
    { name: "Notifikasi", icon: <Bell size={20} />, path: "/notifications" },
    { name: "Profil Pengguna", icon: <User size={20} />, path: "/profile" },
    { name: "Pengaturan", icon: <Settings size={20} />, path: "/settings" },
    { name: "Manajemen Tim", icon: <Users size={20} />, path: "/team" },
    { name: "Log Aktivitas", icon: <ListChecks size={20} />, path: "/activity-log" },
    { name: "Bantuan", icon: <HelpCircle size={20} />, path: "/help" },
    { name: "Integrasi", icon: <Layers size={20} />, path: "/integrations" },
    { name: "Logs", icon: <TerminalSquare size={20} />, path: "/logs" },
    { name: "User Feedback", icon: <MessageSquare size={20} />, path: "/feedback" },
  ];

  return (
    <motion.aside
      animate={{ x: mobileOpen || !isMobile ? 0 : -300 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className={`fixed md:static z-40 h-screen ${open ? "w-64" : "w-20"} 
                  bg-gradient-to-b from-gray-900 to-gray-800 
                  text-white shadow-2xl flex flex-col justify-between`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 border-b border-gray-700 px-4">
        <AnimatePresence>
          {open && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="font-extrabold text-xl tracking-wide bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text"
            >
              MyApp
            </motion.span>
          )}
        </AnimatePresence>

        {isMobile ? (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded hover:bg-gray-700 transition"
          >
            <X size={20} />
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(!open)}
            className="p-2 rounded hover:bg-gray-700 transition"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-4 space-y-2 overflow-y-auto">
        {menuItems.map((item, i) => {
          const isActive = location.pathname === item.path;
          return (
            <Link to={item.path} key={i} onClick={() => isMobile && setMobileOpen(false)}>
              <motion.div
                whileHover={{ scale: 1.05, x: 8 }}
                className={`relative flex items-center gap-4 px-5 py-3 m-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                    : "hover:bg-gray-700 text-gray-300"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 w-1 h-full bg-indigo-400 rounded-r"
                  ></motion.div>
                )}
                {item.icon}
                <AnimatePresence>
                  {open && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="font-medium"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
        v1.0.0 © 2025
      </div>
    </motion.aside>
  );
}
