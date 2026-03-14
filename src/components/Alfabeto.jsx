function T({ headers, rows }) {
  return (
    <table className="ref-table">
      <thead>
        <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} dangerouslySetInnerHTML={{ __html: cell }} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Alfabeto() {
  return (
    <div>
      <h2 className="page-title">🔤 Alfabeto & Sistema de Escrita</h2>
      <p className="page-subtitle">
        O vietnamita usa o alfabeto latino com diacríticos especiais. Você já
        conhece as letras — o desafio são os tons e as vogais modificadas.
      </p>

      <div className="tip">
        📌 O sistema de escrita atual (Chữ Quốc Ngữ) foi criado no século XVII
        por missionários — incluindo portugueses. Antes disso, o vietnamita era
        escrito com caracteres chineses. Por isso, muito do vocabulário tem raiz
        sino-vietnamita.
      </div>

      {/* 12 Vogais */}
      <div className="card">
        <div className="card-title">🔵 As 12 Vogais Simples</div>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 14 }}>
          Cada vogal pode carregar qualquer um dos 6 tons. As vogais com
          diacríticos (Ă, Â, Ê, Ô, Ơ, Ư) têm sons base diferentes das suas
          versões simples — não são só acentuadas, são vogais distintas!
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(115px, 1fr))",
            gap: 10,
          }}
        >
          {[
            ["A",  "a aberto",   "BA",    "pai"],
            ["Ă",  "a curto",    "ĂN",    "comer"],
            ["Â",  "a fechado",  "CÂN",   "pesar"],
            ["E",  "é aberto",   "XE",    "veículo"],
            ["Ê",  "ê fechado",  "LÊ",    "ameixa"],
            ["I",  "i",          "MÌ",    "macarrão"],
            ["O",  "o aberto",   "LO",    "preocupar"],
            ["Ô",  "ô fechado",  "Ô TÔ",  "carro"],
            ["Ơ",  "ø (sueco)",  "BƠ",    "manteiga"],
            ["U",  "u",          "XU",    "centavo"],
            ["Ư",  "ü (alemão)", "THƯ",   "carta"],
            ["Y",  "i (longa)", "Ý",     "ideia"],
          ].map(([letter, som, ex, pt]) => (
            <div
              key={letter}
              style={{
                background: "#eef2ff",
                border: "1.5px solid #c7d2fe",
                borderRadius: 10,
                padding: "12px 8px",
                textAlign: "center",
              }}
            >
              <div
                style={{ fontSize: 28, fontWeight: 800, color: "var(--primary)" }}
              >
                {letter}
              </div>
              <div
                style={{
                  fontSize: 10.5,
                  color: "#6366f1",
                  fontWeight: 600,
                  margin: "3px 0 5px",
                  borderTop: "1px solid #c7d2fe",
                  paddingTop: 4,
                }}
              >
                {som}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>
                {ex}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{pt}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Combinações de Vogais */}
      <div className="card">
        <div className="card-title">🔷 Combinações de Vogais Frequentes</div>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
          O vietnamita tem muitos ditongos e tritongos. Estas são as combinações
          mais comuns:
        </p>
        <T
          headers={["Combinação", "Som aproximado", "Exemplo", "Tradução"]}
          rows={[
            ["<b>AI</b>", "ai (como em 'pai')", "HAI", "dois"],
            ["<b>AO</b>", "ao (como em 'caos')", "BAO", "bolsa / embrulho"],
            ["<b>AU</b>", "âu — vogal Â + U", "ĐAU", "doer / dor"],
            ["<b>ÂU</b>", "âu fechado e curto", "CÂU", "frase / pescar"],
            ["<b>ÊU</b>", "êu", "NÊU", "erguer / levantar"],
            ["<b>IA / IÊ</b>", "iê (ditongo)", "ĐĨA", "prato / disco"],
            ["<b>OI</b>", "oi", "XÔI", "arroz glutinoso"],
            ["<b>ÔI</b>", "ôi fechado", "RỒI", "já (feito)"],
            ["<b>ƠI</b>", "øi", "ƠI", "ei! / oi! (exclamação)"],
            ["<b>UA / UÔ</b>", "uô (ditongo)", "MUA", "comprar"],
            ["<b>ƯA / ƯƠ</b>", "ưo", "NỬA", "metade"],
            ["<b>UI</b>", "ui", "VUI", "feliz / alegre"],
          ]}
        />
      </div>

      {/* Regras C/K/G/GH/NG/NGH */}
      <div className="card">
        <div className="card-title">
          🔶 Regras de Consoantes Especiais — C/K, G/GH, NG/NGH
        </div>
        <div className="note">
          ⚠️ Algumas consoantes têm formas alternativas dependendo da vogal
          seguinte. A vogal determina qual forma escrever — não é opcional.
        </div>
        <T
          headers={[
            "Som",
            "Forma com A, Ă, Â, O, Ô, Ơ, U, Ư",
            "Forma com I, E, Ê",
            "Por quê?",
          ]}
          rows={[
            [
              "<b>Som K</b>",
              "C — CÁ (peixe), CÔ (tia)",
              "K — KẸO (doce), KÊU (gritar)",
              "Vogais anteriores (i/e) pedem K",
            ],
            [
              "<b>Som G</b>",
              "G — GÀ (galinha), GÔ (madeira)",
              "GH — GHẾ (cadeira), GHI (anotar)",
              "GH evita ambiguidade de leitura",
            ],
            [
              "<b>Som NG</b>",
              "NG — NGỦ (dormir), NGÃ (cair)",
              "NGH — NGHĨ (pensar), NGHE (ouvir)",
              "Mesma lógica do GH",
            ],
          ]}
        />
      </div>

      {/* Tabela completa de consoantes iniciais */}
      <div className="card">
        <div className="card-title">🔤 Todas as Consoantes Iniciais</div>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
          Pronúncia aproximada para falantes de português. Norte = Hanói; Sul =
          Ho Chi Minh.
        </p>
        <T
          headers={[
            "Letra(s)",
            "Pronúncia Norte",
            "Pronúncia Sul",
            "Exemplo",
            "Tradução",
          ]}
          rows={[
            ["<b>B</b>", "b", "b", "BẠN", "você / amigo"],
            ["<b>C / K / Q</b>", "k", "k", "CÁ / KẸO / QUÀ", "peixe / doce / presente"],
            ["<b>CH</b>", "ch", "ch / tr", "CHO", "dar"],
            ["<b>D</b>", "z (como 'zero')", "v ou y", "DA", "pele"],
            ["<b>Đ</b>", "d travado", "d travado", "ĐẸP", "bonito"],
            ["<b>G / GH</b>", "g", "g", "GÀ / GHẾ", "galinha / cadeira"],
            ["<b>GI</b>", "z", "y (como 'yoyo')", "GIA ĐÌNH", "família"],
            ["<b>H</b>", "h", "h", "HAI", "dois"],
            ["<b>KH</b>", "kh (gutural suave)", "kh", "KHÔNG", "não"],
            ["<b>L</b>", "l", "l", "LÀM", "fazer"],
            ["<b>M</b>", "m", "m", "MẸ", "mãe"],
            ["<b>N</b>", "n", "n", "NHÀ", "casa"],
            ["<b>NH</b>", "nh (como 'gn' italiano)", "nh", "NHAU", "juntos"],
            ["<b>NG / NGH</b>", "ng nasal", "ng nasal", "NGỦ / NGHĨ", "dormir / pensar"],
            ["<b>PH</b>", "f", "f", "PHỞ / PHÒNG", "pho / quarto"],
            ["<b>R</b>", "z / r (variado)", "r", "RAU", "vegetal"],
            ["<b>S</b>", "s", "s", "SÁU", "seis"],
            ["<b>T</b>", "t", "t", "TÔI", "eu"],
            ["<b>TH</b>", "t aspirado", "t aspirado", "THƯ", "carta"],
            ["<b>TR</b>", "ch", "tr", "TRĂM", "cem"],
            ["<b>V</b>", "v", "v", "VUI", "feliz"],
            ["<b>X</b>", "s", "s", "XE", "veículo"],
          ]}
        />
      </div>

      {/* Consoantes finais */}
      <div className="card">
        <div className="card-title">🔚 Consoantes Finais (Terminações de Sílaba)</div>
        <div className="tip">
          📌 Apenas 8 consoantes podem terminar uma sílaba vietnamita. As
          oclusivas (C/CH/P/T) são "engolidas" — sem explosão de ar no final.
        </div>
        <T
          headers={["Consoante final", "Pronúncia", "Exemplo", "Tradução"]}
          rows={[
            ["<b>C</b>", "k oclusivo (sem explodir)", "THÍCH", "gostar"],
            ["<b>CH</b>", "ch oclusivo", "CÁCH", "jeito / forma"],
            ["<b>M</b>", "m labial", "NĂM", "cinco / ano"],
            ["<b>N</b>", "n alveolar", "BẠN", "você"],
            ["<b>NG</b>", "ng nasal velar", "KHÔNG", "não"],
            ["<b>NH</b>", "nh nasal palatal", "ANH", "irmão mais velho"],
            ["<b>P</b>", "p oclusivo (sem explodir)", "HỌP", "reunião"],
            ["<b>T</b>", "t oclusivo (sem explodir)", "MỘT", "um"],
          ]}
        />
      </div>

      {/* Norte x Sul */}
      <div className="card">
        <div className="card-title">🗣️ Norte × Sul — Diferenças de Pronúncia</div>
        <div className="note">
          ⚠️ Hanói (Norte) e Ho Chi Minh (Sul) têm pronúncias distintas para
          várias consoantes e alguns tons. O vocabulário é idêntico — se você
          aprende um sotaque, entende o outro.
        </div>
        <T
          headers={["O quê", "Sotaque NORTE (Hanói)", "Sotaque SUL (HCMC)"]}
          rows={[
            [
              "<b>D / GI / R</b>",
              "Todos soam como 'Z'",
              "Sons distintos: D=d, GI=y, R=r",
            ],
            ["<b>X / S</b>", "Ambos soam como 'S'", "Sons distintos"],
            [
              "<b>CH / TR</b>",
              "Ambos soam como 'CH'",
              "Sons distintos: CH=ch, TR=tr",
            ],
            [
              "<b>Tom Ngã (˜)</b>",
              "Tom ondulado quebrado — distinto do Nặng",
              "Frequentemente fundido com o tom Nặng (.)",
            ],
            [
              "<b>Tom Hỏi (̉)</b>",
              "Sobe e desce claramente",
              "Às vezes semelhante ao tom Huyền (`)",
            ],
            [
              "<b>Padrão formal</b>",
              "Hanói = padrão oficial do governo",
              "HCMC tem mais falantes nativos",
            ],
          ]}
        />
      </div>

      {/* Prática de leitura */}
      <div className="card">
        <div className="card-title">📝 Prática de Leitura em Voz Alta</div>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
          Leia cada frase devagar. Preste atenção nos tons marcados e nas
          consoantes especiais indicadas.
        </p>
        <T
          headers={["Vietnamita", "Português", "Foco de pronúncia"]}
          rows={[
            [
              "<b>Xin chào, anh khoẻ không?</b>",
              "Olá, você está bem?",
              "X=s · KH=k · tom hỏi",
            ],
            [
              "<b>Tôi rất khoẻ, còn anh?</b>",
              "Estou muito bem, e você?",
              "Tom huyền em 'còn'",
            ],
            [
              "<b>Tôi là giáo viên.</b>",
              "Eu sou professor(a).",
              "GI=z/y · tom sắc em 'giáo'",
            ],
            [
              "<b>Phở rất ngon.</b>",
              "O phở é muito gostoso.",
              "PH=f · NG inicial · tom hỏi",
            ],
            [
              "<b>Nhà bạn ở đâu?</b>",
              "Onde fica sua casa?",
              "NH inicial · Đ=d travado",
            ],
            [
              "<b>Tôi không hiểu.</b>",
              "Não entendo.",
              "KH=k · tom hỏi em 'hiểu'",
            ],
            [
              "<b>Cảm ơn bạn nhiều!</b>",
              "Muito obrigado(a)!",
              "Tom hỏi · NH · tom huyền",
            ],
            [
              "<b>Gia đình tôi có bốn người.</b>",
              "Minha família tem quatro pessoas.",
              "GI=z/y · Đ=d · 'bốn'=4",
            ],
          ]}
        />
      </div>
    </div>
  );
}
