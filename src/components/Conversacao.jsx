import { useState } from "react";

const CATEGORIAS = [
  {
    id: "saud", icon: "👋", cor: "#4f46e5",
    titulo: "Saudações & Despedidas",
    frases: [
      { vn: "Xin chào!", pt: "Olá! (formal)" },
      { vn: "Chào bạn!", pt: "Oi! (informal, mesma faixa etária)" },
      { vn: "Chào buổi sáng!", pt: "Bom dia!" },
      { vn: "Chào buổi chiều!", pt: "Boa tarde!" },
      { vn: "Chào buổi tối!", pt: "Boa noite! (ao chegar)" },
      { vn: "Chúc ngủ ngon!", pt: "Boa noite! (ao dormir)" },
      { vn: "Tạm biệt!", pt: "Tchau! / Até mais!" },
      { vn: "Hẹn gặp lại!", pt: "Até a próxima!" },
      { vn: "Hẹn gặp lại sau!", pt: "Até mais tarde!" },
    ],
  },
  {
    id: "cort", icon: "🙏", cor: "#0891b2",
    titulo: "Cortesias Essenciais",
    frases: [
      { vn: "Cảm ơn.", pt: "Obrigado(a)." },
      { vn: "Cảm ơn bạn nhiều!", pt: "Muito obrigado(a)!" },
      { vn: "Không có gì.", pt: "De nada." },
      { vn: "Xin lỗi.", pt: "Desculpe. / Com licença." },
      { vn: "Không sao.", pt: "Tudo bem. / Não tem problema." },
      { vn: "Làm ơn.", pt: "Por favor. (pedindo ajuda)" },
      { vn: "Vâng, được.", pt: "Sim, pode ser. (formal)" },
      { vn: "Tôi không hiểu.", pt: "Não entendo." },
      { vn: "Bạn nói lại được không?", pt: "Pode repetir?" },
      { vn: "Nói chậm hơn được không?", pt: "Pode falar mais devagar?" },
      { vn: "Bạn có nói tiếng Anh không?", pt: "Você fala inglês?" },
      { vn: "Tôi đang học tiếng Việt.", pt: "Estou aprendendo vietnamita." },
    ],
  },
  {
    id: "apres", icon: "🤝", cor: "#7c3aed",
    titulo: "Apresentações",
    frases: [
      { vn: "Bạn tên là gì?", pt: "Qual é o seu nome?" },
      { vn: "Tên tôi là…", pt: "Meu nome é…" },
      { vn: "Rất vui được gặp bạn!", pt: "Muito prazer em conhecê-lo(a)!" },
      { vn: "Bạn là người nước nào?", pt: "Você é de qual país?" },
      { vn: "Tôi là người Brasil.", pt: "Sou brasileiro(a)." },
      { vn: "Tôi ở [thành phố].", pt: "Moro em [cidade]." },
      { vn: "Bạn bao nhiêu tuổi?", pt: "Quantos anos você tem?" },
      { vn: "Tôi [số] tuổi.", pt: "Tenho [número] anos." },
      { vn: "Bạn làm nghề gì?", pt: "Qual é a sua profissão?" },
      { vn: "Tôi là giáo viên / sinh viên / bác sĩ.", pt: "Sou professor(a) / estudante / médico(a)." },
    ],
  },
  {
    id: "rest", icon: "🍜", cor: "#b45309",
    titulo: "Restaurante & Comida",
    frases: [
      { vn: "Cho tôi xem thực đơn.", pt: "Me mostre o cardápio." },
      { vn: "Tôi muốn gọi món này.", pt: "Quero pedir este prato." },
      { vn: "Cho tôi một tô phở.", pt: "Me dê uma tigela de phở." },
      { vn: "Ngon lắm!", pt: "Muito gostoso!" },
      { vn: "Tính tiền.", pt: "A conta, por favor." },
      { vn: "Cho tôi nước.", pt: "Me dê água." },
      { vn: "Không cay.", pt: "Sem pimenta." },
      { vn: "Ít cay thôi.", pt: "Pouco picante." },
      { vn: "Có gì ngon?", pt: "O que você recomenda?" },
      { vn: "Còn bàn trống không?", pt: "Tem mesa disponível?" },
    ],
  },
  {
    id: "compras", icon: "🛍️", cor: "#059669",
    titulo: "Compras & Dinheiro",
    frases: [
      { vn: "Cái này giá bao nhiêu?", pt: "Quanto custa isso?" },
      { vn: "Đắt quá!", pt: "Muito caro!" },
      { vn: "Có rẻ hơn không?", pt: "Tem mais barato?" },
      { vn: "Giảm giá được không?", pt: "Dá para dar desconto?" },
      { vn: "Tôi muốn mua cái này.", pt: "Quero comprar isso." },
      { vn: "Tôi chỉ xem thôi.", pt: "Só estou olhando." },
      { vn: "Không, cảm ơn.", pt: "Não, obrigado(a)." },
      { vn: "Có cỡ khác không?", pt: "Tem em outro tamanho?" },
      { vn: "Có màu khác không?", pt: "Tem em outra cor?" },
      { vn: "Trả tiền mặt hay thẻ?", pt: "Pagar em dinheiro ou cartão?" },
    ],
  },
  {
    id: "direcoes", icon: "🗺️", cor: "#0369a1",
    titulo: "Direções & Lugares",
    frases: [
      { vn: "… ở đâu?", pt: "Onde fica …? (substitua '…' pelo lugar)" },
      { vn: "Tôi bị lạc.", pt: "Estou perdido(a)." },
      { vn: "Đi thẳng.", pt: "Vá em frente." },
      { vn: "Rẽ trái.", pt: "Vire à esquerda." },
      { vn: "Rẽ phải.", pt: "Vire à direita." },
      { vn: "Gần đây.", pt: "Perto daqui." },
      { vn: "Xa không?", pt: "É longe?" },
      { vn: "Đi bộ được không?", pt: "Dá para ir a pé?" },
      { vn: "Gọi taxi cho tôi.", pt: "Chame um táxi para mim." },
      { vn: "Bệnh viện ở đâu?", pt: "Onde fica o hospital?" },
      { vn: "Nhà hàng ở đâu?", pt: "Onde fica o restaurante?" },
      { vn: "Nhà vệ sinh ở đâu?", pt: "Onde fica o banheiro?" },
    ],
  },
  {
    id: "familia", icon: "👨‍👩‍👧", cor: "#be185d",
    titulo: "Família & Relações",
    frases: [
      { vn: "Gia đình tôi có … người.", pt: "Minha família tem … pessoas." },
      { vn: "Bố / Mẹ tôi là …", pt: "Meu pai / Minha mãe é …" },
      { vn: "Anh / Chị / Em tôi", pt: "Meu irmão mais velho / irmã mais velha / irmão(ã) mais novo(a)" },
      { vn: "Bạn có anh chị em không?", pt: "Você tem irmãos?" },
      { vn: "Tôi là con một.", pt: "Sou filho(a) único(a)." },
      { vn: "Bạn có gia đình chưa?", pt: "Você já tem família? (casado/filhos)" },
      { vn: "Tôi chưa kết hôn.", pt: "Ainda não sou casado(a)." },
      { vn: "Nhà bạn ở đâu?", pt: "Onde fica sua casa?" },
    ],
  },
  {
    id: "trab", icon: "💼", cor: "#0f766e",
    titulo: "Trabalho & Agenda",
    frases: [
      { vn: "Anh/Chị đi đâu đấy?", pt: "Para onde você está indo?" },
      { vn: "Tôi đi làm.", pt: "Vou trabalhar." },
      { vn: "Tôi đang đi công tác.", pt: "Estou em viagem de trabalho." },
      { vn: "Anh sẽ đi công tác ở đâu?", pt: "Para onde você vai viajar a trabalho?" },
      { vn: "Tuần sau tôi rất bận.", pt: "Semana que vem estou muito ocupado(a)." },
      { vn: "Tuần trước tôi đã đi Hà Nội.", pt: "Semana passada fui a Hanói." },
      { vn: "Tháng sau chúng tôi sẽ gặp lại.", pt: "Mês que vem nos reencontramos." },
      { vn: "Trước khi đi, anh gọi tôi nhé!", pt: "Antes de ir, me liga, tá?" },
      { vn: "Sau khi về, tôi sẽ liên lạc.", pt: "Depois de voltar, vou entrar em contato." },
      { vn: "Ngày mai anh có bận không?", pt: "Amanhã você está ocupado(a)?" },
    ],
  },
  {
    id: "emerg", icon: "🆘", cor: "#64748b",
    titulo: "Emergências & Situações Úteis",
    frases: [
      { vn: "Giúp tôi với!", pt: "Me ajude! / Socorro!" },
      { vn: "Gọi cảnh sát!", pt: "Chame a polícia!" },
      { vn: "Gọi cứu thương!", pt: "Chame a ambulância!" },
      { vn: "Tôi cần bác sĩ.", pt: "Preciso de médico." },
      { vn: "Tôi bị đau.", pt: "Estou com dor." },
      { vn: "Tôi bị mất ví.", pt: "Perdi minha carteira." },
      { vn: "Có wifi không?", pt: "Tem Wi-Fi aqui?" },
      { vn: "Mật khẩu wifi là gì?", pt: "Qual é a senha do Wi-Fi?" },
      { vn: "Tôi cần đi bệnh viện.", pt: "Preciso ir ao hospital." },
      { vn: "Khẩn cấp!", pt: "Urgente! / Emergência!" },
    ],
  },
];

