import { mono, c } from "../theme";

const ROWS = [
  { s: "No optimization", o: "$1,282", so: "$257", h: "$21" },
  { s: "+ Prompt caching (90%)", o: "$209", so: "$42", h: "$3.50" },
  { s: "+ Route 80% to Haiku", o: "$63", so: "—", h: "—", hl: true },
];

export const OptTable = () => (
  <div>
    <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      {["Strategy", "Opus /mo", "Sonnet", "Haiku"].map((h, i) => (
        <div key={i} style={{ fontSize: 13, fontWeight: 600, color: c.muted, textTransform: "uppercase", letterSpacing: 1, textAlign: i > 0 ? "right" : "left" }}>
          {h}
        </div>
      ))}
    </div>
    {ROWS.map((r, i) => (
      <div
        key={i}
        style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", padding: "16px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
      >
        <div style={{ fontSize: 17, color: r.hl ? c.green : c.body, fontWeight: r.hl ? 600 : 400 }}>{r.s}</div>
        <div style={{ ...mono, fontSize: 17, color: r.hl ? c.green : c.body, textAlign: "right", fontWeight: r.hl ? 700 : 400 }}>{r.o}</div>
        <div style={{ ...mono, fontSize: 17, color: c.muted, textAlign: "right" }}>{r.so}</div>
        <div style={{ ...mono, fontSize: 17, color: c.muted, textAlign: "right" }}>{r.h}</div>
      </div>
    ))}
    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 16, marginTop: 8, borderTop: `1px solid ${c.green}25` }}>
      <span style={{ fontSize: 16, color: c.green, fontWeight: 600 }}>Total savings</span>
      <span style={{ ...mono, fontSize: 20, color: c.green, fontWeight: 800 }}>95%</span>
    </div>
  </div>
);
