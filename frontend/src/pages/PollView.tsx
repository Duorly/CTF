import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/poll-view.css";

type PollOption = {
  key: string;
  label: string;
  pct: number;
  votes: number;
};

const options: PollOption[] = [
  { key: "ChatGPT", label: "ChatGPT (OpenAI)", pct: 43, votes: 36210 },
  { key: "Claude", label: "Claude (Anthropic)", pct: 28, votes: 23579 },
  { key: "Gemini", label: "Gemini (Google)", pct: 17, votes: 14316 },
  { key: "Mistral", label: "Mistral AI", pct: 6, votes: 5053 },
  { key: "Copilot", label: "GitHub Copilot / Microsoft", pct: 4, votes: 3368 },
  { key: "Autre", label: "Autre", pct: 2, votes: 1684 },
];

export default function PollView() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const selectedLabel = options.find((o) => o.key === selectedOption)?.label;

  const handleVote = () => {
    if (!selectedOption) return;
    setHasVoted(true);
  };

  return (
    <>
      <nav className="main-nav">
        <Link to="/home" className="logo">
          <span className="logo-dot"></span>
          <span className="logo-pulse">Pulse</span>
          <span className="logo-vote">Vote</span>
        </Link>

        <div className="nav-actions">
          <Link to="/login">
            <button className="btn-outline">Connexion</button>
          </Link>

          <Link to="/create-poll">
            <button className="btn-solid">Créer un sondage</button>
          </Link>
        </div>
      </nav>

      <div className="page">
        <div className="breadcrumb">
          <Link to="/home">Accueil</Link>
          <span>›</span>
          <span className="current">Sondage #84210</span>
        </div>

        <div className="main-col">
          <div className="poll-header-card">
            <div className="poll-header-top">
              <div className="category-badge">Technologie</div>
            </div>

            <h1 className="poll-question">
              Quelle IA générative utilisez-vous le plus au quotidien ?
            </h1>

            <div className="poll-meta-row">
              <div className="meta-pill live">
                <span className="live-dot"></span>
                En cours
              </div>
              <div className="meta-pill">
                <strong>84 210</strong>&nbsp;votes
              </div>
              <div className="meta-pill">
                Encore <strong>3 jours</strong>
              </div>
            </div>
          </div>

          <div className="vote-card">
            <div className="vote-card-title">Votre vote</div>

            {!hasVoted ? (
              <>
                <div className="vote-options">
                  {options.map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      className={
                        selectedOption === option.key
                          ? "vote-option selected"
                          : "vote-option"
                      }
                      onClick={() => setSelectedOption(option.key)}
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
              <>
                <div className="vote-success">
                  Vote enregistré ! Vous avez voté pour{" "}
                  <strong>{selectedLabel}</strong>
                </div>

                <div className="vote-options">
                  {options.map((option) => {
                    const isWinner = option.key === "ChatGPT";
                    const isVoted = option.key === selectedOption;

                    return (
                      <div
                        key={option.key}
                        className={
                          isWinner
                            ? "vote-option voted winner"
                            : "vote-option voted"
                        }
                      >
                        <div
                          className={
                            isWinner
                              ? "voted-fill winner-fill"
                              : "voted-fill"
                          }
                          style={{ width: `${option.pct}%` }}
                        />

                        <div className="vote-option-inner">
                          <span
                            className={
                              isVoted
                                ? "check-circle winner-check"
                                : "check-circle"
                            }
                          >
                            {isVoted ? "✓" : "○"}
                          </span>

                          <span className="opt-text">{option.label}</span>

                          <span className="voted-count">
                            {option.votes.toLocaleString("fr-FR")} votes
                          </span>

                          <span
                            className={
                              isWinner ? "voted-pct top" : "voted-pct"
                            }
                          >
                            {option.pct}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <div className="chart-title">Résultats détaillés</div>
              <div className="chart-total">84 210 participants</div>
            </div>

            <div className="chart-bars">
              {options.map((option) => (
                <div className="chart-row" key={option.key}>
                  <div className="chart-row-label">
                    <span>{option.label}</span>
                    <strong>{option.pct}%</strong>
                  </div>

                  <div className="chart-bar-track">
                    <div
                      className="chart-bar-fill"
                      style={{ width: `${option.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sidebar-col">
          <div className="sidebar-card">
            <div className="sidebar-card-label">Créateur du sondage</div>

            <div className="creator-profile">
              <div className="creator-avatar-lg av-e">LM</div>
              <div>
                <div className="creator-name-lg">Léa Martin</div>
                <div className="creator-handle">
                  @leamrtn · Créé le 3 mai 2026
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <div className="sidebar-card-label">Partager ce sondage</div>

            <div className="copy-link-wrap">
              <span className="copy-link-url">
                pulsevote.fr/s/84210-quelle-ia
              </span>
              <button className="copy-link-btn">Copier</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}