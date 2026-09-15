# Implementation Plan: Fluxo de Descoberta de Conteúdo e Recomendações (Episodic)

**Branch**: `001-content-discovery` | **Date**: 2026-09-15 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-content-discovery/spec.md`

## Summary

O Episodic é um MVP web em React focado em solucionar a indecisão de usuários que desejam assistir a um filme ou série. A aplicação implementa um fluxo de descoberta intuitivo composto por uma landing page acolhedora, um quiz de 3 etapas de preferências (tipo, gênero e clima da sessão) e uma tela de recomendações com cards e visão detalhada baseada em dados reais consumidos assincronamente da API do The Movie Database (TMDB).

## Technical Context

**Language/Version**: JavaScript (ES2022+ / JSX / React 19.2)  
**Primary Dependencies**: `react`, `react-dom`, `react-router-dom`, `lucide-react`, `vite`  
**Storage**: N/A (Estado em memória gerenciado via `useState` e histórico de navegação via `location.state`)  
**Testing**: ESLint (`eslint .`), validação visual e cenários de aceitação de rotas documentados em `quickstart.md`  
**Target Platform**: Navegadores Web Modernos (Mobile First & Desktop)  
**Project Type**: Single Page Application (SPA) Web Frontend  
**Performance Goals**: Transição imediata entre perguntas do quiz (< 50ms) e carregamento de dados da API TMDB com feedback visual em < 1.5s  
**Constraints**: Fundo escuro (dark theme estilo streaming), alta responsividade (360px a 4K), sem contas/autenticação/banco de dados no MVP  
**Scale/Scope**: 4 páginas principais (`Home`, `Discover`, `Results`, `Details`), 11 componentes reutilizáveis, 1 layout principal e 1 camada de serviço de API TMDB  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio da Constituição | Avaliação | Justificativa / Conformidade |
| :--- | :---: | :--- |
| **I. Foco no Problema Principal** | **PASS** | O fluxo completo resolve estritamente "o que assistir?" sem desvios de escopo. |
| **II. MVP e Simplicidade** | **PASS** | Zero autenticação, perfis sociais, listas persistentes, notificações ou acompanhamento de episódios. |
| **III. Desenvolvimento com React** | **PASS** | Componentes desacoplados com props tipadas nos contratos, uso de hooks nativos (`useState`, `useEffect`). |
| **IV. Dados Reais** | **PASS** | Consumo direto da API TMDB com tratamento visual para loading, sucesso, erro e lista vazia. |
| **V. Experiência de Descoberta** | **PASS** | 5 passos implementados entre as rotas `/`, `/descobrir`, `/resultados` e `/filme/:id`. |
| **VI. Identidade Visual** | **PASS** | Dark theme streaming `#0f1014`, cards com pôsteres em destaque e tipografia de alto contraste. |
| **VII. Responsividade e Acessibilidade** | **PASS** | Layouts fluidos (Grid/Flexbox) adaptados para touch em smartphones e visualização rica em desktop. |
| **VIII. Organização e Padrões de Código** | **PASS** | Padrão arquitetural por pastas de componentes, páginas isoladas, layouts e rotas centralizadas. |
| **IX. Rastreabilidade** | **PASS** | Cada página, componente e endpoint mapeia diretamente para `FR-001` a `FR-011` e `SC-001` a `SC-005`. |

*Resultado do Gate*: **100% APROVADO**. Sem violações aos princípios.

## Project Structure

### Documentation (this feature)

```text
specs/001-content-discovery/
├── spec.md                  # Especificação funcional (User Stories & Critérios de Sucesso)
├── plan.md                  # Este plano de implementação técnica
├── research.md              # Decisões de arquitetura, TMDB e bibliotecas (Phase 0)
├── data-model.md            # Modelo de dados e máquina de estados da UI (Phase 1)
├── quickstart.md            # Guia de configuração, execução e validação ponta a ponta (Phase 1)
├── contracts/               # Contratos formais de interfaces e endpoints (Phase 1)
│   ├── tmdb-api.md          # Contrato de comunicação com a API externa TMDB
│   └── component-props.md   # Contrato de props para os 11 componentes reutilizáveis
└── checklists/
    └── requirements.md      # Validação de qualidade da especificação
```

### Source Code (repository root)

```text
src/
├── assets/                  # Ícones estáticos, logo e imagens complementares
├── components/              # Componentes de UI reutilizáveis com responsabilidade única
│   ├── Button/              # Componente de ação (primário, secundário, outline)
│   ├── Header/              # Cabeçalho com logo e navegação
│   ├── MovieCard/           # Card de título com pôster, nota e ano
│   ├── MovieGrid/           # Grid responsivo para organização de cards
│   ├── QuizQuestion/        # Renderização do enunciado e opções da pergunta
│   ├── OptionCard/          # Card selecionável de alternativa do quiz
│   ├── ProgressBar/         # Barra de etapas do quiz (1 a 3)
│   ├── Loading/             # Feedback de carregamento durante requisições
│   ├── ErrorMessage/        # Feedback de erro amigável com ação de retry
│   └── EmptyState/          # Feedback amigável para busca sem resultados
│
├── layouts/
│   └── MainLayout/          # Estrutura com Header global e container das páginas
│
├── pages/                   # Telas principais associadas às rotas
│   ├── Home/                # Tela inicial com CTA para descoberta (/)
│   ├── Discover/            # Quiz em 3 etapas (/descobrir)
│   ├── Results/             # Apresentação das recomendações da API (/resultados)
│   └── Details/             # Visão aprofundada do filme/série (/filme/:id)
│
├── services/
│   └── tmdb.js              # Camada de comunicação centralizada com a API TMDB
│
├── routes/
│   └── AppRoutes.jsx        # Configuração declarativa de rotas com React Router
│
├── App.jsx                  # Raiz da aplicação envelopando o provedor de rotas
├── main.jsx                 # Ponto de entrada do Vite / ReactDOM
└── index.css                # Estilos globais e variáveis de tema escuro
```

**Structure Decision**: Aplicação estruturada no padrão SPA modular com separação evidente entre apresentação (`components`), páginas de negócio (`pages`), casca visual (`layouts`), regras de navegação (`routes`) e cliente de integração externa (`services`).

## Complexity Tracking

> **Preenchido apenas em caso de violações aos princípios da Constituição**

| Violação | Por que é necessária | Alternativa mais simples rejeitada por que |
| :--- | :--- | :--- |
| *Nenhuma* | *Nenhum desvio detectado* | *Arquitetura 100% aderente ao escopo do MVP* |
