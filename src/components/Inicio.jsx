import { useMemo } from "react";
import { palavras } from "../data/vocabulario";

const STORAGE_KEY = "vn_known";

const FATOS = [
  {
    icon: "🎵",
    titulo: "Língua Tonal — 6 Tons",
    desc: 'A mesma sílaba muda totalmente de significado com o tom. "Ma" pode ser fantasma, arroz, mas, mãe, polegar ou casco — 6 palavras diferentes, mesmo som base!',
  },
  {
    icon: "📐",
    titulo: "Sem Conjugação Verbal",
    desc: 'Verbos nunca mudam. "Ăn" = comer para todo mundo, em qualquer tempo. Use SẼ (futuro) ou ĐÃ (passado) antes do verbo para indicar o tempo.',
  },
  {
    icon: "⚖️",
    titulo: "Ordem SVO — Igual ao Português!",
    desc: 'Sujeito → Verbo → Objeto, exatamente como no português. "Tôi ăn phở" = "Eu como phở". Estrutura idêntica — grande vantagem para falantes de português!',
  },
  {
    icon: "⚧️",
    titulo: "Sem Gênero Gramatical",
    desc: 'Substantivos e adjetivos não têm forma masculina ou feminina. "Đẹp" significa bonito E bonita. O adjetivo nunca muda.',
  },
  {
    icon: "🔢",
    titulo: "Sem Plural Formal",
    desc: 'Não há sufixo de plural. "Người" = pessoa ou pessoas. O contexto ou um numeral indica o número: "ba người" = três pessoas.',
  },
  {
    icon: "👥",
    titulo: "Pronomes por Relação de Idade",
    desc: '"Você" em vietnamita pode ser Bạn, Anh, Chị, Em, Ông, Bà — escolhido conforme a idade e gênero de quem você fala. Usar o errado é considerado desrespeitoso.',
  },
];

const PATH = [
  {
    id: "tons",
    icon: "🎵",
    label: "Tons & Pronúncia",
    tag: "Comece aqui!",
    tagColor: "#4f46e5",
    desc: "Base absoluta da língua. Os 6 tons determinam o significado de cada sílaba. Sem eles, você fala palavras completamente diferentes sem perceber.",
  },
  {
    id: "alfa",
    icon: "🔤",
    label: "Alfabeto",
    tag: "2.º passo",
    tagColor: "#0891b2",
    desc: "12 vogais, combinações de vogais, todas as consoantes iniciais e finais, regras especiais (C/K, G/GH) e diferenças Norte × Sul.",
  },
  {
    id: "gram",
    icon: "🏗️",
    label: "Gramática",
    tag: "3.º passo",
    tagColor: "#7c3aed",
    desc: "10 estruturas essenciais — LÀ, CỦA, adjetivos, perguntas, futuro, demonstrativos, pronomes por relação de idade e classificadores.",
  },
  {
    id: "nums",
    icon: "🔢",
    label: "Números",
    tag: "4.º passo",
    tagColor: "#b45309",
    desc: "Do 1 ao bilhão. Inclui as regras especiais: MỐT (1 após dezenas), LĂM (5 após dezenas), LINH (zero na dezena de centenas).",
  },
  {
    id: "conv",
    icon: "💬",
    label: "Frases Situacionais",
    tag: "5.º passo",
    tagColor: "#059669",
    desc: "8 categorias de frases prontas: saudações, cortesias, apresentações, restaurante, compras, direções, família e emergências. + 2 diálogos anotados.",
  },
  {
    id: "vocab",
    icon: "📚",
    label: "Vocabulário",
    tag: "6.º passo",
    tagColor: "#0369a1",
    desc: "83 palavras dos PDFs com exemplos reais. Filtre por categoria (Verbo, Adjetivo, etc.), busque em ambos os idiomas e marque o que já aprendeu.",
  },
  {
    id: "flash",
    icon: "🎴",
    label: "Flashcards",
    tag: "Pratique sempre",
    tagColor: "#be185d",
    desc: "Cartas interativas com flip 3D. Modos VN→PT e PT→VN. Filtre por categoria, use 'só o que não sei' e acompanhe seu progresso.",
  },
];

