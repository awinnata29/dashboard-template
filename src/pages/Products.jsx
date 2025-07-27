import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Plus,
  Edit,
  Trash,
  Tag,
  CheckCircle,
  XCircle,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import defaultImage from "../assets/default-product.png";

export default function Products() {
  const [products, setProducts] = useState([
    { id: 1, name: "Produk Premium A", price: 150000, stock: 50, category: "Premium", status: "Aktif", image: defaultImage },
    { id: 2, name: "Produk Standar B", price: 90000, stock: 100, category: "Standar", status: "Aktif", image: defaultImage },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 5;
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / perPage);
  const startIndex = (page - 1) * perPage;
  const paginatedProducts = filtered.slice(startIndex, startIndex + perPage);

  const openAddModal = () => {
    setEditProduct(null);
    setImagePreview("");
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditProduct(product);
    setImagePreview(product.image);
    setModalOpen(true);
  };

  const handleDelete = () => {
    setProducts(products.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newProduct = {
      id: editProduct ? editProduct.id : Date.now(),
      name: form.name.value,
      price: Number(form.price.value),
      stock: Number(form.stock.value),
      category: form.category.value,
      status: form.status.value,
      image: imagePreview || defaultImage,
    };
    if (editProduct) {
      setProducts(products.map((p) => (p.id === editProduct.id ? newProduct : p)));
    } else {
      setProducts([...products, newProduct]);
    }
    setModalOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-8 px-4 w-full max-w-full relative">
      {/* Header + Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between w-full">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Package className="text-indigo-500" /> Produk / Layanan
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <Search size={18} className="absolute left-2 top-2.5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={openAddModal}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-2xl hover:shadow-indigo-500/50 text-white"
      >
        <Plus size={24} />
      </motion.button>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {[
          { label: "Total Produk", value: products.length, color: "from-indigo-500 to-purple-500" },
          { label: "Stok Keseluruhan", value: products.reduce((a, b) => a + b.stock, 0), color: "from-green-500 to-emerald-500" },
          { label: "Kategori", value: [...new Set(products.map((p) => p.category))].length, color: "from-yellow-500 to-orange-500" }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-5 rounded-xl bg-gradient-to-r ${stat.color} text-white shadow-lg`}
          >
            <p className="text-lg font-semibold">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-700 hidden md:block">
        <table className="w-full text-sm sm:text-base min-w-[600px]">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3 text-left">Gambar</th>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Harga</th>
              <th className="p-3 text-left">Stok</th>
              <th className="p-3 text-left">Kategori</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {paginatedProducts.map((p) => (
              <motion.tr
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.01 }}
                className="hover:bg-gray-700"
              >
                <td className="p-3">
                  <img src={p.image || defaultImage} alt={p.name} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">Rp {p.price.toLocaleString("id-ID")}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3 flex items-center gap-2"><Tag size={16} /> {p.category}</td>
                <td className="p-3">
                  {p.status === "Aktif" ? (
                    <span className="flex items-center gap-1 text-green-400"><CheckCircle size={16}/> Aktif</span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-400"><XCircle size={16}/> Nonaktif</span>
                  )}
                </td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => openEditModal(p)} className="p-2 rounded bg-blue-500 hover:bg-blue-600 text-white"><Edit size={16} /></button>
                  <button onClick={() => setDeleteId(p.id)} className="p-2 rounded bg-red-500 hover:bg-red-600 text-white"><Trash size={16} /></button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="flex flex-col gap-4 md:hidden">
        {paginatedProducts.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 rounded-xl p-4 shadow-xl border border-gray-700 hover:border-indigo-500 transition-all"
          >
            <div className="flex gap-4">
              <img src={p.image || defaultImage} alt={p.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{p.name}</h2>
                <p className="text-sm text-gray-300">Rp {p.price.toLocaleString('id-ID')}</p>
                <p className="text-xs text-gray-400">Stok: {p.stock}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1"><Tag size={14}/> {p.category}</p>
                <p className={`text-sm flex items-center gap-1 ${p.status==='Aktif'?'text-green-400':'text-red-400'}`}>
                  {p.status==='Aktif'?<CheckCircle size={14}/> : <XCircle size={14}/>} {p.status}
                </p>
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-3">
              <motion.button whileHover={{ scale: 1.1 }} onClick={() => openEditModal(p)} className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow"><Edit size={18}/></motion.button>
              <motion.button whileHover={{ scale: 1.1 }} onClick={() => setDeleteId(p.id)} className="p-3 rounded-full bg-red-500 hover:bg-red-600 text-white shadow"><Trash size={18}/></motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} className="p-2 rounded bg-gray-800 text-white disabled:opacity-30">
            <ChevronLeft size={18} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => setPage(p)}
              className={`px-3 py-1 rounded ${page === p ? "bg-indigo-500 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>
              {p}
            </button>
          ))}
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="p-2 rounded bg-gray-800 text-white disabled:opacity-30">
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Modal (scrollable) */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-gray-900 p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{editProduct ? "Edit Produk" : "Tambah Produk"}</h2>
                <button onClick={() => setModalOpen(false)}><XCircle size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div><label className="block mb-1">Nama</label>
                  <input type="text" name="name" defaultValue={editProduct?.name || ""} required className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white" />
                </div>
                <div><label className="block mb-1">Gambar Produk</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-gray-300" />
                  {imagePreview && <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                    src={imagePreview} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded border border-gray-700" />}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1"><label className="block mb-1">Harga</label>
                    <input type="number" name="price" defaultValue={editProduct?.price || ""} required className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white" />
                  </div>
                  <div className="flex-1"><label className="block mb-1">Stok</label>
                    <input type="number" name="stock" defaultValue={editProduct?.stock || ""} required className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white" />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1"><label className="block mb-1">Kategori</label>
                    <select name="category" defaultValue={editProduct?.category || "Premium"} className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white">
                      <option>Premium</option><option>Standar</option><option>Basic</option>
                    </select>
                  </div>
                  <div className="flex-1"><label className="block mb-1">Status</label>
                    <select name="status" defaultValue={editProduct?.status || "Aktif"} className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white">
                      <option>Aktif</option><option>Nonaktif</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 rounded text-white font-semibold shadow">Simpan</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Konfirmasi Hapus */}
      <AnimatePresence>
        {deleteId && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-gray-900 p-6 rounded-lg w-full max-w-sm"
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
              <h2 className="text-xl font-bold mb-4">Yakin mau menghapus produk ini? 🗑️</h2>
              <div className="flex justify-end gap-3">
                <button onClick={() => setDeleteId(null)} className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white">Batal</button>
                <button onClick={handleDelete} className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white">Hapus</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}