const TONES = [
  { num: 1, name: "Ngang",  mark: "Sem marca", ex: "ma",  desc: "Tom médio, neutro — voz normal",                color: "#6366f1" },
  { num: 2, name: "Sắc",   mark: "´ (agudo)", ex: "má",  desc: "Tom subindo — voz sobe",                       color: "#10b981" },
  { num: 3, name: "Huyền", mark: "` (grave)", ex: "mà",  desc: "Tom caindo, suave — voz desce devagar",        color: "#3b82f6" },
  { num: 4, name: "Hỏi",   mark: "̉ (hỏi)",  ex: "mả",  desc: "Tom que sobe e desce — voz oscila",           color: "#f59e0b" },
  { num: 5, name: "Ngã",   mark: "˜ (ngã)",  ex: "mã",  desc: "Tom ondulado, quebrado — pausa no meio",      color: "#8b5cf6" },
  { num: 6, name: "Nặng",  mark: ". (nặng)", ex: "mạ",  desc: "Tom caindo forte e curto — voz cai bruscamente", color: "#ef4444" },
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
            ["<b>TA</b>", "ta", "tá", "tà", "tả", "tã", "tạ"],
          ]}
        />
      </div>

      {/* Vowels */}
      <div className="card">
        <div className="card-title">🔤 Vogais (12 vogais simples)</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 8 }}>
          {[
            ["A", "BA", "Pai"], ["Ă", "ĂN", "Comer"], ["Â", "CÂN", "Pesar"],
            ["E", "XE", "Veículo"], ["Ê", "LÊ", "Ameixa"], ["I", "MÌ", "Macarrão"],
            ["O", "TO", "Grande"], ["Ô", "Ô TÔ", "Carro"], ["Ơ", "BƠ", "Manteiga"],
            ["U", "XU", "Centavo"], ["Ư", "THƯ", "Carta"], ["Y", "Ý", "Ideia"],
          ].map(([letter, ex, pt]) => (
            <div key={letter} style={{ background: "#f8fafc", border: "1.5px solid var(--border)", borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "var(--primary)" }}>{letter}</div>
              <div style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}>{ex}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{pt}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Consonants */}
      <div className="card">
        <div className="card-title">🔤 Regras de Consoantes</div>
        <T
          headers={["Consoantes", "Vogais que acompanha", "Exemplo"]}
          rows={[
            ["<b>C</b>", "a, ă, â, o, ô, ơ, u, ư", "CÁ (peixe)"],
            ["<b>K</b>", "i, e, ê", "KẸO (doce)"],
            ["<b>G</b>", "a, ă, â, o, ô, ơ, u, ư", "GÀ (galinha)"],
            ["<b>GH</b>", "i, e, ê", "GHẾ (cadeira)"],
            ["<b>NG</b>", "a, ă, â, o, ô, ơ, u, ư", "NGỦ (dormir)"],
            ["<b>NGH</b>", "i, e, ê", "NGHĨ (pensar)"],
          ]}
        />
        <div style={{ marginTop: 12 }}>
          <div className="card-title" style={{ marginBottom: 8 }}>🗣️ Diferenças Norte × Sul</div>
          <T
            headers={["Consoante(s)", "Sotaque do NORTE", "Sotaque do SUL"]}
            rows={[
              ["<b>D / GI / R</b>", "Todos soam como 'D'", "Sons distintos: D, J, R"],
              ["<b>X / S</b>", "Ambos soam como 'X'", "Sons distintos: X, S"],
              ["<b>CH / TR</b>", "Ambos soam como 'CH'", "Sons distintos: CH, TR"],
            ]}
          />
        </div>
      </div>

      {/* Pronunciation practice */}
      <div className="card">
        <div className="card-title">📝 Frases de Prática</div>
        <T
          headers={["Vietnamita", "Português"]}
          rows={[
            ["<b>Xin chào, anh khoẻ không?</b>", "Olá, você está bem?"],
            ["<b>Tôi rất khoẻ, còn anh?</b>", "Estou muito bem, e você?"],
            ["<b>Tôi là giáo viên.</b>", "Eu sou professor(a)."],
            ["<b>Phở rất ngon.</b>", "O Phở é muito gostoso."],
            ["<b>Nhà bạn ở đâu?</b>", "Onde fica sua casa?"],
            ["<b>Cảm ơn bạn!</b>", "Obrigado(a)!"],
          ]}
        />
      </div>
    </div>
  );
}
