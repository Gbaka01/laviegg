import { Link } from "react-router-dom";

function Footer() {
  const ouvrirCookies = () => window.dispatchEvent(new Event("ouvrir-cookies"));

  return (
    <footer className="bg-dark text-light text-center py-3 mt-auto">
      <p className="mb-2">
        GOLI Gore Gbaka © {new Date().getFullYear()} - Tous droits réservés
      </p>
      <p className="mb-0 small">
      
        {" · "}
        <button
          type="button"
          className="btn btn-link link-light p-0 align-baseline small"
          onClick={ouvrirCookies}
        >
          Gérer les cookies
        </button>
      </p>
    </footer>
  );
}

export default Footer;