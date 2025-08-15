# Instruções para o GitHub Copilot - Projeto: Guia Profissional de Desenvolvimento Web

Este projeto usa apenas HTML5, CSS3 e JavaScript ES6+, sem frameworks externos.

## ✅ Regras gerais

- Usar HTML semântico (header, nav, main, section, footer, etc.)
- CSS mobile-first, com uso de Flexbox e Grid
- Todas as interações JS devem usar `addEventListener`
- Salvar preferências (tema, filtros, quiz, checklist) no localStorage
- Garantir acessibilidade: aria-* nos componentes interativos
- Fontes: "Poppins" para títulos, "Inter" para textos
- Cores:
  - Primária: #2563EB
  - Secundária: #10B981
  - Texto: #111827
  - Fundo claro: #F3F4F6
  - Bordas: #E5E7EB
- Variáveis CSS devem ser usadas para cores e fontes

## 🌐 Página: index.html (Home)

**Objetivo**: Introduzir HTML, CSS e JS em cards, com exemplo mínimo e breve explicação.

### HTML
- Criar `header` fixo com título do site e menu com links para todas as páginas
- Criar `hero` com uma frase impactante e botão "Começar"
- Criar seção com 3 `cards` lado a lado:
  - Card 1: HTML → definição, exemplo mínimo e quando usar
  - Card 2: CSS → definição, exemplo mínimo e quando usar
  - Card 3: JS → definição, exemplo mínimo e quando usar
- Criar `footer` com links e créditos

## 🧩 Página: tecnologias.html

**Objetivo**: Mostrar panorama de 10+ tecnologias web

### HTML
- Criar filtros por categoria (Front-end, Back-end, DB, DevOps, Testes)
- Criar campo de busca textual (input)
- Criar grid de cards com:
  - Nome
  - Categoria
  - Para que serve
  - Prós (2) e contras (2)
  - Quando evitar
  - Link oficial
  - Badge de nível (básico/intermediário/avançado)

### JS
- Filtrar cards em tempo real por texto e categoria
- Modal com resumo "Quando escolher X?" ao clicar no card
- Salvar último filtro no localStorage
- Adicionar atributos `aria-controls` e `aria-expanded`

## 💡 Página: boas-praticas.html

**Objetivo**: Explicar 6 boas práticas do desenvolvimento web

### HTML
- Criar 6 seções com títulos:
  1. Semântica & Acessibilidade
  2. Responsividade
  3. Organização de CSS
  4. Performance leve
  5. Versionamento com Git
  6. Boas práticas de JavaScript

- Cada seção com:
  - 3 a 5 bullets (explicação)
  - 1 bloco de código de exemplo

### JS
- Accordion com transição suave para abrir/fechar seções
- Checklist com checkbox por item e progresso (%) salvo no localStorage

## 🔁 Página: fluxo.html

**Objetivo**: Mostrar etapas de um projeto web completo

### HTML
- Fluxograma com etapas:
  Descoberta → Requisitos → Protótipo → Design → Implementação → Testes → Deploy → Publicação → Monitoramento
- Fluxograma em SVG ou imagem externa
- Linha do tempo horizontal com mesmas etapas

### JS
- Tooltip ao clicar em uma etapa com:
  - O que entregar
  - Riscos comuns

## ❓ Página: quiz.html

**Objetivo**: Quiz com 8–10 perguntas de múltipla escolha

### HTML
- Criar perguntas com 4 opções cada
- Mostrar pontuação final e explicações das respostas

### JS
- Verificar respostas
- Mostrar score
- Salvar melhor pontuação no localStorage

## 🌗 Tema Claro/Escuro (global)

### JS
- Criar botão toggle (tema claro/escuro)
- Adicionar classe no body conforme o tema
- Salvar preferência no localStorage
- Usar `prefers-color-scheme` como fallback

## 🛠 Peculiaridades escolhidas

1. Tema Claro/Escuro (✅ já incluído)
2. Teclas de atalho:
   - "/" → abrir busca
   - "Alt+M" → focar menu
   - "Home" → rolar para o topo
3. Animações suaves com `transform` e `opacity` (respeitar `prefers-reduced-motion`)
