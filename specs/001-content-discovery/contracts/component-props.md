# Contract: Component Props & Interfaces

Especificação detalhada das propriedades (`props`) e eventos para todos os componentes reutilizáveis da aplicação.

---

### 1. `Header`
Localização: `src/components/Header/Header.jsx`  
Objetivo: Navegação superior com logotipo da aplicação, slogan sutil e links de navegação.

```javascript
// Props: Nenhuma obrigatória
// Exemplo de uso:
<Header />
```

---

### 2. `Button`
Localização: `src/components/Button/Button.jsx`  
Objetivo: Botão de ação padrão reutilizável com variantes estilizadas.

| Prop | Tipo | Obrigatório | Padrão | Descrição |
| :--- | :--- | :---: | :---: | :--- |
| `children` | `ReactNode` | Sim | - | Conteúdo ou texto interno do botão |
| `onClick` | `function` | Não | `undefined` | Callback acionado no clique |
| `disabled` | `boolean` | Não | `false` | Desabilita interação visual e clique |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | Não | `'primary'` | Estilo visual |
| `type` | `'button' \| 'submit' \| 'reset'` | Não | `'button'` | Tipo do elemento HTML |

---

### 3. `QuizQuestion`
Localização: `src/components/QuizQuestion/QuizQuestion.jsx`  
Objetivo: Apresenta uma pergunta do quiz e sua lista de opções selecionáveis.

| Prop | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| `question` | `string` | Sim | Enunciado da pergunta |
| `description` | `string` | Não | Orientações adicionais sobre a escolha |
| `options` | `Array<OptionItem>` | Sim | Lista de opções selecionáveis |
| `selectedOption` | `string \| number \| null` | Sim | Valor da opção atualmente selecionada |
| `onSelect` | `function(value: string \| number): void` | Sim | Callback invocado ao escolher uma opção |

---

### 4. `OptionCard`
Localização: `src/components/OptionCard/OptionCard.jsx`  
Objetivo: Card interativo para seleção de uma alternativa no quiz.

| Prop | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| `label` | `string` | Sim | Rótulo principal da opção |
| `value` | `string \| number` | Sim | Valor representativo da opção |
| `selected` | `boolean` | Sim | Indica se o card está ativo/selecionado |
| `onClick` | `function(value): void` | Sim | Ação de clique para selecionar |
| `icon` | `string \| ReactNode` | Não | Ícone ilustrativo (ex.: Lucide Icon) |
| `description` | `string` | Não | Texto descritivo auxiliar |

---

### 5. `ProgressBar`
Localização: `src/components/ProgressBar/ProgressBar.jsx`  
Objetivo: Indicador visual do progresso de conclusão do quiz.

| Prop | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| `currentStep` | `number` | Sim | Etapa atual (1-indexada, ex.: 1, 2, 3) |
| `totalSteps` | `number` | Sim | Quantidade total de etapas (ex.: 3) |

---

### 6. `MovieCard`
Localização: `src/components/MovieCard/MovieCard.jsx`  
Objetivo: Card para apresentação resumida de um filme ou série recomendado.

| Prop | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| `id` | `number` | Sim | Identificador único do título |
| `title` | `string` | Sim | Nome da produção |
| `poster` | `string \| null` | Não | URL da imagem vertical |
| `type` | `'movie' \| 'tv'` | Sim | Tipo de conteúdo |
| `year` | `string` | Sim | Ano de lançamento |
| `rating` | `number` | Sim | Nota média da produção (ex.: 8.2) |
| `genres` | `Array<string \| number>` | Não | Gêneros associados |
| `overview` | `string` | Não | Sinopse resumida |

---

### 7. `MovieGrid`
Localização: `src/components/MovieGrid/MovieGrid.jsx`  
Objetivo: Container responsivo que organiza uma lista de `MovieCard`.

| Prop | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| `movies` | `Array<RecommendedItem>` | Sim | Lista de filmes e séries recomendados |

---

### 8. `Loading`
Localização: `src/components/Loading/Loading.jsx`  
Objetivo: Exibe spinner e mensagem animada durante o carregamento de dados.

| Prop | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| `message` | `string` | Não (Padrão: `'Buscando recomendações para você...'`) | Texto de status exibido ao usuário |

---

### 9. `ErrorMessage`
Localização: `src/components/ErrorMessage/ErrorMessage.jsx`  
Objetivo: Apresenta mensagem amigável de erro com botão de nova tentativa.

| Prop | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| `message` | `string` | Sim | Texto explicativo do erro |
| `onRetry` | `function(): void` | Não | Callback acionado pelo botão "Tentar Novamente" |

---

### 10. `EmptyState`
Localização: `src/components/EmptyState/EmptyState.jsx`  
Objetivo: Apresenta aviso e ação quando nenhum título for encontrado para o filtro.

| Prop | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| `message` | `string` | Sim | Texto informando ausência de resultados |
| `action` | `ReactNode` | Não | Botão ou elemento interativo de ação (ex.: Refazer Quiz) |

---

### 11. `MainLayout`
Localização: `src/layouts/MainLayout/MainLayout.jsx`  
Objetivo: Layout padrão estruturado com Header fixo e container centralizado para o Outlet do React Router.

```javascript
// Props:
// children: ReactNode (ou uso do <Outlet /> do react-router-dom)
```

