import { useEffect, useState } from "react";
import "./BandeauCookies.css";
import { Link } from "react-router-dom";
// ...

const CLE = "consentement-cookies";
const DUREE_MS = 1000 * 60 * 60 * 24 * 182; // ~6 mois, puis on redemande

function lireChoix() {
  try {
    const c = JSON.parse(localStorage.getItem(CLE));
    if (c && Date.now() - c.date < DUREE_MS) return c;
  } catch (e) {}
  return null;
}

function appliquer(analytics) {
  window.gtag?.("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
  });
}

export default function BandeauCookies() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!lireChoix()) setVisible(true);
    // Permet de rouvrir le bandeau depuis le footer
    const rouvrir = () => setVisible(true);
    window.addEventListener("ouvrir-cookies", rouvrir);
    return () => window.removeEventListener("ouvrir-cookies", rouvrir);
  }, []);

  const choisir = (analytics) => {
    try {
      localStorage.setItem(CLE, JSON.stringify({ analytics, date: Date.now() }));
    } catch (e) {}
    appliquer(analytics);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="bandeau-cookies" role="dialog" aria-live="polite" aria-label="Consentement aux cookies">
      <p>
        Ce site utilise des cookies de mesure d'audience (Google Analytics) pour
        comprendre comment il est consulté. Ils ne sont déposés qu'avec votre accord.{" "}
        <Link to="/mentions-legales">En savoir plus</Link>
      </p>
      <div className="bandeau-cookies__boutons">
        <button type="button" onClick={() => choisir(false)}>Tout refuser</button>
        <button type="button" onClick={() => choisir(true)}>Tout accepter</button>
      </div>
    </div>
  );
}