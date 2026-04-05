# Bom Dia ☀️

Um aplicativo web de bem-estar matinal para começar o dia com intenção, inspiração e presença.

## Funcionalidades

- **Relógio em Tempo Real** — Horas, minutos e segundos com indicador visual
- **Saudação Contextual** — Muda automaticamente conforme o período do dia
- **Seletor de Humor** — Registre como você está se sentindo hoje
- **Frases Inspiradoras** — 12 frases que rotacionam automaticamente a cada 8 segundos
- **Exercício de Respiração** — Técnica de caixa 4-4-4-4 para mindfulness
- **Rituais Matinais** — Checklist interativo de 6 hábitos saudáveis
- **Foco do Dia** — Uma palavra e reflexão para cada dia da semana
- **Temas Automáticos** — Cores que se adaptam ao horário do dia
- **Partículas Animadas** — Fundo dinâmico e suave
- **Confetti** — Celebração ao completar rituais
- **PWA** — Funciona offline e pode ser instalado no seu dispositivo

## Estrutura

```
bom-dia/
├── index.html       # Página principal
├── manifest.json    # PWA manifest
├── sw.js            # Service Worker (offline)
├── css/
│   └── styles.css   # Estilos principais
└── js/
    └── app.js       # Lógica da aplicação
```

## Uso

1. Abra o `index.html` em um navegador moderno
2. Ou sirva com um servidor local:
   ```bash
   # Python
   python -m http.server 8000

   # Node.js (npx)
   npx serve

   # PHP
   php -S localhost:8000
   ```

## Atalhos de Teclado

| Tecla | Ação |
|-------|------|
| `←` | Frase anterior |
| `→` | Próxima frase |
| `Espaço` | Iniciar/parar respiração |

## Tecnologias

- HTML5 semântico
- CSS3 com Custom Properties
- JavaScript ES6+ (Vanilla)
- Canvas API (partículas e confetti)
- LocalStorage (persistência de dados)
- Service Worker (PWA/offline)

## Licença

MIT
