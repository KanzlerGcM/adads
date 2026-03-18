import { useState, useCallback } from "react";
import { homeworks, getHomeworkStatus, setHomeworkStatus, formatDate } from "../data/homeworks";
import { CAT_COLORS } from "../data/vocabulario";
import { useLang } from "../contexts/LangContext";

// ─── tiny breakdown panel ─────────────────────────────────────────────────────
function BreakdownPanel({ word, lang }) {
  const isPt = lang !== "en";
  if (!word) return null;
  const { breakdown, gramNote, exemplo } = word;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ fontStyle: "italic", fontSize: 13, color: "#818cf8", textAlign: "center", marginBottom: 4 }}>
        "{exemplo}"
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "#1e2140" }}>
              <th style={{ padding: "6px 10px", textAlign: "left", color: "#94a3b8", fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Vietnamita</th>
              <th style={{ padding: "6px 10px", textAlign: "left", color: "#94a3b8", fontWeight: 700, fontSize: 10, textTransform: "uppercase" }}>Função</th>
              <th style={{ padding: "6px 10px", textAlign: "left", color: "#94a3b8", fontWeight: 700, fontSize: 10, textTransform: "uppercase" }}>{isPt ? "Tradução" : "Translation"}</th>
            </tr>
          </thead>
          <tbody>
            {breakdown.map((tk, i) => {
              const colors = CAT_COLORS[tk.role] || { bg: "#e2e8f0", text: "#334155" };
              return (
                <tr key={i} style={{ borderBottom: "1px solid #2e3357" }}>
                  <td style={{ padding: "7px 10px", fontWeight: 800, fontSize: 14, color: "#f1f5f9" }}>{tk.token}</td>
                  <td style={{ padding: "7px 10px" }}>
                    <span style={{ background: colors.bg, color: colors.text, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999 }}>{tk.role}</span>
                  </td>
                  <td style={{ padding: "7px 10px", color: "#cbd5e1", fontSize: 12 }}>{isPt ? tk.pt : tk.en}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {gramNote && (
        <div style={{ background: "#1e3a5f", border: "1px solid #60a5fa", borderRadius: 8, padding: "9px 13px", fontSize: 12, color: "#bfdbfe", lineHeight: 1.6 }}>
          💡 {gramNote}
        </div>
      )}
    </div>
  );
}

// ─── inline flashcard for one homework ───────────────────────────────────────
function HomeworkFlashcards({ hw, lang }) {
  const isPt = lang !== "en";
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mode, setMode] = useState("vn2pt");
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  const words = hw.palavrasNovas;
  const card = words[idx];

  const goTo = useCallback((next) => {
    setFlipped(false);
    setSidePanelOpen(false);
    setTimeout(() => setIdx(next), 120);
  }, []);

  const frontWord = mode === "vn2pt" ? card.vn : (isPt ? card.pt : card.en);
  const backWord  = mode === "vn2pt" ? (isPt ? card.pt : card.en) : card.vn;
  const colors    = CAT_COLORS[card.categoria] || { bg: "#f1f5f9", text: "#475569" };
  const progress  = words.length > 1 ? (idx / (words.length - 1)) * 100 : 100;

  return (
    <div style={{ marginTop: 4 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
        <button className={`mode-btn ${mode === "vn2pt" ? "active" : ""}`} onClick={() => { setMode("vn2pt"); setFlipped(false); }}>🇻🇳 → 🇧🇷</button>
        <button className={`mode-btn ${mode === "pt2vn" ? "active" : ""}`} onClick={() => { setMode("pt2vn"); setFlipped(false); }}>🇧🇷 → 🇻🇳</button>
        <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: "auto" }}>{idx + 1} / {words.length}</span>
      </div>
      <div className="progress-bar-wrap">
        <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: `${progress}%` }} /></div>
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          <div
            onClick={() => setFlipped(f => !f)}
            style={{ width: "100%", height: 230, perspective: 1200, cursor: "pointer", marginBottom: 16 }}
          >
            <div style={{
              width: "100%", height: "100%", position: "relative",
              transformStyle: "preserve-3d",
              transition: "transform 0.48s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: flipped ? "rotateY(180deg)" : "none",
            }}>
              <div style={{
                position: "absolute", inset: 0, backfaceVisibility: "hidden",
                borderRadius: 18, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", padding: 28,
                background: "#ffffff", border: "2px solid var(--border)", boxShadow: "var(--shadow-lg)",
              }}>
                <div style={{ fontSize: 11.5, color: "var(--text-muted)", marginBottom: 10 }}>
                  {mode === "vn2pt" ? "🇻🇳 Vietnamita — clique para revelar" : (isPt ? "🇧🇷 Português — clique para revelar" : "🇬🇧 English — click to reveal")}
                </div>
                <div style={{ fontSize: 38, fontWeight: 800, color: "var(--text)", textAlign: "center", lineHeight: 1.2 }}>{frontWord}</div>
                <span className="cat-badge" style={{ background: colors.bg, color: colors.text, marginTop: 14 }}>{card.categoria}</span>
              </div>
              <div style={{
                position: "absolute", inset: 0, backfaceVisibility: "hidden",
                borderRadius: 18, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", padding: 28,
                background: "#f0f4ff", border: "2px solid #c7d2fe", boxShadow: "var(--shadow-lg)",
                transform: "rotateY(180deg)",
              }}>
                <div style={{ fontSize: 11.5, color: "var(--text-muted)", marginBottom: 10 }}>
                  {mode === "pt2vn" ? "🇻🇳 Vietnamita" : (isPt ? "🇧🇷 Português" : "🇬🇧 English")}
                </div>
                <div style={{ fontSize: 34, fontWeight: 800, color: "var(--text)", textAlign: "center", lineHeight: 1.2 }}>{backWord}</div>
                <div style={{ fontSize: 12.5, color: "#5b5ef4", marginTop: 12, fontStyle: "italic", textAlign: "center" }}>
                  {card.exemplo}
                </div>
                <button
                  onClick={e => { e.stopPropagation(); setSidePanelOpen(o => !o); }}
                  style={{
                    marginTop: 14, padding: "5px 14px", borderRadius: 999, border: "1.5px solid #818cf8",
                    background: sidePanelOpen ? "#4f46e5" : "transparent",
                    color: sidePanelOpen ? "#fff" : "#4f46e5",
                    fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "0.2s",
                  }}
                >
                  {sidePanelOpen ? "✕ Fechar explicação" : "🔍 Explicar frase"}
                </button>
              </div>
            </div>
          </div>
          <div className="flash-controls">
            <button className="flash-btn nav" onClick={() => goTo(Math.max(0, idx - 1))} disabled={idx === 0}>← Anterior</button>
            <button className="flash-btn nav" onClick={() => goTo(Math.min(words.length - 1, idx + 1))} disabled={idx === words.length - 1}>Próximo →</button>
          </div>
        </div>
        {sidePanelOpen && (
          <div style={{
            width: 320, flexShrink: 0, background: "#1a1d2e", borderRadius: 14,
            padding: "16px 16px", border: "1px solid #2e3357",
          }}>
            <div style={{ fontWeight: 800, fontSize: 13, color: "#e2e8f0", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>🔍 {isPt ? "Análise da frase" : "Sentence breakdown"}</span>
              <button onClick={() => setSidePanelOpen(false)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 16 }}>✕</button>
            </div>
            <BreakdownPanel word={card} lang={lang} />
          </div>
        )}
      </div>
    </div>
  );
}

function PartFill({ parte, isPt }) {
  return (
    <>
      <div style={{ background: "var(--primary-bg)", border: "1px solid #c7d2fe", borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 13 }}>
        <span style={{ fontWeight: 700, color: "var(--primary)" }}>{isPt ? "Palavras disponíveis: " : "Words given: "}</span>
        {parte.wordBank.map((w, i) => (
          <span key={w}>
            <span style={{ background: "#4f46e5", color: "#fff", borderRadius: 6, padding: "2px 10px", fontWeight: 700, fontSize: 12 }}>{w}</span>
            {i < parte.wordBank.length - 1 && <span style={{ color: "var(--text-muted)", margin: "0 4px" }}>–</span>}
          </span>
        ))}
      </div>
      <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
        {parte.items.map((item, i) => (
          <li key={i} style={{ fontSize: 14 }}>
            <div style={{ fontWeight: 600, color: "var(--text)" }}>{item.sentence}</div>
            {isPt && <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{item.pt}</div>}
            {item.note && <span style={{ background: "#fef3c7", color: "#92400e", fontSize: 11, fontWeight: 600, padding: "1px 8px", borderRadius: 999, marginTop: 4, display: "inline-block" }}>📌 {item.note}</span>}
          </li>
        ))}
      </ol>
    </>
  );
}

function PartNegative({ parte, isPt }) {
  return (
    <>
      {parte.tip && (
        <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "8px 14px", marginBottom: 14, fontSize: 12, color: "#1e3a5f" }}>
          💡 {isPt ? parte.tip.pt : parte.tip.en}
        </div>
      )}
      <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
        {parte.items.map((item, i) => (
          <li key={i} style={{ fontSize: 14 }}>
            <div style={{ fontWeight: 600, color: "var(--text)" }}>{item.sentence}</div>
            {isPt && <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{item.pt}</div>}
            {item.note && <span style={{ background: "#fef3c7", color: "#92400e", fontSize: 11, fontWeight: 600, padding: "1px 8px", borderRadius: 999, marginTop: 4, display: "inline-block" }}>📌 {item.note}</span>}
          </li>
        ))}
      </ol>
    </>
  );
}

