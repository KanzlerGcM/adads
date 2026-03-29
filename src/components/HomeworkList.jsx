import { useState } from "react";
import { homeworks, getHomeworkStatus, setHomeworkStatus, formatDate } from "../data/homeworks";
import { useLang } from "../contexts/LangContext";

export default function HomeworkList({ onOpen }) {
  const { lang } = useLang();
  const isPt = lang !== "en";
  const [, forceUpdate] = useState(0);

  const toggleStatus = (e, hw) => {
    e.stopPropagation();
    const current = getHomeworkStatus(hw);
    setHomeworkStatus(hw.id, current === "submitted" ? "pending" : "submitted");
    forceUpdate(n => n + 1);
  };

  return (
    <div>
      <h2 className="page-title">📝 {isPt ? "Tarefas de Casa" : "Homework"}</h2>
      <p className="page-subtitle">
        {isPt ? "Clique em uma tarefa para ver o conteúdo completo e praticar as palavras novas." : "Click a homework to view it and practice its new words."}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {homeworks.map(hw => {
          const status = getHomeworkStatus(hw);
          const submitted = status === "submitted";
          return (
            <div
              key={hw.id}
              onClick={() => onOpen(hw.id)}
              style={{
                background: "var(--bg-card)", border: `1.5px solid ${submitted ? "#6ee7b7" : "var(--border)"}`,
                borderRadius: "var(--radius)", padding: "18px 22px", cursor: "pointer",
                transition: "box-shadow 0.18s, border-color 0.18s",
                boxShadow: "var(--shadow-sm)",
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "var(--shadow)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "var(--shadow-sm)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text)", marginBottom: 4 }}>{hw.title}</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>{hw.titlePt}</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                    <span style={{ background: "#eef2ff", color: "#4338ca", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>
                      📅 {formatDate(hw.date, lang)}
                    </span>
                    <span style={{ background: "#f1f5f9", color: "#475569", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999 }}>
                      🆕 {hw.palavrasNovas.length} {isPt ? "palavras novas" : "new words"}
                    </span>
                    <span style={{ background: "#f1f5f9", color: "#475569", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999 }}>
                      ✏️ {hw.partes.length} {isPt ? "partes" : "parts"}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                  {/* Status badge + toggle */}
                  <button
                    onClick={(e) => toggleStatus(e, hw)}
                    style={{
                      padding: "6px 14px", borderRadius: 999, border: "none", cursor: "pointer",
                      fontWeight: 700, fontSize: 12, fontFamily: "inherit",
                      background: submitted ? "#d1fae5" : "#fef3c7",
                      color: submitted ? "#065f46" : "#92400e",
                      transition: "background 0.2s",
                    }}
                    title={isPt ? "Clique para mudar o status" : "Click to toggle status"}
                  >
                    {submitted ? "✅ " : "⏳ "}
                    {submitted ? (isPt ? "Entregue" : "Submitted") : (isPt ? "Para entregar" : "Pending")}
                    <span style={{ marginLeft: 6, opacity: 0.6, fontWeight: 400 }}>↻</span>
                  </button>
                  <span style={{ fontSize: 12, color: "var(--primary)", fontWeight: 600 }}>
                    {isPt ? "Ver tarefa →" : "Open →"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {homeworks.length === 0 && (
        <div className="card" style={{ textAlign: "center", padding: 48 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>{isPt ? "Nenhuma tarefa ainda!" : "No homework yet!"}</div>
        </div>
      )}
    </div>
  );
}
