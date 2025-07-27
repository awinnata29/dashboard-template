import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

// Halaman yang sudah ada
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";

// Halaman baru (stub)
import Products from "./pages/Products";
import Transactions from "./pages/Transactions";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Team from "./pages/Team";
import ActivityLog from "./pages/ActivityLog";
import Help from "./pages/Help";
import Integrations from "./pages/Integrations";
import Logs from "./pages/Logs";
import Feedback from "./pages/Feedback";

// Komponen animasi untuk halaman kosong (stub)
import { motion } from "framer-motion";

function StubPage({ title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 text-gray-900 dark:text-white"
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-4">{title}</h1>
      <p>Halaman {title} masih dalam pengembangan.</p>
    </motion.div>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Router>
      <Layout mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/products" element={<Products />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/team" element={<Team />} />
          <Route path="/activity-log" element={<ActivityLog />} />
          <Route path="/help" element={<Help />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </Layout>
    </Router>
  );
}
