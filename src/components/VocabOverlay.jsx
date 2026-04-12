import { useState, useRef, useEffect, useCallback } from "react";
import { palavras, categorias, CAT_COLORS } from "../data/vocabulario";

const iconBtnStyle = {
  background: "rgba(255,255,255,0.18)", border: "none", color: "white",
  cursor: "pointer", borderRadius: 5, padding: "3px 8px",
  fontSize: 13, fontWeight: 700, lineHeight: 1, fontFamily: "inherit",
};

const thStyle = {
  textAlign: "left", padding: "6px 10px",
  fontSize: 10, fontWeight: 700, textTransform: "uppercase",
  letterSpacing: "0.05em", color: "var(--text-muted)",
  borderBottom: "2px solid var(--border)", background: "var(--bg-card)",
};

export default function VocabOverlay() {
  const [open, setOpen]           = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [search, setSearch]       = useState("");
  const [catFilter, setCatFilter] = useState("Todos");
  const [pos, setPos]             = useState(() => ({
    x: Math.max(10, window.innerWidth - 440),
    y: 80,
  }));
  const [dragging, setDragging]   = useState(false);
  const dragRef                   = useRef(null);

  // Ctrl+Shift+V to toggle
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "V") {
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const onMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      dragRef.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
      setDragging(true);
    },
    [pos]
  );

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      const dx = e.clientX - dragRef.current.mx;
      const dy = e.clientY - dragRef.current.my;
      setPos({ x: dragRef.current.px + dx, y: dragRef.current.py + dy });
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  const filtered = palavras.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.vn.toLowerCase().includes(q) ||
      p.pt.toLowerCase().includes(q) ||
      (p.en && p.en.toLowerCase().includes(q));
    const matchCat = catFilter === "Todos" || p.categoria === catFilter;
    return matchSearch && matchCat;
  });

  const openPopup = () => {
    window.open(
      window.location.origin + window.location.pathname + "?mode=popup",
      "vocab_popup",
      "width=480,height=680,resizable=yes,scrollbars=yes"
    );
  };

  // Floating trigger button when closed
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        title="Busca de vocabulário (Ctrl+Shift+V)"
        style={{
          position: "fixed", bottom: 88, right: 24, zIndex: 8000,
          width: 50, height: 50, borderRadius: "50%",
          background: "var(--primary)", color: "white",
          border: "none", cursor: "pointer",
          fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 18px rgba(79,70,229,0.45)",
          transition: "transform 0.15s, box-shadow 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 6px 22px rgba(79,70,229,0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 18px rgba(79,70,229,0.45)";
        }}
      >
        🔍
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: 410,
        zIndex: 9000,
        background: "var(--bg-card)",
        border: "1.5px solid var(--border)",
        borderRadius: "var(--radius)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
        display: "flex",
        flexDirection: "column",
        userSelect: dragging ? "none" : "auto",
      }}
    >
      {/* ——— Drag header ——— */}
      <div
        onMouseDown={onMouseDown}
        style={{
          padding: "9px 12px",
          background: "var(--primary)",
          borderRadius: minimized
            ? "var(--radius)"
            : "var(--radius) var(--radius) 0 0",
          display: "flex",
          alignItems: "center",
          gap: 7,
          cursor: dragging ? "grabbing" : "grab",
        }}
      >
        <span style={{ fontSize: 14, color: "white", fontWeight: 700, flex: 1, pointerEvents: "none" }}>
          📚 Vocabulário
        </span>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", marginRight: 4, pointerEvents: "none" }}>
          Ctrl+Shift+V
        </span>
        <button onClick={openPopup} title="Abrir em janela separada" style={iconBtnStyle}>↗</button>
        <button
          onClick={() => setMinimized((m) => !m)}
          title={minimized ? "Expandir" : "Minimizar"}
          style={iconBtnStyle}
        >
          {minimized ? "▲" : "▼"}
        </button>
        <button
          onClick={() => setOpen(false)}
          title="Fechar"
          style={{ ...iconBtnStyle, background: "rgba(255,80,80,0.35)" }}
        >
          ✕
        </button>
      </div>

      {/* ——— Body ——— */}
      {!minimized && (
        <div
          style={{
            padding: "10px 12px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            maxHeight: "calc(100vh - 160px)",
            overflow: "hidden",
          }}
        >
          {/* Search */}
          <input
            autoFocus
            type="text"
            placeholder="Buscar em vietnamita, português ou inglês..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "7px 13px",
              border: "1.5px solid var(--border)",
              borderRadius: "var(--radius-full)",
              fontSize: 13,
              fontFamily: "inherit",
              outline: "none",
              background: "var(--bg)",
              color: "var(--text)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--primary-light)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />

          {/* Category filters */}
          <div
            style={{
              display: "flex",
              gap: 5,
              overflowX: "auto",
              paddingBottom: 3,
              scrollbarWidth: "none",
            }}
          >
            {["Todos", ...categorias].map((cat) => (
              <button
                key={cat}
                onClick={() => setCatFilter(cat)}
                style={{
                  padding: "3px 9px",
                  borderRadius: "var(--radius-full)",
                  border: "1.5px solid var(--border)",
                  background: catFilter === cat ? "var(--primary)" : "var(--bg-card)",
                  color: catFilter === cat ? "white" : "var(--text-muted)",
                  fontSize: 11,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  transition: "var(--transition)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Count */}
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: -2 }}>
            {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
          </div>

          {/* Table */}
          <div style={{ overflowY: "auto", flex: 1 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
              <thead>
                <tr>
                  <th style={thStyle}>Vietnamita</th>
                  <th style={thStyle}>Português</th>
                  <th style={thStyle}>Cat.</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 100).map((p) => {
                  const colors = CAT_COLORS[p.categoria] || { bg: "#f1f5f9", text: "#475569" };
                  return (
                    <tr
                      key={p.vn}
                      style={{ borderBottom: "1px solid var(--border)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f8faff")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "6px 10px", fontWeight: 700, color: "var(--primary)", fontFamily: "inherit" }}>
                        {p.vn}
                      </td>
                      <td style={{ padding: "6px 10px", color: "var(--text)" }}>{p.pt}</td>
                      <td style={{ padding: "6px 10px" }}>
                        <span
                          style={{
                            background: colors.bg,
                            color: colors.text,
                            padding: "2px 6px",
                            borderRadius: "var(--radius-full)",
                            fontSize: 10,
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {p.categoria}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length > 100 && (
              <div style={{ textAlign: "center", padding: "8px 0", fontSize: 11, color: "var(--text-muted)" }}>
                +{filtered.length - 100} resultados — refine a busca
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
