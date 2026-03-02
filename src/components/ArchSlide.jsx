import { useState } from "react";
import { mono, c } from "../theme";

const ITEMS = [
  {
    tab: "Prompt tax",
    title: "System prompt = per-request tax",
    body: "A 3,000-token system prompt is billed on every API call. At 10,000 requests/day, that's 30 million input tokens/day just for the prompt. Prompt caching and length optimization are architectural decisions. Every token you remove saves money multiplied by every request you'll ever serve.",
    stat: "30M",
    unit: "tokens/day",
  },
  {
    tab: "RAG chunks",
    title: "Chunking is a token problem",
    body: 'When you split documents for retrieval, chunk limits aren\'t "500 words" — they\'re N tokens. Code and prose with the same word count have very different token counts. If you set chunk limits in words, usage is unpredictable. Always chunk by tokens.',
    stat: "2×",
    unit: "variance",
  },
  {
    tab: "Agents",
    title: "Agents multiply costs",
    body: "Every agent step sends the full system prompt + growing history + tool results. A 10-step agent sends the system prompt 10 times. An 8-step agent with a 2K prompt and growing context easily consumes 50K–100K tokens per task.",
    stat: "100K",
    unit: "tokens/task",
  },
  {
    tab: "Ceilings",
    title: "Context windows are hard ceilings",
    body: "If your assembled prompt exceeds the context window, the request fails — or worse, silently truncates. Count tokens before sending. Have a strategy for what to cut. This isn't an edge case — it's routine in any RAG or agent system.",
    stat: "200K",
    unit: "hard limit",
  },
];

export const ArchSlide = () => {
  const [a, setA] = useState(0);
  const d = ITEMS[a];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 48 }}>
        {ITEMS.map((it, i) => (
          <button
            key={i}
            onClick={() => setA(i)}
            style={{
              padding: "10px 18px",
              borderRadius: 12,
              fontSize: 15,
              cursor: "pointer",
              border: "none",
              backgroundColor: a === i ? `${c.blue}18` : "transparent",
              color: a === i ? c.blue : c.muted,
              fontWeight: a === i ? 600 : 400,
              transition: "all 0.25s",
            }}
          >
            {it.tab}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: c.primary, marginBottom: 16 }}>{d.title}</div>
          <div style={{ fontSize: 19, color: c.body, lineHeight: 1.8 }}>{d.body}</div>
        </div>
        <div style={{ textAlign: "center", flexShrink: 0, padding: "24px 32px", backgroundColor: c.surface, borderRadius: 16 }}>
          <div style={{ ...mono, fontSize: 48, fontWeight: 800, color: c.blue }}>{d.stat}</div>
          <div style={{ fontSize: 13, color: c.muted, marginTop: 4 }}>{d.unit}</div>
        </div>
      </div>
    </div>
  );
};
