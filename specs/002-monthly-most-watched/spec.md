# Feature Specification: Mais Assistidos do Mês na Home

**Feature Branch**: `002-monthly-most-watched`

**Created**: 2026-09-16

**Status**: Draft

**Input**: User description: "Criar uma nova seção na página Home chamada \"Mais assistidos do mês\". A seção deve aparecer logo após o botão principal da Home e apresentar os 3 filmes ou séries mais assistidos no mês atual. Cada item deve apresentar sua imagem de capa, título e posição no ranking. O layout deve seguir o design visual já definido para o Episodic, mantendo o tema escuro e sendo responsivo."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visualização dos Mais Assistidos do Mês na Home (Priority: P1)

Como um visitante da página inicial que ainda não decidiu o que assistir,  
Quero visualizar logo após o botão principal uma seção em destaque chamada "Mais assistidos do mês" com os 3 títulos mais populares do momento,  
Para que eu tenha sugestões imediatas e confiáveis de alta repercussão sem esforço de busca.

**Why this priority**: Constitui o núcleo de valor da funcionalidade solicitada. Enriquece a tela inicial com inspirações imediatas antes mesmo de o usuário iniciar o quiz de descoberta.

**Independent Test**: Pode ser testado acessando a página inicial da aplicação e verificando se, imediatamente abaixo do botão principal de ação, é renderizada a seção "Mais assistidos do mês" com exatamente 3 itens numerados (1º, 2º e 3º), cada um exibindo capa, título e distintivo de ranking.

**Acceptance Scenarios**:

1. **Given** que o usuário acessa a página inicial do Episodic,  
   **When** a página termina de carregar,  
   **Then** a seção "Mais assistidos do mês" deve estar visível imediatamente após o botão principal ("Encontrar algo para assistir"), contendo 3 cards em destaque.
2. **Given** que os 3 títulos em destaque são apresentados,  
   **When** o usuário inspeciona cada card,  
   **Then** cada card deve exibir com clareza o distintivo da sua posição no ranking (1, 2 e 3), a imagem do pôster/capa e o nome da produção.

---

### User Story 2 - Acesso aos Detalhes da Produção Ranqueada (Priority: P2)

Como um usuário interessado em uma das produções do Top 3,  
Quero poder clicar ou tocar no card de um dos itens mais assistidos,  
Para abrir a página com as informações completas daquela obra (sinopse, nota, duração e gêneros).

**Why this priority**: Garante fluidez e continuidade na experiência de descoberta, permitindo ao usuário aprofundar seu interesse por uma das produções em alta.

**Independent Test**: Pode ser testado clicando em qualquer um dos 3 cards da vitrine e verificando o direcionamento correto para a tela de detalhes correspondente, com possibilidade de retorno à Home.

**Acceptance Scenarios**:

1. **Given** que o usuário está visualizando a seção "Mais assistidos do mês",  
   **When** ele clica no card do título posicionado em 1º lugar,  
   **Then** o sistema deve navegar diretamente para a tela de detalhes daquela produção.
2. **Given** que o usuário está na tela de detalhes aberta a partir da vitrine,  
   **When** ele utiliza o controle de navegação para retornar,  
   **Then** ele deve retornar à página inicial preservando o estado da interface.

---

### User Story 3 - Apresentação Responsiva e Estados Visuais Resilientes (Priority: P3)

Como um usuário navegando em qualquer tipo de tela (smartphone ou desktop),  
Quero que a seção dos mais assistidos se adapte perfeitamente ao meu viewport e apresente feedback visual limpo durante o carregamento ou em eventuais indisponibilidades,  
Para que a minha experiência seja confortável e a página inicial permaneça sempre utilizável e estável.

**Why this priority**: Assegura a consistência visual em múltiplos dispositivos e a integridade da tela inicial mesmo diante de lentidão ou oscilação de rede.

**Independent Test**: Pode ser testado redimensionando o viewport de 360px a 1920px (e simulando conexão lenta/offline) e verificando se os cards se organizam confortavelmente e exibem placeholders ou feedbacks não-bloqueantes.

**Acceptance Scenarios**:

1. **Given** um usuário acessando por smartphone (< 640px),  
   **When** a seção é renderizada,  
   **Then** os 3 itens devem se organizar de forma empilhada ou em grade compacta sem cortes horizontais de tela e com toque confortável.
2. **Given** um usuário em desktop (>= 768px),  
   **When** a seção é renderizada,  
   **Then** os 3 itens devem aparecer alinhados horizontalmente em 3 colunas harmoniosas.
3. **Given** uma requisição de catálogo em andamento,  
   **When** a seção estiver carregando,  
   **Then** deve ser exibido um estado de carregamento sutil (skeleton ou indicador coerente) no espaço da seção, sem deslocamento abrupto de layout.

