import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Arrow, Footer, PageMeta } from "../components/SiteChrome";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1779558709972-3412e61d0d7f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
    alt: "A vibrant independent cafe with colorful outdoor tables and chairs",
    label: "CAFÉS",
    credit: "Hồng Xuân Văn",
  },
  {
    src: "https://images.unsplash.com/photo-1790731123388-5365ace3be4e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
    alt: "A small storefront with a colorful mural and sidewalk sign",
    label: "LOCAL SHOPS",
    credit: "ANGIE BAONGOC",
  },
  {
    src: "https://images.unsplash.com/photo-1792767998018-8f38ff9d465f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
    alt: "A colorful building covered in geometric murals",
    label: "BOLD IDEAS",
    credit: "Kelvin Zyteng",
  },
];

const audiences = [
  "CAFÉS + COFFEE SHOPS",
  "SALONS + BEAUTY",
  "HOME SERVICES",
  "CREATIVE + CURIOUS THINGS",
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
  const [photoStripRef, photosVisible] = useInView<HTMLElement>(0.2);

  return (
    <>
      <style>{funkStyles}</style>
      <PageMeta
        title="The Boredom Project | Custom Websites for Small Businesses"
        description="Personality-packed custom websites for cafés, salons, home services and independent businesses. One-off pricing, no subscriptions and no hidden fees."
      />
      <main>
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
                cookie-cutter nonsense.
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
          ref={photoStripRef}
          className={`photo-strip${photosVisible ? " in-view" : ""}`}
          aria-label="Businesses like yours"
        >
          {photos.map((photo, index) => (
            <figure key={photo.label} className={`photo-card card-${index + 1}`}>
              <img src={photo.src} alt={photo.alt} />
              <figcaption>
                <span>{photo.label}</span>
                <small>PHOTO: {photo.credit}</small>
              </figcaption>
            </figure>
          ))}
          <div className="tape tape-one">MADE FOR REAL PEOPLE</div>
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
              <strong>$600</strong>
            </h2>
          </div>
          <div className="price-details">
            <div className="one-off-stamp">
              ONE-OFF
              <br />
              PAYMENT
            </div>
            <p>
              One-page websites start from $600. Multi-page websites start from $899. You pay once
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
    </>
  );
}
