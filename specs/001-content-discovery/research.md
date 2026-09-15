# Technical Research: Fluxo de Descoberta de Conteúdo (Episodic)

**Feature**: `001-content-discovery`  
**Date**: 2026-09-15  
**Context**: Definição das decisões arquiteturais, consumo da API TMDB, gerenciamento de estado e bibliotecas para o MVP Episodic.

---

## 1. Roteamento & Navegação (React Router)

### Decisão
Utilizar `react-router-dom` (versão 7 ou 6.x) configurando o roteador declarativo com `BrowserRouter`, `Routes` e `Route`.
- Rotas definidas:
  - `/`: `Home`
  - `/descobrir`: `Discover`
  - `/resultados`: `Results`
  - `/filme/:id`: `Details` (abrange filmes e séries via parâmetro dinâmico)
- Layout base: `MainLayout` envelopando as rotas para fornecer o `Header` global e container responsivo.

### Racional
O React Router é o padrão de mercado para SPAs em React, amplamente ensinado e alinhado ao princípio pedagógico do projeto. Permite navegação fluida sem recarregamento de página, suporte a parâmetros de rota (`useParams`) e passagem de estado de navegação (`navigate('/resultados', { state: { preferences } })`).

### Alternativas Consideradas
- *Gerenciamento manual por estado condicional*: Descartado por violar os requisitos do projeto de rotas explícitas e impedir navegação com botão "Voltar" do navegador.
- *TanStack Router*: Mais complexo do que o necessário para o escopo enxuto do MVP.

---

## 2. Consumo da API TMDB (The Movie Database)

### Decisão
Centralizar as chamadas HTTP no módulo `src/services/tmdb.js` utilizando a Fetch API nativa do browser com `async/await`.
- **Configuração**:
  - Variável de ambiente: `VITE_TMDB_API_KEY` (chave v3 ou token v4 de leitura).
  - Base URL: `https://api.themoviedb.org/3`
  - Imagens: Base URL `https://image.tmdb.org/t/p/w500` (pôsteres) e `https://image.tmdb.org/t/p/w1280` (backdrops).
  - Idioma padrão: `pt-BR`.
- **Endpoints Utilizados**:
  1. `/discover/movie` e `/discover/tv`:
     - Parâmetros: `api_key`, `language=pt-BR`, `sort_by=popularity.desc`, `with_genres={genre_id}`, `vote_count.gte=100`, `vote_average.gte={min_rating}`.
  2. `/movie/{id}` e `/tv/{id}`:
     - Parâmetros: `api_key`, `language=pt-BR`.
  3. `/genre/movie/list` e `/genre/tv/list`:
     - Obtenção dos identificadores oficiais de gêneros do TMDB.

### Mapeamento: Quiz (Tipo + Gênero + Clima) → TMDB
- **Tipo de Conteúdo**:
  - "Filme" → Endpoint `/discover/movie`
  - "Série" → Endpoint `/discover/tv`
- **Gênero Selecionado**:
  - Mapeado diretamente para o `genre_id` oficial do TMDB (ex.: Ação = 28 / 10759, Comédia = 35, Drama = 18, Ficção = 878 / 10765, Suspense = 53 / 96, Animação = 16).
- **Clima da Sessão (Vibe/Mood)**:
  - *"Leve e divertido"*: Reforça comédias/animações com classificação indicativa livre e ordenação por popularidade;
  - *"Tenso e eletrizante"*: Adiciona filtro `with_genres` com suspense/ação e nota mínima `vote_average.gte=6.5`;
  - *"Emocionante e profundo"*: Direciona para dramas com boa aceitação crítica (`sort_by=vote_average.desc` com `vote_count.gte=300`);
  - *"Para explodir a mente"*: Combina ficção científica e mistério.

### Racional
A API v3 do TMDB é pública, gratuita para fins educativos, estável e fornece dados ricos e metadados em português.

### Alternativas Consideradas
- *OMDb API*: Possui limites diários restritivos na chave gratuita e menor riqueza de imagens/backdrops.
- *Dados mockados*: Rejeitado categoricamente pela Constituição (Princípio IV: Dados Reais).

---

## 3. Gerenciamento de Estado & Ciclo de Vida

### Decisão
Utilizar estritamente os hooks nativos do React:
- `useState`:
  - Na página `Discover`: controle do passo atual do quiz (`step`), respostas parciais (`contentType`, `genreId`, `mood`) e validação de avanço.
  - Na página `Results`: lista de títulos retornados (`movies`), estado booleano de `loading` e string de `error`.
  - Na página `Details`: dados completos da obra (`movie`), `loading` e `error`.
- `useEffect`:
  - Disparar a busca da API no carregamento de `Results` a partir das preferências recebidas via `location.state` ou parâmetros.
  - Disparar a busca de detalhes no carregamento de `Details` reagindo à mudança do parâmetro `:id`.

### Racional
Conforme o Princípio III da Constituição, ferramentas externas de gerenciamento global como Redux ou Zustand adicionariam complexidade desnecessária a um fluxo que pode ser resolvido com elegância via `useState` e props.

---

## 4. Biblioteca de Ícones

### Decisão
Utilizar `lucide-react`.
- Ícones previstos:
  - `Play`, `Tv`, `Film`, `Compass`, `ArrowLeft`, `ArrowRight`, `RotateCcw`, `Star`, `Clock`, `Calendar`, `AlertCircle`, `Loader2`.

### Racional
`lucide-react` é moderna, modular (tree-shakable), altamente configurável em cor e tamanho, e visualmente alinhada ao design de plataformas de streaming contemporâneas.

---

## 5. Estratégia de Identidade Visual & Responsividade

### Decisão
- **Tema Escuro (Dark Theme)**:
  - Fundo predominante: `#0f1014` / `#15181f`.
  - Superfícies dos cards: `#1c202a` com bordas sutis `#2d3446`.
  - Cores de destaque (Accent): Roxo/Azul vibrante `#6366f1` / `#818cf8` ou Vermelho streaming `#e50914` para botões principais e seleção ativa.
  - Tipografia: Texto principal `#f8fafc`, texto secundário `#94a3b8`.
- **Responsividade**:
  - CSS com abordagem mobile-first utilizando CSS Flexbox e CSS Grid.
  - Breakpoint principal: Mobile (< 768px) em coluna única / 2 colunas para cards; Desktop (>= 768px) em grid de 4 a 5 colunas para recomendações.

