import { mono, c } from "../theme";

const ITEMS = [
  { type: "English prose", ratio: "~4", pct: 100, color: c.green },
  { type: "Code", ratio: "~2–3", pct: 62, color: c.blue },
  { type: "JSON / structured", ratio: "~2–3", pct: 62, color: c.blue },
  { type: "CJK languages", ratio: "~1–2", pct: 37, color: c.red },
  { type: "Hindi, Arabic", ratio: "~1.5–2.5", pct: 50, color: c.red },
];

export const CharsRef = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    {ITEMS.map((it, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 17, color: c.body, width: 160 }}>{it.type}</span>
        <div style={{ flex: 1, height: 10, backgroundColor: c.surface, borderRadius: 5, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${it.pct}%`, borderRadius: 5, backgroundColor: it.color, opacity: 0.4, transition: "width 0.8s" }} />
        </div>
        <span style={{ ...mono, fontSize: 17, color: it.color, width: 64, textAlign: "right", fontWeight: 600 }}>{it.ratio}</span>
      </div>
    ))}
  </div>
);
