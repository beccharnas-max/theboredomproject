import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";

export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function PageMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);

  return null;
}

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link
        className="brand"
        to="/"
        onClick={() => setOpen(false)}
        aria-label="The Boredom Project home"
      >
        <span className="brand-dot" />
        THE BOREDOM
        <br />
        PROJECT
      </Link>
      <button
        className="menu-toggle"
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="site-nav"
      >
        {open ? "CLOSE" : "MENU"}
      </button>
      <nav
        id="site-nav"
        className={open ? "nav-links open" : "nav-links"}
        aria-label="Main navigation"
      >
        <NavLink to="/" end onClick={() => setOpen(false)}>
          HOME
        </NavLink>
        <NavLink to="/services" onClick={() => setOpen(false)}>
          SERVICES
        </NavLink>
        <Link className="nav-cta" to="/contact" onClick={() => setOpen(false)}>
          START A PROJECT <Arrow />
        </Link>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <p>
          GOT A BUSINESS
          <br />
          WITH A STORY?
        </p>
        <Link to="/contact">
          LET'S MAKE
          <br />
          SOMETHING <Arrow />
        </Link>
      </div>
      <div className="footer-bottom">
        <span>THE BOREDOM PROJECT © {new Date().getFullYear()}</span>
        <span>INDEPENDENTLY MADE. NEVER BORING.</span>
      </div>
    </footer>
  );
}

export function RootLayout() {
  const location = useLocation();
  const [remixed, setRemixed] = useState(() => localStorage.getItem("boredom-palette") === "remix");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const togglePalette = () => {
    setRemixed((current) => {
      const next = !current;
      localStorage.setItem("boredom-palette", next ? "remix" : "original");
      return next;
    });
  };

  return (
    <div className={`app${remixed ? " remixed" : ""}`}>
      <button
        className="palette-toggle"
        type="button"
        aria-pressed={remixed}
        aria-label={`Change colour palette. ${remixed ? "Remixed colours are on" : "Original colours are on"}`}
        onClick={togglePalette}
      >
        <span>CHANGE IT UP</span>
        <i aria-hidden="true">
          <b />
        </i>
      </button>
      <Nav />
      <Outlet />
    </div>
  );
}
