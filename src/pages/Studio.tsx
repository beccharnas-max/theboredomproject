
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Arrow, Footer, PageMeta } from "../components/SiteChrome";

type Project = {
  id: string;
  name: string;
  kind: string;
  tag: string;
  address: string;
  thumb: string;
  full: string;
  alt: string;
  blurb: string;
  points: string[];
};

const projects: Project[] = [
  {
    id: "cafe",
    name: "The Corner Café",
    kind: "Café concept",
    tag: "CONCEPT",
    address: "yourcafe.com.au",
    thumb: "/studio/cafe-thumb.jpg",
    full: "/studio/cafe-full.jpg",
    alt: "Concept website for a neighbourhood café",
    blurb:
      "A neighbourhood café with a little more character. Menu, opening hours, location and a reason to come through the door.",
    points: [
      "Menu and hours up front",
      "Map and contact in one scroll",
      "Fast on a phone, where it counts",
    ],
  },
  {
    id: "boredom",
    name: "The Boredom Project",
    kind: "Our own website",
    tag: "LIVE",
    address: "theboredomproject.au",
    thumb: "/studio/boredom-thumb.png",
    full: "/studio/boredom-full.png",
    alt: "The Boredom Project website",
    blurb:
      "The site you're on. Big personality, bold design and built from scratch. Because we'd never sell you something we wouldn't use ourselves.",
    points: [
      "Custom-built, no templates",
      "Contact form straight to the inbox",
      "Google Analytics and search set up",
    ],
  },
  {
    id: "workhorse",
    name: "Workhorse Marketing",
    kind: "Marketing consultancy",
    tag: "LIVE",
    address: "workhorsemarketing.au",
    thumb: "/studio/workhorse-thumb.jpg",
    full: "/studio/workhorse-full.jpg",
    alt: "Workhorse Marketing website",
    blurb:
      "A marketing consultancy with its own personality. Editorial styling, confident typography and a straightforward path from first impression to enquiry.",
    points: [
      "Editorial design with a full-bleed hero",
      "Services and results laid out for skimming",
      "Built to be found on Google",
    ],
  },
];

