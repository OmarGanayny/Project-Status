import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import desiroImage from "./assets/First Desiro.webp";
import vectronImage from "./assets/First Vectron.webp";
import depotImage from "./assets/Main Depot.webp";
import ocsImage from "./assets/OCS Pole Erection.jpg";
import trackLayingImage from "./assets/Track Laying in progress.jpg";
import velaroImage from "./assets/Velaro-EGY-exterior-1-1536x1024.jpg";
import LMS from "./assets/LMS Photo.png";
import Aconex from "./assets/Oracle-text-transparent.png";
type IconName =
  | "home"
  | "folder"
  | "chart"
  | "book"
  | "layers"
  | "search"
  | "bell"
  | "help"
  | "arrow"
  | "users"
  | "menu"
  | "close"
  | "external"
  | "train"
  | "building"
  | "contact"
  | "mail";

const iconPaths: Record<IconName, ReactNode> = {
  home: (
    <>
      <path d="m3 11 9-8 9 8" />
      <path d="M5.5 9.5V21h13V9.5M9.5 21v-7h5v7" />
    </>
  ),
  folder: <path d="M3 6.5h7l2 2h9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-12Z" />,
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  book: (
    <>
      <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22V5.5Z" />
      <path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22V5.5Z" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" />
      <path d="M10 21h4" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.7 9a2.4 2.4 0 1 1 3.5 2.1c-.9.5-1.2 1-1.2 2M12 17h.01" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14M14 7l5 5-5 5" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  external: (
    <>
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
    </>
  ),
  train: (
    <>
      <rect x="5" y="3" width="14" height="16" rx="4" />
      <path d="M8 7h8M5 13h14M8 22l2-3M16 22l-2-3" />
      <circle cx="9" cy="16" r="1" fill="currentColor" />
      <circle cx="15" cy="16" r="1" fill="currentColor" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5h10v16M14 10h6v11M8 9h2M8 13h2M8 17h2M17 14h1M17 17h1M2 21h20" />
    </>
  ),
  contact: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2.5" />
      <path d="M5.5 17c.6-2 2-3 3.5-3s2.9 1 3.5 3M15 9h3M15 13h3" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}

const resources: { title: string; text: string; icon: IconName; image?: string; href?: string }[] = [
  {
    title: "Consortium SharePoint",
    text: "Access the shared consortium collaboration workspace.",
    icon: "users",
    href: "https://siemensapc.sharepoint.com/teams/HSRSOA",
  },
  {
    title: "Project Data Structure (PDS)",
    text: "Browse the approved PDS and filing structure.",
    icon: "layers",
    href: "https://eu1.aconex.com/ViewDoc?trackingid=214483932257085761&projectid=671089173&cversion=1&tab=0",
  },
  {
    title: "File Storage Guide",
    text: "Find the right location for every project document.",
    icon: "folder",
    href: "https://wiki.siemens.com/pages/viewpage.action?pageId=517061397",
  },
  {
    title: "Project Information",
    text: "Key facts, governance and programme information.",
    icon: "book",
    href: "https://siemens.sharepoint.com/teams/EgyptHighSpeedProject732/SitePages/Onboarding.aspx",
  },
  {
    title: "Organization Chart",
    text: "Explore teams, workstreams and reporting lines.",
    icon: "building",
    href: "https://wiki.siemens.com/spaces/en/pages/722164763/Egypt+High+Speed+Rail+OC-HSR#",
  },
  {
    title: "Workstream Contacts",
    text: "Find the right contact across the programme.",
    icon: "contact",
    href: "https://siemens.sharepoint.com/teams/EgyptHighSpeedProject732/Lists/Process%20Overview/AllItems.aspx",
  },
  {
    title: "Stakeholder Directory",
    text: "Find key project stakeholders and their roles.",
    icon: "users",
    href: "https://siemens.sharepoint.com/teams/EgyptHighSpeedProject732/Lists/EHSRStakeholder%20Directory/AllItems.aspx?origin=createList&viewid=e9699a7a-bcb1-4a59-a407-f03233aa2b87&useFiltersInViewXml=1",
  },
  {
    title: "Oracle Aconex",
    text: "Open the project document management workspace.",
    icon: "layers",
    image: Aconex,
    href: "https://eu1.aconex.com/hub/index.html",
  },
  {
    title: "Aconex User Guide",
    text: "Review guidance for using Oracle Aconex.",
    icon: "book",
    image: Aconex,
    href:"https://eu1.aconex.com/hub/index.html?mainTarget=%2FSearchControlledDoc%3FSEARCH_ACTION%3D15%26tab%3D0%26searchMode%3D1%26searchQuery%3Dtrackingid%253A214483932257110793%2Bcversion%253A1%26singleMatchBehaviour%3DSHOW_SEARCH_RESULTS_ANYWAY%26showDocHistory%3D&MENU_TARGET=DOC-SUPERSEARCH&SEARCH_TYPE=SEARCH_TYPE_DOCS&ID=671089173&searchQuery=trackingid%3A214483932257110793+cversion%3A1&singleMatchBehaviour=SHOW_SEARCH_RESULTS_ANYWAY&showDocHistory=&tab=0",
  },
  {
    title: "LMS Web Application",
    text: "Open the learning management system.",
    icon: "external",
    image: LMS,
    href:"https://auth.insite-lms.com/account/login?ReturnUrl=%2Fopenid10%3Fresponse_type%3Dcode%26client_id%3D238fe9357e9c4883b4d2cd362519879b%26state%3DbTVOYjRHY0VlZmUyS0k1Wi50enVyVU9yVHJYM3RFZC5PTDFnWHRFZ1RTN185%26redirect_uri%3Dhttps%253A%252F%252Fweb.insitelms.net%26scope%3Dopenid%2520offline_access%2520profile%2520tenant%2520customer_name%2520customer_picture%2520version%2520com%2520man%2520pac%2520wtm%2520ttg%2520tse%2520pur%2520pro%2520sub%2520con%2520inst%2520acc%2520too%2520imp%2520rep%2520prd%2520usr%2520mai%2520plan%2520hse%26code_challenge%3DauFuZ9Ah234detijmN0fdKUPUPrlPdF3EjUUwCcMrhE%26code_challenge_method%3DS256%26resource%3D238fe9357e9c4883b4d2cd362519879b%26nonce%3DbTVOYjRHY0VlZmUyS0k1Wi50enVyVU9yVHJYM3RFZC5PTDFnWHRFZ1RTN185%26colorTheme%3DSystemDefault%26showStatusBadge%3Dtrue",
  },
  {
    title: "LMS User Guide",
    text: "Review guidance for using the LMS.",
    icon: "book",
    image: LMS,
    href: "https://wiki.siemens.com/spaces/OPMINF/pages/541672049/Insite+LMS+IPT-LMS",
  },
  {
    title: "Lessons Learnt",
    text: "Browse lessons and knowledge captured from the project.",
    icon: "book",
    href: "https://siemensapc.sharepoint.com/teams/HSREgypt-LessonLearntPortal/_layouts/15/AccessDenied.aspx?Source=https%3A%2F%2Fsiemensapc.sharepoint.com%2Fteams%2FHSREgypt-LessonLearntPortal%2FSitePages%2FEventPlanHome.aspx%3Fweb%3D1%26clickparams%3DeyAiWC1BcHBOYW1lIiA6ICJNaWNyb3NvZnQgT3V0bG9vayIsICJYLUFwcFZlcnNpb24iIDogIjE2LjAuMTg5MjUuMjAyMTYiLCAiT1MiIDogIldpbmRvd3MiIH0%253d%26CID%3D170ed4a1-70dd-3000-0106-5f3293c93a6f%26cidOR%3DSPO&correlation=791c4fa2-00db-3000-0cd7-472c0c9a3102&Type=item&name=3c2c79ef-350a-4f6d-914b-8aedb0a98fa0&listItemId=7&listItemUniqueId=02185126-42ea-43ae-8b14-c90b2cfb4b61&allowautoredirecttosource=true",
  },
];

const gallery = [
  {
    title: "First Velaro Train",
    type: "Rolling stock",
    image: velaroImage,
  },
    {
    title: "First Desiro",
    type: "Rolling stock",
    image: desiroImage,
  },
    {
    title: "First Vectron",
    type: "Rolling stock",
    image: vectronImage,
  },
  {
    title: "Main Depot",
    type: "Infrastructure",
    image: depotImage,
  },
  {
    title: "Track Laying In Progress",
    type: "Construction",
    image: trackLayingImage,
  },
  {
    title: "OCS Installation",
    type: "Infrastructure",
    image: ocsImage,
  }


];

type ResponsibleContact = {
  initials: string;
  name: string;
  email: string;
  role: string;
};

const responsibleContacts: ResponsibleContact[] = [
  {
    initials: "FE",
    name: "Farah Eissa",
    email: "farah.eissa@siemens.com",
    role: "Senior Information Management Specialist",
  },
  {
    initials: "ME",
    name: "Mariam Elkhatib",
    email: "mariam.elkhatib@siemens.com",
    role: "Project Information Engineer",
  },
];

function ResponsibleContactCard({ contact }: { contact: ResponsibleContact }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const flyoutRef = useRef<HTMLDivElement>(null);
  const photoUrl = `https://siemens.sharepoint.com/_layouts/15/userphoto.aspx?size=M&accountname=${encodeURIComponent(contact.email)}`;

  useLayoutEffect(() => {
    if (!isOpen) return;

    const positionFlyout = () => {
      const card = cardRef.current;
      const flyout = flyoutRef.current;
      if (!card || !flyout) return;

      const cardBounds = card.getBoundingClientRect();
      const flyoutBounds = flyout.getBoundingClientRect();
      const margin = 12;
      const aboveCard = cardBounds.top - flyoutBounds.height - margin;
      const top = aboveCard >= margin
        ? aboveCard
        : Math.max(margin, window.innerHeight - flyoutBounds.height - margin);
      const left = window.innerWidth <= 520
        ? margin
        : Math.min(cardBounds.left, window.innerWidth - flyoutBounds.width - margin);

      setPosition({ top, left: Math.max(margin, left) });
    };

    const frame = window.requestAnimationFrame(positionFlyout);
    window.addEventListener("resize", positionFlyout);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", positionFlyout);
    };
  }, [isOpen]);

  return (
    <div
      className={`contact-profile ${isOpen ? "open" : ""}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocusCapture={() => setIsOpen(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsOpen(false);
        }
      }}
    >
      <div ref={cardRef} className="contact-card">
        <button
          className="contact-card-trigger"
          type="button"
          aria-expanded={isOpen}
          aria-controls={`contact-flyout-${contact.initials}`}
          onClick={() => setIsOpen(true)}
        >
          <div className="contact-avatar">
            {contact.initials}
            <img
              src={photoUrl}
              alt=""
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>
          <span className="contact-card-details">
            <strong>{contact.name}</strong>
            <small>{contact.role}</small>
          </span>
        </button>
        <div className="contact-card-actions">
          <a href={`mailto:${contact.email}`} aria-label={`Email ${contact.name}`}>
            <Icon name="mail" size={16} />
          </a>
          <a
            href={`https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(contact.email)}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`Chat with ${contact.name} on Teams`}
          >
            <Icon name="users" size={16} />
          </a>
        </div>
      </div>
      <div
        ref={flyoutRef}
        className="contact-flyout"
        id={`contact-flyout-${contact.initials}`}
        role="region"
        aria-label={`${contact.name} contact details`}
        style={position ?? undefined}
      >
        <div className="contact-flyout-heading">
          <div className="contact-avatar">
            {contact.initials}
            <img
              src={photoUrl}
              alt=""
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div>
            <strong>{contact.name}</strong>
            <small>{contact.role}</small>
          </div>
          <button
            className="contact-flyout-close"
            type="button"
            aria-label={`Close ${contact.name} contact details`}
            onClick={() => setIsOpen(false)}
          >
            <Icon name="close" size={17} />
          </button>
        </div>
        <a className="contact-email" href={`mailto:${contact.email}`}>
          <Icon name="mail" size={16} />
          {contact.email}
        </a>
        <div className="contact-actions">
          <a href={`mailto:${contact.email}`}>
            <Icon name="mail" size={17} /> Email
          </a>
          <a
            href={`https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(contact.email)}`}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="users" size={17} /> Chat on Teams
          </a>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [toast, setToast] = useState("");

  return (
    <div className="shell">
      <main className="main">
        <div className="page">
          <div className="page-label">
            <span className="siemens-word">SIEMENS</span>
            <i />
            <span>Egypt HSR</span>
          </div>

          <section className="home-hero">
            <div className="hero-copy">
              {/* <div className="hero-kicker">
                <Icon name="home" size={15} />
                SIEMENS MOBILITY · COLLABORATION HUB
              </div> */}
              <h1>
                Egypt HSR internal
                <br />
                SMO Collaboration
              </h1>
              <p>
                One place to access project information, shared resources, programme contacts and
                the latest developments from Egypt&apos;s High Speed Rail network.
              </p>
            </div>
              </section>

              <section className="intro-section">
            <div>
              <p className="section-kicker">WELCOME TO THE PROGRAMME</p>
              <h2>
                Egypt High Speed Rail
                <br />
                (HSR) Project
              </h2>
            </div>
            <div className="intro-copy">
              <p>
                The state-of-the-art High-Speed Rail network, spanning 2,000 km, will connect the
                country&apos;s economic and development hotspots. Three lines will link the Red Sea
                to the Mediterranean, Greater Cairo to Abu Simbel, and Luxor to Hurghada and Safaga.
              </p>
              <a
                className="discover-project-link"
                href="https://siemens.sharepoint.com/teams/EgyptHighSpeedProject732/SitePages/Reporting.aspx"
              >
                Discover the project <Icon name="arrow" size={16} />
              </a>
                
            </div>
              </section>

              <section className="gallery-section">
            <div className="section-heading">
              <div>
                <p className="section-kicker">PROJECT HIGHLIGHTS</p>
                <h2>Building the future of mobility</h2>
              </div>
              <span>Latest project views</span>
            </div>
            <div className="gallery-grid">
              {gallery.map((item) => (
                <article key={item.title}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <small>{item.type}</small>
                    <h3>{item.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="resources-section" aria-label="Quick access">
            <div className="section-heading">
              <div>
                <p className="section-kicker">QUICK ACCESS</p>
                <h2>Project resources</h2>
              </div>
            </div>
              <div className="resource-grid">
                {resources.map((resource) => {
                  const content = (
                    <>
                      {resource.image ? (
                        <span className="resource-logo">
                          <img src={resource.image} alt="" />
                        </span>
                      ) : (
                        <span className="resource-icon">
                          <Icon name={resource.icon} size={20} />
                        </span>
                      )}
                      <span>
                        <strong>{resource.title}</strong>
                        <small>{resource.text}</small>
                      </span>
                      <Icon name="arrow" size={16} />
                    </>
                  );

                  return resource.href ? (
                    <a
                      key={resource.title}
                      href={resource.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {content}
                    </a>
                  ) : (
                    <button
                      key={resource.title}
                      type="button"
                      onClick={() => setToast(`No link is configured for ${resource.title}.`)}
                    >
                      {content}
                    </button>
                  );
                })}
              </div>
          </section>

          <section className="responsible-contacts-section">
            <div className="responsible-contacts-heading">
              <p className="section-kicker">RESPONSIBLE CONTACTS</p>
              <h2>Responsible contacts</h2>
              <p>Get in touch with the right owner for your dashboard or report.</p>
            </div>
            <div className="responsible-contacts-grid">
              {responsibleContacts.map((contact) => (
                <ResponsibleContactCard key={contact.email} contact={contact} />
              ))}
            </div>
          </section>

        </div>
      </main>

      {toast && (
        <div className="toast">
          <Icon name="external" size={17} />
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;
