import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Link } from "react-router";
import { Arrow, Footer, PageMeta } from "../components/SiteChrome";
import YawnIntro, { shouldPlayYawn } from "../components/YawnIntro";

// The two site screenshots shown in the browser and phone on the home page.
// They live in /public/studio. If an image can't be found under the first name, the next one is tried,
// so a .png/.jpg mix-up won't leave a blank frame. Swap names or order here whenever you like.
const BROWSER_IMAGES = [
  "/studio/workhorse-thumb.jpg",
  "/studio/workhorse-thumb.png",
  "/studio/vow-edit-thumb.jpg",
  "/studio/vow-edit-thumb.png",
];
const PHONE_IMAGES = [
  "/studio/boredom-thumb.png",
  "/studio/boredom-thumb.jpg",
  "/studio/slurp-thumb.jpg",
  "/studio/slurp-thumb.png",
];

function Shot({ srcs, alt, name }: { srcs: string[]; alt: string; name: string }) {
  const [index, setIndex] = useState(0);

  if (index >= srcs.length) {
    return (
      <div className="shot-missing" role="img" aria-label={alt}>
        <strong>{name}</strong>
        <span>SCREENSHOT COMING SOON</span>
      </div>
    );
  }

  return (
    <img
      src={srcs[index]}
      alt={alt}
      draggable={false}
      onError={() => setIndex((current) => current + 1)}
    />
  );
}

const audiences = [
  "CAFÉS + COFFEE SHOPS + RESTAURANTS",
  "CREATIVE + CURIOUS THINGS",
  "PORTFOLIOS + PHOTOGRAPHY + SMM",
  "SALONS + BEAUTY",
];

