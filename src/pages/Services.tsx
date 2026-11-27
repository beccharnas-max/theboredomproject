import { useEffect, useRef, useState } from "react";
import { Arrow, Footer, PageMeta } from "../components/SiteChrome";

// Fires once, the first time the element scrolls into view.
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible] as const;
}

// The inclusion pills in each package drift towards the cursor while it is over that block,
// then settle back where they started. Skipped on touch screens and for reduced motion.
function useFollowPills(sectionRef: { current: HTMLElement | null }, active: boolean) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!active || !section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 800px)");
    if (reducedMotion.matches || small.matches) return;

    const els = Array.from(section.querySelectorAll<HTMLElement>(".package-list li"));
    if (els.length === 0) return;

    const clamp = (value: number, min: number, max: number) =>
      Math.max(min, Math.min(max, value));

    const pills = els.map((el, i) => {
      const angle = i * ((Math.PI * 2) / els.length) + 0.6;
      return {
        el,
        w: 0,
        h: 0,
        hx: 0, // resting position, relative to the section
        hy: 0,
        // each pill hangs around the cursor at its own spot, so they don't pile up
        ox: Math.cos(angle) * 110,
        oy: Math.sin(angle) * 80,
        follow: 0.1 - i * 0.009, // how quickly it chases (they trail like a little gang)
        x: 0,
        y: 0,
        rot: 0,
      };
    });

    let sectionW = 0;
    let sectionH = 0;

    const measure = () => {
      const s = section.getBoundingClientRect();
      sectionW = s.width;
      sectionH = s.height;
      pills.forEach((pill) => {
        const r = pill.el.getBoundingClientRect();
        pill.w = r.width;
        pill.h = r.height;
        pill.hx = r.left - s.left - pill.x;
        pill.hy = r.top - s.top - pill.y;
      });
    };

    const pointer = { x: 0, y: 0, inside: false };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const s = section.getBoundingClientRect();
      pointer.x = event.clientX - s.left;
      pointer.y = event.clientY - s.top;
      pointer.inside = true;
    };
    const onLeave = () => {
      pointer.inside = false;
    };

    let last = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 16.667, 2.5);
      last = now;

      pills.forEach((pill) => {
        const settled =
          !pointer.inside &&
          Math.abs(pill.x) < 0.05 &&
          Math.abs(pill.y) < 0.05 &&
          Math.abs(pill.rot) < 0.05;
        if (settled) {
          if (pill.x !== 0 || pill.y !== 0 || pill.rot !== 0) {
            pill.x = 0;
            pill.y = 0;
            pill.rot = 0;
            pill.el.style.transform = "";
          }
          return;
        }

        let targetX = 0;
        let targetY = 0;
        if (pointer.inside) {
          targetX = clamp(pointer.x + pill.ox - pill.w / 2, 0, sectionW - pill.w) - pill.hx;
          targetY = clamp(pointer.y + pill.oy - pill.h / 2, 0, sectionH - pill.h) - pill.hy;
        }

        const ease = 1 - Math.pow(1 - pill.follow, dt);
        const previousX = pill.x;
        pill.x += (targetX - pill.x) * ease;
        pill.y += (targetY - pill.y) * ease;

        // lean into the direction of travel
        const lean = clamp((pill.x - previousX) * 1.4, -12, 12);
        pill.rot += (lean - pill.rot) * 0.15 * dt;

        pill.el.style.transform = `translate3d(${pill.x}px, ${pill.y}px, 0) rotate(${pill.rot}deg)`;
      });

      frame = requestAnimationFrame(tick);
    };

    // wait for the pills to finish dropping in before they start following
    const timer = window.setTimeout(() => {
      measure();
      section.addEventListener("pointermove", onMove);
      section.addEventListener("pointerleave", onLeave);
      window.addEventListener("resize", measure);
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }, 1900);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", measure);
      pills.forEach((pill) => {
        pill.el.style.transform = "";
      });
    };
  }, [sectionRef, active]);
}

