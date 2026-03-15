import { useState, useRef, useEffect } from "react";
import { useLang } from "../contexts/LangContext";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `Você é o tutor de Vietnamita do Norte integrado a um aplicativo de estudos pessoal. Conheça TUDO sobre o estudante e o material dele:

═══ PERFIL DO ESTUDANTE ═══
- Fala Português Brasileiro nativamente. Também entende Inglês.
- Está aprendendo Vietnamita do NORTE (sotaque de Hanói) do zero.
- Usa este app para estudar: tem abas de Tons, Alfabeto, Gramática, Números, Frases, Vocabulário, Flashcards, Quiz e Montar Frase.
- Nível: iniciante avançando para básico.

═══ REGRAS DO TUTOR ═══
- Responda SEMPRE na língua que o usuario usou na pergunta (PT-BR por padrão, EN se perguntado em inglês).
- SEMPRE use tons corretos nas palavras vietnamitas (ex: "bạn", nunca "ban").
- Foque no dialeto do NORTE (Hanói) em tudo que disser sobre pronúncia.
- Seja conciso, didático, encorajador. Use emojis com moderação.
- Quando der exemplos, prefira palavras que o estudante já conhece (listadas abaixo).
- Compare pronúncias com o Português Brasileiro quando útil.
- Se o estudante errar algo, corrija gentilmente e explique o porquê.

═══ OS 6 TONS (VIETNAMITA DO NORTE) ═══
1. Ngang (sem marca) — ex: "ma" — tom plano médio, voz normal
2. Sắc (´) — ex: "má" — sobe alto, voz sobe com energia
3. Huyền (grave) — ex: "mà" — desce suave e longo, voz cai devagar
4. Hỏi (̉) — ex: "mả" — sobe depois desce (curva em U), no Norte tem quebra/glotalização
5. Ngã (˜) — ex: "mã" — ondulado com quebra/glotalização no meio (distinto do Hỏi no Norte!)
6. Nặng (.) — ex: "mạ" — cai bruscamente e curto, voz cai forte
ATENÇÃO: No Norte, Ngã e Hỏi são DISTINTOS (diferente do Sul onde se fundem).

═══ PRONÚNCIA DO NORTE (HANÓI) — CONSOANTES ESPECIAIS ═══
- D → soa como "Z" (ex: "da" = "za")
- GI → soa como "Z" (ex: "gia đình" = "zia dinh")
- R → soa como "Z" (ex: "rau" = "zau")
- TR → soa como "CH" (ex: "trăm" = "chăm")
- X → soa como "S" (ex: "xe" = "se")
- S → soa como "S"
- KH → som gutural suave, como "kh" em khaki
- NH → como "nh" em "ninho" (português)
- NG inicial → nasal velar, como no final de "manga"
- PH → soa como "F"
- TH → "t" fortemente aspirado

═══ VOGAIS ESPECIAIS ═══
- Ă → "a" muito curto e fechado (diferente de A longo)
- Â → "ă" mais fechado ainda
- Ê → "ê" fechado como em "mês"
- Ô → "ô" fechado como em "ônibus"
- Ơ → som entre "o" e "ơ", sem equivalente em PT, como "er" britânico
- Ư → "u" sem arredondar os lábios

═══ GRAMÁTICA — 9 REGRAS QUE O ESTUDANTE APRENDEU ═══
1. SER/ESTAR com LÀ: "Tôi là giáo viên" (Eu sou professor) — LÀ nunca muda, não há conjugação.
2. POSSE com CỦA: "Sách của tôi" (O livro de mim = Meu livro) — CỦA = "de" possessivo, APÓS o substantivo.
3. ADJETIVOS após substantivo: "Nhà đẹp" (Casa bonita) — adjetivo SEMPRE depois.
4. PERGUNTA SIM/NÃO com CÓ...KHÔNG: "Anh có bận không?" (Você está ocupado?) — estrutura fixa.
5. FUTURO com SẼ (antes do verbo): "Tôi sẽ đến" (Eu vou vir).
6. DEMONSTRATIVOS após substantivo: "Sách này" (Este livro), "Nhà kia" (Aquela casa).
7. PERGUNTAR O QUÊ com GÌ (no final): "Bạn tên là gì?" (Seu nome é o quê?).
8. PERGUNTAR QUAL com NÀO (no final): "Bạn là người nước nào?" (Você é de qual país?).
9. PRONOMES: Tôi (eu/neutro), Anh (você/homem mais velho), Chị (você/mulher mais velha), Bạn (você/mesma idade), Em (eu/com mais velhos), Cháu (eu/com avós-tios).

═══ VOCABULÁRIO COMPLETO QUE O ESTUDANTE ESTÁ ESTUDANDO (83 palavras) ═══
PRONOMES/TRATAMENTO: Tôi (eu-neutro), Anh (irmão mais velho/você-homem), Chị (irmã mais velha), Bạn (você-mesma idade/amigo), Em (eu-com-mais-velhos/irmão-mais-novo), Cháu (eu-com-avós), Ông (avô/senhor), Bà (avó/senhora), Bác (tio-tia-mais-velhos), Chú (tio-irmão-pai), Cô (tia-irmã-pai), Cậu (tio-irmão-mãe)
VERBOS: Là (ser/estar), Có (ter/haver), Ăn (comer), Đi (ir), Đến (vir/chegar), Đến từ (vir de), Muốn (querer), Mua (comprar), Ở (estar em/morar), Mời (convidar/por favor-formal)
ADJETIVOS: Đẹp (bonito), Khoẻ (saudável/bem), Bận (ocupado), Ngon (delicioso), Rộng (espaçoso), Mới (novo), Vui (feliz), Tuyệt (ótimo/fantástico)
ADVÉRBIOS/PARTÍCULAS: Rất (muito), Không (não/partícula-pergunta), Sẽ (futuro), Của (posse), Còn (e você/ainda), Gì (o quê), Nào (qual)
SUBSTANTIVOS: Nhà (casa), Sách (livro), Tên (nome), Người (pessoa), Phở (prato típico), Điện thoại (celular), Bức tranh (quadro), Phòng khách (sala), Phòng ngủ (quarto), Khăn (toalha)
NÚMEROS: Một (1-base), Hai (2), Ba (3), Bốn (4), Năm (5-base), Lăm (5-compostos), Sáu (6), Bảy (7), Tám (8), Chín (9), Mười (10), Mốt (1 em compostos), Tư (4 em compostos), Trăm (100), Nghìn (1.000), Triệu (1.000.000), Tỷ (1.000.000.000)
SAUDAÇÕES/EXPRESSÕES: Xin chào (olá formal), Chào (oi/olá), Cảm ơn (obrigado), Vâng (sim-formal), À (ah-surpresa), Ồ (oh-surpresa), Ngày mai (amanhã)
PAÍSES/NOMES: Việt Nam (Vietnã), Mỹ (EUA), Đức (Alemanha), Trung Quốc (China), Thái Lan (Tailândia), Bố (pai), Mẹ (mãe)
DEMONSTRATIVOS: Đây (aqui/este-antes-verbo), Này (este-após-substantivo), Kia (aquele-longe)

═══ FRASES QUE O ESTUDANTE APRENDEU ═══
Saudações: Xin chào! / Chào anh/chị/bạn! / Anh/Chị/Bạn có khỏe không? / Tôi rất khỏe, cảm ơn! / Còn anh/chị? / Tạm biệt! / Hẹn gặp lại!
Apresentações: Tôi tên là... / Bạn tên là gì? / Tôi đến từ... / Bạn là người nước nào? / Rất vui được gặp bạn!
Restaurante: Cho tôi... / Cái này là gì? / Ngon quá! / Bao nhiêu tiền? / Tính tiền!
Compras: Cái này bao nhiêu? / Đắt quá! / Rẻ hơn được không? / Tôi sẽ mua cái này.
Direções: ...ở đâu? / Rẽ trái/phải / Đi thẳng / Gần/Xa lắm không?
Emergências: Cứu tôi! / Gọi cảnh sát! / Tôi bị lạc. / Bệnh viện ở đâu?

═══ NÚMEROS — REGRAS ESPECIAIS ═══
- 21 = hai mươi MỐT (não "một"), 24 = hai mươi TƯ (não "bốn"), 25 = hai mươi LĂM (não "năm")
- 100 = một trăm, 105 = một trăm LINH năm (LINH para dezenas < 10 após centenas)
- 1.000 = một nghìn, 1.000.000 = một triệu, 1.000.000.000 = một tỷ
- Vietnamita do Norte usa "nghìn" (mil) — vietnamita do Sul usa "ngàn"

═══ EXERCÍCIOS QUE O APP TEM ═══
O app tem: Flashcards (virar carta VN↔PT), Quiz (múltipla escolha), Montar Frase (colocar tokens na ordem).
Se o estudante pedir exercício oral/escrito, crie para ele baseado no vocabulário acima.
Exemplos de exercício que você pode criar:
- Traduzir frase
- Completar frase com a palavra correta
- Explicar a diferença entre dois tons
- Criar uma frase usando X palavras
- Perguntar/responder como uma conversa vietnamita

═══ O QUE NÃO ENSINAR ═══
- Pronúncia do Sul (HCMC) como padrão — sempre Norte primeiro
- Caracteres chineses (chữ Nôm) — não é foco
- Gramática avançada que vai além do nível básico do estudante

Você conhece TUDO que está neste app. Seja o melhor tutor de vietnamita possível para este estudante específico.`;


