import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { pollService } from "../services/poll.service";
import "../styles/create-poll.css";

type PollForm = {
  titre: string;
  description: string;
  options: string[];
};

export default function CreatePoll() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<PollForm>({
    titre: "",
    description: "",
    options: ["", ""],
  });

  const addOption = () => {
    setForm({
      ...form,
      options: [...form.options, ""],
    });
  };

  const removeOption = (index: number) => {
    setForm({
      ...form,
      options: form.options.filter((_, optionIndex) => optionIndex !== index),
    });
  };

  const updateOption = (index: number, value: string) => {
    const updatedOptions = [...form.options];
    updatedOptions[index] = value;

    setForm({
      ...form,
      options: updatedOptions,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.titre.trim()) {
      alert("Le titre est obligatoire");
      return;
    }

    const cleanedOptions = form.options
      .filter((option) => option.trim() !== "")
      .map((label) => ({ label }));

    if (cleanedOptions.length < 2) {
      alert("Il faut au moins 2 options valides");
      return;
    }

    setIsSubmitting(true);
    try {
      await pollService.createPoll({
        titre: form.titre,
        description: form.description,
        options: cleanedOptions,
      });

      alert("Sondage publié !");
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la création du sondage:", error);
      alert("Une erreur est survenue lors de la création du sondage.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <nav className="main-nav">
        <Link to="/" className="logo">
          <span className="logo-dot"></span>
          <span className="logo-pulse">Pulse</span>
          <span className="logo-vote">Vote</span>
        </Link>

        <div className="nav-actions">
          <Link to="/login">
            <button className="btn-outline">connexion</button>
          </Link>
        </div>
      </nav>

      <div className="create-wrapper">
        <div className="create-card">
          <div className="create-header">
            <h1>Créer un sondage</h1>
            <p>
              Lancez une nouvelle discussion et récoltez des avis en temps réel.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="titre">Votre question</label>
              <div className="field-wrap">
                <input
                  type="text"
                  id="titre"
                  placeholder="ex: Quel est votre langage de programmation préféré ?"
                  value={form.titre}
                  onChange={(e) =>
                    setForm({ ...form, titre: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="description">Description (Optionnel)</label>
              <div className="field-wrap">
                <textarea
                  id="description"
                  placeholder="Donnez plus de contexte à votre sondage..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="input-group">
              <label>Options de réponse</label>

              <div className="options-list">
                {form.options.map((option, index) => (
                  <div className="option-item" key={index}>
                    <div className="field-wrap option-input">
                      <input
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        required={index < 2}
                      />
                    </div>

                    {form.options.length > 2 && (
                      <button
                        type="button"
                        className="btn-remove"
                        onClick={() => removeOption(index)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="btn-add-option"
                onClick={addOption}
                disabled={isSubmitting}
              >
                + Ajouter une option
              </button>
            </div>

            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? "Publication en cours..." : "Publier le sondage"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}