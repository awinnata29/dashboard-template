import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 flex flex-col">
        {/* Header diberi padding kiri sama seperti main */}
        <Header setMobileOpen={setMobileOpen} className="px-6" />
        <main className="flex-1 overflow-y-auto px-6 py-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          {children}
        </main>
      </div>
    </div>
  );
}
