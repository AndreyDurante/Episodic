# Quickstart & Guia de Validação: Episodic

**Feature**: `001-content-discovery`  
**Data**: 2026-09-15  
**Objetivo**: Roteiro de configuração e validação ponta a ponta do fluxo de descoberta e consumo de dados reais.

---

## 1. Pré-Requisitos

- Node.js (v18 ou superior);
- Gerenciador de pacotes `npm`;
- Chave de API da [The Movie Database (TMDB)](https://www.themoviedb.org/).

---

## 2. Configuração do Ambiente

1. **Instalar Dependências**:
   ```bash
   npm install react-router-dom lucide-react
   ```

2. **Configurar Variáveis de Ambiente**:
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```env
   VITE_TMDB_API_KEY=sua_chave_aqui
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

3. **Iniciar o Servidor de Desenvolvimento**:
   ```bash
   npm run dev
   ```
   A aplicação estará disponível em `http://localhost:5173`.

---

## 3. Roteiro de Validação Ponta a Ponta

### Cenário 1: Jornada Principal de Descoberta (P1)
1. Acesse `http://localhost:5173/`.
   - **Esperado**: A página inicial `Home` carrega com destaque visual, título "Episodic" e botão destacado "Encontrar algo para assistir".
2. Clique no botão "Encontrar algo para assistir".
   - **Esperado**: A URL muda para `/descobrir`. A barra de progresso exibe `Etapa 1 de 3`.
3. Escolha a opção "Filme" e clique em "Continuar".
   - **Esperado**: A barra de progresso avança para `Etapa 2 de 3` (Gêneros).
4. Selecione o gênero "Comédia" e clique em "Continuar".
   - **Esperado**: A barra avança para `Etapa 3 de 3` (Clima da sessão).
5. Selecione o clima "Para relaxar e rir" e clique em "Buscar recomendações".
   - **Esperado**: A aplicação transiciona para `/resultados`, exibe o componente `Loading` com mensagem animada e, em seguida, renderiza o `MovieGrid` com filmes reais de comédia retornados pela API TMDB.

### Cenário 2: Visualização de Detalhes da Recomendação (P2)
1. Na página de resultados, clique sobre o card de um dos filmes recomendados.
   - **Esperado**: A rota muda para `/filme/:id`. O componente de detalhes carrega a imagem de backdrop, pôster, título, sinopse completa, ano, nota e duração.
2. Clique no botão "Voltar para as recomendações".
   - **Esperado**: A aplicação retorna à tela `/resultados` mantendo os resultados da busca anterior sem erro.

### Cenário 3: Refazer o Quiz (P3)
1. Na tela de resultados ou na tela de detalhes, clique no botão "Refazer Quiz" / "Nova Descoberta".
   - **Esperado**: O usuário é redirecionado para `/descobrir` na Etapa 1 com as opções redefinidas para uma nova busca.

### Cenário 4: Tratamento de Estados de Erro e Vazio
1. Simule ausência de conexão ou altere propositalmente `VITE_TMDB_API_KEY` para um valor inválido.
2. Ao submeter a busca no quiz:
   - **Esperado**: O componente `ErrorMessage` é renderizado exibindo mensagem amigável e um botão funcional "Tentar Novamente".

