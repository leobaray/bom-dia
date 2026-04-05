# Bom Dia ☀️

Um aplicativo web premium de bem-estar matinal para começar o dia com intenção, inspiração e presença.

## ✨ Features

- **🕐 Relógio em Tempo Real** — Horas, minutos e segundos com barra de progresso visual
- **🌅 Tema Dinâmico** — Cores que se adaptam automaticamente ao horário do dia
- **😊 Seletor de Humor** — Check-in emocional com persistência diária
- **💭 Frases Inspiradoras** — 12 frases curadas que rotacionam automaticamente
- **🧘 Respiração Guiada** — Técnica de caixa 4-4-4-4 com animação
- **✅ Rituais Matinais** — Checklist de 6 hábitos com confetti e som
- **🎯 Foco do Dia** — Palavra e reflexão para cada dia da semana
- **✨ Partículas Interativas** — Fundo animado que reage ao mouse
- **🎨 Design Premium** — Animações suaves, glassmorphism, tipografia editorial
- **📱 PWA Completo** — Funciona offline e instalável
- **⌨️ Atalhos de Teclado** — Navegação rápida
- **♿ Acessível** — ARIA labels, reduced motion support

## 🎨 Melhorias Extremas (2026)

### Design
- Sistema de cores HSL dinâmico para transições suaves
- Mesh gradient animado no background
- Glassmorphism com backdrop-filter
- Tipografia editorial (Cormorant Garamond + Inter)
- Sombras e glows sutis
- Animações com easing curves premium

### Animações
- Reveal on scroll com stagger
- Partículas com conexão e interação mouse
- Confetti physics melhorado
- Transições cinematográficas
- Reduced motion support

### UX
- Feedback sonoro sutil ao completar rituais
- Barra de progresso para frases
- Navegação por dots ativa
- Tooltips na navegação
- Estados hover/focus refinados

### Performance
- CSS custom properties para temas
- Canvas otimizado para partículas
- Intersection Observer para reveals
- Service Worker para offline
- Preload de assets críticos

## 📁 Estrutura

```
bom-dia/
├── index.html          # HTML semântico e acessível
├── manifest.json       # PWA manifest com shortcuts
├── sw.js               # Service Worker (offline-first)
├── README.md           # Esta documentação
├── css/
│   └── styles.css      # ~800 linhas de CSS premium
└── js/
    └── app.js          # ~500 linhas de JS modular
```

## 🚀 Uso

### Localmente
```bash
# Python
python -m http.server 8000

# Node.js (npx)
npx serve

# PHP
php -S localhost:8000

# Depois acesse http://localhost:8000
```

### Deploy
Funciona em qualquer hosting estático:
- Vercel / Netlify (arraste a pasta)
- GitHub Pages
- Cloudflare Pages

## ⌨️ Atalhos

| Tecla | Ação |
|-------|------|
| `←` | Frase anterior |
| `→` | Próxima frase |
| `Espaço` | Iniciar/parar respiração |

## 🎨 Temas Automáticos

| Horário | Cor | Atmosfera |
|---------|-----|-----------|
| 05-07h | Laranja suave | Amanhecer |
| 07-12h | Dourado | Manhã |
| 12-17h | Azul claro | Tarde |
| 17-20h | Rosa/cobre | Entardecer |
| 20-05h | Roxo | Noite |

## 📱 PWA

Para instalar:
1. Abra no Chrome/Safari
2. Clique em "Instalar" ou "Adicionar à Tela de Início"
3. Use como app nativo

O app funciona offline após o primeiro carregamento.

## 🛠️ Tech Stack

- **HTML5** semântico e acessível
- **CSS3** com Custom Properties, @property
- **JavaScript ES6+** (Vanilla, zero dependencies)
- **Canvas API** (partículas, confetti)
- **LocalStorage** (persistência)
- **Service Worker** (PWA/offline)
- **Web Audio API** (feedback sonoro)

## 🎯 Próximas Features (Ideias)

- [ ] Journal/diário integrado
- [ ] Estatísticas semanais
- [ ] Mais técnicas de respiração
- [ ] Sons de natureza opcionais
- [ ] Widgets para mobile
- [ ] Sincronização cloud

## 📄 Licença

MIT

---

Feito com ❤️ para começar o dia melhor.