// All the new animation styles live here so this file is the only thing you need to swap.
// Colours fall back to sensible defaults; set --bp-accent / --bp-ink / --bp-paper in your global CSS to match the brand.
const funkStyles = `
/* ---------- HERO: fly in on load ---------- */
.hero { overflow-x: clip; }

.hero h1 .fly-line {
  display: block;
  font-weight: inherit;
  will-change: transform, opacity;
  animation-duration: 1.1s;
  animation-timing-function: cubic-bezier(.2,.9,.25,1);
  animation-fill-mode: both;
}
.hero h1 .fly-1 { animation-name: bpFlyLeft;  animation-delay: .05s; }
.hero h1 .fly-2 { animation-name: bpFlyRight; animation-delay: .22s; }
.hero h1 .fly-3 { animation-name: bpFlyLost;  animation-delay: .42s; animation-duration: 1.4s; }

/* hold the hero fly-in until the yawn opens up the page */
.yawn-waiting .hero h1 .fly-line { animation-play-state: paused; }

@keyframes bpFlyLeft {
  0%   { transform: translateX(-120vw) rotate(-10deg) skewX(25deg); opacity: 0; }
  55%  { transform: translateX(2.5vw) rotate(1.5deg) skewX(-6deg); opacity: 1; }
  78%  { transform: translateX(-.8vw) rotate(-.4deg) skewX(2deg); }
  100% { transform: none; opacity: 1; }
}
@keyframes bpFlyRight {
  0%   { transform: translateX(120vw) rotate(10deg) skewX(-25deg); opacity: 0; }
  55%  { transform: translateX(-2.5vw) rotate(-1.5deg) skewX(6deg); opacity: 1; }
  78%  { transform: translateX(.8vw) rotate(.4deg) skewX(-2deg); }
  100% { transform: none; opacity: 1; }
}
/* "CAN GET LOST." arrives from the far right and lands with a little tumble */
@keyframes bpFlyLost {
  0%   { transform: translate(140vw, -30vh) rotate(24deg) scale(.6); opacity: 0; }
  50%  { transform: translate(-3vw, 1vh) rotate(-7deg) scale(1.06); opacity: 1; }
  70%  { transform: translate(1vw, 0) rotate(3deg) scale(.98); }
  85%  { transform: translate(-.4vw, 0) rotate(-1deg) scale(1.01); }
  100% { transform: none; opacity: 1; }
}

/* ---------- INTRO: "THE BIG IDEA" ---------- */
/* tighter block: trim the vertical space and drop any rules/lines */
.intro.intro-fx {
  position: relative;
  min-height: 0;
  padding-top: clamp(3rem, 6vw, 5.5rem);
  padding-bottom: clamp(3rem, 6vw, 5.5rem);
  border-block: 0;
}
.intro.intro-fx .intro-top { margin-bottom: 0; border: 0; }

/* the strike-through draws itself across OFF-THE-SHELF */
.intro .strike {
  position: relative;
  display: inline-block;
  text-decoration: none;
}
.intro .strike::after {
  content: "";
  position: absolute;
  left: -2%;
  top: 54%;
  width: 104%;
  height: .14em;
  background: var(--bp-accent, #ff3d00);
  transform: scaleX(0) rotate(-1.5deg);
  transform-origin: left center;
  transition: transform .7s cubic-bezier(.7,0,.2,1) .9s;
}
.intro.in-view .strike::after { transform: scaleX(1) rotate(-1.5deg); }

/* "100% custom" square stamp: sits in the empty left column and rocks left and right */
.intro-sticker {
  position: absolute;
  left: 4.5%;
  top: 50%;
  translate: 0 -50%;
  width: clamp(7rem, 11vw, 11rem);
  aspect-ratio: 1 / 1;
  display: grid;
  place-items: center;
  text-align: center;
  font-weight: 900;
  font-size: clamp(.95rem, 1.5vw, 1.5rem);
  line-height: 1;
  letter-spacing: .02em;
  color: var(--bp-ink, #111);
  background: var(--bp-accent, #ff3d00);
  border: 4px solid var(--bp-paper, #f5f2ea);
  border-radius: 0;
  rotate: -12deg;
  scale: 0;
  pointer-events: none;
  z-index: 2;
}
.intro-sticker::before {
  content: "";
  position: absolute;
  inset: 8px;
  border: 2px dashed var(--bp-ink, #111);
}
.intro.in-view .intro-sticker {
  animation:
    bpStickerPop .8s cubic-bezier(.3,1.6,.5,1) 1.1s both,
    bpTilt 3.2s ease-in-out 1.9s infinite alternate;
}
@keyframes bpStickerPop {
  0%   { scale: 0; }
  100% { scale: 1; }
}
/* rocks between -12deg and +12deg, never a full turn */
@keyframes bpTilt {
  0%   { rotate: -12deg; }
  100% { rotate: 12deg; }
}

/* no room for the stamp once the layout stacks */
@media (max-width: 900px) {
  .intro-sticker { display: none; }
}

/* ---------- DEVICES: a browser and a phone, pinned to the wall ---------- */
.devices {
  position: relative;
  padding: clamp(60px, 8vw, 100px) 4vw clamp(90px, 10vw, 130px);
  background: var(--acid);
}
.devices-stage {
  --tx: 0;
  --ty: 0;
  position: relative;
  max-width: 1080px;
  margin: 0 auto;
  padding-bottom: clamp(3rem, 8vw, 6rem);
  perspective: 1400px;
}
.devices-tilt {
  position: relative;
  transform-style: preserve-3d;
  transform: rotateY(calc(var(--tx) * 7deg)) rotateX(calc(var(--ty) * -5deg));
  transition: transform .3s ease-out;
}
.device { margin: 0; position: relative; opacity: 0; }
.device-frame {
  box-shadow: calc(8px - var(--tx) * 10px) calc(8px - var(--ty) * 10px) 0 var(--ink);
  transition: box-shadow .3s ease-out;
}
.device-float { animation: devFloat 6s ease-in-out infinite alternate; }
.phone .device-float { animation-duration: 5s; animation-delay: -2s; }
@keyframes devFloat { from { translate: 0 0; } to { translate: 0 -8px; } }

/* the screenshot drifts a touch against its frame, so it feels like it has depth */
.device img {
  translate: calc(var(--tx) * -6px) calc(var(--ty) * -4px);
  scale: 1.06;
  transition: translate .3s ease-out;
}

.browser { width: 70%; rotate: -2.5deg; }
.browser .device-frame { background: var(--paper); border: 2px solid var(--ink); }
.browser-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 12px;
  background: var(--ink);
  color: var(--paper);
}
.browser-dots { display: flex; gap: 6px; }
.browser-dots i { width: 9px; height: 9px; border-radius: 50%; background: var(--paper); opacity: .45; display: block; }
.browser-address {
  flex: 1;
  min-width: 0;
  padding: 4px 10px;
  border-radius: 99px;
  background: rgba(246, 242, 233, .14);
  font: 500 10px "DM Mono", monospace;
  letter-spacing: .04em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.browser-screen { aspect-ratio: 2 / 1; overflow: hidden; background: var(--paper); }
.browser-screen img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }

.phone { position: absolute; right: 2%; bottom: -4rem; width: 23%; rotate: 5deg; translate: 0 0 70px; }
.phone .device-frame {
  position: relative;
  padding: 8px;
  background: var(--ink);
  border: 2px solid var(--ink);
  border-radius: 30px;
}
.phone-notch {
  position: absolute;
  top: 13px;
  left: 50%;
  width: 30%;
  height: 7px;
  border-radius: 99px;
  background: rgba(246, 242, 233, .25);
  transform: translateX(-50%);
  z-index: 2;
}
.phone-screen { aspect-ratio: 9 / 16; border-radius: 22px; overflow: hidden; background: var(--paper); }
.phone-screen img { width: 100%; height: 100%; object-fit: cover; object-position: 72% 50%; display: block; }

.device-tag {
  position: absolute;
  z-index: 3;
  padding: 6px 10px;
  border: 2px solid var(--ink);
  background: var(--paper);
  box-shadow: 3px 3px 0 var(--ink);
  font: 500 10px "DM Mono", monospace;
  letter-spacing: .06em;
  white-space: nowrap;
}
.browser .device-tag { top: -14px; left: 14px; rotate: -3deg; }
.phone .device-tag { top: -16px; right: -10px; rotate: 4deg; }

.devices .tape-one {
  left: 6%;
  right: auto;
  bottom: -1.4rem;
  translate: 0 0 100px;
  transform: rotate(-5deg);
  opacity: 0;
}

.devices.in-view .browser { animation: devBrowserIn .9s cubic-bezier(.34, 1.4, .64, 1) both; }
.devices.in-view .phone { animation: devPhoneIn .9s .2s cubic-bezier(.34, 1.56, .64, 1) both; }
.devices.in-view .tape-one { animation: devTapeIn .5s .55s cubic-bezier(.34, 2, .64, 1) both; }
@keyframes devBrowserIn {
  0%   { opacity: 0; translate: 0 140px 0; rotate: -9deg; scale: .85; }
  100% { opacity: 1; translate: 0 0 0; rotate: -2.5deg; scale: 1; }
}
@keyframes devPhoneIn {
  0%   { opacity: 0; translate: 0 220px 70px; rotate: 14deg; scale: .8; }
  100% { opacity: 1; translate: 0 0 70px; rotate: 5deg; scale: 1; }
}
@keyframes devTapeIn {
  0%   { opacity: 0; scale: 1.8; }
  100% { opacity: 1; scale: 1; }
}

.shot-missing {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: .6rem;
  padding: 1.5rem;
  background: repeating-linear-gradient(135deg, #f1ede2, #f1ede2 14px, #e6e1d2 14px, #e6e1d2 28px);
  color: #111;
}
.shot-missing strong { font-size: clamp(1.1rem, 2.4vw, 1.8rem); line-height: 1; }
.shot-missing span { font: 500 10px "DM Mono", monospace; letter-spacing: .08em; }

@media (max-width: 800px) {
  .devices-tilt { transform: none; }
  .browser { width: 92%; }
  .phone { width: 36%; right: 0; bottom: -3.5rem; }
  .devices-stage { padding-bottom: 5rem; }
}

@media (prefers-reduced-motion: reduce) {
  .devices .device, .devices .tape-one { opacity: 1; animation: none !important; }
  .device-float { animation: none; }
  .devices-tilt { transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .hero h1 .fly-line,
  .intro-sticker {
    animation: none !important;
  }
  .intro-sticker { scale: 1; }
  .intro .strike::after { transition: none; }
}
`;

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

