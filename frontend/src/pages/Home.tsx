import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pollService, Sondage } from "../services/poll.service";
import "../styles/home.css";

export default function Home() {
  const [polls, setPolls] = useState<Sondage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const data = await pollService.getAllPolls();
        setPolls(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des sondages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  return (
    <>
      <nav className="main-nav">
        <div className="logo">
          <span className="logo-dot"></span>
          <span className="logo-pulse">Pulse</span>
          <span className="logo-vote">Vote</span>
        </div>

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
          Donnez votre
          <br />
          avis. <em>Maintenant.</em>
        </h1>

        <div className="search-wrap">
          <input placeholder="Rechercher un sondage…" />
          <button className="btn-search">Rechercher</button>
        </div>
      </div>

      <div className="content">
        <h2 className="polls-title">Sondages récents</h2>

        {loading ? (
          <div className="loading">Chargement...</div>
        ) : (
          <div className="polls-grid">
            {polls.length > 0 ? (
              polls.map((poll) => (
                <Link key={poll.id_sondage} to={`/poll/${poll.id_sondage}`} className="poll-card">
                  <div className="poll-title">{poll.titre}</div>
                  <div className="poll-description">{poll.description}</div>
                  <div className="poll-info">
                    <span className="poll-options-count">{poll.options.length} options</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="no-polls">Aucun sondage disponible pour le moment.</div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
