import { useState, useEffect, useCallback } from "react";
import { palavras, categorias, CAT_COLORS } from "../data/vocabulario";

const STORAGE_KEY = "vn_known";
const loadKnown = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
const saveKnown = (obj) => localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Flashcards() {
  const [mode, setMode]               = useState("vn2pt");
  const [catFilter, setCatFilter]     = useState("Todos");
  const [onlyUnknown, setOnlyUnknown] = useState(false);
  const [flipped, setFlipped]         = useState(false);
  const [idx, setIdx]                 = useState(0);
  const [known, setKnown]             = useState(loadKnown);
  const [deck, setDeck]               = useState([]);

  const buildDeck = useCallback(() => {
    let list = [...palavras];
    if (catFilter !== "Todos") list = list.filter((p) => p.categoria === catFilter);
    if (onlyUnknown) list = list.filter((p) => !loadKnown()[p.vn]);
    setDeck(shuffle(list));
    setIdx(0);
    setFlipped(false);
  }, [catFilter, onlyUnknown]);

  useEffect(() => { buildDeck(); }, [buildDeck]);

  const markKnown = (isKnown) => {
    if (!deck[idx]) return;
    const next = { ...known };
    if (isKnown) next[deck[idx].vn] = true;
    else delete next[deck[idx].vn];
    setKnown(next);
    saveKnown(next);
    goNext();
  };

  const goNext = () => {
    setFlipped(false);
    setTimeout(() => setIdx((i) => Math.min(i + 1, deck.length - 1)), 120);
  };
  const goPrev = () => {
    setFlipped(false);
    setTimeout(() => setIdx((i) => Math.max(i - 1, 0)), 120);
  };

  const card      = deck[idx];
  const knownCount = Object.keys(known).length;
  const progress  = deck.length > 1 ? (idx / (deck.length - 1)) * 100 : 100;

  if (!deck.length) return (
    <div>
      <h2 className="page-title">🎴 Flashcards</h2>
      <div className="card" style={{ textAlign: "center", padding: "48px" }}>
        <p style={{ fontSize: 40, marginBottom: 12 }}>🎉</p>
        <p style={{ fontSize: 17, fontWeight: 700 }}>Nenhum card para este filtro!</p>
        <p style={{ color: "var(--text-muted)", marginTop: 6 }}>
          Tente mudar a categoria ou desativar "Só o que não sei".
        </p>
      </div>
    </div>
  );

  const frontWord  = mode === "vn2pt" ? card.vn : card.pt;
  const backWord   = mode === "vn2pt" ? card.pt : card.vn;
  const frontHint  = mode === "vn2pt" ? "🇻🇳 Vietnamita — clique para revelar" : "🇧🇷 Português — clique para revelar";
  const backHint   = mode === "vn2pt" ? "🇧🇷 Português" : "🇻🇳 Vietnamita";
  const colors     = CAT_COLORS[card.categoria] || { bg: "#f1f5f9", text: "#475569" };

  return (
    <div>
      <h2 className="page-title">🎴 Flashcards</h2>
      <p className="page-subtitle">Clique na carta para revelar. Marque seu progresso com os botões.</p>

      <div className="stats-bar">
        <div className="stat-box">
          <div className="stat-num" style={{ color: "#10b981" }}>{knownCount}</div>
          <div className="stat-label">Já sei ✓</div>
        </div>
        <div className="stat-box">
          <div className="stat-num" style={{ color: "#f59e0b" }}>{palavras.length - knownCount}</div>
          <div className="stat-label">Falta aprender</div>
        </div>
        <div className="stat-box">
          <div className="stat-num">{deck.length}</div>
          <div className="stat-label">Cards neste deck</div>
        </div>
        <div className="stat-box">
          <div className="stat-num">{idx + 1}</div>
          <div className="stat-label">Card atual</div>
        </div>
      </div>

      <div className="card">
        {/* Controls top */}
        <div className="flash-controls-top">
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Modo:</span>
          <button className={`mode-btn ${mode === "vn2pt" ? "active" : ""}`} onClick={() => { setMode("vn2pt"); setFlipped(false); }}>🇻🇳 → 🇧🇷</button>
          <button className={`mode-btn ${mode === "pt2vn" ? "active" : ""}`} onClick={() => { setMode("pt2vn"); setFlipped(false); }}>🇧🇷 → 🇻🇳</button>
          <span style={{ fontSize: 13, color: "var(--text-muted)", marginLeft: 8 }}>Categoria:</span>
          <select className="cat-select" value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
            <option>Todos</option>
            {categorias.map((c) => <option key={c}>{c}</option>)}
          </select>
          <label className="filter-toggle">
            <input type="checkbox" checked={onlyUnknown} onChange={(e) => setOnlyUnknown(e.target.checked)} />
            Só o que não sei
          </label>
        </div>

        {/* Progress */}
        <div className="progress-bar-wrap">
          <div className="progress-bar-meta">
            <span>{idx + 1} de {deck.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Flip card */}
        <div className="flip-scene" onClick={() => setFlipped((f) => !f)}>
          <div className={`flip-card ${flipped ? "flipped" : ""}`}>
            <div className="flip-face flip-front">
              <div className="flip-hint">{frontHint}</div>
              <div className="flip-main-word">{frontWord}</div>
              <span className="cat-badge" style={{ background: colors.bg, color: colors.text, marginTop: 12 }}>
                {card.categoria}
              </span>
            </div>
            <div className="flip-face flip-back">
              <div className="flip-hint">{backHint}</div>
              <div className="flip-main-word" style={{ fontSize: mode === "pt2vn" ? 32 : 32 }}>
                {backWord}
              </div>
              {card.exemplo && (
                <div className="flip-example">ex: {card.exemplo}</div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flash-controls">
          <button className="flash-btn nav" onClick={goPrev} disabled={idx === 0}>← Anterior</button>
          <button className="flash-btn no"  onClick={() => markKnown(false)}>😅 Não sei</button>
          <button className="flash-btn yes" onClick={() => markKnown(true)}>✓ Já sei!</button>
          <button className="flash-btn nav" onClick={goNext} disabled={idx === deck.length - 1}>Próximo →</button>
        </div>

        {idx === deck.length - 1 && (
          <div className="deck-done">
            <p>🎉 Fim do deck! Muito bem!</p>
            <button className="reshuffle-btn" onClick={buildDeck}>🔀 Embaralhar novamente</button>
          </div>
        )}
      </div>
    </div>
  );
}
