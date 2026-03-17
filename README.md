# QUIZZ_LER

<p align="center">
  <img
    src="img/Screencast_20260317_140648.webm"
    alt="vid"
    width=100%
  />
</p>
<h2 align="center">A web quiz about about html/css/js</h2>

## ✨ Key features

- **Scoring system** player who answer first get a bonus
- **Winner page** that shows the winner at the end of the gamme
- **Multiplayer** requires two players to play

## 📊 How to play

> diagram explaining steps to use the website

```mermaid
flowchart LR
    A[Enter names] --> B{Not both names}
    B -->|Yes| C[game begin]
    B -->|No| D[ALERT]
    C --> E[Leaderboard]
    D --> B
```

### Game Logic

> diagram explaining how scoring works

```mermaid
sequenceDiagram
    Show question->>Select: show options
    Select->>Verify: check answers
    Verify->>Score: update score
    Score->>Show question: repeat
```

## 💻 Code with Syntax Highlighting

```javascript
function renderMarkdown() {
  const markdown = markdownEditor.value;
  const html = marked.parse(markdown);
  const sanitizedHtml = DOMPurify.sanitize(html);
  markdownPreview.innerHTML = sanitizedHtml;

  // Syntax highlighting is handled automatically
  // during the parsing phase by the marked renderer.
  // Themes are applied instantly via CSS variables.
}
```

## 🆚 Score Comparison

|      :Criteria:       |          score           |
| :-------------------: | :----------------------: |
|    player x faster    |  bonus +5 for player x   |
| player changed answer |       bonus resets       |
|   player x correct    |     +10 for player x     |
|    player x wrong     | health -20% for player x |
