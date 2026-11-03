import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Home.css";

const EXEMPLES = [
  "Où GOLI Gore Gbaka a-t-il grandi ?",
  "Quels sont les grands tournants de sa vie ?",
  "Que raconte-t-il sur sa famille ?",
  "Quelles leçons tire-t-il de son parcours ?",
];

const ETAPES = [
  { num: "1", titre: "Posez votre question", texte: "En français, avec vos mots, comme à un ami." },
  { num: "2", titre: "Le livre est consulté", texte: "Plus de 700 pages sont parcourues pour trouver les passages utiles." },
  { num: "3", titre: "Recevez la réponse", texte: "Une réponse claire, tirée directement du récit." },
];

export default function Home() {
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();

  const envoyer = (e) => {
    e.preventDefault();
    const q = question.trim();
    navigate(q ? `/document?q=${encodeURIComponent(q)}` : "/document");
  };

  return (
    <div className="home">
      <header className="home-nav">
        <Link to="/" className="logo">La Vie <span>GG</span></Link>
        <nav>
          <a href="#apropos">À propos</a>
          <a href="#fonctionnement">Comment ça marche</a>
          <Link to="/document" className="btn btn-small">Explorer</Link>
        </nav>
      </header>

      <section className="hero">
        <p className="eyebrow">Le récit d'une vie</p>
        <h1>La vie de <em>GOLI Gore Gbaka</em></h1>
        <p className="hero-sub">
          Plus de 700 pages de souvenirs, d'histoires et de réflexions.
          Posez vos questions, le livre vous répond.
        </p>

        <form className="ask" onSubmit={envoyer}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Posez une question sur sa vie…"
            aria-label="Votre question"
          />
          <button type="submit" className="btn">Demander</button>
        </form>

        <div className="exemples">
          {EXEMPLES.map((ex) => (
            <button key={ex} type="button" onClick={() => setQuestion(ex)}>
              {ex}
            </button>
          ))}
        </div>
      </section>

      <section id="apropos" className="section apropos">
        <div className="apropos-texte">
          <h2>Un livre, une vie</h2>
          <p>
            Ce site rassemble l'histoire de GOLI Gore Gbaka : son enfance, ses
            rencontres, ses combats et ses joies. Plutôt que de lire les 700 pages
            d'une traite, vous pouvez dialoguer avec le récit et aller droit à ce
            qui vous intéresse.
          </p>
        </div>
        <div className="stats">
          <div><strong>700+</strong><span>pages</span></div>
          <div><strong>1</strong><span>vie racontée</span></div>
          <div><strong>∞</strong><span>questions possibles</span></div>
        </div>
      </section>

      <section id="fonctionnement" className="section">
        <h2>Comment ça marche</h2>
        <div className="etapes">
          {ETAPES.map((e) => (
            <article key={e.num} className="etape">
              <span className="etape-num">{e.num}</span>
              <h3>{e.titre}</h3>
              <p>{e.texte}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta">
        <h2>Prêt à découvrir son histoire ?</h2>
        <Link to="/document" className="btn btn-light">Commencer l'exploration</Link>
      </section>

      <footer className="home-footer">
        © {new Date().getFullYear()} GOLI Gore Gbaka — laviegg.fr
      </footer>
    </div>
  );
}