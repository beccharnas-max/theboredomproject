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

export default function Home() {
  const photoStripRef = useRef<HTMLElement>(null);
  const [photosVisible, setPhotosVisible] = useState(false);

  useEffect(() => {
    const section = photoStripRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhotosVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <PageMeta
        title="The Boredom Project | Custom Websites for Small Businesses"
        description="Personality-packed custom websites for cafes, salons, home services and independent businesses—with no templates, subscriptions or hidden fees."
      />
      <main>
        <section className="hero">
          <div className="hero-kicker">WEBSITES FOR GOOD SMALL BUSINESSES</div>
          <h1>
            BORING
            <br />
            WEBSITES
            <br />
            <span>CAN GET LOST.</span>
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

        <section className="intro">
          <div className="section-tag">[ THE BIG IDEA ]</div>
          <div className="intro-copy">
            <h2>
              YOUR BUSINESS ISN'T
              <br />
              OFF-THE-SHELF.
            </h2>
            <p>
              So why should your website be? The Boredom Project makes one-of-one websites with your
              style, your story and your customers in mind. No page builders. No weird
              subscriptions. No cookie-cutter nonsense.
            </p>
            <Link to="/services" className="text-link">
              HOW IT WORKS <Arrow />
            </Link>
          </div>
        </section>

        <section
          ref={photoStripRef}
          className={`photo-strip${photosVisible ? " in-view" : ""}`}
          aria-label="Businesses we build for"
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
            {[
              "CAFÉS + COFFEE SHOPS",
              "SALONS + BEAUTY",
              "HOME SERVICES",
              "CREATIVE + CURIOUS THINGS",
            ].map((item, index) => (
              <div className="audience-row" key={item}>
                <span>0{index + 1}</span>
                <h3>{item}</h3>
                <b>↗</b>
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
          <a href="mailto:hello@theboredomproject.studio" className="button-dark">
            TELL ME YOUR IDEA <Arrow />
          </a>
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
            <p>Prices start from as little as a one-off payment of $600, plus domain hosting.</p>
            <small>
              Domain hosting simply means purchasing your website address—like www.yourwebsite.com.
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
