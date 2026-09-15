# Data Model: Fluxo de Descoberta de Conteúdo (Episodic)

**Feature**: `001-content-discovery`  
**Date**: 2026-09-15  
**Context**: Modelo conceitual de entidades, estado do quiz, respostas e mapeamento de dados da API TMDB.

---

## 1. Entidades Principais

### `QuizPreferences`
Armazena a intenção e as respostas coletadas durante o quiz de descoberta na página `/descobrir`.

| Campo | Tipo | Obrigatório | Descrição | Exemplo |
| :--- | :--- | :---: | :--- | :--- |
| `type` | `'movie' \| 'tv'` | Sim | Tipo de obra audiovisual pretendida | `'movie'` |
| `genre` | `number` | Sim | Identificador numérico do gênero na API TMDB | `28` (Ação) |
| `genreLabel` | `string` | Sim | Nome legível do gênero em português | `'Ação'` |
| `mood` | `string` | Sim | Clima emocional escolhido para a sessão | `'tense'` |
| `moodLabel` | `string` | Sim | Título descritivo do clima | `'Para roer as unhas'` |

#### Regras de Validação:
- Não é permitido avançar do Passo 1 sem `type` definido (`'movie'` ou `'tv'`).
- Não é permitido avançar do Passo 2 sem `genre` selecionado.
- Não é permitido finalizar o Passo 3 e submeter sem `mood` selecionado.

---

### `OptionItem`
Representa uma alternativa apresentada ao usuário no componente `QuizQuestion` / `OptionCard`.

| Campo | Tipo | Obrigatório | Descrição | Exemplo |
| :--- | :--- | :---: | :--- | :--- |
| `label` | `string` | Sim | Rótulo principal exibido no card | `'Filme'` |
| `value` | `string \| number` | Sim | Valor associado | `'movie'` |
| `description` | `string` | Não | Texto explicativo secundário | `'Uma história completa em uma sessão'` |
| `icon` | `string` | Não | Identificador do ícone Lucide | `'Film'` |

---

### `RecommendedItem` (Resumo da Recomendação)
Estrutura normalizada a partir da resposta dos endpoints `/discover/movie` e `/discover/tv`.

| Campo | Tipo | Obrigatório | Descrição | Exemplo |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `number` | Sim | Identificador único no catálogo TMDB | `550` |
| `title` | `string` | Sim | Nome da obra (`title` para filmes, `name` para séries) | `'Clube da Luta'` |
| `poster` | `string \| null` | Não | URL completa da imagem vertical (`w500`) | `'https://image.tmdb.org/t/p/w500/...'` |
| `backdrop` | `string \| null` | Não | URL completa da imagem horizontal (`w1280`) | `'https://image.tmdb.org/t/p/w1280/...'` |
| `type` | `'movie' \| 'tv'` | Sim | Tipo da mídia | `'movie'` |
| `year` | `string` | Sim | Ano extraído (`release_date` ou `first_air_date`) | `'1999'` |
| `rating` | `number` | Sim | Avaliação média dos usuários (0 a 10) | `8.4` |
| `genres` | `number[]` | Sim | IDs de gêneros associados | `[18, 53]` |
| `overview` | `string` | Sim | Sinopse resumida do título | `'Um homem deprimido que sofre de insônia...'` |

---

### `ContentDetails` (Detalhes Completos)
Estrutura normalizada a partir dos endpoints de detalhes `/movie/{id}` ou `/tv/{id}`.

| Campo | Tipo | Obrigatório | Descrição | Exemplo |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `number` | Sim | Identificador único | `550` |
| `title` | `string` | Sim | Nome oficial da produção | `'Clube da Luta'` |
| `originalTitle` | `string` | Não | Título na língua original | `'Fight Club'` |
| `poster` | `string \| null` | Não | URL completa do pôster | `'https://...'` |
| `backdrop` | `string \| null` | Não | URL completa do backdrop | `'https://...'` |
| `type` | `'movie' \| 'tv'` | Sim | Identificador de formato | `'movie'` |
| `releaseDate` | `string` | Sim | Data formatada (ex.: DD/MM/AAAA) | `'29/10/1999'` |
| `rating` | `number` | Sim | Nota média com uma casa decimal | `8.4` |
| `voteCount` | `number` | Sim | Total de votos registrados | `26500` |
| `genres` | `Array<{ id: number, name: string }>` | Sim | Lista com nomes completos dos gêneros | `[{ id: 18, name: 'Drama' }]` |
| `overview` | `string` | Sim | Sinopse completa da obra | `'Um homem deprimido...'` |
| `durationOrSeasons` | `string` | Sim | Duração em minutos/horas para filme ou total de temporadas para série | `'2h 19m'` ou `'5 temporadas'` |
| `tagline` | `string \| null` | Não | Frase de efeito ou subtítulo oficial | `'Mischief. Mayhem. Soap.'` |

---

## 2. Máquina de Estados da UI (Requisições & Navegação)

Para as páginas que realizam consumo de dados (`Results` e `Details`), o ciclo segue o diagrama:

```
        ┌──────────┐
        │   IDLE   │
        └────┬─────┘
             │ (Montagem / Disparo da busca)
             ▼
        ┌──────────┐
        │ LOADING  │
        └────┬─────┘
             ├──────────────────────┬──────────────────────┐
             ▼                      ▼                      ▼
       ┌───────────┐          ┌───────────┐          ┌───────────┐
       │  SUCCESS  │          │   EMPTY   │          │   ERROR   │
       │ (results) │          │(0 matches)│          │ (network) │
       └───────────┘          └─────┬─────┘          └─────┬─────┘
                                    │                      │
                                    ▼                      ▼
                              "Nova Descoberta"       "Tentar Novamente"
                               (Reinicia Quiz)         (Recarrega API)
```

