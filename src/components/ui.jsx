import { useState, useEffect } from "react";
import { mono, bg, c, sections } from "../theme";

export const Slide = ({ children, variant = "default" }) => {
  const bgs = { default: bg, dark: "#0c0c10", danger: "#110c0c" };
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "60px 48px 80px",
        boxSizing: "border-box",
        backgroundColor: bgs[variant] || bg,
        position: "relative",
      }}
      className="slide-inner"
    >
      <div style={{ maxWidth: 880, width: "100%", margin: "0 auto" }}>
        {children}
      </div>
    </div>
  );
};

export const Divider = ({ children }) => (
  <div
    style={{
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "60px 48px 80px",
      boxSizing: "border-box",
      backgroundColor: "#000000",
    }}
  >
    <div
      style={{
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: 4,
        color: c.dim,
        textTransform: "uppercase",
        marginBottom: 24,
      }}
    >
      Part {sections.findIndex((s) => s.name === children) + 1}
    </div>
    <h2
      style={{
        fontSize: 64,
        fontWeight: 800,
        color: c.primary,
        letterSpacing: -2,
        textAlign: "center",
      }}
    >
      {children}
    </h2>
  </div>
);

export const Label = ({ children }) => (
  <div
    style={{
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 3,
      color: c.blue,
      textTransform: "uppercase",
      marginBottom: 20,
    }}
  >
    {children}
  </div>
);

export const Big = ({ children }) => (
  <h2
    style={{
      fontSize: 56,
      fontWeight: 800,
      color: c.primary,
      lineHeight: 1.1,
      marginBottom: 0,
      letterSpacing: -1.5,
    }}
  >
    {children}
  </h2>
);

export const Body = ({ children, style: s }) => (
  <p
    style={{
      fontSize: 20,
      color: c.body,
      lineHeight: 1.8,
      maxWidth: 640,
      margin: 0,
      ...s,
    }}
  >
    {children}
  </p>
);

export const Code = ({ children }) => (
  <div
    style={{
      ...mono,
      fontSize: 15,
      backgroundColor: c.surface,
      borderRadius: 12,
      padding: "20px 24px",
      overflowX: "auto",
      whiteSpace: "pre",
      lineHeight: 1.85,
      color: "rgba(255,255,255,0.7)",
    }}
  >
    {children}
  </div>
);

export const Chip = ({ label, color = c.blue, delay = 0 }) => {
  const [v, setV] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setV(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <span
      style={{
        display: "inline-flex",
        padding: "6px 14px",
        borderRadius: 8,
        backgroundColor: `${color}18`,
        color,
        ...mono,
        fontSize: 15,
        fontWeight: 500,
        opacity: v ? 1 : 0,
        transform: v ? "translateY(0)" : "translateY(8px)",
        transition: "all 0.4s ease-out",
      }}
    >
      {label}
    </span>
  );
};

export const Counter = ({ end, suffix = "" }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    let s = 0;
    const step = end / 90;
    const i = setInterval(() => {
      s += step;
      if (s >= end) {
        setN(end);
        clearInterval(i);
      } else setN(Math.floor(s));
    }, 16);
    return () => clearInterval(i);
  }, [end]);
  return (
    <span>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
};
