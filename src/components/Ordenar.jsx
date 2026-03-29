import { useState, useRef } from "react";
import { CAT_COLORS } from "../data/vocabulario";
import { useLang } from "../contexts/LangContext";

/*
  Each sentence: { level, tokens, pt, en, explanation: { rule, pt, en, tips[] } }
  level 1 = easy (3-4 tokens), level 2 = medium (5-6), level 3 = hard (7+)
*/
const SENTENCES = [
  // ===== LEVEL 1 — FÁCIL (3-4 tokens) =====
  {
    level: 1,
    tokens: [
      { vn: "Tôi",      pt: "Eu",          en: "I",          cat: "Pronome"   },
      { vn: "là",       pt: "sou",         en: "am",         cat: "Verbo"     },
      { vn: "giáo viên",pt: "professor",   en: "a teacher",  cat: "Profissão" },
    ],
    pt: "Eu sou professor(a)", en: "I am a teacher",
    explanation: { rule: "S + là + Substantivo (identidade)", pt: "'Là' é o único verbo 'ser' do vietnamita — invariável para todas as pessoas e tempos. NUNCA use 'là' antes de adjetivos: 'Tôi bận' ✓, 'Tôi là bận' ✗. Use 'là' apenas para identidade (profissão, nome, origem).", en: "'Là' is the only 'to be' verb in Vietnamese — invariable for all persons and tenses. NEVER use 'là' before adjectives: 'Tôi bận' ✓, 'Tôi là bận' ✗. Use 'là' only for identity (profession, name, origin).", tips: ["Tôi = eu (pronome neutro, mesma idade)", "là = ser (invariável — nunca conjuga!)", "giáo viên = professor(a)"] },
  },
  {
    level: 1,
    tokens: [
      { vn: "Tôi",    pt: "Eu",       en: "I",      cat: "Pronome"  },
      { vn: "rất",    pt: "muito",    en: "very",   cat: "Advérbio" },
      { vn: "vui",    pt: "feliz",    en: "happy",  cat: "Adjetivo" },
    ],
    pt: "Estou muito feliz", en: "I am very happy",
    explanation: { rule: "S + rất + Adjetivo (estado)", pt: "'Rất' = muito. Vem ANTES do adjetivo, ao contrário do português onde 'muito' pode ir depois. SEM 'là' antes do adjetivo — esse é um erro clássico! 'Tôi là vui' está ERRADO. 'Rất' é neutro; 'quá' (depois do adj) é mais exclamativo.", en: "'Rất' = very. Comes BEFORE the adjective, unlike Portuguese where 'muito' can come after. NO 'là' before adjectives — that's a classic mistake! 'Tôi là vui' is WRONG. 'Rất' is neutral; 'quá' (after adj) is more exclamatory.", tips: ["Tôi = eu", "rất = muito (ANTES do adj)", "vui = feliz/alegre"] },
  },
  {
    level: 1,
    tokens: [
      { vn: "Phở",    pt: "Phở",     en: "Phở",       cat: "Substantivo" },
      { vn: "rất",    pt: "é muito", en: "is very",    cat: "Advérbio"   },
      { vn: "ngon",   pt: "gostoso", en: "delicious",  cat: "Adjetivo"   },
    ],
    pt: "Phở é muito gostoso", en: "Phở is very delicious",
    explanation: { rule: "Subst + [rất] + Adjetivo (descrição sem 'ser')", pt: "Em vietnamita não precisa de verbo 'é' para descrever: 'Phở ngon' = 'Phở é gostoso'. O adjetivo vem APÓS o substantivo/sujeito. 'Ngon' = adjetivo de sabor (só para comida; para obras use 'hay', para aparência 'đẹp').", en: "Vietnamese doesn't need an 'is' verb for descriptions: 'Phở ngon' = 'Phở is delicious'. The adjective comes AFTER the subject. 'Ngon' = flavor adjective (only for food; for works use 'hay', for appearance 'đẹp').", tips: ["Phở = prato típico do Norte do Vietnã", "rất = muito (opcional mas comum)", "ngon = gostoso (SOMENTE para comida)"] },
  },
  {
    level: 1,
    tokens: [
      { vn: "Tôi",    pt: "Eu",    en: "I",      cat: "Pronome"  },
      { vn: "sẽ",     pt: "vou",   en: "will",   cat: "Partícula"},
      { vn: "đến",    pt: "vir",   en: "come",   cat: "Verbo"    },
    ],
    pt: "Eu vou vir", en: "I will come",
    explanation: { rule: "S + sẽ + Verbo (futuro)", pt: "'Sẽ' é o marcador de FUTURO. Posição: ANTES do verbo. O verbo nunca muda de forma. Sistema de marcadores de tempo: 'đã' (passado), sem marcador (presente/habitual), 'đang' (contínuo), 'sẽ' (futuro). Só um marcador por vez.", en: "'Sẽ' is the FUTURE marker. Position: BEFORE the verb. The verb never changes form. Tense markers: 'đã' (past), no marker (present/habitual), 'đang' (continuous), 'sẽ' (future). Only one marker at a time.", tips: ["sẽ = vai / irá (marcador de futuro — ANTES do verbo)", "đến = vir/chegar (diferente de 'đi' = ir/afastar)"] },
  },
  {
    level: 1,
    tokens: [
      { vn: "Tôi",    pt: "Eu",          en: "I",       cat: "Pronome"    },
      { vn: "ở",      pt: "moro em / estou em", en: "live at / am at", cat: "Verbo" },
      { vn: "nhà",    pt: "casa",        en: "home",    cat: "Substantivo"},
    ],
    pt: "Estou em casa / Moro em casa", en: "I am at home / I live at home",
    explanation: { rule: "'Ở' = estar em / morar (verbo + preposição)", pt: "'Ở' funciona como verbo E preposição ao mesmo tempo. 'Tôi ở nhà' pode ser 'estou em casa' (agora) ou 'moro em casa' (geralmente) — o contexto decide. Use 'ở' antes de qualquer local: 'ở Hà Nội' (em Hanói), 'ở Việt Nam' (no Vietnã).", en: "'Ở' functions as both verb AND preposition. 'Tôi ở nhà' can be 'I'm at home' (now) or 'I live at home' (generally) — context decides. Use 'ở' before any location: 'ở Hà Nội' (in Hanoi), 'ở Việt Nam' (in Vietnam).", tips: ["ở = estar em / morar (único, sem 'em' separado)", "nhà = casa/lar"] },
  },
  {
    level: 1,
    tokens: [
      { vn: "Tôi",    pt: "Eu",      en: "I",    cat: "Pronome"  },
      { vn: "rất",    pt: "muito",   en: "very", cat: "Advérbio" },
      { vn: "bận",    pt: "ocupado", en: "busy", cat: "Adjetivo" },
    ],
    pt: "Estou muito ocupado(a)", en: "I am very busy",
    explanation: { rule: "S + rất + Adj — negação com 'không'", pt: "Para negar: 'Tôi không bận' (não estou ocupado). Para perguntar: 'Anh có bận không?' — a estrutura 'Có [adj/verbo] không?' cria qualquer pergunta sim/não. Resposta: 'Có' (sim, estou) ou 'Không' (não, não estou).", en: "To negate: 'Tôi không bận' (I'm not busy). To ask: 'Anh có bận không?' — the structure 'Có [adj/verb] không?' creates any yes/no question. Answer: 'Có' (yes, I am) or 'Không' (no, I'm not).", tips: ["rất bận = muito ocupado", "Negação: không bận", "Pergunta: Có bận không?"] },
  },
  {
    level: 1,
    tokens: [
      { vn: "Nhà",    pt: "A casa", en: "The house",  cat: "Substantivo" },
      { vn: "này",    pt: "esta",   en: "this",       cat: "Demonstrativo"},
      { vn: "đẹp",    pt: "é bonita","en": "is beautiful", cat: "Adjetivo"},
      { vn: "quá",    pt: "demais!", en: "so much!",  cat: "Advérbio"    },
    ],
    pt: "Que casa linda! / Esta casa é linda demais!", en: "What a beautiful house! / This house is so beautiful!",
    explanation: { rule: "Subst + này (este/a) + Adj + quá! (exclamação)", pt: "Dois pontos essenciais: (1) 'Này' vem APÓS o substantivo: 'nhà này' = esta casa (nunca 'này nhà'). (2) 'Quá' após adjetivo cria exclamação: 'đẹp quá!' = que lindo! Compare intensificadores: 'rất' (antes, neutro) vs 'quá' (depois, exclamativo) vs 'lắm' (depois, superlativo).", en: "Two essential points: (1) 'Này' comes AFTER the noun: 'nhà này' = this house (never 'này nhà'). (2) 'Quá' after adjective creates exclamation: 'đẹp quá!' = how beautiful! Compare: 'rất' (before, neutral) vs 'quá' (after, exclamatory) vs 'lắm' (after, superlative).", tips: ["này = este/esta — APÓS o substantivo", "đẹp = bonito(a) — APÓS o substantivo", "quá = demais! (exclamação — após adj)"] },
  },
  {
    level: 1,
    tokens: [
      { vn: "Sách",   pt: "O livro", en: "The book", cat: "Substantivo" },
      { vn: "này",    pt: "este",    en: "this",     cat: "Demonstrativo"},
      { vn: "rất",    pt: "é muito", en: "is very",  cat: "Advérbio"    },
      { vn: "hay",    pt: "bom",     en: "good",     cat: "Adjetivo"    },
    ],
    pt: "Este livro é muito bom", en: "This book is very good",
    explanation: { rule: "'Hay' = bom apenas para OBRAS culturais", pt: "'Hay' é adjetivo ESPECÍFICO para livros, filmes, músicas, histórias. Não use para pessoas ('tốt' = bom/bondoso) nem para comida ('ngon'). 'Sách hay' (livro interessante), 'phim hay' (filme bom), 'bài hát hay' (música boa). O demonstrativo 'này' vem sempre após o substantivo.", en: "'Hay' is a SPECIFIC adjective for books, films, music, stories. Don't use for people ('tốt' = good/kind) or food ('ngon'). 'Sách hay' (interesting book), 'phim hay' (good film), 'bài hát hay' (good song). Demonstrative 'này' always comes after the noun.", tips: ["hay = bom/interessante SOMENTE para obras (livros, filmes, músicas)", "Compare: ngon (comida) · đẹp (aparência) · tốt (pessoa)"] },
  },
  {
    level: 1,
    tokens: [
      { vn: "Tôi",    pt: "Eu",    en: "I",    cat: "Pronome"    },
      { vn: "muốn",   pt: "quero", en: "want", cat: "Verbo"      },
      { vn: "ăn",     pt: "comer", en: "eat",  cat: "Verbo"      },
      { vn: "phở",    pt: "phở",   en: "phở",  cat: "Substantivo"},
    ],
    pt: "Eu quero comer phở", en: "I want to eat phở",
    explanation: { rule: "S + muốn + Verbo (sem 'de' ou 'para')", pt: "'Muốn' (querer) precede o próximo verbo DIRETAMENTE, sem preposição: 'muốn ăn' = querer comer. Em português dizemos 'quero DE comer' ou 'quero comer' — em vietnamita é sempre direto: Pronome + muốn + V + [objeto]. Outros modais iguais: 'có thể' (poder), 'cần' (precisar).", en: "'Muốn' (to want) precedes the next verb DIRECTLY, without preposition: 'muốn ăn' = want to eat. In Portuguese we say 'quero DE comer' or 'quero comer' — in Vietnamese it's always direct: Pronoun + muốn + V + [object]. Other modals work the same: 'có thể' (can), 'cần' (need).", tips: ["muốn = querer (modal — direto antes do verbo)", "ăn = comer (invariável)", "phở = sopa vietnamita famosa do Norte"] },
  },
  {
    level: 1,
    tokens: [
      { vn: "Đây",    pt: "Esta",   en: "This",   cat: "Demonstrativo"},
      { vn: "là",     pt: "é",      en: "is",     cat: "Verbo"        },
      { vn: "nhà",    pt: "a casa", en: "the house", cat: "Substantivo"},
      { vn: "tôi",    pt: "minha",  en: "my",     cat: "Pronome"      },
    ],
    pt: "Esta é a minha casa", en: "This is my house",
    explanation: { rule: "'Đây' (aqui/este, antes de 'là') vs 'này' (este, após subst.)", pt: "Contraste crítico: 'Đây là nhà tôi' (Đây ANTES do 'là' = 'Esta é...') vs 'Nhà này đẹp' (Này APÓS o substantivo = 'Esta casa...'). 'Nhà tôi' = minha casa — posse sem 'của' quando é óbvio. 'Nhà của tôi' também correto.", en: "Critical contrast: 'Đây là nhà tôi' (Đây BEFORE 'là' = 'This is...') vs 'Nhà này đẹp' (Này AFTER noun = 'This house...'). 'Nhà tôi' = my house — possession without 'của' when obvious. 'Nhà của tôi' is also correct.", tips: ["Đây = aqui/este (ANTES de 'là')", "nhà tôi = minha casa (sem 'của' — omissão comum)"] },
  },
  {
    level: 1,
    tokens: [
      { vn: "Tôi",    pt: "Eu",      en: "I",      cat: "Pronome"  },
      { vn: "rất",    pt: "muito",   en: "very",   cat: "Advérbio" },
      { vn: "khoẻ",   pt: "bem",     en: "well",   cat: "Adjetivo" },
    ],
    pt: "Estou muito bem", en: "I am very well",
    explanation: { rule: "Saudação de resposta — S + rất + khoẻ", pt: "Resposta padrão à saudação 'Anh có khoẻ không?': 'Tôi rất khoẻ. Cảm ơn anh. Còn anh?' (Estou muito bem. Obrigado. E você?). 'Còn + pronome?' = 'E você?' — essencial para reciprocidade nas saudações vietnamitas.", en: "Standard response to 'Anh có khoẻ không?': 'Tôi rất khoẻ. Cảm ơn anh. Còn anh?' (I'm very well. Thank you. And you?). 'Còn + pronome?' = 'And you?' — essential for reciprocity in Vietnamese greetings.", tips: ["khoẻ = saudável / bem de saúde", "Saudação completa: Tôi rất khoẻ + Cảm ơn + Còn [pronome]?"] },
  },
  // ===== LEVEL 2 — MÉDIO (5-6 tokens) =====
  {
    level: 2,
    tokens: [
      { vn: "Bạn",    pt: "Você",   en: "You",   cat: "Pronome"      },
      { vn: "tên",    pt: "nome",   en: "name",  cat: "Substantivo"  },
      { vn: "là",     pt: "é",      en: "is",    cat: "Verbo"        },
      { vn: "gì",     pt: "o quê?", en: "what?", cat: "Interrogativo"},
    ],
    pt: "Qual é o seu nome?", en: "What is your name?",
    explanation: { rule: "Interrogativo 'gì' sempre no FINAL", pt: "REGRA ESSENCIAL: interrogativos vietnamitas ficam no FINAL. 'Bạn tên là gì?' = lit. 'Você nome é o quê?' — em PT diríamos 'Qual é o seu nome?' com 'qual' no início. Em VN, 'gì' SEMPRE ao final. Outros interrogativos no final: 'đâu?' (onde?), 'nào?' (qual?), 'ai?' (quem?).", en: "ESSENTIAL RULE: Vietnamese interrogatives go at the END. 'Bạn tên là gì?' = lit. 'You name is what?' — in English we'd say 'What is your name?' with 'what' at the start. In Vietnamese, 'gì' is ALWAYS at the end. Other end-of-sentence interrogatives: 'đâu?' (where?), 'nào?' (which?), 'ai?' (who?).", tips: ["gì = o quê? (SEMPRE no final)", "tên = nome", "tên là = 'nome é' — combinação fixa para apresentações"] },
  },
  {
    level: 2,
    tokens: [
      { vn: "Nhà",    pt: "A casa", en: "The house", cat: "Substantivo"},
      { vn: "của",    pt: "de",     en: "of",        cat: "Partícula" },
      { vn: "anh",    pt: "você",   en: "you",       cat: "Pronome"   },
      { vn: "rất",    pt: "muito",  en: "very",      cat: "Advérbio"  },
      { vn: "rộng",   pt: "espaçosa","en":"spacious", cat: "Adjetivo" },
    ],
    pt: "A sua casa é muito espaçosa", en: "Your house is very spacious",
    explanation: { rule: "'Của' = partícula de posse [possuído + của + possuidor]", pt: "'Của' indica posse. Ordem: o que é possuído vem PRIMEIRO, o possuidor DEPOIS: 'nhà của anh' = lit. 'casa de você' = sua casa. Pode ser omitido quando óbvio: 'nhà anh' = 'nhà của anh'. 'Rộng' (espaçoso/amplo) vem APÓS o substantivo ou o sujeito.", en: "'Của' indicates possession. Order: the possessed item comes FIRST, the possessor AFTER: 'nhà của anh' = lit. 'house of you' = your house. Can be omitted when obvious: 'nhà anh' = 'nhà của anh'. 'Rộng' (spacious/wide) comes AFTER the noun or subject.", tips: ["của = de (posse) — [possuído] + của + [possuidor]", "rộng = espaçoso/amplo (após o substantivo)", "Ordem inversa ao português: 'casa DE você' (não 'sua casa')"] },
  },
  {
    level: 2,
    tokens: [
      { vn: "Sách",   pt: "O livro", en: "The book", cat: "Substantivo"  },
      { vn: "này",    pt: "este",    en: "this",     cat: "Demonstrativo"},
      { vn: "là",     pt: "é",       en: "is",       cat: "Verbo"        },
      { vn: "của",    pt: "de",      en: "of",       cat: "Partícula"    },
      { vn: "tôi",    pt: "mim",     en: "mine",     cat: "Pronome"      },
    ],
    pt: "Este livro é meu", en: "This book is mine",
    explanation: { rule: "S + là + của + pronome (identidade de posse)", pt: "Para afirmar posse com 'là': 'Sách này là của tôi' = Este livro é meu (lit. 'Este livro é de mim'). Compare com posse direta: 'Sách của tôi' (sem 'là') = meu livro (atributo, não identidade). 'Là của' = 'é de/pertence a'.", en: "To assert possession with 'là': 'Sách này là của tôi' = This book is mine (lit. 'This book is of me'). Compare with direct possession: 'Sách của tôi' (without 'là') = my book (attribute, not identity). 'Là của' = 'belongs to'.", tips: ["là của tôi = é meu (identidade de posse)", "này = este (após subst.)", "Contraste: 'sách tôi' (meu livro) vs 'sách này là của tôi' (este livro é meu)"] },
  },
  {
    level: 2,
    tokens: [
      { vn: "Tôi",      pt: "Eu",     en: "I",         cat: "Pronome"},
      { vn: "đến từ",   pt: "venho de","en":"come from", cat: "Verbo" },
      { vn: "Việt Nam", pt: "Vietnã",  en: "Vietnam",   cat: "Nome"  },
    ],
    pt: "Eu venho do Vietnã", en: "I come from Vietnam",
    explanation: { rule: "'Đến từ' = vir de (origem)", pt: "'Đến từ' é uma expressão verbal composta: 'đến' (vir/chegar) + 'từ' (de). Estrutura: S + đến từ + [país/lugar]. Alternativa sinônima: 'Tôi là người Việt Nam' (Sou vietnamita — lit. 'sou pessoa Vietnã'). Ambas corretas, a segunda mais comum no dia a dia.", en: "'Đến từ' is a compound verbal expression: 'đến' (to come/arrive) + 'từ' (from). Structure: S + đến từ + [country/place]. Synonymous alternative: 'Tôi là người Việt Nam' (I am Vietnamese — lit. 'I am Vietnam person'). Both correct, the second more common daily.", tips: ["đến từ = vir de (expressão fixa)", "Alternativa: Tôi là người + [país]"] },
  },
  {
    level: 2,
    tokens: [
      { vn: "Tôi",      pt: "Eu",       en: "I",           cat: "Pronome"    },
      { vn: "là",       pt: "sou",      en: "am",          cat: "Verbo"      },
      { vn: "người",    pt: "uma pessoa","en":"a person from",cat: "Substantivo"},
      { vn: "Việt Nam", pt: "do Vietnã", en: "Vietnam",    cat: "Nome"       },
    ],
    pt: "Sou vietnamita / Sou do Vietnã", en: "I am Vietnamese / I am from Vietnam",
    explanation: { rule: "'Người + país' = gentílico vietnamita", pt: "'Người' (pessoa/povo) + nome do país cria o gentílico: 'người Việt Nam' (vietnamita), 'người Brazil' (brasileiro), 'người Mỹ' (americano). Não existe sufixo '-ês', '-iano' etc. A estrutura 'Tôi là người [país]' é a forma padrão para dizer a nacionalidade.", en: "'Người' (person/people) + country name creates the gentillic: 'người Việt Nam' (Vietnamese), 'người Brazil' (Brazilian), 'người Mỹ' (American). No '-ese', '-ian' suffixes exist. 'Tôi là người [country]' is the standard nationality sentence.", tips: ["người = pessoa/povo (nenhum artigo, nenhum plural)", "Gentílico: Tôi là người + [país] — padrão universal"] },
  },
  {
    level: 2,
    tokens: [
      { vn: "Bức tranh", pt: "O quadro", en: "The painting", cat: "Substantivo"  },
      { vn: "này",       pt: "este",     en: "this",         cat: "Demonstrativo"},
      { vn: "rất",       pt: "é muito",  en: "is very",      cat: "Advérbio"     },
      { vn: "đẹp",       pt: "bonito",   en: "beautiful",    cat: "Adjetivo"     },
    ],
    pt: "Este quadro é muito bonito", en: "This painting is very beautiful",
    explanation: { rule: "'Bức tranh' — classificador + substantivo composto", pt: "'Bức' é o classificador ESPECÍFICO para quadros e pinturas — é parte do nome: 'bức tranh' (um quadro). Ao contar: 'hai bức tranh' (dois quadros). 'Đẹp' = adjetivo para aparência visual de objetos e pessoas. Posição: sempre APÓS o substantivo.", en: "'Bức' is the SPECIFIC classifier for paintings and pictures — it's part of the name: 'bức tranh' (a painting). To count: 'hai bức tranh' (two paintings). 'Đẹp' = adjective for visual appearance of objects and people. Position: always AFTER the noun.", tips: ["bức tranh = quadro/pintura ('bức' é o classificador)", "đẹp = bonito (aparência visual — pessoas e objetos)", "Contraste: đẹp (aparência) · ngon (sabor) · hay (obras)"] },
  },
  {
    level: 2,
    tokens: [
      { vn: "Bạn",   pt: "Você",  en: "You",    cat: "Pronome"      },
      { vn: "là",    pt: "é",     en: "are",    cat: "Verbo"        },
      { vn: "người", pt: "de",    en: "from",   cat: "Substantivo"  },
      { vn: "nước",  pt: "qual",  en: "which",  cat: "Substantivo"  },
      { vn: "nào",   pt: "país?", en: "country?",cat: "Interrogativo"},
    ],
    pt: "De que país você é?", en: "What country are you from?",
    explanation: { rule: "'Nào' = qual? (FINAL) — pergunta de escolha", pt: "Dois interrogativos no final: 'nước nào?' = 'qual país?' (lit. 'país qual?'). 'Nước' aqui = país (não água). 'Nào' é interrogativo de SELEÇÃO ('qual dentre opções') – 'gì' é para identificação ('o que é?'). Resposta: 'Tôi là người [país]' ou 'Tôi đến từ [país]'.", en: "Two interrogatives at the end: 'nước nào?' = 'which country?' (lit. 'country which?'). 'Nước' here = country (not water). 'Nào' is a SELECTION interrogative ('which one') – 'gì' is for identification ('what is it?'). Response: 'Tôi là người [country]' or 'Tôi đến từ [country]'.", tips: ["nước = país (também = água — contexto diferencia)", "nào = qual? (sempre no final)", "Resposta: Tôi là người + [país]"] },
  },
  {
    level: 2,
    tokens: [
      { vn: "Tôi",          pt: "Eu",        en: "I",         cat: "Pronome"    },
      { vn: "sẽ",           pt: "vou",       en: "will",      cat: "Partícula"  },
      { vn: "mua",          pt: "comprar",   en: "buy",       cat: "Verbo"      },
      { vn: "điện thoại",   pt: "o celular", en: "the phone", cat: "Substantivo"},
      { vn: "mới",          pt: "novo",      en: "new",       cat: "Adjetivo"   },
    ],
    pt: "Vou comprar um celular novo", en: "I will buy a new phone",
    explanation: { rule: "Adjetivo APÓS o substantivo + 'sẽ' para futuro", pt: "Dois pontos: (1) 'Mới' (novo) vem APÓS o substantivo: 'điện thoại mới' (celular novo), nunca 'mới điện thoại'. (2) 'Sẽ' antes do verbo indica futuro. 'Điện thoại' = lit. 'conversa elétrica' — composto de 'điện' (elétrico) + 'thoại' (conversa).", en: "Two points: (1) 'Mới' (new) comes AFTER the noun: 'điện thoại mới' (new phone), never 'mới điện thoại'. (2) 'Sẽ' before the verb indicates future. 'Điện thoại' = lit. 'electric speech' — compound of 'điện' (electric) + 'thoại' (speech).", tips: ["mới = novo (sempre APÓS o substantivo)", "điện thoại = celular/telefone", "sẽ mua = vou comprar (futuro)"] },
  },
  {
    level: 2,
    tokens: [
      { vn: "Ngày mai",  pt: "Amanhã",   en: "Tomorrow", cat: "Expressão"},
      { vn: "tôi",       pt: "eu",       en: "I",        cat: "Pronome"  },
      { vn: "không",     pt: "não",      en: "am not",   cat: "Advérbio" },
      { vn: "bận",       pt: "ocupado",  en: "busy",     cat: "Adjetivo" },
    ],
    pt: "Amanhã não estou ocupado(a)", en: "I am not busy tomorrow",
    explanation: { rule: "Advérbio temporal no início + negação com 'không'", pt: "Tempo no INÍCIO: 'Ngày mai' no início dá ênfase temporal (comum em vietnamita). Negação: S + không + Adj/V: 'tôi không bận'. Contraste: afirmativo = 'tôi rất bận', negativo = 'tôi không bận', pergunta = 'anh có bận không?'. Três padrões essenciais com qualquer adj ou verbo.", en: "Time at the START: 'Ngày mai' at the beginning gives temporal emphasis (common in Vietnamese). Negation: S + không + Adj/V: 'tôi không bận'. Contrast: affirmative = 'tôi rất bận', negative = 'tôi không bận', question = 'anh có bận không?'. Three essential patterns with any adj or verb.", tips: ["Ngày mai = amanhã (no início = ênfase no tempo)", "không + adj/verbo = negação", "Sistema: rất (afirm.) · không (neg.) · có...không? (pergunta)"] },
  },
  {
    level: 2,
    tokens: [
      { vn: "Con mèo",  pt: "O gato",   en: "The cat",    cat: "Substantivo"  },
      { vn: "kia",      pt: "aquele",   en: "that",       cat: "Demonstrativo"},
      { vn: "rất",      pt: "é muito",  en: "is very",    cat: "Advérbio"     },
      { vn: "đẹp",      pt: "bonito",   en: "beautiful",  cat: "Adjetivo"     },
    ],
    pt: "Aquele gato é muito bonito", en: "That cat is very beautiful",
    explanation: { rule: "'Con mèo' = classificador + subst. · 'kia' = aquele (distante)", pt: "'Con' é o classificador para animais — obrigatório: 'một con mèo' (um gato), não apenas 'một mèo'. 'Kia' = demonstrativo para algo DISTANTE, vem após o substantivo (ou grupo nominal): 'con mèo kia' = aquele gato. Sistema: 'này' (perto) / 'kia' (longe).", en: "'Con' is the classifier for animals — mandatory: 'một con mèo' (one cat), not just 'một mèo'. 'Kia' = demonstrative for something DISTANT, comes after the noun (or noun phrase): 'con mèo kia' = that cat. System: 'này' (near) / 'kia' (far).", tips: ["con mèo = gato ('con' = classificador para animais)", "kia = aquele/aquela (distante — APÓS o substantivo)", "Sistemas demonstrativos: này (este) / kia (aquele)"] },
  },
  // ===== LEVEL 3 — DIFÍCIL (7+ tokens) =====
  {
    level: 3,
    tokens: [
      { vn: "Nhà",    pt: "A casa",  en: "The house", cat: "Substantivo"},
      { vn: "của",    pt: "de",      en: "of",        cat: "Partícula" },
      { vn: "anh",    pt: "você",    en: "you",       cat: "Pronome"   },
      { vn: "rất",    pt: "muito",   en: "very",      cat: "Advérbio"  },
      { vn: "đẹp",    pt: "bonita",  en: "beautiful", cat: "Adjetivo"  },
      { vn: "và",     pt: "e",       en: "and",       cat: "Conjunção" },
      { vn: "rộng",   pt: "espaçosa","en":"spacious",  cat: "Adjetivo"  },
    ],
    pt: "A sua casa é muito bonita e espaçosa", en: "Your house is very beautiful and spacious",
    explanation: { rule: "'Và' conecta adjetivos; 'rất' modifica ambos", pt: "'Và' = 'e' — conecta dois adjetivos: 'đẹp và rộng' (bonito e espaçoso). 'Rất' aqui tecnicamente modifica apenas 'đẹp', mas em fala é entendido como intensificando toda a descrição. Adjetivos em par são comuns: 'đẹp và rộng', 'ngon và rẻ' (gostoso e barato). 'Của' pode ser omitido: 'nhà anh' = 'nhà của anh'.", en: "'Và' = 'and' — connects two adjectives: 'đẹp và rộng' (beautiful and spacious). 'Rất' here technically only modifies 'đẹp', but in speech it's understood as intensifying the whole description. Adjective pairs are common: 'đẹp và rộng', 'ngon và rẻ' (delicious and cheap). 'Của' can be omitted: 'nhà anh' = 'nhà của anh'.", tips: ["và = e (conecta adjetivos e substantivos)", "rất modifica 'đẹp' (pode intensificar toda a descrição)", "nhà của anh = a sua casa (của = de)"] },
  },
  {
    level: 3,
    tokens: [
      { vn: "Ngày mai",  pt: "Amanhã",   en: "Tomorrow",   cat: "Expressão"},
      { vn: "anh",       pt: "você",     en: "you",        cat: "Pronome"  },
      { vn: "có",        pt: "está",     en: "are",        cat: "Verbo"    },
      { vn: "bận",       pt: "ocupado",  en: "busy",       cat: "Adjetivo" },
      { vn: "không",     pt: "?",        en: "?",          cat: "Advérbio" },
    ],
    pt: "Você está ocupado amanhã?", en: "Are you busy tomorrow?",
    explanation: { rule: "Pergunta sim/não: Pronome + có + Adj/V + không?", pt: "A estrutura 'Có [adj/verbo] không?' (lit. 'tem...não?') cria QUALQUER pergunta sim/não em vietnamita. 'Không' ao final transforma a frase em pergunta. Respostas: 'Có' (sim, está) + repete o adj, ou 'Không' (não, não está) + 'không + adj'. 'Ngày mai' no início enfatiza o tempo.", en: "The structure 'Có [adj/verb] không?' (lit. 'have...not?') creates ANY yes/no question in Vietnamese. 'Không' at the end turns the sentence into a question. Answers: 'Có' (yes, am) + repeat adj, or 'Không' (no, am not) + 'không + adj'. 'Ngày mai' at the start emphasizes time.", tips: ["Pergunta: Có + [adj/verbo] + không? (estrutura universal)", "Resposta sim: Có, anh rất bận", "Resposta não: Không, anh không bận"] },
  },
  {
    level: 3,
    tokens: [
      { vn: "Tôi",    pt: "Eu",        en: "I",          cat: "Pronome"    },
      { vn: "muốn",   pt: "quero",     en: "want",       cat: "Verbo"      },
      { vn: "mời",    pt: "convidar",  en: "to invite",  cat: "Verbo"      },
      { vn: "anh",    pt: "você",      en: "you",        cat: "Pronome"    },
      { vn: "đến",    pt: "a vir a",   en: "to come to", cat: "Verbo"      },
      { vn: "nhà",    pt: "casa",      en: "house",      cat: "Substantivo"},
      { vn: "tôi",    pt: "minha",     en: "my",         cat: "Pronome"    },
    ],
    pt: "Quero te convidar para minha casa", en: "I want to invite you to my house",
    explanation: { rule: "Cadeia de verbos em série (sem preposição entre eles)", pt: "Em vietnamita, vários verbos podem aparecer em sequência DIRETO, sem conectores: 'muốn mời anh đến nhà tôi' = querer convidar você vir casa minha. Cada verbo mantém seu sentido, e a sequência cria a estrutura completa. 'Mời' aqui = convidar (ação); compare: 'Mời anh ngồi' (por favor, sente-se — 'mời' de polidez).", en: "In Vietnamese, multiple verbs can appear in sequence DIRECTLY, without connectors: 'muốn mời anh đến nhà tôi' = want invite you come my house. Each verb keeps its meaning, and the sequence creates the complete structure. 'Mời' here = invite (action); compare: 'Mời anh ngồi' (please sit down — 'mời' of politeness).", tips: ["Verbos em série: muốn + mời + đến (sem preposições entre eles)", "mời = convidar (ação) / por favor (polidez)", "nhà tôi = minha casa (sem 'của' — omissão natural)"] },
  },
  {
    level: 3,
    tokens: [
      { vn: "Đây",        pt: "Este",      en: "This",       cat: "Demonstrativo"},
      { vn: "là",         pt: "é",         en: "is",         cat: "Verbo"        },
      { vn: "bức tranh",  pt: "o quadro",  en: "the painting",cat: "Substantivo" },
      { vn: "tôi",        pt: "que eu",    en: "that I",     cat: "Pronome"      },
      { vn: "mua",        pt: "comprei",   en: "bought",     cat: "Verbo"        },
      { vn: "ở",          pt: "na",        en: "in",         cat: "Verbo"        },
      { vn: "Thái Lan",   pt: "Tailândia", en: "Thailand",   cat: "Nome"         },
    ],
    pt: "Este é o quadro que comprei na Tailândia", en: "This is the painting I bought in Thailand",
    explanation: { rule: "Oração relativa sem 'que' + 'ở' como preposição de local", pt: "Importante: em vietnamita NÃO existe 'que' (pronome relativo). 'Bức tranh tôi mua' = lit. 'quadro eu comprar' = o quadro que eu comprei. A relativa é formada por justaposição. 'Ở' antes de local = preposição 'em/na': 'ở Thái Lan' = na Tailândia.", en: "Important: Vietnamese has NO relative pronoun 'that/which/who'. 'Bức tranh tôi mua' = lit. 'painting I buy' = the painting I bought. The relative clause is formed by juxtaposition. 'Ở' before a location = preposition 'in/at': 'ở Thái Lan' = in Thailand.", tips: ["Relativa sem 'que': tôi mua = que eu comprei (justaposição)", "ở Thái Lan = na Tailândia ('ở' como preposição)", "Đây là = este é (antes de 'là')"] },
  },
  {
    level: 3,
    tokens: [
      { vn: "Tôi",        pt: "Eu",       en: "I",          cat: "Pronome"    },
      { vn: "sẽ",         pt: "vou",      en: "will",       cat: "Partícula"  },
      { vn: "mua",        pt: "comprar",  en: "buy",        cat: "Verbo"      },
      { vn: "một",        pt: "um",       en: "one",        cat: "Número"     },
      { vn: "bức tranh",  pt: "quadro",   en: "painting",   cat: "Substantivo"},
      { vn: "mới",        pt: "novo",     en: "new",        cat: "Adjetivo"   },
    ],
    pt: "Vou comprar um quadro novo", en: "I will buy a new painting",
    explanation: { rule: "Número + classificador + subst. + adj. (ordem de modificação)", pt: "Ordem dos modificadores em vietnamita: [número] + [classificador] + [substantivo] + [adjetivo]. 'Một bức tranh mới' = lit. 'um classificador-quadro novo'. O adjetivo SEMPRE no final. 'Bức' é o classificador; 'tranh' é o substantivo. 'Sẽ mua' = futuro de 'comprar'.", en: "Order of modifiers in Vietnamese: [number] + [classifier] + [noun] + [adjective]. 'Một bức tranh mới' = lit. 'one classifier-painting new'. The adjective is ALWAYS at the end. 'Bức' is the classifier; 'tranh' is the noun. 'Sẽ mua' = future of 'to buy'.", tips: ["Ordem: [num] + [classif.] + [subst.] + [adj] — linha de modificadores", "bức = classificador para pinturas/quadros", "mới = novo — SEMPRE após o substantivo"] },
  },
  {
    level: 3,
    tokens: [
      { vn: "Nhà",    pt: "A casa",  en: "The house", cat: "Substantivo"  },
      { vn: "này",    pt: "esta",    en: "this",      cat: "Demonstrativo"},
      { vn: "của",    pt: "de",      en: "of",        cat: "Partícula"    },
      { vn: "anh",    pt: "você",    en: "you",       cat: "Pronome"      },
      { vn: "rất",    pt: "muito",   en: "very",      cat: "Advérbio"     },
      { vn: "đẹp",    pt: "bonita",  en: "beautiful", cat: "Adjetivo"     },
      { vn: "và",     pt: "e",       en: "and",       cat: "Conjunção"    },
      { vn: "rộng",   pt: "espaçosa","en":"spacious",  cat: "Adjetivo"    },
    ],
    pt: "Esta sua casa é muito bonita e espaçosa", en: "This house of yours is very beautiful and spacious",
    explanation: { rule: "Frase nominal complexa: [subst+demonstrativo+posse] + [adjs]", pt: "Frase nominalmente rica: 'nhà này của anh' = esta casa sua. O demonstrativo 'này' e a posse 'của anh' AMBOS ficam após 'nhà'. Ordem: [substantivo] + [demonstrativo] + [de + possuidor] + [advérbio] + [adjetivo1] + [conj.] + [adjetivo2]. Cada modificador em posição pós-nominal.", en: "Nominally rich sentence: 'nhà này của anh' = this house of yours. Both the demonstrative 'này' and the possession 'của anh' come AFTER 'nhà'. Order: [noun] + [demonstrative] + [of + possessor] + [adverb] + [adj1] + [conj.] + [adj2]. Each modifier post-nominal.", tips: ["Múltiplos pós-modificadores: nhà + này + của anh", "Todos os modificadores APÓS o substantivo", "rất đẹp và rộng = muito bonita e espaçosa"] },
  },
  {
    level: 3,
    tokens: [
      { vn: "Phòng khách", pt: "A sala",      en: "The living room", cat: "Substantivo"  },
      { vn: "nhà",         pt: "da casa",     en: "of the house",   cat: "Substantivo"  },
      { vn: "anh",         pt: "de você",     en: "of yours",       cat: "Pronome"      },
      { vn: "rất",         pt: "muito",       en: "very",           cat: "Advérbio"     },
      { vn: "đẹp",         pt: "bonita",      en: "beautiful",      cat: "Adjetivo"     },
    ],
    pt: "A sua sala de estar é muito bonita", en: "Your living room is very beautiful",
    explanation: { rule: "'Phòng khách' + 'nhà anh' = posse encadeada", pt: "'Phòng khách nhà anh' = lit. 'sala-de-estar casa sua'. Em vietnamita, a posse pode ser encadeada sem 'của' em contextos naturais: '[parte] + [todo] + [possuidor]'. 'Phòng khách' = lit. 'quarto das visitas' — 'phòng' (quarto/sala) + 'khách' (visita). Compare: phòng ngủ (quarto), phòng bếp (cozinha).", en: "'Phòng khách nhà anh' = lit. 'living-room house yours'. In Vietnamese, possession can be chained without 'của' in natural contexts: '[part] + [whole] + [possessor]'. 'Phòng khách' = lit. 'guest room' — 'phòng' (room) + 'khách' (guest). Compare: phòng ngủ (bedroom), phòng bếp (kitchen).", tips: ["phòng khách = sala de estar (lit. sala das visitas)", "Posse encadeada: phòng khách + nhà + anh (sem 'của')", "Família 'phòng': phòng ngủ (quarto) · phòng bếp (cozinha) · phòng tắm (banheiro)"] },
  },
  {
    level: 3,
    tokens: [
      { vn: "Bố",       pt: "O pai",    en: "Father",      cat: "Nome"      },
      { vn: "tôi",      pt: "meu",      en: "my",          cat: "Pronome"   },
      { vn: "là",       pt: "é",        en: "is",          cat: "Verbo"     },
      { vn: "giáo viên",pt: "professor","en":"a teacher",   cat: "Profissão" },
      { vn: "ở",        pt: "em",       en: "in",          cat: "Verbo"     },
      { vn: "Hà Nội",   pt: "Hanói",    en: "Hanoi",       cat: "Nome"      },
    ],
    pt: "Meu pai é professor em Hanói", en: "My father is a teacher in Hanoi",
    explanation: { rule: "S + là + profissão + ở + local (predicado duplo)", pt: "'Bố tôi' = meu pai (sem 'của'). 'Là giáo viên' = é professor. 'Ở Hà Nội' = em Hanói. Note que 'ở' aqui é preposição de local. 'Hà Nội' = capital do Vietnã, no Norte — onde se fala o dialeto que você está estudando. 'Bố' = pai (Norte); 'ba/tía' = pai (Sul).", en: "'Bố tôi' = my father (no 'của'). 'Là giáo viên' = is a teacher. 'Ở Hà Nội' = in Hanoi. Note that 'ở' here is a location preposition. 'Hà Nội' = Vietnam's capital in the North — where the dialect you're studying is spoken. 'Bố' = father (North); 'ba/tía' = father (South).", tips: ["bố tôi = meu pai (sem 'của' para parentes)", "ở Hà Nội = em Hanói ('ở' como preposição)", "Hà Nội = capital do Vietnã, dialeto do Norte"] },
  },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalize(s) {
  return s.trim().replace(/[!?.]/g, "").replace(/\s+/g, " ").toLowerCase();
}

const LEVEL_LABELS = [
  { v: 0, icon: "🌍", pt: "Todas",      en: "All"     },
  { v: 1, icon: "🌱", pt: "Nível 1 — Fácil",     en: "Level 1 — Easy"   },
  { v: 2, icon: "⭐", pt: "Nível 2 — Médio",      en: "Level 2 — Medium" },
  { v: 3, icon: "🔥", pt: "Nível 3 — Difícil",    en: "Level 3 — Hard"   },
];

export default function Ordenar() {
  const { lang } = useLang();
  const isPt = lang !== "en";

  const [screen, setScreen]           = useState("setup");   // "setup" | "play" | "done"
  const [levelFilter, setLevelFilter] = useState(0);         // 0=all, 1/2/3
  const [gameMode, setGameMode]       = useState("ordenar"); // "ordenar" | "escrever"

  const [deck, setDeck]           = useState([]);
  const [idx, setIdx]             = useState(0);
  const [placed, setPlaced]       = useState([]);
  const [bank, setBank]           = useState([]);
  const [checked, setChecked]     = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore]         = useState(0);
  const [typed, setTyped]         = useState("");
  const inputRef                  = useRef(null);

  const counts = {
    0: SENTENCES.length,
    1: SENTENCES.filter(s => s.level === 1).length,
    2: SENTENCES.filter(s => s.level === 2).length,
    3: SENTENCES.filter(s => s.level === 3).length,
  };

  function startGame() {
    const pool = levelFilter === 0 ? SENTENCES : SENTENCES.filter(s => s.level === levelFilter);
    const d = shuffle([...pool]);
    setDeck(d);
    setIdx(0);
    const initBank = shuffle(d[0].tokens.map((_, i) => i));
    setPlaced([]);
    setBank(initBank);
    setChecked(false);
    setIsCorrect(false);
    setScore(0);
    setTyped("");
    setScreen("play");
  }

  function restart() {
    setScreen("setup");
  }

  const current = deck[idx];

  // ── Ordenar mode helpers ───────────────────────────────────────────────────
  function addToken(bankIdx) {
    if (checked) return;
    const ti = bank[bankIdx];
    setPlaced(p => [...p, ti]);
    setBank(b => b.filter((_, i) => i !== bankIdx));
  }
  function removeToken(pi) {
    if (checked) return;
    const ti = placed[pi];
    setBank(b => [...b, ti]);
    setPlaced(p => p.filter((_, i) => i !== pi));
  }
  function clearAll() {
    setPlaced([]);
    setBank(shuffle(current.tokens.map((_, i) => i)));
    setChecked(false);
    setTyped("");
  }
  function checkOrdenar() {
    const correct = placed.every((ti, i) => ti === i) && placed.length === current.tokens.length;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
    setChecked(true);
  }
  function checkEscrever() {
    const correctSentence = current.tokens.map(t => t.vn).join(" ");
    const ok = normalize(typed) === normalize(correctSentence);
    setIsCorrect(ok);
    if (ok) setScore(s => s + 1);
    setChecked(true);
  }

  function nextSentence() {
    if (idx + 1 >= deck.length) { setScreen("done"); return; }
    const next = idx + 1;
    setIdx(next);
    setPlaced([]);
    setBank(shuffle(deck[next].tokens.map((_, i) => i)));
    setChecked(false);
    setIsCorrect(false);
    setTyped("");
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  // ── SETUP ──────────────────────────────────────────────────────────────────
  if (screen === "setup") {
    return (
      <div className="quiz-wrap">
        <h2 className="page-title">🧩 {isPt ? "Montar Frase" : "Build the Sentence"}</h2>
        <p className="page-subtitle">{isPt ? "Escolha o nível e o modo para praticar frases reais" : "Choose level and mode to practice real sentences"}</p>

        <div className="card quiz-setup">
          {/* MODE */}
          <div style={{ marginBottom: 20 }}>
            <div className="quiz-label">{isPt ? "Modo de prática:" : "Practice mode:"}</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { id: "ordenar", icon: "🔀", pt: "Ordenar Palavras",  en: "Sort Words",   desc_pt: "Toque nas palavras na ordem certa", desc_en: "Tap words in the right order" },
                { id: "escrever",icon: "✍️", pt: "Escrever a Frase",  en: "Write It",     desc_pt: "Digite a frase vietnamita completa", desc_en: "Type the full Vietnamese sentence" },
              ].map(m => (
                <button key={m.id} onClick={() => setGameMode(m.id)} style={{
                  flex: 1, minWidth: 150, padding: "12px 16px", borderRadius: 12, cursor: "pointer", fontFamily: "inherit",
                  background: gameMode === m.id ? "var(--primary)" : "var(--bg-card)",
                  color: gameMode === m.id ? "#fff" : "var(--text)",
                  border: gameMode === m.id ? "none" : "1.5px solid var(--border)",
                  fontWeight: 700, fontSize: 14, textAlign: "left", transition: "0.15s"
                }}>
                  <div style={{ fontSize: 20 }}>{m.icon}</div>
                  <div>{isPt ? m.pt : m.en}</div>
                  <div style={{ fontSize: 11, fontWeight: 400, opacity: 0.8, marginTop: 3 }}>{isPt ? m.desc_pt : m.desc_en}</div>
                </button>
              ))}
            </div>
          </div>

          {/* LEVEL */}
          <div style={{ marginBottom: 20 }}>
            <div className="quiz-label">{isPt ? "Nível de dificuldade:" : "Difficulty level:"}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {LEVEL_LABELS.map(lv => (
                <button key={lv.v} onClick={() => setLevelFilter(lv.v)} style={{
                  padding: "10px 16px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit",
                  background: levelFilter === lv.v ? "#f59e0b" : "var(--bg-card)",
                  color: levelFilter === lv.v ? "#fff" : "var(--text)",
                  border: levelFilter === lv.v ? "none" : "1.5px solid var(--border)",
                  fontWeight: 700, fontSize: 13, transition: "0.15s"
                }}>
                  <div>{lv.icon} {isPt ? lv.pt : lv.en}</div>
                  <div style={{ fontSize: 11, fontWeight: 400, opacity: 0.85, marginTop: 2 }}>{counts[lv.v]} {isPt ? "frases" : "sentences"}</div>
                </button>
              ))}
            </div>
          </div>

          <button className="btn-primary" onClick={startGame} style={{ width: "100%", padding: "14px", fontSize: 15 }}>
            🚀 {isPt ? "Começar!" : "Start!"}
          </button>
        </div>
      </div>
    );
  }

  // ── DONE ───────────────────────────────────────────────────────────────────
  if (screen === "done") {
    const pct = score / deck.length;
    return (
      <div className="quiz-wrap">
        <h2 className="page-title">🧩 {isPt ? "Resultado" : "Result"}</h2>
        <div className="card quiz-result-card">
          <div className="quiz-score-big">{score} / {deck.length}</div>
          <p className="quiz-result-msg">
            {pct === 1 ? (isPt ? "Perfeito! Incrível domínio!" : "Perfect! Amazing mastery!")
              : pct >= 0.7 ? (isPt ? "Muito bom! Continue assim!" : "Very good! Keep it up!")
              : pct >= 0.5 ? (isPt ? "Bom esforço! Pratique mais." : "Good effort! Practice more.")
              : (isPt ? "Continue estudando, você vai evoluir!" : "Keep studying, you'll improve!") }
          </p>
          <div className="quiz-result-bar"><div className="quiz-result-fill" style={{ width: `${pct * 100}%` }} /></div>
          <div className="quiz-result-actions">
            <button className="btn-primary" onClick={startGame}>{isPt ? "Tentar Novamente" : "Try Again"}</button>
            <button className="btn-outline" onClick={restart}>{isPt ? "Mudar Configuração" : "Change Settings"}</button>
          </div>
        </div>
      </div>
    );
  }

  // ── PLAY ───────────────────────────────────────────────────────────────────
  const tokens = current.tokens;
  const translation = isPt ? current.pt : current.en;
  const correctSentence = tokens.map(t => t.vn).join(" ");
  const levelColor = current.level === 1 ? "#10b981" : current.level === 2 ? "#f59e0b" : "#ef4444";
  const levelName  = current.level === 1 ? (isPt ? "Fácil" : "Easy") : current.level === 2 ? (isPt ? "Médio" : "Medium") : (isPt ? "Difícil" : "Hard");

  return (
    <div className="quiz-wrap">
      <div className="quiz-topbar">
        <span className="quiz-progress-text">{isPt ? "Frase" : "Sentence"} {idx + 1} / {deck.length}</span>
        <span style={{ background: levelColor + "22", color: levelColor, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 999 }}>{levelName}</span>
        <span className="quiz-score-inline">{isPt ? "Acertos" : "Correct"}: {score}</span>
      </div>
      <div className="quiz-progress-bar"><div className="quiz-progress-fill" style={{ width: `${(idx / deck.length) * 100}%` }} /></div>

      <div className="card ordenar-card">
        <div className="ordenar-translation-box">
          <span className="ordenar-trans-label">{isPt ? "Traduza:" : "Translate:"}</span>
          <span className="ordenar-trans-text" style={{ fontSize: 17, fontWeight: 700 }}>{translation}</span>
        </div>

        {gameMode === "ordenar" && (
          <>
            <p className="ordenar-instruction">{isPt ? "Toque nas palavras na ordem correta" : "Tap words in the correct order"}</p>
            <div className={`ordenar-zone ${checked ? (isCorrect ? "zone-correct" : "zone-wrong") : ""}`}>
              {placed.length === 0 && (
                <span className="ordenar-zone-placeholder">{isPt ? "Toque nas palavras abaixo..." : "Tap words below..."}</span>
              )}
              {placed.map((ti, i) => (
                <button key={`p-${i}`} className={`token token-placed ${checked ? (ti === i ? "token-ok" : "token-err") : ""}`} onClick={() => removeToken(i)} disabled={checked}>
                  {tokens[ti].vn}
                </button>
              ))}
            </div>
            <div className="ordenar-bank">
              {bank.map((ti, i) => (
                <button key={`b-${i}`} className="token token-bank" onClick={() => addToken(i)} disabled={checked}>
                  {tokens[ti].vn}
                </button>
              ))}
            </div>
            <div className="ordenar-actions">
              {!checked ? (
                <>
                  <button className="btn-outline" onClick={clearAll}>{isPt ? "Limpar" : "Clear"}</button>
                  <button className="btn-primary" onClick={checkOrdenar} disabled={placed.length !== tokens.length}>{isPt ? "Verificar" : "Check"}</button>
                </>
              ) : (
                <button className="btn-primary" onClick={nextSentence}>{isPt ? "Próxima →" : "Next →"}</button>
              )}
            </div>
          </>
        )}

        {gameMode === "escrever" && (
          <>
            <p className="ordenar-instruction">{isPt ? "Digite a frase em vietnamita:" : "Type the Vietnamese sentence:"}</p>
            {!checked && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                  {tokens.map((t, i) => {
                    const c = CAT_COLORS[t.cat] || { bg: "#f1f5f9", text: "#475569" };
                    return <span key={i} style={{ background: c.bg, color: c.text, fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 999 }}>{t.vn}</span>;
                  })}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 8 }}>{isPt ? "(As palavras estão embaralhadas — use-as para montar a frase)" : "(Words are shuffled above — use them to build the sentence)"}</div>
              </div>
            )}
            <input
              ref={inputRef}
              type="text"
              value={typed}
              onChange={e => { if (!checked) setTyped(e.target.value); }}
              onKeyDown={e => { if (e.key === "Enter" && !checked && typed.trim()) checkEscrever(); }}
              placeholder={isPt ? "Digite a frase vietnamita aqui..." : "Type the Vietnamese sentence here..."}
              disabled={checked}
              style={{ width: "100%", padding: "12px 14px", fontSize: 16, borderRadius: 10, border: `2px solid ${checked ? (isCorrect ? "#10b981" : "#ef4444") : "var(--border)"}`, background: "var(--bg)", color: "var(--text)", fontFamily: "inherit", outline: "none", boxSizing: "border-box", transition: "0.2s" }}
              autoFocus
            />
            <div className="ordenar-actions" style={{ marginTop: 10 }}>
              {!checked ? (
                <button className="btn-primary" onClick={checkEscrever} disabled={!typed.trim()} style={{ width: "100%" }}>
                  {isPt ? "Verificar" : "Check"}
                </button>
              ) : (
                <button className="btn-primary" onClick={nextSentence} style={{ width: "100%" }}>{isPt ? "Próxima →" : "Next →"}</button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Feedback */}
      {checked && (
        <>
          <div className={`quiz-feedback ${isCorrect ? "feedback-correct" : "feedback-wrong"}`}>
            <span className="feedback-icon">{isCorrect ? "✓" : "✗"}</span>
            <span>{isCorrect ? (isPt ? "Perfeito!" : "Perfect!") : (isPt ? "Quase! A frase correta:" : "Almost! Correct sentence:")}</span>
            {!isCorrect && <span className="feedback-right">{correctSentence}</span>}
          </div>

          {/* Grammar explanation */}
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 20px", marginTop: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 18 }}>📖</span>
              <span style={{ fontWeight: 800, fontSize: 14 }}>{isPt ? "Análise Gramatical Completa" : "Full Grammar Analysis"}</span>
              <span style={{ marginLeft: "auto", background: levelColor + "22", color: levelColor, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 999 }}>{isPt ? current.explanation.rule : current.explanation.rule}</span>
            </div>

            {/* Sentence tokens colored */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14, padding: "10px", background: "var(--bg)", borderRadius: 10 }}>
              {tokens.map((t, i) => {
                const c = CAT_COLORS[t.cat] || { bg: "#f1f5f9", text: "#475569" };
                return (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ background: c.bg, color: c.text, padding: "6px 10px", borderRadius: 8, fontWeight: 800, fontSize: 15 }}>{t.vn}</div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2, fontWeight: 600 }}>{t.cat}</div>
                    <div style={{ fontSize: 11, color: "var(--text)", marginTop: 1 }}>{isPt ? t.pt : t.en}</div>
                  </div>
                );
              })}
            </div>

            <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.75, marginBottom: 12 }}>
              {isPt ? current.explanation.pt : current.explanation.en}
            </p>

            {current.explanation.tips && (
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {current.explanation.tips.map((tip, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12, color: "var(--text)" }}>
                    <span style={{ color: "var(--primary)", fontWeight: 700, flexShrink: 0 }}>•</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Word-by-word table */}
          <div style={{ background: "#1a1d2e", borderRadius: 14, padding: "14px 16px", marginTop: 4 }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#94a3b8", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              🔍 {isPt ? "Cada palavra" : "Each word"}
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ background: "#1e2140" }}>
                  <th style={{ padding: "5px 8px", textAlign: "left", color: "#64748b", fontSize: 10, textTransform: "uppercase" }}>VN</th>
                  <th style={{ padding: "5px 8px", textAlign: "left", color: "#64748b", fontSize: 10, textTransform: "uppercase" }}>Cat.</th>
                  <th style={{ padding: "5px 8px", textAlign: "left", color: "#64748b", fontSize: 10, textTransform: "uppercase" }}>{isPt ? "PT" : "EN"}</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((t, i) => {
                  const c = CAT_COLORS[t.cat] || { bg: "#e2e8f0", text: "#334155" };
                  return (
                    <tr key={i} style={{ borderBottom: "1px solid #2e3357" }}>
                      <td style={{ padding: "6px 8px", fontWeight: 800, color: "#f1f5f9", fontSize: 14 }}>{t.vn}</td>
                      <td style={{ padding: "6px 8px" }}><span style={{ background: c.bg, color: c.text, fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 999 }}>{t.cat}</span></td>
                      <td style={{ padding: "6px 8px", color: "#cbd5e1", fontSize: 11 }}>{isPt ? t.pt : t.en}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