const DIALOGOS = [
  {
    titulo: "Diálogo 1 — Convite para a Casa Nova",
    contexto: "John encontra Minh na rua e o convida para visitar sua nova casa.",
    personagens: { John: "#4f46e5", Minh: "#0891b2" },
    linhas: [
      { quem: "John", vn: "Chào Minh! Bạn có khỏe không?",         pt: "Oi Minh! Você está bem?" },
      { quem: "Minh", vn: "Vâng, tôi khỏe. Cảm ơn. Còn bạn?",    pt: "Sim, estou bem. Obrigado. E você?" },
      { quem: "John", vn: "Tôi cũng khỏe. Bạn có bận không?",     pt: "Eu também estou bem. Você está ocupado?" },
      { quem: "Minh", vn: "Không, tôi không bận. Có gì không?",   pt: "Não, não estou ocupado. O que houve?" },
      { quem: "John", vn: "Tôi muốn mời bạn đến nhà mới của tôi!", pt: "Quero te convidar para minha nova casa!" },
      { quem: "Minh", vn: "Ồ! Tuyệt quá! Nhà bạn ở đâu?",        pt: "Oh! Que ótimo! Onde fica sua casa?" },
      { quem: "John", vn: "Đây là địa chỉ. Ngày mai bạn đến nhé!", pt: "Aqui está o endereço. Venha amanhã, combinado!" },
      { quem: "Minh", vn: "Vâng! Tôi sẽ đến. Cảm ơn bạn nhiều!", pt: "Sim! Vou lá. Muito obrigado!" },
    ],
    gramatica: [
      "CÓ...KHÔNG → pergunta sim/não universal: 'Bạn có khỏe không?' = 'Você está bem?'",
      "CŨNG → também: 'Tôi cũng khỏe' = 'Eu também estou bem'",
      "SẼ → indica futuro: 'Tôi sẽ đến' = 'Eu vou / Eu irei'",
      "NHÉ → partícula de convite/confirmação no final: 'Đến nhé!' = 'Venha, tá?'",
      "CỦA → posse: 'Nhà mới của tôi' = 'Minha casa nova'",
    ],
  },
  {
    titulo: "Diálogo 2 — Visita à Casa",
    contexto: "Minh visita a casa de John — diálogo original do guia.",
    personagens: { John: "#4f46e5", Minh: "#0891b2" },
    linhas: [
      { quem: "Minh", vn: "Nhà này của anh rất đẹp và rộng.",           pt: "Esta sua casa é muito bonita e espaçosa." },
      { quem: "John", vn: "Đây là phòng khách, kia là phòng ngủ.",       pt: "Aqui é a sala de estar, ali é o quarto." },
      { quem: "Minh", vn: "Bức tranh của anh đẹp quá!",                  pt: "Seu quadro é lindo demais!" },
      { quem: "John", vn: "Vâng! Đây là bức tranh tôi mua ở Thái Lan.", pt: "Sim! Este é um quadro que comprei na Tailândia." },
    ],
    gramatica: [
      "NÀY (após substantivo) → 'este/esta': 'Nhà này' = 'Esta casa'",
      "ĐÂY LÀ... KIA LÀ... → par demonstrativo: 'Đây là phòng khách, kia là phòng ngủ' = 'Aqui a sala, ali o quarto'",
      "QUÁ → 'demais!' (exclamação de admiração): 'Đẹp quá!' = 'Lindo demais!'",
      "BỨC → classificador de pinturas/quadros: 'Bức tranh' = 'O quadro'",
      "VÂNG → confirmação formal, mais respeitosa que 'Có'",
      "CỦA → posse: 'Bức tranh của anh' = 'Seu quadro'",
    ],
  },
  {
    titulo: "Diálogo 3 — Trabalho & Idade (U3)",
    contexto: "Linh encontra An na rua — pergunta sobre trabalho e apresenta o filho. Diálogo da Unidade 3.",
    personagens: { Linh: "#be185d", An: "#059669" },
    linhas: [
      { quem: "Linh", vn: "Chào anh. Anh có khỏe không?",                                   pt: "Olá. Você está bem?" },
      { quem: "An",   vn: "Cảm ơn chị. Tôi khỏe. Còn chị?",                                pt: "Obrigado. Estou bem. E a senhora?" },
      { quem: "Linh", vn: "Cảm ơn anh. Tôi bình thường. Anh đi đâu đấy?",                  pt: "Obrigado. Estou mais ou menos. Para onde está indo?" },
      { quem: "An",   vn: "Tôi đi làm.",                                                     pt: "Vou trabalhar." },
      { quem: "Linh", vn: "Anh làm việc ở đâu?",                                             pt: "Onde o senhor trabalha?" },
      { quem: "An",   vn: "Tôi đang làm ở Ngân hàng ANZ.",                                   pt: "Estou trabalhando no Banco ANZ." },
      { quem: "Linh", vn: "Còn chị, chị dạy ở trường Đại học Quốc gia phải không?",         pt: "E a senhora, ensina na Universidade Nacional, não é?" },
      { quem: "An",   vn: "Vâng, tôi làm ở Trường Đại học Quốc gia Hà Nội.",                pt: "Sim, trabalho na Universidade Nacional de Hanói." },
      { quem: "Linh", vn: "Đây là con trai chị à? Cháu bao nhiêu tuổi?",                    pt: "Este é seu filho? Quantos anos ele tem?" },
      { quem: "An",   vn: "Vâng, đây là con trai tôi. Cháu 12 tuổi.",                       pt: "Sim, este é meu filho. Ele tem 12 anos." },
    ],
    gramatica: [
      "BÌNH THƯỜNG → 'normal / mais ou menos' — resposta honesta para 'como vai?'",
      "ĐI ĐÂU ĐẤY? → 'para onde está indo?' (informal) — ĐẤY é partícula casual de pergunta",
      "ĐANG + verbo → presente contínuo: 'Tôi đang làm' = 'Estou trabalhando (agora)'",
      "PHẢI KHÔNG? → tag question no final: 'Phải không?' = 'Não é? / Certo?'",
      "BAO NHIÊU TUỔI? → pergunta de idade: pronome + bao nhiêu + tuổi? | Resposta: pronome + número + tuổi",
      "CON TRAI / CON GÁI → filho / filha. CHÁU = pronome para crianças ao falar com adultos",
    ],
  },
  {
    titulo: "Diálogo 4 — Aniversário (SINH NHẬT)",
    contexto: "Linh pergunta a Minh que dia é hoje e descobre que semana que vem é o aniversário da mãe dele.",
    personagens: { Linh: "#be185d", Minh: "#7c3aed" },
    linhas: [
      { quem: "Linh", vn: "Anh Minh ơi, hôm nay là ngày bao nhiêu?",                        pt: "Minh, que dia é hoje?" },
      { quem: "Minh", vn: "Hôm nay là ngày 16 tháng 5.",                                     pt: "Hoje é dia 16 de maio." },
      { quem: "Linh", vn: "Tuần sau là sinh nhật của mẹ em. Em sẽ tặng mẹ quần áo mới.",    pt: "Semana que vem é o aniversário da minha mãe. Vou dar roupas novas de presente." },
      { quem: "Minh", vn: "Tuyệt quá! Mẹ em sẽ rất vui.",                                   pt: "Que ótimo! Sua mãe vai ficar muito feliz." },
    ],
    gramatica: [
      "HÔM NAY LÀ NGÀY BAO NHIÊU? → 'Que dia é hoje?' | Resposta: NGÀY + número + THÁNG + número",
      "TUẦN SAU / TUẦN TRƯỚC / TUẦN NÀY → proxima semana / semana passada / esta semana",
      "SẼ TẶNG → vai dar de presente (SẼ = futuro + TẶNG = presentear com direção: tặng [pessoa] [coisa])",
      "TUYỆT QUÁ! → 'Que ótimo! / Incrível!' — TUYỆT = excelente, QUÁ = demais (intensificador)",
      "SINH NHẬT → aniversário (SINH = nascer, NHẬT = dia/sol — origem sino-vietnamita)",
    ],
  },
];

