import React, { useEffect, useMemo, useRef, useState } from "react";
import cloud from "d3-cloud";

// Skills cloud in the About panel. Layout by d3-cloud, drawn as SVG text so each word can move on its own:
// the words assemble once when scrolled into view, slide away from a mouse pointer, and the hovered one stands out.
// Words are proper nouns and technical terms, so they are not translated.
const words = [
  // PROFESSIONS (strong visual emphasis)
  { text: "AI Engineer", value: 150 },
  { text: "Full Stack Engineer", value: 150 },
  { text: "Data Engineer", value: 150 },

  // CORE STACK
  { text: "Python", value: 100 },
  { text: "LLMs", value: 100 },
  { text: "AI Agents", value: 90 },
  { text: "Data Pipelines", value: 85 },
  { text: "Web Scraping", value: 80 },
  { text: "FastAPI", value: 75 },
  { text: "Docker", value: 75 },
  { text: "SQL", value: 70 },

  // SUPPORTING HARD SKILLS
  { text: "Backend", value: 60 },
  { text: "REST APIs", value: 55 },
  { text: "Data Enrichment", value: 55 },
  { text: "CI/CD", value: 55 },
  { text: "Bazel", value: 50 },
  { text: "AWS", value: 50 },
  { text: "Google Cloud", value: 50 },
  { text: "Quantum Computing", value: 50 },
  { text: "Machine Learning", value: 50 },
  { text: "MLOps", value: 50 },
  { text: "ETL Pipelines", value: 50 },
  { text: "React", value: 50 },
  { text: "LLM Evaluation", value: 45 },
  { text: "Fine-Tuning", value: 45 },
  { text: "Tailwind", value: 40 },
  { text: "Playwright", value: 40 },
  { text: "Pydantic", value: 40 },
  { text: "Monorepo", value: 40 },
  { text: "Datasets", value: 40 },
  { text: "Data Scientist", value: 40 },
  { text: "Pandas", value: 45 },
  { text: "NumPy", value: 45 },
  { text: "PyTorch", value: 50 },
  { text: "Scikit-Learn", value: 50 },
  { text: "Streamlit", value: 50 },
  { text: "Airflow", value: 50 },
  { text: "Git", value: 40 },
  { text: "Linux", value: 40 },
  { text: "Selenium", value: 30 },
  { text: "BeautifulSoup", value: 30 },
  { text: "Pennylane", value: 35 },
  { text: "Time Series", value: 30 },
  { text: "Qiskit", value: 25 },
  { text: "Classification", value: 25 },
  { text: "Regression", value: 25 },

  // SOFT SKILLS
  { text: "Ownership", value: 40 },
  { text: "Problem Solving", value: 40 },
  { text: "Communication", value: 35 },
  { text: "Teamwork", value: 35 },
  { text: "Curiosity", value: 35 },
  { text: "Initiative", value: 35 },
  { text: "Leadership", value: 30 },
  { text: "Empathy", value: 30 },
  { text: "Creativity", value: 30 },
  { text: "Learning", value: 30 },
  { text: "Autonomy", value: 28 },

  // LANGUAGES
  { text: "English", value: 40 },
  { text: "Portuguese", value: 30 },
  { text: "French", value: 20 },
  { text: "Spanish", value: 10 },
];

// the cloud keeps its original palette (the one exception to the site's single accent, see docs/STYLE_GUIDE.md)
const COLORS = [
  "#ff6fae", // glow pink
  "#ff9ccb", // light pink
  "#f2789f", // rose
  "#c4a7ff", // lilac
  "#a78bfa", // violet
  "#e6def0", // soft white
  "#b3a6c4", // muted lavender
];

const FONT = "Bricolage Grotesque";
const PUSH_RADIUS = 120; // px around the pointer where words make room
const PUSH_MAX = 26;     // px a word moves at most
const STANDOUT = 1.3;    // scale of the hovered word

