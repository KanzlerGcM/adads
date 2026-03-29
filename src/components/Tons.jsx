const TONES = [
  { num: 1, name: "Ngang",  mark: "Sem marca", ex: "ma",  desc: "Tom médio, neutro — voz normal",                color: "#6366f1" },
  { num: 2, name: "Sắc",   mark: "´ (agudo)", ex: "má",  desc: "Tom subindo — voz sobe",                       color: "#10b981" },
  { num: 3, name: "Huyền", mark: "` (grave)", ex: "mà",  desc: "Tom caindo, grave — voz desce devagar",        color: "#3b82f6" },
  { num: 4, name: "Hỏi",   mark: "̉ (hỏi)",  ex: "mả",  desc: "Tom que sobe e desce — voz oscila",           color: "#f59e0b" },
  { num: 5, name: "Ngã",   mark: "˜ (ngã)",  ex: "mã",  desc: "Tom ondulado, quebrado — pausa no meio",      color: "#8b5cf6" },
  { num: 6, name: "Nặng",  mark: ". (nặng)", ex: "mạ",  desc: "Tom caindo forte e curto — voz cai bruscamente", color: "#64748b" },
];

function T({ headers, rows }) {
  return (
    <table className="ref-table">
      <thead><tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => <td key={j} dangerouslySetInnerHTML={{ __html: cell }} />)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Tons() {
  return (
    <div>
      <h2 className="page-title">🎵 Tons & Pronúncia</h2>
      <p className="page-subtitle">O vietnamita tem 6 tons — a mesma sílaba muda completamente de significado!</p>

      <div className="note" style={{ marginBottom: 20 }}>
        ⚠️ <strong>Comece SEMPRE pelos tons!</strong> Antes de memorizar qualquer palavra, entenda os 6 tons. Sem isso, você pode dizer uma palavra completamente diferente sem perceber.
      </div>

      {/* 6 Tone cards */}
      <div className="card">
        <div className="card-title">🎵 Os 6 Tons do Vietnamita</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
          {TONES.map((t) => (
            <div key={t.num} style={{ border: `2px solid ${t.color}20`, borderRadius: 10, padding: "14px 16px", background: `${t.color}08` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: t.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>
                  {t.num}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{t.mark}</div>
                </div>
                <div style={{ marginLeft: "auto", fontSize: 30, fontWeight: 800, color: t.color }}>{t.ex}</div>
              </div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Practice table */}
      <div className="card">
        <div className="card-title">🏋️ Prática: Mesma Sílaba, 6 Sons</div>
        <T
          headers={["Sílaba base", "Tom 1 (plano)", "Tom 2 (↑)", "Tom 3 (↓)", "Tom 4 (↕)", "Tom 5 (ondulado)", "Tom 6 (↓!)"]}
          rows={[
            ["<b>MA</b>", "ma", "má", "mà", "mả", "mã", "mạ"],
            ["<b>BO</b>", "bo", "bó", "bò", "bỏ", "bõ", "bọ"],
            ["<b>ĐA</b>", "đa", "đá", "đà", "đả", "đã", "đạ"],
          ]}
        />
      </div>

      {/* Significados de MA */}
      <div className="card">
        <div className="card-title">🔍 O que significa cada "MA"?</div>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
          A mesma sílaba <strong>MA</strong> tem 6 significados completamente diferentes conforme o tom — este é o exemplo clássico do vietnamita!
        </p>
        <T
          headers={["Tom", "Escrita", "Significado", "Exemplo em frase"]}
          rows={[
            ["1 — Ngang (plano)",      "<b>ma</b>",  "Fantasma / Espírito",       "Con ma ở đây = Tem um fantasma aqui"],
            ["2 — Sắc (subindo)",       "<b>má</b>",  "Bochecha",                  "Má em đỏ = A bochecha dela é vermelha"],
            ["3 — Huyền (descendo)",    "<b>mà</b>",  "Mas / Porém (conjunção)",   "Đẹp mà đắt = Bonito, mas caro"],
            ["4 — Hỏi (oscila)",        "<b>mả</b>",  "Túmulo / Sepultura",        "Thăm mả = Visitar o túmulo"],
            ["5 — Ngã (ondulado)",      "<b>mã</b>",  "Código / Cavalo (arcaico)", "Mã số = Código numérico"],
            ["6 — Nặng (forte, curto)", "<b>mạ</b>",  "Muda de arroz / Plântula",  "Mạ giống = Plântula de arroz"],
          ]}
        />
        <div className="note" style={{ marginTop: 10 }}>
          💡 "ma", "má", "mà", "mả", "mã", "mạ" — mesma base fonética, 6 palavras completamente diferentes!
        </div>
      </div>

      {/* Significados de BO */}
      <div className="card">
        <div className="card-title">🔍 O que significa cada "BO"?</div>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
          Outro exemplo: a sílaba <strong>BO</strong> com os 6 tons — cada um é uma palavra diferente.
        </p>
        <T
          headers={["Tom", "Escrita", "Significado", "Exemplo em frase"]}
          rows={[
            ["1 — Ngang (plano)",      "<b>bo</b>",  "Manteiga (arcaico)",          "— (forma isolada rara)"],
            ["2 — Sắc (subindo)",       "<b>bó</b>",  "Amarrar / Feixe / Molho",     "Bó rau = Molho de verdura"],
            ["3 — Huyền (descendo)",    "<b>bò</b>",  "Vaca / Rastejar / Arrastar",  "Con bò = A vaca · Bò đi = Rastejar"],
            ["4 — Hỏi (oscila)",        "<b>bỏ</b>",  "Largar / Abandonar / Deixar", "Bỏ đi! = Vai embora! / Deixa!"],
            ["5 — Ngã (ondulado)",      "<b>bõ</b>",  "Valer a pena / Compensar",    "Bõ công = Valeu o esforço"],
            ["6 — Nặng (forte, curto)", "<b>bọ</b>",  "Inseto / Bicho / Bichinho",   "Con bọ = O inseto"],
          ]}
        />
        <div className="note" style={{ marginTop: 10 }}>
          💡 "bó", "bò", "bỏ", "bõ", "bọ" — sons quase idênticos para iniciantes, significados completamente diferentes!
        </div>
      </div>

      {/* Pronunciation practice syllables - from Pronunciation.pdf */}
      <div className="card">
        <div className="card-title">🏋️ Prática de Pronúncia — Sílabas com Terminações</div>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
          Do PDF de pronúncia: combine vogais com consoantes finais e aplique os 6 tons.
        </p>
        <T
          headers={["Vogal A", "Vogal Ă", "Vogal Â", "Exemplo"]}
          rows={[
            ["an / ăn / ân", "ăn / ăm / ăt", "ân / âm / ât", "KHĂN (lenço), XƯA (antigo)"],
            ["am / ăm / âm", "ăp / ăng",     "âp / âng",     "BẬN (ocupado) ← bận = nhộn rộn"],
            ["at / ăt / ât", "—",             "—",            "ĐÁT, MẮT (olho)"],
            ["ap / ăp / âp", "—",             "—",            "GẶP (encontrar)"],
            ["ang / ăng",    "—",             "—",            "XĂNG DẦU (combustível)"],
            ["anh",          "—",             "—",            "ANH (irmão mais velho)"],
          ]}
        />
        <T
          headers={["Vogal E", "Vogal Ê", "Exemplo"]}
          rows={[
            ["en / em / et / ep", "ên / êm / êt / êp", "ĐẸP (bonito), NỀN NHÀ (chão)"],
            ["—",                 "—",                  "ĐẾN (vir/chegar), ĐẾM (contar)"],
          ]}
        />
        <div className="note" style={{ marginTop: 10 }}>
          📌 Frases de prática (do PDF): <em>Xin chào, anh khoẻ không? Tôi rất khoẻ, còn anh?</em> — <em>Nhà bạn ở đâu?</em> — <em>Phở rất ngon.</em>
        </div>
      </div>

      <div className="tip" style={{ marginTop: 0 }}>
        📌 Para vogais, consoantes, regras de escrita e diferenças Norte×Sul,
        veja a aba <strong>🔤 Alfabeto</strong>.
      </div>
    </div>
  );
}
