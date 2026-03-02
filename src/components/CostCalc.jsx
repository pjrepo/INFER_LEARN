import { useState } from "react";
import { mono, c } from "../theme";

const MODELS = [
  { name: "Haiku", price: 0.25, color: c.green },
  { name: "Sonnet", price: 3.0, color: c.blue },
  { name: "Opus", price: 15.0, color: "#a78bfa" },
];

export const CostCalc = () => {
  const [pt, setPt] = useState(3000);
  const [rq, setRq] = useState(10000);

  const sliders = [
    { label: "System Prompt Tokens", val: pt, set: setPt, min: 500, max: 10000 },
    { label: "Daily Requests", val: rq, set: setRq, min: 100, max: 100000 },
  ];

  return (
    <div>
      <div style={{ display: "flex", gap: 64, marginBottom: 48 }}>
        {sliders.map((s, i) => (
          <div key={i} style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: c.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
              {s.label}
            </div>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={100}
              value={s.val}
              onChange={(e) => s.set(+e.target.value)}
              style={{ width: "100%", accentColor: c.blue, height: 6 }}
            />
            <div style={{ ...mono, fontSize: 40, color: c.primary, marginTop: 8, fontWeight: 700 }}>
              {s.val.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 32 }}>
        {MODELS.map((m) => {
          const daily = (pt * rq * m.price) / 1e6;
          const monthly = daily * 30;
          return (
            <div key={m.name} style={{ flex: 1, padding: "28px 0" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: m.color, marginBottom: 14 }}>{m.name}</div>
              <div style={{ ...mono, fontSize: 44, color: c.primary, fontWeight: 800 }}>
                ${monthly < 1 ? monthly.toFixed(2) : monthly < 100 ? monthly.toFixed(0) : monthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div style={{ fontSize: 14, color: c.muted, marginTop: 8 }}>${daily.toFixed(2)}/day · system prompt only</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
