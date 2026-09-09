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
    pdf: 'arquivos/100 Projetos de Brincos de Micanga.pdf',
  },

  // o carrossel horizontal
  bonus: [
    { slug: 'b1', titulo: 'Tabela de Conversão de Cores', sub: 'Qual miçanga comprar a partir do nome da cor',
      paginas: 10, capa: 'assets/capas/b1.webp', pdf: 'arquivos/Bonus 1 - Tabela de Conversao de Cores.pdf' },
    { slug: 'b2', titulo: 'Guia de Acabamento Profissional', sub: 'O detalhe que faz a peça parecer de loja',
      paginas: 8, capa: 'assets/capas/b2.webp', pdf: 'arquivos/Bonus 2 - Guia de Acabamento Profissional.pdf' },
    { slug: 'b3', titulo: 'Grades em Branco para Criar', sub: 'Imprima e desenhe o seu próprio modelo',
      paginas: 10, capa: 'assets/capas/b3.webp', pdf: 'arquivos/Bonus 3 - Grades em Branco para Criar.pdf' },
    { slug: 'b4', titulo: 'Como Precificar e Vender', sub: 'A conta que mostra quanto o seu brinco vale',
      paginas: 8, capa: 'assets/capas/b4.webp', pdf: 'arquivos/Bonus 4 - Como Precificar e Vender.pdf' },
    { slug: 'b5', titulo: 'Lista de Compras da Iniciante', sub: 'O que comprar, quanto, e onde não economizar',
      paginas: 8, capa: 'assets/capas/b5.webp', pdf: 'arquivos/Bonus 5 - Lista de Compras da Iniciante.pdf' },
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
    { slug: 'pulseiras', titulo: '50 Pulseiras de Miçanga',
      sub: 'Padrões étnicos, florais e geométricos tecidos em telar.',
      paginas: 51, de: 'R$ 37', por: 'R$ 17,90', liberado: true,
      capa: 'assets/capas/pulseiras.webp',
      pdf: 'arquivos/50 Pulseiras de Micanga.pdf', checkout: 'TROCAR-CHECKOUT-PULSEIRAS' },
    { slug: 'colares', titulo: '50 Colares de Miçanga',
      sub: 'Colares de crochê com miçanga, do clássico ao colorido.',
      paginas: 51, de: 'R$ 37', por: 'R$ 17,90', liberado: true,
      capa: 'assets/capas/colares.webp',
      pdf: 'arquivos/50 Colares de Micanga.pdf', checkout: 'TROCAR-CHECKOUT-COLARES' },
    { slug: 'pingentes', titulo: '30 Pingentes de Miçanga',
      sub: 'Figuras tecidas para pendurar em corrente ou cordão.',
      paginas: 31, de: 'R$ 27', por: 'R$ 12,90', liberado: true,
      capa: 'assets/capas/pingentes.webp',
      pdf: 'arquivos/30 Pingentes de Micanga.pdf', checkout: 'TROCAR-CHECKOUT-PINGENTES' },
    { slug: 'tiaras', titulo: '16 Tiaras de Miçanga',
      sub: 'Arcos forrados de miçanga, do folclórico ao colorido.',
      paginas: 17, de: 'R$ 27', por: 'R$ 12,90', liberado: true,
      capa: 'assets/capas/tiaras.webp',
      pdf: 'arquivos/16 Tiaras de Micanga.pdf', checkout: 'TROCAR-CHECKOUT-TIARAS' },
  ],

  // A aba Aulas: o MÓDULO INTEIRO está bloqueado, e a tela mostra só um cadeado e o
  // aviso. Listar sete aulas que não abrem cria expectativa e frustra; um módulo
  // fechado é honesto e não promete data.
  //
  // Quando as aulas existirem: troque `bloqueado` para false e preencha `lista` com
  // { n, titulo, sub, dur, video }. A tela passa a renderizar os cards.
  aulasModulo: {
    bloqueado: true,
    titulo: 'Módulo bloqueado temporariamente',
    texto: 'As videoaulas da coleção estão em gravação. Assim que a primeira entrar no ar, você é avisada por e-mail.',
    lista: [],
  },
};

// atalho para o leitor achar qualquer livro pelo slug, seja principal ou bonus
// o leitor acha qualquer material pelo slug: principal, bonus ou extra liberado
CATALOGO.porSlug = (slug) =>
  slug === 'principal' ? CATALOGO.principal
    : CATALOGO.bonus.find(b => b.slug === slug)
    || CATALOGO.ofertas.find(o => o.slug === slug && o.liberado);
