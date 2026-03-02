import { useState } from "react";
import { c } from "../theme";

const ITEMS = [
  "Count tokens for full assembled prompt",
  "Budget response headroom",
  "Test with multilingual input",
  "Validate structured output (JSON/XML)",
  "Measure real chars/token for your data",
  "Set max_tokens on every API call",
  "Estimate cost at target scale",
];

export const ChecklistFull = () => {
  const [ck, setCk] = useState({});
  const toggle = (i) => setCk((p) => ({ ...p, [i]: !p[i] }));
  const done = Object.values(ck).filter(Boolean).length;
  const allDone = done === ITEMS.length;

  return (
    <div>
      <div style={{ display: "flex", gap: 4, marginBottom: 36 }}>
        {ITEMS.map((_, i) => (
          <div
            key={i}
            style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: ck[i] ? c.green : "rgba(255,255,255,0.06)", transition: "all 0.3s" }}
          />
        ))}
      </div>
      {ITEMS.map((item, i) => (
        <div
          key={i}
          role="checkbox"
          aria-checked={!!ck[i]}
          tabIndex={0}
          onClick={() => toggle(i)}
          onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(i); } }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            padding: "18px 0",
            borderBottom: i < ITEMS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              border: ck[i] ? `2px solid ${c.green}` : "2px solid rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: ck[i] ? `${c.green}18` : "transparent",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
          >
            {ck[i] && <span style={{ color: c.green, fontSize: 16, fontWeight: 700 }}>✓</span>}
          </div>
          <span style={{ fontSize: 19, color: ck[i] ? c.green : c.body, transition: "color 0.2s" }}>{item}</span>
        </div>
      ))}
      <div style={{ marginTop: 24, fontSize: 15, color: c.muted }}>{done}/{ITEMS.length} complete</div>
      {allDone && (
        <div style={{ marginTop: 20, padding: "16px 24px", borderRadius: 12, backgroundColor: `${c.green}0c`, borderLeft: `3px solid ${c.green}50`, fontSize: 20, fontWeight: 600, color: c.green, transition: "all 0.4s" }}>
          You're ready to ship.
        </div>
      )}
    </div>
  );
};
