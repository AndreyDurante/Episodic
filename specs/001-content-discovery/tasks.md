# Tasks: Fluxo de Descoberta de Conteúdo e Recomendações (Episodic)

**Input**: Design documents from `specs/001-content-discovery/` (`plan.md`, `spec.md`, `data-model.md`, `contracts/`, `research.md`, `quickstart.md`)  
**Prerequisites**: `plan.md` (arquitetura e stack), `spec.md` (user stories priorizadas P1 a P3), `data-model.md` (entidades), `contracts/` (API TMDB e component props)

---

## Format: `[ID] [P?] [Story] Description with exact file path`

- **[P]**: Tarefas executáveis em paralelo (arquivos distintos, sem dependências pendentes)
- **[Story]**: Mapeamento para a respectiva User Story (`[US1]`, `[US2]`, `[US3]`)
- Toda tarefa possui caminho de arquivo explícito

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicialização de dependências, variáveis de ambiente e estilos globais do projeto.

- [X] T001 Adicionar dependências `react-router-dom` e `lucide-react` em `package.json`
- [X] T002 [P] Criar template de variáveis de ambiente com configurações do TMDB em `.env.example`
- [X] T003 [P] Configurar estilos globais, reset e variáveis do tema escuro (dark streaming) em `src/index.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestrutura compartilhada, cliente HTTP TMDB, casca visual e roteamento que bloqueiam as User Stories.

**⚠️ CRITICAL**: Nenhuma User Story pode ser iniciada antes da conclusão desta fase.

- [X] T004 Implementar cliente base da API TMDB com tratamento de URLs e erros em `src/services/tmdb.js`
- [X] T005 [P] Implementar componente de botão reutilizável e suas variantes estilizadas em `src/components/Button/Button.jsx` e `src/components/Button/Button.css`
- [X] T006 [P] Implementar componente de cabeçalho global com logo e navegação em `src/components/Header/Header.jsx` e `src/components/Header/Header.css`
- [X] T007 Implementar componente de layout principal com Header e Outlet do React Router em `src/layouts/MainLayout/MainLayout.jsx` e `src/layouts/MainLayout/MainLayout.css`
- [X] T008 Configurar roteamento declarativo da aplicação com as rotas `/`, `/descobrir`, `/resultados` e `/filme/:id` em `src/routes/AppRoutes.jsx`
- [X] T009 Atualizar componente raiz para renderizar o provedor de rotas da aplicação em `src/App.jsx`

**Checkpoint**: Fundação técnica estabelecida - implementação das User Stories pode ser iniciada.

---

## Phase 3: User Story 1 - Descoberta de Títulos via Quiz de Preferências (Priority: P1) 🎯 MVP

**Goal**: Permitir que o usuário acesse a Home, clique em "Encontrar algo para assistir", responda ao quiz de 3 etapas (Tipo, Gênero, Clima), visualize a tela de carregamento e receba uma lista de recomendações com dados reais do TMDB.

**Independent Test**: Iniciar na página `/`, avançar para `/descobrir`, selecionar tipo, gênero e clima, confirmar a busca e validar que a tela `/resultados` consulta o TMDB, exibe estado de loading e apresenta a grade de cards com pôster, título e nota média.

### Implementation for User Story 1

- [X] T010 [P] [US1] Implementar componente de barra de progresso do quiz em `src/components/ProgressBar/ProgressBar.jsx` e `src/components/ProgressBar/ProgressBar.css`
- [X] T011 [P] [US1] Implementar card interativo de seleção de opção com ícones em `src/components/OptionCard/OptionCard.jsx` e `src/components/OptionCard/OptionCard.css`
- [X] T012 [P] [US1] Implementar componente de apresentação da pergunta e opções do quiz em `src/components/QuizQuestion/QuizQuestion.jsx` e `src/components/QuizQuestion/QuizQuestion.css`
- [X] T013 [P] [US1] Implementar componente de estado de carregamento com spinner estilizado em `src/components/Loading/Loading.jsx` e `src/components/Loading/Loading.css`
- [X] T014 [P] [US1] Implementar componente de exibição de erro com botão de retry em `src/components/ErrorMessage/ErrorMessage.jsx` e `src/components/ErrorMessage/ErrorMessage.css`
- [X] T015 [P] [US1] Implementar componente de estado vazio para buscas sem resultados em `src/components/EmptyState/EmptyState.jsx` e `src/components/EmptyState/EmptyState.css`
- [X] T016 [P] [US1] Implementar card de exibição de filme/série com pôster, título, ano e avaliação em `src/components/MovieCard/MovieCard.jsx` e `src/components/MovieCard/MovieCard.css`
- [X] T017 [US1] Implementar grid responsivo para renderização da lista de MovieCards em `src/components/MovieGrid/MovieGrid.jsx` e `src/components/MovieGrid/MovieGrid.css`
- [X] T018 [US1] Implementar funções de consulta de gêneros e descoberta de filmes/séries (`getRecommendations`, `getGenres`) em `src/services/tmdb.js`
- [X] T019 [US1] Implementar página Home com banner de destaque e CTA "Encontrar algo para assistir" em `src/pages/Home/Home.jsx` e `src/pages/Home/Home.css`
- [X] T020 [US1] Implementar página Discover com controle de etapas do quiz (1 a 3) e estado de preferências em `src/pages/Discover/Discover.jsx` e `src/pages/Discover/Discover.css`
- [X] T021 [US1] Implementar página Results consumindo a API TMDB com tratamento de estados (loading, success, empty, error) em `src/pages/Results/Results.jsx` e `src/pages/Results/Results.css`

**Checkpoint**: Neste estágio, a User Story 1 está 100% funcional de ponta a ponta, compondo o MVP essencial da aplicação!

---

## Phase 4: User Story 2 - Visualização Detalhada do Conteúdo Escolhido (Priority: P2)

**Goal**: Permitir que o usuário clique em qualquer card de recomendação e visualize informações detalhadas (backdrop, pôster, sinopse completa, ano, notas, duração/temporadas) na rota `/filme/:id`, com opção de retornar para a lista de resultados.

**Independent Test**: Clicar em qualquer título recomendado na página `/resultados` (ou acessar `/filme/:id` diretamente), validar o carregamento dos detalhes completos da produção do TMDB e clicar no botão "Voltar" preservando os resultados da busca anterior.

### Implementation for User Story 2

- [X] T022 [US2] Implementar função de busca de detalhes por ID de filme ou série (`getContentDetails`) em `src/services/tmdb.js`
- [X] T023 [US2] Implementar página Details com imagem de destaque, sinopse, metadados e navegação de retorno em `src/pages/Details/Details.jsx` e `src/pages/Details/Details.css`
- [X] T024 [US2] Integrar ação de clique no MovieCard para navegar até a rota de detalhes `/filme/:id` em `src/components/MovieCard/MovieCard.jsx`

**Checkpoint**: User Stories 1 e 2 estão completamente funcionais e integradas de forma independente.

---

## Phase 5: User Story 3 - Refazer o Quiz e Ajustar Critérios de Descoberta (Priority: P3)

**Goal**: Permitir ao usuário recomeçar o quiz ou redefinir seus critérios de busca facilmente a partir das páginas de resultados ou de detalhes, sem necessidade de recarregar o navegador.

**Independent Test**: Clicar em "Refazer Quiz" na página `/resultados` ou "Nova Descoberta" em `/filme/:id` e confirmar que o usuário é redirecionado para `/descobrir` na Etapa 1 com as respostas redefinidas.

### Implementation for User Story 3

- [X] T025 [US3] Integrar ação "Refazer Quiz" no cabeçalho da página de resultados e no EmptyState em `src/pages/Results/Results.jsx`
- [X] T026 [US3] Integrar ação "Nova Descoberta" na barra de ações da página de detalhes em `src/pages/Details/Details.jsx`

**Checkpoint**: Todas as histórias de usuário (P1, P2, P3) implementadas e operando harmoniosamente.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Ajustes visuais finos, limpeza de artefatos padrão e validação de linter e roteiro completo.

- [X] T027 [P] Revisar responsividade fluida para resoluções mobile (360px a 430px) e desktop em `src/index.css`
- [X] T028 [P] Remover arquivos não utilizados do boilerplate padrão do Vite (`src/App.css`, ícones SVG não utilizados) em `src/`
- [X] T029 Executar verificação de linter e corrigir avisos/erros de código com `npm run lint` em `eslint.config.js`
- [ ] T030 Executar validação de todos os cenários do guia de aceitação em `specs/001-content-discovery/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Sem dependências prévias - inicia imediatamente.
- **Foundational (Phase 2)**: Depende da conclusão da Fase 1 (Setup) - **BLOQUEIA** todas as histórias de usuário.
- **User Story 1 (Phase 3 - P1)**: Depende da conclusão da Fase 2 (Foundational).
- **User Story 2 (Phase 4 - P2)**: Depende da Fase 2 e integra-se com os cards desenvolvidos na User Story 1.
- **User Story 3 (Phase 5 - P3)**: Depende das páginas de Results (US1) e Details (US2).
- **Polish (Phase 6)**: Depende da conclusão de todas as histórias desejadas para entrega.

