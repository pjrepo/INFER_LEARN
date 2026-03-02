import { useState } from "react";
import { mono, c } from "../theme";

// Corpus: "the cat sat on the mat the cat"
const STEPS = [
  {
    tokens: ["t","h","e"," ","c","a","t"," ","s","a","t"," ","o","n"," ","t","h","e"," ","m","a","t"," ","t","h","e"," ","c","a","t"],
    merge: null,
    label: "Start: Individual characters",
    note: 'Corpus: "the cat sat on the mat the cat" — 30 characters',
  },
  {
    tokens: ["t","h","e"," ","c","at"," ","s","at"," ","o","n"," ","t","h","e"," ","m","at"," ","t","h","e"," ","c","at"],
    merge: "at",
    label: 'Merge (a,t) → "at"',
    note: "Frequency: 4 — cat×2, sat, mat",
  },
  {
    tokens: ["th","e"," ","c","at"," ","s","at"," ","o","n"," ","th","e"," ","m","at"," ","th","e"," ","c","at"],
    merge: "th",
    label: 'Merge (t,h) → "th"',
    note: "Frequency: 3 — the×3",
  },
  {
    tokens: ["the"," ","c","at"," ","s","at"," ","o","n"," ","the"," ","m","at"," ","the"," ","c","at"],
    merge: "the",
    label: 'Merge (th,e) → "the"',
    note: "Frequency: 3 — the cat, the mat, the cat",
  },
  {
    tokens: ["the"," ","cat"," ","s","at"," ","o","n"," ","the"," ","m","at"," ","the"," ","cat"],
    merge: "cat",
    label: 'Merge (c,at) → "cat"',
    note: "30 characters → compact vocabulary",
  },
];

export const BPEFull = () => {
  const [step, setStep] = useState(0);
  const s = STEPS[step];
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 22, fontWeight: 600, color: c.primary, marginBottom: 6 }}>{s.label}</div>
        <div style={{ fontSize: 16, color: c.muted }}>{s.note}</div>
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
        {s.tokens.map((t, i) => (
          <div
            key={`${step}-${i}`}
            style={{
              padding: "8px 14px",
              borderRadius: 10,
              ...mono,
              fontSize: 18,
              backgroundColor: t === s.merge ? `${c.blue}15` : c.surface,
              color: t === s.merge ? c.blue : c.body,
              boxShadow: t === s.merge ? `0 0 30px ${c.blue}12` : "none",
              transform: t === s.merge ? "scale(1.1)" : "scale(1)",
              transition: "all 0.3s",
            }}
          >
            {t === " " ? "␣" : t}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center" }}>
        <button
          onClick={() => setStep((n) => Math.max(0, n - 1))}
          disabled={step === 0}
          aria-label="Previous BPE step"
          style={{
            padding: "6px 14px",
            borderRadius: 8,
            border: "none",
            backgroundColor: step === 0 ? "transparent" : c.surface,
            color: step === 0 ? c.dim : c.body,
            cursor: step === 0 ? "default" : "pointer",
            fontSize: 13,
          }}
        >
          ← Prev
        </button>
        <div style={{ display: "flex", gap: 4 }}>
          {STEPS.map((_, i) => (
            <div
              key={i}
              onClick={() => setStep(i)}
              role="button"
              aria-label={`BPE step ${i + 1}`}
              style={{
                width: i <= step ? 28 : 10,
                height: 5,
                borderRadius: 3,
                backgroundColor: i <= step ? c.blue : "rgba(255,255,255,0.08)",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => setStep((n) => Math.min(STEPS.length - 1, n + 1))}
          disabled={step === STEPS.length - 1}
          aria-label="Next BPE step"
          style={{
            padding: "6px 14px",
            borderRadius: 8,
            border: "none",
            backgroundColor: step === STEPS.length - 1 ? "transparent" : `${c.blue}18`,
            color: step === STEPS.length - 1 ? c.dim : c.blue,
            cursor: step === STEPS.length - 1 ? "default" : "pointer",
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
};
