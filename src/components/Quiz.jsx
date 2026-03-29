import { useState, useCallback } from "react";
import { palavras, categorias as allCats, CAT_COLORS } from "../data/vocabulario";
import { useLang } from "../contexts/LangContext";

const LEVELS = [
  { size: 5,        icon: "🌱", label: "Aquecimento",     desc: "5 perguntas" },
  { size: 10,       icon: "⭐", label: "Básico",          desc: "10 perguntas" },
  { size: 20,       icon: "⭐⭐", label: "Intermediário", desc: "20 perguntas" },
  { size: 30,       icon: "⭐⭐⭐", label: "Avançado",    desc: "30 perguntas" },
  { size: 50,       icon: "🏆", label: "Expert",          desc: "50 perguntas" },
  { size: Infinity, icon: "💪", label: "Maratona",        desc: "todas as palavras" },
];

const MODES = [
  { id: "vn2pt", icon: "🇻🇳→🇧🇷", label: "VN → PT",  desc: "Veja vietnamita, escolha a tradução" },
  { id: "pt2vn", icon: "🇧🇷→🇻🇳", label: "PT → VN",  desc: "Veja a tradução, escolha o vietnamita" },
  { id: "mix",   icon: "🔀",       label: "Mix",       desc: "Mistura dos dois modos aleatoriamente" },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildOptions(correct, pool, count = 4) {
  const wrong = shuffle(pool.filter(w => w.vn !== correct.vn)).slice(0, count - 1);
  return shuffle([correct, ...wrong]);
}

function buildQuiz(pool, size, lang) {
  const s = size === Infinity ? pool.length : Math.min(size, pool.length);
  return shuffle(pool).slice(0, s).map(word => ({
    word,
    options: buildOptions(word, pool),
  }));
}

function WordBreakdown({ word, lang }) {
  const colors = CAT_COLORS[word.categoria] || { bg: "#f1f5f9", text: "#334155" };
  return (
    <div style={{ marginTop: 10, padding: "12px 14px", background: "var(--bg)", borderRadius: 10, fontSize: 13 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
        <span style={{ background: colors.bg, color: colors.text, padding: "3px 10px", borderRadius: 999, fontWeight: 700, fontSize: 12 }}>{word.categoria}</span>
        <span style={{ fontSize: 18, fontWeight: 800, color: "var(--primary)" }}>{word.vn}</span>
        <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}>{lang === "en" ? word.en : word.pt}</span>
      </div>
      {word.exemplo && (
        <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
          <span style={{ fontWeight: 700, color: "var(--text)" }}>Ex: </span>{word.exemplo}
        </div>
      )}
      {word.gramNote && (
        <div style={{ fontSize: 12, color: "var(--text)", lineHeight: 1.7, background: "#eff6ff", borderLeft: "3px solid var(--primary)", padding: "7px 10px", borderRadius: "0 8px 8px 0" }}>
          💡 {word.gramNote}
        </div>
      )}
    </div>
  );
}

export default function Quiz() {
  const { lang } = useLang();
  const isPt = lang !== "en";

  const [selectedCat, setSelectedCat]   = useState("all");
  const [quizSize, setQuizSize]         = useState(10);
  const [quizMode, setQuizMode]         = useState("vn2pt");
  const [quiz, setQuiz]                 = useState(null);
  const [idx, setIdx]                   = useState(0);
  const [chosen, setChosen]             = useState(null);
  const [score, setScore]               = useState(0);
  const [done, setDone]                 = useState(false);
  const [history, setHistory]           = useState([]);
  const [questionModes, setQModes]      = useState([]); // per-question mode when mix

  const catOptions = ["all", ...allCats];
  const pool = selectedCat === "all" ? palavras : palavras.filter(p => p.categoria === selectedCat);

  const startQuiz = useCallback(() => {
    const q = buildQuiz(pool, quizSize, lang);
    // For mix mode, assign random direction per question
    const modes = q.map(() => Math.random() < 0.5 ? "vn2pt" : "pt2vn");
    setQuiz(q);
    setQModes(modes);
    setIdx(0);
    setChosen(null);
    setScore(0);
    setDone(false);
    setHistory([]);
  }, [pool, quizSize, lang, quizMode]);

  const current = quiz ? quiz[idx] : null;
  const effectiveMode = quiz ? (quizMode === "mix" ? questionModes[idx] : quizMode) : "vn2pt";

  function handleChoose(optIdx) {
    if (chosen !== null) return;
    setChosen(optIdx);
    const isCorrect = quiz[idx].options[optIdx].vn === quiz[idx].word.vn;
    if (isCorrect) setScore(s => s + 1);
    setHistory(h => [...h, {
      word: quiz[idx].word,
      options: quiz[idx].options,
      chosen: optIdx,
      correct: quiz[idx].options.findIndex(o => o.vn === quiz[idx].word.vn),
      mode: effectiveMode,
    }]);
  }

  function handleNext() {
    if (idx + 1 >= quiz.length) setDone(true);
    else { setIdx(i => i + 1); setChosen(null); }
  }

  const translation = w => lang === "en" ? w.en : w.pt;
  const catColor = cat => CAT_COLORS[cat] || { bg: "#f1f5f9", text: "#334155" };
  const actualSize = quizSize === Infinity ? pool.length : Math.min(quizSize, pool.length);

  // ── Setup ──────────────────────────────────────────────────────────────────
  if (!quiz) {
    return (
      <div className="quiz-wrap">
        <h2 className="page-title">🎯 {isPt ? "Quiz de Vocabulário" : "Vocabulary Quiz"}</h2>
        <p className="page-subtitle">{isPt ? "Escolha o nível, o modo e a categoria para começar" : "Choose level, mode and category to start"}</p>

        <div className="card quiz-setup">
          {/* MODE */}
          <div style={{ marginBottom: 20 }}>
            <div className="quiz-label">{isPt ? "Modo:" : "Mode:"}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {MODES.map(m => (
                <button key={m.id} onClick={() => setQuizMode(m.id)} style={{
                  padding: "10px 16px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit",
                  background: quizMode === m.id ? "var(--primary)" : "var(--bg)",
                  color: quizMode === m.id ? "#fff" : "var(--text)",
                  border: quizMode === m.id ? "none" : "1.5px solid var(--border)",
                  fontWeight: 700, fontSize: 13, transition: "0.15s"
                }}>
                  <div>{m.icon} {m.label}</div>
                  <div style={{ fontSize: 11, fontWeight: 400, opacity: 0.85, marginTop: 2 }}>{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* LEVEL */}
          <div style={{ marginBottom: 20 }}>
            <div className="quiz-label">{isPt ? "Nível / Quantidade:" : "Level / Quantity:"}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {LEVELS.map(lv => {
                const available = lv.size === Infinity ? pool.length : Math.min(lv.size, pool.length);
                const disabled = pool.length < 4 || (lv.size !== Infinity && pool.length < lv.size && pool.length < 4);
                return (
                  <button key={lv.size} onClick={() => setQuizSize(lv.size)} disabled={disabled} style={{
                    padding: "10px 14px", borderRadius: 10, cursor: disabled ? "not-allowed" : "pointer", fontFamily: "inherit",
                    background: quizSize === lv.size ? "#f59e0b" : "var(--bg)",
                    color: quizSize === lv.size ? "#fff" : "var(--text)",
                    border: quizSize === lv.size ? "none" : "1.5px solid var(--border)",
                    fontWeight: 700, fontSize: 13, transition: "0.15s", opacity: disabled ? 0.5 : 1
                  }}>
                    <div>{lv.icon} {lv.label}</div>
                    <div style={{ fontSize: 11, fontWeight: 400, opacity: 0.85, marginTop: 2 }}>{lv.size === Infinity ? `${pool.length} perguntas` : `${available} perguntas`}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CATEGORY */}
          <div style={{ marginBottom: 20 }}>
            <div className="quiz-label">{isPt ? "Categoria:" : "Category:"}</div>
            <div className="cat-pills">
              {catOptions.map(cat => (
                <button key={cat} className={`pill ${selectedCat === cat ? "pill-active" : ""}`} onClick={() => setSelectedCat(cat)}>
                  {cat === "all" ? (isPt ? "Todas" : "All") : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="quiz-pool-info">
            📚 {pool.length} {isPt ? "palavras disponíveis" : "words available"} →{" "}
            <strong>{actualSize}</strong> {isPt ? "perguntas neste quiz" : "questions in this quiz"}
            {pool.length < 4 && <span className="quiz-warn"> ⚠️ {isPt ? "Mínimo 4 palavras necessário" : "Minimum 4 words needed"}</span>}
          </div>

          <button className="btn-primary quiz-start-btn" onClick={startQuiz} disabled={pool.length < 4} style={{ marginTop: 16 }}>
            🚀 {isPt ? "Começar Quiz" : "Start Quiz"}
          </button>
        </div>
      </div>
    );
  }

  // ── Results ────────────────────────────────────────────────────────────────
  if (done) {
    const pct = score / quiz.length;
    const msg = pct === 1
      ? (isPt ? "100%! Você domina este vocabulário! 🏆" : "100%! You master this vocabulary! 🏆")
      : pct >= 0.7
      ? (isPt ? "Muito bom! Continue praticando!" : "Very good! Keep practicing!")
      : pct >= 0.5
      ? (isPt ? "Bom progresso! Vale a pena revisar." : "Good progress! Worth reviewing.")
      : (isPt ? "Não desanime, continue estudando!" : "Don't give up, keep studying!");
    return (
      <div className="quiz-wrap">
        <h2 className="page-title">🎯 {isPt ? "Resultado" : "Results"}</h2>
        <div className="card quiz-result-card">
          <div className="quiz-score-big">{score} / {quiz.length}</div>
          <p className="quiz-result-msg">{msg}</p>
          <div className="quiz-result-bar"><div className="quiz-result-fill" style={{ width: `${pct * 100}%` }} /></div>
          <div className="quiz-result-actions">
            <button className="btn-primary" onClick={startQuiz}>{isPt ? "Jogar Novamente" : "Play Again"}</button>
            <button className="btn-outline" onClick={() => setQuiz(null)}>{isPt ? "Novo Quiz" : "New Quiz"}</button>
          </div>
        </div>

        <h3 className="quiz-review-title">{isPt ? "📋 Revisão Completa" : "📋 Full Review"}</h3>
        {history.map((h, i) => {
          const isRight = h.chosen === h.correct;
          const colors = catColor(h.word.categoria);
          return (
            <div key={i} className={`card quiz-review-item ${isRight ? "review-correct" : "review-wrong"}`}>
              <div className="quiz-review-header">
                <span className="quiz-review-num">{i + 1}</span>
                <span className="quiz-review-vn">{h.word.vn}</span>
                <span style={{ marginLeft: "auto", background: colors.bg, color: colors.text, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 999 }}>{h.word.categoria}</span>
                <span className={`quiz-review-badge ${isRight ? "badge-correct" : "badge-wrong"}`}>{isRight ? "✓" : "✗"}</span>
              </div>
              {!isRight && (
                <div style={{ fontSize: 12, color: "#ef4444", marginBottom: 4 }}>
                  {isPt ? "Você escolheu:" : "You chose:"} <strong>{translation(h.options[h.chosen])}</strong>{" "}
                  · {isPt ? "Correto:" : "Correct:"} <strong>{translation(h.options[h.correct])}</strong>
                </div>
              )}
              <WordBreakdown word={h.word} lang={lang} />
            </div>
          );
        })}
      </div>
    );
  }

  // ── Question ───────────────────────────────────────────────────────────────
  const isAnswered = chosen !== null;
  const correctIdx = current.options.findIndex(o => o.vn === current.word.vn);
  const questionText = effectiveMode === "vn2pt" ? current.word.vn : translation(current.word);
  const questionHint = effectiveMode === "vn2pt"
    ? (isPt ? "O que significa esta palavra?" : "What does this word mean?")
    : (isPt ? "Qual é a palavra vietnamita?" : "What is the Vietnamese word?");
  const optionText = (opt) => effectiveMode === "vn2pt" ? translation(opt) : opt.vn;
  const colors = catColor(current.word.categoria);

  return (
    <div className="quiz-wrap">
      <div className="quiz-topbar">
        <span className="quiz-progress-text">{isPt ? "Pergunta" : "Question"} {idx + 1} / {quiz.length}</span>
        <span style={{ fontSize: 12, background: colors.bg, color: colors.text, padding: "2px 8px", borderRadius: 999, fontWeight: 700 }}>{current.word.categoria}</span>
        <span className="quiz-score-inline">{isPt ? "Acertos" : "Score"}: {score}</span>
      </div>
      <div className="quiz-progress-bar"><div className="quiz-progress-fill" style={{ width: `${(idx / quiz.length) * 100}%` }} /></div>

      <div className="card quiz-question-card">
        <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {effectiveMode === "vn2pt" ? "🇻🇳 → 🇧🇷" : "🇧🇷 → 🇻🇳"} · {questionHint}
        </div>
        <div className="quiz-vn-word" style={{ fontSize: effectiveMode === "pt2vn" ? 22 : 38 }}>{questionText}</div>

        <div className="quiz-options">
          {current.options.map((opt, i) => {
            let cls = "quiz-option";
            if (isAnswered) {
              if (i === correctIdx) cls += " option-correct";
              else if (i === chosen) cls += " option-wrong";
              else cls += " option-dim";
            }
            return (
              <button key={i} className={cls} onClick={() => handleChoose(i)} disabled={isAnswered}>
                <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                <span className="option-text">{optionText(opt)}</span>
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className={`quiz-feedback ${chosen === correctIdx ? "feedback-correct" : "feedback-wrong"}`}>
            <span className="feedback-icon">{chosen === correctIdx ? "✓" : "✗"}</span>
            <span>{chosen === correctIdx ? (isPt ? "Correto!" : "Correct!") : (isPt ? `Errado! Correto: ${optionText(current.options[correctIdx])}` : `Wrong! Correct: ${optionText(current.options[correctIdx])}`)}</span>
          </div>
        )}

        {isAnswered && (
          <>
            <WordBreakdown word={current.word} lang={lang} />
            <div style={{ textAlign: "right", marginTop: 12 }}>
              <button className="btn-primary" onClick={handleNext}>
                {idx + 1 >= quiz.length ? (isPt ? "Ver Resultado →" : "See Results →") : (isPt ? "Próxima →" : "Next →")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
