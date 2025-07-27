import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";
import { TrendingUp, DollarSign, Users } from "lucide-react";

const lineData = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 600 },
  { name: "Mar", users: 800 },
  { name: "Apr", users: 1000 },
  { name: "Mei", users: 1200 },
  { name: "Jun", users: 1500 },
];

const barData = [
  { name: "Jan", income: 4000000 },
  { name: "Feb", income: 6000000 },
  { name: "Mar", income: 8000000 },
  { name: "Apr", income: 10000000 },
  { name: "Mei", income: 12500000 },
  { name: "Jun", income: 15000000 },
];

const pieData = [
  { name: "Gratis", value: 400, color: "#4ade80" },
  { name: "Premium", value: 300, color: "#60a5fa" },
  { name: "Enterprise", value: 300, color: "#f472b6" },
];

const stats = [
  { title: "Total Pengguna", value: "12.450", icon: <Users size={24} />, color: "from-indigo-500 to-purple-500" },
  { title: "Pendapatan", value: "Rp 245 Juta", icon: <DollarSign size={24} />, color: "from-green-500 to-emerald-500" },
  { title: "Pertumbuhan", value: "+24%", icon: <TrendingUp size={24} />, color: "from-pink-500 to-rose-500" },
];

export default function Reports() {
  return (
    <div className="space-y-10">
      <h1 className="text-2xl md:text-3xl font-bold">Laporan</h1>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: i * 0.1 }}
            className={`relative overflow-hidden p-6 rounded-xl border border-gray-700 shadow-xl bg-gradient-to-br ${item.color} text-white`}
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-20"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-3xl font-bold">{item.value}</p>
              </div>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="p-3 bg-white/20 rounded-full"
              >
                {item.icon}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Grafik Pertumbuhan User */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-6 rounded-xl shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-4">Pertumbuhan Pengguna</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#60a5fa" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Grafik Pendapatan */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gray-800 p-6 rounded-xl shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-4">Pendapatan Bulanan</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="income" fill="#4ade80" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Grafik Pie */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gray-800 p-6 rounded-xl shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-4">Distribusi Pengguna</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100}>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
