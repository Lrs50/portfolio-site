import React, { useEffect, useRef, useState } from "react";

// A section box that fades and rises into place once, the first time it enters the view.
// With reduced motion it is visible from the start. After the transition the transform is removed,
// so the box does not become a containing block for anything inside it.
const reduced = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [state, setState] = useState(() => (reduced() ? "done" : "hidden")); // hidden | shown | done

  useEffect(() => {
    if (state !== "hidden") return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setState("shown"); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [state]);

  const look = {
    hidden: "opacity-0 translate-y-6",
    shown: "opacity-100 translate-y-0 transition duration-700 ease-out",
    done: "",
  }[state];

  return (
    <div
      ref={ref}
      style={state === "shown" ? { transitionDelay: `${delay}ms` } : undefined}
      onTransitionEnd={(e) => { if (e.target === ref.current && state === "shown") setState("done"); }}
      className={`${look} ${className}`}
    >
      {children}
    </div>
  );
}
