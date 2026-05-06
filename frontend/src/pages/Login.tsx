import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

import { useAuth } from "../context/AuthContext";

type LoginForm = {
  identifier: string;
  password: string;
};

export default function Login() {
  const [form, setForm] = useState<LoginForm>({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email: form.identifier, password: form.password });
      navigate("/");
    } catch (err: any) {
      setError("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="auth-nav">
        <Link to="/" className="logo">
          <span className="logo-dot"></span>
          <span className="logo-pulse">Pulse</span>
          <span className="logo-vote">Vote</span>
        </Link>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Bon retour !</h1>
            <p>Connectez-vous pour continuer à voter.</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="identifier">Email ou pseudonyme</label>
              <div className="input-wrapper">
                <input
                  id="identifier"
                  type="text"
                  placeholder="ex: alex.vidal"
                  value={form.identifier}
                  onChange={(e) =>
                    setForm({ ...form, identifier: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Mot de passe</label>
              <div className="input-wrapper">
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
            </div>

            <button type="submit" className="btn-auth" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <div className="auth-footer">
            Pas encore de compte ? <Link to="/register">S&apos;inscrire</Link>
          </div>
        </div>
      </div>
    </>
  );
}