export default function Inicio({ onNavigate }) {
  const known = useMemo(
    () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"),
    []
  );
  const knownCount = Object.keys(known).length;
  const pct = Math.round((knownCount / palavras.length) * 100);

  const progressMsg =
    pct === 0
      ? "Você ainda não marcou nenhuma palavra. Comece pelos Tons! 🎵"
      : pct < 30
      ? `Bom início! Você marcou ${knownCount} palavras. Continue!`
      : pct < 70
      ? `Ótimo progresso! ${knownCount} de ${palavras.length} palavras aprendidas.`
      : pct < 100
      ? `Quase lá! Faltam apenas ${palavras.length - knownCount} palavras.`
      : "🎉 Incrível! Você aprendeu todas as palavras do guia!";

  return (
    <div>
      <h2 className="page-title">🇻🇳 Guia de Estudo de Vietnamita</h2>
      <p className="page-subtitle">
        Tudo organizado na ordem certa — do zero ao básico conversacional.
      </p>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat-box">
          <div className="stat-num">{palavras.length}</div>
          <div className="stat-label">Palavras no guia</div>
        </div>
        <div className="stat-box">
          <div className="stat-num" style={{ color: "#10b981" }}>{knownCount}</div>
          <div className="stat-label">Já aprendi ✓</div>
        </div>
        <div className="stat-box">
          <div className="stat-num" style={{ color: "#f59e0b" }}>
            {palavras.length - knownCount}
          </div>
          <div className="stat-label">Faltam aprender</div>
        </div>
        <div className="stat-box">
          <div className="stat-num" style={{ color: "var(--primary)" }}>{pct}%</div>
          <div className="stat-label">Progresso</div>
        </div>
      </div>

      {/* Progress */}
      <div className="card">
        <div className="card-title">📊 Progresso do Vocabulário</div>
        <div className="progress-bar-bg" style={{ height: 10, marginBottom: 8 }}>
          <div className="progress-bar-fill" style={{ width: `${pct}%`, height: 10 }} />
        </div>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{progressMsg}</p>
      </div>

      {/* Learning path */}
      <div className="card">
        <div className="card-title">🗺️ Caminho de Aprendizado Recomendado</div>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>
          Clique em qualquer etapa para ir direto ao conteúdo. Siga a ordem para
          o melhor aproveitamento.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {PATH.map((step, i) => (
            <button
              key={step.id}
              onClick={() => onNavigate(step.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "12px 16px",
                background: "#f8fafc",
                border: "1.5px solid var(--border)",
                borderRadius: 10,
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                fontFamily: "inherit",
                transition: "background 0.15s, border-color 0.15s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#eef2ff";
                e.currentTarget.style.borderColor = "#a5b4fc";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#f8fafc";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: step.tagColor,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div style={{ fontSize: 20, flexShrink: 0 }}>{step.icon}</div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexWrap: "wrap",
                    marginBottom: 3,
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: "var(--text)",
                    }}
                  >
                    {step.label}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 20,
                      background: step.tagColor + "18",
                      color: step.tagColor,
                    }}
                  >
                    {step.tag}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-muted)",
                    lineHeight: 1.5,
                  }}
                >
                  {step.desc}
                </div>
              </div>
              <span
                style={{
                  color: "var(--text-muted)",
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                ›
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Facts */}
      <div className="card">
        <div className="card-title">📌 6 Fatos Essenciais sobre o Vietnamita</div>
        <p
          style={{
            fontSize: 13,
            color: "var(--text-muted)",
            marginBottom: 14,
          }}
        >
          Entender estes pontos muda como você aprende e evita os erros mais
          comuns de iniciantes.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 12,
          }}
        >
          {FATOS.map((f, i) => (
            <div
              key={i}
              style={{
                background: "#f8fafc",
                border: "1.5px solid var(--border)",
                borderRadius: 10,
                padding: "14px 16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <span style={{ fontSize: 22 }}>{f.icon}</span>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 13.5,
                    color: "var(--text)",
                  }}
                >
                  {f.titulo}
                </span>
              </div>
              <p
                style={{
                  fontSize: 12.5,
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
