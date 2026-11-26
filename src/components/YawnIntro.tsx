import { useEffect } from "react";

// Total length of the yawn, and the moment the page behind starts animating.
// If you change YAWN_MS the CSS follows automatically.
export const YAWN_MS = 4500;
const REVEAL_AT_MS = 3400;

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
  --yawn-ring: var(--bp-accent, #ee4f27);  /* the lips */
  --yawn-w: 70vmin;                        /* mascot size */
  --yawn-y: 64%;                           /* how far down the mouth sits */

  position: fixed;
  inset: 0;
  z-index: 2000;
  overflow: hidden;
  animation: yawnMouth ${YAWN_MS}ms linear both;
}

/* the dark inside of the mouth, visible only through the hole */
.yawn-inside {
  position: absolute;
  left: 50%;
  top: var(--yawn-y);
  width: calc(var(--yawn-rx) * 2.1);
  height: calc(var(--yawn-ry) * 2.1);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  overflow: hidden;
  background: var(--bp-ink, #111);
  animation: yawnInside ${YAWN_MS}ms linear both;
}
.yawn-inside::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -14%;
  width: 60%;
  height: 44%;
  transform: translateX(-50%);
  border-radius: 50% 50% 0 0;
  background: #ff8fb0;
}

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

/* the lips: a thick ring that rides the edge of the hole */
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

.yawn-z {
  position: absolute;
  top: 12%;
  right: 14%;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-weight: 800;
  font-size: clamp(1.4rem, 4vmin, 3rem);
  line-height: 1;
  color: var(--bp-lime, #dffd5f);
  opacity: 0;
  animation: yawnZ ${YAWN_MS}ms ease-out both;
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

/* the mouth: bored pause, opens into a big yawn, holds, then swallows the screen */
@keyframes yawnMouth {
  0%   { --yawn-rx: 1.4vmin; --yawn-ry: .5vmin;  animation-timing-function: ease-in-out; }
  15%  { --yawn-rx: 1.8vmin; --yawn-ry: .6vmin;  animation-timing-function: ease-in-out; }
  32%  { --yawn-rx: 7vmin;   --yawn-ry: 9vmin;   animation-timing-function: ease-in-out; }
  50%  { --yawn-rx: 11vmin;  --yawn-ry: 14vmin;  animation-timing-function: ease-in-out; }
  64%  { --yawn-rx: 11.6vmin; --yawn-ry: 14.6vmin; animation-timing-function: cubic-bezier(.6, 0, .8, .5); }
  100% { --yawn-rx: 150vmax; --yawn-ry: 150vmax; }
}

/* the dark mouth dissolves as it grows, so the site shows through the hole */
@keyframes yawnInside {
  0%, 74% { opacity: 1; }
  96%, 100% { opacity: 0; }
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
  0%, 20% { opacity: 0; translate: 0 0; }
  36% { opacity: 1; translate: 0 -1vmin; }
  60%, 100% { opacity: 0; translate: 0 -4vmin; }
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
      <div className="yawn-inside" aria-hidden="true" />

      <div className="yawn-face" aria-hidden="true">
        <svg className="yawn-mascot" viewBox="0 0 600 700" focusable="false">
          {/* blond bob */}
          <path
            className="y-hair"
            d="M80 560 C60 300 120 60 300 60 C480 60 540 300 520 560 Q520 600 480 600 L120 600 Q80 600 80 560 Z"
          />
          {/* face */}
          <ellipse className="y-face" cx="300" cy="345" rx="170" ry="220" />
          {/* fringe */}
          <path
            className="y-fringe"
            d="M120 250 C130 140 230 105 300 105 C380 105 470 140 480 250 C430 190 370 172 300 172 C230 172 170 190 120 250 Z"
          />
          {/* little asterisk hair clip */}
          <g transform="translate(468 150)">
            <path className="y-clip" d="M0 -22 V22 M-19 -11 L19 11 M-19 11 L19 -11" />
          </g>
          {/* cheeks */}
          <circle className="y-cheek" cx="200" cy="365" r="26" />
          <circle className="y-cheek" cx="400" cy="365" r="26" />

          {/* brows */}
          <g transform="translate(240 228) rotate(-4)">
            <g className="y-brow-move">
              <path className="y-brow" d="M-30 0 H30" />
            </g>
          </g>
          <g transform="translate(360 228) rotate(4)">
            <g className="y-brow-move">
              <path className="y-brow" d="M-30 0 H30" />
            </g>
          </g>

          {/* left eye */}
          <g transform="translate(240 275)">
            <g className="y-eye-open">
              <path className="y-ink" d="M-24 -4 L24 -4 A24 24 0 0 1 -24 -4 Z" />
              <path className="y-line" d="M-29 -4 H29" />
            </g>
            <g className="y-eye-shut">
              <path className="y-line" d="M-24 6 Q0 -16 24 6" />
            </g>
          </g>
          {/* right eye */}
          <g transform="translate(360 275)">
            <g className="y-eye-open">
              <path className="y-ink" d="M-24 -4 L24 -4 A24 24 0 0 1 -24 -4 Z" />
              <path className="y-line" d="M-29 -4 H29" />
            </g>
            <g className="y-eye-shut">
              <path className="y-line" d="M-24 6 Q0 -16 24 6" />
            </g>
          </g>
        </svg>

        <span className="yawn-z">
          Z
          <br />
          Z
          <br />
          Z
        </span>
      </div>

      <div className="yawn-ring" aria-hidden="true" />

      <button type="button" className="yawn-skip" onClick={skip}>
        SKIP ↗
      </button>
    </div>
  );
}
