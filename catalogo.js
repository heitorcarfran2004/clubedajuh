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

  // "Produtos Extras" — os orderbumps da coleção de miçanga.
  //
  // `liberado: true` = de graça enquanto a integração não sai. Nesse estado o card
  // mostra GRÁTIS no lugar do preço, o botão ABRE o material no leitor em vez de ir para
  // o checkout, e o produto também aparece na Biblioteca.
  //
  // QUANDO A WIAPY ENTRAR: troque `liberado` para false em cada um. O preço volta, o
  // botão vira checkout de novo e o produto sai da Biblioteca de quem não comprou. É uma
  // linha por produto, sem tocar em layout. E aí o `checkout` precisa do link real.
  //
  // `paginas` inclui a capa, que é a página 1 de cada um.
  ofertas: [
    // Chegou pronto em PDF (14/09/2026), nao foi gerado aqui: a capa e a pagina 1 e cada
    // receita ocupa de 1 a 3 paginas — ficha, pecas com medida e montagem.
    { slug: 'bolsas', titulo: '50 Bolsas de Miçanga',
      sub: 'Bolsinhas em trama de miçanga, com as medidas de cada peça.',
      paginas: 67, de: 'R$ 37', por: 'R$ 17,90', liberado: true,
      capa: 'assets/capas/bolsas.webp',
      pdf: 'pdf/50-bolsas.pdf', checkout: 'TROCAR-CHECKOUT-BOLSAS' },
    { slug: 'pulseiras', titulo: '50 Pulseiras de Miçanga',
      sub: 'Padrões étnicos, florais e geométricos tecidos em telar.',
      paginas: 51, de: 'R$ 37', por: 'R$ 17,90', liberado: true,
      capa: 'assets/capas/pulseiras.webp',
      pdf: 'pdf/50-pulseiras.pdf', checkout: 'TROCAR-CHECKOUT-PULSEIRAS' },
    { slug: 'colares', titulo: '50 Colares de Miçanga',
      sub: 'Colares de crochê com miçanga, do clássico ao colorido.',
      paginas: 51, de: 'R$ 37', por: 'R$ 17,90', liberado: true,
      capa: 'assets/capas/colares.webp',
      pdf: 'pdf/50-colares.pdf', checkout: 'TROCAR-CHECKOUT-COLARES' },
    { slug: 'pingentes', titulo: '30 Pingentes de Miçanga',
      sub: 'Figuras tecidas para pendurar em corrente ou cordão.',
      paginas: 31, de: 'R$ 27', por: 'R$ 12,90', liberado: true,
      capa: 'assets/capas/pingentes.webp',
      pdf: 'pdf/30-pingentes.pdf', checkout: 'TROCAR-CHECKOUT-PINGENTES' },
    { slug: 'tiaras', titulo: '16 Tiaras de Miçanga',
      sub: 'Arcos forrados de miçanga, do folclórico ao colorido.',
      paginas: 17, de: 'R$ 27', por: 'R$ 12,90', liberado: true,
      capa: 'assets/capas/tiaras.webp',
      pdf: 'pdf/16-tiaras.pdf', checkout: 'TROCAR-CHECKOUT-TIARAS' },
  ],

  // A aba de VÍDEOS. Não se chama "aula" em lugar nenhum, e os vídeos não são
  // numerados: no Wistia eles estão salvos como "aula 28", "aula 29"..., mas isso é
  // nome interno. O que identifica cada um na tela é a própria miniatura, que mostra
  // o brinco sendo feito.
  //
  // A lista de IDs vive em scripts/videos-wistia.txt. Para acrescentar vídeo novo:
  // cole o ID lá e rode `node scripts/app-videos.cjs` — ele busca duração e miniatura
  // no Wistia e atualiza o videos.json, que é o que a tela lê.
  videos: [{"id":"pjh6edg1tl","seg":1482},{"id":"1ofxlnctxi","seg":2201},{"id":"9zaahkc7sy","seg":1579},{"id":"sp13kzjlzr","seg":1531},{"id":"kcq4dwifgv","seg":1783},{"id":"kahrxg4lhi","seg":509},{"id":"xy1n485cm0","seg":611},{"id":"xjbv36ju9k","seg":1586},{"id":"vrysu6vt8n","seg":1386},{"id":"ym8ea0ctyb","seg":1052},{"id":"do7yw5uibu","seg":611},{"id":"p32lu1e0qt","seg":1428},{"id":"93piosixt2","seg":1088},{"id":"7tkn8duk3d","seg":1621},{"id":"n2s46x6z8n","seg":1856},{"id":"hb7il0jwwq","seg":1561},{"id":"h4j2cl7tde","seg":1689},{"id":"vqxqn22dsu","seg":1295},{"id":"46yy15jkwt","seg":1182},{"id":"sqcgkwta8t","seg":780},{"id":"p4y1dfjuk2","seg":1611},{"id":"bcgfsmq4x5","seg":1471},{"id":"8wujl2yq0d","seg":1699},{"id":"q4h974by6l","seg":1380},{"id":"enhx0atgkm","seg":1843},{"id":"o0m2b395w2","seg":1426},{"id":"es4g9vdtbm","seg":1474},{"id":"m0tm2zybfk","seg":1847},{"id":"a52tibkt1i","seg":943},{"id":"qwlmgt3ek5","seg":1199},{"id":"strthc7pna","seg":1652},{"id":"osduervzd9","seg":929},{"id":"idg3gft3mu","seg":1673},{"id":"hd5vue17ao","seg":1208},{"id":"w54q61clcu","seg":1516},{"id":"5qa1w8w4bl","seg":1238},{"id":"0p5597u7fs","seg":1133},{"id":"g1yrd0xj8d","seg":1169},{"id":"q4qyautx2p","seg":1192},{"id":"cuc4mkahcv","seg":1656},{"id":"ooo4yj7lxi","seg":1325},{"id":"bllxp4xhwo","seg":1694},{"id":"i4nlux6p73","seg":1001},{"id":"9afdhi9f91","seg":1694},{"id":"y99jpgq1s9","seg":1488}],

};

// atalho para o leitor achar qualquer livro pelo slug, seja principal ou bonus
// o leitor acha qualquer material pelo slug: principal, bonus ou extra liberado
CATALOGO.porSlug = (slug) =>
  slug === 'principal' ? CATALOGO.principal
    : CATALOGO.bonus.find(b => b.slug === slug)
    || CATALOGO.ofertas.find(o => o.slug === slug && o.liberado);
