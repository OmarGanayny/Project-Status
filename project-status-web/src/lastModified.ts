import { useEffect, useState } from "react"

export interface SpResponse {
  ok: boolean
  status: number
  json(): Promise<any>
}

export interface DataProvider {
  webUrl: string
  webServerRelativeUrl: string
  get(url: string): Promise<SpResponse>
}

export interface FolderStamp {
  date: Date
  name: string
}

export interface LastModifiedState {
  loading: boolean
  folders: Record<string, FolderStamp | null>
  dashboards: Record<string, Date | null>
  errors: string[]
}


export function parseDate(input: unknown): Date | null {
  if (input == null || input === "") return null

  if (input instanceof Date) return isNaN(input.getTime()) ? null : input

  if (typeof input === "number") {
    const d = new Date(input < 1e11 ? input * 1000 : input)
    return isNaN(d.getTime()) ? null : d
  }

  if (typeof input !== "string") return null
  const s = input.trim()

  const legacy = s.match(/^\/Date\((-?\d+)\)\/$/)
  if (legacy) return parseDate(Number(legacy[1]))

  const dmy = s.match(
    /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/,
  )
  if (dmy) {
    const [, d, m, y, hh = "0", mm = "0", ss = "0"] = dmy
    const date = new Date(+y, +m - 1, +d, +hh, +mm, +ss)
    return date.getMonth() === +m - 1 && date.getDate() === +d ? date : null
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    const [y, m, d] = s.split("-").map(Number)
    return new Date(y, m - 1, d)
  }

  const t = Date.parse(s)
  return isNaN(t) ? null : new Date(t)
}


const shortFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" })
const fullFmt = new Intl.DateTimeFormat("en-GB", { dateStyle: "full", timeStyle: "short" })
const relFmt = new Intl.RelativeTimeFormat("en", { numeric: "auto" })

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()

export const daysBetween = (from: Date, to: Date = new Date()) =>
  Math.round((startOfDay(to) - startOfDay(from)) / 86_400_000)

export const formatDate = (d: Date) => shortFmt.format(d)

export const formatFull = (d: Date) => fullFmt.format(d)

export function formatRelative(d: Date, now: Date = new Date()): string {
  const days = daysBetween(d, now)
  if (days < 1) return relFmt.format(0, "day")
  if (days < 30) return relFmt.format(-days, "day")
  if (days < 365) return relFmt.format(-Math.floor(days / 30), "month")
  return relFmt.format(-Math.floor(days / 365), "year")
}

export type Freshness = "fresh" | "aging" | "stale"

export function freshness(d: Date, now: Date = new Date()): Freshness {
  const days = daysBetween(d, now)
  return days <= 7 ? "fresh" : days <= 30 ? "aging" : "stale"
}


const encodePath = (p: string) =>
  p
    .split("/")
    .map((seg) => encodeURIComponent(seg.replace(/'/g, "''")))
    .join("/")

interface Row {
  Name?: string
  Title?: string
  TimeLastModified?: string
  LastUpdated?: string
}

async function getRows(p: DataProvider, url: string): Promise<Row[]> {
  const res = await p.get(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} – ${url.split("?")[0]}`)
  const json = await res.json()
  return Array.isArray(json?.value) ? json.value : []
}

export async function fetchFolderLatest(
  p: DataProvider,
  webRelativePath: string,
): Promise<FolderStamp | null> {
  const root = p.webServerRelativeUrl.replace(/\/$/, "")
  const serverRelative = `${root}/${webRelativePath.replace(/^\//, "")}`
  const base = `${p.webUrl}/_api/web/GetFolderByServerRelativePath(decodedurl='${encodePath(serverRelative)}')`
  const query = "?$select=Name,TimeLastModified&$top=500"

  const [files, folders] = await Promise.all([
    getRows(p, `${base}/Files${query}`),
    getRows(p, `${base}/Folders${query}`),
  ])

  let best: FolderStamp | null = null
  for (const row of [...files, ...folders]) {
    if (row.Name === "Forms") continue
    const date = parseDate(row.TimeLastModified)
    if (date && (!best || date > best.date)) best = { date, name: row.Name ?? "" }
  }
  return best
}


export async function fetchCardStatus(
  p: DataProvider,
  listTitle = "CardStatus",
): Promise<Record<string, Date | null>> {
  const url =
    `${p.webUrl}/_api/web/lists/getbytitle('${encodeURIComponent(listTitle)}')/items` +
    "?$select=Title,LastUpdated&$top=500"
  const rows = await getRows(p, url)

  const out: Record<string, Date | null> = {}
  for (const row of rows) {
    const key = row.Title?.trim()
    if (!key) continue
    const date = parseDate(row.LastUpdated)
    const existing = out[key]
    if (!existing || (date && date > existing)) out[key] = date
  }
  return out
}


function demoDate(key: string): Date {
  let h = 0
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0
  const d = new Date()
  d.setDate(d.getDate() - (h % 60))
  d.setHours(8 + (h % 9), (h * 7) % 60, 0, 0)
  return d
}

interface Options {
  provider?: DataProvider
  folderSources: Record<string, string>
  dashboardKeys: string[]
  demo?: boolean
}


export function useLastModified({
  provider,
  folderSources,
  dashboardKeys,
  demo = false,
}: Options): LastModifiedState {
  const [state, setState] = useState<LastModifiedState>({
    loading: Boolean(provider) || demo,
    folders: {},
    dashboards: {},
    errors: [],
  })

  useEffect(() => {
    if (demo) {
      const folders: LastModifiedState["folders"] = {}
      Object.keys(folderSources).forEach((k) => {
        if (folderSources[k]) folders[k] = { date: demoDate(k), name: "Demo file.pdf" }
      })
      const dashboards: LastModifiedState["dashboards"] = {}
      dashboardKeys.forEach((k) => (dashboards[k] = demoDate(k)))
      setState({ loading: false, folders, dashboards, errors: [] })
      return
    }

    if (!provider) {
      setState((s) => ({ ...s, loading: false }))
      return
    }

    let cancelled = false
    setState((s) => ({ ...s, loading: true }))

    const entries = Object.entries(folderSources).filter(([, path]) => path)

    void (async () => {
      const [[dash], folderResults] = await Promise.all([
        Promise.allSettled([fetchCardStatus(provider)]),
        Promise.allSettled(entries.map(([, path]) => fetchFolderLatest(provider, path))),
      ])
      if (cancelled) return

      const errors: string[] = []

      let dashboards: LastModifiedState["dashboards"] = {}
      if (dash.status === "fulfilled") dashboards = dash.value
      else errors.push(`CardStatus list: ${dash.reason?.message ?? dash.reason}`)

      const folders: LastModifiedState["folders"] = {}
      folderResults.forEach((r, i) => {
        const key = entries[i][0]
        if (r.status === "fulfilled") folders[key] = r.value
        else {
          folders[key] = null
          errors.push(`${key}: ${r.reason?.message ?? r.reason}`)
        }
      })

      if (errors.length) console.warn("[lastModified]", errors)
      setState({ loading: false, folders, dashboards, errors })
    })()

    return () => {
      cancelled = true
    }
  }, [provider, folderSources, dashboardKeys, demo])

  return state
}