export default function Home() {
  const [introRef, introVisible] = useInView<HTMLElement>(0.3);
  const [devicesRef, devicesVisible] = useInView<HTMLElement>(0.2);
  const stageRef = useRef<HTMLDivElement>(null);
  const [intro, setIntro] = useState<"playing" | "revealing" | "done">(() =>
    shouldPlayYawn() ? "playing" : "done",
  );

  // The browser and phone lean towards the mouse. Touch screens skip this.
  function handleDeviceMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    stage.style.setProperty("--tx", x.toFixed(3));
    stage.style.setProperty("--ty", y.toFixed(3));
  }

  function handleDeviceLeave() {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--tx", "0");
    stage.style.setProperty("--ty", "0");
  }

  return (
    <>
      <style>{funkStyles}</style>
      <PageMeta
        title="The Boredom Project | Custom Websites for Small Businesses"
        description="Personality-packed custom websites for cafés, salons, home services and independent businesses. One-off pricing, no subscriptions and no hidden fees."
      />
      <main className={intro === "playing" ? "yawn-waiting" : undefined}>
        <section className="hero">
          <div className="hero-kicker">WEBSITES FOR GOOD SMALL BUSINESSES</div>
          <h1>
            <strong className="fly-line fly-1">BORING</strong>
            <strong className="fly-line fly-2">WEBSITES</strong>
            <span className="fly-line fly-3">CAN GET LOST.</span>
          </h1>
          <div className="hero-bottom">
            <p>
              Custom-built, personality-packed websites for independent businesses who refuse to
              blend in.
            </p>
            <Link to="/services" className="round-link" aria-label="See our services">
              SEE
              <br />
              SERVICES <Arrow />
            </Link>
          </div>
          <div className="scribble star-one">✳</div>
          <div className="scribble note-one">
            NO TEMPLATES
            <br />
            ALLOWED!
          </div>
        </section>

        <section
          ref={introRef}
          className={`intro intro-fx${introVisible ? " in-view" : ""}`}
        >
          <div className="intro-top">
            <div className="section-tag">[ THE BIG IDEA ]</div>
            <div className="intro-copy">
              <h2>
                YOUR BUSINESS ISN'T
                <br />
                <span className="strike">OFF-THE-SHELF.</span>
              </h2>
              <p>
                So why should your website be? The Boredom Project builds custom websites around
                your style, your story and your customers. No weird subscriptions. No
                unnecessary nonsense.
              </p>
              <Link to="/services" className="text-link">
                HOW IT WORKS <Arrow />
              </Link>
            </div>
            <div className="intro-sticker" aria-hidden="true">
              100%
              <br />
              CUSTOM
            </div>
          </div>
        </section>

        <section
          ref={devicesRef}
          className={`devices${devicesVisible ? " in-view" : ""}`}
          aria-label="Websites made by The Boredom Project"
        >
          <div
            ref={stageRef}
            className="devices-stage"
            onPointerMove={handleDeviceMove}
            onPointerLeave={handleDeviceLeave}
          >
            <div className="devices-tilt">
              <figure className="device browser">
                <div className="device-float">
                  <div className="device-frame">
                    <div className="browser-bar" aria-hidden="true">
                      <span className="browser-dots">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className="browser-address">concept · the vow edit</span>
                    </div>
                    <div className="browser-screen">
                      <Shot
                        srcs={BROWSER_IMAGES}
                        alt="Concept website for a wedding content creator, with a soft cream homepage, a large serif headline and a full-width photo of a couple"
                        name="The Vow Edit"
                      />
                    </div>
                  </div>
                </div>
                <figcaption className="device-tag">CONCEPT · WEDDING CREATOR</figcaption>
              </figure>

              <figure className="device phone">
                <div className="device-float">
                  <div className="device-frame">
                    <span className="phone-notch" aria-hidden="true" />
                    <div className="phone-screen">
                      <Shot
                        srcs={PHONE_IMAGES}
                        alt="Concept website for a noodle bar, with a bold red homepage and a smiling noodle bowl mascot"
                        name="Slurp!"
                      />
                    </div>
                  </div>
                </div>
                <figcaption className="device-tag">CONCEPT · NOODLE BAR</figcaption>
              </figure>

              <div className="tape tape-one">MADE FOR REAL PEOPLE</div>
            </div>
          </div>
        </section>

        <section className="for-you">
          <div className="for-you-title">
            <span className="section-tag">[ IS THIS YOU? ]</span>
            <h2>
              SMALL BUSINESS.
              <br />
              <em>BIG ENERGY.</em>
            </h2>
          </div>
          <div className="audience-list">
            {audiences.map((item, index) => (
              <div className="audience-row" key={item}>
                <span>0{index + 1}</span>
                <h3>{item}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="truth">
          <div className="truth-badge">
            THE
            <br />
            TRUTH
          </div>
          <h2>
            YOUR WEBSITE SHOULD
            <br />
            WORK HARD.{" "}
            <span>
              NOT COST
              <br />
              YOU FOREVER.
            </span>
          </h2>
          <p>
            You pay for the build. You own the finished website. If you want help later, book it
            when you need it. That's it. Radical, apparently.
          </p>
          <Link to="/contact" className="button-dark">
            TELL ME YOUR IDEA <Arrow />
          </Link>
        </section>

        <section className="price-promise">
          <div className="price-heading">
            <span className="section-tag">[ NO SURPRISES ]</span>
            <h2>
              STARTING FROM
              <br />
              <strong>$800</strong>
            </h2>
          </div>
          <div className="price-details">
            <div className="one-off-stamp">
              ONE-OFF
              <br />
              PAYMENT
            </div>
            <p>
              One-page websites start from $800. Multi-page websites start from $1099. You pay once
              for the build, plus your own domain name.
            </p>
            <small>
              Your domain name is your website address, like www.yourbusiness.com.au. You buy it
              directly, so it's always yours.
            </small>
            <div className="price-promises">
              <span>NO SUBSCRIPTIONS</span>
              <span>NO HIDDEN FEES</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {intro !== "done" && (
        <YawnIntro
          onReveal={() => setIntro((current) => (current === "playing" ? "revealing" : current))}
          onDone={() => setIntro("done")}
        />
      )}
    </>
  );
}
