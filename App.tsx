import { useEffect, useMemo, useState } from "react"

type IconName = "arrow" | "book" | "chevron" | "dashboard" | "external" | "file" | "grid" | "help" | "home" | "menu" | "people" | "powerbi" | "search"

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
        <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z" />
      </>
    ),
    chevron: <path d="m8 10 4 4 4-4" />,
    dashboard: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    external: (
      <>
        <path d="M15 3h6v6M10 14 21 3" />
        <path d="M18 13v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h7" />
      </>
    ),
    file: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M8 13h8M8 17h6" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.7 9a2.5 2.5 0 1 1 3.4 2.3c-.8.4-1.1.9-1.1 1.7M12 17h.01" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v11h14V10M9 21v-7h6v7" />
      </>
    ),
    menu: (
      <>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </>
    ),
    people: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
      </>
    ),
    powerbi: (
      <>
        <rect x="4" y="12" width="3.5" height="8" rx=".7" fill="currentColor" stroke="none" />
        <rect x="8.7" y="8" width="3.5" height="12" rx=".7" fill="currentColor" stroke="none" />
        <rect x="13.4" y="4" width="3.5" height="16" rx=".7" fill="currentColor" stroke="none" />
        <rect x="18.1" y="2" width="2.4" height="18" rx=".7" fill="currentColor" stroke="none" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

const groups = [
  {
    title: "Site dashboards",
    accent: "site",
    items: [
      ["Overall GL Status Dashboard", "REP"],
      ["Access and Installation Progress for Alignment, Depot and SPT1", "REP"],
      ["Detailed Installation Progress Tracking", "INF"],
      ["Deviation Management Dashboard", ""],
      ["Trackwork Installation Status Dashboard", ""],
      ["OCS Installation Status Dashboard", ""],
    ],
  },
  {
    title: "Lots dashboards",
    accent: "lots",
    items: [
      ["REL Overall Status Dashboard", "REP"],
      ["AFC Overall Status Dashboard", "REP"],
      ["DWE Overall Status Dashboard", "REP"],
    ],
  },
  {
    title: "Other dashboards",
    accent: "other",
    items: [
      ["EV Dashboard", "REP"],
      ["EHS Statistics", ""],
      ["Training Documentation Dashboard", "REP"],
    ],
  },
  {
    title: "Testing & commissioning",
    accent: "testing",
    items: [
      ["T&C Requirements Dashboard", "REP"],
      ["SIT T&C Dashboard", "REP"],
    ],
  },
]

const contacts = [
  {
    initials: "AZ",
    name: "Abdelrahman Zaki",
    role: "Head of Reporting and Insights",
    scope: "PMO · REP Dashboards · MPR · Internal Status",
  },
  {
    initials: "FE",
    name: "Farah Eissa",
    role: "Senior Information Manager",
    scope: "PMO · INF Dashboards",
  },
  {
    initials: "OS",
    name: "Olivia Shokrallah",
    role: "SMO TK EG EPC PI",
    scope: "SIT · Weekly P2 Site Report",
  },
  {
    initials: "AA",
    name: "Ahmed Abdullatif",
    role: "SMO TK EG EHS",
    scope: "EHS · Dashboards",
  },
]

const nav = [
  { label: "Overview", icon: "home", id: "overview" },
  { label: "Project status", icon: "dashboard", id: "project-status" },
  { label: "FAQ & support", icon: "help", id: "faq-support" },
] as const

export default function App() {
  const [search, setSearch] = useState("")
  const [active, setActive] = useState("All")
  const [activeSection, setActiveSection] = useState("overview")
  const [mobileNav, setMobileNav] = useState(false)

  const filtered = useMemo(
    () =>
      groups
        .filter((group) => active === "All" || group.title === active)
        .map((group) => ({
          ...group,
          items: group.items.filter(([name]) =>
            name.toLowerCase().includes(search.toLowerCase()),
          ),
        }))
        .filter((group) => group.items.length),
    [active, search],
  )

  useEffect(() => {
    const sections = nav
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: "-18% 0px -55% 0px", threshold: [0, 0.15, 0.35] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Siemens Egypt HSR home">
          <span className="brand-word">SIEMENS</span>
          <span className="brand-divider" />
          <span className="brand-project">Egypt HSR</span>
        </a>
        <div className="top-actions">
          <label className="global-search">
            <Icon name="search" size={18} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search dashboards and reports"
            />
            <kbd>⌘ K</kbd>
          </label>
          <button className="icon-button" aria-label="Help">
            <Icon name="help" />
          </button>
          <button className="avatar" aria-label="Open profile">
            OM
          </button>
        </div>
      </header>

      <div className="layout">
        <aside className={mobileNav ? "sidebar is-open" : "sidebar"}>
          <div className="sidebar-title">SMO Collaboration</div>
          <nav>
            {nav.map(({ label, icon, id }) => (
              <a
                key={label}
                className={activeSection === id ? "active" : ""}
                href={`#${id}`}
                aria-current={activeSection === id ? "location" : undefined}
                onClick={() => {
                  setActiveSection(id)
                  setMobileNav(false)
                }}
              >
                <Icon name={icon} size={19} />
                {label}
              </a>
            ))}
          </nav>
          <div className="support-card">
            <span className="support-icon">
              <Icon name="help" size={19} />
            </span>
            <strong>Need support?</strong>
            <p>
              Contact the SharePoint support team for access or technical help.
            </p>
            <a href="#support">
              Get support <Icon name="arrow" size={15} />
            </a>
          </div>
        </aside>

        <main>
          <button
            className="mobile-menu"
            onClick={() => setMobileNav(!mobileNav)}
            aria-label="Toggle navigation"
          >
            <Icon name="menu" />
          </button>
          <section className="hero" id="overview">
            <div className="breadcrumbs">
              Egypt HSR <span>/</span> Project reporting
            </div>
            <div className="hero-content">
              <div>
                <div className="hero-identity">
                  <Icon name="dashboard" size={17} />
                  <span>SIEMENS MOBILITY · DASHBOARD HUB</span>
                </div>
                <h1>Project status & reporting</h1>
                <p>Egypt High Speed Rail — one place to access live project dashboards, progress reports and reporting contacts.</p>
              </div>
              <div className="hero-dashboard-mark" aria-hidden="true">
                <div className="hero-dashboard-title">
                  <Icon name="powerbi" size={18} />
                  <span>PROJECT OVERVIEW</span>
                </div>
                <div className="hero-chart">
                  <i /><i /><i /><i /><i />
                </div>
                <div className="hero-metrics"><span>STATUS</span><b>Live</b></div>
              </div>
            </div>
            <a className="photo-credit" href="https://unsplash.com/@kaden_t" target="_blank" rel="noreferrer">Photo: Kaden Taylor / Unsplash</a>
          </section>

          <section className="quick-grid" aria-label="Quick access">
            <a className="quick-card featured" href="#pib">
              <span className="quick-icon">
                <Icon name="grid" />
              </span>
              <div>
                <small>PROJECT INSIGHTS</small>
                <strong>PIB – Project Insight Board</strong>
                <p>Central view of current project performance.</p>
              </div>
              <Icon name="external" size={18} />
            </a>
            <a className="quick-card" href="#mpr">
              <span className="quick-icon">
                <Icon name="file" />
              </span>
              <div>
                <small>MONTHLY</small>
                <strong>Monthly Progress Report</strong>
                <p>Reporting strategy, process and matrix.</p>
              </div>
              <Icon name="arrow" size={18} />
            </a>
            <a className="quick-card" href="#internal">
              <span className="quick-icon">
                <Icon name="dashboard" />
              </span>
              <div>
                <small>INTERNAL</small>
                <strong>Internal Status Report</strong>
                <p>Design, interfaces and requirements progress.</p>
              </div>
              <Icon name="arrow" size={18} />
            </a>
            <a className="quick-card" href="#weekly">
              <span className="quick-icon">
                <Icon name="book" />
              </span>
              <div>
                <small>WEEKLY</small>
                <strong>P2 Site Work Progress</strong>
                <p>Weekly progress for Package 02 site works.</p>
              </div>
              <Icon name="arrow" size={18} />
            </a>
          </section>

          <section className="dashboard-section" id="project-status">
            <div className="section-heading">
              <div>
                <span className="eyebrow dark">POWER BI REPORTING LIBRARY</span>
                <h2>Project dashboards & reports</h2>
                <p>Open live Power BI dashboards and project reports by workstream.</p>
              </div>
              <span className="result-count">
                {filtered.reduce((sum, group) => sum + group.items.length, 0)}{" "}
                resources
              </span>
            </div>
            <div className="filter-row">
              {["All", ...groups.map((group) => group.title)].map((label) => (
                <button
                  key={label}
                  className={active === label ? "filter active" : "filter"}
                  onClick={() => setActive(label)}
                >
                  {label}
                </button>
              ))}
            </div>
            {filtered.length ? (
              <div className="report-grid">
                {filtered.flatMap((group) =>
                  group.items.map(([name, tag]) => (
                    <a className={`report-card ${group.accent}`} href="#" key={name}>
                      <div className="report-card-top">
                        <span className="powerbi-mark">
                          <Icon name="powerbi" size={21} />
                        </span>
                        <span className="category-label">{group.title}</span>
                        {tag && <em>{tag}</em>}
                      </div>
                      <div className="report-card-title">
                        <small>POWER BI DASHBOARD</small>
                        <h3>{name}</h3>
                      </div>
                      <div className="report-card-action">
                        <span>Open dashboard</span>
                        <Icon name="external" size={15} />
                      </div>
                    </a>
                  )),
                )}
              </div>
            ) : (
              <div className="empty-state">
                <Icon name="search" size={30} />
                <h3>No reports found</h3>
                <p>Try a different search term or category.</p>
              </div>
            )}
          </section>

          <section className="faq-strip" id="faq-support">
            <div>
              <span className="eyebrow dark">KNOWLEDGE BASE</span>
              <h2>Answers when you need them</h2>
            </div>
            <a href="#aconex">
              <Icon name="help" />
              <span>
                <strong>Aconex FAQ</strong>
                <small>Common workflows and support</small>
              </span>
              <Icon name="arrow" />
            </a>
            <a href="#lms">
              <Icon name="help" />
              <span>
                <strong>LMS FAQ</strong>
                <small>Learning platform guidance</small>
              </span>
              <Icon name="arrow" />
            </a>
            <a href="#guide">
              <Icon name="book" />
              <span>
                <strong>PIB User Guide</strong>
                <small>Get started with Project Insight Board</small>
              </span>
              <Icon name="arrow" />
            </a>
          </section>

          <section className="contacts-section" id="support">
            <div className="section-heading">
              <div>
                <span className="eyebrow dark">REPORTING TEAM</span>
                <h2>Responsible contacts</h2>
                <p>
                  Get in touch with the right owner for your dashboard or
                  report.
                </p>
              </div>
            </div>
            <div className="contact-grid">
              {contacts.map((contact, index) => (
                <article className="contact-card" key={contact.name}>
                  <span className={`contact-avatar avatar-${index + 1}`}>
                    {contact.initials}
                  </span>
                  <div>
                    <h3>{contact.name}</h3>
                    <p>{contact.role}</p>
                    <small>{contact.scope}</small>
                  </div>
                  <a
                    href={`mailto:${contact.name.toLowerCase().replaceAll(" ", ".")}@siemens.com`}
                    aria-label={`Email ${contact.name}`}
                  >
                    <Icon name="arrow" size={17} />
                  </a>
                </article>
              ))}
            </div>
          </section>

          <footer>
            <span className="brand-word">SIEMENS</span>
            <p>Egypt High Speed Rail · Internal SMO Collaboration</p>
            <nav>
              <a href="#">Corporate information</a>
              <a href="#">Privacy notice</a>
              <a href="#">Site owner duties</a>
            </nav>
          </footer>
        </main>
      </div>
    </div>
  )
}
