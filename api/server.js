const express = require("express");

const app = express();
app.use(express.json({ limit: "200kb" }));

// Test : GET /api/health
app.get("/api/health", (req, res) => res.json({ ok: true }));

// Routes du document (Word + recherche de passages) : voir document.js
app.use(require("./document"));

// Route inconnue : réponse JSON
app.use((req, res) => {
  res.status(404).json({ message: `Route introuvable : ${req.method} ${req.originalUrl}` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API sur le port ${PORT}`);
  if (!process.env.ANTHROPIC_API_KEY) console.warn("ANTHROPIC_API_KEY manquante");
});