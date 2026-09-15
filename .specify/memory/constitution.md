<!--
Sync Impact Report
- Version change: Unratified Template (0.0.0) → 1.0.0
- List of modified principles:
  - [PRINCIPLE_1_NAME] → I. Foco no Problema Principal
  - [PRINCIPLE_2_NAME] → II. MVP e Simplicidade
  - [PRINCIPLE_3_NAME] → III. Desenvolvimento com React
  - [PRINCIPLE_4_NAME] → IV. Dados Reais
  - [PRINCIPLE_5_NAME] → V. Experiência de Descoberta
  - [NEW] → VI. Identidade Visual
  - [NEW] → VII. Responsividade e Acessibilidade
  - [NEW] → VIII. Organização e Padrões de Código
  - [NEW] → IX. Rastreabilidade
- Added sections:
  - Propósito do Projeto
  - Critérios de Qualidade
  - Limites do MVP
  - Princípio de Evolução
  - Governança
- Removed sections:
  - None (placeholders replaced with concrete definitions)
- Templates requiring updates:
  - .specify/templates/plan-template.md: ✅ Aligned (gates dynamically derived from constitution.md)
  - .specify/templates/spec-template.md: ✅ Aligned (requirements & user stories map directly to principles)
  - .specify/templates/tasks-template.md: ✅ Aligned (phase structure and non-scope boundaries aligned)
- Follow-up TODOs:
  - None
-->

# TV Time Discovery MVP Constitution

## Propósito do Projeto

O projeto tem como objetivo desenvolver um MVP (Minimum Viable Product) web em React focado em solucionar o problema de usuários que desejam assistir a um filme ou série, mas enfrentam paralisia de escolha e não sabem qual conteúdo selecionar.

A aplicação simplifica radicalmente o processo de descoberta através de um quiz rápido de preferências, apresentando recomendações relevantes fundamentadas em dados reais obtidos de uma API externa de filmes e séries.

O projeto não tem como objetivo reproduzir todas as funcionalidades da plataforma TV Time nem construir um sistema abrangente de catalogação e acompanhamento contínuo.

## Core Principles

### I. Foco no Problema Principal
- Todas as funcionalidades desenvolvidas DEVEM contribuir de maneira direta para solucionar a descoberta de conteúdo ("o que assistir?").
- O sistema DEVE priorizar uma jornada curta e sem atritos, conduzindo o usuário da dúvida inicial para uma lista curada de opções relevantes no menor tempo possível.
- Funcionalidades que não contribuam diretamente para esse objetivo central DEVEM ser consideradas fora do escopo do MVP.
- *Racional*: O valor fundamental do produto reside em combater a fadiga de decisão com agilidade e relevância.

### II. MVP e Simplicidade
- A aplicação DEVE conter estritamente as funcionalidades indispensáveis para validar a proposta de descoberta.
- NÃO DEVEM ser implementados no escopo do MVP:
  - Criação de contas, autenticação ou gestão de sessões;
  - Acompanhamento, histórico ou marcação de episódios vistos;
  - Sistema social, amizades, feeds e compartilhamento;
  - Comentários, fóruns e resenhas de usuários;
  - Sistema proprietário de notas ou avaliações manuais;
  - Listas pessoais persistentes em banco de dados;
  - Notificações (push, e-mail ou in-app);
  - Telas ou operações de administração de catálogo.
- Complexidade técnica adicional DEVE ser introduzida apenas se for estritamente necessária para atender aos requisitos essenciais aprovados.
- *Racional*: Manter o escopo enxuto assegura velocidade de entrega, robustez e foco no objetivo principal.

### III. Desenvolvimento com React
- A aplicação DEVE ser desenvolvida utilizando React (com Vite) e estruturada em componentes reutilizáveis, modulares e com responsabilidades coesas.
- Os componentes DEVEM utilizar `props` para comunicação unidirecional explícita de dados e eventos entre componentes pai e filho.
- O gerenciamento de estado local e o ciclo de vida/efeitos colaterais DEVEM empregar os hooks nativos adequados do React, em especial `useState` e `useEffect`.
- *Racional*: Garante legibilidade, manutenibilidade, separação de preocupações e alinhamento com as boas práticas fundamentais do React.

