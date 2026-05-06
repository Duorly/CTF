import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

type LoginForm = {
  identifier: string;
  password: string;
};

export default function Login() {
  const [form, setForm] = useState<LoginForm>({
    identifier: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Connexion :", form);

    alert("Login success!");
    navigate("/");
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

            <button type="submit" className="btn-auth">
              Se connecter
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