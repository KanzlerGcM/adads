import { useState } from "react";
import { palavras, categorias, CAT_COLORS } from "../data/vocabulario";

const STORAGE_KEY = "vn_known";
const loadKnown = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
const saveKnown = (obj) => localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));

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