function Categoria({ cat }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card" style={{ marginBottom: 12 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%", background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 12, padding: 0,
          fontFamily: "inherit",
        }}
      >
        <div style={{
          width: 42, height: 42, borderRadius: 10,
          background: cat.cor + "18", border: `1.5px solid ${cat.cor}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20, flexShrink: 0,
        }}>
          {cat.icon}
        </div>
        <div style={{ flex: 1, textAlign: "left" }}>
          <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--text)" }}>{cat.titulo}</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 1 }}>
            {cat.frases.length} frases práticas
          </div>
        </div>
        <span style={{
          color: "var(--text-muted)", fontSize: 20, flexShrink: 0,
          transform: open ? "rotate(180deg)" : "none", transition: "0.2s",
        }}>▾</span>
      </button>
      {open && (
        <div style={{ marginTop: 14, borderTop: "1px solid var(--border)", paddingTop: 14 }}>
          <table className="ref-table" style={{ marginTop: 0 }}>
            <thead>
              <tr>
                <th>🇻🇳 Vietnamita</th>
                <th>🇧🇷 Português</th>
              </tr>
            </thead>
            <tbody>
              {cat.frases.map((f, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, fontSize: 14.5, color: "var(--text)" }}>{f.vn}</td>
                  <td style={{ color: "var(--text-muted)" }}>{f.pt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function Conversacao() {
  return (
    <div>
      <h2 className="page-title">💬 Frases Situacionais</h2>
      <p className="page-subtitle">
        8 categorias de frases prontas para o dia a dia. Clique para expandir.
      </p>

      <div className="tip">
        📌 <strong>Pronomes:</strong> nestas frases usamos <strong>Tôi / Bạn</strong> (neutro, mesma
        faixa etária). Para falar com pessoas mais velhas, troque "Bạn" por "Anh"
        (homem) ou "Chị" (mulher), e "Tôi" por "Em". Veja a aba Gramática →
        regra 9 para o sistema completo.
      </div>

      {CATEGORIAS.map((cat) => (
        <Categoria key={cat.id} cat={cat} />
      ))}

      <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--text)", margin: "28px 0 6px" }}>
        🎭 Diálogos Completos
      </h3>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>
        Leia em voz alta. As anotações de gramática explicam as estruturas de
        cada fala.
      </p>

      {DIALOGOS.map((d, di) => {
        const speakers = Object.keys(d.personagens);
        return (
          <div key={di} className="card">
            <div className="card-title">{d.titulo}</div>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 14, fontStyle: "italic" }}>
              📌 {d.contexto}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              {d.linhas.map((l, li) => {
                const cor = d.personagens[l.quem] || "#94a3b8";
                return (
                  <div key={li} style={{
                    display: "flex", gap: 14, alignItems: "flex-start",
                    padding: "11px 14px",
                    background: speakers.indexOf(l.quem) === 0 ? "#f0f4ff" : "#f8fafc",
                    borderLeft: `4px solid ${cor}`,
                    borderRadius: "0 8px 8px 0",
                  }}>
                    <div style={{ minWidth: 50, fontWeight: 700, fontSize: 11, color: cor, paddingTop: 2 }}>
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
            <div style={{ padding: "12px 14px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#78350f", marginBottom: 8 }}>
                📚 Gramática em destaque:
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 5 }}>
                {d.gramatica.map((g, i) => (
                  <li key={i} style={{ fontSize: 12, color: "#92400e" }}>• {g}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
