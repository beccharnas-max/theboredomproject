import { useState, type FormEvent } from "react";
import { Footer, PageMeta } from "../components/SiteChrome";

// Web3Forms access keys are safe to keep in public code: they can only send messages to your inbox.
const ACCESS_KEY = "7ac3c119-2d54-4afe-a998-c1506d478fe5";
const CONTACT_EMAIL = "hello@theboredomproject.au";

type Status = "idle" | "sending" | "success" | "error";

const contactStyles = `
.contact-page {
  min-height: 80vh;
  padding: clamp(7rem, 12vw, 10rem) clamp(1.25rem, 5vw, 4.5rem) clamp(3rem, 8vw, 6rem);
  background: var(--bp-ink, #111);
  color: var(--bp-paper, #f5f2ea);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  gap: clamp(2rem, 6vw, 6rem);
  align-items: start;
}
.contact-intro .contact-tag {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: .85rem;
  letter-spacing: .08em;
  margin-bottom: 1.5rem;
  display: block;
}
.contact-intro h1 {
  font-size: clamp(2.6rem, 7vw, 6rem);
  line-height: .95;
  margin: 0 0 1.5rem;
}
.contact-intro h1 span { color: var(--bp-lime, #dffd5f); }
.contact-intro p {
  font-size: clamp(1.05rem, 1.6vw, 1.35rem);
  line-height: 1.5;
  max-width: 32rem;
  margin: 0 0 1.5rem;
}
.contact-direct {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: .9rem;
  opacity: .8;
  user-select: all;
}

.contact-form { display: grid; gap: 1.25rem; }
.contact-field { display: grid; gap: .5rem; }
.contact-field label {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: .8rem;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.contact-field input,
.contact-field textarea {
  width: 100%;
  font: inherit;
  font-size: 1.05rem;
  color: var(--bp-paper, #f5f2ea);
  background: transparent;
  border: 2px solid var(--bp-paper, #f5f2ea);
  border-radius: 0;
  padding: .9rem 1rem;
  outline: none;
  transition: border-color .15s ease, background-color .15s ease;
}
.contact-field textarea { min-height: 10rem; resize: vertical; }
.contact-field input:focus,
.contact-field textarea:focus {
  border-color: var(--bp-lime, #dffd5f);
  background: rgba(255,255,255,.04);
}
.contact-submit {
  justify-self: start;
  font: inherit;
  font-weight: 800;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: var(--bp-ink, #111);
  background: var(--bp-lime, #dffd5f);
  border: 2px solid var(--bp-lime, #dffd5f);
  padding: 1rem 1.8rem;
  cursor: pointer;
  transition: transform .15s ease, box-shadow .15s ease;
}
.contact-submit:hover:not(:disabled) {
  transform: translate(-3px, -3px);
  box-shadow: 5px 5px 0 var(--bp-paper, #f5f2ea);
}
.contact-submit:disabled { opacity: .6; cursor: wait; }
.contact-hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }

.contact-message {
  border: 2px solid var(--bp-paper, #f5f2ea);
  padding: 1.25rem 1.5rem;
  font-size: 1.05rem;
  line-height: 1.5;
}
.contact-message.success { border-color: var(--bp-lime, #dffd5f); }
.contact-message.error { border-color: #ff6b4a; }
.contact-message strong { display: block; font-size: 1.4rem; margin-bottom: .35rem; }

@media (max-width: 860px) {
  .contact-page { grid-template-columns: 1fr; }
}
`;

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: real people never tick this hidden box.
    if (data.get("botcheck")) return;

    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: "New enquiry from The Boredom Project website",
          from_name: "The Boredom Project website",
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <style>{contactStyles}</style>
      <PageMeta
        title="Contact | The Boredom Project"
        description="Tell us about your business and your website idea. Custom websites for small businesses, one-off pricing, no subscriptions."
      />
      <main className="contact-page">
        <div className="contact-intro">
          <span className="contact-tag">[ SAY HELLO ]</span>
          <h1>
            TELL ME
            <br />
            YOUR <span>IDEA.</span>
          </h1>
          <p>
            Tell me about your business and what you're after. A few lines is plenty. I'll get
            back to you with next steps and a clear price.
          </p>
          <p className="contact-direct">{CONTACT_EMAIL}</p>
        </div>

        <div>
          {status === "success" ? (
            <div className="contact-message success" role="status">
              <strong>MESSAGE SENT.</strong>
              Thanks for getting in touch. I'll reply as soon as I can.
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-field">
                <label htmlFor="contact-name">Your name</label>
                <input id="contact-name" name="name" type="text" required autoComplete="name" />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-email">Your email</label>
                <input id="contact-email" name="email" type="email" required autoComplete="email" />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message">Your idea</label>
                <textarea id="contact-message" name="message" required />
              </div>

              <input
                type="checkbox"
                name="botcheck"
                className="contact-hp"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <button type="submit" className="contact-submit" disabled={status === "sending"}>
                {status === "sending" ? "SENDING..." : "SEND IT"}
              </button>

              {status === "error" && (
                <div className="contact-message error" role="alert">
                  <strong>THAT DIDN'T SEND.</strong>
                  Something went wrong. Please try again, or email {CONTACT_EMAIL} directly.
                </div>
              )}
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