// small seeded generator, so the layout and colors are the same on every visit
function seeded(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function WordCloudSection() {
  const boxRef = useRef(null);
  const groupRefs = useRef([]);
  const textRefs = useRef([]);
  const [width, setWidth] = useState(0);
  const [placed, setPlaced] = useState([]);
  const [shown, setShown] = useState(false);
  const [settled, setSettled] = useState(false); // entrance finished, pointer motion takes over

  // phones get a taller, smaller-type cloud so (almost) every word still fits
  const height = width && width < 500 ? 560 : 520;

  // follow the container width; small changes do not re-run the layout
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width);
      setWidth((prev) => (Math.abs(prev - w) > 40 ? w : prev));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // layout once the font is ready (d3-cloud measures the words on a canvas)
  useEffect(() => {
    if (!width) return;
    let cancelled = false;
    const values = words.map((w) => w.value);
    const vmin = Math.min(...values), vmax = Math.max(...values);
    const [fmin, fmax] = width < 500 ? [8, Math.max(18, Math.round(width / 13))] : [10, Math.min(38, Math.round(width / 18))];
    const size = (v) => fmin + (fmax - fmin) * Math.sqrt((v - vmin) / (vmax - vmin));
    const pick = seeded(11);
    (async () => {
      try { await document.fonts?.load(`600 32px "${FONT}"`); } catch { /* use whatever font is loaded */ }
      if (cancelled) return;
      cloud()
        .size([width, height])
        .words(words.map((w) => ({ ...w, size: size(w.value), color: COLORS[Math.floor(pick() * COLORS.length)] })))
        .padding(2)
        .rotate(0)
        .font(FONT)
        .fontWeight(500)
        .fontSize((d) => d.size)
        .spiral("archimedean")
        .random(seeded(7))
        .on("end", (out) => { if (!cancelled) setPlaced(out); })
        .start();
    })();
    return () => { cancelled = true; };
  }, [width, height]);

  // assemble the first time the cloud scrolls into view
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!shown) return;
    const timer = setTimeout(() => setSettled(true), reducedMotion() ? 0 : 2000);
    return () => clearTimeout(timer);
  }, [shown]);

  // entrance order: biggest words first
  const delays = useMemo(() => {
    const ranked = [...placed].sort((a, b) => b.value - a.value);
    return Object.fromEntries(ranked.map((w, i) => [w.text, Math.round((i / Math.max(1, ranked.length - 1)) * 900)]));
  }, [placed]);

  // Pointer motion. Styles are written straight to the SVG nodes so a mouse move does not re-render React.
  useEffect(() => {
    const box = boxRef.current;
    if (!box || !settled || !placed.length) return;
    const still = reducedMotion();
    let frame = 0, pointer = null, touchTimer = 0;
    // the real text bounds of each word, relative to its anchor (d3-cloud's own boxes are loose and overlap)
    const bounds = placed.map((_, i) => {
      try { return textRefs.current[i]?.getBBox(); } catch { return null; }
    });

    const paint = () => {
      frame = 0;
      let hovered = -1, best = Infinity;
      if (pointer) {
        placed.forEach((w, i) => {
          const b = bounds[i];
          if (!b) return;
          const inside = pointer.x >= w.x + b.x && pointer.x <= w.x + b.x + b.width
            && pointer.y >= w.y + b.y && pointer.y <= w.y + b.y + b.height;
          if (inside && b.width * b.height < best) { best = b.width * b.height; hovered = i; }
        });
      }
      placed.forEach((w, i) => {
        const g = groupRefs.current[i], txt = textRefs.current[i];
        if (!g || !txt) return;
        let dx = 0, dy = 0;
        if (pointer && i !== hovered && !still) {
          const vx = w.x - pointer.x, vy = w.y - pointer.y;
          const d = Math.hypot(vx, vy) || 1;
          if (d < PUSH_RADIUS) {
            const k = (1 - d / PUSH_RADIUS) * PUSH_MAX;
            dx = (vx / d) * k; dy = (vy / d) * k;
          }
        }
        const scale = i === hovered && !still ? STANDOUT : 1;
        g.style.transform = `translate(${w.x + dx}px, ${w.y + dy}px) scale(${scale})`;
        g.style.opacity = hovered >= 0 && i !== hovered ? "0.55" : "1";
        txt.style.fill = i === hovered ? "#ffffff" : w.color;
        txt.style.fontWeight = i === hovered ? "700" : "500";
        txt.style.filter = i === hovered ? "drop-shadow(0 0 6px rgba(242,120,159,0.55))" : "none";
      });
    };
    const toLocal = (e) => {
      const r = box.getBoundingClientRect();
      return { x: e.clientX - r.left - r.width / 2, y: e.clientY - r.top - r.height / 2 };
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const onMove = (e) => {
      if (e.pointerType !== "mouse") return;
      pointer = toLocal(e);
      schedule();
    };
    const onLeave = () => { pointer = null; schedule(); };
    // touch: a tap makes that word stand out for a moment, without pushing the others
    const onDown = (e) => {
      if (e.pointerType === "mouse") return;
      pointer = toLocal(e);
      schedule();
      clearTimeout(touchTimer);
      touchTimer = setTimeout(() => { pointer = null; schedule(); }, 1200);
    };
    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerleave", onLeave);
    box.addEventListener("pointerdown", onDown);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(touchTimer);
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerleave", onLeave);
      box.removeEventListener("pointerdown", onDown);
    };
  }, [settled, placed]);

  return (
    <div className="mt-8">
      {/* the full list for screen readers; the drawing is decorative */}
      <p className="sr-only">{words.map((w) => w.text).join(", ")}</p>
      <div ref={boxRef} className="relative w-full select-none" style={{ height: height || 500 }}>
        {width > 0 && (
          <svg
            aria-hidden="true"
            width={width}
            height={height}
            viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
            className="overflow-visible"
          >
            {placed.map((w, i) => {
              const delay = settled ? 0 : delays[w.text] ?? 0;
              return (
                <g
                  key={w.text}
                  ref={(el) => { groupRefs.current[i] = el; }}
                  style={{
                    transform: shown ? `translate(${w.x}px, ${w.y}px)` : "translate(0px, 0px) scale(0.3)",
                    opacity: shown ? 1 : 0,
                    transition: settled
                      ? "transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.3s ease"
                      : `transform 1s cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms, opacity 0.5s ease ${delay}ms`,
                  }}
                >
                  <text
                    ref={(el) => { textRefs.current[i] = el; }}
                    textAnchor="middle"
                    style={{
                      fontFamily: `"${FONT}", system-ui, sans-serif`,
                      fontSize: w.size,
                      fontWeight: 500,
                      fill: w.color,
                      transition: "fill 0.25s, filter 0.25s",
                      cursor: "default",
                    }}
                  >
                    {w.text}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>
    </div>
  );
}
