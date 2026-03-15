import { useState, useCallback } from "react";
import { palavras, CAT_COLORS } from "../data/vocabulario";
import { useLang } from "../contexts/LangContext";

const QUIZ_SIZE = 10;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildOptions(correct, pool, lang) {
  const wrong = shuffle(pool.filter(w => w.vn !== correct.vn)).slice(0, 3);
  return shuffle([correct, ...wrong]);
}

function buildQuiz(pool, lang) {
  return shuffle(pool).slice(0, QUIZ_SIZE).map(word => ({
    word,
    options: buildOptions(word, pool, lang),
  }));
}

const LABELS = {
  pt: {
    title: "Quiz de Vocabulário",
    subtitle: "Escolha a tradução correta para cada palavra vietnamita",
    catAll: "Todas as categorias",
    start: "Começar Quiz",
    next: "Próxima →",
    finish: "Ver Resultado",
    restart: "Jogar Novamente",
    newQuiz: "Novo Quiz",
    score: "Pontuação",
    correct: "Correto!",
    wrong: "Errado!",
    correctAnswer: "Resposta correta",
    wordBreakdown: "Análise da Palavra",
    meaning: "Significado",
    category: "Categoria",
    example: "Exemplo",
    exampleTip: "Frase de exemplo",
    results: "Resultado",
    summary: "Você acertou",
    of: "de",
    questions: "perguntas",
    excellent: "Excelente! Você domina este vocabulário!",
    good: "Muito bom! Continue praticando!",
    ok: "Bom progresso! Vale a pena revisar.",
    low: "Não desanime, continue estudando!",
    question: "Pergunta",
    chooseCategory: "Escolher Categoria",
    filterMode: "Modo de filtro",
    modeVnToPt: "Vietnamita → Tradução",
    modeVnToSentence: "Escolha quem usa esta palavra",
    translation: "Tradução",
  },
  en: {
    title: "Vocabulary Quiz",
    subtitle: "Choose the correct translation for each Vietnamese word",
    catAll: "All categories",
    start: "Start Quiz",
    next: "Next →",
    finish: "See Result",
    restart: "Play Again",
    newQuiz: "New Quiz",
    score: "Score",
    correct: "Correct!",
    wrong: "Wrong!",
    correctAnswer: "Correct answer",
    wordBreakdown: "Word Breakdown",
    meaning: "Meaning",
    category: "Category",
    example: "Example",
    exampleTip: "Example sentence",
    results: "Results",
    summary: "You got",
    of: "out of",
    questions: "questions",
    excellent: "Excellent! You master this vocabulary!",
    good: "Very good! Keep practicing!",
    ok: "Good progress! Worth reviewing.",
    low: "Don't give up, keep studying!",
    question: "Question",
    chooseCategory: "Choose Category",
    filterMode: "Filter mode",
    modeVnToPt: "Vietnamese → Translation",
    modeVnToSentence: "Choose who uses this word",
    translation: "Translation",
  },
};

