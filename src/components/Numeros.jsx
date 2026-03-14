function T({ headers, rows }) {
  return (
    <table className="ref-table">
      <thead><tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={row[3] === "hl" ? "hl" : ""}>
            {row.slice(0, row.length === 4 && row[3] === "hl" ? 3 : row.length).map((cell, j) => (
              <td key={j} dangerouslySetInnerHTML={{ __html: cell }} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Numeros() {
  return (
    <div>
      <h2 className="page-title">🔢 Números</h2>
      <p className="page-subtitle">Do 1 ao bilhão — com todas as regras especiais.</p>

      {/* 1-10 */}
      <div className="card">
        <div className="card-title">1 a 10 — Aprenda de cor!</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
          {[
            [1,"MỘT"],[2,"HAI"],[3,"BA"],[4,"BỐN"],[5,"NĂM"],
            [6,"SÁU"],[7,"BẢY"],[8,"TÁM"],[9,"CHÍN"],[10,"MƯỜI"],
          ].map(([n, vn]) => (
            <div key={n} style={{ background: "#f8fafc", border: "1.5px solid var(--border)", borderRadius: 10, padding: "14px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 700 }}>{n}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "var(--primary)", marginTop: 4 }}>{vn}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 11-19 */}
      <div className="card">
        <div className="card-title">11 a 19</div>
        <div className="note">⚠️ Quando 5 vem depois de MƯỜI, NĂM → <strong>LĂM</strong>: MƯỜI LĂM = 15</div>
        <T
          headers={["Número", "Vietnamita", "Observação"]}
          rows={[
            ["11", "MƯỜI MỘT", "10 + 1"],
            ["12", "MƯỜI HAI", "10 + 2"],
            ["13", "MƯỜI BA", "10 + 3"],
            ["14", "MƯỜI BỐN", "10 + 4"],
            ["15", 'MƯỜI <span class="correct">LĂM</span> ⚠️', 'NĂM → <span class="correct">LĂM</span> (muda!)'],
            ["16", "MƯỜI SÁU", "10 + 6"],
            ["17", "MƯỜI BẢY", "10 + 7"],
            ["18", "MƯỜI TÁM", "10 + 8"],
            ["19", "MƯỜI CHÍN", "10 + 9"],
          ]}
        />
      </div>

      {/* Tens 20-90 */}
      <div className="card">
        <div className="card-title">Dezenas Redondas (20–90)</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {[
            [20,"HAI MƯƠI"],[30,"BA MƯƠI"],[40,"BỐN MƯƠI"],[50,"NĂM MƯƠI"],
            [60,"SÁU MƯƠI"],[70,"BẢY MƯƠI"],[80,"TÁM MƯƠI"],[90,"CHÍN MƯƠI"],
          ].map(([n, vn]) => (
            <div key={n} style={{ background: "#f0f4ff", border: "1.5px solid #c7d2fe", borderRadius: 9, padding: "11px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 700 }}>{n}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#4338ca", marginTop: 3 }}>{vn}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Special rules */}
      <div className="card">
        <div className="card-title">⚠️ Regras Especiais para Compostos (20–99)</div>
        <T
          headers={["Regra", "❌ Errado", "✅ Correto"]}
          rows={[
            ['<b>1</b> após qualquer dezena → <b>MỐT</b>', '<span class="wrong">Hai mươi MỘT</span>', '<span class="correct">Hai mươi MỐT</span>'],
            ['<b>5</b> após qualquer dezena → <b>LĂM</b>', '<span class="wrong">Hai mươi NĂM</span>', '<span class="correct">Hai mươi LĂM</span>'],
            ['<b>4</b> nos compostos pode ser <b>TƯ</b>', 'Hai mươi BỐN', '<span class="correct">Hai mươi TƯ</span> (também aceito)'],
          ]}
        />
        <div className="tip" style={{ marginTop: 10 }}>📌 O MƯƠI (dezenas 20–90) pode ser encurtado na fala. Nos exemplos abaixo aparece entre parênteses.</div>
        <T
          headers={["Número", "Vietnamita", "Número", "Vietnamita"]}
          rows={[
            ["21", "HAI (MƯƠI) <b>MỐT</b>", "25", "HAI (MƯƠI) <b>LĂM</b>"],
            ["24", "HAI (MƯƠI) <b>TƯ</b>", "31", "BA (MƯƠI) <b>MỐT</b>"],
            ["35", "BA (MƯƠI) <b>LĂM</b>", "42", "BỐN (MƯƠI) HAI"],
            ["55", "NĂM (MƯƠI) <b>LĂM</b>", "91", "CHÍN (MƯƠI) <b>MỐT</b>"],
          ]}
        />
      </div>

      {/* Hundreds */}
      <div className="card">
        <div className="card-title">Centenas (100–999)</div>
        <div className="tip">📌 Zero na posição das dezenas → usar <strong>LINH</strong>. Ex: 101 = Một trăm LINH một.</div>
        <T
          headers={["Número", "Vietnamita", "Número", "Vietnamita"]}
          rows={[
            ["100", "MỘT TRĂM", "200", "HAI TRĂM"],
            ["300", "BA TRĂM",  "500", "NĂM TRĂM"],
            ["101", "MỘT TRĂM <b>LINH</b> MỘT", "202", "HAI TRĂM <b>LINH</b> HAI"],
            ["305", "BA TRĂM <b>LINH</b> NĂM",  "404", "BỐN TRĂM <b>LINH</b> BỐN"],
            ["509", "NĂM TRĂM <b>LINH</b> CHÍN", "610", "SÁU TRĂM MƯỜI"],
            ["756", "BẢY TRĂM NĂM (MƯƠI) SÁU",  "999", "CHÍN TRĂM CHÍN (MƯƠI) CHÍN"],
          ]}
        />
      </div>

      {/* Big numbers */}
      <div className="card">
        <div className="card-title">Números Grandes</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {[
            ["1.000",           "MỘT NGHÌN",  "#6366f1"],
            ["1.000.000",       "MỘT TRIỆU",  "#8b5cf6"],
            ["1.000.000.000",   "MỘT TỶ",     "#a855f7"],
          ].map(([num, vn, color]) => (
            <div key={num} style={{ border: `2px solid ${color}30`, borderRadius: 10, padding: "16px", background: `${color}08`, textAlign: "center" }}>
              <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>{num}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color, marginTop: 6 }}>{vn}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
