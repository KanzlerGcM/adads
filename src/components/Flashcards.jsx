import { useState, useEffect, useCallback, useRef } from "react";
import { palavras, categorias, CAT_COLORS } from "../data/vocabulario";
import { homeworks } from "../data/homeworks";
import { useLang } from "../contexts/LangContext";

const HW_LOOKUP = {};
homeworks.forEach(hw => hw.palavrasNovas.forEach(w => { HW_LOOKUP[w.vn] = w; }));

const CAT_DEFS = {
  "Verbo":         { icon: "⚡", pt: "Ação ou estado — o que alguém faz ou é.", en: "Action or state — what someone does or is.", ex: "ăn = comer · ngủ = dormir · là = ser/estar" },
  "Adjetivo":      { icon: "🎨", pt: "Descreve ou qualifica um substantivo. Em vietnamita vem DEPOIS do substantivo.", en: "Describes a noun. In Vietnamese it comes AFTER the noun.", ex: "đẹp = bonito · lớn = grande · rộng = espaçoso" },
  "Substantivo":   { icon: "🏷️", pt: "Pessoa, lugar ou coisa.", en: "Person, place or thing.", ex: "nhà = casa · sách = livro · người = pessoa" },
  "Pronome":       { icon: "👤", pt: "Substitui o nome de uma pessoa. Variam por idade e relação social em vietnamita.", en: "Replaces a person's name. In Vietnamese they vary by age and relationship.", ex: "tôi = eu · anh = você (homem) · em = eu (falando com mais velho)" },
  "Advérbio":      { icon: "📐", pt: "Modifica um verbo ou adjetivo. Indica grau, tempo ou negação.", en: "Modifies a verb or adjective. Indicates degree, time or negation.", ex: "rất = muito · không = não · sẽ = futuro" },
  "Número":        { icon: "🔢", pt: "Número cardinal ou ordinal. Vem antes do substantivo.", en: "Cardinal or ordinal number. Comes before the noun.", ex: "một = 1 · mười = 10 · trăm = 100" },
  "Expressão":     { icon: "💬", pt: "Frase idiomática com sentido fixo usada no dia a dia.", en: "Fixed idiomatic phrase used in daily conversation.", ex: "Cảm ơn = Obrigado · Xin lỗi = Desculpe" },
  "Saudação":      { icon: "👋", pt: "Cumprimento, despedida ou expressão de cortesia.", en: "Greeting, farewell or polite expression.", ex: "Xin chào = Olá · Tạm biệt = Tchau" },
  "Partícula":     { icon: "🔹", pt: "Marcador gramatical sem tradução direta. Indica posse, ênfase ou tempo.", en: "Grammatical marker without direct translation. Marks possession, emphasis or tense.", ex: "của = de (posse) · sẽ = futuro · nhé = combinado" },
  "Demonstrativo": { icon: "👉", pt: "Indica posição de algo no espaço. Vem DEPOIS do substantivo.", en: "Indicates position in space. Comes AFTER the noun.", ex: "này = este (perto) · kia = aquele (longe) · đây = aqui" },
  "Classificador": { icon: "📦", pt: "Obrigatório em vietnamita ao contar ou referenciar objetos. Vem antes do substantivo.", en: "Mandatory in Vietnamese when counting or referencing objects. Precedes the noun.", ex: "cái (objetos) · con (animais) · quyển (livros) · ngôi (casas)" },
  "Interrogativo": { icon: "❓", pt: "Palavra de pergunta. Em vietnamita geralmente aparece no final da frase.", en: "Question word. In Vietnamese usually appears at the end of the sentence.", ex: "gì = o quê · đâu = onde · ai = quem · sao = por quê" },
  "Conjunção":     { icon: "🔗", pt: "Conecta palavras ou orações.", en: "Connects words or clauses.", ex: "và = e · nhưng = mas · vì = porque" },
  "Interjeição":   { icon: "😲", pt: "Exclamação espontânea de emoção ou reação.", en: "Spontaneous exclamation of emotion or reaction.", ex: "Ồ! = Oh! · Ôi! = Ai! · Ừ = Uh-hum" },
  "Confirmação":   { icon: "✅", pt: "Resposta afirmativa ou negativa direta.", en: "Direct affirmative or negative reply.", ex: "vâng / có = sim · không = não" },
  "Profissão":     { icon: "💼", pt: "Título ou ocupação de uma pessoa.", en: "Title or occupation of a person.", ex: "bác sĩ = médico · giáo viên = professor" },
  "Nome":          { icon: "🗺️", pt: "Nome próprio de pessoa ou lugar.", en: "Proper name of a person or place.", ex: "Hà Nội · Sài Gòn · Việt Nam" },
};

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
  const { lang } = useLang();
  const isPt = lang !== "en";
  const [mode, setMode]               = useState("vn2pt");
  const [catFilter, setCatFilter]     = useState("Todos");
  const [onlyUnknown, setOnlyUnknown] = useState(false);
  const [flipped, setFlipped]         = useState(false);
  const [idx, setIdx]                 = useState(0);
  const [known, setKnown]             = useState(loadKnown);
  const [deck, setDeck]               = useState([]);
  const [rightPanel, setRightPanel]   = useState("categoria");
  const importRef = useRef(null);

  const exportProgress = () => {
    const data = { vn_known: loadKnown(), vn_hw_status: JSON.parse(localStorage.getItem("vn_hw_status") || "{}") };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `vietnamita-progresso-${new Date().toISOString().slice(0,10)}.json`;
    a.click(); URL.revokeObjectURL(url);
  };

  const importProgress = (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.vn_known)     localStorage.setItem("vn_known",     JSON.stringify(data.vn_known));
        if (data.vn_hw_status) localStorage.setItem("vn_hw_status", JSON.stringify(data.vn_hw_status));
        setKnown(loadKnown());
        alert(isPt ? "Progresso restaurado com sucesso!" : "Progress restored successfully!");
      } catch { alert(isPt ? "Arquivo invalido." : "Invalid file."); }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const buildDeck = useCallback(() => {
    let list = [...palavras];
    if (catFilter !== "Todos") list = list.filter((p) => p.categoria === catFilter);
    if (onlyUnknown) list = list.filter((p) => !loadKnown()[p.vn]);
    setDeck(shuffle(list));
    setIdx(0);
    setFlipped(false);
  }, [catFilter, onlyUnknown]);

  useEffect(() => { buildDeck(); }, [buildDeck]);

  useEffect(() => {
    const handle = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;
      if (e.key === " ") { e.preventDefault(); setFlipped(f => !f); }
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft")  goPrev();
      else if (e.key === "j" || e.key === "J") markKnown(true);
      else if (e.key === "n" || e.key === "N") markKnown(false);
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck, idx, flipped]);

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

  const card       = deck[idx];
  const knownCount = Object.keys(known).length;
  const progress   = deck.length > 1 ? (idx / (deck.length - 1)) * 100 : 100;
  const hwWord     = card ? HW_LOOKUP[card.vn] : null;
  const catDef     = card ? CAT_DEFS[card.categoria] : null;

  if (!deck.length) return (
    <div>
      <h2 className="page-title">Flashcards</h2>
      <div className="card" style={{ textAlign: "center", padding: "48px" }}>
        <p style={{ fontSize: 40, marginBottom: 12 }}>🎉</p>
        <p style={{ fontSize: 17, fontWeight: 700 }}>Nenhum card para este filtro!</p>
        <p style={{ color: "var(--text-muted)", marginTop: 6 }}>
          Tente mudar a categoria ou desativar "Só o que não sei".
        </p>
      </div>
    </div>
  );

  const frontWord = mode === "vn2pt" ? card.vn : (isPt ? card.pt : card.en);
  const backWord  = mode === "vn2pt" ? (isPt ? card.pt : card.en) : card.vn;
  const frontHint = mode === "vn2pt"
    ? "🇻🇳 Vietnamita — clique para revelar"
    : (isPt ? "🇧🇷 Português — clique para revelar" : "🇬🇧 English — click to reveal");
  const backHint  = mode === "vn2pt"
    ? (isPt ? "🇧🇷 Português" : "🇬🇧 English")
    : "🇻🇳 Vietnamita";
  const colors    = CAT_COLORS[card.categoria] || { bg: "#f1f5f9", text: "#475569" };

  return (
    <div>
      <h2 className="page-title">🎴 Flashcards</h2>
      <p className="page-subtitle">
        {isPt ? "Clique na carta para revelar. Marque seu progresso com os botões." : "Click the card to reveal. Track your progress with the buttons."}
      </p>
      <p className="keyboard-hint">
        ⌨️ {isPt ? "Atalhos: Espaço = virar · ← → = navegar · J = Já sei · N = Não sei" : "Shortcuts: Space = flip · ← → = navigate · J = I know it · N = I don't"}
      </p>

      {/* Backup bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap", alignItems: "center", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 16px" }}>
        <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 700 }}>💾 {isPt ? "Progresso:" : "Progress:"}</span>
        <button onClick={exportProgress} style={{ padding: "5px 14px", borderRadius: 999, border: "1.5px solid var(--border)", background: "var(--bg)", fontSize: 12, fontWeight: 700, cursor: "pointer", color: "var(--text)", fontFamily: "inherit" }}>
          ⬇️ {isPt ? "Exportar backup" : "Export backup"}
        </button>
        <button onClick={() => importRef.current?.click()} style={{ padding: "5px 14px", borderRadius: 999, border: "1.5px solid var(--border)", background: "var(--bg)", fontSize: 12, fontWeight: 700, cursor: "pointer", color: "var(--text)", fontFamily: "inherit" }}>
          ⬆️ {isPt ? "Restaurar backup" : "Restore backup"}
        </button>
        <input ref={importRef} type="file" accept=".json" style={{ display: "none" }} onChange={importProgress} />
        <span style={{ fontSize: 12, color: "#10b981", fontWeight: 700, marginLeft: 4 }}>✓ {knownCount} {isPt ? "palavras salvas" : "words saved"}</span>
      </div>

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
          <div className="stat-label">Neste deck</div>
        </div>
        <div className="stat-box">
          <div className="stat-num">{idx + 1}</div>
          <div className="stat-label">Card atual</div>
        </div>
      </div>

      {/* Single-column layout */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

        {/* TOP: card */}
        <div>
          <div className="card">
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>Modo:</span>
                <button className={`mode-btn ${mode === "vn2pt" ? "active" : ""}`} onClick={() => { setMode("vn2pt"); setFlipped(false); }}>🇻🇳 → 🇧🇷</button>
                <button className={`mode-btn ${mode === "pt2vn" ? "active" : ""}`} onClick={() => { setMode("pt2vn"); setFlipped(false); }}>🇧🇷 → 🇻🇳</button>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>Categoria:</span>
                <select className="cat-select" value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
                  <option>Todos</option>
                  {categorias.map((c) => <option key={c}>{c}</option>)}
                </select>
                <label className="filter-toggle">
                  <input type="checkbox" checked={onlyUnknown} onChange={(e) => setOnlyUnknown(e.target.checked)} />
                  Só o que não sei
                </label>
              </div>
            </div>

            <div className="progress-bar-wrap">
              <div className="progress-bar-meta">
                <span>{idx + 1} de {deck.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="flip-scene flip-scene-wide" onClick={() => setFlipped((f) => !f)}>
              <div className={`flip-card ${flipped ? "flipped" : ""}`}>
                <div className="flip-face flip-front">
                  <div className="flip-hint">{frontHint}</div>
                  <div className="flip-main-word">{frontWord}</div>
                  <span className="cat-badge" style={{ background: colors.bg, color: colors.text, marginTop: 12 }}>{card.categoria}</span>
                </div>
                <div className="flip-face flip-back">
                  <div className="flip-hint">{backHint}</div>
                  <div className="flip-main-word">{backWord}</div>
                  {card.exemplo && <div className="flip-example">ex: {card.exemplo}</div>}
                  {hwWord && (
                    <button
                      onClick={e => { e.stopPropagation(); setRightPanel(p => p === "breakdown" ? "categoria" : "breakdown"); }}
                      style={{ marginTop: 12, padding: "5px 14px", borderRadius: 999, border: "1.5px solid #818cf8", background: rightPanel === "breakdown" ? "#4f46e5" : "transparent", color: rightPanel === "breakdown" ? "#fff" : "#4f46e5", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "0.2s" }}
                    >
                      {rightPanel === "breakdown" ? "📖 Ver categoria" : "🔍 Análise da frase"}
                    </button>
                  )}
                </div>
              </div>
            </div>

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

        {/* BOTTOM: info panel (full width) */}
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
            <button
              onClick={() => setRightPanel("categoria")}
              style={{ flex: 1, padding: "7px", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 12, fontFamily: "inherit", transition: "0.15s",
                background: rightPanel === "categoria" ? "var(--primary)" : "var(--bg-card)",
                color: rightPanel === "categoria" ? "#fff" : "var(--text-muted)",
                border: rightPanel === "categoria" ? "none" : "1px solid var(--border)" }}
            >📖 Categoria</button>
            <button
              onClick={() => setRightPanel("breakdown")}
              style={{ flex: 1, padding: "7px", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 12, fontFamily: "inherit", transition: "0.15s",
                background: rightPanel === "breakdown" ? "#4f46e5" : "var(--bg-card)",
                color: rightPanel === "breakdown" ? "#fff" : "var(--text-muted)",
                border: rightPanel === "breakdown" ? "none" : "1px solid var(--border)" }}
            >🔍 Análise</button>
          </div>

          {/* CATEGORIA panel */}
          {rightPanel === "categoria" && catDef && (
            <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: "16px", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 22 }}>{catDef.icon}</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14, color: "var(--text)" }}>{card.categoria}</div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{isPt ? "Categoria gramatical" : "Grammar category"}</div>
                </div>
                <span style={{ marginLeft: "auto", background: colors.bg, color: colors.text, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>{card.categoria}</span>
              </div>
              <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.6, marginBottom: 10 }}>{isPt ? catDef.pt : catDef.en}</p>
              <div style={{ background: "var(--bg)", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "var(--text-muted)", fontStyle: "italic" }}>
                <span style={{ fontWeight: 700, color: "var(--text)", fontStyle: "normal" }}>Ex: </span>{catDef.ex}
              </div>
              <details style={{ marginTop: 12 }}>
                <summary style={{ fontSize: 12, color: "var(--primary)", cursor: "pointer", fontWeight: 600, userSelect: "none" }}>{isPt ? "▸ Ver todas as categorias" : "▸ See all categories"}</summary>
                <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 7, maxHeight: 420, overflowY: "auto" }}>
                  {Object.entries(CAT_DEFS).map(([cat, def]) => {
                    const c = CAT_COLORS[cat] || { bg: "#f1f5f9", text: "#475569" };
                    return (
                      <div key={cat} style={{ background: c.bg, borderRadius: 8, padding: "7px 10px", border: `1px solid ${c.text}33` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                          <span style={{ fontSize: 14 }}>{def.icon}</span>
                          <span style={{ fontWeight: 800, fontSize: 12, color: c.text }}>{cat}</span>
                        </div>
                        <div style={{ fontSize: 11, color: "var(--text)", lineHeight: 1.5 }}>{isPt ? def.pt : def.en}</div>
                      </div>
                    );
                  })}
                </div>
              </details>
            </div>
          )}

          {/* BREAKDOWN panel */}
          {rightPanel === "breakdown" && hwWord && (
            <div style={{ background: "#1a1d2e", borderRadius: 14, padding: "16px", border: "1px solid #2e3357" }}>
              <div style={{ fontWeight: 800, fontSize: 13, color: "#e2e8f0", marginBottom: 10 }}>🔍 {isPt ? "Análise da frase" : "Sentence breakdown"}</div>
              <div style={{ fontStyle: "italic", fontSize: 13, color: "#818cf8", textAlign: "center", marginBottom: 10 }}>"{hwWord.exemplo}"</div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: "#1e2140" }}>
                      <th style={{ padding: "5px 8px", textAlign: "left", color: "#94a3b8", fontWeight: 700, fontSize: 10, textTransform: "uppercase" }}>VN</th>
                      <th style={{ padding: "5px 8px", textAlign: "left", color: "#94a3b8", fontWeight: 700, fontSize: 10, textTransform: "uppercase" }}>Função</th>
                      <th style={{ padding: "5px 8px", textAlign: "left", color: "#94a3b8", fontWeight: 700, fontSize: 10, textTransform: "uppercase" }}>{isPt ? "Tradução" : "Translation"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hwWord.breakdown.map((tk, i) => {
                      const c = CAT_COLORS[tk.role] || { bg: "#e2e8f0", text: "#334155" };
                      return (
                        <tr key={i} style={{ borderBottom: "1px solid #2e3357" }}>
                          <td style={{ padding: "6px 8px", fontWeight: 800, fontSize: 13, color: "#f1f5f9" }}>{tk.token}</td>
                          <td style={{ padding: "6px 8px" }}><span style={{ background: c.bg, color: c.text, fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 999, whiteSpace: "nowrap" }}>{tk.role}</span></td>
                          <td style={{ padding: "6px 8px", color: "#cbd5e1", fontSize: 11 }}>{isPt ? tk.pt : tk.en}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {hwWord.gramNote && (
                <div style={{ background: "#1e3a5f", border: "1px solid #60a5fa", borderRadius: 8, padding: "9px 12px", fontSize: 12, color: "#bfdbfe", lineHeight: 1.6, marginTop: 10 }}>
                  💡 {hwWord.gramNote}
                </div>
              )}
            </div>
          )}

          {rightPanel === "breakdown" && !hwWord && (
            <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: "24px 16px", border: "1px solid var(--border)", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>📭</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>{isPt ? "Nenhuma análise disponível para esta palavra ainda." : "No breakdown available for this word yet."}</div>
              <button onClick={() => setRightPanel("categoria")} style={{ marginTop: 10, fontSize: 12, color: "var(--primary)", background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>
                {isPt ? "← Ver categoria" : "← See category"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
