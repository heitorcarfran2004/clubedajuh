// Catalogo da area de membros. Tudo que a home e o leitor mostram sai daqui.
//
// Ao trocar um livro de lugar ou acrescentar paginas, mexa SO neste arquivo:
// nem a home nem o leitor tem conteudo escrito no HTML.
//
// `paginas` e a CONTAGEM, e os arquivos precisam existir como
// assets/livros/<slug>/pag-001.webp ate pag-<paginas>.webp, com 3 digitos.
// Quem gera esses webp e o scripts/app-paginas.sh.
//
// `pdf` e o caminho do arquivo para download. Os PDFs vivem em arquivos/, que esta
// no .gitignore por causa do tamanho (o principal tem 241 MB). Em producao isso vira
// URL assinada de storage — ver o README.

const CATALOGO = {
  // o acesso grande da home
  principal: {
    slug: 'principal',
    titulo: '100 Projetos de Brincos de Miçanga',
    paginas: 101,
    capa: 'assets/capas/principal.webp',
    pdf: 'pdf/100-brincos.pdf',
  },

  // o carrossel horizontal
  bonus: [
    // Entrou em 13/09/2026 como Bônus 1, na frente dos outros cinco. Os slugs antigos
    // ficaram como estavam de propósito: o progresso de leitura é salvo por slug, e
    // renumerar b1..b5 faria quem já estava lendo abrir no livro errado.
    { slug: 'cristal', titulo: 'Brincos de Cristal com Miçangas', sub: 'Franjas, borlas e cascatas de festa e de noiva',
      paginas: 21, capa: 'assets/capas/cristal.webp', pdf: 'pdf/bonus-cristal.pdf' },
    { slug: 'b1', titulo: 'Tabela de Conversão de Cores', sub: 'Qual miçanga comprar a partir do nome da cor',
      paginas: 10, capa: 'assets/capas/b1.webp', pdf: 'pdf/bonus-1-cores.pdf' },
    { slug: 'b2', titulo: 'Guia de Acabamento Profissional', sub: 'O detalhe que faz a peça parecer de loja',
      paginas: 8, capa: 'assets/capas/b2.webp', pdf: 'pdf/bonus-2-acabamento.pdf' },
    { slug: 'b3', titulo: 'Grades em Branco para Criar', sub: 'Imprima e desenhe o seu próprio modelo',
      paginas: 10, capa: 'assets/capas/b3.webp', pdf: 'pdf/bonus-3-grades.pdf' },
    { slug: 'b4', titulo: 'Como Precificar e Vender', sub: 'A conta que mostra quanto o seu brinco vale',
      paginas: 8, capa: 'assets/capas/b4.webp', pdf: 'pdf/bonus-4-precificar.pdf' },
    { slug: 'b5', titulo: 'Lista de Compras da Iniciante', sub: 'O que comprar, quanto, e onde não economizar',
      paginas: 8, capa: 'assets/capas/b5.webp', pdf: 'pdf/bonus-5-compras.pdf' },
  ],

  // "Produtos Extras" — os order bumps da coleção de miçanga.
  //
  // Quem comprou (o slug está nos itens do ACESSO, ver acesso.js) vê "Abrir agora" e
  // o material na Biblioteca. Quem não comprou vê o preço e o botão vai para o
  // `checkout`: o checkout PRÓPRIO de cada extra na Wiapy (criados em 19/09/2026), que o
  // webhook reconhece pelo ID (supabase/functions/wiapy-webhook/mapa.ts). `por` é o preço dele.
  //
  // `paginas` inclui a capa, que é a página 1 de cada um.
  ofertas: [
    // Chegou pronto em PDF (14/09/2026), nao foi gerado aqui: a capa e a pagina 1 e cada
    // receita ocupa de 1 a 3 paginas — ficha, pecas com medida e montagem.
    { slug: 'bolsas', titulo: '50 Bolsas de Miçanga',
      sub: 'Bolsinhas em trama de miçanga, com as medidas de cada peça.',
      paginas: 67, de: 'R$ 37', por: 'R$ 7,90',
      capa: 'assets/capas/bolsas.webp',
      pdf: 'pdf/50-bolsas.pdf', checkout: 'https://pay.wiapy.com/YOH8Rreo3o5b' },
    { slug: 'pulseiras', titulo: '50 Pulseiras de Miçanga',
      sub: 'Padrões étnicos, florais e geométricos tecidos em telar.',
      paginas: 51, de: 'R$ 37', por: 'R$ 5,90',
      capa: 'assets/capas/pulseiras.webp',
      pdf: 'pdf/50-pulseiras.pdf', checkout: 'https://pay.wiapy.com/uMSvSsFhBn11' },
    { slug: 'colares', titulo: '50 Colares de Miçanga',
      sub: 'Colares de crochê com miçanga, do clássico ao colorido.',
      paginas: 51, de: 'R$ 37', por: 'R$ 5,90',
      capa: 'assets/capas/colares.webp',
      pdf: 'pdf/50-colares.pdf', checkout: 'https://pay.wiapy.com/WZKGko4yyyCb' },
    { slug: 'pingentes', titulo: '30 Pingentes de Miçanga',
      sub: 'Figuras tecidas para pendurar em corrente ou cordão.',
      paginas: 31, de: 'R$ 27', por: 'R$ 4,90',
      capa: 'assets/capas/pingentes.webp',
      pdf: 'pdf/30-pingentes.pdf', checkout: 'https://pay.wiapy.com/zORuhG_La39-' },
    { slug: 'tiaras', titulo: '16 Tiaras de Miçanga',
      sub: 'Arcos forrados de miçanga, do folclórico ao colorido.',
      paginas: 17, de: 'R$ 27', por: 'R$ 3,90',
      capa: 'assets/capas/tiaras.webp',
      pdf: 'pdf/16-tiaras.pdf', checkout: 'https://pay.wiapy.com/wCBOlLHfvLlt' },
  ],

  // Onde se compra o que não veio no pedido. `bonus` é o Completo com 30% (R$ 16,90):
  // quem levou o Essencial compra de novo e o webhook libera os bônus. `videos` é o
  // checkout próprio dos vídeos, com o mesmo preço do upsell.
  compra: {
    bonus: { preco: 'R$ 16,90', link: 'https://pay.wiapy.com/I2XmXHKdXFVQ' },
    videos: { preco: 'R$ 19,90', link: 'https://pay.wiapy.com/checkout/6aa1e01db0c1c48195cf0ef8' },
  },

  // A aba de VÍDEOS. Não se chama "aula" em lugar nenhum, e os vídeos não são
  // numerados: no Wistia eles estão salvos como "aula 28", "aula 29"..., mas isso é
  // nome interno. O que identifica cada um na tela é a própria miniatura, que mostra
  // o brinco sendo feito.
  //
  // A lista de IDs vive em scripts/videos-wistia.txt. Para acrescentar vídeo novo:
  // cole o ID lá e rode `node scripts/app-videos.cjs` — ele busca duração e miniatura
  // no Wistia e atualiza o videos.json, que é o que a tela lê.
  videos: [{"id":"pjh6edg1tl","seg":1482},{"id":"1ofxlnctxi","seg":2201},{"id":"9zaahkc7sy","seg":1579},{"id":"sp13kzjlzr","seg":1531},{"id":"kcq4dwifgv","seg":1783},{"id":"kahrxg4lhi","seg":509},{"id":"xy1n485cm0","seg":611},{"id":"xjbv36ju9k","seg":1586},{"id":"vrysu6vt8n","seg":1386},{"id":"ym8ea0ctyb","seg":1052},{"id":"do7yw5uibu","seg":611},{"id":"p32lu1e0qt","seg":1428},{"id":"93piosixt2","seg":1088},{"id":"7tkn8duk3d","seg":1621},{"id":"n2s46x6z8n","seg":1856},{"id":"hb7il0jwwq","seg":1561},{"id":"h4j2cl7tde","seg":1689},{"id":"vqxqn22dsu","seg":1295},{"id":"46yy15jkwt","seg":1182},{"id":"sqcgkwta8t","seg":780},{"id":"p4y1dfjuk2","seg":1611},{"id":"bcgfsmq4x5","seg":1471},{"id":"8wujl2yq0d","seg":1699},{"id":"q4h974by6l","seg":1380},{"id":"enhx0atgkm","seg":1843},{"id":"o0m2b395w2","seg":1426},{"id":"es4g9vdtbm","seg":1474},{"id":"m0tm2zybfk","seg":1847},{"id":"a52tibkt1i","seg":943},{"id":"qwlmgt3ek5","seg":1199},{"id":"strthc7pna","seg":1652},{"id":"osduervzd9","seg":929},{"id":"idg3gft3mu","seg":1673},{"id":"hd5vue17ao","seg":1208},{"id":"w54q61clcu","seg":1516},{"id":"5qa1w8w4bl","seg":1238},{"id":"0p5597u7fs","seg":1133},{"id":"g1yrd0xj8d","seg":1169},{"id":"q4qyautx2p","seg":1192},{"id":"cuc4mkahcv","seg":1656},{"id":"ooo4yj7lxi","seg":1325},{"id":"bllxp4xhwo","seg":1694},{"id":"i4nlux6p73","seg":1001},{"id":"9afdhi9f91","seg":1694},{"id":"y99jpgq1s9","seg":1488}],

  // O GRÁFICO DE CADA VÍDEO, pelo ID do Wistia. Aparece embaixo do player, com a página
  // em assets/graficos/<id>.webp e o PDF de uma página em pdf/graficos/<id>.pdf.
  // O nome é do brinco, não do vídeo: continua sem "aula" e sem número.
  // Gerado por `node scripts/app-graficos.cjs` — não edite à mão entre os marcadores.
  // <graficos>
  graficos: {
    "pjh6edg1tl": {"nome":"Caveira Mexicana","nivel":"Médio","tamanho":"4 cm de altura","tecnica":"Figura chapada"},
    "1ofxlnctxi": {"nome":"Trio de Flores","nivel":"Fácil","tamanho":"6 cm de comprimento","tecnica":"Figura chapada"},
    "9zaahkc7sy": {"nome":"Mandala Dourada","nivel":"Avançado","tamanho":"4,5 cm de diâmetro","tecnica":"Rosácea"},
    "sp13kzjlzr": {"nome":"Losango Huichol","nivel":"Médio","tamanho":"7 cm de comprimento","tecnica":"Com franjas"},
    "kcq4dwifgv": {"nome":"Pena Tropical","nivel":"Avançado","tamanho":"12 cm de comprimento","tecnica":"Com franjas"},
    "kahrxg4lhi": {"nome":"Estrela Vermelha","nivel":"Médio","tamanho":"3,5 cm de diâmetro","tecnica":"Rosácea"},
    "xy1n485cm0": {"nome":"Asa de Arara","nivel":"Avançado","tamanho":"12 cm de comprimento","tecnica":"Com franjas"},
    "xjbv36ju9k": {"nome":"Girassol","nivel":"Médio","tamanho":"4 cm de diâmetro","tecnica":"Rosácea"},
    "vrysu6vt8n": {"nome":"Flor e Franja Azul","nivel":"Avançado","tamanho":"11 cm de comprimento","tecnica":"Com franjas"},
    "ym8ea0ctyb": {"nome":"Chuva Vermelha","nivel":"Médio","tamanho":"11 cm de comprimento","tecnica":"Com franjas"},
    "do7yw5uibu": {"nome":"Cometa","nivel":"Avançado","tamanho":"12 cm de comprimento","tecnica":"Com franjas"},
    "p32lu1e0qt": {"nome":"Diamante Asteca","nivel":"Médio","tamanho":"6 cm de comprimento","tecnica":"Com franjas"},
    "93piosixt2": {"nome":"Noite Lilás","nivel":"Avançado","tamanho":"11 cm de comprimento","tecnica":"Com franjas"},
    "7tkn8duk3d": {"nome":"Pena Pavão","nivel":"Avançado","tamanho":"12 cm de comprimento","tecnica":"Com franjas"},
    "n2s46x6z8n": {"nome":"Corações","nivel":"Fácil","tamanho":"6 cm de comprimento","tecnica":"Figura chapada"},
    "hb7il0jwwq": {"nome":"Floco de Neve","nivel":"Médio","tamanho":"10 cm de comprimento","tecnica":"Com franjas"},
    "h4j2cl7tde": {"nome":"Sol Asteca","nivel":"Avançado","tamanho":"11 cm de comprimento","tecnica":"Com franjas"},
    "vqxqn22dsu": {"nome":"Tucano","nivel":"Avançado","tamanho":"10 cm de comprimento","tecnica":"Com franjas"},
    "46yy15jkwt": {"nome":"Arara Vermelha","nivel":"Avançado","tamanho":"11 cm de comprimento","tecnica":"Com franjas"},
    "sqcgkwta8t": {"nome":"Galáxia","nivel":"Avançado","tamanho":"12 cm de comprimento","tecnica":"Com franjas"},
    "p4y1dfjuk2": {"nome":"Pena do Pôr do Sol","nivel":"Avançado","tamanho":"12 cm de comprimento","tecnica":"Com franjas"},
    "bcgfsmq4x5": {"nome":"Gota Arco-Íris","nivel":"Médio","tamanho":"6 cm de comprimento","tecnica":"Figura chapada"},
    "8wujl2yq0d": {"nome":"Melancia","nivel":"Médio","tamanho":"8 cm de comprimento","tecnica":"Com franjas"},
    "q4h974by6l": {"nome":"Melancia com Franja","nivel":"Médio","tamanho":"11 cm de comprimento","tecnica":"Com franjas"},
    "enhx0atgkm": {"nome":"Roseta Verde","nivel":"Avançado","tamanho":"11 cm de comprimento","tecnica":"Com franjas"},
    "o0m2b395w2": {"nome":"Olho Marrom","nivel":"Médio","tamanho":"6 cm de comprimento","tecnica":"Figura chapada"},
    "es4g9vdtbm": {"nome":"Mandala Azul","nivel":"Avançado","tamanho":"4,5 cm de diâmetro","tecnica":"Rosácea"},
    "m0tm2zybfk": {"nome":"Arco-Íris Noturno","nivel":"Fácil","tamanho":"5 cm de comprimento","tecnica":"Com franjas"},
    "a52tibkt1i": {"nome":"Cascata Rosa","nivel":"Médio","tamanho":"11 cm de comprimento","tecnica":"Com franjas"},
    "qwlmgt3ek5": {"nome":"Cascata Azul","nivel":"Médio","tamanho":"11 cm de comprimento","tecnica":"Com franjas"},
    "strthc7pna": {"nome":"Flor da Noite","nivel":"Avançado","tamanho":"12 cm de comprimento","tecnica":"Com franjas"},
    "osduervzd9": {"nome":"Folha Azul","nivel":"Médio","tamanho":"8 cm de comprimento","tecnica":"Com franjas"},
    "idg3gft3mu": {"nome":"Dupla Roseta","nivel":"Avançado","tamanho":"11 cm de comprimento","tecnica":"Com franjas"},
    "hd5vue17ao": {"nome":"Espiral Vermelha","nivel":"Médio","tamanho":"7 cm de comprimento","tecnica":"Figura chapada"},
    "w54q61clcu": {"nome":"Rosa Vermelha","nivel":"Avançado","tamanho":"4 cm de diâmetro","tecnica":"Rosácea"},
    "5qa1w8w4bl": {"nome":"Flor Lilás","nivel":"Médio","tamanho":"4 cm de diâmetro","tecnica":"Rosácea"},
    "0p5597u7fs": {"nome":"Caminho de Flores","nivel":"Médio","tamanho":"8 cm de comprimento","tecnica":"Figura chapada"},
    "g1yrd0xj8d": {"nome":"Rede Rosa","nivel":"Médio","tamanho":"7 cm de comprimento","tecnica":"Com franjas"},
    "q4qyautx2p": {"nome":"Flor Rosa Gigante","nivel":"Avançado","tamanho":"5 cm de diâmetro","tecnica":"Rosácea"},
    "cuc4mkahcv": {"nome":"Gota Magenta","nivel":"Avançado","tamanho":"9 cm de comprimento","tecnica":"Com franjas"},
    "ooo4yj7lxi": {"nome":"Flor e Cascata","nivel":"Avançado","tamanho":"10 cm de comprimento","tecnica":"Com franjas"},
    "bllxp4xhwo": {"nome":"Cascata Turquesa","nivel":"Avançado","tamanho":"13 cm de comprimento","tecnica":"Com franjas"},
    "i4nlux6p73": {"nome":"Argola Franjada","nivel":"Médio","tamanho":"10 cm de comprimento","tecnica":"Com franjas"},
    "9afdhi9f91": {"nome":"Flor Azul com Franja","nivel":"Avançado","tamanho":"11 cm de comprimento","tecnica":"Com franjas"},
    "y99jpgq1s9": {"nome":"Rosa dos Ventos","nivel":"Avançado","tamanho":"4,5 cm de diâmetro","tecnica":"Rosácea"},
  },
  // </graficos>
};

// o leitor acha qualquer material pelo slug: principal, bônus ou extra
CATALOGO.porSlug = (slug) =>
  slug === 'principal' ? CATALOGO.principal
    : CATALOGO.bonus.find(b => b.slug === slug)
    || CATALOGO.ofertas.find(o => o.slug === slug);

// o item de acesso que libera cada material (os itens vêm do acesso.js)
CATALOGO.itemDe = (slug) =>
  slug === 'principal' ? 'principal'
    : CATALOGO.bonus.some(b => b.slug === slug) ? 'bonus'
    : slug;
