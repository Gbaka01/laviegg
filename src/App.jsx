import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BandeauCookies from "./components/BandeauCookies";
import Document from "./pages/Document";
import NotFound from "./pages/NotFound";
import Mentions from "./pages/Mentions";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
        <Route path="/mentions-legales" element={<Mentions />} />
          <Route path="/" element={<Navigate to="/document" replace />} />
          <Route path="/document" element={<Document />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BandeauCookies />
    </BrowserRouter>
  );
}

export default App;