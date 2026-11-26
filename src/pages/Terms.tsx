import type { ReactNode } from "react";
import { Arrow, Footer, PageMeta } from "../components/SiteChrome";

type TermsSection = {
  title: string;
  content: ReactNode;
};

const sections: TermsSection[] = [
  {
    title: "01. About the service",
    content: (
      <>
        <p>
          The Boredom Project Studio provides custom-designed and coded websites
          for small businesses, independent operators and service-based businesses.
        </p>
        <p>
          Each website is built using a JAMstack architecture (JavaScript, APIs
          and Markup). This approach creates lightweight, responsive websites
          designed to be fast, secure and straightforward to host.
        </p>
        <p>
          Your website is a one-off design and development project, not an
          ongoing website management service or subscription.
        </p>
      </>
    ),
  },
  {
    title: "02. What's included",
    content: (
      <>
        <p>
          Your agreed project fee covers the design, development and launch of
          the website outlined in your individual project proposal.
        </p>
        <p>Depending on your selected package, this may include:</p>
        <ul>
          <li>Initial discovery and content direction.</li>
          <li>Custom visual design and website layout.</li>
          <li>Custom-coded website development.</li>
          <li>Responsive desktop, tablet and mobile layouts.</li>
          <li>Contact forms, enquiry links and agreed integrations.</li>
          <li>Basic technical SEO setup.</li>
          <li>Website testing and Cloudflare deployment.</li>
          <li>Final website code and project handover.</li>
        </ul>
        <p>
          Exact deliverables, page count and functionality are confirmed in
          your project proposal. Anything outside the agreed scope may incur
          additional fees.
        </p>
      </>
    ),
  },
  {
    title: "03. Website technology & hosting",
    content: (
      <>
        <p>
          All websites are developed using a JAMstack architecture and deployed
          through Cloudflare Pages.
        </p>
        <p>
          This technology is designed for content-led websites, business
          information, service pages, portfolios and enquiry generation.
        </p>
        <p>
          Your website is not a traditional drag-and-drop website builder.
          Unless specifically agreed, it does not include a content management
          system (CMS) or backend editing dashboard. Changes to website content,
          imagery, layouts and functionality generally require code updates
          and redeployment.
        </p>
        <p>
          Cloudflare provides the hosting infrastructure, subject to its own
          platform terms, availability and pricing policies. Free hosting
          options may be available, but additional services or usage
          requirements can incur fees.
        </p>
      </>
    ),
  },
  {
    title: "04. Ownership & handover",
    content: (
      <>
        <p>
          Once the final project invoice has been paid in full, the client
          receives ownership of the completed, project-specific website
          deliverables, subject to the exclusions below.
        </p>
        <p>This includes:</p>
        <ul>
          <li>The completed website and project-specific source code.</li>
          <li>The right to use, modify and engage another developer.</li>
          <li>Final website assets supplied as part of the project.</li>
          <li>Control of the website's deployment and hosting account.</li>
        </ul>
        <p>
          The client is responsible for owning and maintaining their own domain
          registration and Cloudflare account.
        </p>
        <p>
          Pre-existing reusable code, development methods, frameworks and
          libraries belonging to The Boredom Project remain its property.
          Third-party software, fonts and assets remain subject to their
          respective licensing terms.
        </p>
      </>
    ),
  },
  {
    title: "05. Domain names & third-party accounts",
    content: (
      <>
        <p>
          The client is responsible for purchasing, registering and renewing
          their domain name, and maintaining access to their Cloudflare account.
        </p>
        <p>
          The Boredom Project can assist with initial configuration and
          deployment as part of the agreed project scope.
        </p>
        <p>
          Ongoing account administration, domain renewals, DNS changes and
          third-party subscriptions are not included unless separately agreed.
        </p>
      </>
    ),
  },
  {
    title: "06. Content & client responsibilities",
    content: (
      <>
        <p>
          The client is responsible for supplying accurate business information,
          website copy, imagery, branding and other materials required to
          complete the website.
        </p>
        <p>
          The client confirms they have the necessary rights and permissions
          to use any content, images, logos or materials they supply.
        </p>
        <p>
          Content direction and assistance with arranging supplied information
          may be included. Full copywriting, professional photography, video
          production and extensive content creation are not included unless
          specified in the proposal.
        </p>
        <p>
          The client is responsible for reviewing and approving all final
          website content before launch, including spelling, pricing, business
          information and contact details.
        </p>
      </>
    ),
  },
  {
    title: "07. Revisions & changes",
    content: (
      <>
        <p>
          The agreed project fee includes the design and development work and
          revisions specifically outlined in the project proposal.
        </p>
        <p>
          Once the final design and website content have been approved,
          substantial changes to the agreed direction, layout, functionality
          or scope may incur additional fees.
        </p>
        <p>Following launch, updates can be arranged through:</p>
        <ul>
          <li>One-off updates, quoted separately.</li>
          <li>An optional ongoing support retainer.</li>
        </ul>
        <p>
          There is no compulsory maintenance plan or monthly subscription
          attached to your website purchase.
        </p>
      </>
    ),
  },
  {
    title: "08. What's not included",
    content: (
      <>
        <p>
          The Boredom Project specialises in custom-coded, content-led websites.
          The following are not included in standard website packages:
        </p>
        <ul>
          <li>E-commerce websites or online stores.</li>
          <li>Shopping carts, product catalogues or checkout functionality.</li>
          <li>Payment processing or online product sales systems.</li>
          <li>Complex booking platforms or membership portals.</li>
          <li>Custom backend applications or database-driven platforms.</li>
          <li>Ongoing website maintenance or content management.</li>
          <li>Unlimited revisions or ongoing design changes.</li>
          <li>Guaranteed Google rankings or search engine results.</li>
          <li>Paid third-party software, subscriptions or service fees.</li>
        </ul>
        <p>
          If your business requires complex functionality or an e-commerce
          platform, The Boredom Project may not be the right fit.
        </p>
      </>
    ),
  },
  {
    title: "09. Project timelines & delays",
    content: (
      <>
        <p>
          Project timelines are agreed before work commences and depend on
          receiving the required content, assets, feedback and approvals
          within the agreed timeframes.
        </p>
        <p>
          Delays in receiving information or approvals may affect the delivery
          and launch date. Where circumstances outside The Boredom Project's
          reasonable control affect delivery, a revised timeline will be
          communicated.
        </p>
      </>
    ),
  },
  {
    title: "10. Payment terms",
    content: (
      <>
        <p>
          The total project fee and payment schedule are outlined in your
          individual proposal or invoice.
        </p>
        <p>
          Work commences once the agreed initial payment has been received.
          Final website handover, including completed project files and source
          code, occurs once the project balance has been paid in full.
        </p>
        <p>
          Additional work outside the original scope must be approved and
          may be invoiced separately.
        </p>
      </>
    ),
  },
  {
    title: "11. Launch & post-launch support",
    content: (
      <>
        <p>
          Once the website has been tested, approved and deployed, the project
          is considered complete.
        </p>
        <p>
          The one-off website fee includes initial launch and handover, not
          indefinite technical support.
        </p>
        <p>
          Any agreed post-launch defect corrections will be handled in
          accordance with the project proposal and applicable consumer
          guarantees.
        </p>
        <p>
          New content, additional functionality, third-party changes and
          ongoing assistance are treated as additional work.
        </p>
      </>
    ),
  },
  {
    title: "12. Third-party services",
    content: (
      <>
        <p>
          Websites may rely on third-party services such as Cloudflare,
          domain registrars, form providers, analytics platforms and other
          external integrations.
        </p>
        <p>
          The Boredom Project is not responsible for changes, outages,
          service interruptions, pricing changes or discontinued features
          introduced by these providers.
        </p>
        <p>
          Where an integration requires a paid subscription or account,
          the client is responsible for its ongoing costs and compliance
          with the provider's terms.
        </p>
      </>
    ),
  },
  {
    title: "13. Portfolio & promotion",
    content: (
      <p>
        Unless otherwise agreed in writing, The Boredom Project may display
        completed website work in its portfolio, website, social media and
        promotional materials. Client-confidential information will not be
        intentionally disclosed.
      </p>
    ),
  },
  {
    title: "14. Limitation of responsibility",
    content: (
      <>
        <p>
          The Boredom Project takes reasonable care in designing, building
          and testing each website before launch.
        </p>
        <p>
          No guarantee is made regarding specific business outcomes, website
          traffic, lead volumes, search engine rankings, sales or conversion
          rates.
        </p>
        <p>
          The client is responsible for the accuracy of published business
          information and for maintaining their domain, hosting account and
          third-party services following handover.
        </p>
        <p>
          Nothing in these terms excludes, restricts or modifies any rights
          or guarantees that cannot legally be excluded under Australian
          Consumer Law.
        </p>
      </>
    ),
  },
  {
    title: "15. Cancellation & termination",
    content: (
      <>
        <p>
          If a client wishes to cancel a project after work has commenced,
          they must notify The Boredom Project in writing.
        </p>
        <p>
          The client remains responsible for payment for work completed
          and approved costs or commitments incurred up to the cancellation
          date.
        </p>
        <p>
          Any refund of amounts already paid will be assessed against the
          work completed, amounts owed and applicable Australian Consumer
          Law requirements.
        </p>
        <p>
          The Boredom Project may pause or terminate a project where agreed
          payments are overdue or the client fails to provide information
          reasonably required to progress the project, following reasonable
          written notice.
        </p>
      </>
    ),
  },
  {
    title: "16. Acceptance of terms",
    content: (
      <p>
        By approving a project proposal, accepting a quote or making payment
        towards a website project, the client acknowledges that they have
        read, understood and agreed to these terms and conditions.
        The individual project proposal and these terms together form the
        agreement between the client and The Boredom Project Studio.
      </p>
    ),
  },
];

