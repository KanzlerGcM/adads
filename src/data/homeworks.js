// ─────────────────────────────────────────────────────────────────────────────
// homeworks.js — all homework assignments
// Each entry has:
//   id, title, titlePt, date (ISO), status ("pending" | "submitted"),
//   palavrasNovas[], partes[]
//
// Each word in palavrasNovas has:
//   vn, pt, en, categoria, exemplo
//   breakdown: array of { token, role, pt, en } — word-by-word analysis of the
//              'exemplo' sentence so the flashcard back can explain it fully.
//
// ─────────────────────────────────────────────────────────────────────────────

export const homeworks = [
  {
    id: "hw-001",
    title: "NHÀ CỦA ANH RẤT ĐẸP",
    titlePt: "A casa do senhor é muito bonita",
    date: "2026-03-18",
    status: "pending", // "pending" | "submitted"
    palavrasNovas: [
      {
        vn: "Bộ phim",
        pt: "Filme",
        en: "Movie / Film",
        categoria: "Substantivo",
        exemplo: "Bộ phim này rất tuyệt",
        breakdown: [
          { token: "Bộ phim", role: "Substantivo", pt: "filme",    en: "movie" },
          { token: "này",     role: "Demonstrativo", pt: "este",   en: "this" },
          { token: "rất",     role: "Advérbio", pt: "muito",       en: "very" },
          { token: "tuyệt",   role: "Adjetivo", pt: "ótimo/incrível", en: "great" },
        ],
        gramNote: "Adjetivos vêm DEPOIS do substantivo em vietnamita. 'Este filme incrível' → bộ phim này tuyệt (sem verbo ser!).",
      },
      {
        vn: "Bút",
        pt: "Caneta / Lápis",
        en: "Pen / Pencil",
        categoria: "Substantivo",
        exemplo: "Cái bút của tôi",
        breakdown: [
          { token: "Cái",  role: "Classificador", pt: "classificador (objetos)", en: "classifier (objects)" },
          { token: "bút",  role: "Substantivo",   pt: "caneta/lápis",           en: "pen/pencil" },
          { token: "của",  role: "Partícula",      pt: "de (posse)",             en: "of / belonging to" },
          { token: "tôi",  role: "Pronome",        pt: "eu/meu",                 en: "I / my" },
        ],
        gramNote: "CLASSIFICADOR + substantivo: em vietnamita, para referenciar um objeto específico você coloca o classificador antes. Para caneta/cadeira/mesa → CÁI. Para animais → CON. Para livros → QUYỂN.",
      },
      {
        vn: "Cái",
        pt: "Classificador (objetos inanimados)",
        en: "Classifier (inanimate objects)",
        categoria: "Classificador",
        exemplo: "Cái ghế này rất đẹp",
        breakdown: [
          { token: "Cái",  role: "Classificador", pt: "classificador (objetos)", en: "classifier" },
          { token: "ghế",  role: "Substantivo",   pt: "cadeira",                 en: "chair" },
          { token: "này",  role: "Demonstrativo", pt: "esta",                   en: "this" },
          { token: "rất",  role: "Advérbio",      pt: "muito",                  en: "very" },
          { token: "đẹp",  role: "Adjetivo",      pt: "bonito(a)",               en: "beautiful" },
        ],
        gramNote: "CÁI é o classificador genérico para a maioria dos objetos inanimados. Exemplos: cái bàn (mesa), cái ghế (cadeira), cái bút (caneta), cái điện thoại (celular).",
      },
      {
        vn: "Con",
        pt: "Classificador (animais)",
        en: "Classifier (animals)",
        categoria: "Classificador",
        exemplo: "Con mèo kia rất đẹp",
        breakdown: [
          { token: "Con",  role: "Classificador", pt: "classificador (animais)", en: "classifier (animals)" },
          { token: "mèo",  role: "Substantivo",   pt: "gato",                    en: "cat" },
          { token: "kia",  role: "Demonstrativo", pt: "aquele",                  en: "that (far)" },
          { token: "rất",  role: "Advérbio",      pt: "muito",                   en: "very" },
          { token: "đẹp",  role: "Adjetivo",      pt: "bonito(a)",                en: "beautiful" },
        ],
        gramNote: "CON é usado para animais: con mèo (gato), con chó (cachorro), con bò (vaca), con gà (galinha). Também para alguns objetos longos como con dao (faca) e con đường (estrada).",
      },
      {
        vn: "Ghế",
        pt: "Cadeira",
        en: "Chair",
        categoria: "Substantivo",
        exemplo: "Cái ghế này rất đẹp",
        breakdown: [
          { token: "Cái",  role: "Classificador", pt: "classificador (objetos)", en: "classifier" },
          { token: "ghế",  role: "Substantivo",   pt: "cadeira",                 en: "chair" },
          { token: "này",  role: "Demonstrativo", pt: "esta",                   en: "this" },
          { token: "rất",  role: "Advérbio",      pt: "muito",                  en: "very" },
          { token: "đẹp",  role: "Adjetivo",      pt: "bonito(a)",               en: "beautiful" },
        ],
        gramNote: "Estrutura para descrever objeto: CLASSIFICADOR + objeto + demonstrativo + rất + adjetivo. Nunca há verbo 'ser' explícito com adjetivos.",
      },
      {
        vn: "Hay",
        pt: "Bom / Interessante (livros e filmes)",
        en: "Good / Interesting (books & films)",
        categoria: "Adjetivo",
        exemplo: "Sách này rất hay",
        breakdown: [
          { token: "Sách", role: "Substantivo",   pt: "livro",    en: "book" },
          { token: "này",  role: "Demonstrativo", pt: "este",     en: "this" },
          { token: "rất",  role: "Advérbio",      pt: "muito",    en: "very" },
          { token: "hay",  role: "Adjetivo",      pt: "bom/interessante (livros, filmes)", en: "good/interesting (books, films)" },
        ],
        gramNote: "HAY ≠ ĐẸP. Use ĐẸP para visual (bonito para os olhos), HAY para conteúdo (bom, interessante). Livros, filmes e músicas usam HAY.",
      },
      {
        vn: "Linh",
        pt: "Zero intermediário em números compostos",
        en: "Zero filler in compound numbers",
        categoria: "Número",
        exemplo: "Bảy trăm linh tám",
        breakdown: [
          { token: "Bảy",  role: "Número", pt: "sete",     en: "seven" },
          { token: "trăm", role: "Número", pt: "cem",      en: "hundred" },
          { token: "linh", role: "Número", pt: "e zero (preenche a dezena vazia)", en: "zero filler" },
          { token: "tám",  role: "Número", pt: "oito",     en: "eight" },
        ],
        gramNote: "LINH aparece quando a dezena é zero: 708 → bảy trăm LINH tám. Se a dezena >0, não usa linh: 715 → bảy trăm mười lăm.",
      },
      {
        vn: "Mèo",
        pt: "Gato",
        en: "Cat",
        categoria: "Substantivo",
        exemplo: "Con mèo kia rất đẹp",
        breakdown: [
          { token: "Con",  role: "Classificador", pt: "classificador (animais)", en: "classifier (animals)" },
          { token: "mèo",  role: "Substantivo",   pt: "gato",                    en: "cat" },
          { token: "kia",  role: "Demonstrativo", pt: "aquele",                  en: "that (far)" },
          { token: "rất",  role: "Advérbio",      pt: "muito",                   en: "very" },
          { token: "đẹp",  role: "Adjetivo",      pt: "bonito(a)",                en: "beautiful" },
        ],
        gramNote: "KIA = aquele/aquela (longe). NÀY = este/esta (perto). Ambos vêm DEPOIS do substantivo.",
      },
      {
        vn: "Món ăn",
        pt: "Prato / Comida",
        en: "Dish / Food",
        categoria: "Substantivo",
        exemplo: "Món ăn này rất ngon",
        breakdown: [
          { token: "Món ăn", role: "Substantivo",   pt: "prato/comida",  en: "dish/food" },
          { token: "này",    role: "Demonstrativo", pt: "este",          en: "this" },
          { token: "rất",    role: "Advérbio",      pt: "muito",         en: "very" },
          { token: "ngon",   role: "Adjetivo",      pt: "gostoso/delicioso", en: "delicious" },
        ],
        gramNote: "MÓN é outro classificador (para pratos/porções). ĂN = comer. MÓN ĂN literalmente = 'item de comer' → prato. Padrão: substantivo + này/kia + rất + adjetivo.",
      },
      {
        vn: "Ngôi",
        pt: "Classificador (casas e edifícios)",
        en: "Classifier (houses / buildings)",
        categoria: "Classificador",
        exemplo: "Ngôi nhà kia rất rộng",
        breakdown: [
          { token: "Ngôi", role: "Classificador", pt: "classificador (casas/edifícios)", en: "classifier (buildings)" },
          { token: "nhà",  role: "Substantivo",   pt: "casa",                            en: "house" },
          { token: "kia",  role: "Demonstrativo", pt: "aquela",                          en: "that (far)" },
          { token: "rất",  role: "Advérbio",      pt: "muito",                           en: "very" },
          { token: "rộng", role: "Adjetivo",      pt: "espaçoso/grande",                 en: "spacious/wide" },
        ],
        gramNote: "NGÔI é o classificador para casas e edifícios: ngôi nhà (casa), ngôi trường (escola), ngôi chùa (templo). Não confunda com NGÀY (dia).",
      },
      {
        vn: "Quả",
        pt: "Classificador (frutas)",
        en: "Classifier (fruits)",
        categoria: "Classificador",
        exemplo: "Quả táo này rất ngon",
        breakdown: [
          { token: "Quả",  role: "Classificador", pt: "classificador (frutas)",  en: "classifier (fruits)" },
          { token: "táo",  role: "Substantivo",   pt: "maçã",                    en: "apple" },
          { token: "này",  role: "Demonstrativo", pt: "esta",                    en: "this" },
          { token: "rất",  role: "Advérbio",      pt: "muito",                   en: "very" },
          { token: "ngon", role: "Adjetivo",      pt: "gostoso/delicioso",       en: "delicious" },
        ],
        gramNote: "QUẢ / TRÁI são os classificadores para frutas: quả táo (maçã), quả cam (laranja), quả chuối (banana). Às vezes QUẢ também é usado como prefixo do nome da fruta.",
      },
      {
        vn: "Quyển",
        pt: "Classificador (livros)",
        en: "Classifier (books)",
        categoria: "Classificador",
        exemplo: "Một quyển sách rất hay",
        breakdown: [
          { token: "Một",    role: "Número",        pt: "um",           en: "one" },
          { token: "quyển",  role: "Classificador", pt: "classificador (livros/cadernos)", en: "classifier (books)" },
          { token: "sách",   role: "Substantivo",   pt: "livro",        en: "book" },
          { token: "rất",    role: "Advérbio",      pt: "muito",        en: "very" },
          { token: "hay",    role: "Adjetivo",      pt: "bom/interessante", en: "good/interesting" },
        ],
        gramNote: "QUYỂN para livros e cadernos: một quyển sách (um livro), một quyển vở (um caderno). NÚMERO + CLASSIFICADOR + SUBSTANTIVO é a ordem padrão em vietnamita.",
      },
      {
        vn: "Táo",
        pt: "Maçã",
        en: "Apple",
        categoria: "Substantivo",
        exemplo: "Quả táo này rất ngon",
        breakdown: [
          { token: "Quả",  role: "Classificador", pt: "classificador (frutas)",  en: "classifier (fruits)" },
          { token: "táo",  role: "Substantivo",   pt: "maçã",                    en: "apple" },
          { token: "này",  role: "Demonstrativo", pt: "esta",                    en: "this" },
          { token: "rất",  role: "Advérbio",      pt: "muito",                   en: "very" },
          { token: "ngon", role: "Adjetivo",      pt: "gostoso/delicioso",       en: "delicious" },
        ],
        gramNote: "TÁO = maçã. Fruta + classificador: quả táo. Em Tom = táo đỏ (maçã vermelha), táo xanh (maçã verde). Adjetivo de cor também vem depois do substantivo.",
      },
    ],
    partes: [
      {
        num: "I",
        icon: "✏️",
        titlePt: "Preencha com a palavra correta",
        titleEn: "Fill in the blanks with the correct word",
        type: "fill",
        wordBank: ["bận", "mời", "mua", "rộng", "tuyệt", "phòng ngủ"],
        items: [
          { sentence: "Ngày mai tôi rất ______.", pt: "Amanhã estarei muito ______." },
          { sentence: "Tôi muốn ______ anh đến nhà tôi.", pt: "Eu quero ______ o senhor à minha casa." },
          { sentence: "Nhà của anh rất ______ và đẹp.", pt: "A casa do senhor é muito ______ e bonita." },
          { sentence: "Đây là ______ của tôi.", pt: "Este/Esta é o/a meu/minha ______." },
          { sentence: "Tôi sẽ ______ một bức tranh mới.", pt: "Vou ______ um quadro novo." },
          { sentence: "Bộ phim này rất ______.", pt: "Este filme é muito ______.", note: "Bộ phim = Filme" },
        ],
      },
      {
        num: "II",
        icon: "🔄",
        titlePt: "Reescreva as frases na forma negativa",
        titleEn: "Rewrite the sentences in the negative form",
        type: "negative",
        tip: { pt: "Para negar adjetivos, use KHÔNG antes do adjetivo. Para negar LÀ, use KHÔNG PHẢI LÀ.", en: "To negate adjectives, add KHÔNG before the adjective. To negate LÀ, use KHÔNG PHẢI LÀ." },
        items: [
          { sentence: "Ngôi nhà kia rất rộng.", pt: "Aquela casa é muito espaçosa." },
          { sentence: "Món ăn này rất ngon.", pt: "Este prato é muito gostoso." },
          { sentence: "Sách này rất hay.", pt: "Este livro é muito bom.", note: "Hay = Bom, usado para livros e filmes" },
          { sentence: "Bức tranh này đẹp.", pt: "Este quadro é bonito." },
          { sentence: "Ngày mai anh Tom rất bận.", pt: "Amanhã o Tom estará muito ocupado." },
        ],
      },
      {
        num: "III",
        icon: "🔢",
        titlePt: "Escreva o número ou como se diz",
        titleEn: "Write the number or how to say it",
        type: "numbers",
        items: [
          { q: "670",                      type: "num→word" },
          { q: "Sáu mươi lăm",            type: "word→num" },
          { q: "5.000",                    type: "num→word" },
          { q: "Hai trăm năm mươi nghìn", type: "word→num" },
          { q: "Bảy trăm linh tám",       type: "word→num" },
          { q: "390",                      type: "num→word" },
        ],
      },
      {
        num: "IV",
        icon: "🖼️",
        titlePt: "Descreva as imagens usando đây / kia / này",
        titleEn: "Describe the pictures using đây / kia / này",
        type: "describe",
        example: { num: "(3)", classifier: "quyển sách", pt: "um livro", answer: "Đây là một quyển sách." },
        items: [
          { num: "(4)", classifier: "cái bút",  pt: "uma caneta" },
          { num: "(5)", classifier: "cái ghế",  pt: "uma cadeira" },
          { num: "(6)", classifier: "con mèo",  pt: "um gato" },
          { num: "(7)", classifier: "nhà",      pt: "minha casa", note: "Escreva: Esta é a minha casa" },
          { num: "(8)", classifier: "quả táo",  pt: "uma maçã" },
        ],
      },
    ],
  },
];

// ── helpers ──────────────────────────────────────────────────────────────────
export function getHomeworkStatus(hw) {
  const stored = JSON.parse(localStorage.getItem("vn_hw_status") || "{}");
  return stored[hw.id] ?? hw.status;
}

export function setHomeworkStatus(hwId, status) {
  const stored = JSON.parse(localStorage.getItem("vn_hw_status") || "{}");
  stored[hwId] = status;
  localStorage.setItem("vn_hw_status", JSON.stringify(stored));
}

export function isDue(dateStr) {
  // returns true if the homework date is today or in the past
  return new Date(dateStr + "T23:59:59") <= new Date();
}

export function formatDate(dateStr, lang = "pt") {
  const d = new Date(dateStr + "T12:00:00");
  if (lang === "en") return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return d.toLocaleDateString("pt-BR", { year: "numeric", month: "long", day: "numeric" });
}
