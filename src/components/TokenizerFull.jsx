import { useState } from "react";
import { mono, c } from "../theme";
import { Chip } from "./ui";

const EXAMPLES = {
  "Hello world": { tokens: ["Hello", " world"], ids: [15339, 1917] },
  unhappiness: { tokens: ["un", "happiness"], ids: [359, 109322] },
  strawberry: { tokens: ["str", "aw", "berry"], ids: [496, 675, 15717] },
  ChatGPT: { tokens: ["Chat", "G", "PT"], ids: [16047, 38, 2898] },
  "こんにちは世界": { tokens: ["こん", "にち", "は", "世", "界"], ids: [2515, 22656, 461, 616, 3041] },
  '{"key":"val"}': { tokens: ['{"', "key", '":"', "val", '"}'], ids: [64, 609, 3290, 838, 9388] },
  xqzplfmnt: { tokens: ["x", "q", "z", "pl", "fm", "nt"], ids: [87, 80, 89, 489, 2689, 429] },
};

const CHIP_COLORS = [c.blue, "#a78bfa", c.green, "#fb923c", c.red, "#fbbf24"];

export const TokenizerFull = () => {
  const [input, setInput] = useState("Hello world");
  const d = EXAMPLES[input] || EXAMPLES["Hello world"];
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
        {Object.keys(EXAMPLES).map((p) => (
          <button
            key={p}
            onClick={() => setInput(p)}
            style={{
              padding: "8px 18px",
              borderRadius: 24,
              fontSize: 15,
              ...mono,
              cursor: "pointer",
              border: "none",
              backgroundColor: input === p ? `${c.blue}20` : c.surface,
              color: input === p ? c.blue : c.muted,
              fontWeight: input === p ? 600 : 400,
              transition: "all 0.2s",
            }}
          >
            {p}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", marginBottom: 36 }}>
        <div style={{ ...mono, fontSize: 28, color: c.primary, padding: "12px 24px", borderRadius: 14, backgroundColor: c.surface }}>
          "{input}"
        </div>
        <div style={{ color: c.dim, fontSize: 28 }}>→</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {d.tokens.map((t, i) => (
            <Chip key={`${input}-${i}`} label={`"${t}"`} color={CHIP_COLORS[i % CHIP_COLORS.length]} delay={i * 100} />
          ))}
        </div>
        <div style={{ color: c.dim, fontSize: 28 }}>→</div>
        <div style={{ ...mono, fontSize: 17, color: c.green, padding: "12px 20px", borderRadius: 12, backgroundColor: `${c.green}0c` }}>
          [{d.ids.join(", ")}]
        </div>
      </div>
      <div style={{ display: "flex", gap: 48 }}>
        {[
          { l: "Tokens", v: d.tokens.length, col: c.blue },
          { l: "Characters", v: input.length, col: c.muted },
          { l: "Chars/Token", v: (input.length / d.tokens.length).toFixed(1), col: "#fbbf24" },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ fontSize: 32, fontWeight: 700, ...mono, color: s.col }}>{s.v}</div>
            <div style={{ fontSize: 13, color: c.muted, marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