export default function Terms() {
  return (
    <>
      <PageMeta
        title="Website Terms & Conditions | The Boredom Project"
        description="Website development terms and conditions for custom-coded, one-off websites by The Boredom Project Studio."
      />

      <main className="terms-page">
        <section className="terms-hero">
          <span className="section-tag">[ THE FINE PRINT ]</span>
          <h1>
            TERMS &
            <br />
            <span>CONDITIONS.</span>
          </h1>
          <div className="terms-lede">
            <p>
              Good websites. Clear expectations. No funny business. Here's
              everything you need to know about working with The Boredom Project.
            </p>
            <span className="asterisk">✳</span>
          </div>
        </section>

        <section className="terms-layout">
          <aside className="terms-nav">
            <span className="mini-label">ON THIS PAGE</span>
            <nav aria-label="Terms and conditions sections">
              {sections.map((section, index) => (
                <a key={section.title} href={`#terms-${index + 1}`}>
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <div className="terms-content">
            <div className="terms-intro">
              <span className="mini-label">BEFORE WE GET STARTED</span>
              <p>
                Every project is a one-off website build. You own your domain,
                your Cloudflare account and your completed website code. No
                compulsory subscriptions, no lock-in.
              </p>
              <p>
                These terms explain how the process works and where the project ends.
              </p>
            </div>

            {sections.map((section, index) => (
              <section
                className="terms-section"
                id={`terms-${index + 1}`}
                key={section.title}
              >
                <h2>{section.title}</h2>
                <div className="terms-section-copy">{section.content}</div>
              </section>
            ))}

            <div className="terms-contact">
              <span className="mini-label">STILL HAVE QUESTIONS?</span>
              <h2>LET'S TALK.</h2>
              <a
                href="mailto:hello@theboredomproject.studio?subject=Website%20Terms%20Enquiry"
                className="button-dark"
              >
                GET IN TOUCH <Arrow />
              </a>
            </div>
          </div>
        </section>

        <p className="terms-updated">LAST UPDATED: NOVEMBER 2026</p>
      </main>

      <Footer />
    </>
  );
}
