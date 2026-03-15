import { useState } from "react";
import Inicio      from "./components/Inicio";
import Vocabulario from "./components/Vocabulario";
import Flashcards  from "./components/Flashcards";
import Gramatica   from "./components/Gramatica";
import Tons        from "./components/Tons";
import Alfabeto    from "./components/Alfabeto";
import Numeros     from "./components/Numeros";
import Conversacao from "./components/Conversacao";
import Quiz        from "./components/Quiz";
import Ordenar     from "./components/Ordenar";
import { LangProvider, useLang } from "./contexts/LangContext";

const TABS_OVERVIEW  = [{ id: "inicio", label: "Início",    icon: "🏠" }];
const TABS_LEARN = [
  { id: "tons",  label: "Tons",       icon: "🎵" },
  { id: "alfa",  label: "Alfabeto",   icon: "🔤" },
  { id: "gram",  label: "Gramática",  icon: "🏗️" },
  { id: "nums",  label: "Números",    icon: "🔢" },
  { id: "conv",  label: "Frases",     icon: "💬" },
];
const TABS_PRACTICE = [
  { id: "vocab",   label: "Vocabulário",  icon: "📚" },
  { id: "flash",   label: "Flashcards",   icon: "🎴" },
  { id: "quiz",    label: "Quiz",         icon: "🎯" },
  { id: "ordenar", label: "Montar Frase", icon: "🧩" },
];

function AppInner() {
  const [tab, setTab] = useState("inicio");
  const { lang, setLang } = useLang();

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="flag">🇻🇳</span>
          <div>
            <h1>Vietnamita</h1>
            <p>{lang === "en" ? "Study Guide" : "Guia de Estudo"}</p>
          </div>
        </div>
        <nav>
          <div className="sidebar-section-label">{lang === "en" ? "Overview" : "Visão Geral"}</div>
          {TABS_OVERVIEW.map((t) => (
            <button key={t.id} className={`nav-btn ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
              <span className="nav-icon">{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
          <div className="sidebar-section-label">{lang === "en" ? "Learn" : "Aprenda"}</div>
          {TABS_LEARN.map((t) => (
            <button key={t.id} className={`nav-btn ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
              <span className="nav-icon">{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
          <div className="sidebar-section-label">{lang === "en" ? "Practice" : "Pratique"}</div>
          {TABS_PRACTICE.map((t) => (
            <button key={t.id} className={`nav-btn ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
              <span className="nav-icon">{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button
            className={`lang-toggle-btn ${lang === "pt" ? "lang-active" : ""}`}
            onClick={() => setLang("pt")}
          >🇧🇷 PT</button>
          <button
            className={`lang-toggle-btn ${lang === "en" ? "lang-active" : ""}`}
            onClick={() => setLang("en")}
          >🇬🇧 EN</button>
        </div>
      </aside>

      <main className="content">
        <div className="content-inner">
          {tab === "inicio"   && <Inicio onNavigate={setTab} />}
          {tab === "tons"     && <Tons />}
          {tab === "alfa"     && <Alfabeto />}
          {tab === "gram"     && <Gramatica />}
          {tab === "nums"     && <Numeros />}
          {tab === "conv"     && <Conversacao />}
          {tab === "vocab"    && <Vocabulario />}
          {tab === "flash"    && <Flashcards />}
          {tab === "quiz"     && <Quiz />}
          {tab === "ordenar"  && <Ordenar />}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  );
}
