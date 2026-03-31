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

      {/* Intro: 5 pontos */}
      <div className="card" style={{ marginBottom: 16, background: "linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%)", border: "1.5px solid #c7d2fe" }}>
        <div className="card-title">⚡ Gramática Vietnamita em 5 Pontos</div>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 14 }}>
          Antes de mergulhar nas regras específicas, entenda o que torna o
          vietnamita diferente do português. Estes 5 pontos explicam 80% da
          gramática.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 10 }}>
          {[
            { n: "1", titulo: "Sem conjugação", cor: "#4f46e5", desc: '"Ăn" = comer para todo mundo. O verbo nunca muda — nem por pessoa (eu/você/ele), nem por tempo (passado/futuro).' },
            { n: "2", titulo: "Ordem igual ao PT", cor: "#0891b2", desc: 'SVO — Sujeito + Verbo + Objeto. "Tôi ăn phở" = Eu como phở. Estrutura idêntica ao português!' },
            { n: "3", titulo: "Adjetivo APÓS o nome", cor: "#7c3aed", desc: '"Casa bonita" vira "nhà đẹp" (lit. casa bonita). O adjetivo fica depois do substantivo — também igual ao português!' },
            { n: "4", titulo: "Sem gênero ou plural", cor: "#059669", desc: 'Sem masculino/feminino. Sem -s de plural. "Người" = pessoa ou pessoas. O contexto e os numerais fazem esse trabalho.' },
            { n: "5", titulo: "Pronome = relação", cor: "#b45309", desc: 'Não existe um único "eu" ou "você". O pronome muda conforme a idade e relação entre as pessoas (Anh, Chị, Em, Ông, Bà...).' },
          ].map((p) => (
            <div key={p.n} style={{ background: "#ffffff", borderRadius: 9, padding: "12px 14px", border: `1.5px solid ${p.cor}25` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: p.cor, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, flexShrink: 0 }}>{p.n}</div>
                <span style={{ fontWeight: 700, fontSize: 13, color: "var(--text)" }}>{p.titulo}</span>
              </div>
              <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.55 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

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
            ["Negação: Sujeito + <b>không phải là</b> + compl.", "Tôi <b>không phải là</b> giáo viên", "Eu não sou professor"],
            ["", "Đây <b>không phải là</b> phòng khách", "Aqui não é a sala de estar"],
          ]}
        />
        <div className="note" style={{ marginTop: 10 }}>
          ⚠️ <b>Por que PHẢI é obrigatório?</b><br/>
          Em vietnamita, LÀ <i>não se nega diretamente</i>. <b>PHẢI</b> funciona como um marcador de identidade — significa "ser exatamente / ser de fato".<br/>
          Pense assim: <b>Tôi là giáo viên</b> = "Eu <i>sou</i> professor" (afirma identidade com LÀ).<br/>
          Para negar, você NÃO diz "Tôi <b>không là</b>" — isso soa como vietnamita quebrado para um nativo.<br/>
          O que você faz: <b>PHẢI</b> marca a identidade ("é de fato"), então <b>KHÔNG PHẢI</b> nega esse marcador inteiro → "não é de fato".<br/>
          Resultado: <b>Tôi không phải là giáo viên</b> = "Eu <i>não sou</i> professor."
        </div>
        <div className="tip" style={{ marginTop: 8 }}>
          📌 Resumo prático — quando usar KHÔNG e quando usar KHÔNG PHẢI LÀ:<br/>
          Tôi <b>không</b> bận. → nega verbo/adjetivo → "Não estou ocupado."<br/>
          Tôi <b>không phải là</b> giáo viên. → nega identidade (LÀ) → "Não sou professor."
        </div>
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
            ["", "", "Mẹ anh = Mẹ <b>của</b> anh", "A mãe dele / Sua mãe"],
            ["Posse explícita (do Diálogo 2)", "", "Bức tranh <b>của</b> anh", "Seu quadro"],
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
            ["Exclamação (QUÁ)", "adj + <b>quá!</b>", "Đẹp <b>quá!</b>", "Lindo demais! / Que bonito!"],
            ["Reação (LẮM)", "adj + <b>lắm!</b>", "Ngon <b>lắm!</b>", "Muito gostoso! / Delicioso demais!"],
          ]}
        />
        <div className="note" style={{ marginTop: 10 }}>
          💡 <b>QUÁ</b> e <b>LẮM</b> vêm sempre no <b>FINAL</b> do adjetivo/frase. QUÁ é mais exclamativo e de admiração ("demais!"); LẮM é mais afirmativo e intenso ("muito / bastante"). Ambos estão no Diálogo 2: "Bức tranh của anh đẹp <b>quá</b>!" = "Seu quadro é lindo demais!"
        </div>
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
        <div className="note" style={{ marginTop: 10 }}>
          💡 <b>CÓ</b> também é um verbo independente que significa <b>TER</b>: “Bạn có nhà không?” = “Você tem uma casa?” — e “Có!” sozinho é a resposta afirmativa: “Tenho! / Sim!”
        </div>
      </RuleCard>

      <RuleCard
        title="5. Tempo Futuro → SẼ + Verbo"
        note="⚠️ Não existe conjugação verbal em vietnamita! Basta adicionar SẼ antes do verbo."
      >
        <T
          headers={["Marcador", "Tempo", "Estrutura", "Exemplo", "Tradução"]}
          rows={[
            ["<b>sẽ</b>", "Futuro", "Sujeito + <b>sẽ</b> + verbo", "Tôi <b>sẽ</b> đến", "Eu vou / Eu irei"],
            ["", "", "", "Tôi <b>sẽ</b> mua", "Eu vou comprar"],
            ["", "", "", "Anh <b>sẽ</b> đi công tác", "Você vai a trabalho"],
            ["<b>đã</b>", "Passado", "Sujeito + <b>đã</b> + verbo", "Tôi <b>đã</b> mua", "Eu comprei (já comprei)"],
            ["", "", "", "Anh <b>đã</b> đến", "Ele veio / já chegou"],
          ]}
        />
        <div className="tip" style={{ marginTop: 10 }}>
          📌 O verbo <b>nunca muda</b> — o mesmo "mua" (comprar) serve para todos os tempos. SẼ e ĐÃ são marcadores independentes colocados <b>antes</b> do verbo. Sem marcador = presente ou o contexto determina o tempo.
        </div>
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
        <div className="tip" style={{ marginTop: 8 }}>
          📌 <b>Par ĐÂY ↔ KIA</b> na mesma frase — do Diálogo 2: “<b>Đây</b> là phòng khách, <b>kia</b> là phòng ngủ.” = “Aqui é a sala de estar, ali é o quarto.” Use ĐÂY para o que está perto de você e KIA para o que está longe.
        </div>
      </RuleCard>

      <RuleCard
        title="7. Pergunta 'O QUÊ?' → GÌ (sempre no FINAL)"
      >
        <T
          headers={["Estrutura", "Exemplo", "Tradução"]}
          rows={[
            ["... + <b>gì?</b>", "Bạn tên là <b>gì?</b>", "Qual é o seu nome?"],
            ["", "Đây là cái <b>gì?</b>", "O que é isso?"],
            ["", "Bạn muốn ăn <b>gì?</b>", "O que você quer comer?"],
            ["", "Bạn làm nghề <b>gì?</b>", "Qual é a sua profissão?"],
          ]}
        />
        <div className="note" style={{ marginTop: 10 }}>
          ⚠️ <b>GÌ vai SEMPRE ao final</b> — nunca no início como em português. "O que você quer?" → "Bạn muốn <b>gì?</b>" (lit. "Você quer o quê?"). O erro clássico: <b>Gì bạn muốn?</b> ❌
        </div>
      </RuleCard>

      <RuleCard
        title="8. Pergunta 'QUAL?' → NÀO (sempre no FINAL)"
      >
        <T
          headers={["Estrutura", "Exemplo", "Tradução"]}
          rows={[
            ["... + <b>nào?</b>", "Bạn là người nước <b>nào?</b>", "De qual país você é?"],
            ["", "Phòng <b>nào?</b>", "Qual quarto / cômodo?"],
            ["", "Bạn muốn cái <b>nào?</b>", "Qual você quer?"],
          ]}
        />
        <div className="note" style={{ marginTop: 10 }}>
          ⚠️ <b>NÀO vai SEMPRE ao final</b> — igual ao GÌ. "Qual país?" → "Nước <b>nào?</b>" O erro típico: <b>Nào nước?</b> ❌<br/>
          📌 Diferença: <b>GÌ</b> pergunta "o quê?" (coisa desconhecida) · <b>NÀO</b> pergunta "qual?" (escolha entre opções conhecidas).
        </div>
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
        <div style={{ fontWeight: 700, fontSize: 13.5, color: "var(--text)", marginTop: 20, marginBottom: 10, borderTop: "1px solid var(--border)", paddingTop: 12 }}>
          📚 Vocábulo de Família — para referência
        </div>
        <T
          headers={["Vietnamita", "Português", "Observação"]}
          rows={[
            ["<b>Ông</b>", "Avô", "Também: 'O senhor' (homem idoso)"],
            ["<b>Bà</b>", "Avó", "Também: 'A senhora' (mulher idosa)"],
            ["<b>Bố</b>", "Pai", "Alternativa informal: Ba"],
            ["<b>Mẹ</b>", "Mãe", "Variante sul: Má"],
            ["<b>Anh</b>", "Irmão mais velho", "Também pronome: 'Você' (h. mais velho)"],
            ["<b>Chị</b>", "Irmã mais velha", "Também pronome: 'Você' (m. mais velha)"],
            ["<b>Em</b>", "Irmão/Irmã mais novo(a)", "Também pronome: 'Eu' (falando com mais velhos)"],
            ["<b>Bác</b>", "Tio/Tia (mais velhos que os pais)", "Qualquer gênero"],
            ["<b>Cậu</b>", "Tio (irmão mais novo da mãe)", "Masculino"],
            ["<b>Chú</b>", "Tio (irmão mais novo do pai)", "Masculino"],
            ["<b>Cô</b>", "Tia (irmã do pai)", "Feminino"],
            ["<b>Dì</b>", "Tia (irmã mais nova da mãe)", "Feminino"],
          ]}
        />
        <div style={{ fontWeight: 700, fontSize: 13.5, color: "var(--text)", marginTop: 20, marginBottom: 10, borderTop: "1px solid var(--border)", paddingTop: 12 }}>
          👥 "Nós" — Exclusivo vs. Inclusivo
        </div>
        <div className="note">⚠️ O vietnamita distingue se o ouvinte está <b>incluído ou excluído</b> no "nós" — algo que o português não faz!</div>
        <T
          headers={["Termo", "Tipo", "Quem está incluído", "Equiv. inglês"]}
          rows={[
            ["<b>Chúng tôi</b>", "Exclusivo", "Eu + Eles (sem você)", "We (exclusive)"],
            ["<b>Chúng ta</b>",  "Inclusivo", "Eu + Você (+ todos)",  "We (inclusive) / Let's"],
            ["<b>Chúng mình</b>","Informal",  "Entre amigos íntimos ou casais", "We (us)"],
          ]}
        />
        <div className="tip" style={{ marginTop: 10 }}>
          📌 <b>Chúng tôi đi Hà Nội</b> = "Nós fomos a Hanói" (você não foi junto)<br/>
          📌 <b>Chúng ta đi Hà Nội nhé!</b> = "Vamos a Hanói!" (você vem junto)<br/>
          📌 <b>Chúng mình ăn phở nhé</b> = "A gente come phở, tá?" (íntimo)
        </div>
      </RuleCard>

      <RuleCard title="10. Datas, Dias da Semana e Tempo">
        <div className="note">
          📅 Do PDF <b>SINH NHẬT CỦA TÔI</b> — como dizer datas completas, dias da semana e expressões de tempo.
        </div>

        <div style={{ fontWeight: 700, fontSize: 13.5, color: "var(--text)", marginTop: 14, marginBottom: 8 }}>
          📆 Dias da Semana — THỨ + número (a partir de 2)
        </div>
        <T
          headers={["Vietnamita", "Número", "Português"]}
          rows={[
            ["<b>Thứ Hai</b>",  "2",  "Segunda-feira"],
            ["<b>Thứ Ba</b>",   "3",  "Terça-feira"],
            ["<b>Thứ Tư</b>",   "4",  "Quarta-feira"],
            ["<b>Thứ Năm</b>",  "5",  "Quinta-feira"],
            ["<b>Thứ Sáu</b>",  "6",  "Sexta-feira"],
            ["<b>Thứ Bảy</b>",  "7",  "Sábado"],
            ["<b>Chủ Nhật</b>", "—",  "Domingo (exceção — não usa THỨ)"],
          ]}
        />
        <div className="tip" style={{ marginTop: 8 }}>
          📌 Pergunta: <b>Hôm nay là thứ mấy?</b> = "Que dia da semana é hoje?"<br/>
          📌 <b>CHỦ NHẬT</b> é exceção: origem sino-vietnamita (CHỦ = senhor, NHẬT = dia/sol).
        </div>

        <div style={{ fontWeight: 700, fontSize: 13.5, color: "var(--text)", marginTop: 20, marginBottom: 8 }}>
          🗓️ Meses — THÁNG + número
        </div>
        <T
          headers={["Vietnamita", "Mês"]}
          rows={[
            ["<b>Tháng Một</b>",       "Janeiro (1)"],
            ["<b>Tháng Hai</b>",       "Fevereiro (2)"],
            ["<b>Tháng Ba</b>",        "Março (3)"],
            ["<b>Tháng Tư</b>",        "Abril (4) — TƯ, não bốn"],
            ["<b>Tháng Năm</b>",       "Maio (5)"],
            ["<b>Tháng Sáu</b>",       "Junho (6)"],
            ["<b>Tháng Bảy</b>",       "Julho (7)"],
            ["<b>Tháng Tám</b>",       "Agosto (8)"],
            ["<b>Tháng Chín</b>",      "Setembro (9)"],
            ["<b>Tháng Mười</b>",      "Outubro (10)"],
            ["<b>Tháng Mười Một</b>",  "Novembro (11)"],
            ["<b>Tháng Mười Hai</b>",  "Dezembro (12)"],
          ]}
        />

        <div style={{ fontWeight: 700, fontSize: 13.5, color: "var(--text)", marginTop: 20, marginBottom: 8 }}>
          📝 Formato de Data Completa
        </div>
        <div className="note">
          Ordem: <b>THỨ [dia] — NGÀY [número] — THÁNG [número] — NĂM [número]</b><br/>
          Exemplo: <b>Thứ Tư ngày 1 tháng 4 năm 2026</b> = Quarta-feira, 1 de abril de 2026<br/>
          Para datas simples: <b>Hôm nay là ngày 16 tháng 5.</b> = "Hoje é dia 16 de maio."<br/>
          Pergunta: <b>Hôm nay là ngày bao nhiêu?</b> = "Que dia é hoje?"
        </div>

        <div style={{ fontWeight: 700, fontSize: 13.5, color: "var(--text)", marginTop: 20, marginBottom: 8 }}>
          ⏳ Referências de Tempo
        </div>
        <T
          headers={["← Passado", "← Passado", "Presente", "Futuro →", "Futuro →"]}
          rows={[
            ["<b>Hôm kia</b><br/><span style='font-size:11px'>anteontem</span>", "<b>Hôm qua</b><br/><span style='font-size:11px'>ontem</span>", "<b>Hôm nay</b><br/><span style='font-size:11px'>hoje</span>", "<b>Ngày mai</b><br/><span style='font-size:11px'>amanhã</span>", "<b>Ngày kia</b><br/><span style='font-size:11px'>depois de amanhã</span>"],
            ["<b>2 tuần trước</b><br/><span style='font-size:11px'>há 2 semanas</span>", "<b>Tuần trước</b><br/><span style='font-size:11px'>semana passada</span>", "<b>Tuần này</b><br/><span style='font-size:11px'>esta semana</span>", "<b>Tuần sau</b><br/><span style='font-size:11px'>semana que vem</span>", "<b>Hai tuần sau</b><br/><span style='font-size:11px'>em 2 semanas</span>"],
            ["<b>2 tháng trước</b><br/><span style='font-size:11px'>há 2 meses</span>", "<b>Tháng trước</b><br/><span style='font-size:11px'>mês passado</span>", "<b>Tháng này</b><br/><span style='font-size:11px'>este mês</span>", "<b>Tháng sau</b><br/><span style='font-size:11px'>mês que vem</span>", "<b>Hai tháng sau</b><br/><span style='font-size:11px'>em 2 meses</span>"],
            ["<b>2 năm trước</b><br/><span style='font-size:11px'>há 2 anos</span>", "<b>Năm ngoái</b><br/><span style='font-size:11px'>ano passado</span>", "<b>Năm nay</b><br/><span style='font-size:11px'>este ano</span>", "<b>Năm sau</b><br/><span style='font-size:11px'>ano que vem</span>", "<b>Hai năm sau</b><br/><span style='font-size:11px'>em 2 anos</span>"],
          ]}
        />
        <div className="tip" style={{ marginTop: 8 }}>
          📌 <b>Atenção:</b> "ano passado" = <b>NĂM NGOÁI</b> (não NĂM TRƯỚC) — é uma exceção!<br/>
          📌 TRƯỚC = antes/atrás | NÀY = este/esta | SAU = depois/próximo
        </div>
      </RuleCard>

      <RuleCard title="11. Classificadores — O que é BỨC?">
        <div className="note">
          ⚠️ No diálogo do PDF: <b>"Bức tranh của anh đẹp quá!"</b> — <i>"Seu quadro é lindo demais!"</i><br/>
          Por que <b>bức</b> aparece antes de <b>tranh</b>? Porque em vietnamita, substantivos concretos usam uma palavra classificadora que indica a <i>categoria</i> do objeto.
        </div>
        <div className="tip" style={{ marginTop: 8 }}>
          📌 Estrutura: <b>CLASSIFICADOR + substantivo</b> — Ex: <b>bức tranh</b> = lit. "bức de pintura" → o quadro / a pintura
        </div>
        <T
          headers={["Classificador", "O que classifica", "Exemplo", "Tradução"]}
          rows={[
            ["<b>bức</b>", "Pinturas, quadros, fotos, cartas, paredes", "<b>Bức tranh</b> này rất đẹp", "Este quadro é muito bonito"],
            ["<b>bức</b>", "", "Đây là <b>bức tranh</b> tôi mua ở Thái Lan", "Este é o quadro que comprei na Tailândia"],
            ["<b>cái</b>", "Objetos em geral (coisas, itens)", "Đây là cái gì? / <b>Cái</b> này", "O que é isso? / Este aqui"],
            ["<b>con</b>", "Animais, rios, estradas, objetos longos", "<b>Con</b> mèo / <b>con</b> đường", "O gato / A rua"],
            ["<b>ngôi</b>", "Casas e edifícios", "<b>Ngôi</b> nhà kia rất đẹp", "Aquela casa é muito bonita"],
            ["<b>quyển</b>", "Livros e cadernos", "<b>Quyển</b> sách này rất hay", "Este livro é muito bom"],
            ["<b>quả / trái</b>", "Frutas (redondas)", "<b>Quả</b> táo này rất ngon", "Esta maçã é muito gostosa"],
            ["<b>bộ</b>", "Conjuntos/séries (filmes, roupas, móveis)", "<b>Bộ</b> phim này rất tuyệt", "Este filme é incrível"],
          ]}
        />
        <div className="note" style={{ marginTop: 10 }}>
          💡 <b>bức tranh</b> aparece como palavra única no vocabulário, mas entender que <b>bức</b> é o classificador explica por que a palavra é formada assim — e por que outros quadros/fotos também levam <b>bức</b>.
        </div>
      </RuleCard>
      <RuleCard title="🔗 Conectores Essenciais — CÒN, VÀ e MÀ">
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
          Estas três palavras aparecem diretamente nos diálogos e exemplos do guia. Entendê-las conecta as frases de forma natural.
        </p>
        <T
          headers={["Palavra", "Significado", "Uso", "Exemplo", "Tradução"]}
          rows={[
            ["<b>Còn</b>", "E você? / E (continuação)", "Retomar e perguntar ao interlocutor", "Tôi khỏe, <b>còn</b> anh?", "Estou bem, e você?"],
            ["<b>Và</b>", "E (une dois elementos)", "Conectar adjetivos ou substantivos", "Rất đẹp <b>và</b> rộng", "Muito bonito e espaçoso"],
            ["<b>Mà</b>", "Mas / Porém (casual)", "Contraste leve — fala cotidiana", "Đẹp <b>mà</b> đắt", "Bonito mas caro"],
          ]}
        />
        <div className="note" style={{ marginTop: 10 }}>
          ⚠️ <b>VÀ</b> aparece no Diálogo 2: "Nhà này của anh rất đẹp <b>và</b> rộng" = "Esta sua casa é muito bonita <b>e</b> espaçosa."<br/>
          ⚠️ <b>MÀ</b> = Tom 3 de \"ma\" na tabela de tons — cuidado com a marca diacrítica `!
        </div>
      </RuleCard>

      <RuleCard title="🗣️ Juntando Tudo — Apresentação Pessoal Completa">
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
          O PDF ensina uma sequência de 5 passos para se apresentar em vietnamita. Cada passo usa uma regra já aprendida:
        </p>
        <T
          headers={["Passo", "Vietnamita", "Regra usada", "Português"]}
          rows={[
            ["1 — Cumprimentar", "<b>Xin chào!</b>", "Expressão fixa", "Olá!"],
            ["2 — Apresentar nome", "Tôi <b>là</b> João.", "Regra 1 — LÀ", "Eu sou João."],
            ["3 — Origem / nacionalidade", "Tôi <b>là người</b> Brasil.", "Regra 1 + người + país", "Eu sou brasileiro(a)."],
            ["4 — Cidade ou país", "Tôi <b>đến từ</b> Brasil.", "Verbo ĐẾN TỪ", "Eu venho do Brasil."],
            ["5 — Agradecer", "<b>Cảm ơn!</b>", "Expressão fixa", "Obrigado(a)!"],
          ]}
        />
        <div className="tip" style={{ marginTop: 10 }}>
          📌 Para <b>PERGUNTAR</b> ao outro: <b>"Bạn tên là gì?"</b> (Regra 7 — GÌ) · <b>"Bạn là người nước nào?"</b> (Regra 8 — NÀO) · <b>"Bạn có khoẻ không?"</b> (Regra 4 — CÓ...KHÔNG)
        </div>
      </RuleCard>
      <RuleCard title="💡 Dicas Gerais de Estudo">
        <T
          headers={["Dica", "Por quê é importante"]}
          rows={[
            ["Aprenda os <b>6 tons</b> antes de qualquer palavra", "Sem tons, a mesma sílaba pode virar palavra completamente diferente"],
            ["Memorize os <b>pronomes por relação</b> cedo", "Usar o pronome errado é considerado desrespeitoso culturalmente"],
            ["<b>C/K</b>, <b>G/GH</b>, <b>NG/NGH</b> dependem da vogal seguinte", "Regra fundamental de escrita — determina qual letra usar"],
            ["<b>CỦA</b> pode ser omitido quando a posse é clara", "Torna a fala mais natural: 'Nhà tôi' em vez de 'Nhà của tôi'"],
            ["<b>SẼ + verbo</b> = futuro, sem exceções", "Não há conjugação verbal — basta adicionar SẼ antes do verbo"],
            ["<b>Có...không?</b> serve para qualquer pergunta sim/não", "Estrutura universal — funciona com verbos E adjetivos"],
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
            ["8", "Negar LÀ → <b>KHÔNG PHẢI LÀ</b>", '<span class="wrong">Tôi không là giáo viên</span>', '<span class="correct">Tôi không phải là giáo viên</span>'],
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
            ["<b>QUÁ</b>", "Advérbio", "Demais! (exclamação, após adj.)", "Đẹp quá! = Lindo demais!"],
            ["<b>LẮM</b>", "Advérbio", "Muito! (intensificador, após adj.)", "Ngon lắm! = Muito gostoso!"],
            ["<b>VÂNG</b>", "Confirmação", "Sim (formal/respeitoso)", "Vâng! — com quem é mais velho"],
            ["<b>CÓ</b>", "Verbo/Resposta", "Ter / Sim (neutro)", "Có nhà không? · Có! = Tem? · Tem!"],
            ["<b>ĐÂY</b>", "Demonstrativo", "Aqui / Este (antes do verbo)", "Đây là nhà tôi"],
            ["<b>NÀY</b>", "Demonstrativo", "Este/Esta (após substantivo)", "Nhà này = Esta casa"],
          ]}
        />
        <div className="note" style={{ marginTop: 10 }}>
          💡 <b>VÂNG vs CÓ:</b> ambos significam "sim", mas VÂNG é mais formal e respeitoso — use com pessoas mais velhas. CÓ é neutro e resposta direta de CÓ...KHÔNG? · <b>ĐÂY vs NÀY:</b> ambos significam "este/esta", mas ĐÂY vem <i>antes</i> do verbo ("Đây là...") e NÀY vem <i>após</i> o substantivo ("Nhà này").
        </div>
      </RuleCard>
    </div>
  );
}
