import { useEffect, useRef, useState } from "react";
import axios from "axios";

const API_URL = "/api/document";

function Document() {
  const [info, setInfo] = useState(null); // { nom, caracteres }
  const [question, setQuestion] = useState("");
  const [historique, setHistorique] = useState([]); // [{ question, reponse }]
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState("");
  const finRef = useRef(null);

  // Vérifie au chargement que le document est bien lisible
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`${API_URL}/info`, { signal: controller.signal })
      .then((res) => {
        // Vérifie qu'on a bien reçu le JSON de l'API, et non une page HTML
        if (typeof res.data !== "object" || typeof res.data.caracteres !== "number") {
          throw new Error(
            "L'API ne répond pas : vérifiez qu'elle est lancée et que le proxy /api est configuré"
          );
        }
        setInfo(res.data);
      })
      .catch((err) => {
        if (err.name !== "CanceledError") {
          setErreur(err.response?.data?.message || err.message || "Impossible de joindre l'API");
        }
      });
    return () => controller.abort();
  }, []);

  // Fait défiler vers la dernière réponse
  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [historique, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const q = question.trim();
    if (!q || loading) return;

    setLoading(true);
    setErreur("");

    try {
      const res = await axios.post(API_URL, {
        question: q,
        historique: historique.slice(-5), // contexte pour les questions de suivi
      });
      const reponse = res.data?.reponse || "Aucune réponse reçue.";
      setHistorique((h) => [...h, { question: q, reponse }]);
      setQuestion("");
    } catch (err) {
      setErreur(err.response?.data?.message || err.message || "Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 750 }}>
      <h1 className="h3 mb-2">Questions sur le document</h1>

      <p className="text-muted mb-4">
        {info
          ? `Document chargé : ${info.nom} (${Number(info.caracteres || 0).toLocaleString("fr-FR")} caractères)`
          : erreur
            ? "Document non disponible."
            : "Vérification du document..."}
      </p>

      {historique.length === 0 && info && (
        <div className="alert alert-light border">
          Posez n'importe quelle question : Claude répond uniquement à partir du document.
        </div>
      )}

      {historique.map((item, i) => (
        <div key={i} className="mb-4">
          <div className="p-3 bg-primary text-white rounded mb-2 ms-5">{item.question}</div>
          <div className="p-3 bg-light border rounded me-5" style={{ whiteSpace: "pre-wrap" }}>
            {item.reponse}
          </div>
        </div>
      ))}

      {loading && (
        <div className="text-muted mb-3">
          <span className="spinner-border spinner-border-sm me-2" />
          Claude lit le document...
        </div>
      )}

      {erreur && <div className="alert alert-danger">Erreur : {erreur}</div>}

      <div ref={finRef} />

      <form onSubmit={handleSubmit} className="d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Posez une question sur le document..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading || !info}
          maxLength={2000}
          autoFocus
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || !info || !question.trim()}
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default Document;