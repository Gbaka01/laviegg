const express = require("express");
const path = require("path");
const fs = require("fs");
const mammoth = require("mammoth");
const Anthropic = require("@anthropic-ai/sdk");


const app = express();
app.use(express.json({ limit: "200kb" }));

const PORT = process.env.PORT || 3000;
const DOCUMENT_PATH = path.join(__dirname, "data", "document.docx");
const MODELE = process.env.CLAUDE_MODEL || "claude-sonnet-4-5";
const MAX_CARACTERES = 150000; // limite de texte envoyé à Claude

const claude = new Anthropic(); // lit ANTHROPIC_API_KEY dans l'environnement

/* ------------------------------------------------------------
   Lecture du Word (mise en cache tant que le fichier ne change pas)
   ------------------------------------------------------------ */
let cache = { mtime: 0, texte: "" };

async function lireDocument() {
  const stat = fs.statSync(DOCUMENT_PATH); // erreur si le fichier n'existe pas
  if (stat.mtimeMs !== cache.mtime) {
    const { value } = await mammoth.extractRawText({ path: DOCUMENT_PATH });
    cache = { mtime: stat.mtimeMs, texte: value.trim() };
    console.log(`Document relu : ${cache.texte.length} caractères`);
  }
  return cache.texte;
}

/* ------------------------------------------------------------
   Routes
   ------------------------------------------------------------ */

// Test : GET /api/health
app.get("/api/health", (req, res) => res.json({ ok: true }));

// Infos sur le document : GET /api/document/info
app.get("/api/document/info", async (req, res) => {
  try {
    const texte = await lireDocument();
    if (!texte) return res.status(500).json({ message: "Le document Word est vide" });
    res.json({ nom: path.basename(DOCUMENT_PATH), caracteres: texte.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "document.docx introuvable dans api/data/" });
  }
});

// Question sur le document : POST /api/document
app.post("/api/document", async (req, res) => {
  const question = String(req.body.question || "").trim();
  if (!question) return res.status(400).json({ message: "Question vide" });
  if (question.length > 2000) return res.status(400).json({ message: "Question trop longue" });

  // Historique optionnel pour les questions de suivi
  const historique = Array.isArray(req.body.historique) ? req.body.historique.slice(-5) : [];

  let texte;
  try {
    texte = (await lireDocument()).slice(0, MAX_CARACTERES);
    if (!texte) return res.status(500).json({ message: "Le document Word est vide" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Impossible de lire document.docx" });
  }

  const messages = [];
  for (const h of historique) {
    if (h && typeof h.question === "string" && typeof h.reponse === "string") {
      messages.push({ role: "user", content: h.question.slice(0, 2000) });
      messages.push({ role: "assistant", content: h.reponse.slice(0, 4000) });
    }
  }
  messages.push({ role: "user", content: question });

  try {
    const msg = await claude.messages.create({
      model: MODELE,
      max_tokens: 1024,
      system:
        "Tu es un assistant qui répond en français UNIQUEMENT à partir du document fourni. " +
        "Si la réponse n'est pas dans le document, réponds : " +
        "« Cette information n'est pas dans le document. » N'invente rien. " +
        "Quand c'est utile, cite le passage du document sur lequel tu t'appuies.\n\n" +
        `<document>\n${texte}\n</document>`,
      messages,
    });

    const reponse = msg.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n");

    res.json({ reponse });
  } catch (err) {
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({
      message:
        status === 401 ? "Clé API Anthropic invalide"
        : status === 429 ? "Trop de requêtes, réessayez plus tard"
        : status === 404 ? "Modèle Claude introuvable : vérifiez CLAUDE_MODEL dans api/.env"
        : "Erreur lors de l'appel à Claude",
    });
  }
});
// Route inconnue : réponse JSON plutôt que la page HTML d'Express
app.use((req, res) => {
  res.status(404).json({ message: `Route introuvable : ${req.method} ${req.originalUrl}` });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API sur le port ${PORT}`);
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn("ANTHROPIC_API_KEY manquante dans api/.env");
  }
});
