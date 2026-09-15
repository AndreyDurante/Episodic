# Feature Specification: Fluxo de Descoberta de Conteúdo e Recomendações

**Feature Branch**: `001-content-discovery`

**Created**: 2026-09-15

**Status**: Draft

**Input**: User description: "Desenvolver o MVP web focado em solucionar o problema de usuários que desejam assistir a um filme ou série, mas não sabem o que escolher. Fluxo: Página inicial → 'Encontrar algo para assistir' → Quiz (Tipo de conteúdo → Gênero → Clima da sessão) → Buscar recomendações → Carregamento → Resultados → Selecionar conteúdo → Detalhes."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Descoberta de Títulos via Quiz de Preferências (Priority: P1)

Como uma pessoa indecisa sobre o que assistir no momento, desejo responder a um quiz rápido de 3 perguntas para receber uma lista de sugestões relevantes de filmes ou séries baseadas no meu gosto e momento atual.

**Why this priority**: É a proposta de valor central do produto (MVP). Sem esse fluxo de descoberta, a aplicação não cumpre seu propósito primário de eliminar a dúvida e a paralisia de escolha.

**Independent Test**: Pode ser testado de ponta a ponta iniciando na tela inicial, clicando em "Encontrar algo para assistir", preenchendo as 3 etapas do quiz (tipo de conteúdo, gênero e clima da sessão) e verificando a apresentação de uma lista de recomendações com dados reais compatíveis com as escolhas.

**Acceptance Scenarios**:

1. **Given** que o usuário está na tela inicial, **When** clica no botão principal "Encontrar algo para assistir", **Then** a aplicação navega para o quiz e exibe a primeira pergunta (Tipo de conteúdo: Filme ou Série).
2. **Given** que o usuário está no quiz, **When** seleciona sucessivamente o tipo de conteúdo, o gênero desejado e o clima da sessão (ex.: leve, tenso, emocionante) e confirma a busca, **Then** a aplicação transiciona para um estado visual de carregamento enquanto consulta o catálogo externo de entretenimento.
3. **Given** que a consulta de catálogo é concluída com sucesso, **When** a tela de resultados é renderizada, **Then** a aplicação exibe uma grade/lista de cards contendo pôster do título, nome da obra, ano de lançamento e nota média de avaliação.

---

### User Story 2 - Visualização Detalhada do Conteúdo Escolhido (Priority: P2)

Como uma pessoa que recebeu uma lista de recomendações, desejo consultar detalhes complementares de uma produção específica (sinopse, classificação, duração/temporadas) para decidir se quero assisti-la de fato.

**Why this priority**: É o complemento direto da recomendação (P2). Saber apenas o título e a capa muitas vezes não é suficiente para o usuário bater o martelo sobre a escolha.

**Independent Test**: Pode ser testado selecionando qualquer card de título a partir da tela de resultados e verificando se os detalhes completos da produção são apresentados corretamente, bem como a possibilidade de retornar para a lista de resultados sem perder o estado anterior.

**Acceptance Scenarios**:

1. **Given** que o usuário visualiza a lista de recomendações, **When** clica no card ou no botão de detalhes de um item específico, **Then** a aplicação exibe a visão detalhada com imagem de destaque, título original/traduzido, sinopse completa, ano, gêneros e nota.
2. **Given** que o usuário está visualizando os detalhes de uma obra, **When** ele clica no botão de voltar, **Then** a aplicação o conduz de volta para a lista de recomendações preservando o contexto da busca realizada.

---

### User Story 3 - Refazer o Quiz e Ajustar Critérios de Descoberta (Priority: P3)

Como um usuário que não se interessou pelas sugestões recebidas ou que mudou de ideia, desejo reiniciar o quiz facilmente para testar uma nova combinação de preferências.

**Why this priority**: Melhora a usabilidade e a retenção do usuário (P3), permitindo novas tentativas sem a necessidade de recarregar manualmente a aplicação.

**Independent Test**: Pode ser testado clicando em "Refazer Quiz" ou "Nova Descoberta" na tela de resultados ou na tela de detalhes, confirmando que o quiz volta para a primeira pergunta pronto para novas escolhas.

**Acceptance Scenarios**:

1. **Given** que o usuário está na tela de resultados ou de detalhes, **When** ele aciona a opção "Refazer Quiz", **Then** a aplicação limpa as respostas anteriores e o posiciona no início do questionário.

---

### Edge Cases

