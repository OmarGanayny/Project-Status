import { useMemo, useState } from "react"
import type { ReactNode } from "react"

type IconName = "arrow" | "book" | "chevron" | "clock" | "dashboard" | "external" | "file" | "grid" | "help" | "home" | "menu" | "people" | "powerbi" | "search"

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
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
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
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

type DashboardItem = { key: string; name: string; tag: string; href: string }

const groups: { title: string; accent: string; items: DashboardItem[] }[] = [
  {
    title: "Site dashboards",
    accent: "site",
    items: [
      { key: "access-installation-progress", name: "Access and Installation Progress for Alignment, Depot and SPT1", tag: "REP", href: "https://app.powerbi.com/reportEmbed?reportId=c05d7055-661c-4433-8b91-723e49ab897f&autoAuth=true&ctid=38ae3bcd-9579-4fd4-adda-b42e1495d55a" },
      { key: "detailed-installation-progress", name: "Detailed Installation Progress Tracking", tag: "INF", href: "https://app.powerbi.com/reportEmbed?reportId=289a0ad0-37f6-4c1a-bf41-9af14f8c9492&autoAuth=true&ctid=38ae3bcd-9579-4fd4-adda-b42e1495d55a" },
      //{ key: "lms-activity-report", name: "LMS Activity Report", tag: "INF", href: "https://app.powerbi.com/reportEmbed?reportId=cc1415d4-53f7-4227-98d4-6eef016ec3bf&autoAuth=true&ctid=38ae3bcd-9579-4fd4-adda-b42e1495d55a" },
      { key: "deviation-management", name: "Deviation Management Dashboard", tag: "", href: "https://app.powerbi.com/links/4Xwg--hjWr?ctid=38ae3bcd-9579-4fd4-adda-b42e1495d55a&chromeless=1&pbi_source=linkShare" },
      //{ key: "ftr-documentation", name: "FTR Documentation Dashboard", tag: "REP", href: "https://app.powerbi.com/links/QN1a2tKUGX?ctid=38ae3bcd-9579-4fd4-adda-b42e1495d55a&chromeless=1&pbi_source=linkShare" },
      { key: "trackwork-installation-status", name: "Trackwork Installation Status Dashboard", tag: "", href: "https://app.powerbi.com/reportEmbed?reportId=c6c6bfb1-031c-45ac-a709-dcf0dcef30e0&autoAuth=true&ctid=38ae3bcd-9579-4fd4-adda-b42e1495d55a" },
      { key: "ocs-installation-status", name: "OCS Installation Status Dashboard", tag: "", href: "https://app.powerbi.com/reportEmbed?reportId=50075fe4-3888-46e0-bda7-8326432ad483&autoAuth=true&ctid=38ae3bcd-9579-4fd4-adda-b42e1495d55a" },
    ],
  },
  {
    title: "Lots dashboards",
    accent: "lots",
    items: [
      { key: "rel-overall-status", name: "REL Overall Status Dashboard", tag: "REP", href: "https://app.powerbi.com/reportEmbed?reportId=089058bd-726b-4e26-94f3-8447e5f42159&autoAuth=true&ctid=38ae3bcd-9579-4fd4-adda-b42e1495d55a" },
      { key: "afc-overall-status", name: "AFC Overall Status Dashboard", tag: "REP", href: "https://app.powerbi.com/reportEmbed?reportId=04669a55-56ec-444c-a464-c64d6a7ff25a&autoAuth=true&ctid=38ae3bcd-9579-4fd4-adda-b42e1495d55a" },
      { key: "dwe-overall-status", name: "DWE Overall Status Dashboard", tag: "REP", href: "https://app.powerbi.com/links/GmzRIe-nqL?ctid=38ae3bcd-9579-4fd4-adda-b42e1495d55a&chromeless=1&pbi_source=linkShare" },
    ],
  },
  {
    title: "Other dashboards",
    accent: "other",
    items: [
      { key: "ev-dashboard", name: "EV Dashboard", tag: "REP", href: "https://app.powerbi.com/reportEmbed?reportId=cfd638cd-0857-40b9-9593-e243e8f5682e&autoAuth=true&ctid=38ae3bcd-9579-4fd4-adda-b42e1495d55a" },
      { key: "ehs-statistics", name: "EHS Statistics", tag: "", href: "https://app.powerbi.com/reportEmbed?reportId=552e2a8f-6b42-4457-a318-158241953a3f&autoAuth=true&ctid=38ae3bcd-9579-4fd4-adda-b42e1495d55a" },
      { key: "training-documentation", name: "Training Documentation Dashboard", tag: "REP", href: "https://app.powerbi.com/reportEmbed?reportId=f9cc7a9e-6ff4-4930-8444-cf2646554d57&autoAuth=true&ctid=38ae3bcd-9579-4fd4-adda-b42e1495d55a" },
    ],
  },
  {
    title: "Testing & commissioning",
    accent: "testing",
    items: [
      { key: "tc-requirements", name: "T&C Requirements Dashboard", tag: "REP", href: "https://app.powerbi.com/reportEmbed?reportId=50de24d1-9121-44b9-95ce-b9b7b45aa424&autoAuth=true&ctid=38ae3bcd-9579-4fd4-adda-b42e1495d55a" },
      { key: "sit-tc", name: "SIT T&C Dashboard", tag: "REP", href: "https://app.powerbi.com/reportEmbed?reportId=82957ba2-ddd7-497e-9e0c-5adaba60640c&autoAuth=true&ctid=38ae3bcd-9579-4fd4-adda-b42e1495d55a" },
    ],
  },
]

