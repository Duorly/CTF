import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { pollService, Sondage } from "../services/poll.service";
import { useAuth } from "../context/AuthContext";
import "../styles/poll-view.css";

export default function PollView() {
  const { isAuthenticated, logout } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [poll, setPoll] = useState<Sondage | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const fetchPoll = async () => {
      if (!id) return;
      try {
        const data = await pollService.getPollById(parseInt(id));
        setPoll(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du sondage:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoll();
  }, [id]);

  const handleVote = () => {
    if (!selectedOption) return;
    // Note: Voting logic would go here, calling a vote service
    setHasVoted(true);
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (!poll) return <div className="error">Sondage non trouvé</div>;

  return (
    <>
      <nav className="main-nav">
        <Link to="/" className="logo">
          <span className="logo-dot"></span>
          <span className="logo-pulse">Pulse</span>
          <span className="logo-vote">Vote</span>
        </Link>

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

      <div className="page">
        <div className="breadcrumb">
          <Link to="/">Accueil</Link>
          <span>›</span>
          <span className="current">Sondage #{poll.id_sondage}</span>
        </div>

        <div className="main-col">
          <div className="poll-header-card">
            <h1 className="poll-question">{poll.titre}</h1>
            <p className="poll-description">{poll.description}</p>

            <div className="poll-meta-row">
              <div className="meta-pill live">
                <span className="live-dot"></span>
                En cours
              </div>
              <div className="meta-pill">
                <strong>{poll.options.length}</strong>&nbsp;options
              </div>
            </div>
          </div>

          <div className="vote-card">
            <div className="vote-card-title">{hasVoted ? "Résultats" : "Votre vote"}</div>

            {!hasVoted ? (
              <>
                <div className="vote-options">
                  {poll.options.map((option) => (
                    <button
                      key={option.id_option}
                      type="button"
                      className={
                        selectedOption === option.id_option
                          ? "vote-option selected"
                          : "vote-option"
                      }
                      onClick={() => setSelectedOption(option.id_option || null)}
                    >
                      <div className="radio-ring">
                        <div className="radio-dot"></div>
                      </div>
                      <span className="opt-text">{option.label}</span>
                    </button>
                  ))}
                </div>

                <button
                  className="btn-vote"
                  disabled={!selectedOption}
                  onClick={handleVote}
                >
                  Voter
                </button>

                <p className="vote-footnote">
                  Vote anonyme · Un seul vote autorisé
                </p>
              </>
            ) : (
              <div className="vote-success">
                Vote enregistré ! (Simulation : les résultats réels nécessitent une implémentation du service de vote)
              </div>
            )}
          </div>
        </div>

        <div className="sidebar-col">
          <div className="sidebar-card">
            <div className="sidebar-card-label">Partager ce sondage</div>

            <div className="copy-link-wrap">
              <span className="copy-link-url">
                pulsevote.fr/poll/{poll.id_sondage}
              </span>
              <button className="copy-link-btn" onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Lien copié !");
              }}>Copier</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}