function PartNumbers({ parte, isPt }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
      {parte.items.map((item, i) => (
        <div key={i} style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 9, padding: "12px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontWeight: 800, fontSize: 14, color: item.type === "num→word" ? "#1e40af" : "#065f46" }}>{i + 1}.</span>
            <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: item.type === "num→word" ? "#dbeafe" : "#dcfce7", color: item.type === "num→word" ? "#1e40af" : "#065f46" }}>
              {item.type === "num→word" ? (isPt ? "algarismo → extenso" : "digits → words") : (isPt ? "extenso → algarismo" : "words → digits")}
            </span>
          </div>
          <div style={{ fontWeight: 700, fontSize: 16, color: "var(--text)" }}>{item.q}</div>
          <div style={{ borderTop: "1px dashed var(--border)", paddingTop: 8, marginTop: 8, fontSize: 12, color: "var(--text-muted)" }}>{isPt ? "Resposta: ___________" : "Answer: ___________"}</div>
        </div>
      ))}
    </div>
  );
}

function PartDescribe({ parte, isPt }) {
  return (
    <>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
        {[
          { vn: "Đây là...", pt: "Aqui está... / Este é...", pos: "antes do verbo" },
          { vn: "...này", pt: "este/esta...", pos: "após substantivo" },
          { vn: "...kia", pt: "aquele/aquela...", pos: "após substantivo, longe" },
        ].map(d => (
          <div key={d.vn} style={{ background: "#f1f5f9", border: "1px solid var(--border)", borderRadius: 8, padding: "7px 12px", fontSize: 12 }}>
            <span style={{ fontWeight: 700, color: "#4f46e5" }}>{d.vn}</span>
            {isPt && <span style={{ color: "var(--text-muted)" }}> = {d.pt} ({d.pos})</span>}
          </div>
        ))}
      </div>
      {parte.example && (
        <div style={{ background: "#d1fae5", border: "1px solid #6ee7b7", borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 13 }}>
          <span style={{ fontWeight: 700, color: "#065f46" }}>{isPt ? "Exemplo" : "Example"} {parte.example.num}: {parte.example.classifier}</span>
          <span style={{ color: "#047857", marginLeft: 8 }}>→ {parte.example.answer}</span>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {parte.items.map((item, i) => (
          <div key={i} style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 9, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontWeight: 800, fontSize: 15, color: "var(--primary)", minWidth: 34 }}>{item.num}</span>
            <div style={{ flex: 1 }}>
              <span style={{ fontWeight: 700, color: "var(--text)", fontSize: 14 }}>{item.classifier}</span>
              {isPt && <span style={{ color: "var(--text-muted)", fontSize: 12, marginLeft: 8 }}>({item.pt})</span>}
              {item.note && <div style={{ fontSize: 11.5, color: "#92400e", background: "#fef3c7", borderRadius: 6, padding: "2px 8px", marginTop: 4, display: "inline-block" }}>📌 {item.note}</div>}
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: 13, fontStyle: "italic" }}>{isPt ? "Escreva →" : "Write →"}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function HwPart({ parte, isPt }) {
  return (
    <div className="card" style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid var(--border)" }}>
        <span style={{ background: "#4f46e5", color: "#fff", fontWeight: 800, fontSize: 13, padding: "4px 12px", borderRadius: 999 }}>
          {parte.icon} Parte {parte.num}
        </span>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", margin: 0 }}>{isPt ? parte.titlePt : parte.titleEn}</h3>
      </div>
      {parte.type === "fill"     && <PartFill     parte={parte} isPt={isPt} />}
      {parte.type === "negative" && <PartNegative parte={parte} isPt={isPt} />}
      {parte.type === "numbers"  && <PartNumbers  parte={parte} isPt={isPt} />}
      {parte.type === "describe" && <PartDescribe parte={parte} isPt={isPt} />}
    </div>
  );
}

export default function Homework({ hwId, onBack }) {
  const { lang } = useLang();
  const isPt = lang !== "en";
  const [, forceUpdate] = useState(0);
  const [activeTab, setActiveTab] = useState("exercises");

  const hw = homeworks.find(h => h.id === hwId);
  if (!hw) return <div>Tarefa não encontrada.</div>;

  const status = getHomeworkStatus(hw);
  const submitted = status === "submitted";

  const toggleStatus = () => {
    setHomeworkStatus(hw.id, submitted ? "pending" : "submitted");
    forceUpdate(n => n + 1);
  };

  const tabs = [
    { id: "exercises",  labelPt: "✏️ Exercícios",    labelEn: "✏️ Exercises" },
    { id: "flashcards", labelPt: "🎴 Flashcards",     labelEn: "🎴 Flashcards" },
    { id: "words",      labelPt: "🆕 Palavras Novas", labelEn: "🆕 New Words" },
  ];

  return (
    <div>
      <button
        onClick={onBack}
        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--primary)", fontWeight: 700, fontSize: 13, padding: "0 0 16px 0", display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit" }}
      >
        ← {isPt ? "Todas as tarefas" : "All homework"}
      </button>

      <div className="card" style={{ marginBottom: 20, background: "linear-gradient(135deg, #1a1d2e 0%, #2e3357 100%)", color: "#e2e8f0" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#818cf8", marginBottom: 4 }}>{isPt ? "Tarefa de Casa" : "Homework"}</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", lineHeight: 1.2 }}>{hw.title}</h2>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{hw.titlePt}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
            <span style={{ background: "#4f46e5", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 999 }}>
              📅 {formatDate(hw.date, lang)}
            </span>
            <span style={{ background: "#065f46", color: "#d1fae5", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 999 }}>
              👤 Gabriel
            </span>
            <button
              onClick={toggleStatus}
              style={{
                padding: "5px 14px", borderRadius: 999, border: "none", cursor: "pointer",
                fontWeight: 700, fontSize: 12, fontFamily: "inherit",
                background: submitted ? "#d1fae5" : "#fef3c7",
                color: submitted ? "#065f46" : "#92400e",
                transition: "0.2s",
              }}
            >
              {submitted ? "✅ " : "⏳ "}
              {submitted ? (isPt ? "Entregue" : "Submitted") : (isPt ? "Para entregar" : "Pending")}
              <span style={{ marginLeft: 6, opacity: 0.6, fontWeight: 400 }}>↻</span>
            </button>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 14, flexWrap: "wrap" }}>
          {[
            { icon: "✏️", label: isPt ? "Partes" : "Parts", val: hw.partes.length },
            { icon: "🆕", label: isPt ? "Novas palavras" : "New words", val: hw.palavrasNovas.length },
            { icon: "🔢", label: isPt ? "Exercícios" : "Exercises", val: hw.partes.reduce((a, p) => a + (p.items?.length ?? 0), 0) },
          ].map(s => (
            <div key={s.label} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "8px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 18 }}>{s.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#f1f5f9" }}>{s.val}</div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 0, marginBottom: 20, borderBottom: "2px solid var(--border)" }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: "9px 18px", border: "none", background: "none", cursor: "pointer",
              fontWeight: 700, fontSize: 13, fontFamily: "inherit",
              color: activeTab === t.id ? "var(--primary)" : "var(--text-muted)",
              borderBottom: activeTab === t.id ? "2px solid var(--primary)" : "2px solid transparent",
              marginBottom: -2, transition: "0.15s",
            }}
          >
            {isPt ? t.labelPt : t.labelEn}
          </button>
        ))}
      </div>

      {activeTab === "exercises" && hw.partes.map(parte => (
        <HwPart key={parte.num} parte={parte} isPt={isPt} />
      ))}

      {activeTab === "flashcards" && (
        <div className="card">
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, color: "var(--text)" }}>
            🎴 {isPt ? `Flashcards — ${hw.palavrasNovas.length} palavras desta lição` : `Flashcards — ${hw.palavrasNovas.length} words from this lesson`}
          </div>
          <HomeworkFlashcards hw={hw} lang={lang} />
        </div>
      )}

      {activeTab === "words" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12 }}>
          {hw.palavrasNovas.map(w => {
            const chip = CAT_COLORS[w.categoria] || { bg: "#f1f5f9", text: "#475569" };
            return (
              <div key={w.vn} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontWeight: 800, fontSize: 17, color: "var(--primary)" }}>{w.vn}</span>
                  <span style={{ background: chip.bg, color: chip.text, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999 }}>{w.categoria}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>{isPt ? w.pt : w.en}</div>
                <div style={{ fontSize: 12, color: "#5b5ef4", fontStyle: "italic", marginBottom: 8 }}>{w.exemplo}</div>
                {w.gramNote && (
                  <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 7, padding: "7px 10px", fontSize: 11.5, color: "#1e3a5f", lineHeight: 1.55 }}>
                    💡 {w.gramNote}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
