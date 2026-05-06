import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
return (
<> <nav className="main-nav"> <div className="logo"> <span className="logo-dot"></span> <span className="logo-pulse">Pulse</span> <span className="logo-vote">Vote</span> </div>

    <div className="nav-actions">
      <Link to="/login">
        <button className="btn-outline">Connexion</button>
      </Link>

      <Link to="/create-poll">
        <button className="btn-solid">Créer un sondage</button>
      </Link>
    </div>
  </nav>

  <div className="hero">
    <div className="hero-tag">Plateforme de sondage en temps réel</div>

    <h1>
      Donnez votre<br />avis. <em>Maintenant.</em>
    </h1>

    <div className="search-wrap">
      <input placeholder="Rechercher un sondage…" />
      <button className="btn-search">Rechercher</button>
    </div>
  </div>

  <div className="content">
    <h2 className="polls-title">Sondages récents</h2>

    <div className="polls-grid">
      <div className="poll-card">
        <div className="poll-title">
          Faut-il instaurer le vote obligatoire en France ?
        </div>
        <div className="poll-votes">4120 votes</div>
      </div>

      <div className="poll-card">
        <div className="poll-title">
          Le télétravail complet devrait-il être la norme ?
        </div>
        <div className="poll-votes">8740 votes</div>
      </div>
    </div>
  </div>
</>

);
}