const LABELS = {
  pt: {
    title: "Tutor IA — Vietnamita",
    subtitle: "Pergunte qualquer coisa sobre vietnamita!",
    placeholder: "Pergunte sobre gramática, tons, vocabulário...",
    send: "Enviar",
    thinking: "Pensando...",
    noKey: "Configure sua chave da API do Gemini",
    noKeyDesc: "Para usar o tutor, você precisa de uma chave gratuita.",
    noKeyStep1: "1. Acesse",
    noKeyStep2: "e crie uma chave gratuita",
    noKeyStep3: "2. Abra o arquivo",
    noKeyStep4: "na raiz do projeto",
    noKeyStep5: "3. Cole sua chave:",
    noKeyStep6: "4. Recarregue a página",
    saveKey: "Salvar chave",
    keyPlaceholder: "Cole sua chave Gemini aqui...",
    keyHint: "Sua chave fica só no seu navegador (localStorage), nunca é enviada a nenhum servidor além do Gemini.",
    clear: "Limpar",
    errorMsg: "Erro ao contatar a API. Verifique sua chave e tente novamente.",
    welcome: "Olá! Sou seu tutor de Vietnamita do Norte. Pode me perguntar sobre tons, pronúncia, gramática, vocabulário — qualquer coisa! 🇻🇳",
    free: "Gratuito • Gemini Flash",
  },
  en: {
    title: "AI Tutor — Vietnamese",
    subtitle: "Ask anything about Vietnamese!",
    placeholder: "Ask about grammar, tones, vocabulary...",
    send: "Send",
    thinking: "Thinking...",
    noKey: "Set up your Gemini API key",
    noKeyDesc: "To use the tutor, you need a free API key.",
    noKeyStep1: "1. Go to",
    noKeyStep2: "and create a free key",
    noKeyStep3: "2. Open the file",
    noKeyStep4: "in the project root",
    noKeyStep5: "3. Paste your key:",
    noKeyStep6: "4. Reload the page",
    saveKey: "Save key",
    keyPlaceholder: "Paste your Gemini key here...",
    keyHint: "Your key is only stored in your browser (localStorage), never sent anywhere except Gemini.",
    clear: "Clear",
    errorMsg: "Error contacting the API. Check your key and try again.",
    welcome: "Hello! I'm your Northern Vietnamese tutor. Ask me anything about tones, pronunciation, grammar, vocabulary — anything! 🇻🇳",
    free: "Free • Gemini Flash",
  },
};

