
import { useEffect } from "react";

// Total length of the yawn, and the moment the page behind starts animating.
// If you change YAWN_MS the CSS follows automatically.
export const YAWN_MS = 5600;
const REVEAL_AT_MS = 3500;

const STORAGE_KEY = "boredom-yawned";

// Plays once per browser tab, skips for people who prefer reduced motion,
// and can be forced for testing by adding ?yawn to the address.
export function shouldPlayYawn() {
  try {
    if (new URLSearchParams(window.location.search).has("yawn")) return true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return sessionStorage.getItem(STORAGE_KEY) !== "1";
  } catch {
    return false;
  }
}

const yawnStyles = `
@property --yawn-rx { syntax: "<length>"; inherits: true; initial-value: 1px; }
@property --yawn-ry { syntax: "<length>"; inherits: true; initial-value: 1px; }

.yawn {
  /* quick knobs */
  --yawn-bg: var(--bp-ink, #111);          /* background colour behind the mascot */
  --yawn-ring: #e53935;                   /* red ring */
  --yawn-w: 70vmin;                        /* mascot size */
  --yawn-y: 64%;                           /* how far down the mouth sits */

  position: fixed;
  inset: 0;
  z-index: 2000;
  overflow: hidden;
  animation: yawnMouth ${YAWN_MS}ms linear both;
}

/* while the mouth is open, only the site's own background shows through it:
   the hero's text and doodles wait, then fade in when the page is revealed */
.hero > * { transition: opacity .6s ease; }
.yawn-waiting .hero > * { opacity: 0; }

/* the mascot layer: solid colour with a hole cut out for the mouth */
.yawn-face {
  position: absolute;
  inset: 0;
  background: var(--yawn-bg);
  -webkit-mask-image: radial-gradient(
    ellipse var(--yawn-rx) var(--yawn-ry) at 50% var(--yawn-y),
    transparent calc(100% - 1px),
    #000 100%
  );
  mask-image: radial-gradient(
    ellipse var(--yawn-rx) var(--yawn-ry) at 50% var(--yawn-y),
    transparent calc(100% - 1px),
    #000 100%
  );
}

.yawn-mascot {
  position: absolute;
  left: 50%;
  top: calc(var(--yawn-y) - var(--yawn-w) * 0.7167);
  width: var(--yawn-w);
  aspect-ratio: 600 / 700;
  height: auto;
  transform: translateX(-50%);
  overflow: visible;
}

.y-hair { fill: #f2cd6b; }
.y-fringe { fill: #e5b84a; }
.y-face { fill: #ffe1cc; }
.y-cheek { fill: var(--bp-accent, #ee4f27); opacity: .45; }
.y-ink { fill: #111; }
.y-line { stroke: #111; stroke-width: 6; stroke-linecap: round; fill: none; }
.y-brow { stroke: #b8892f; stroke-width: 9; stroke-linecap: round; fill: none; }
.y-clip { stroke: var(--bp-accent, #ee4f27); stroke-width: 9; stroke-linecap: round; fill: none; }

/* bored eyes: half-moons that blink once, then scrunch into arches when the yawn starts */
.y-eye-open,
.y-eye-shut,
.y-brow-move {
  transform-box: fill-box;
  transform-origin: center;
}
.y-eye-open { animation: yawnEyeOpen ${YAWN_MS}ms ease-in-out both; }
.y-eye-shut { opacity: 0; animation: yawnEyeShut ${YAWN_MS}ms ease-in-out both; }
.y-brow-move { animation: yawnBrow ${YAWN_MS}ms ease-in-out both; }

/* the lips: a thick red ring that rides the edge of the hole */
.yawn-ring {
  position: absolute;
  left: 50%;
  top: var(--yawn-y);
  box-sizing: content-box;
  width: calc(var(--yawn-rx) * 2);
  height: calc(var(--yawn-ry) * 2);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: calc(.5vmin + var(--yawn-rx) * .12) solid var(--yawn-ring);
  pointer-events: none;
}

.yawn-zs {
  position: absolute;
  top: 10%;
  right: 10%;
  width: 0;
  height: 0;
}
.yawn-z {
  position: absolute;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-weight: 900;
  line-height: 1;
  color: var(--bp-lime, #dffd5f);
  opacity: 0;
  animation: yawnZ 1500ms ease-out both;
}
.yawn-z.z1 { right: 9vmin;  top: 7vmin;  font-size: clamp(1.8rem, 5.5vmin, 3.6rem); animation-delay: calc(${YAWN_MS}ms * 0.18); }
.yawn-z.z2 { right: 4.5vmin; top: 2.5vmin; font-size: clamp(2.4rem, 7.5vmin, 5rem); animation-delay: calc(${YAWN_MS}ms * 0.18 + 250ms); }
.yawn-z.z3 { right: 0;      top: -3vmin; font-size: clamp(3rem, 10vmin, 6.5rem); animation-delay: calc(${YAWN_MS}ms * 0.18 + 500ms); }

/* the site name, tucked in the bottom-left corner */
.yawn-title {
  position: absolute;
  left: clamp(1rem, 3vw, 2rem);
  bottom: clamp(1rem, 3vw, 2rem);
  display: flex;
  align-items: center;
  gap: .6rem;
  font-family: inherit;
  font-weight: 900;
  font-size: clamp(1.1rem, 2.6vw, 2rem);
  line-height: .95;
  letter-spacing: .02em;
  color: var(--bp-paper, #f5f2ea);
  opacity: 0;
  animation: yawnTitle ${YAWN_MS}ms ease-out both;
}
.yawn-title i {
  flex: none;
  width: .9em;
  height: .9em;
  border-radius: 50%;
  background: var(--bp-accent, #ee4f27);
}

.yawn-skip {
  position: fixed;
  right: clamp(1rem, 3vw, 2rem);
  bottom: clamp(1rem, 3vw, 2rem);
  z-index: 2001;
  font: inherit;
  font-weight: 800;
  font-size: .8rem;
  letter-spacing: .08em;
  color: var(--bp-ink, #111);
  background: var(--bp-paper, #f5f2ea);
  border: 2px solid var(--bp-paper, #f5f2ea);
  padding: .6rem .9rem;
  cursor: pointer;
}
.yawn-skip:hover, .yawn-skip:focus-visible {
  background: var(--bp-lime, #dffd5f);
  border-color: var(--bp-lime, #dffd5f);
  outline: none;
}

/* Hold for 1.5 seconds, then expand in one continuous smooth movement */
@keyframes yawnMouth {
  0%, 41.6667% {
    --yawn-rx: 1.4vmin;
    --yawn-ry: .5vmin;
  }
  100% {
    --yawn-rx: 150vmax;
    --yawn-ry: 150vmax;
    animation-timing-function: cubic-bezier(.4, 0, .2, 1);
  }
}

@keyframes yawnEyeOpen {
  0%, 7%   { scale: 1 1; opacity: 1; }
  10%      { scale: 1 .1; opacity: 1; }
  13%, 28% { scale: 1 1; opacity: 1; }
  31%, 100% { scale: 1 1; opacity: 0; }
}
@keyframes yawnEyeShut {
  0%, 28% { opacity: 0; }
  31%, 100% { opacity: 1; }
}
@keyframes yawnBrow {
  0%, 20% { translate: 0 0; }
  36%, 100% { translate: 0 -14px; }
}
@keyframes yawnZ {
  0%   { opacity: 0; translate: 0 1.5vmin; scale: .6; }
  20%  { opacity: 1; scale: 1; }
  75%  { opacity: 1; }
  100% { opacity: 0; translate: 1.5vmin -3vmin; scale: 1.1; }
}
@keyframes yawnTitle {
  0%, 4%   { opacity: 0; translate: 0 10px; }
  14%, 86% { opacity: 1; translate: 0 0; }
  100%     { opacity: 0; translate: 0 0; }
}
`;

