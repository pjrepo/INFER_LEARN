import { useState } from "react";
import { c } from "../theme";

const DIMS = [
  {
    label: "Linguistic",
    icon: "🗣️",
    text: 'Tokens are statistical artifacts, not linguistic units. The model doesn\'t "know" that "un" is a negation prefix — it learns patterns. Character tasks (spelling, reversing) are hard because characters are inside tokens, invisible to prediction. Rare words get fragmented, reducing quality.',
  },
  {
    label: "Mathematical",
    icon: "📐",
    text: "Each token ID maps to a row in a [100K × 4,096] embedding matrix. The model operates entirely in this vector space. Tokens in similar contexts get similar vectors — this is how semantic similarity emerges from statistics, powering RAG retrieval in Layer 4.",
  },
  {
    label: "Economic",
    icon: "💰",
    text: "You pay per token, not per word. English averages ~4 chars/token. Code is ~2–3. CJK uses far more tokens per semantic unit. Your system prompt is billed on every request. 3,000 tokens × 10K requests/day = 30M input tokens/day.",
  },
  {
    label: "Engineering",
    icon: "⚙️",
    text: 'Context windows are measured in tokens. A "50-page" document might consume 60K tokens. Images cost hundreds to thousands of tokens. You must count tokens before sending — exceed the window and the call fails or silently truncates.',
  },
  {
    label: "Cross-Language",
    icon: "🌍",
    text: 'BPE tokenizers trained on English-heavy corpora are biased toward English efficiency. "Hello, how are you?" ≈ 6 tokens in English, ~13 in Japanese, ~14 in Arabic, ~18 in Hindi. Non-English users pay more, get less context, and may see lower quality.',
  },
  {
    label: "Security",
    icon: "🔒",
    text: 'Tokenization creates attack surfaces. Unicode homoglyphs (Cyrillic "а" vs Latin "a") look identical but tokenize differently. Zero-width characters shift boundaries, bypassing content filters.',
  },
];

export const SixDims = () => {
  const [a, setA] = useState(0);
  const d = DIMS[a];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 48, flexWrap: "wrap" }}>
        {DIMS.map((dim, i) => (
          <button
            key={i}
            onClick={() => setA(i)}
            style={{
              padding: "10px 20px",
              borderRadius: 12,
              fontSize: 15,
              cursor: "pointer",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: a === i ? `${c.blue}18` : "transparent",
              color: a === i ? c.blue : c.muted,
              fontWeight: a === i ? 600 : 400,
              transition: "all 0.25s",
            }}
          >
            <span style={{ fontSize: 18 }}>{dim.icon}</span>
            {dim.label}
          </button>
        ))}
      </div>
      <div style={{ fontSize: 36, fontWeight: 700, color: c.primary, marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 36 }}>{d.icon}</span> {d.label}
      </div>
      <div style={{ fontSize: 20, color: c.body, lineHeight: 1.8, maxWidth: 700 }}>{d.text}</div>
    </div>
  );
};