---

### Edge Cases

- **Falha de comunicação com o catálogo externo**: Caso ocorra instabilidade temporária na obtenção dos dados do ranking, a seção deve apresentar uma mensagem amigável e discreta de indisponibilidade momentânea ou omitir a vitrine sem prejudicar o restante da página inicial nem o botão de quiz.
- **Obra sem imagem de capa cadastrada**: Caso uma produção do Top 3 não possua imagem de pôster oficial disponível no catálogo, o card deve renderizar um placeholder visual padronizado em tema escuro contendo o ícone da categoria e o título da obra.
- **Título com nome excessivamente longo**: Caso o nome da obra ultrapasse o espaço disponível no card, o texto deve truncar elegantemente em no máximo 2 linhas, preservando a altura uniforme dos 3 cards.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE disponibilizar na página inicial uma seção dedicada com o título legível "Mais assistidos do mês".
- **FR-002**: A seção DEVE ser posicionada logo após o botão principal de ação da Home ("Encontrar algo para assistir") e antes da seção informativa de funcionamento do quiz.
- **FR-003**: A seção DEVE apresentar exatamente as 3 primeiras produções (filmes ou séries) com maior popularidade/audiência registradas no mês atual a partir de dados reais do catálogo externo.
- **FR-004**: Cada um dos 3 itens DEVE conter obrigatoriamente:
  - Distintivo ou marcador visual proeminente indicando sua posição ordinal no ranking (1º, 2º e 3º lugares);
  - Imagem vertical de capa (pôster) da produção;
  - Título oficial da obra.
- **FR-005**: O sistema DEVE permitir a interação de clique/toque em qualquer um dos cards do ranking, conduzindo o usuário para a página de detalhes da produção selecionada.
- **FR-006**: O sistema DEVE exibir um indicador visual de carregamento (ex.: skeleton cards) enquanto as informações do Top 3 estiverem sendo recuperadas.
- **FR-007**: O sistema DEVE seguir com rigor a identidade visual estabelecida para o Episodic:
  - Fundo escuro com paleta em tons de preto e cinzas profundos;
  - Cor de destaque vermelho `#AD1818` para elementos de realce, bordas ativas e distintivos do ranking;
  - Ausência total de gradientes cromáticos (utilização estrita de cores sólidas e chapadas).
- **FR-008**: O sistema DEVE ser responsivo, exibindo os 3 cards em 3 colunas proporcionais em telas grandes (desktop) e ajustando a exibição em coluna única ou formato compacto em dispositivos móveis.
- **FR-009**: Em caso de falha de carregamento do catálogo para o ranking, o sistema DEVE lidar com a falha graciosamente, sem interromper o funcionamento dos demais componentes e botões da página inicial.

### Key Entities *(include if feature involves data)*

- **TopRankedItem**: Representa cada uma das 3 obras em destaque no ranking mensal.
  - *Atributos*: `id` (identificador único no catálogo), `title` (nome da obra), `posterUrl` (URL da imagem de capa vertical), `rankPosition` (número ordinal: 1, 2 ou 3), `mediaType` (filme ou série de TV), `voteAverage` (nota média do público, se aplicável).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A seção "Mais assistidos do mês" é carregada e visível na página inicial em 100% das sessões onde o catálogo externo estiver acessível.
- **SC-002**: A seção apresenta invariavelmente os 3 primeiros colocados do ranking, cada um acompanhado de sua respectiva posição ordinal (1, 2, 3), pôster e título.
- **SC-003**: 100% dos cliques em qualquer item do ranking redirecionam com sucesso para a tela de detalhes correspondente em menos de 1 segundo sob condições normais de rede.
- **SC-004**: O layout mantém integridade estética sem overflow horizontal em telas com largura a partir de 320px até resoluções 4K.
- **SC-005**: A seção adota 100% de conformidade com a paleta oficial (vermelho `#AD1818` e escala de pretos/neutros), sem qualquer emprego de degradês ou gradientes.

## Assumptions

- Os dados de audiência/popularidade do mês são obtidos através da consulta à API real de entretenimento já integrada ao Episodic (TMDB), utilizando filtros de tendências/popularidade do período.
- A seleção pode englobar tanto filmes quanto séries, conforme os dados de destaque do catálogo.
- Não é necessário implementar paginação ou expansão para um "Top 10" no escopo desta funcionalidade, atendo-se estritamente aos 3 itens mais assistidos conforme solicitado.
- Não há necessidade de autenticação de usuários nem persistência de favoritos para a visualização do ranking, mantendo conformidade total com o Princípio II (MVP e Simplicidade) da Constituição.

