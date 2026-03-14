import { useState } from "react";
import { palavras, categorias, CAT_COLORS } from "../data/vocabulario";

const STORAGE_KEY = "vn_known";
const loadKnown = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
const saveKnown = (obj) => localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));

const CAT_DEFS = [
  { cat: "Verbo",        icon: "⚡", desc: "Ação ou estado — o que alguém faz ou é.", ex: "ăn = comer · ngủ = dormir · là = ser/estar" },
  { cat: "Substantivo",  icon: "🏷️", desc: "Pessoa, lugar ou coisa.", ex: "nhà = casa · sách = livro · người = pessoa" },
  { cat: "Adjetivo",     icon: "🎨", desc: "Descreve ou qualifica um substantivo.", ex: "đẹp = bonito · lớn = grande · nhỏ = pequeno" },
  { cat: "Advérbio",     icon: "📐", desc: "Modifica um verbo ou adjetivo, indica grau ou tempo.", ex: "rất = muito · không = não · đây = aqui" },
  { cat: "Pronome",      icon: "👤", desc: "Substitui o nome de uma pessoa na frase.", ex: "tôi = eu · bạn = você · anh = irmão/você (homem)" },
  { cat: "Saudação",     icon: "👋", desc: "Cumprimento, despedida ou cortesia.", ex: "Xin chào = Olá · Tạm biệt = Tchau" },
  { cat: "Expressão",    icon: "💬", desc: "Frase idiomática com sentido fixo, usada no dia a dia.", ex: "Cảm ơn = Obrigado · Xin lỗi = Desculpe" },
  { cat: "Interjeição",  icon: "😲", desc: "Exclamação espontânea de emoção ou reação.", ex: "Ồ! = Oh! · Ôi! = Ai! · Ừ = Uh-hum" },
  { cat: "Interrogativo",icon: "❓", desc: "Palavra usada para fazer perguntas.", ex: "gì = o quê · đâu = onde · ai = quem · sao = por quê" },
  { cat: "Conjunção",    icon: "🔗", desc: "Conecta palavras ou orações.", ex: "và = e · nhưng = mas · vì = porque" },
  { cat: "Partícula",    icon: "🔹", desc: "Marcador gramatical sem tradução direta — indica tom, ênfase ou pergunta no final da frase.", ex: "nhé (combinado) · ạ (respeito) · không (pergunta)" },
  { cat: "Demonstrativo",icon: "👉", desc: "Indica posição de algo no espaço.", ex: "này = este/aqui · đó = esse/aí · kia = aquele/lá" },
  { cat: "Confirmação",  icon: "✅", desc: "Resposta afirmativa ou negativa direta.", ex: "vâng / có = sim · không = não" },
  { cat: "Profissão",    icon: "💼", desc: "Título ou ocupação de uma pessoa.", ex: "bác sĩ = médico · giáo viên = professor" },
  { cat: "Nome",         icon: "🏷️", desc: "Nome próprio de pessoa ou lugar.", ex: "Hà Nội · Sài Gòn · Việt Nam" },
  { cat: "Número",       icon: "🔢", desc: "Numeral, cardinal ou ordinal.", ex: "một = 1 · mười = 10 · trăm = 100" },
];

