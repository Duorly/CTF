import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/create-poll.css";

type PollForm = {
  question: string;
  category: string;
  options: string[];
};

export default function CreatePoll() {
  const navigate = useNavigate();

  const [form, setForm] = useState<PollForm>({
    question: "",
    category: "tech",
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanedOptions = form.options.filter((option) => option.trim() !== "");

    console.log("Sondage créé :", {
      ...form,
      options: cleanedOptions,
    });

    alert("Sondage publié !");
    navigate("/");
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
              <label htmlFor="question">Votre question</label>
              <div className="field-wrap">
                <textarea
                  id="question"
                  placeholder="ex: Quel est votre langage de programmation préféré ?"
                  value={form.question}
                  onChange={(e) =>
                    setForm({ ...form, question: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="category">Catégorie</label>
              <div className="field-wrap">
                <select
                  id="category"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  <option value="tech">Technologie</option>
                  <option value="politique">Politique</option>
                  <option value="sport">Sport</option>
                  <option value="culture">Culture</option>
                  <option value="autre">Autre</option>
                </select>
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
              >
                + Ajouter une option
              </button>
            </div>

            <button type="submit" className="btn-submit">
              Publier le sondage
            </button>
          </form>
        </div>
      </div>
    </>
  );
}