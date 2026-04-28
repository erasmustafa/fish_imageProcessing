import { Fish, MessageSquare, TrendingUp } from "lucide-react";
import LoginCard from "../../components/auth/login-card";

export default function LoginPage() {
  return (
    <main className="auth-stage">
      <section className="login-shell">
        <div className="login-panel">
          <div className="login-brand">
            <span className="login-logo" aria-hidden />
            <span>Sisyphus</span>
          </div>

          <div className="login-heading">
            <h1>Welcome Back!</h1>
            <p>Log in to your account</p>
          </div>

          <LoginCard />
        </div>

        <div className="login-visual">
          <img src="/login-fish-scene.png" alt="Underwater fish scene" />
          <div className="login-visual-copy">
            <h2>Identify fish species and join the fishing community.</h2>
            <div className="login-feature-row">
              <span>
                <Fish size={22} />
              </span>
              <p>Identify Fish</p>
              <span>
                <MessageSquare size={22} />
              </span>
              <p>Join Community</p>
              <span>
                <TrendingUp size={22} />
              </span>
              <p>Log Catches</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
