import { useState } from "react";
import { useLang } from "../contexts/LangContext";

const PDF_GROUPS = [
  {
    tema: "Pronúncia e Tons",
    icone: "🎵",
    pdfs: [
      { label: "Pronúncia e Tons",  path: "/PDFs/01 - Pronuncia e Tons/Pronuncia e Tons.pdf" },
      { label: "Prática de Pronúncia", path: "/PDFs/01 - Pronuncia e Tons/Pratica de Pronuncia.pdf" },
    ],
  },
  {
    tema: "Vogais",
    icone: "🔤",
    pdfs: [
      { label: "Vogais", path: "/PDFs/02 - Vogais/Vogais.pdf" },
    ],
  },
  {
    tema: "Consoantes",
    icone: "🔡",
    pdfs: [
      { label: "Consoantes", path: "/PDFs/03 - Consoantes/Consoantes.pdf" },
    ],
  },
  {
    tema: "Pronomes",
    icone: "🧑",
    pdfs: [
      { label: "Pronomes", path: "/PDFs/04 - Pronomes/Pronomes.pdf" },
    ],
  },
  {
    tema: "Saudações",
    icone: "👋",
    pdfs: [
      { label: "Saudações", path: "/PDFs/05 - Saudacoes/Saudacoes.pdf" },
    ],
  },
  {
    tema: "Números",
    icone: "🔢",
    pdfs: [
      { label: "Números", path: "/PDFs/06 - Numeros/Numeros.pdf" },
    ],
  },
  {
    tema: "Família",
    icone: "👨‍👩‍👧",
    pdfs: [
      { label: "Família", path: "/PDFs/07 - Familia/Familia.pdf" },
    ],
  },
  {
    tema: "Horas",
    icone: "🕐",
    pdfs: [
      { label: "Bây Giờ Là Mấy Giờ?", path: "/PDFs/08 - Horas/Horas (Bay Gio La May Gio).pdf" },
    ],
  },
  {
    tema: "Casa",
    icone: "🏠",
    pdfs: [
      { label: "Nhà Của Anh Rất Đẹp", path: "/PDFs/09 - Casa/Casa (Nha Cua Anh Rat Dep).pdf" },
    ],
  },
  {
    tema: "Aniversário",
    icone: "🎂",
    pdfs: [
      { label: "Sinh Nhật", path: "/PDFs/10 - Aniversario/Aniversario (Sinh Nhat).pdf" },
    ],
  },
  {
    tema: "Idade e Trabalho",
    icone: "💼",
    pdfs: [
      { label: "Bao Nhiêu Tuổi?", path: "/PDFs/11 - Idade e Trabalho/Idade e Trabalho (Bao Nhieu Tuoi).pdf" },
    ],
  },
  {
    tema: "Guia Completo",
    icone: "📖",
    pdfs: [
      { label: "Guia Completo de Vietnamita", path: "/PDFs/12 - Guia Completo/Guia Completo de Vietnamita.pdf" },
    ],
  },
];

export default function PDFs() {
  const { lang } = useLang();
  const [selectedPdf, setSelectedPdf] = useState(PDF_GROUPS[0].pdfs[0]);
  const [openGroup, setOpenGroup] = useState(0);

  return (
    <div style={{ display: "flex", gap: 0, height: "calc(100vh - 80px)", minHeight: 500 }}>
      {/* Painel lateral */}
      <aside style={{
        width: 240,
        minWidth: 200,
        background: "var(--bg-card, #1e2130)",
        borderRight: "1px solid var(--border, #2a2d3e)",
        overflowY: "auto",
        flexShrink: 0,
        padding: "8px 0",
      }}>
        <div style={{
          padding: "12px 16px 8px",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1,
          color: "var(--text-muted, #888)",
          textTransform: "uppercase",
        }}>
          {lang === "en" ? "Class PDFs" : "PDFs de Aula"}
        </div>

        {PDF_GROUPS.map((group, gi) => (
          <div key={gi}>
            <button
              onClick={() => setOpenGroup(openGroup === gi ? -1 : gi)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                background: openGroup === gi ? "var(--bg-hover, #252840)" : "transparent",
                border: "none",
                color: "var(--text-primary, #e0e0e0)",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                textAlign: "left",
              }}
            >
              <span>{group.icone}</span>
              <span style={{ flex: 1 }}>{group.tema}</span>
              <span style={{ fontSize: 10, color: "var(--text-muted, #888)" }}>
                {openGroup === gi ? "▲" : "▼"}
              </span>
            </button>

            {openGroup === gi && group.pdfs.map((pdf, pi) => (
              <button
                key={pi}
                onClick={() => setSelectedPdf(pdf)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 16px 6px 36px",
                  background: selectedPdf.path === pdf.path
                    ? "var(--accent-bg, rgba(99,102,241,0.15))"
                    : "transparent",
                  border: "none",
                  borderLeft: selectedPdf.path === pdf.path
                    ? "3px solid var(--accent, #6366f1)"
                    : "3px solid transparent",
                  color: selectedPdf.path === pdf.path
                    ? "var(--accent, #6366f1)"
                    : "var(--text-secondary, #b0b0b0)",
                  cursor: "pointer",
                  fontSize: 12,
                  textAlign: "left",
                }}
              >
                📄 {pdf.label}
              </button>
            ))}
          </div>
        ))}
      </aside>

      {/* Visualizador de PDF */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div style={{
          padding: "10px 16px",
          background: "var(--bg-card, #1e2130)",
          borderBottom: "1px solid var(--border, #2a2d3e)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary, #e0e0e0)" }}>
            📄 {selectedPdf.label}
          </span>
          <a
            href={selectedPdf.path}
            target="_blank"
            rel="noreferrer"
            style={{
              marginLeft: "auto",
              fontSize: 11,
              color: "var(--accent, #6366f1)",
              textDecoration: "none",
              padding: "3px 10px",
              border: "1px solid var(--accent, #6366f1)",
              borderRadius: 4,
            }}
          >
            {lang === "en" ? "Open in new tab ↗" : "Abrir em nova aba ↗"}
          </a>
        </div>

        <iframe
          key={selectedPdf.path}
          src={selectedPdf.path}
          title={selectedPdf.label}
          style={{
            flex: 1,
            border: "none",
            width: "100%",
            background: "#fff",
          }}
        />
      </div>
    </div>
  );
}
