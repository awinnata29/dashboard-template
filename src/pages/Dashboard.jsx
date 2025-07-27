import { motion } from "framer-motion";
import { Users, Activity, DollarSign, UserPlus, CreditCard } from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Pengguna",
      value: "1.245",
      change: "+12%",
      icon: <Users size={24} />,
      color: "from-indigo-500 to-purple-500",
    },
    {
      title: "Sesi Aktif",
      value: "324",
      change: "+5%",
      icon: <Activity size={24} />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Pendapatan",
      value: "Rp 8.450.000",
      change: "+20%",
      icon: <DollarSign size={24} />,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const activities = [
    { text: "Pengguna John membuat postingan baru", icon: <Activity size={18} className="text-indigo-400" />, time: "2 menit lalu" },
    { text: "Pengguna baru Anna berhasil mendaftar", icon: <UserPlus size={18} className="text-green-400" />, time: "10 menit lalu" },
    { text: "Pembayaran dari Michael telah diterima", icon: <CreditCard size={18} className="text-yellow-400" />, time: "30 menit lalu" },
  ];

  const lineData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 800 },
    { name: "Mar", value: 650 },
    { name: "Apr", value: 1000 },
    { name: "Mei", value: 750 },
    { name: "Jun", value: 1200 },
  ];

  const pieData = [
    { name: "Paket Premium", value: 400 },
    { name: "Paket Standar", value: 300 },
    { name: "Paket Basic", value: 300 },
  ];
  const COLORS = ["#6366F1", "#22C55E", "#F59E0B"];

  const tableData = [
    { name: "John Doe", status: "Aktif", plan: "Premium" },
    { name: "Anna Smith", status: "Pending", plan: "Standar" },
    { name: "Michael Lee", status: "Nonaktif", plan: "Basic" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-10"
    >


      {/* Statistik Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(99,102,241,0.5)",
            }}
            transition={{ delay: index * 0.1 }}
            className={`relative overflow-hidden p-5 sm:p-6 rounded-xl border border-gray-700 shadow-xl bg-gradient-to-br ${item.color} text-white`}
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-20"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-semibold">{item.title}</h2>
                <p className="text-2xl sm:text-3xl font-bold">{item.value}</p>
                <span className="text-xs sm:text-sm text-green-200">{item.change}</span>
              </div>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="p-2 sm:p-3 bg-white/20 rounded-full"
              >
                {item.icon}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Grafik & Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grafik Line */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="col-span-2 p-6 rounded-xl bg-gray-800 shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4 text-white">Statistik Bulanan</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <Line type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={3} />
              <CartesianGrid stroke="#374151" strokeDasharray="5 5" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-xl bg-gray-800 shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4 text-white">Distribusi Paket</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Tabel Ringkas */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="p-6 rounded-xl bg-gray-800 shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4 text-white">Daftar Pengguna</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-white">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Paket</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2">{row.status}</td>
                  <td className="px-4 py-2">{row.plan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Aktivitas Terbaru */}
      <div>
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Aktivitas Terbaru</h2>
        <ul className="space-y-3">
          {activities.map((activity, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden p-4 rounded bg-gray-800 hover:bg-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 group"
            >
              <span className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transition duration-300"></span>
              <div className="flex items-center gap-3 relative z-10">
                <div className="p-2 bg-gray-700 rounded-full">{activity.icon}</div>
                <span className="text-sm sm:text-base text-white">{activity.text}</span>
              </div>
              <span className="text-xs sm:text-sm text-gray-400 relative z-10">
                {activity.time}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
