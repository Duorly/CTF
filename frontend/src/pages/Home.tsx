import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pollService, Sondage } from "../services/poll.service";
import { useAuth } from "../context/AuthContext";
import "../styles/home.css";

export default function Home() {
  const { isAuthenticated, logout } = useAuth();
  const [polls, setPolls] = useState<Sondage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPolls = polls.filter((poll) =>
    poll.titre.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {!isAuthenticated ? (
            <>
              <Link to="/register">
                <button className="btn-outline">Inscription</button>
              </Link>
              <Link to="/login">
                <button className="btn-solid">Connexion</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/create-poll">
                <button className="btn-outline">Créer un sondage</button>
              </Link>
              <button className="btn-solid" onClick={logout}>Déconnexion</button>
            </>
          )}
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
          <input 
            placeholder="Rechercher un sondage…" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn-search">Rechercher</button>
        </div>
      </div>

      <div className="content">
        <h2 className="polls-title">
          {searchQuery ? `Résultats pour "${searchQuery}"` : "Sondages récents"}
        </h2>

        {loading ? (
          <div className="loading">Chargement...</div>
        ) : (
          <div className="polls-grid">
            {filteredPolls.length > 0 ? (
              filteredPolls.map((poll) => (
                <Link key={poll.id_sondage} to={`/poll/${poll.id_sondage}`} className="poll-card">
                  <div className="poll-title">{poll.titre}</div>
                  <div className="poll-description">{poll.description}</div>
                  <div className="poll-info">
                    <span className="poll-options-count">{poll.options.length} options</span>
                    <span className="poll-votes-count">
                      {poll.options.reduce((acc, opt) => acc + (opt.nbVotes || 0), 0)} votes
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="no-polls">
                {searchQuery 
                  ? `Aucun sondage ne correspond à "${searchQuery}"` 
                  : "Aucun sondage disponible pour le moment."}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