### User Story Dependencies

```text
[Phase 1: Setup]
       ↓
[Phase 2: Foundational (Router, Layout, TMDB Base Client)]
       ↓
[Phase 3: User Story 1 (P1 - Core Discovery & Results)] ──► [MVP Entregável!]
       ↓
[Phase 4: User Story 2 (P2 - Details Screen & Back Navigation)]
       ↓
[Phase 5: User Story 3 (P3 - Restart Quiz Action)]
       ↓
[Phase 6: Polish, Linting & E2E Validation]
```

---

## Parallel Execution Opportunities

### Parallel Tasks in Phase 1 (Setup)
- `T002` (.env.example) e `T003` (index.css) podem ser executadas em paralelo após `T001`.

### Parallel Tasks in Phase 2 (Foundational)
- `T005` (Button) e `T006` (Header) podem ser desenvolvidas em paralelo.

### Parallel Tasks in Phase 3 (User Story 1)
- Componentes de apresentação isolados podem ser criados em paralelo:
  - `T010` (ProgressBar)
  - `T011` (OptionCard)
  - `T012` (QuizQuestion)
  - `T013` (Loading)
  - `T014` (ErrorMessage)
  - `T015` (EmptyState)
  - `T016` (MovieCard)

---

## Implementation Strategy

### MVP First (User Story 1 Focus)
1. Executar **Fase 1 (Setup)** e **Fase 2 (Foundational)**.
2. Implementar os componentes e páginas da **Fase 3 (User Story 1)**.
3. **Parar e Validar**: Testar a jornada `/` → `/descobrir` → `/resultados`. Neste ponto o MVP já resolve com sucesso o problema do usuário ("o que assistir?").

### Incremental Delivery
1. Foundation + US1 = **MVP Funcional** 🎯
2. Adicionar US2 = **Experiência Enriquecida com Sinopse & Detalhes**
3. Adicionar US3 = **Usabilidade Refinada para Múltiplas Tentativas**
4. Polish = **Conformidade de Estilo e Padrões Pedagógicos**