### IV. Dados Reais
- As informações sobre filmes e séries (títulos, sinopses, pôsteres, gêneros e notas) DEVEM ser obtidas diretamente de uma API externa real do domínio de entretenimento (ex.: TMDB ou equivalente).
- A aplicação NÃO DEVE depender de dados fictícios ou estáticos (mockados/hardcoded) para sustentar o fluxo principal de recomendação e descoberta.
- O consumo da API externa DEVE ser realizado de forma assíncrona (`async/await` ou Promises) e DEVE conter tratamento visual explícito para todos os três estados: carregamento (loading), sucesso e erro amigável.
- *Racional*: A validação da proposta de valor depende da autenticidade e do apelo do catálogo real oferecido ao usuário.

### V. Experiência de Descoberta
- O fluxo principal de navegação DEVE ser linear, curto e intuitivo, composto exatamente pelas seguintes etapas:
  1. Acesso à tela inicial da aplicação;
  2. Acionamento do início da descoberta;
  3. Preenchimento do quiz rápido de preferências;
  4. Visualização da lista de recomendações geradas;
  5. Consulta aos detalhes individuais de um item recomendado selecionado.
- As decisões de interface DEVEM minimizar a carga cognitiva e a quantidade de passos necessários para o usuário encontrar algo atraente.
- *Racional*: O tempo até o valor (time-to-value) deve ser o menor possível para evitar o abandono do fluxo.

### VI. Identidade Visual
- A interface gráfica DEVE adotar uma estética moderna inspirada nos principais serviços de streaming contemporâneos:
  - Fundo escuro (dark theme) como padrão;
  - Imagens de destaque, pôsteres de alta qualidade e banners imersivos;
  - Cards de conteúdo com proporções harmoniosas e visual atraente;
  - Hierarquia tipográfica clara e alto contraste para legibilidade;
  - Navegação limpa e direta;
  - Destaque visual evidente para títulos, pôsteres e notas de avaliação.
- As referências visuais de mercado DEVEM atuar exclusivamente como inspiração estética, NÃO DEVENDO reproduzir integralmente elementos proprietários ou interfaces de marcas existentes.
- *Racional*: Uma linguagem visual familiar ao público de entretenimento eleva a imersão e a percepção de qualidade do produto.

### VII. Responsividade e Acessibilidade
- A aplicação DEVE ser totalmente utilizável e esteticamente agradável em variadas dimensões de tela, com suporte obrigatório a dispositivos móveis (smartphones) e computadores (desktop).
- Todos os elementos interativos (botões de quiz, cards clicáveis, seletores e modais) DEVEM possuir identificação evidente, áreas de toque adequadas, feedbacks de hover/foco e comportamento previsível.
- *Racional*: Cenários de busca por entretenimento ocorrem prevalentemente em telas móveis e notebooks no ambiente doméstico.

### VIII. Organização e Padrões de Código
- A arquitetura de pastas, convenções de nomenclatura de arquivos e componentes (PascalCase para componentes, camelCase para utilitários/hooks), estruturação de rotas e organização do código-fonte DEVEM seguir os padrões estabelecidos nas aulas e no projeto.
- A implementação DEVE priorizar legibilidade, reaproveitamento de componentes e fácil manutenção, mantendo conformidade com as regras de linter do projeto.
- *Racional*: Padrões consistentes facilitam a leitura, a avaliação acadêmica e o trabalho colaborativo.

### IX. Rastreabilidade
- Toda funcionalidade desenvolvida DEVE possuir relação explícita com os requisitos funcionais e critérios definidos na especificação (`spec.md`) e no plano (`plan.md`).
- Alterações que modifiquem o comportamento central ou o fluxo da aplicação DEVEM refletir em atualização concomitante da documentação correspondente e das tarefas associadas.
- *Racional*: Evita deriva de escopo (scope creep) e garante conformidade entre o código entregue e as metas do MVP.

