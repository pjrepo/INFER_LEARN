import { useState } from "react";
import { c } from "../theme";

const MODES = [
  {
    icon: "🔧",
    title: "JSON breaks at token boundaries",
    body: "The model doesn't have a syntax tree. It predicts token-by-token. Closing braces are separate tokens. If the distribution shifts, the brace never appears. Your parser crashes.",
    defense: "Validate structured output. JSON repair libraries. Constrained decoding.",
  },
  {
    icon: "✂️",
    title: "Silent context truncation",
    body: "Input exceeds the window. Some APIs error. Some silently truncate — dropping the last chunks, which might be the most relevant. You measured in words, not tokens.",
    defense: "Count tokens before every request. Token budgets. Alert at 90% capacity.",
  },
  {
    icon: "🌍",
    title: "Multilingual token explosion",
    body: "Launch in Japan. Costs triple. Quality drops. Japanese ≈ 2–3× more tokens per semantic unit. All budgets calibrated for English.",
    defense: "Test every target language. Per-language token budgets. Monitor costs separately.",
  },
  {
    icon: "👻",
    title: "Unicode injection attacks",
    body: "Zero-width characters and homoglyphs look identical to humans but tokenize differently. Attackers bypass content filters at the token level.",
    defense: "NFC Unicode normalization. Strip zero-width characters before tokenization.",
  },
  {
    icon: "🔑",
    title: "JSON key fragmentation",
    body: '"patient_diagnosis" tokenizes as ["patient", "_", "diagnosis"] or ["patient", "_di", "agnosis"] depending on context. Your exact-match parser breaks.',
    defense: "Fuzzy key matching. Schema validation + retry. Function calling for strict schemas.",
  },
  {
    icon: "💸",
    title: "Cost runaway from token density",
    body: "Estimated ~4 chars/token. Code is ~2–3. Actual costs 50–100% higher than projected.",
    defense: "Tokenize representative samples of actual data. Never use generic ratios.",
  },
];

export const FailureTabs = () => {
  const [a, setA] = useState(0);
  const d = MODES[a];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 48, flexWrap: "wrap" }}>
        {MODES.map((m, i) => (
          <button
            key={i}
            onClick={() => setA(i)}
            aria-label={m.title}
            title={m.title}
            style={{
              padding: "10px 16px",
              borderRadius: 12,
              fontSize: 16,
              cursor: "pointer",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
              backgroundColor: a === i ? `${c.red}18` : "transparent",
              color: a === i ? c.red : c.muted,
              fontWeight: a === i ? 600 : 400,
              transition: "all 0.25s",
            }}
          >
            <span>{m.icon}</span>
          </button>
        ))}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: c.primary, marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontSize: 28 }}>{d.icon}</span>
        {d.title}
      </div>
      <div style={{ fontSize: 19, color: c.body, lineHeight: 1.8, maxWidth: 680, marginBottom: 24 }}>{d.body}</div>
      <div style={{ padding: "16px 20px", backgroundColor: `${c.green}08`, borderLeft: `3px solid ${c.green}50`, borderRadius: "0 10px 10px 0" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: c.green, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Defense</div>
        <div style={{ fontSize: 16, color: c.body, lineHeight: 1.7 }}>{d.defense}</div>
      </div>
    </div>
  );
};
