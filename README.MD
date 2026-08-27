# Clube do Cheiro Verde

Landing page de um clube de assinatura fictício de temperos artesanais brasileiros.
Todo mês o clube escolhe uma região do país, compra direto de quem planta e mói os
temperos na mesma semana em que a caixa sai para a casa do assinante.

Feito com HTML, CSS e JavaScript puro — **sem frameworks, sem build, sem dependências**.

## Índice

- [Demonstração](#demonstração)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como rodar](#como-rodar)
- [Seções da página](#seções-da-página)
- [Funcionalidades](#funcionalidades)
- [Design](#design)
- [Acessibilidade](#acessibilidade)
- [Responsividade](#responsividade)
- [Personalização](#personalização)
- [Compatibilidade](#compatibilidade)
- [Licença](#licença)

## Demonstração

Abra o arquivo `index.html` em qualquer navegador. A página é totalmente estática,
então também pode ser publicada direto no GitHub Pages, Netlify, Vercel ou qualquer
servidor de arquivos.

## Estrutura do projeto

```
.
├── index.html      # marcação da página inteira (uma página só)
├── styles.css      # folha de estilo completa, em 15 blocos numerados
├── script.js       # comportamento da página, em JavaScript puro (IIFE)
├── fotos/          # retratos usados nos depoimentos
│   ├── anderson.jpg
│   ├── cleo.jpg
│   └── rita.jpg
└── README.md
```

## Como rodar

Não há passo de build nem instalação de pacotes.

**Opção 1 — abrir direto:**

```bash
open index.html
```

**Opção 2 — servidor local** (recomendado, evita restrições de arquivo local):

```bash
# Python 3
python3 -m http.server 8000

# ou Node
npx serve .
```

Depois acesse `http://localhost:8000`.

## Seções da página

| Seção | Âncora | O que traz |
|---|---|---|
| Cabeçalho | `#topo` | Marca, navegação e botão de assinar |
| Hero | — | Chamada principal e a prateleira de pigmentos |
| Como funciona | `#como-funciona` | Os três passos do ciclo mensal (hoje, dia 12, dia 16) |
| Planos | `#planos` | Pitada, Colher e Panela, com alternância de ciclo |
| Depoimentos | `#depoimentos` | Três assinantes com foto e origem |
| Rodapé | `#contato` | Contato, endereço, links e dados da empresa |

## Funcionalidades

Todo o comportamento vive em `script.js`, dividido em seis blocos:

1. **Menu do celular** — botão hambúrguer que abre e fecha a navegação, com
   `aria-expanded` sincronizado. Clicar em um link fecha o menu.
2. **Cabeçalho fixo** — ganha fundo sólido depois de 40 px de rolagem
   (listener `passive`, sem custo de scroll).
3. **Prateleira de pigmentos** — o elemento-assinatura da página. Seis faixas
   coloridas (urucum, açafrão-da-terra, jambu, rosa-pimenta, pimenta-biquinho e
   cumaru); ao tocar em uma, abre a ficha com origem e nota de sabor. O primeiro
   pigmento abre sozinho após a animação de entrada.
4. **Ciclo de cobrança** — alterna entre mensal e trimestral (−12%). Os preços e
   as linhas de cobrança vêm dos atributos `data-mensal` e `data-trimestral` no
   próprio HTML, então mudar valores não exige mexer no JavaScript.
5. **Doses** — cada plano desenha, via JS, uma faixa de pigmento por tempero
   incluído (3, 5 ou 8), reaproveitando a paleta da casa.
6. **Revelação no scroll** — `IntersectionObserver` revela passos, planos e
   depoimentos em cascata, com atraso escalonado de 90 ms.

## Design

A folha de estilo é organizada em 15 blocos numerados e comentados. A página
desce por uma escala de pigmentos: **tinta → papel → açafrão → jambu**.

Tokens definidos em `:root`:

```css
--tinta:    #16100B;   --papel:    #F2EBDB;
--urucum:   #B5330E;   --acafrao:  #E9AE2B;
--jambu:    #2F5A33;   --rosa:     #C9647A;
--biquinho: #B7202B;   --cumaru:   #56331E;
```

**Tipografia:** Piazzolla (serifada, para títulos) e Archivo (sem serifa, para o
corpo), ambas carregadas do Google Fonts com `preconnect` e fallbacks de sistema.

**Espaçamento fluido:** `--margem` e `--respiro` usam `clamp()`, então a página
respira proporcionalmente em vez de saltar entre breakpoints.

## Acessibilidade

- Link "Pular para o conteúdo" no topo, visível apenas ao receber foco.
- HTML semântico: `header`, `nav`, `main`, `section`, `article`, `figure`,
  `blockquote`, lista ordenada nos passos.
- `aria-expanded` no menu e em cada pigmento; `aria-pressed` nos botões de ciclo;
  `aria-label` na navegação e no grupo de cobrança.
- Elementos decorativos marcados com `aria-hidden="true"`.
- Foco visível com contorno em açafrão (`:focus-visible`), e a ficha do pigmento
  abre pela navegação por teclado.
- Imagens dos depoimentos com `alt=""` (decorativas — o nome está no texto),
  `width`/`height` para evitar salto de layout, e `loading="lazy"`.
- `prefers-reduced-motion` respeitado tanto no CSS quanto no JS: sem animações,
  a revelação acontece de imediato.

## Responsividade

Três faixas de layout:

- **Acima de 900 px** — layout completo, prateleira na horizontal.
- **Até 900 px** — ajustes de grade nas seções.
- **Até 760 px** — menu vira hambúrguer e o conteúdo empilha em coluna única.

## Personalização

- **Trocar cores:** edite os tokens no bloco 1 de `styles.css`. A paleta em
  `pigmentosDaCasa` (`script.js`) espelha esses valores nas doses dos planos.
- **Mudar preços:** altere `data-mensal` e `data-trimestral` nos elementos
  `.plano__valor` e `.plano__cobranca` em `index.html`.
- **Trocar os pigmentos:** cada botão `.pigmento` no HTML traz sua própria cor
  em `--cor` e sua ordem em `--i`, além do nome, da origem e da nota.
- **Depoimentos:** substitua as fotos em `fotos/` mantendo o formato quadrado
  (320 × 320).

## Compatibilidade

Funciona em qualquer navegador moderno. `IntersectionObserver` tem fallback:
onde não existir, todo o conteúdo aparece revelado desde o início.

## Licença

Projeto de estudo. Textos, marca, endereço, CNPJ e depoimentos são fictícios.
