import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

type RegisterForm = {
nom: string;
prenom: string;
email: string;
password: string;
};

export default function Register() {
const [form, setForm] = useState<RegisterForm>({
nom: "",
prenom: "",
email: "",
password: "",
});

const navigate = useNavigate();

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
event.preventDefault();

console.log("Inscription :", form);

alert("Register success!");

navigate("/login");


};

return (
<> <nav className="auth-nav"> <Link to="/" className="logo"> <span className="logo-dot"></span> <span className="logo-pulse">Pulse</span> <span className="logo-vote">Vote</span> </Link> </nav>

  <div className="auth-wrapper">
    <div className="auth-card">
      <div className="auth-header">
        <h1>Créer un compte</h1>
        <p>Rejoignez la communauté PulseVote.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="nom">Nom</label>
          <div className="input-wrapper">
            <input
              id="nom"
              type="text"
              placeholder="Dupont"
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="prenom">Prénom</label>
          <div className="input-wrapper">
            <input
              id="prenom"
              type="text"
              placeholder="Léa"
              value={form.prenom}
              onChange={(e) =>
                setForm({ ...form, prenom: e.target.value })
              }
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <div className="input-wrapper">
            <input
              id="email"
              type="email"
              placeholder="lea@exemple.fr"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
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
          Créer mon compte
        </button>
      </form>

      <div className="auth-footer">
        Déjà inscrit ? <Link to="/login">Se connecter</Link>
      </div>
    </div>
  </div>
</>


);
}
