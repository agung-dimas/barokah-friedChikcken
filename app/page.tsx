import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustSignals from '@/components/TrustSignals';
import FeatureCard from '@/components/FeatureCard';
import MenuCard from '@/components/MenuCard';
import ProcessStep from '@/components/ProcessStep';
import TestimonialSection from '@/components/TestimonialSection';
import FAQItem from '@/components/FAQItem';
import LocationSection from '@/components/LocationSection';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';

export default function Home() {
  const features = [
    {
      icon: 'verified',
      title: 'Jaminan Halal',
      description: "Penjelasan proses penyembelihan syar'i, menjamin keberkahan di setiap suapan.",
    },
    {
      icon: 'local_dining',
      title: 'Fresh Every Day',
      description: 'Ayam segar harian, bukan bekuan. Menjaga kualitas dan tekstur daging.',
    },
    {
      icon: 'water_drop',
      title: 'Minyak Berkualitas',
      description: 'Komitmen menggunakan minyak goreng jernih untuk hasil gorengan yang sehat.',
    },
    {
      icon: 'star',
      title: 'Rasa Autentik',
      description: 'Bumbu rempah rahasia meresap sampai ke tulang, cita rasa tiada tara.',
    },
  ];

  const menuItems = [
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBu2gfKHknFTHciA5m0vy5Ho9QHbfojs9qDtz7lXe5MKllGGNJyFHZ2HiLsX8yjNSvXS6XPOrsJHO0HF0cnOSW74TVN3VhLuiWq5gFP5lHPwx1uMSTjFxbJKtJnV5Hu4giTM4_AOuMy3WEFAaJEHNZ_sJJ42laeCmbDR0Go-rNfDkkglTphCU-YGgeriG1Rtzc9XqR8KPKgATtz44gZbKeEmIRAUPEAOu8iYLH7O3tMCpijZ2ouZ6AOk84gfJwaLwrAmLGeywaqGnc',
      title: 'Paket Komplit Crispy',
      description: 'Nasi, Ayam Crispy, Lalapan, Sambal',
      price: 'Rp 22.000',
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxRfSLYtRDg9D3Tn32RymfHyP7AhaL0j-Yqw9MZZ75DjP5MduVW4fTRVhKE_K3ah-xgu52wR0g8CXoGIaU9YXXCS6xEYy9gh6alvOibTFEwLSrupdcjpOt5kDlzKcwiENDUkvXuBoy7HIo90rBGcG2MA_coq_787rL7RvdHE6AIzfpZH5JmTcgUZSBrlSKKsEY9tdsE_6ATREUyLlCfPEiEaBdq5U-ind7DyVtrnJEaSQVMKclDkTE-JOETcEfyLWNP7GYBbKmsP8',
      title: 'Paket Ayam Crispy',
      description: 'Ayam Crispy, Lalapan, Sambal',
      price: 'Rp 17.000',
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkGsG4eJQX04JTizDI6ARk1yMZih3CZ3EjRi5IUC6KGasU6KcBml3G7hAvxUbt_n3deg3LKDrygvkPaUwrQTESkA-kRbIggIb-UKPVePN3CxVWeQkSPRdouHQk99XdQauDTuHXoHLY4z95FCdaNkLD7WzYQTpTsvcrGZED3zV4U4A3Pb329SgzfJUk9qreMqmtHwvAG6VRqk9KIvqtgjCLL7O6jJbICd1ErBdNzJ8B7o7nJ9TAzOaannvx59xQZbzqxKdxLS5cPRg',
      title: 'Paket Komplit Bawang',
      description: 'Nasi, Ayam Bawang Putih, Lalapan, Sambal',
      price: 'Rp 24.000',
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVEG3Wf-biXQDUggPc8a9N64Pgx98ivWw2Pv7ImVytjnhMSxXrs11WS-YIxiJci1LQwOMtlcstUafaHPJhEHUamKzGLBJezYs75xPnHbbohsM7dgODyRTjCIHGNxmxHt7-IanTaEWJ0N-BJT17TAdukJPTDnuJ2-XdfteBXpNNqa7onpRpY4D1aOM0ho4mRf8j3YQqayuNBXI39fc63_fT-ddAvr9r83pQ9bTTkZDsYRHhONktd1YaUV838StYJHtDmUa4PWUgisc',
      title: 'Paket Ayam Bawang',
      description: 'Ayam Bawang Putih, Lalapan, Sambal',
      price: 'Rp 19.000',
    },
    {
      image: 'https://images.unsplash.com/photo-1544787210-28272550dc8a?q=80&w=800&auto=format&fit=crop',
      title: 'Es Teh Manis',
      description: 'Gula asli, segar',
      price: 'Rp 5.000',
      priceColor: 'text-on-surface',
    },
    {
      image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=800&auto=format&fit=crop',
      title: 'Es Jeruk',
      description: 'Jeruk peras asli',
      price: 'Rp 8.000',
      priceColor: 'text-on-surface',
    },
  ];

  const faqs = [
    {
      question: 'Apakah bisa menerima pesanan untuk acara?',
      answer: 'Tentu saja! Kami menerima pesanan dalam jumlah besar untuk berbagai acara seperti syukuran, rapat, atau ulang tahun. Silakan hubungi nomor WhatsApp kami untuk informasi lebih lanjut.',
    },
    {
      question: 'Apakah ada minimal order untuk delivery?',
      answer: 'Untuk layanan delivery langsung dari kami, minimal order adalah Rp 50.000. Anda juga bisa memesan melalui aplikasi ojek online tanpa minimal order.',
    },
    {
      question: 'Jam berapa saja outlet buka?',
      answer: 'Outlet kami buka setiap hari mulai pukul 10:00 hingga 22:00 WIB.',
    },
  ];

  return (
    <div className="antialiased font-body" suppressHydrationWarning>
      <Navbar />
      
      <main className="pt-20">
        <Hero />
        <TrustSignals />
        
        {/* Features Section */}
        <section id="about" className="py-section-gap bg-surface-bright">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-4">Kenapa Harus Barokah?</h2>
              <div className="w-24 h-1 bg-primary-container mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section id="menu" className="py-section-gap bg-surface">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-4">Menu Pilihan</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">
                Sajian istimewa dari dapur kami, disiapkan dengan dedikasi dan kualitas terbaik untuk keberkahan Anda.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems.map((item) => (
                <MenuCard key={item.title} {...item} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-sm text-on-surface-variant italic">
                * Foto adalah saran penyajian. Harga sudah final dan transparan.
              </p>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-section-gap bg-surface-bright border-t border-surface-variant">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-4">Proses Kami</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">
                Dedikasi kami untuk menyajikan yang terbaik di setiap langkah pembuatan.
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-surface-variant/30 -z-0"></div>
              <ProcessStep 
                number={1} 
                title="Pemilihan Bahan" 
                description="Bahan baku pilihan, dijamin halal dan thayyib dari suplier terpercaya." 
              />
              <ProcessStep 
                number={2} 
                title="Marinating" 
                description="Proses marinasi dengan bumbu rempah pilihan agar meresap sempurna." 
              />
              <ProcessStep 
                number={3} 
                title="Penggorengan" 
                description="Digoreng dengan suhu yang tepat untuk hasil renyah dan juicy." 
              />
            </div>
          </div>
        </section>

        {/* Dynamic Testimonials */}
        <TestimonialSection />

        {/* FAQ Section */}
        <section className="py-section-gap bg-surface-bright border-t border-surface-variant">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-4">FAQ</h2>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <FAQItem key={i} {...faq} />
              ))}
            </div>
          </div>
        </section>

        <LocationSection />
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
