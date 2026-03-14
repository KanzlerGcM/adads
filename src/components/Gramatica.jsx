function RuleCard({ title, note, tip, children }) {
  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div className="gram-rule-title">{title}</div>
      {note && <div className="note">{note}</div>}
      {tip  && <div className="tip">{tip}</div>}
      {children}
    </div>
  );
}

function T({ headers, rows }) {
  return (
    <table className="ref-table">
      <thead><tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
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

export default function Gramatica() {
  return (
    <div>
      <h2 className="page-title">🏗️ Gramática</h2>
      <p className="page-subtitle">Estruturas essenciais do vietnamita explicadas de forma simples.</p>

      <RuleCard
        title="1. Verbo SER / ESTAR → LÀ"
        note="⚠️ Em vietnamita, 'ser/estar' tem UMA única forma: LÀ — não muda para nenhum pronome!"
      >
        <T
          headers={["Estrutura", "Exemplo", "Tradução"]}
          rows={[
            ["Sujeito + <b>LÀ</b> + complemento", "Tôi <b>là</b> giáo viên", "Eu sou professor"],
            ["", "Tôi <b>là</b> người Việt Nam", "Eu sou vietnamita"],
            ["", "Đây <b>là</b> phòng khách", "Aqui é a sala de estar"],
          ]}
        />
      </RuleCard>

      <RuleCard
        title="2. Posse → CỦA"
        tip="📌 CỦA pode ser omitido quando a posse já é clara pelo contexto. Nhà tôi = Nhà của tôi."
      >
        <T
          headers={["Regra", "Estrutura", "Exemplo", "Tradução"]}
          rows={[
            ["Posse explícita", "coisa + <b>CỦA</b> + pronome", "Sách <b>của</b> tôi", "Meu livro"],
            ["", "", "Giáo viên <b>của</b> tôi", "Meu professor"],
            ["Posse implícita", "<b>CỦA</b> omitido", "Nhà tôi = Nhà <b>của</b> tôi", "Minha casa"],
          ]}
        />
      </RuleCard>

      <RuleCard
        title="3. Adjetivos e Negação"
        tip="📌 RẤT = 'muito' — intensifica qualquer adjetivo. Rất đẹp = muito bonito."
      >
        <T
          headers={["Tipo", "Estrutura", "Exemplo", "Tradução"]}
          rows={[
            ["Afirmação", "Sujeito + <b>rất</b> + adj", "Cô ấy <b>rất</b> đẹp", "Ela é muito bonita"],
            ["Afirmação simples", "Sujeito + adj", "Nhà đẹp", "Casa bonita"],
            ["Negação", "Sujeito + <b>không</b> + adj", "Nhà <b>không</b> đẹp", "A casa não é bonita"],
          ]}
        />
      </RuleCard>

      <RuleCard
        title="4. Pergunta Sim/Não → CÓ... KHÔNG?"
        tip="📌 Estrutura universal — funciona com qualquer verbo ou adjetivo."
      >
        <T
          headers={["Estrutura", "Exemplo", "Tradução"]}
          rows={[
            ["Pronome + <b>có</b> + verbo/adj + <b>không?</b>", "Bạn <b>có</b> khoẻ <b>không?</b>", "Você está bem?"],
            ["", "Anh <b>có</b> bận <b>không?</b>", "Você está ocupado?"],
            ["", "Bạn <b>có</b> vui <b>không?</b>", "Você está feliz?"],
            ["Resposta afirmativa", "Có. + confirmação", "<b>Có.</b> Tôi khoẻ.", "Sim. Estou bem."],
            ["Resposta negativa", "Không. + negação", "<b>Không</b>, tôi không bận.", "Não, não estou ocupado."],
          ]}
        />
      </RuleCard>

      <RuleCard
        title="5. Tempo Futuro → SẼ + Verbo"
        note="⚠️ Não existe conjugação verbal em vietnamita! Basta adicionar SẼ antes do verbo."
      >
        <T
          headers={["Estrutura", "Exemplo", "Tradução"]}
          rows={[
            ["Sujeito + <b>sẽ</b> + verbo", "Tôi <b>sẽ</b> đến", "Eu vou / Eu irei"],
            ["", "Tôi <b>sẽ</b> mua", "Eu vou comprar"],
            ["", "Anh <b>sẽ</b> ăn phở", "Ele vai comer phở"],
          ]}
        />
      </RuleCard>

      <RuleCard
        title="6. Demonstrativos → ĐÂY / NÀY / KIA"
      >
        <T
          headers={["Palavra", "Significado", "Posição", "Exemplo", "Tradução"]}
          rows={[
            ["<b>Đây</b>", "Aqui / Este", "Antes do verbo ou sozinho", "<b>Đây</b> là nhà tôi", "Esta é minha casa"],
            ["<b>Này</b>", "Este/Esta (perto)", "APÓS o substantivo", "Sách <b>này</b> là của tôi", "Este livro é meu"],
            ["<b>Kia</b>", "Aquele/Aquela (longe)", "APÓS o substantivo", "Nhà <b>kia</b> rất đẹp", "Aquela casa é linda"],
          ]}
        />
        <div className="note" style={{ marginTop: 10 }}>⚠️ NÀY e KIA sempre vêm DEPOIS do substantivo. Nunca antes!</div>
      </RuleCard>

      <RuleCard
        title="7. Pergunta 'O QUÊ?' → GÌ (sempre no FINAL)"
      >
        <T
          headers={["Estrutura", "Exemplo", "Tradução"]}
          rows={[
            ["... + <b>gì?</b>", "Bạn tên là <b>gì?</b>", "Qual é o seu nome?"],
            ["", "Đây là cái <b>gì?</b>", "O que é isso?"],
          ]}
        />
      </RuleCard>

      <RuleCard
        title="8. Pergunta 'QUAL?' → NÀO (sempre no FINAL)"
      >
        <T
          headers={["Estrutura", "Exemplo", "Tradução"]}
          rows={[
            ["... + <b>nào?</b>", "Bạn là người nước <b>nào?</b>", "De qual país você é?"],
          ]}
        />
      </RuleCard>

      <RuleCard title="9. Sistema de Pronomes por Relação de Idade">
        <div className="note">⚠️ FUNDAMENTAL: Os pronomes mudam conforme a relação de idade. Usar o errado pode ser desrespeitoso!</div>
        <T
          headers={["EU (digo)", "VOCÊ (chamo de)", "Situação"]}
          rows={[
            ["<b>Tôi</b>", "<b>Bạn</b>", "Mesma faixa etária — informal"],
            ["<b>Em</b>", "<b>Anh</b>", "Eu sou mais novo; você é homem mais velho"],
            ["<b>Em</b>", "<b>Chị</b>", "Eu sou mais novo; você é mulher mais velha"],
            ["<b>Anh / Chị</b>", "<b>Em</b>", "Eu sou mais velho; você é mais novo(a)"],
            ["<b>Cháu</b>", "<b>Ông</b>", "Você é da idade do meu avô"],
            ["<b>Cháu</b>", "<b>Bà</b>", "Você é da idade da minha avó"],
            ["<b>Cháu</b>", "<b>Bác</b>", "Um pouco mais velho que meus pais (qualquer gênero)"],
            ["<b>Cháu</b>", "<b>Chú</b>", "Homem um pouco mais novo que meu pai"],
            ["<b>Cháu</b>", "<b>Cô</b>", "Mulher um pouco mais nova que meu pai"],
          ]}
        />
      </RuleCard>

      <RuleCard title="⚠️ Erros Comuns — Não Confunda!">
        <T
          headers={["#", "Regra", "❌ Errado", "✅ Correto"]}
          rows={[
            ["1", "5 após dezena → <b>LĂM</b>", '<span class="wrong">Hai mươi NĂM</span>', '<span class="correct">Hai mươi LĂM</span>'],
            ["2", "1 após dezena → <b>MỐT</b>", '<span class="wrong">Hai mươi MỘT</span>', '<span class="correct">Hai mươi MỐT</span>'],
            ["3", "Zero na dezena → <b>LINH</b>", '<span class="wrong">Một trăm không một</span>', '<span class="correct">Một trăm LINH một</span>'],
            ["4", "<b>LÀ</b> nunca muda de forma", '<span class="wrong">Tôi am / Anh is</span>', '<span class="correct">Sempre: LÀ</span>'],
            ["5", "<b>GÌ</b> vai ao FINAL", '<span class="wrong">Gì bạn tên là?</span>', '<span class="correct">Bạn tên là gì?</span>'],
            ["6", "<b>NÀO</b> vai ao FINAL", '<span class="wrong">Nào nước bạn là người?</span>', '<span class="correct">Bạn là người nước nào?</span>'],
            ["7", "<b>NÀY / KIA</b> após substantivo", '<span class="wrong">Này sách / Kia nhà</span>', '<span class="correct">Sách này / Nhà kia</span>'],
          ]}
        />
      </RuleCard>

      <RuleCard title="🟠 Palavras Parecidas — Cuidado!">
        <T
          headers={["Palavra", "Categoria", "Significado", "Exemplo"]}
          rows={[
            ["<b>Mới</b>", "Adjetivo", "Novo(a)", "Nhà mới = Casa nova"],
            ["<b>Mời</b>", "Verbo", "Convidar / Por favor", "Mời anh ăn = Convido para comer"],
            ["<b>Muốn</b>", "Verbo", "Querer", "Tôi muốn = Eu quero"],
            ["<b>MỘT</b>", "Número", "Um (1) — forma base", "Một người"],
            ["<b>MỐT</b>", "Número", "Um (1) — após dezenas", "Hai mươi mốt = 21"],
            ["<b>NĂM</b>", "Número", "Cinco (5) — forma base", "Năm người"],
            ["<b>LĂM</b>", "Número", "Cinco (5) — após dezenas", "Hai mươi lăm = 25"],
          ]}
        />
      </RuleCard>
    </div>
  );
}
