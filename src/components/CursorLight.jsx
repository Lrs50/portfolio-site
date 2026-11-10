import React, { useEffect, useRef } from "react";

// A soft wine glow that follows a mouse pointer behind the panels, and the lit border on every
// `.spotlight` element near it (the ring itself is drawn in src/style.css).
// Mouse only: touch and pen never move it. With reduced motion it is not drawn at all.
// One listener and one animation frame per move; styles are written straight to the nodes.
const REACH = 300; // px from an element's box within which its border lights up

export default function CursorLight() {
  const glowRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0, y = 0, active = false, frame = 0;

    const paint = () => {
      frame = 0;
      if (!active) return;
      const glow = glowRef.current;
      if (glow) {
        glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        glow.style.opacity = "1";
      }
      document.querySelectorAll(".spotlight").forEach((el) => {
        const r = el.getBoundingClientRect();
        const near =
          x > r.left - REACH && x < r.right + REACH && y > r.top - REACH && y < r.bottom + REACH;
        if (near) {
          el.style.setProperty("--mx", `${(x - r.left).toFixed(0)}px`);
          el.style.setProperty("--my", `${(y - r.top).toFixed(0)}px`);
          el.dataset.lit = "1";
        } else if (el.dataset.lit) {
          delete el.dataset.lit;
        }
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    // touch or pen on a hybrid laptop: the cursor is hidden, so the light goes too
    const onMove = (e) => {
      if (e.pointerType !== "mouse") return clear();
      x = e.clientX;
      y = e.clientY;
      active = true;
      schedule();
    };
    // panels move under a still pointer while scrolling, so the rings follow the scroll too
    const onScroll = () => active && schedule();
    const clear = () => {
      active = false;
      if (glowRef.current) glowRef.current.style.opacity = "0";
      document.querySelectorAll(".spotlight[data-lit]").forEach((el) => delete el.dataset.lit);
    };
    // the pointer left the window
    const onOut = (e) => {
      if (!e.relatedTarget) clear();
    };

    const onDown = (e) => {
      if (e.pointerType !== "mouse") clear();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onOut);
      if (frame) cancelAnimationFrame(frame);
      clear();
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 -ml-[280px] -mt-[280px] h-[560px] w-[560px] rounded-full opacity-0 transition-opacity duration-500 motion-reduce:hidden bg-[radial-gradient(closest-side,rgba(112,20,56,0.22),transparent)]"
    />
  );
}