function LegendaCategorias() {
  const [open, setOpen] = useState(false);
  return (
    <div className="card" style={{ marginBottom: 20 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between", padding: 0 }}
      >
        <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>📖 O que significa cada categoria?</span>
        <span style={{ fontSize: 18, color: "var(--text-muted)", transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }}>▾</span>
      </button>
      {open && (
        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
          {CAT_DEFS.map(({ cat, icon, desc, ex }) => {
            const colors = CAT_COLORS[cat] || { bg: "#f1f5f9", text: "#475569" };
            return (
              <div key={cat} style={{ background: colors.bg, borderRadius: 9, padding: "11px 14px", border: `1px solid ${colors.text}22` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
                  <span>{icon}</span>
                  <span style={{ fontWeight: 700, fontSize: 13, color: colors.text }}>{cat}</span>
                </div>
                <div style={{ fontSize: 12.5, color: "var(--text)", lineHeight: 1.5 }}>{desc}</div>
                <div style={{ fontSize: 11.5, color: "var(--text-muted)", marginTop: 4, fontStyle: "italic" }}>{ex}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Vocabulario() {
  const [search, setSearch]         = useState("");
  const [catFilter, setCatFilter]   = useState("Todos");
  const [onlyUnknown, setOnlyUnknown] = useState(false);
  const [known, setKnown]           = useState(loadKnown);

  const filtered = palavras.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.vn.toLowerCase().includes(q) || p.pt.toLowerCase().includes(q);
    const matchCat    = catFilter === "Todos" || p.categoria === catFilter;
    const matchKnown  = !onlyUnknown || !known[p.vn];
    return matchSearch && matchCat && matchKnown;
  });

  const toggleKnown = (vn) => {
    const next = { ...known };
    if (next[vn]) delete next[vn];
    else next[vn] = true;
    setKnown(next);
    saveKnown(next);
  };

  const knownCount = Object.keys(known).length;
  const pct = Math.round((knownCount / palavras.length) * 100);

  return (
    <div>
      <h2 className="page-title">📚 Vocabulário</h2>
      <p className="page-subtitle">Pesquise, filtre por categoria e marque o que já aprendeu.</p>

      <div className="stats-bar">
        <div className="stat-box">
          <div className="stat-num">{palavras.length}</div>
          <div className="stat-label">Total de palavras</div>
        </div>
        <div className="stat-box">
          <div className="stat-num" style={{ color: "#10b981" }}>{knownCount}</div>
          <div className="stat-label">Já aprendi ✓</div>
        </div>
        <div className="stat-box">
          <div className="stat-num" style={{ color: "#f59e0b" }}>{palavras.length - knownCount}</div>
          <div className="stat-label">Falta aprender</div>
        </div>
        <div className="stat-box">
          <div className="stat-num" style={{ color: "#4f46e5" }}>{pct}%</div>
          <div className="stat-label">Progresso</div>
        </div>
      </div>

      <LegendaCategorias />

      <div className="card">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="search-bar"
            type="text"
            placeholder="Buscar em vietnamita ou português..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-bar">
          {["Todos", ...categorias].map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${catFilter === cat ? "active" : ""}`}
              onClick={() => setCatFilter(cat)}
            >
              {cat}
            </button>
          ))}
          <label className="filter-toggle">
            <input
              type="checkbox"
              checked={onlyUnknown}
              onChange={(e) => setOnlyUnknown(e.target.checked)}
            />
            Só o que não sei
          </label>
        </div>

        <p className="count-label">
          Mostrando <strong>{filtered.length}</strong> de {palavras.length} palavras
        </p>

        <div style={{ overflowX: "auto" }}>
          <table className="vocab-table">
            <thead>
              <tr>
                <th>Vietnamita</th>
                <th>Português</th>
                <th>Categoria</th>
                <th>Exemplo</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const isKnown = !!known[p.vn];
                const colors  = CAT_COLORS[p.categoria] || { bg: "#f1f5f9", text: "#475569" };
                return (
                  <tr key={p.vn} className={isKnown ? "known" : ""}>
                    <td><span className="vn-word">{p.vn}</span></td>
                    <td>{p.pt}</td>
                    <td>
                      <span className="cat-badge" style={{ background: colors.bg, color: colors.text }}>
                        {p.categoria}
                      </span>
                    </td>
                    <td>
                      {p.exemplo && <span className="example-text">{p.exemplo}</span>}
                    </td>
                    <td>
                      <button
                        className={`known-btn ${isKnown ? "is-known" : ""}`}
                        onClick={() => toggleKnown(p.vn)}
                      >
                        {isKnown ? "✓ Aprendi" : "Marcar"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
