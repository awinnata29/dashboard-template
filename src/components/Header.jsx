import { useState, useEffect } from "react";
import { Sun, Moon, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({ setMobileOpen }) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="flex items-center justify-between h-16 px-6 border-b border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500">
      <div className="flex items-center gap-4">
        {/* Tombol menu mobile */}
        <button
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 md:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Toggle Dark/Light */}
        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 8px rgba(99,102,241,0.5)",
          }}
          whileTap={{ scale: 0.9, rotate: 90 }}
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
        >
          <AnimatePresence mode="wait" initial={false}>
            {darkMode ? (
              <motion.div
                key="sun"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <Sun size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.3 }}
              >
                <Moon size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Avatar */}
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40?img=68"
            alt="avatar"
            className="w-10 h-10 rounded-full border border-indigo-500"
          />
          <span className="hidden sm:block font-medium">Awin Nata</span>
        </div>
      </div>
    </header>
  );
}
