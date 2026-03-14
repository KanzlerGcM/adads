import { useState } from "react";
import Vocabulario from "./components/Vocabulario";
import Flashcards  from "./components/Flashcards";
import Gramatica   from "./components/Gramatica";
import Tons        from "./components/Tons";
import Numeros     from "./components/Numeros";
import Conversacao from "./components/Conversacao";

const TABS = [
  { id: "vocab", label: "Vocabulário",   icon: "📚" },
  { id: "flash", label: "Flashcards",    icon: "🎴" },
  { id: "gram",  label: "Gramática",     icon: "🏗️" },
  { id: "tons",  label: "Tons",          icon: "🎵" },
  { id: "nums",  label: "Números",       icon: "🔢" },
  { id: "conv",  label: "Conversação",   icon: "💬" },
];

export default function App() {
  const [tab, setTab] = useState("vocab");

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="flag">🇻🇳</span>
          <div>
            <h1>Vietnamita</h1>
            <p>Guia de Estudo</p>
          </div>
        </div>
        <nav>
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`nav-btn ${tab === t.id ? "active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              <span className="nav-icon">{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="content">
        {tab === "vocab" && <Vocabulario />}
        {tab === "flash" && <Flashcards />}
        {tab === "gram"  && <Gramatica />}
        {tab === "tons"  && <Tons />}
        {tab === "nums"  && <Numeros />}
        {tab === "conv"  && <Conversacao />}
      </main>
    </div>
  );
}
