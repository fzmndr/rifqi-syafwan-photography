import { ArrowLeft, FileText, Image, Phone, Wallet, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const guideItems = [
  {
    icon: Phone,
    title: "Edit Nama Brand, Email, WhatsApp",
    file: "src/data/siteData.js",
    desc: "Ubah nama brand, nomor WhatsApp, email, lokasi, Instagram, dan copyright website.",
  },
  {
    icon: Image,
    title: "Edit Portfolio / Project",
    file: "src/data/portfolioData.js",
    desc: "Tambah, hapus, atau ubah data project portfolio seperti judul, kategori, deskripsi, dan gambar.",
  },
  {
    icon: Wallet,
    title: "Edit Paket Harga",
    file: "src/data/pricingData.js",
    desc: "Ubah nama paket, harga, deskripsi, fitur paket, dan paket yang ditandai sebagai paling populer.",
  },
  {
    icon: FileText,
    title: "Edit Layanan Photography",
    file: "src/data/servicesData.js",
    desc: "Ubah daftar layanan seperti Wedding, Portrait, Event, Product, dan deskripsinya.",
  },
  {
    icon: HelpCircle,
    title: "Edit FAQ",
    file: "src/data/faqData.js",
    desc: "Ubah pertanyaan dan jawaban yang muncul di bagian Frequently Asked Questions.",
  },
];

function EditGuide() {
  return (
    <main className="edit-guide-page">
      <div className="background-glow background-glow-one"></div>
      <div className="background-glow background-glow-two"></div>

      <section className="edit-guide-container">
        <motion.div
          className="edit-guide-header"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <a href="/">
            <ArrowLeft size={18} />
            Back to Website
          </a>

          <p className="section-label">Website Documentation</p>
          <h1>Panduan Edit Konten Website</h1>
          <p>
            Halaman ini dibuat supaya proses update konten website Rifqi Syafwan
            Photography lebih mudah, rapi, dan tidak perlu membongkar semua kode.
          </p>
        </motion.div>

        <div className="edit-guide-grid">
          {guideItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                className="edit-guide-card"
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
              >
                <div className="edit-guide-icon">
                  <Icon size={24} />
                </div>

                <h2>{item.title}</h2>
                <code>{item.file}</code>
                <p>{item.desc}</p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          className="edit-guide-note"
          initial={{ y: 45, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.45, ease: "easeOut" }}
        >
          <h2>Catatan Penting</h2>

          <ul>
            <li>
              Semua gambar website sebaiknya disimpan di folder{" "}
              <code>src/assets/</code>.
            </li>
            <li>
              Gambar preview website untuk WhatsApp/Facebook disimpan di{" "}
              <code>public/og-image.jpg</code>.
            </li>
            <li>
              Setelah mengubah kode, jalankan <code>npm run build</code> untuk
              memastikan tidak ada error.
            </li>
            <li>
              Setelah aman, push ke GitHub agar Vercel otomatis update website.
            </li>
          </ul>
        </motion.div>
      </section>
    </main>
  );
}

export default EditGuide;