require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Autorise uniquement le front (prod + dev)
app.use(
  cors({
    origin: ["https://laviegg.fr", "https://www.laviegg.fr", "http://localhost:5173"],
    methods: ["GET", "POST"],
  })
);

// Lecture du JSON envoyé par axios.post (question + historique)
app.use(express.json({ limit: "1mb" }));

// Test rapide : GET /api/health
app.get("/api/health", (req, res) => res.json({ ok: true }));

// Routes du document (Word + recherche de passages) : voir document.js
app.use(require("./document"));

// Route inconnue : réponse JSON
app.use((req, res) => {
  res.status(404).json({ message: `Route introuvable : ${req.method} ${req.originalUrl}` });
});

// Erreur serveur : réponse JSON (au lieu d'une page HTML)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Erreur serveur" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API sur le port ${PORT}`);
  if (!process.env.ANTHROPIC_API_KEY) console.warn("ANTHROPIC_API_KEY manquante");
});