function getStoredKey() {
  return localStorage.getItem("gemini_api_key") || "";
}

export default function GeminiChat() {
  const { lang } = useLang();
  const L = LABELS[lang] || LABELS.pt;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "model", text: L.welcome },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState(() => API_KEY || getStoredKey());
  const [keyInput, setKeyInput] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Update welcome message when lang changes
  useEffect(() => {
    setMessages([{ role: "model", text: LABELS[lang]?.welcome || LABELS.pt.welcome }]);
  }, [lang]);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, messages]);

  const effectiveKey = API_KEY || apiKey;
  const hasKey = !!effectiveKey && effectiveKey.trim() !== "";

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading || !hasKey) return;

    setInput("");
    setError(null);
    const newMessages = [...messages, { role: "user", text }];
    setMessages(newMessages);
    setLoading(true);

    try {
      // Build conversation history for context (exclude welcome message)
      const history = newMessages.slice(1, -1).map(m => ({
        role: m.role === "model" ? "model" : "user",
        parts: [{ text: m.text }],
      }));

      const body = {
        system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents: [
          ...history,
          { role: "user", parts: [{ text }] },
        ],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
      };

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(effectiveKey.trim())}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson?.error?.message || `HTTP ${res.status}`);
      }

      const json = await res.json();
      const reply = json?.candidates?.[0]?.content?.parts?.[0]?.text || "...";
      setMessages(prev => [...prev, { role: "model", text: reply }]);
    } catch (e) {
      setError(L.errorMsg + (e?.message ? ` (${e.message})` : ""));
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function saveKey() {
    const k = keyInput.trim();
    if (!k) return;
    localStorage.setItem("gemini_api_key", k);
    setApiKey(k);
    setKeyInput("");
  }

  function clearChat() {
    setMessages([{ role: "model", text: L.welcome }]);
    setError(null);
  }

  return (
    <>
      {/* Floating button */}
      <button
        className={`chat-fab ${open ? "chat-fab-open" : ""}`}
        onClick={() => setOpen(o => !o)}
        title={L.title}
        aria-label={L.title}
      >
        {open ? "✕" : "🤖"}
        {!open && !hasKey && <span className="chat-fab-dot" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="chat-panel">
          <div className="chat-header">
            <div className="chat-header-left">
              <span className="chat-header-icon">🤖</span>
              <div>
                <div className="chat-header-title">{L.title}</div>
                <div className="chat-header-sub">{L.free}</div>
              </div>
            </div>
            <div className="chat-header-actions">
              <button className="chat-icon-btn" onClick={clearChat} title={L.clear}>🗑</button>
              <button className="chat-icon-btn" onClick={() => setOpen(false)}>✕</button>
            </div>
          </div>

          {!hasKey ? (
            <div className="chat-nokey">
              <div className="chat-nokey-title">🔑 {L.noKey}</div>
              <p className="chat-nokey-desc">{L.noKeyDesc}</p>
              <ol className="chat-nokey-steps">
                <li>
                  {L.noKeyStep1}{" "}
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer">
                    aistudio.google.com
                  </a>{" "}
                  {L.noKeyStep2}
                </li>
                <li>
                  {L.noKeyStep3} <code>.env</code> {L.noKeyStep4}
                </li>
                <li>
                  {L.noKeyStep5} <code>VITE_GEMINI_API_KEY=SUA_CHAVE</code>
                </li>
                <li>{L.noKeyStep6}</li>
              </ol>
              <p className="chat-nokey-or">— ou cole diretamente —</p>
              <div className="chat-key-input-row">
                <input
                  className="chat-key-input"
                  type="password"
                  placeholder={L.keyPlaceholder}
                  value={keyInput}
                  onChange={e => setKeyInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && saveKey()}
                />
                <button className="btn-primary" style={{ padding: "8px 14px", fontSize: "0.85rem" }} onClick={saveKey}>
                  {L.saveKey}
                </button>
              </div>
              <p className="chat-key-hint">🔒 {L.keyHint}</p>
            </div>
          ) : (
            <>
              <div className="chat-messages">
                {messages.map((m, i) => (
                  <div key={i} className={`chat-msg ${m.role === "user" ? "chat-msg-user" : "chat-msg-model"}`}>
                    {m.role === "model" && <span className="chat-msg-avatar">🤖</span>}
                    <div className="chat-msg-bubble">{m.text}</div>
                  </div>
                ))}
                {loading && (
                  <div className="chat-msg chat-msg-model">
                    <span className="chat-msg-avatar">🤖</span>
                    <div className="chat-msg-bubble chat-typing">
                      <span /><span /><span />
                    </div>
                  </div>
                )}
                {error && (
                  <div className="chat-error">{error}</div>
                )}
                <div ref={bottomRef} />
              </div>

              <div className="chat-input-row">
                <textarea
                  ref={inputRef}
                  className="chat-input"
                  placeholder={L.placeholder}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  disabled={loading}
                />
                <button
                  className="chat-send-btn"
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                >
                  {loading ? "…" : "➤"}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
