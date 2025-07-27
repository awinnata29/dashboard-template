import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Mail, Send, ChevronDown, ChevronUp, Paperclip, Search } from "lucide-react";

export default function Help() {
  const [faqs, setFaqs] = useState([
    {
      question: "Bagaimana cara mengganti password?",
      answer:
        "Masuk ke halaman Profile, lalu pilih bagian 'Ubah Password' dan ikuti instruksi yang ada.",
      open: false,
    },
    {
      question: "Bagaimana cara menghapus akun saya?",
      answer:
        "Silakan hubungi tim support kami melalui form kontak untuk permintaan penghapusan akun.",
      open: false,
    },
    {
      question: "Apakah ada aplikasi mobile?",
      answer:
        "Saat ini aplikasi mobile sedang dalam tahap pengembangan dan akan segera dirilis.",
      open: false,
    },
  ]);

  const [searchFaq, setSearchFaq] = useState("");
  const toggleFaq = (index) => {
    setFaqs(
      faqs.map((faq, i) =>
        i === index ? { ...faq, open: !faq.open } : { ...faq, open: false }
      )
    );
  };

  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [attachment, setAttachment] = useState(null);

  const sendMessage = () => {
    if (!contact.name || !contact.email || !contact.message) {
      alert("Lengkapi semua field!");
      return;
    }
    alert(
      `Pesan berhasil dikirim (dummy) dengan lampiran: ${
        attachment ? attachment.name : "Tidak ada"
      }`
    );
    setContact({ name: "", email: "", message: "" });
    setAttachment(null);
  };

  const filteredFaqs = faqs.filter((f) =>
    f.question.toLowerCase().includes(searchFaq.toLowerCase())
  );

  return (
    <div className="space-y-10 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold flex items-center gap-2"
      >
        <HelpCircle className="text-indigo-500" /> Pusat Bantuan
      </motion.h1>

      {/* FAQ Search */}
      <div className="relative mb-4 w-full sm:w-1/2">
        <input
          type="text"
          placeholder="Cari pertanyaan..."
          value={searchFaq}
          onChange={(e) => setSearchFaq(e.target.value)}
          className="pl-8 pr-3 py-2 rounded bg-gray-800 text-white border border-gray-700 w-full"
        />
        <Search size={18} className="absolute left-2 top-2.5 text-gray-400" />
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-900 p-6 rounded-xl shadow border border-gray-700 space-y-4">
        <h2 className="text-xl font-semibold mb-2">
          Pertanyaan yang Sering Diajukan
        </h2>
        <ul className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded border border-gray-700 bg-gray-800"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-4 text-left"
                >
                  <span className="font-medium">{faq.question}</span>
                  {faq.open ? (
                    <ChevronUp size={20} className="text-indigo-400" />
                  ) : (
                    <ChevronDown size={20} className="text-indigo-400" />
                  )}
                </button>
                <AnimatePresence>
                  {faq.open && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 pb-4 text-gray-300"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            ))
          ) : (
            <p className="text-gray-400">Tidak ada pertanyaan yang cocok.</p>
          )}
        </ul>
      </div>

      {/* Contact Form */}
      <div className="bg-gray-900 p-6 rounded-xl shadow border border-gray-700 space-y-6">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Mail className="text-indigo-500" /> Hubungi Kami
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Nama</label>
            <input
              type="text"
              value={contact.name}
              onChange={(e) =>
                setContact({ ...contact, name: e.target.value })
              }
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Email</label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) =>
                setContact({ ...contact, email: e.target.value })
              }
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
            />
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Pesan</label>
          <textarea
            rows="4"
            value={contact.message}
            onChange={(e) =>
              setContact({ ...contact, message: e.target.value })
            }
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
          ></textarea>
        </div>

        {/* Upload Lampiran */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition w-fit">
            <Paperclip size={18} /> Upload Lampiran
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setAttachment(e.target.files[0])}
            />
          </label>
          {attachment && (
            <div className="text-sm text-gray-300 flex items-center gap-2">
              <Paperclip size={16} /> {attachment.name}
            </div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={sendMessage}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition"
        >
          <Send size={16} /> Kirim Pesan
        </motion.button>
      </div>
    </div>
  );
}