const contacts = [
  {
    initials: "AZ",
    name: "Reen Aguib",
    email: "reen.aguib@siemens.com",
    role: "Reporting Engineer",
    scope: "PMO · REP Dashboards · MPR · Internal Status",
  },
  {
    initials: "FE",
    name: "Farah Eissa",
    email: "farah.eissa@siemens.com",
    role: "Senior Information Manager",
    scope: "PMO · INF Dashboards",
  },
  {
    initials: "OS",
    name: "Mariam Elkhatib",
    email: "mariam.elkhatib@siemens.com",
    role: "Information Engineer",
    scope: "SIT · Weekly P2 Site Report",
  },
  {
    initials: "AA",
    name: "Ahmed Abdullatif",
    email: "ahmed.abdullatif@siemens.com",
    role: "SMO TK EG EHS",
    scope: "EHS · Dashboards",
  },
]

const profilePhotoUrl = (email: string) =>
  `https://siemens.sharepoint.com/_layouts/15/userphoto.aspx?${new URLSearchParams({ size: "M", accountname: email })}`

export default function App() {
  const [search, setSearch] = useState("")
  const [active, setActive] = useState("All")

  const filtered = useMemo(
    () =>
      groups
        .filter((group) => active === "All" || group.title === active)
        .map((group) => ({
          ...group,
          items: group.items.filter(({ name }) =>
            name.toLowerCase().includes(search.toLowerCase()),
          ),
        }))
        .filter((group) => group.items.length),
    [active, search],
  )

  return (
    <div className="projectStatusRoot">
      <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="https://siemens.sharepoint.com/teams/EgyptHighSpeedProject732" aria-label="Siemens Egypt HSR home">
          <span className="brand-word">SIEMENS</span>
          <span className="brand-divider" />
          <span className="brand-project">Egypt HSR</span>
        </a>
       
      </header>

      <div className="layout">
        <main>
          <section className="hero" id="overview">
           
            <div className="hero-content">
              <div>
                <div className="hero-identity">
                  <Icon name="dashboard" size={17} />
                  <span>SIEMENS MOBILITY · DASHBOARD HUB</span>
                </div>
                <h1>Project status & reporting</h1>
                <p>Egypt High Speed Rail one place to access live project dashboards, progress reports and reporting contacts.</p>
              </div>
            </div>
            {/* <a className="photo-credit" href="https://unsplash.com/@kaden_t" target="_blank" rel="noreferrer">Photo: Kaden Taylor / Unsplash</a> */}
          </section>

          <section className="quick-grid" aria-label="Quick access">
            <div className="quick-card featured">
              <span className="quick-icon">
                <Icon name="grid" />
              </span>
              <div>
                <small>PROJECT INSIGHTS</small>
                <a href="https://pib.siemens.com/index.html" target="_blank" rel="noreferrer">
                  <strong>PIB – Project Insight Board</strong>
                </a>
                <p>Central view of current project performance.</p>
                <a className="quick-card-access" href="https://forms.office.com/pages/responsepage.aspx?id=zTuuOHmV1E-t2rQuFJXVWoLXfJLiFGBCughyzFVWKmZUQkUzWTlVTTU2WURROTNPMlhYWEI0WFBMQS4u" target="_blank" rel="noreferrer">
                  Request access
                </a>
              </div>
              <Icon name="external" size={18} />
            </div>
            <a className="quick-card" href="https://siemens.sharepoint.com/teams/EGYHSR-MonthlyProgressReport/SitePages/Home.aspx" target="_blank" rel="noreferrer">
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
            <a className="quick-card" href="https://siemens.sharepoint.com/teams/EgyptHighSpeedProject732/Shared%20Documents/Forms/AllItems.aspx?csf=1&web=1&e=yvTLM8&CID=7584ad2a%2D6ba5%2D471b%2D954f%2Ddc30ee1aff01&FolderCTID=0x012000F47A6FBB1870684E8FA41BE82DE047AD&id=%2Fteams%2FEgyptHighSpeedProject732%2FShared%20Documents%2FGeneral%2F02%5FProject%20Management%2FOPM%2DREP%2F01%5FMonthly%20Project%20Status%20Report%20%28internal%29" target="_blank" rel="noreferrer">
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
            <a className="quick-card" href="https://siemens.sharepoint.com/teams/EgyptHighSpeedProject732/Shared%20Documents/Forms/AllItems.aspx?csf=1&web=1&e=PoWChf&CID=6b9cc49a%2Db4de%2D40b4%2Db5a1%2De65edce04318&FolderCTID=0x012000F47A6FBB1870684E8FA41BE82DE047AD&id=%2Fteams%2FEgyptHighSpeedProject732%2FShared%20Documents%2FGeneral%2F10%5FSite%20visits%20%26%20Progress%20Reports%2F01%5FGreen%20Line%2F01%5FProgress%20Report" target="_blank" rel="noreferrer">
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
              <div className="section-tools">
                <label className="global-search section-search">
                  <Icon name="search" size={18} />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search dashboards and reports"
                  />
                  {/* <kbd>⌘ K</kbd> */}
                </label>
                {/* <span className="result-count">
                  {filtered.reduce((sum, group) => sum + group.items.length, 0)}{" "}
                  resources
                </span> */}
              </div>
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
                  group.items.map(({ key, name, tag, href }) => (
                    <a className={`report-card ${group.accent}`} href={href} target="_blank" rel="noreferrer" key={key}>
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
            <a href="https://siemens.sharepoint.com/teams/EgyptHighSpeedProject732/Lists/Aconex%20Frequently%20Asked%20Questions%20FAQ/AllItems.aspx?e=bxUO9M&CID=024c8c8e%2D9ab6%2D4567%2D8c3d%2Db0baf3034f8a" target="_blank" rel="noreferrer">
              <Icon name="help" />
              <span>
                <strong>Aconex FAQ</strong>
                <small>Common workflows and support</small>
              </span>
              <Icon name="arrow" />
            </a>
            <a href="https://siemens.sharepoint.com/teams/EgyptHighSpeedProject732/Lists/LMS%20Frequently%20Asked%20Questions%20FAQ/AllItems.aspx?e=OPUpPm&CID=0dae5f58%2D38d2%2D4022%2D8d26%2De1844b4bcd15" target="_blank" rel="noreferrer">
              <Icon name="help" />
              <span>
                <strong>LMS FAQ</strong>
                <small>Learning platform guidance</small>
              </span>
              <Icon name="arrow" />
            </a>
            <a href="https://siemens.sharepoint.com/teams/ProjectInsightBoard/SitePages/Handbook.aspx" target="_blank" rel="noreferrer">
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
                <article className="contact-card" key={contact.name} tabIndex={0}>
                  <span className={`contact-avatar avatar-${index + 1}`}>
                    <img
                      src={profilePhotoUrl(contact.email)}
                      alt=""
                      onError={(event) => { event.currentTarget.style.display = "none" }}
                    />
                    {contact.initials}
                  </span>
                  <div>
                    <h3>{contact.name}</h3>
                    <p>{contact.role}</p>
                    <small>{contact.scope}</small>
                  </div>
                  <div className="contact-actions">
                    <a href={`mailto:${contact.email}`} aria-label={`Email ${contact.name}`} title={`Email ${contact.name}`}>
                      <Icon name="arrow" size={17} />
                    </a>
                    <a
                      href={`https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(contact.email)}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Chat with ${contact.name} in Teams`}
                      title={`Chat with ${contact.name} in Teams`}
                    >
                      <Icon name="people" size={17} />
                    </a>
                  </div>
                  <div className="contact-profile-card">
                    <div className="contact-profile-heading">
                      <span className="contact-profile-photo">
                        <img
                          src={profilePhotoUrl(contact.email)}
                          alt=""
                          onError={(event) => { event.currentTarget.style.display = "none" }}
                        />
                        {contact.initials}
                      </span>
                      <div>
                        <strong>{contact.name}</strong>
                        <span>{contact.role}</span>
                      </div>
                    </div>
                    <p>{contact.scope}</p>
                    <a className="contact-profile-email" href={`mailto:${contact.email}`}>
                      {contact.email}
                    </a>
                    <div className="contact-profile-actions">
                      <a href={`mailto:${contact.email}`}>Email</a>
                      <a
                        href={`https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(contact.email)}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Chat in Teams
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <footer>
            <span className="brand-word">SIEMENS</span>
            <p>Egypt High Speed Rail · Internal SMO Collaboration</p>
            <nav>
              <a href="https://new.siemens.com/global/en/general/legal.html" target="_blank" rel="noreferrer">Corporate information</a>
              <a href="https://siemens.sharepoint.com/sites/FooterContent-intern/SitePages/Privacy-Notice.aspx" target="_blank" rel="noreferrer">Privacy notice</a>
              <a href="https://siemens.sharepoint.com/sites/globalpageextensions/Shared%20Documents/Site%20owner%20Duties%20ENG.pdf" target="_blank" rel="noreferrer">Site owner duties</a>
            </nav>
          </footer>
        </main>
      </div>
      </div>
    </div>
  )
}