## Critérios de Qualidade

Uma implementação será considerada satisfatória e em conformidade se, e somente se, atender aos seguintes critérios:

- O projeto executar e compilar perfeitamente no ambiente React/Vite sem erros em tempo de execução ou de linting;
- As páginas e rotas funcionarem de maneira consistente conforme as especificações de navegação;
- O quiz permitir a seleção ágil de preferências de forma fluida e sem bugs;
- As escolhas registradas no quiz influenciarem de fato o algoritmo/filtro das recomendações exibidas;
- Os filmes e séries recomendados forem obtidos via requisições a uma API externa real;
- O usuário puder abrir e visualizar com clareza os detalhes completos de qualquer recomendação;
- A aplicação possuir tratamento e feedback visual apropriado para estados de carregamento (loading) e de falha/erro na comunicação com a API;
- Os componentes forem adequadamente desacoplados, isolando responsabilidades de apresentação e lógica;
- A interface responder harmoniosamente a telas de smartphones, tablets e desktops;
- O código seguir rigorosamente os padrões de formatação e arquitetura estipulados no projeto.

## Limites do MVP

O escopo do TV Time Discovery MVP permanece estritamente delimitado à descoberta imediata de filmes e séries.

Estão terminantemente excluídos do escopo inicial:
- Qualquer mecanismo de persistência remota ou autenticação de usuários;
- Acompanhamento de progresso de episódios ou temporadas;
- Funcionalidades de interação social ou comentários;
- Criação de listas personalizadas que exijam armazenamento persistente fora da sessão de descoberta;
- Notificações e sistemas de agendamento de lançamentos;
- Qualquer funcionalidade de painel administrativo.

Qualquer funcionalidade candidata que demande esses recursos DEVE ser descartada ou postergada para versões futuras.

## Princípio de Evolução

O desenvolvimento do MVP DEVE ser estritamente incremental e orientado por prioridades:

1. **Etapa 1 (Núcleo Funcional)**: Implementação do fluxo essencial de navegação, estrutura de componentes base, consumo assíncrono da API real e geração das recomendações com base no quiz.
2. **Etapa 2 (Visualização de Detalhes e Estados)**: Construção da visualização detalhada do item escolhido e refinamento dos estados de carregamento e erro da API.
3. **Etapa 3 (Refinamento Visual e Responsividade)**: Aplicação consistente da identidade visual dark streaming, polimento visual dos cards/banners e adaptação fina para múltiplos viewports.

Melhorias cosméticas ou recursos secundários NÃO DEVEM ser priorizados se o fluxo principal de recomendação ainda não estiver validado e funcional.

## Governança

A presente Constituição constitui o documento de autoridade primária para todas as decisões de escopo, design e implementação do TV Time Discovery MVP.

- **Conformidade em Pull Requests e Revisões**: Toda tarefa, especificação (`spec.md`), plano técnico (`plan.md`) e alteração de código DEVE ser avaliada quanto à conformidade com os princípios desta Constituição.
- **Rastreamento de Complexidade**: Qualquer desvio, inclusão de nova biblioteca ou dependência externa que adicione complexidade além do padrão DEVE ser explicitamente documentado e justificado no plano de implementação.
- **Procedimento de Emenda**: Alterações nas regras ou princípios exigem atualização formal deste documento, verificação de impacto nos templates de especificação e aprovação explícita.
- **Política de Versionamento**:
  - **MAJOR**: Removida ou redefinida uma regra fundamental de governança ou princípio estruturante que quebre compatibilidade de decisões anteriores.
  - **MINOR**: Inclusão de um novo princípio, critério ou expansão substancial de diretrizes mantendo compatibilidade.
  - **PATCH**: Correções gramaticais, esclarecimentos de redação ou ajustes não-semânticos.

**Version**: 1.0.0 | **Ratified**: 2026-09-15 | **Last Amended**: 2026-09-15