- **Ausência de correspondências exatas no catálogo**: Caso a combinação de tipo de conteúdo, gênero e clima não retorne nenhum item no catálogo externo, o sistema deve apresentar uma mensagem amigável e acolhedora (ex.: "Nenhum título encontrado para essa combinação no momento") com atalho direto para ajustar os filtros ou reiniciar o quiz.
- **Falha de rede ou indisponibilidade do catálogo**: Caso ocorra falha de conexão ou timeout durante a busca de recomendações ou detalhes, o sistema deve exibir feedback de erro claro para o usuário final (sem detalhes técnicos ou mensagens obscuras de erro) com um botão destacado para "Tentar novamente".
- **Tentativa de avançar sem selecionar opção no quiz**: Caso o usuário tente avançar para a próxima etapa do quiz sem ter selecionado uma alternativa, a ação de avanço deve permanecer bloqueada ou destacar visualmente que uma seleção é obrigatória.
- **Produção com metadados ou pôster faltantes**: Caso um título retornado pelo catálogo não possua imagem de pôster cadastrada ou tenha sinopse vazia, o sistema deve exibir um elemento visual placeholder padronizado e um texto informativo neutro (ex.: "Sinopse não informada").

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE fornecer uma tela inicial minimalista de apresentação com um botão de ação destacado ("Encontrar algo para assistir") para conduzir o usuário imediatamente ao fluxo de descoberta.
- **FR-002**: O sistema DEVE conduzir o usuário através de um quiz de descoberta estruturado em 3 etapas sequenciais e focadas:
  1. **Tipo de conteúdo**: Filme ou Série;
  2. **Gênero**: Opções populares de categorias temáticas (ex.: Comédia, Ação, Drama, Suspense, Ficção, Romance);
  3. **Clima da sessão (vibe)**: Intenção emocional do usuário (ex.: Para relaxar e rir, Para roer as unhas de suspense, Para se emocionar, Para refletir).
- **FR-003**: O sistema DEVE exigir a seleção de uma resposta válida em cada pergunta antes de permitir o avanço para a etapa subsequente do quiz.
- **FR-004**: O sistema DEVE disparar a consulta ao catálogo externo de entretenimento consolidando as três variáveis escolhidas pelo usuário para filtrar sugestões altamente pertinentes.
- **FR-005**: O sistema DEVE apresentar indicadores visuais de carregamento claros e imersivos durante a busca das recomendações e durante a transição para a tela de detalhes.
- **FR-006**: O sistema DEVE exibir os resultados da recomendação em formato de cards visuais contendo imagem de pôster, título da obra, ano de lançamento e avaliação geral.
- **FR-007**: O sistema DEVE permitir a seleção de qualquer card de conteúdo para abrir uma visão detalhada com imagem de destaque, sinopse legível, ano, gênero e nota.
- **FR-008**: O sistema DEVE permitir ao usuário retornar à tela de resultados a partir da tela de detalhes sem recarregar a busca.
- **FR-009**: O sistema DEVE prover um mecanismo de reinício rápido ("Refazer Quiz") acessível tanto na tela de resultados quanto na tela de detalhes.
- **FR-010**: O sistema DEVE apresentar estados de erro amigáveis com botão de nova tentativa caso a consulta ao catálogo falhe.
- **FR-011**: O sistema DEVE garantir que a interface opere em tema escuro (dark theme) com tipografia de alto contraste e layout adaptável a telas de smartphones e desktops.

### Key Entities

- **QuizPreferences**: Representa a sessão de preferências temporária informada pelo usuário durante o questionário.
  - *Atributos*: `contentType` (filme ou série), `genreId` / `genreName` (gênero temático escolhido), `mood` (clima ou vibe pretendida para a sessão).
- **RecommendedItem**: Representa uma obra de entretenimento retornada pelo catálogo externo e exibida nas recomendações.
  - *Atributos*: `id` (identificador único), `title` (nome da obra), `posterUrl` (imagem de capa vertical), `backdropUrl` (imagem de fundo/destaque horizontal), `overview` (sinopse), `releaseYear` (ano de lançamento), `voteAverage` (nota média do público), `mediaType` (filme ou série).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O usuário consegue completar o quiz de 3 etapas e visualizar as recomendações na tela em menos de 45 segundos contados a partir do primeiro clique na página inicial.
- **SC-002**: 100% dos itens recomendados exibidos correspondem a produções reais disponibilizadas pelo catálogo externo de entretenimento.
- **SC-003**: 95% dos usuários de teste conseguem navegar da lista de recomendações para os detalhes de uma produção e retornar à lista sem perda de estado na primeira tentativa.
- **SC-004**: Em cenários de falha de conexão com o catálogo, o sistema apresenta feedback visual de erro e botão de nova tentativa em menos de 2 segundos após a detecção do erro.
- **SC-005**: 100% das telas e controles da jornada de descoberta são utilizáveis com clareza tanto em visores móveis (360px a 430px de largura) quanto em monitores desktop (1080p e superiores).

## Assumptions

- O catálogo externo de entretenimento disponibiliza pontos de consulta abertos para listar e filtrar obras por tipo (filme/série), gênero e popularidade/avaliação sem necessidade de login do usuário final.
- O catálogo externo responde às buscas públicas no idioma configurado (preferencialmente Português - pt-BR).
- O mapeamento entre o "Clima da sessão" (vibe) e os parâmetros de busca do catálogo será derivado por combinações de gêneros ou palavras-chave adequadas ao objetivo emocional selecionado.
- Não há necessidade de guardar o histórico do quiz após o usuário fechar a aba ou janela do navegador (experiência focada no momento atual).
- A aplicação não exige autenticação, cadastro, armazenamento de favoritos ou rastreamento de progresso de episódios nesta versão MVP.

