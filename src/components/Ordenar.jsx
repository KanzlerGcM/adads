import { useState } from "react";
import { palavras, CAT_COLORS } from "../data/vocabulario";
import { useLang } from "../contexts/LangContext";

// Sentence bank: each entry is a Vietnamese sentence broken into tokens,
// with the Portuguese and English translations
const SENTENCES = [
  {
    tokens: [
      { vn: "Tôi",    pt: "Eu",      en: "I",          cat: "Pronome"  },
      { vn: "là",     pt: "sou",     en: "am",          cat: "Verbo"    },
      { vn: "giáo viên", pt: "professor", en: "a teacher", cat: "Profissão" },
    ],
    pt: "Eu sou professor",
    en: "I am a teacher",
  },
  {
    tokens: [
      { vn: "Bạn",    pt: "Você",    en: "You",         cat: "Pronome"  },
      { vn: "tên",    pt: "nome",    en: "name",        cat: "Substantivo" },
      { vn: "là",     pt: "é",       en: "is",          cat: "Verbo"    },
      { vn: "gì",     pt: "o quê?",  en: "what?",       cat: "Interrogativo" },
    ],
    pt: "Qual é o seu nome?",
    en: "What is your name?",
  },
  {
    tokens: [
      { vn: "Tôi",    pt: "Eu",      en: "I",           cat: "Pronome"  },
      { vn: "muốn",   pt: "quero",   en: "want",        cat: "Verbo"    },
      { vn: "ăn",     pt: "comer",   en: "to eat",      cat: "Verbo"    },
      { vn: "phở",    pt: "phở",     en: "phở",         cat: "Substantivo" },
    ],
    pt: "Eu quero comer phở",
    en: "I want to eat phở",
  },
  {
    tokens: [
      { vn: "Sách",   pt: "O livro", en: "The book",    cat: "Substantivo" },
      { vn: "này",    pt: "este",    en: "this",        cat: "Demonstrativo" },
      { vn: "là",     pt: "é",       en: "is",          cat: "Verbo"    },
      { vn: "của",    pt: "de",      en: "of",          cat: "Partícula" },
      { vn: "tôi",    pt: "mim",     en: "mine",        cat: "Pronome"  },
    ],
    pt: "Este livro é meu",
    en: "This book is mine",
  },
  {
    tokens: [
      { vn: "Nhà",    pt: "A casa",  en: "The house",   cat: "Substantivo" },
      { vn: "của",    pt: "de",      en: "of",          cat: "Partícula" },
      { vn: "anh",    pt: "você",    en: "you",         cat: "Pronome"  },
      { vn: "rất",    pt: "muito",   en: "very",        cat: "Advérbio" },
      { vn: "rộng",   pt: "espaçosa", en: "spacious",   cat: "Adjetivo" },
    ],
    pt: "A sua casa é muito espaçosa",
    en: "Your house is very spacious",
  },
  {
    tokens: [
      { vn: "Tôi",    pt: "Eu",      en: "I",           cat: "Pronome"  },
      { vn: "sẽ",     pt: "vou",     en: "will",        cat: "Partícula" },
      { vn: "đến",    pt: "vir",     en: "come",        cat: "Verbo"    },
    ],
    pt: "Eu vou vir",
    en: "I will come",
  },
  {
    tokens: [
      { vn: "Tôi",    pt: "Eu",      en: "I",           cat: "Pronome" },
      { vn: "đến từ", pt: "venho de", en: "come from",  cat: "Verbo"   },
      { vn: "Việt Nam", pt: "Vietnã", en: "Vietnam",    cat: "Nome"    },
    ],
    pt: "Eu venho do Vietnã",
    en: "I come from Vietnam",
  },
  {
    tokens: [
      { vn: "Phở",    pt: "Phở",     en: "Phở",         cat: "Substantivo" },
      { vn: "rất",    pt: "muito",   en: "very",        cat: "Advérbio" },
      { vn: "ngon",   pt: "gostoso", en: "delicious",   cat: "Adjetivo" },
    ],
    pt: "Phở é muito gostoso",
    en: "Phở is very delicious",
  },
  {
    tokens: [
      { vn: "Tôi",    pt: "Eu",      en: "I",           cat: "Pronome"  },
      { vn: "rất",    pt: "muito",   en: "very",        cat: "Advérbio" },
      { vn: "vui",    pt: "feliz",   en: "happy",       cat: "Adjetivo" },
    ],
    pt: "Eu estou muito feliz",
    en: "I am very happy",
  },
  {
    tokens: [
      { vn: "Bố",       pt: "Meu",          en: "My",          cat: "Nome"      },
      { vn: "tôi",     pt: "pai / de mim", en: "father (mine)", cat: "Pronome"  },
      { vn: "là",      pt: "é",            en: "is",          cat: "Verbo"    },
      { vn: "giáo viên", pt: "professor",  en: "a teacher",   cat: "Profissão" },
    ],
    pt: "Meu pai é professor (Bố tôi = meu pai)",
    en: "My father is a teacher (Bố tôi = my father)",
  },
  {
    tokens: [
      { vn: "Tôi",    pt: "Eu",      en: "I",           cat: "Pronome"  },
      { vn: "ở",      pt: "moro em", en: "live at",     cat: "Verbo"    },
      { vn: "nhà",    pt: "casa",    en: "home",        cat: "Substantivo" },
    ],
    pt: "Eu moro em casa",
    en: "I live at home",
  },
  {
    tokens: [
      { vn: "Đây",    pt: "Aqui",    en: "This",        cat: "Demonstrativo" },
      { vn: "là",     pt: "é",       en: "is",          cat: "Verbo"    },
      { vn: "nhà",    pt: "a casa",  en: "the house",   cat: "Substantivo" },
      { vn: "của",    pt: "de",      en: "of",          cat: "Partícula" },
      { vn: "tôi",    pt: "mim",     en: "mine",        cat: "Pronome"  },
    ],
    pt: "Esta é a minha casa",
    en: "This is my house",
  },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const LABELS = {
  pt: {
    title: "Montar Frase",
    subtitle: "Coloque as palavras vietnamitas na ordem correta",
    translationLabel: "Significado",
    instruction: "Toque nas palavras na ordem correta para montar a frase",
    check: "Verificar",
    next: "Próxima →",
    restart: "Recomeçar",
    correct: "Perfeito!",
    wrong: "Quase! A ordem correta é:",
    sentenceLabel: "Frase em",
    wordAnalysis: "Análise das palavras",
    progress: "Progresso",
    score: "Acertos",
    clear: "Limpar",
    category: "Categoria",
    meaning: "Significado",
    example: "Exemplo",
  },
  en: {
    title: "Build the Sentence",
    subtitle: "Put the Vietnamese words in the correct order",
    translationLabel: "Meaning",
    instruction: "Tap the words in the correct order to build the sentence",
    check: "Check",
    next: "Next →",
    restart: "Restart",
    correct: "Perfect!",
    wrong: "Almost! The correct order is:",
    sentenceLabel: "Sentence in",
    wordAnalysis: "Word analysis",
    progress: "Progress",
    score: "Correct",
    clear: "Clear",
    category: "Category",
    meaning: "Meaning",
    example: "Example",
  },
};

export default function Ordenar() {
  const { lang } = useLang();
  const L = LABELS[lang] || LABELS.pt;

  // deck and bank MUST be derived from the same shuffle so deck[0] and the
  // initial bank refer to the exact same sentence (number of tokens must match).
  const [deck] = useState(() => shuffle([...SENTENCES]));
  const [idx, setIdx] = useState(0);
  const [placed, setPlaced] = useState([]); // token indices in placement order
  const [bank, setBank] = useState(() => shuffle(deck[0].tokens.map((_, i) => i)));
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = deck[idx];
  const translation = lang === "en" ? current.en : current.pt;

  function addToken(bankIdx) {
    if (checked) return;
    const tokenIdx = bank[bankIdx];
    setPlaced(p => [...p, tokenIdx]);
    setBank(b => b.filter((_, i) => i !== bankIdx));
  }

  function removeToken(placedIdx) {
    if (checked) return;
    const tokenIdx = placed[placedIdx];
    setBank(b => [...b, tokenIdx]);
    setPlaced(p => p.filter((_, i) => i !== placedIdx));
  }

  function clearAll() {
    setPlaced([]);
    setBank(shuffle(current.tokens.map((_, i) => i)));
    setChecked(false);
  }

  function checkAnswer() {
    const correct = placed.every((ti, i) => ti === i) && placed.length === current.tokens.length;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
    setChecked(true);
  }

  function nextSentence() {
    if (idx + 1 >= deck.length) {
      setDone(true);
      return;
    }
    const next = idx + 1;
    setIdx(next);
    setPlaced([]);
    setBank(shuffle(deck[next].tokens.map((_, i) => i)));
    setChecked(false);
    setIsCorrect(false);
  }

  function restart() {
    setIdx(0);
    setPlaced([]);
    setBank(shuffle(deck[0].tokens.map((_, i) => i)));
    setChecked(false);
    setIsCorrect(false);
    setScore(0);
    setDone(false);
  }

  if (done) {
    const pct = score / deck.length;
    return (
      <div className="quiz-wrap">
        <h2 className="section-title">{L.title}</h2>
        <div className="card quiz-result-card">
          <div className="quiz-score-big">{score}/{deck.length}</div>
          <p className="quiz-result-msg">
            {pct === 1
              ? (lang === "en" ? "Perfect score! Flawless!" : "Pontuação perfeita! Incrível!")
              : pct >= 0.7
              ? (lang === "en" ? "Very good! Keep it up!" : "Muito bom! Continue assim!")
              : pct >= 0.5
              ? (lang === "en" ? "Good effort! Review the sentences." : "Bom esforço! Vale revisar.")
              : (lang === "en" ? "Keep studying — you'll get there!" : "Continue estudando, você consegue!")}
          </p>
          <div className="quiz-result-bar">
            <div className="quiz-result-fill" style={{ width: `${pct * 100}%` }} />
          </div>
          <button className="btn-primary" onClick={restart}>{L.restart}</button>
        </div>
      </div>
    );
  }

  const tokens = current.tokens;

  return (
    <div className="quiz-wrap">
      <div className="quiz-topbar">
        <span className="quiz-progress-text">
          {L.progress}: {idx + 1} / {deck.length}
        </span>
        <span className="quiz-score-inline">{L.score}: {score}</span>
      </div>
      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${(idx / deck.length) * 100}%` }} />
      </div>

      <div className="card ordenar-card">
        <p className="ordenar-instruction">{L.instruction}</p>
        <div className="ordenar-translation-box">
          <span className="ordenar-trans-label">{L.translationLabel}:</span>
          <span className="ordenar-trans-text">{translation}</span>
        </div>

        {/* Answer zone */}
        <div className={`ordenar-zone ${checked ? (isCorrect ? "zone-correct" : "zone-wrong") : ""}`}>
          {placed.length === 0 && (
            <span className="ordenar-zone-placeholder">
              {lang === "en" ? "Tap words below to place them here" : "Toque nas palavras abaixo para colocá-las aqui"}
            </span>
          )}
          {placed.map((ti, i) => (
            <button
              key={`placed-${i}`}
              className={`token token-placed ${checked ? (ti === i ? "token-ok" : "token-err") : ""}`}
              onClick={() => removeToken(i)}
              disabled={checked}
            >
              {tokens[ti].vn}
            </button>
          ))}
        </div>

        {/* Bank */}
        <div className="ordenar-bank">
          {bank.map((ti, i) => (
            <button
              key={`bank-${i}`}
              className="token token-bank"
              onClick={() => addToken(i)}
              disabled={checked}
            >
              {tokens[ti].vn}
            </button>
          ))}
        </div>

        <div className="ordenar-actions">
          {!checked ? (
            <>
              <button className="btn-outline" onClick={clearAll}>{L.clear}</button>
              <button
                className="btn-primary"
                onClick={checkAnswer}
                disabled={placed.length !== tokens.length}
              >
                {L.check}
              </button>
            </>
          ) : (
            <button className="btn-primary" onClick={nextSentence}>{L.next}</button>
          )}
        </div>
      </div>

      {checked && (
        <>
          <div className={`quiz-feedback ${isCorrect ? "feedback-correct" : "feedback-wrong"}`}>
            <span className="feedback-icon">{isCorrect ? "✓" : "✗"}</span>
            <span>{isCorrect ? L.correct : L.wrong}</span>
            {!isCorrect && (
              <span className="feedback-right">{tokens.map(t => t.vn).join(" ")}</span>
            )}
          </div>

          <div className="card">
            <h4 className="breakdown-title">{L.wordAnalysis}</h4>
            <div className="ordenar-breakdown-list">
              {tokens.map((t, i) => {
                const col = CAT_COLORS[t.cat] || { bg: "#f1f5f9", text: "#334155" };
                const wordData = palavras.find(w => w.vn.toLowerCase() === t.vn.toLowerCase());
                return (
                  <div key={i} className="ordenar-breakdown-row">
                    <span className="breakdown-vn">{t.vn}</span>
                    <span className="breakdown-arrow">→</span>
                    <span className="breakdown-meaning">
                      {lang === "en"
                        ? (wordData ? wordData.en : t.en || t.pt)
                        : (wordData ? wordData.pt : t.pt)}
                    </span>
                    <span className="breakdown-cat" style={{ background: col.bg, color: col.text }}>
                      {t.cat}
                    </span>
                    {wordData && wordData.exemplo && (
                      <span className="breakdown-ex">— {wordData.exemplo}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
