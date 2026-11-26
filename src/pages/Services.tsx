import { Arrow, Footer, PageMeta } from "../components/SiteChrome";

export default function Services() {
  return (
    <>
      <PageMeta
        title="Website Services | The Boredom Project"
        description="Explore custom-coded signature websites and one-page websites with one-off pricing, optional support and no subscriptions."
      />
      <main>
        <section className="services-hero">
          <span className="section-tag">[ WHAT I DO ]</span>
          <h1>
            ONE-OF-ONE
            <br />
            <span>WEBSITES.</span>
          </h1>
          <div className="services-lede">
            <p>
              Simple to use. Easy to own. Built to show people exactly why your business is worth
              choosing.
            </p>
            <div className="asterisk">✳</div>
          </div>
        </section>

        <section className="package">
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
              bloat. Starting from $1099
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

        <section className="package package-pink">
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
              ventures, focused offers and businesses that want to keep it beautifully simple. Starting at $800
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

        <section className="retainer">
          <div>
            <span className="section-tag">[ NEED A HAND LATER? ]</span>
            <h2>
              KEEP ME
              <br />
              ON CALL.
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

        <section className="process">
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
            ].map(([number, title, copy]) => (
              <div className="step" key={number}>
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
