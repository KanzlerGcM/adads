const dialogos = [
  {
    titulo: "Diálogo 1 — Convite para a Casa Nova",
    contexto: "John encontra Minh na rua e o convida para visitar sua nova casa.",
    linhas: [
      { quem: "John",  vn: "Chào Minh! Bạn có khỏe không?",         pt: "Oi Minh! Você está bem?" },
      { quem: "Minh",  vn: "Vâng, tôi khỏe. Cảm ơn. Còn bạn?",    pt: "Sim, estou bem. Obrigado. E você?" },
      { quem: "John",  vn: "Tôi cũng khỏe. Bạn có bận không?",      pt: "Eu também estou bem. Você está ocupado?" },
      { quem: "Minh",  vn: "Không, tôi không bận. Có gì không?",    pt: "Não, não estou ocupado. O que houve?" },
      { quem: "John",  vn: "Tôi muốn mời bạn đến nhà mới của tôi!", pt: "Quero convidar você para minha nova casa!" },
      { quem: "Minh",  vn: "Ồ! Tuyệt quá! Nhà bạn ở đâu?",         pt: "Oh! Que ótimo! Onde fica sua casa?" },
      { quem: "John",  vn: "Đây là địa chỉ. Ngày mai bạn đến nhé!", pt: "Aqui está o endereço. Venha amanhã, combinado!" },
      { quem: "Minh",  vn: "Vâng! Tôi sẽ đến. Cảm ơn bạn nhiều!", pt: "Sim! Vou lá. Muito obrigado!" },
    ],
  },
  {
    titulo: "Diálogo 2 — Visitando a Casa",
    contexto: "Minh chega à casa de John no dia seguinte.",
    linhas: [
      { quem: "John",  vn: "Chào Minh! Mời anh vào!",                pt: "Oi Minh! Por favor, entre!" },
      { quem: "Minh",  vn: "Cảm ơn. Nhà của bạn rất đẹp!",          pt: "Obrigado. Sua casa é muito bonita!" },
      { quem: "John",  vn: "Đây là phòng khách. Phòng này rất rộng.", pt: "Esta é a sala de estar. Este cômodo é bem espaçoso." },
      { quem: "Minh",  vn: "Ừ, rộng thật. Tôi rất thích nhà này!",  pt: "É, de verdade. Eu adorei esta casa!" },
    ],
  },
];

const frases = [
  { categoria: "Saudações e Apresentações", itens: [
    { vn: "Xin chào! Bạn tên là gì?",       pt: "Olá! Qual é o seu nome?" },
    { vn: "Tên tôi là…",                     pt: "Meu nome é…" },
    { vn: "Rất vui được gặp bạn!",           pt: "Muito prazer em conhecê-lo(a)!" },
    { vn: "Bạn là người nước nào?",          pt: "Você é de qual país?" },
    { vn: "Tôi là người Việt Nam.",          pt: "Eu sou vietnamita." },
  ]},
  { categoria: "No Dia a Dia", itens: [
    { vn: "Anh có khỏe không?",             pt: "Você está bem? (para homem mais velho)" },
    { vn: "Tôi rất khỏe, cảm ơn!",          pt: "Estou muito bem, obrigado!" },
    { vn: "Ngày mai anh có bận không?",     pt: "Você vai estar ocupado amanhã?" },
    { vn: "Không, tôi không bận.",           pt: "Não, não estou ocupado." },
    { vn: "Tôi muốn ăn phở.",               pt: "Eu quero comer phở." },
  ]},
  { categoria: "Perguntas Úteis", itens: [
    { vn: "Cái này là gì?",                  pt: "O que é isso?" },
    { vn: "Bạn là người nào?",              pt: "Qual é você? / Quem é você?" },
    { vn: "Bạn ở đâu?",                     pt: "Onde você está / mora?" },
    { vn: "Sách của ai?",                    pt: "De quem é o livro?" },
    { vn: "Bạn muốn gì?",                   pt: "O que você quer?" },
  ]},
];

export default function Conversacao() {
  return (
    <div>
      <h2 className="page-title">💬 Conversação</h2>
      <p className="page-subtitle">Diálogos práticos e frases essenciais do cotidiano.</p>

      {dialogos.map((d, di) => (
        <div key={di} className="card">
          <div className="card-title">{d.titulo}</div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16, fontStyle: "italic" }}>
            📌 {d.contexto}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {d.linhas.map((l, li) => {
              const isJohn = l.quem === "John";
              return (
                <div key={li} style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  padding: "12px 14px",
                  background: isJohn ? "#f0f4ff" : "#f8fafc",
                  borderLeft: `4px solid ${isJohn ? "#6366f1" : "#94a3b8"}`,
                  marginBottom: 6,
                  borderRadius: "0 8px 8px 0",
                }}>
                  <div style={{
                    minWidth: 54, fontWeight: 700, fontSize: 12,
                    color: isJohn ? "#4338ca" : "#475569",
                    paddingTop: 2,
                  }}>
                    {l.quem.toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>{l.vn}</div>
                    <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{l.pt}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {frases.map((sec, si) => (
        <div key={si} className="card">
          <div className="card-title">📝 {sec.categoria}</div>
          <table className="ref-table" style={{ marginTop: 0 }}>
            <thead>
              <tr><th>🇻🇳 Vietnamita</th><th>🇧🇷 Português</th></tr>
            </thead>
            <tbody>
              {sec.itens.map((f, fi) => (
                <tr key={fi}>
                  <td style={{ fontWeight: 600, fontSize: 15, color: "var(--text)" }}>{f.vn}</td>
                  <td style={{ color: "var(--text-muted)" }}>{f.pt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
