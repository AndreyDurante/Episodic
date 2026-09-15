# Contract: TMDB External API

**Target**: The Movie Database (TMDB) API v3  
**Base URL**: `https://api.themoviedb.org/3`  
**Authentication**: Query param `api_key` or HTTP Header `Authorization: Bearer <TOKEN>`

---

## 1. Endpoints de Descoberta

### `GET /discover/movie` & `GET /discover/tv`

#### Parâmetros de Requisição (Query Params)
| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| `api_key` | `string` | Sim | Chave de acesso da API |
| `language` | `string` | Não | Código do idioma (Padrão: `pt-BR`) |
| `sort_by` | `string` | Não | Critério de ordenação (`popularity.desc` ou `vote_average.desc`) |
| `with_genres` | `string \| number` | Não | ID(s) do gênero filtrado |
| `vote_count.gte` | `number` | Não | Mínimo de votos para evitar itens obscuros sem relevância |
| `vote_average.gte` | `number` | Não | Nota mínima para filtragem por clima da sessão |
| `page` | `number` | Não | Página de resultados (Padrão: 1) |

#### Formato da Resposta de Sucesso (`200 OK`)
```json
{
  "page": 1,
  "results": [
    {
      "id": 550,
      "title": "Clube da Luta",
      "name": "Nome da Série (caso seja tv)",
      "overview": "Um homem deprimido...",
      "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      "backdrop_path": "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
      "release_date": "1999-10-15",
      "first_air_date": "2020-01-01",
      "vote_average": 8.433,
      "vote_count": 26588,
      "genre_ids": [18, 53]
    }
  ],
  "total_pages": 42,
  "total_results": 840
}
```

---

## 2. Endpoint de Detalhes

### `GET /movie/{id}` & `GET /tv/{id}`

#### Parâmetros de Rota
| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| `id` | `number` | Sim | Identificador numérico da obra no TMDB |

#### Formato da Resposta de Sucesso (`200 OK`)
```json
{
  "id": 550,
  "title": "Clube da Luta",
  "name": "Breaking Bad",
  "tagline": "Mischief. Mayhem. Soap.",
  "overview": "Um homem deprimido...",
  "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  "backdrop_path": "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
  "release_date": "1999-10-15",
  "first_air_date": "2008-01-20",
  "runtime": 139,
  "number_of_seasons": 5,
  "number_of_episodes": 62,
  "vote_average": 8.433,
  "vote_count": 26588,
  "genres": [
    { "id": 18, "name": "Drama" },
    { "id": 53, "name": "Thriller" }
  ],
  "status": "Released"
}
```

---

## 3. Formato de Tratamento de Erros

Em caso de falha de autenticação (`401`), recurso não encontrado (`404`) ou limite de taxa (`429`):
```json
{
  "status_code": 7,
  "status_message": "Invalid API key: You must be granted a valid key.",
  "success": false
}
```
A camada `services/tmdb.js` deve interceptar essas respostas e emitir um erro amigável padronizado para a camada de visualização.

