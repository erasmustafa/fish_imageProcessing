import { BarChart3, BrainCircuit, ChevronDown, Globe2, Share2 } from "lucide-react";
import Link from "next/link";
import LoginCard from "../../components/auth/login-card";
import { ShineBorder } from "../../components/ui/shine-border";

const featureList = [
  {
    icon: BrainCircuit,
    title: "AI Destekli Analiz",
    body: "Gelişmiş yapay zeka ile yüksek doğrulukta balık türü tanıma.",
  },
  {
    icon: BarChart3,
    title: "Veri & Görselleştirme",
    body: "Kapsamlı istatistikler ve görsellerle verilerinizi anlamlandırın.",
  },
  {
    icon: Share2,
    title: "Dünya ile Paylaş",
    body: "Keşiflerinizi toplulukla paylaşın, birlikte öğrenelim.",
  },
];

export default function LoginPage() {
  return (
    <main className="auth-stage">
      <section className="login-frame">
        <ShineBorder borderWidth={1} borderRadius={24} duration={12} shineColor="#9ddcff" />
        <div className="login-left-panel">
          <div className="login-left-surface">
            <Link href="/" className="login-brandmark">
              <span className="login-brandmark-icon" aria-hidden>
                <img src="/aquascope-logo.svg" alt="" />
              </span>
              <span>AquaScope</span>
            </Link>

            <div className="login-left-copy">
              <span>HOŞ GELDİNİZ</span>
              <h1>
                Okyanusu Keşfet,
                <br />
                Bilgiyle <em>Derinleş.</em>
              </h1>
              <p>
                AquaScope ile balık türlerini keşfedin, analiz edin ve su altı dünyasının
                sırlarını birlikte çözün.
              </p>
            </div>

            <img className="login-left-fish" src="/login-fish-cutout.png" alt="Fish" />

            <div className="login-left-features">
              {featureList.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article key={feature.title} className="login-left-feature">
                    <span className="login-left-feature-icon">
                      <Icon size={24} strokeWidth={1.8} />
                    </span>
                    <div>
                      <strong>{feature.title}</strong>
                      <p>{feature.body}</p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="login-left-social-proof">
              <div className="login-left-avatars">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80" alt="User 1" />
                <img src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=96&q=80" alt="User 2" />
                <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=96&q=80" alt="User 3" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80" alt="User 4" />
              </div>
              <p>
                <strong>+500 kullanıcı</strong>
                AquaScope&apos;u keşfediyor
              </p>
            </div>
          </div>
        </div>

        <div className="login-right-panel">
          <div className="login-locale-pill">
            <Globe2 size={16} />
            <span>Türkçe</span>
            <ChevronDown size={16} />
          </div>

          <div className="login-right-copy">
            <h2>Giriş Yapın</h2>
            <p>Hesabınıza giriş yaparak keşfetmeye devam edin.</p>
          </div>

          <LoginCard />
        </div>
      </section>

      <footer className="login-bottom-links">
        <span>© 2024 AquaScope. Tüm hakları saklıdır.</span>
        <a href="/">Gizlilik Politikası</a>
        <a href="/">Kullanım Şartları</a>
        <a href="/">İletişim</a>
      </footer>
    </main>
  );
}
