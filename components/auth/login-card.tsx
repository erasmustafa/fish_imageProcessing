"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Apple, Eye, Linkedin, Lock, Mail, User } from "lucide-react";
import { demoCredentials } from "../../lib/auth";

export default function LoginCard() {
  const router = useRouter();
  const [email, setEmail] = useState(demoCredentials.email);
  const [password, setPassword] = useState(demoCredentials.password);
  const [loading, setLoading] = useState(false);
  const [showLaunchOverlay, setShowLaunchOverlay] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(String(data?.error ?? "Login failed."));
      }

      setShowLaunchOverlay(true);
      window.setTimeout(() => {
        router.push("/platform");
      }, 1850);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error.");
      setLoading(false);
    }
  }

  return (
    <>
      <form className="auth-form" onSubmit={onSubmit}>
        <div className="auth-fields">
          <label className="auth-field">
            <span className="auth-label">
              <span className="auth-label-dot" />
              Mail
            </span>
            <span className="auth-input-wrap">
              <User size={16} />
              <input
                className="auth-input"
                placeholder="alicia@sisyphus.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </span>
          </label>

          <label className="auth-field">
            <span className="auth-label">
              <Lock size={15} />
              Password
            </span>
            <span className="auth-input-wrap">
              <Lock size={16} />
              <input
                className="auth-input"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <Eye size={15} />
            </span>
          </label>
        </div>

        <a className="forgot-link" href="/platform">
          Forgot password?
        </a>

        {error ? <div className="auth-error">{error}</div> : null}

        <button className="auth-submit" type="submit" disabled={loading || showLaunchOverlay}>
          {loading || showLaunchOverlay ? "Opening..." : "Log In"}
        </button>

        <p className="signup-copy">
          Don&apos;t have an account? <a href="/platform">Sign up</a>
        </p>

        <div className="social-divider">
          <span />
          <p>Or log in with</p>
          <span />
        </div>

        <div className="social-login-row">
          <button type="button" aria-label="Google">
            <Mail size={21} />
          </button>
          <button type="button" aria-label="Apple">
            <Apple size={22} />
          </button>
          <button type="button" aria-label="LinkedIn">
            <Linkedin size={20} />
          </button>
        </div>
      </form>

      {showLaunchOverlay && portalReady ? createPortal(
        <div className="launch-overlay" role="status" aria-live="polite">
          <div className="launch-loader">
            <img src="/aqualens-marine-loader.gif" alt="" />
            <strong>AquaScope hazırlanıyor</strong>
            <span>Deniz verileri senkronize ediliyor</span>
            <div className="launch-dots" aria-hidden>
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>,
        document.body
      ) : null}
    </>
  );
}
