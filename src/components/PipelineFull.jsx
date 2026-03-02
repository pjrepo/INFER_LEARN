import { useState } from "react";
import { mono, c } from "../theme";

export const PipelineFull = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { icon: "✏️", label: "Your Text", val: '"Hello world"', note: "What you type", color: "#e2e8f0" },
    { icon: "🔪", label: "Tokenizer", val: "[15339, 1917]", note: "BPE → integer IDs", color: c.blue },
    { icon: "📊", label: "Embeddings", val: "[0.023, -0.41, 0.87, ...]", note: "100K × 4,096 matrix lookup", color: "#a78bfa" },
    { icon: "⚡", label: "Transformer", val: "Attention → FFN → Layers", note: "Pure math on vectors", color: "#fbbf24" },
    { icon: "🎲", label: "Distribution", val: "P(!) = 0.42, P(.) = 0.31", note: "Probabilities over vocab", color: "#fb923c" },
    { icon: "✨", label: "Output", val: '"!"', note: "Decoded back to text", color: c.green },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {steps.map((s, i) => {
        const a = i === step;
        return (
          <div
            key={i}
            onClick={() => setStep(i)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "16px 20px",
              borderRadius: 16,
              cursor: "pointer",
              transition: "all 0.4s",
              backgroundColor: a ? `${s.color}0c` : "transparent",
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                flexShrink: 0,
                backgroundColor: a ? `${s.color}15` : c.surface,
                transition: "all 0.4s",
              }}
            >
              {s.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: a ? s.color : c.muted,
                  transition: "color 0.4s",
                  marginBottom: 3,
                }}
              >
                {s.label}
              </div>
              <div style={{ ...mono, fontSize: 17, color: a ? c.primary : c.dim, transition: "color 0.4s" }}>
                {s.val}
              </div>
            </div>
            <div
              style={{
                fontSize: 14,
                color: a ? c.muted : "transparent",
                transition: "color 0.4s",
                textAlign: "right",
                maxWidth: 180,
              }}
            >
              {s.note}
            </div>
          </div>
        );
      })}
    </div>
  );
};