const studioStyles = `
.studio-page {
  background: var(--paper);
  color: var(--ink);
  overflow: hidden;
}

/* HERO */

.studio-hero {
  position: relative;
  min-height: 76vh;
  padding: clamp(5rem, 9vw, 9rem) 5vw 5rem;
  background: var(--pink);
  border-bottom: 2px solid var(--ink);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.studio-tag {
  font: 500 12px "DM Mono", monospace;
  letter-spacing: .1em;
  margin-bottom: 2rem;
}

.studio-hero h1 {
  font: 400 clamp(3.8rem, 10vw, 10rem)/.83 "Titan One", sans-serif;
  letter-spacing: -.045em;
  margin: 0 auto 2.5rem;
  max-width: 90rem;
  text-transform: uppercase;
  text-shadow: 4px 4px 0 var(--ink);
  color: var(--paper);
}

.studio-hero h1 span {
  color: var(--paper);
  -webkit-text-stroke: 2px var(--ink);
  text-shadow: 4px 4px 0 var(--ink);
}

.studio-hero p {
  max-width: 38rem;
  margin: 0 auto;
  font-size: clamp(1rem, 1.6vw, 1.3rem);
  line-height: 1.5;
  font-weight: 700;
}

.studio-sticker {
  position: absolute;
  top: 8%;
  right: 8%;
  width: 95px;
  height: 95px;
  border: 2px solid var(--ink);
  border-radius: 50%;
  background: var(--acid);
  display: grid;
  place-items: center;
  text-align: center;
  font: 500 10px/1.4 "DM Mono", monospace;
  transform: rotate(12deg);
  box-shadow: 4px 4px 0 var(--ink);
}

.studio-star {
  position: absolute;
  bottom: 8%;
  left: 8%;
  color: var(--acid);
  font-size: clamp(3rem, 7vw, 6rem);
  animation: studioSpin 18s linear infinite;
}

@keyframes studioSpin {
  to { transform: rotate(360deg); }
}

/* INTRO STRIP */

.studio-strip {
  padding: 1rem 5vw;
  background: var(--acid);
  border-bottom: 2px solid var(--ink);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  font: 500 11px "DM Mono", monospace;
  letter-spacing: .08em;
  text-transform: uppercase;
}

/* PROJECTS */

.studio-work {
  padding: 3rem 5vw 6rem;
  background: var(--paper);
}

.studio-block {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, .8fr);
  gap: clamp(2rem, 6vw, 6rem);
  align-items: center;
  padding: clamp(3rem, 7vw, 6rem) 0;
  border-bottom: 2px solid var(--ink);
}

.studio-block.flip {
  grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr);
}

.studio-block.flip .studio-card {
  order: 2;
}

/* WEBSITE PREVIEW CARDS */

.studio-card {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  font: inherit;
  color: inherit;
  text-align: left;
  background: var(--paper);
  border: 2px solid var(--ink);
  box-shadow: 8px 8px 0 var(--ink);
  cursor: pointer;
  overflow: hidden;
  transition: transform .25s ease, box-shadow .25s ease;
}

.studio-card:hover,
.studio-card:focus-visible {
  transform: translate(-5px, -5px) rotate(-.5deg);
  box-shadow: 13px 13px 0 var(--pink);
  outline: none;
}

.studio-block.flip .studio-card:hover,
.studio-block.flip .studio-card:focus-visible {
  transform: translate(5px, -5px) rotate(.5deg);
}

.studio-minibar {
  display: flex;
  gap: .4rem;
  padding: .75rem .9rem;
  background: var(--ink);
}

.studio-minibar i,
.studio-dots i {
  width: .65rem;
  height: .65rem;
  border-radius: 50%;
  background: var(--paper);
  opacity: .7;
  display: block;
}

.studio-thumb {
  display: block;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--acid);
}

.studio-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
}

.studio-badge {
  position: absolute;
  top: 2.9rem;
  left: 1rem;
  z-index: 2;
  padding: .5rem .8rem;
  background: var(--acid);
  color: var(--ink);
  border: 1px solid var(--ink);
  font: 500 10px "DM Mono", monospace;
  letter-spacing: .08em;
  box-shadow: 3px 3px 0 var(--ink);
}

.studio-hint {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  padding: .7rem .9rem;
  background: var(--ink);
  color: var(--paper);
  font: 500 10px "DM Mono", monospace;
  letter-spacing: .05em;
  transition: background .2s, color .2s;
}

.studio-card:hover .studio-hint {
  background: var(--pink);
  color: var(--ink);
}

/* PROJECT COPY */

.studio-copy .studio-kind {
  display: inline-block;
  padding: .5rem .8rem;
  background: var(--acid);
  border: 1px solid var(--ink);
  font: 500 10px "DM Mono", monospace;
  text-transform: uppercase;
  letter-spacing: .08em;
  margin-bottom: 1.5rem;
}

.studio-copy h2 {
  font: 400 clamp(2.5rem, 5vw, 5rem)/.95 "Titan One", sans-serif;
  letter-spacing: -.04em;
  margin: 0 0 1.5rem;
  text-transform: uppercase;
}

.studio-copy p {
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  line-height: 1.6;
  font-weight: 600;
  margin: 0 0 1.8rem;
  max-width: 35rem;
}

.studio-copy ul {
  list-style: none;
  padding: 1.3rem 0 0;
  margin: 0;
  border-top: 2px solid var(--ink);
  display: grid;
  gap: .8rem;
}

.studio-copy li {
  display: flex;
  gap: .8rem;
  font-size: .9rem;
  font-weight: 700;
  line-height: 1.5;
}

.studio-copy li::before {
  content: "↗";
  font-family: "DM Mono", monospace;
  color: var(--orange);
}

/* CTA */

.studio-cta {
  position: relative;
  padding: clamp(4rem, 9vw, 8rem) 5vw;
  background: var(--blue);
  color: var(--paper);
  border-top: 2px solid var(--ink);
  text-align: center;
}

.studio-cta > span {
  display: block;
  font: 500 11px "DM Mono", monospace;
  letter-spacing: .12em;
  margin-bottom: 1.5rem;
}

.studio-cta h2 {
  font: 400 clamp(3rem, 8vw, 8rem)/.85 "Titan One", sans-serif;
  letter-spacing: -.04em;
  max-width: 65rem;
  margin: 0 auto 2.5rem;
  color: var(--paper);
  -webkit-text-stroke: 1px var(--ink);
  text-shadow: 4px 4px 0 var(--ink);
}

.studio-cta a {
  display: inline-flex;
  align-items: center;
  gap: 2rem;
  padding: 1.1rem 1.5rem;
  background: var(--acid);
  color: var(--ink);
  border: 2px solid var(--ink);
  box-shadow: 5px 5px 0 var(--ink);
  font: 500 11px "DM Mono", monospace;
  text-transform: uppercase;
  transition: transform .2s, box-shadow .2s;
}

.studio-cta a:hover {
  transform: translate(-3px, -3px);
  box-shadow: 8px 8px 0 var(--ink);
}

/* SCREENSHOT PLACEHOLDERS */

.studio-mock {
  width: 100%;
  height: 100%;
  min-height: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: .75rem;
  padding: 1.5rem;
  background: var(--pink);
  color: var(--ink);
}

.studio-mock strong {
  font: 400 clamp(1.5rem, 3vw, 2.5rem) "Titan One", sans-serif;
}

.studio-mock span {
  font: 500 10px "DM Mono", monospace;
  letter-spacing: .08em;
}

.studio-mock-block {
  height: 14rem;
  background: var(--ink);
  opacity: .12;
  margin-top: 1rem;
}

/* FULL PAGE VIEWER */

.studio-viewer {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: clamp(.75rem, 3vw, 2rem);
  background: rgba(18,18,18,.88);
  animation: studioFade .2s ease both;
}

.studio-frame {
  width: min(70rem, 100%);
  height: min(88vh, 100%);
  display: flex;
  flex-direction: column;
  background: var(--paper);
  border: 2px solid var(--ink);
  box-shadow: 9px 9px 0 var(--acid);
}

.studio-bar {
  display: flex;
  align-items: center;
  gap: .9rem;
  padding: .75rem .9rem;
  background: var(--ink);
  color: var(--paper);
}

.studio-dots {
  display: flex;
  gap: .4rem;
}

.studio-address {
  flex: 1;
  min-width: 0;
  font: 11px "DM Mono", monospace;
  padding: .4rem .75rem;
  background: rgba(246,242,233,.12);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.studio-close {
  font: 500 10px "DM Mono", monospace;
  color: var(--ink);
  background: var(--acid);
  border: 0;
  padding: .65rem .8rem;
  cursor: pointer;
}

.studio-close:hover,
.studio-close:focus-visible {
  background: var(--pink);
  outline: none;
}

.studio-scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  outline: none;
}

.studio-scroll img {
  width: 100%;
  display: block;
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
}

.studio-scroll .studio-mock {
  min-height: 0;
  height: auto;
}

@keyframes studioFade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes studioPop {
  from { opacity: 0; transform: translateY(20px) scale(.98); }
  to { opacity: 1; transform: none; }
}

/* MOBILE */

@media (max-width: 860px) {
  .studio-hero {
    min-height: 65vh;
    padding: 6rem 1.5rem 5rem;
  }

  .studio-hero h1 {
    font-size: clamp(3.2rem, 14vw, 6rem);
  }

  .studio-sticker {
    width: 70px;
    height: 70px;
    right: 5%;
    top: 3%;
    font-size: 8px;
  }

  .studio-star {
    display: none;
  }

  .studio-work {
    padding: 2rem 1.25rem 4rem;
  }

  .studio-block,
  .studio-block.flip {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding: 3rem 0;
  }

  .studio-block.flip .studio-card {
    order: 0;
  }

  .studio-copy h2 {
    font-size: clamp(2.7rem, 11vw, 4.5rem);
  }

  .studio-strip {
    padding: 1rem 1.25rem;
    font-size: 9px;
  }

  .studio-cta {
    padding: 5rem 1.25rem;
  }

  .studio-cta h2 {
    font-size: clamp(3rem, 13vw, 5.5rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .studio-card,
  .studio-viewer,
  .studio-frame,
  .studio-cta a,
  .studio-star {
    transition: none;
    animation: none;
  }

  .studio-card:hover,
  .studio-card:focus-visible,
  .studio-cta a:hover {
    transform: none;
  }
}
`;

