import { mono, c } from "../theme";

const LANGS = [
  { lang: "English", tokens: 6, flag: "🇺🇸" },
  { lang: "Spanish", tokens: 7, flag: "🇪🇸" },
  { lang: "Chinese", tokens: 11, flag: "🇨🇳" },
  { lang: "Japanese", tokens: 13, flag: "🇯🇵" },
  { lang: "Arabic", tokens: 14, flag: "🇸🇦" },
  { lang: "Hindi", tokens: 18, flag: "🇮🇳" },
];

export const LangChart = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    {LANGS.map((l, i) => {
      const r = l.tokens / 6;
      const danger = r > 2;
      return (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 24, width: 32 }}>{l.flag}</span>
          <span style={{ fontSize: 16, color: c.body, width: 90 }}>{l.lang}</span>
          <div style={{ flex: 1, height: 32, backgroundColor: c.surface, borderRadius: 8, overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", height: "100%", width: `${(6 / 18) * 100}%`, borderRight: "1px dashed rgba(255,255,255,0.1)" }} />
            <div
              style={{
                height: "100%",
                borderRadius: 8,
                width: `${(l.tokens / 18) * 100}%`,
                background: danger ? `linear-gradient(90deg, ${c.blue}30, ${c.red}35)` : `${c.blue}25`,
                display: "flex",
                alignItems: "center",
                paddingLeft: 12,
                transition: "width 0.8s",
              }}
            >
              <span style={{ ...mono, fontSize: 14, color: danger ? c.red : c.body }}>{l.tokens} tokens</span>
            </div>
          </div>
          <span style={{ ...mono, fontSize: 15, width: 50, textAlign: "right", color: danger ? c.red : c.green, fontWeight: 600 }}>
            {r.toFixed(1)}×
          </span>
        </div>
      );
    })}
    <div style={{ fontSize: 14, color: c.muted, marginTop: 8 }}>
      Dashed line = English baseline (6 tokens). Same meaning. Wildly different cost.
    </div>
  </div>
);