export default function Quiz() {
  const { lang } = useLang();
  const L = LABELS[lang] || LABELS.pt;

  const [selectedCat, setSelectedCat] = useState("all");
  const [quiz, setQuiz] = useState(null);
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState(null); // index of chosen option
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [history, setHistory] = useState([]); // {word, chosen, correct, options}

  const categorias = ["all", ...new Set(palavras.map(p => p.categoria))].sort((a, b) =>
    a === "all" ? -1 : b === "all" ? 1 : a.localeCompare(b)
  );

  const pool = selectedCat === "all" ? palavras : palavras.filter(p => p.categoria === selectedCat);

  const startQuiz = useCallback(() => {
    setQuiz(buildQuiz(pool, lang));
    setIdx(0);
    setChosen(null);
    setScore(0);
    setDone(false);
    setHistory([]);
  }, [pool, lang]);

  const current = quiz ? quiz[idx] : null;

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
    }]);
  }

  function handleNext() {
    if (idx + 1 >= quiz.length) {
      setDone(true);
    } else {
      setIdx(i => i + 1);
      setChosen(null);
    }
  }

  const translation = w => lang === "en" ? w.en : w.pt;
  const catColor = cat => CAT_COLORS[cat] || { bg: "#f1f5f9", text: "#334155" };

  // ── Setup screen ──────────────────────────────────────────────────────────
  if (!quiz) {
    return (
      <div className="quiz-wrap">
        <h2 className="section-title">{L.title}</h2>
        <p className="section-sub">{L.subtitle}</p>

        <div className="card quiz-setup">
          <label className="quiz-label">{L.chooseCategory}</label>
          <div className="cat-pills">
            {categorias.map(cat => (
              <button
                key={cat}
                className={`pill ${selectedCat === cat ? "pill-active" : ""}`}
                onClick={() => setSelectedCat(cat)}
              >
                {cat === "all" ? L.catAll : cat}
              </button>
            ))}
          </div>

          <div className="quiz-pool-info">
            {pool.length} {lang === "en" ? "words available" : "palavras disponíveis"}
            {pool.length < 4 && (
              <span className="quiz-warn">
                {lang === "en" ? " (need at least 4)" : " (mínimo 4 necessário)"}
              </span>
            )}
          </div>

          <button
            className="btn-primary quiz-start-btn"
            onClick={startQuiz}
            disabled={pool.length < 4}
          >
            {L.start}
          </button>
        </div>
      </div>
    );
  }

  // ── Results screen ────────────────────────────────────────────────────────
  if (done) {
    const pct = score / quiz.length;
    const msg = pct === 1 ? L.excellent : pct >= 0.7 ? L.good : pct >= 0.5 ? L.ok : L.low;
    return (
      <div className="quiz-wrap">
        <h2 className="section-title">{L.results}</h2>

        <div className="card quiz-result-card">
          <div className="quiz-score-big">{score}/{quiz.length}</div>
          <p className="quiz-result-msg">{msg}</p>
          <div className="quiz-result-bar">
            <div className="quiz-result-fill" style={{ width: `${pct * 100}%` }} />
          </div>
          <div className="quiz-result-actions">
            <button className="btn-primary" onClick={startQuiz}>{L.restart}</button>
            <button className="btn-outline" onClick={() => setQuiz(null)}>{L.newQuiz}</button>
          </div>
        </div>

        <h3 className="quiz-review-title">
          {lang === "en" ? "Review" : "Revisão"}
        </h3>
        {history.map((h, i) => {
          const isRight = h.chosen === h.correct;
          return (
            <div key={i} className={`card quiz-review-item ${isRight ? "review-correct" : "review-wrong"}`}>
              <div className="quiz-review-header">
                <span className="quiz-review-num">{i + 1}</span>
                <span className="quiz-review-vn">{h.word.vn}</span>
                <span className={`quiz-review-badge ${isRight ? "badge-correct" : "badge-wrong"}`}>
                  {isRight ? "✓" : "✗"}
                </span>
              </div>
              <WordBreakdown word={h.word} lang={lang} L={L} />
            </div>
          );
        })}
      </div>
    );
  }

  // ── Question screen ───────────────────────────────────────────────────────
  const isAnswered = chosen !== null;
  const correctIdx = current.options.findIndex(o => o.vn === current.word.vn);

  return (
    <div className="quiz-wrap">
      <div className="quiz-topbar">
        <span className="quiz-progress-text">
          {L.question} {idx + 1} / {quiz.length}
        </span>
        <span className="quiz-score-inline">
          {L.score}: {score}
        </span>
      </div>

      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${(idx / quiz.length) * 100}%` }} />
      </div>

      <div className="card quiz-question-card">
        <p className="quiz-question-label">
          {lang === "en" ? "What does this mean?" : "O que significa?"}
        </p>
        <div className="quiz-vn-word">{current.word.vn}</div>

        <div className="quiz-options">
          {current.options.map((opt, i) => {
            let cls = "quiz-option";
            if (isAnswered) {
              if (i === correctIdx) cls += " option-correct";
              else if (i === chosen) cls += " option-wrong";
              else cls += " option-dim";
            }
            return (
              <button
                key={i}
                className={cls}
                onClick={() => handleChoose(i)}
                disabled={isAnswered}
              >
                <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                <span className="option-text">{translation(opt)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {isAnswered && (
        <>
          <div className={`quiz-feedback ${chosen === correctIdx ? "feedback-correct" : "feedback-wrong"}`}>
            <span className="feedback-icon">{chosen === correctIdx ? "✓" : "✗"}</span>
            <span>{chosen === correctIdx ? L.correct : L.wrong}</span>
            {chosen !== correctIdx && (
              <span className="feedback-right">
                {L.correctAnswer}: {translation(current.options[correctIdx])}
              </span>
            )}
          </div>

          <div className="card quiz-breakdown">
            <WordBreakdown word={current.word} lang={lang} L={L} />
          </div>

          <button className="btn-primary quiz-next-btn" onClick={handleNext}>
            {idx + 1 >= quiz.length ? L.finish : L.next}
          </button>
        </>
      )}
    </div>
  );
}

function WordBreakdown({ word, lang, L }) {
  const col = CAT_COLORS[word.categoria] || { bg: "#f1f5f9", text: "#334155" };
  return (
    <div className="word-breakdown">
      <div className="breakdown-row">
        <span className="breakdown-vn">{word.vn}</span>
        <span className="breakdown-cat" style={{ background: col.bg, color: col.text }}>
          {word.categoria}
        </span>
      </div>
      <div className="breakdown-translations">
        <div className="breakdown-trans">
          <span className="trans-flag">🇧🇷</span>
          <span>{word.pt}</span>
        </div>
        <div className="breakdown-trans">
          <span className="trans-flag">🇬🇧</span>
          <span>{word.en}</span>
        </div>
      </div>
      <div className="breakdown-example">
        <span className="example-label">{L.exampleTip}:</span>
        <span className="example-vn">{word.exemplo}</span>
      </div>
    </div>
  );
}
