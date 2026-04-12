import { useState, useRef, useEffect } from "react";
import { palavras, categorias, CAT_COLORS } from "../data/vocabulario";

const iconBtn = (extra = {}) => ({
  background: "rgba(255,255,255,0.18)", border: "none", color: "white",
  cursor: "pointer", borderRadius: 5, padding: "3px 8px",
  fontSize: 13, fontWeight: 700, lineHeight: 1, fontFamily: "inherit",
  flexShrink: 0,
  ...extra,
});

const thStyle = {
  textAlign: "left", padding: "6px 10px",
  fontSize: 10, fontWeight: 700, textTransform: "uppercase",
  letterSpacing: "0.05em", color: "var(--text-muted)",
  borderBottom: "2px solid var(--border)", background: "var(--bg-card)",
  position: "sticky", top: 0, zIndex: 1,
};

const STORAGE_POS = "vn_overlay_pos";

const loadPos = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_POS));
    if (saved && typeof saved.x === "number") return saved;
  } catch {}
  return { x: Math.max(10, window.innerWidth - 440), y: 80 };
};

export default function VocabOverlay() {
  const [open, setOpen]           = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [pinned, setPinned]       = useState(false);   // 📌 locked position
  const [search, setSearch]       = useState("");
  const [catFilter, setCatFilter] = useState("Todos");
  const [pos, setPos]             = useState(loadPos);
  const dragging                  = useRef(false);
  const dragStart                 = useRef(null);

  // Ctrl+Shift+V to toggle
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "V") setOpen((o) => !o);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Global drag handlers — attached once, always listening
  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current || !dragStart.current) return;
      const dx = e.clientX - dragStart.current.mx;
      const dy = e.clientY - dragStart.current.my;
      setPos({ x: dragStart.current.px + dx, y: dragStart.current.py + dy });
    };

    // Stop dragging on mouseup OR when window loses focus (fixes "stuck drag")
    const stopDrag = () => {
      dragging.current = false;
      dragStart.current = null;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("blur", stopDrag);
    window.addEventListener("visibilitychange", stopDrag);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("blur", stopDrag);
      window.removeEventListener("visibilitychange", stopDrag);
    };
  }, []);

  // Save position to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_POS, JSON.stringify(pos));
  }, [pos]);

  const startDrag = (e) => {
    if (pinned) return;            // locked — don't move
    if (e.button !== 0) return;    // only left mouse button
    e.preventDefault();
    dragging.current = true;
    dragStart.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
  };

  const filtered = palavras.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.vn.toLowerCase().includes(q) ||
      p.pt.toLowerCase().includes(q) ||
      (p.en && p.en.toLowerCase().includes(q));
    return matchSearch && (catFilter === "Todos" || p.categoria === catFilter);
  });

  const openPopup = (e) => {
    e.stopPropagation();
    window.open(
      window.location.origin + window.location.pathname + "?mode=popup",
      "vocab_popup",
      "width=520,height=700,resizable=yes,scrollbars=yes"
    );
  };

  // ——— Closed state: floating trigger button ———
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        title="Busca rápida de vocabulário (Ctrl+Shift+V)"
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
        📚
      </button>
    );
  }

  const isMinimized = minimized;
  const headerRadius = isMinimized ? "var(--radius)" : "var(--radius) var(--radius) 0 0";

  return (
    <div
      onMouseDown={(e) => e.stopPropagation()} // prevent clicks from bubbling to page
      style={{
        position: "fixed",
        left: Math.max(0, Math.min(pos.x, window.innerWidth - 420)),
        top: Math.max(0, Math.min(pos.y, window.innerHeight - 60)),
        width: 410,
        zIndex: 9000,
        background: "var(--bg-card)",
        border: pinned
          ? "2px solid var(--primary)"
          : "1.5px solid var(--border)",
        borderRadius: "var(--radius)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ——— Header / drag handle ——— */}
      <div
        onMouseDown={startDrag}
        style={{
          padding: "9px 12px",
          background: pinned ? "#3730a3" : "var(--primary)",
          borderRadius: headerRadius,
          display: "flex",
          alignItems: "center",
          gap: 6,
          cursor: pinned ? "default" : "grab",
          transition: "background 0.2s",
        }}
      >
        <span style={{ fontSize: 14, color: "white", fontWeight: 700, flex: 1, pointerEvents: "none", userSelect: "none" }}>
          📚 Vocabulário
        </span>

        {/* Pin button */}
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); setPinned((p) => !p); }}
          title={pinned ? "Desafixar (pode arrastar)" : "Fixar posição"}
          style={iconBtn({ background: pinned ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.18)" })}
        >
          {pinned ? "📌" : "📍"}
        </button>

        {/* Open in new window */}
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={openPopup}
          title="Abrir em janela separada"
          style={iconBtn()}
        >
          ↗
        </button>

        {/* Minimize / restore */}
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); setMinimized((m) => !m); }}
          title={isMinimized ? "Expandir" : "Minimizar"}
          style={iconBtn()}
        >
          {isMinimized ? "▲" : "▼"}
        </button>

        {/* Close */}
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); setOpen(false); }}
          title="Fechar (Ctrl+Shift+V para reabrir)"
          style={iconBtn({ background: "rgba(220,50,50,0.5)" })}
        >
          ✕
        </button>
      </div>

      {/* ——— Body ——— */}
      {!isMinimized && (
        <div
          style={{
            padding: "10px 12px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            maxHeight: "min(520px, calc(100vh - 140px))",
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
              width: "100%", padding: "7px 13px",
              border: "1.5px solid var(--border)",
              borderRadius: "var(--radius-full)",
              fontSize: 13, fontFamily: "inherit",
              outline: "none", background: "var(--bg)", color: "var(--text)",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--primary-light)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />

          {/* Category filters */}
          <div style={{ display: "flex", gap: 5, overflowX: "auto", paddingBottom: 2, scrollbarWidth: "none" }}>
            {["Todos", ...categorias].map((cat) => (
              <button
                key={cat}
                onClick={() => setCatFilter(cat)}
                style={{
                  padding: "3px 9px", borderRadius: "var(--radius-full)",
                  border: "1.5px solid var(--border)",
                  background: catFilter === cat ? "var(--primary)" : "var(--bg-card)",
                  color: catFilter === cat ? "white" : "var(--text-muted)",
                  fontSize: 11, fontFamily: "inherit", cursor: "pointer",
                  whiteSpace: "nowrap", flexShrink: 0, transition: "var(--transition)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Count */}
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
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
                {filtered.slice(0, 120).map((p) => {
                  const colors = CAT_COLORS[p.categoria] || { bg: "#f1f5f9", text: "#475569" };
                  return (
                    <tr
                      key={p.vn}
                      title={p.gramNote || ""}
                      style={{ borderBottom: "1px solid var(--border)", cursor: "default" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f4ff")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "6px 10px", fontWeight: 700, color: "var(--primary)" }}>
                        {p.vn}
                      </td>
                      <td style={{ padding: "6px 10px", color: "var(--text)" }}>{p.pt}</td>
                      <td style={{ padding: "6px 10px" }}>
                        <span style={{
                          background: colors.bg, color: colors.text,
                          padding: "2px 6px", borderRadius: "var(--radius-full)",
                          fontSize: 10, fontWeight: 600, whiteSpace: "nowrap",
                        }}>
                          {p.categoria}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length > 120 && (
              <div style={{ textAlign: "center", padding: "8px 0", fontSize: 11, color: "var(--text-muted)" }}>
                +{filtered.length - 120} resultados — refine a busca
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
