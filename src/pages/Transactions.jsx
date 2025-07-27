import { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  Clock3,
  AlertTriangle,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function Transactions() {
  const [transactions] = useState([
    {
      id: "TRX-001",
      user: "Awin Nata",
      amount: 500000,
      status: "Sukses",
      date: "2025-07-20 10:35",
    },
    {
      id: "TRX-002",
      user: "Rina Oktavia",
      amount: 200000,
      status: "Pending",
      date: "2025-07-21 14:20",
    },
    {
      id: "TRX-003",
      user: "Budi Pratama",
      amount: 150000,
      status: "Gagal",
      date: "2025-07-22 09:10",
    },
    {
      id: "TRX-004",
      user: "Tono Saputra",
      amount: 300000,
      status: "Sukses",
      date: "2025-07-23 08:50",
    },
  ]);

  const chartData = [
    { date: "20 Jul", amount: 500000 },
    { date: "21 Jul", amount: 200000 },
    { date: "22 Jul", amount: 150000 },
    { date: "23 Jul", amount: 300000 },
    { date: "24 Jul", amount: 600000 },
    { date: "25 Jul", amount: 450000 },
    { date: "26 Jul", amount: 800000 },
  ];

  const totalAmount = transactions.reduce((a, b) => a + b.amount, 0);
  const pendingCount = transactions.filter((t) => t.status === "Pending").length;
  const successCount = transactions.filter((t) => t.status === "Sukses").length;
  const failCount = transactions.filter((t) => t.status === "Gagal").length;

  const cards = [
    {
      title: "Total Transaksi",
      value: `Rp ${totalAmount.toLocaleString()}`,
      color: "from-indigo-500 to-purple-500",
      icon: <DollarSign size={32} />,
    },
    {
      title: "Pending",
      value: pendingCount,
      color: "from-yellow-500 to-orange-500",
      icon: <Clock3 size={32} />,
    },
    {
      title: "Sukses",
      value: successCount,
      color: "from-green-500 to-emerald-500",
      icon: <TrendingUp size={32} />,
    },
    {
      title: "Gagal",
      value: failCount,
      color: "from-red-500 to-pink-500",
      icon: <AlertTriangle size={32} />,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <BarChart3 className="text-indigo-500" /> Transaksi
        </h1>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 text-white"
          >
            <Filter size={18} /> Filter
          </motion.button>
          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              placeholder="Cari transaksi..."
              className="pl-8 pr-3 py-2 rounded bg-gray-800 text-white border border-gray-700 w-full"
            />
            <Search
              size={18}
              className="absolute left-2 top-2.5 text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: index * 0.1 }}
            className={`relative overflow-hidden p-5 rounded-xl shadow-xl text-white bg-gradient-to-r ${card.color}`}
          >
            <div className="absolute right-4 top-4 opacity-30">{card.icon}</div>
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="text-3xl font-bold">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabel Transaksi (Desktop) */}
      <div className="overflow-x-auto hidden sm:block bg-gray-900 p-5 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Daftar Transaksi</h2>
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3 text-left">ID Transaksi</th>
              <th className="p-3 text-left">Pengguna</th>
              <th className="p-3 text-left">Jumlah</th>
              <th className="p-3 text-left">Tanggal</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {transactions.map((trx, index) => (
              <motion.tr
                key={trx.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className="hover:bg-gray-700"
              >
                <td className="p-3 font-semibold">{trx.id}</td>
                <td className="p-3">{trx.user}</td>
                <td className="p-3">
                  Rp {trx.amount.toLocaleString("id-ID")}
                </td>
                <td className="p-3">{trx.date}</td>
                <td className="p-3">
                  {trx.status === "Sukses" && (
                    <span className="flex items-center gap-1 text-green-400">
                      <CheckCircle size={16} /> Sukses
                    </span>
                  )}
                  {trx.status === "Pending" && (
                    <span className="flex items-center gap-1 text-yellow-400">
                      <Clock size={16} /> Pending
                    </span>
                  )}
                  {trx.status === "Gagal" && (
                    <span className="flex items-center gap-1 text-red-400">
                      <XCircle size={16} /> Gagal
                    </span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card View (Mobile) */}
      <div className="space-y-4 sm:hidden">
        {transactions.map((trx, index) => (
          <motion.div
            key={trx.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 p-4 rounded-lg shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">{trx.id}</h3>
              <span
                className={`flex items-center gap-1 text-sm ${
                  trx.status === "Sukses"
                    ? "text-green-400"
                    : trx.status === "Pending"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {trx.status === "Sukses" && <CheckCircle size={14} />}
                {trx.status === "Pending" && <Clock size={14} />}
                {trx.status === "Gagal" && <XCircle size={14} />}
                {trx.status}
              </span>
            </div>
            <p className="text-sm text-gray-300">{trx.user}</p>
            <p className="text-lg font-semibold mt-1">
              Rp {trx.amount.toLocaleString("id-ID")}
            </p>
            <p className="text-xs text-gray-400 mt-1">{trx.date}</p>
          </motion.div>
        ))}
      </div>

      {/* Grafik Transaksi */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 p-5 rounded-xl shadow"
      >
        <h2 className="text-xl font-semibold mb-4">Grafik Transaksi Per Hari</h2>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2 }}
                activeDot={{ r: 8 }}
                isAnimationActive={true}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
