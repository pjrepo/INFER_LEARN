import { useState, useEffect, useCallback, useMemo } from "react";
import { bg, c, mono, sections } from "./theme";
import { slideDefinitions } from "./slides";

export default function Page() {
  const [slide, setSlide] = useState(() => {
    const n = parseInt(window.location.hash.replace("#", ""), 10);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slides = useMemo(() => slideDefinitions, []);
  const total = slides.length;

  const next = useCallback(() => setSlide((s) => Math.min(s + 1, total - 1)), [total]);
  const prev = useCallback(() => setSlide((s) => Math.max(s - 1, 0)), []);

  // Sync URL hash with current slide
  useEffect(() => {
    history.replaceState(null, "", `#${slide}`);
  }, [slide]);

  // Track fullscreen state
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); prev(); }
      if (e.key === "f" || e.key === "F") { toggleFullscreen(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, toggleFullscreen]);

  // Section metadata
  const currentSection = sections.find((s) => slide >= s.range[0] && slide <= s.range[1]) || sections[0];
  const sectionIdx = sections.indexOf(currentSection);
  const withinSection = slide - currentSection.range[0] + 1;
  const sectionLength = currentSection.range[1] - currentSection.range[0] + 1;

  const CurrentSlide = slides[slide];

  return (
    <div style={{ backgroundColor: bg, color: c.primary, fontFamily: "'Inter',system-ui,sans-serif", minHeight: "100vh", position: "relative" }}>
      <CurrentSlide />

      {/* Navigation bar */}
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "8px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: `${bg}ee`,
          backdropFilter: "blur(8px)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          zIndex: 100,
        }}
      >
        {/* Prev / Next */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={prev}
            disabled={slide === 0}
            style={{
              padding: "5px 12px", borderRadius: 8, border: "none",
              backgroundColor: slide === 0 ? "transparent" : c.surface,
              color: slide === 0 ? c.dim : c.body,
              cursor: slide === 0 ? "default" : "pointer", fontSize: 13,
            }}
          >
            ← Prev
          </button>
          <button
            onClick={next}
            disabled={slide === total - 1}
            style={{
              padding: "5px 12px", borderRadius: 8, border: "none",
              backgroundColor: slide === total - 1 ? "transparent" : `${c.blue}18`,
              color: slide === total - 1 ? c.dim : c.blue,
              cursor: slide === total - 1 ? "default" : "pointer",
              fontSize: 13, fontWeight: 500,
            }}
          >
            Next →
          </button>
        </div>

        {/* Section progress */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, justifyContent: "center", margin: "0 24px" }}>
          {sections.map((sec, i) => {
            const isActive = i === sectionIdx;
            const isPast = i < sectionIdx;
            return (
              <div
                key={i}
                onClick={() => setSlide(sec.range[0])}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  cursor: "pointer", padding: "4px 10px", borderRadius: 6,
                  backgroundColor: isActive ? `${c.blue}12` : "transparent",
                  transition: "all 0.3s",
                }}
              >
                <div
                  style={{
                    width: isActive ? 20 : 8, height: 4, borderRadius: 2,
                    backgroundColor: isPast ? c.blue : isActive ? c.blue : "rgba(255,255,255,0.08)",
                    opacity: isPast ? 0.4 : 1,
                    transition: "all 0.3s",
                  }}
                />
                {isActive && (
                  <span style={{ fontSize: 12, color: c.blue, fontWeight: 600, whiteSpace: "nowrap" }}>
                    {sec.name} · {withinSection}/{sectionLength}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Slide counter + fullscreen */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 60, justifyContent: "flex-end" }}>
          <div style={{ ...mono, fontSize: 13, color: c.dim }}>{slide + 1} / {total}</div>
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit fullscreen (F)" : "Fullscreen (F)"}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            style={{ padding: "6px 10px", borderRadius: 8, border: "none", backgroundColor: c.surface, color: c.muted, cursor: "pointer", fontSize: 14, lineHeight: 1 }}
          >
            {isFullscreen ? "⊠" : "⛶"}
          </button>
        </div>
      </nav>
    </div>
  );
}