const servicesStyles = `
/* ---------- HERO: headline flies in, asterisk spins ---------- */
.services-hero { overflow-x: clip; }
.services-hero h1 .svc-fly {
  display: block;
  font-weight: inherit;
  will-change: transform, opacity;
  animation-duration: 1.1s;
  animation-timing-function: cubic-bezier(.2, .9, .25, 1);
  animation-fill-mode: both;
}
.services-hero h1 .svc-fly-1 { animation-name: svcFlyLeft;  animation-delay: .05s; }
.services-hero h1 .svc-fly-2 { animation-name: svcFlyRight; animation-delay: .25s; }

@keyframes svcFlyLeft {
  0%   { transform: translateX(-120vw) rotate(-10deg) skewX(25deg); opacity: 0; }
  55%  { transform: translateX(2.5vw) rotate(1.5deg) skewX(-6deg); opacity: 1; }
  78%  { transform: translateX(-.8vw) rotate(-.4deg) skewX(2deg); }
  100% { transform: none; opacity: 1; }
}
@keyframes svcFlyRight {
  0%   { transform: translateX(120vw) rotate(10deg) skewX(-25deg); opacity: 0; }
  55%  { transform: translateX(-2.5vw) rotate(-1.5deg) skewX(6deg); opacity: 1; }
  78%  { transform: translateX(.8vw) rotate(.4deg) skewX(-2deg); }
  100% { transform: none; opacity: 1; }
}

.services-lede .asterisk {
  display: inline-block;
  animation: svcSpin 14s linear infinite;
}
@keyframes svcSpin { to { rotate: 360deg; } }

/* ---------- PACKAGES: number stamps down ---------- */
.package .package-number { opacity: 0; }
.package.in-view .package-number {
  animation: pkgStamp .6s cubic-bezier(.34, 1.8, .64, 1) both;
}
@keyframes pkgStamp {
  0%   { opacity: 0; scale: 2.2; rotate: -18deg; }
  100% { opacity: 1; scale: 1;   rotate: 0deg; }
}

/* stagger helper: --i is each list item's position */
.package-list li:nth-child(1) { --i: 0; }
.package-list li:nth-child(2) { --i: 1; }
.package-list li:nth-child(3) { --i: 2; }
.package-list li:nth-child(4) { --i: 3; }
.package-list li:nth-child(5) { --i: 4; }
.package-list li:nth-child(6) { --i: 5; }
.package-list li:nth-child(7) { --i: 6; }

/* inclusions are outlined pills (no fill) that chase the cursor */
.package .package-list ul {
  display: flex;
  flex-wrap: wrap;
  gap: .6rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.package .package-list li {
  position: relative;
  z-index: 2;
  display: inline-block;
  margin: 0;
  padding: .45em 1.1em;
  border: 2px solid currentColor;
  border-radius: 999px;
  background: transparent;
  font-weight: 700;
  font-size: clamp(.85rem, 1.1vw, 1rem);
  line-height: 1.15;
  letter-spacing: .02em;
  list-style: none;
  pointer-events: none;
  user-select: none;
  opacity: 0;
  will-change: transform;
}
.package .package-list li::before,
.package .package-list li::marker { content: none; }

/* SIGNATURE: items get tossed into the box */
.package:not(.package-pink).in-view .package-list li {
  animation: pkgDrop .65s cubic-bezier(.34, 1.56, .64, 1) both;
  animation-delay: calc(.45s + var(--i) * .09s);
}
@keyframes pkgDrop {
  0%   { opacity: 0; translate: 0 -48px; rotate: -4deg; }
  100% { opacity: 1; translate: 0 0;     rotate: 0deg; }
}

/* ONE-PAGE: items glide up, one smooth scroll */
.package-pink.in-view .package-list li {
  animation: pkgGlide .7s cubic-bezier(.2, .9, .25, 1) both;
  animation-delay: calc(.45s + var(--i) * .12s);
}
@keyframes pkgGlide {
  0%   { opacity: 0; translate: 0 36px; }
  100% { opacity: 1; translate: 0 0; }
}

/* ---------- PRICE: marker swipe ---------- */
.price-mark {
  font-weight: 800;
  background: linear-gradient(var(--mark, var(--bp-accent, #ff3d00)), var(--mark, var(--bp-accent, #ff3d00)))
    left 88% / 0% .38em no-repeat;
  transition: background-size .6s cubic-bezier(.7, 0, .2, 1) 1s;
}
.package.in-view .price-mark { background-size: 100% .38em; }
/* pick whatever contrasts best with your pink */
.package-pink { --mark: var(--paper, #f5f2ea); }

/* ---------- BUTTONS: little nudge on hover ---------- */
.package .button-light,
.package .button-dark {
  transition: translate .15s ease-out, rotate .15s ease-out;
}
.package .button-light:hover,
.package .button-dark:hover {
  translate: 0 -3px;
  rotate: -1deg;
}

/* ---------- RETAINER: "ON CALL." rings, pills drop in and wobble ---------- */
.svc-ring {
  display: inline-block;
  transform-origin: 50% 90%;
}
.retainer.in-view .svc-ring {
  animation: svcRing .9s ease-in-out .6s 2;
}
@keyframes svcRing {
  0%, 100% { rotate: 0deg; }
  15% { rotate: -9deg; }
  30% { rotate: 9deg; }
  45% { rotate: -7deg; }
  60% { rotate: 7deg; }
  75% { rotate: -3deg; }
  90% { rotate: 3deg; }
}

.retainer .pill-row span { display: inline-block; transition: scale .15s ease-out; }
.retainer .pill-row span:nth-child(1) { rotate: -3deg; --d: 0; }
.retainer .pill-row span:nth-child(2) { rotate: 2deg;  --d: 1; }
.retainer .pill-row span:nth-child(3) { rotate: -2deg; --d: 2; }
.retainer:not(.in-view) .pill-row span { opacity: 0; }
.retainer.in-view .pill-row span {
  animation: svcPillDrop .7s cubic-bezier(.34, 1.56, .64, 1) backwards;
  animation-delay: calc(.3s + var(--d) * .15s);
}
@keyframes svcPillDrop {
  0% { opacity: 0; translate: 0 -90px; scale: .8; }
}
.retainer .pill-row span:hover { scale: 1.08; }

/* ---------- PROCESS: steps pop in one by one, LIVE gets a blinking dot ---------- */
.process:not(.in-view) .steps .step { opacity: 0; }
.process .steps .step { transition: translate .2s ease-out, rotate .2s ease-out; }
.process .steps .step:hover { translate: 0 -6px; rotate: -1.5deg; }
.process.in-view .steps .step {
  animation: svcStepPop .7s cubic-bezier(.34, 1.56, .64, 1) backwards;
  animation-delay: calc(.2s + var(--i) * .18s);
}
@keyframes svcStepPop {
  0% { opacity: 0; translate: 0 60px; rotate: 6deg; scale: .9; }
}
.process h2 em::after {
  content: "●";
  display: inline-block;
  margin-left: .2em;
  font-size: .35em;
  vertical-align: super;
  color: var(--bp-accent, #ff3d00);
  animation: svcBlink 1.2s steps(1, end) infinite;
}
@keyframes svcBlink { 50% { opacity: 0; } }

/* ---------- Reduced motion: show everything, skip the movement ---------- */
@media (prefers-reduced-motion: reduce) {
  .services-hero h1 .svc-fly,
  .services-lede .asterisk,
  .retainer.in-view .svc-ring,
  .retainer.in-view .pill-row span,
  .process.in-view .steps .step,
  .process h2 em::after {
    animation: none !important;
  }
  .package .package-number,
  .package .package-list li {
    opacity: 1;
    animation: none !important;
  }
  .retainer:not(.in-view) .pill-row span,
  .process:not(.in-view) .steps .step { opacity: 1; }
  .price-mark {
    transition: none;
    background-size: 100% .38em;
  }
  .package .button-light:hover,
  .package .button-dark:hover,
  .process .steps .step:hover {
    translate: none;
    rotate: none;
  }
}
`;