export default function YawnIntro({
  onReveal,
  onDone,
}: {
  onReveal: () => void;
  onDone: () => void;
}) {
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* private mode: fine, it just plays again next time */
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const reveal = window.setTimeout(onReveal, REVEAL_AT_MS);
    const done = window.setTimeout(onDone, YAWN_MS);

    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(done);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function skip() {
    onReveal();
    onDone();
  }

  return (
    <div className="yawn" role="presentation">
      <style>{yawnStyles}</style>
      <div className="yawn-face" aria-hidden="true">
        <svg className="yawn-mascot" viewBox="0 0 600 700" focusable="false">
          {/* blond bob */}
          <path
            className="y-hair"
            d="M70 560 C55 290 125 62 300 62 C475 62 545 290 530 560 Q528 598 490 598 L110 598 Q72 598 70 560 Z"
          />
          {/* face */}
          <circle className="y-face" cx="300" cy="355" r="200" />
          {/* fringe */}
          <path
            className="y-fringe"
            d="M105 310 C100 160 200 108 300 108 C400 108 500 160 495 310 C480 245 440 222 300 222 C160 222 120 245 105 310 Z"
          />
          {/* little asterisk hair clip */}
          <g transform="translate(446 152)">
            <path className="y-clip" d="M0 -22 V22 M-19 -11 L19 11 M-19 11 L19 -11" />
          </g>
          {/* cheeks */}
          <circle className="y-cheek" cx="195" cy="375" r="26" />
          <circle className="y-cheek" cx="405" cy="375" r="26" />

          {/* brows */}
          <g transform="translate(240 250) rotate(-4)">
            <g className="y-brow-move">
              <path className="y-brow" d="M-30 0 H30" />
            </g>
          </g>
          <g transform="translate(360 250) rotate(4)">
            <g className="y-brow-move">
              <path className="y-brow" d="M-30 0 H30" />
            </g>
          </g>

          {/* left eye */}
          <g transform="translate(240 290)">
            <g className="y-eye-open">
              <path className="y-ink" d="M-24 -4 L24 -4 A24 24 0 0 1 -24 -4 Z" />
              <path className="y-line" d="M-29 -4 H29" />
            </g>
            <g className="y-eye-shut">
              <path className="y-line" d="M-24 6 Q0 -16 24 6" />
            </g>
          </g>
          {/* right eye */}
          <g transform="translate(360 290)">
            <g className="y-eye-open">
              <path className="y-ink" d="M-24 -4 L24 -4 A24 24 0 0 1 -24 -4 Z" />
              <path className="y-line" d="M-29 -4 H29" />
            </g>
            <g className="y-eye-shut">
              <path className="y-line" d="M-24 6 Q0 -16 24 6" />
            </g>
          </g>
        </svg>

        <span className="yawn-zs">
          <span className="yawn-z z1">Z</span>
          <span className="yawn-z z2">Z</span>
          <span className="yawn-z z3">Z</span>
        </span>

        <div className="yawn-title">
          <i />
          <span>
            THE BOREDOM
            <br />
            PROJECT
          </span>
        </div>
      </div>

      <div className="yawn-ring" aria-hidden="true" />

      <button type="button" className="yawn-skip" onClick={skip}>
        SKIP ↗
      </button>
    </div>
  );
}
