import { mono, bg, c } from "../theme";

const ITEMS = [
  { label: "System prompt", t: 3000, color: c.blue },
  { label: "RAG chunks (10×500)", t: 5000, color: "#a78bfa" },
  { label: "Conversation (15 turns)", t: 4500, color: "#fb923c" },
  { label: "User query", t: 50, color: c.green },
  { label: "Response headroom", t: 4000, color: c.red },
];

const WIN = 200000;
const used = ITEMS.reduce((s, i) => s + i.t, 0);

export const CtxBudget = () => (
  <div>
    <div style={{ display: "flex", height: 40, borderRadius: 10, overflow: "hidden", backgroundColor: c.surface, marginBottom: 28 }}>
      {ITEMS.map((it, i) => (
        <div
          key={i}
          title={`${it.label}: ${it.t.toLocaleString()}`}
          style={{ width: `${Math.max((it.t / WIN) * 100, 0.5)}%`, backgroundColor: it.color, opacity: 0.35, borderRight: `2px solid ${bg}` }}
        />
      ))}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 12, color: c.dim }}>{((WIN - used) / 1000).toFixed(0)}K free</span>
      </div>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginBottom: 20 }}>
      {ITEMS.map((it, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: it.color, opacity: 0.5 }} />
          <span style={{ fontSize: 15, color: c.body }}>{it.label}</span>
          <span style={{ ...mono, fontSize: 14, color: c.muted }}>{(it.t / 1000).toFixed(it.t < 100 ? 2 : 0)}K</span>
        </div>
      ))}
    </div>
    <div style={{ ...mono, fontSize: 18, color: c.body }}>
      {(used / 1000).toFixed(1)}K / 200K used —{" "}
      <span style={{ color: c.green }}>
        {((WIN - used) / 1000).toFixed(0)}K remaining ({(((WIN - used) / WIN) * 100).toFixed(0)}%)
      </span>
    </div>
    <div style={{ fontSize: 16, color: c.muted, marginTop: 16 }}>Now imagine the user uploads an 80,000-token document...</div>
    <div style={{ ...mono, fontSize: 18, color: c.red, marginTop: 8 }}>
      {((WIN - used - 80000) / 1000).toFixed(0)}K remaining — getting tight.
    </div>
  </div>
);
