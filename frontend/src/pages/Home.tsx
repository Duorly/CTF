import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pollService, Sondage, Stats } from "../services/poll.service";
import { useAuth } from "../context/AuthContext";
import "../styles/home.css";

export default function Home() {
  const { isAuthenticated, logout } = useAuth();
  const [polls, setPolls] = useState<Sondage[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "votes">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const getPollVotes = (poll: Sondage) => 
    poll.options.reduce((acc, opt) => acc + (opt.nbVotes || 0), 0);

  const filteredPolls = polls
    .filter((poll) =>
      poll.titre.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === "date") {
        comparison = new Date(a.creat_at || 0).getTime() - new Date(b.creat_at || 0).getTime();
      } else {
        comparison = getPollVotes(a) - getPollVotes(b);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pollsData, statsData] = await Promise.all([
          pollService.getAllPolls(),
          pollService.getStats()
        ]);
        setPolls(pollsData);
        setStats(statsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        <div className="hero-tag-row">
          <div className="hero-tag">Plateforme de sondage en temps réel</div>
          {stats && (
            <div className="meta-pill live">
              <span className="live-dot"></span>
              <strong>{stats.totalVotes.toLocaleString()}</strong>&nbsp;votes enregistrés
            </div>
          )}
        </div>

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
        {stats && stats.mostPopularPollId && (
          <div className="featured-section">
            <h2 className="section-title">À ne pas manquer</h2>
            <Link to={`/poll/${stats.mostPopularPollId}`} className="poll-card featured">
              <div className="featured-badge">Sondage le plus populaire</div>
              <div className="poll-title">{stats.mostPopularPollTitle}</div>
              <div className="poll-info">
                <span className="poll-votes-count">
                  <strong>{stats.mostPopularPollVotes}</strong> votes au total
                </span>
                <span className="poll-action-link">Participer maintenant →</span>
              </div>
            </Link>
          </div>
        )}

        <div className="content-header">
          <h2 className="polls-title">
            {searchQuery ? `Résultats pour "${searchQuery}"` : "Sondages récents"}
          </h2>

          <div className="sort-controls">
            <div className="sort-group">
              <label>Trier par</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
                <option value="date">Date de création</option>
                <option value="votes">Nombre de votants</option>
              </select>
            </div>
            <div className="sort-group">
              <label>Ordre</label>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as any)}>
                <option value="desc">Décroissant</option>
                <option value="asc">Croissant</option>
              </select>
            </div>
          </div>
        </div>

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