export default function Services() {
  const [signatureRef, signatureVisible] = useInView<HTMLElement>(0.3);
  const [onePageRef, onePageVisible] = useInView<HTMLElement>(0.3);
  const [retainerRef, retainerVisible] = useInView<HTMLElement>(0.4);
  const [processRef, processVisible] = useInView<HTMLElement>(0.3);

  useFollowPills(signatureRef, signatureVisible);
  useFollowPills(onePageRef, onePageVisible);

  return (
    <>
      <style>{servicesStyles}</style>
      <PageMeta
        title="Website Services | The Boredom Project"
        description="Explore custom-coded signature websites and one-page websites with one-off pricing, optional support and no subscriptions."
      />
      <main>
        <section className="services-hero">
          <span className="section-tag">[ WHAT I DO ]</span>
          <h1>
            <strong className="svc-fly svc-fly-1">ONE-OF-ONE</strong>
            <span className="svc-fly svc-fly-2">WEBSITES.</span>
          </h1>
          <div className="services-lede">
            <p>
              Simple to use. Easy to own. Built to show people exactly why your business is worth
              choosing.
            </p>
            <div className="asterisk">✳</div>
          </div>
        </section>

        <section
          ref={signatureRef}
          className={`package${signatureVisible ? " in-view" : ""}`}
        >
          <div className="package-number">01</div>
          <div className="package-main">
            <span className="mini-label">THE MAIN EVENT</span>
            <h2>
              THE SIGNATURE
              <br />
              WEBSITE
            </h2>
            <p>
              A fully custom multi-page website for small businesses ready to show up properly
              online. Designed and coded from scratch, with all the personality and none of the
              bloat. Starting from <span className="price-mark">$1099</span>
            </p>
            <a
              href="mailto:hello@theboredomproject.studio?subject=Signature%20Website%20project"
              className="button-light"
            >
              ASK ABOUT YOUR PROJECT <Arrow />
            </a>
          </div>
          <div className="package-list">
            <h3>WHAT'S IN THE BOX</h3>
            <ul>
              <li>Discovery + content direction</li>
              <li>Original visual design</li>
              <li>Up to 3 core pages</li>
              <li>Mobile + desktop build</li>
              <li>Contact and enquiry links</li>
              <li>Basic search setup</li>
              <li>Final site handover</li>
            </ul>
          </div>
        </section>

        <section
          ref={onePageRef}
          className={`package package-pink${onePageVisible ? " in-view" : ""}`}
        >
          <div className="package-number">02</div>
          <div className="package-main">
            <span className="mini-label">SMALL BUT MIGHTY</span>
            <h2>
              THE ONE-PAGE
              <br />
              WONDER
            </h2>
            <p>
              One brilliant scrolling page with everything your customer needs—ideal for new
              ventures, focused offers and businesses that want to keep it beautifully simple.
              Starting at <span className="price-mark">$800</span>
            </p>
            <a
              href="mailto:hello@theboredomproject.studio?subject=One%20Page%20Wonder%20project"
              className="button-dark"
            >
              ASK ABOUT YOUR PROJECT <Arrow />
            </a>
          </div>
          <div className="package-list">
            <h3>WHAT'S IN THE BOX</h3>
            <ul>
              <li>Focused discovery session</li>
              <li>Custom one-page design</li>
              <li>Mobile + desktop build</li>
              <li>Clear call-to-action setup</li>
              <li>Basic search setup</li>
              <li>Final site handover</li>
            </ul>
          </div>
        </section>

        <section
          ref={retainerRef}
          className={`retainer${retainerVisible ? " in-view" : ""}`}
        >
          <div>
            <span className="section-tag">[ NEED A HAND LATER? ]</span>
            <h2>
              KEEP ME
              <br />
              <span className="svc-ring">ON CALL.</span>
            </h2>
          </div>
          <div className="retainer-copy">
            <p>
              No forced care plan. No monthly fee just for existing. If you need new content, a
              fresh page or a tune-up, you can book support on an optional retainer or one-off
              basis.
            </p>
            <div className="pill-row">
              <span>ONE-OFF EDITS</span>
              <span>OPTIONAL RETAINER</span>
              <span>NO LOCK-IN</span>
            </div>
          </div>
        </section>

        <section className="not-do">
          <span>QUICK HEADS-UP:</span>
          <h2>
            I DON'T BUILD
            <br />
            ECOMMERCE SITES.
          </h2>
          <p>
            I stay in my lane: exceptional, content-led websites for service businesses and
            brilliant independents. If you need a giant online shop, I’m not your person—and that’s
            okay.
          </p>
        </section>

        <section
          ref={processRef}
          className={`process${processVisible ? " in-view" : ""}`}
        >
          <span className="section-tag">[ NICE + SIMPLE ]</span>
          <h2>
            FROM “HELLO”
            <br />
            TO <em>LIVE.</em>
          </h2>
          <div className="steps">
            {[
              [
                "01",
                "CHAT",
                "Tell me about the business, the people and what the site needs to achieve.",
              ],
              [
                "02",
                "CREATE",
                "I shape the strategy, design the look and build the whole thing from scratch.",
              ],
              [
                "03",
                "LAUNCH",
                "We check every detail, go live and package up your shiny new website.",
              ],
            ].map(([number, title, copy], index) => (
              <div
                className="step"
                key={number}
                style={{ ["--i" as string]: index }}
              >
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