function SiteImage({
  src,
  alt,
  name,
  tall = false,
}: {
  src: string;
  alt: string;
  name: string;
  tall?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="studio-mock" role="img" aria-label={alt}>
        <strong>{name}</strong>
        <span>SCREENSHOT COULD NOT LOAD: {src}</span>
        {tall &&
          [1, 2, 3, 4].map((n) => (
            <div key={n} className="studio-mock-block" />
          ))}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      loading={tall ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

function Viewer({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <div
      className="studio-viewer"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "rgba(18,18,18,.88)",
      }}
    >
      <div
        className="studio-frame"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} website preview`}
        onClick={(event) => event.stopPropagation()}
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "min(70rem, 100%)",
          height: "88vh",
          minHeight: 0,
          background: "var(--paper)",
          border: "2px solid var(--ink)",
          boxShadow: "9px 9px 0 var(--acid)",
          overflow: "hidden",
        }}
      >
        <div
          className="studio-bar"
          style={{
            display: "flex",
            flexShrink: 0,
            alignItems: "center",
            gap: ".9rem",
            padding: ".75rem .9rem",
            background: "var(--ink)",
            color: "var(--paper)",
          }}
        >
          <span className="studio-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>

          <span className="studio-address">{project.address}</span>

          <button
            ref={closeRef}
            type="button"
            className="studio-close"
            onClick={onClose}
          >
            CLOSE ✕
          </button>
        </div>

        <div
          className="studio-scroll"
          tabIndex={0}
          aria-label="Scroll to explore the website"
          style={{
            display: "block",
            flex: "1 1 auto",
            minHeight: 0,
            width: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            background: "var(--paper)",
          }}
        >
          <SiteImage
            src={project.full}
            alt={project.alt}
            name={project.name}
            tall
          />
        </div>
      </div>
    </div>
  );
}

export default function Studio() {
  const [active, setActive] = useState<Project | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  function openViewer(project: Project, trigger: HTMLElement) {
    triggerRef.current = trigger;
    setActive(project);
  }

  function closeViewer() {
    setActive(null);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (!active) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      <style>{studioStyles}</style>

      <PageMeta
        title="Studio | The Boredom Project"
        description="A look at websites built by The Boredom Project. Custom websites with personality, purpose and a little less boring."
      />

      <main className="studio-page">

        <section className="studio-hero">
          <span className="studio-tag">[ THE STUDIO / SELECTED WORK ]</span>

          <span className="studio-sticker">
            GOOD
            <br />
            IDEAS
            <br />
            ONLY
          </span>

          <h1>
            GOOD WORK.
            <br />
            <span>NO BORING</span>
            <br />
            WEBSITES.
          </h1>

          <p>
            A few things we've made and a few ideas of what's possible.
            Websites with personality, built around the business behind them.
          </p>

          <span className="studio-star" aria-hidden="true">✳</span>
        </section>

        <div className="studio-strip">
          <span>THE WORK / THE IDEAS / THE DETAILS</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>

        <section className="studio-work">
          {projects.map((project, index) => (
            <section
              key={project.id}
              className={`studio-block${index % 2 ? " flip" : ""}`}
            >
              <button
                type="button"
                className="studio-card"
                onClick={(event) =>
                  openViewer(project, event.currentTarget)
                }
                aria-label={`Open a scrolling preview of ${project.name}`}
              >
                <span className="studio-minibar" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>

                <span className="studio-badge">{project.tag}</span>

                <span className="studio-thumb">
                  <SiteImage
                    src={project.thumb}
                    alt={project.alt}
                    name={project.name}
                  />
                </span>

                <span className="studio-hint" aria-hidden="true">
                  CLICK TO EXPLORE ↗
                </span>
              </button>

              <div className="studio-copy">
                <span className="studio-kind">{project.kind}</span>

                <h2>{project.name}</h2>

                <p>{project.blurb}</p>

                <ul>
                  {project.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </section>

        <section className="studio-cta">
          <span>YOUR BUSINESS / YOUR NEXT CHAPTER</span>

          <h2>
            GOT AN IDEA?
            <br />
            LET'S MAKE
            <br />
            IT HAPPEN.
          </h2>

          <Link to="/contact">
            TELL ME YOUR IDEA <Arrow />
          </Link>
        </section>

      </main>

      <Footer />

      {active && (
        <Viewer project={active} onClose={closeViewer} />
      )}
    </>
  );
}
