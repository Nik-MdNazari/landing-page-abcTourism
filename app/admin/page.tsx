"use client";

import { useState, type FormEvent, type ReactNode, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./admin.module.css";

const TRAILS = [
  "Birch Tower Heritage Walk",
  "Concubine Lane Circuit",
  "Kong Heng Square Loop",
  "Railway Station Trail",
  "Tambun Cave Trail",
];

type ClientStatus = "Active" | "Inactive";
type Client = {
  id: number; name: string; email: string; phone: string; trail: string;
  toursBooked: number; totalSpent: number; status: ClientStatus; joined: string;
};

type GuideStatus = "Active" | "On leave";
type Guide = {
  id: number; name: string; trails: string; languages: string;
  rating: number; toursLed: number; status: GuideStatus;
};

type PackageStatus = "Active" | "Draft" | "Archived";
type Package = {
  id: number; name: string; trail: string; price: number; duration: string;
  capacity: number; bookings: number; status: PackageStatus;
};

const initialClients: Client[] = [
  { id: 1, name: "Aisyah Rahman", email: "aisyah.r@example.com", phone: "012-345 6781", trail: "Birch Tower Heritage Walk", toursBooked: 4, totalSpent: 154.4, status: "Active", joined: "12 Feb 2026" },
  { id: 2, name: "J. Okafor", email: "j.okafor@example.com", phone: "012-345 6782", trail: "Concubine Lane Circuit", toursBooked: 2, totalSpent: 77.2, status: "Active", joined: "03 Apr 2026" },
  { id: 3, name: "R. Santos", email: "r.santos@example.com", phone: "012-345 6783", trail: "Kong Heng Square Loop", toursBooked: 1, totalSpent: 38.6, status: "Active", joined: "21 May 2026" },
  { id: 4, name: "Tan Wei Ming", email: "wm.tan@example.com", phone: "012-345 6784", trail: "Railway Station Trail", toursBooked: 6, totalSpent: 231.6, status: "Inactive", joined: "09 Jan 2026" },
  { id: 5, name: "A. Meyer", email: "a.meyer@example.com", phone: "012-345 6785", trail: "Tambun Cave Trail", toursBooked: 3, totalSpent: 115.8, status: "Active", joined: "30 Jun 2026" },
];

const initialGuides: Guide[] = [
  { id: 1, name: "Chong Poh Ling", trails: "Birch Tower Heritage Walk", languages: "EN, MS, ZH", rating: 4.9, toursLed: 212, status: "Active" },
  { id: 2, name: "Rajesh Kumar", trails: "Concubine Lane Circuit", languages: "EN, TA", rating: 4.7, toursLed: 168, status: "Active" },
  { id: 3, name: "Nurul Izzati", trails: "Kong Heng Square Loop", languages: "EN, MS", rating: 4.8, toursLed: 95, status: "On leave" },
  { id: 4, name: "Lim Chee Keong", trails: "Railway Station Trail, Tambun Cave Trail", languages: "EN, ZH", rating: 4.6, toursLed: 140, status: "Active" },
];

const initialPackages: Package[] = [
  { id: 1, name: "Old Town Heritage Walk", trail: "Birch Tower Heritage Walk", price: 38.6, duration: "2.5 hrs", capacity: 25, bookings: 1636, status: "Active" },
  { id: 2, name: "Concubine Lane by Night", trail: "Concubine Lane Circuit", price: 42.0, duration: "2 hrs", capacity: 20, bookings: 1299, status: "Active" },
  { id: 3, name: "Kong Heng Food Loop", trail: "Kong Heng Square Loop", price: 45.5, duration: "3 hrs", capacity: 18, bookings: 866, status: "Active" },
  { id: 4, name: "Railway Heritage Trail", trail: "Railway Station Trail", price: 35.0, duration: "1.5 hrs", capacity: 30, bookings: 625, status: "Draft" },
  { id: 5, name: "Tambun Cave Explorer", trail: "Tambun Cave Trail", price: 55.0, duration: "4 hrs", capacity: 15, bookings: 386, status: "Archived" },
];

const kpis = [
  { label: "Bookings", value: "4,812", delta: "up", deltaText: "↑ 12.4% vs. July", desc: "Total tours purchased this month, all trails combined. Core demand signal.", accent: "var(--paper)" },
  { label: "Audio Tour Completion %", value: "81%", delta: "up", deltaText: "↑ 3.1 pts", desc: "Share of started tours finished end to end. Low completion flags a boring stop, bad audio, or confusing UX.", accent: "var(--paper)" },
  { label: "Average Tour Order Value", value: "RM 38.60", delta: "down", deltaText: "↓ 1.8%", desc: "Average revenue per booking, including add-ons and upsells. Tracks monetization per user, not just volume.", accent: "var(--ember)" },
  { label: "Fast Pass Redemption %", value: "64%", delta: "up", deltaText: "↑ 6.0 pts", desc: "Of passes bundled, share actually redeemed at the vendor. Low number means travellers are paying for it but not using it.", accent: "var(--ember)" },
];

const trafficBars = [
  { hr: 7, height: 10, peak: false },
  { hr: 8, height: 82, peak: true },
  { hr: 9, height: 94, peak: true },
  { hr: 10, height: 70, peak: true },
  { hr: 11, height: 38, peak: false },
  { hr: 12, height: 30, peak: false },
  { hr: 13, height: 26, peak: false },
  { hr: 14, height: 22, peak: false },
  { hr: 15, height: 34, peak: false },
  { hr: 16, height: 76, peak: true },
  { hr: 17, height: 98, peak: true },
  { hr: 18, height: 88, peak: true },
  { hr: 19, height: 42, peak: false },
  { hr: 20, height: 18, peak: false },
];

const distribution = [
  { name: "Birch Tower Heritage Walk", pct: 34 },
  { name: "Concubine Lane Circuit", pct: 27 },
  { name: "Kong Heng Square Loop", pct: 18 },
  { name: "Railway Station Trail", pct: 13 },
  { name: "Tambun Cave Trail", pct: 8 },
];

const incidents = [
  { vendor: "Sin Yoon Loong", trail: "Birch Tower Heritage Walk", issue: "Fast pass not honoured", status: "watch", statusText: "Investigating" },
  { vendor: "Kong Heng Square Stalls", trail: "Kong Heng Square Loop", issue: "Stall closed early", status: "watch", statusText: "Investigating" },
  { vendor: "Thean Chun", trail: "Concubine Lane Circuit", issue: "Booking mismatch", status: "ok", statusText: "Resolved" },
  { vendor: "Foh San Dim Sum", trail: "Railway Station Trail", issue: "Overbooked slot", status: "ok", statusText: "Resolved" },
];

type Notify = (message: string) => void;

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statSub}>{sub}</div>
    </div>
  );
}

function Pill({ tone, children }: { tone: "positive" | "negative" | "neutral"; children: ReactNode }) {
  const cls = tone === "positive" ? styles.pillPositive : tone === "negative" ? styles.pillNegative : styles.pillNeutral;
  return <span className={`${styles.pill} ${cls}`}>{children}</span>;
}

function nextId(items: { id: number }[]) {
  return items.reduce((max, i) => Math.max(max, i.id), 0) + 1;
}

function ClientsSection({ notify }: { notify: Notify }) {
  const [clients, setClients] = useState(initialClients);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState<Client | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ClientStatus>("All");

  const active = clients.filter((c) => c.status === "Active").length;
  const avgSpend = clients.length ? clients.reduce((s, c) => s + c.totalSpent, 0) / clients.length : 0;
  const totalTours = clients.reduce((s, c) => s + c.toursBooked, 0);

  const filtered = clients.filter((c) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.trail.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  function handleAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    if (!name) return;
    setClients((prev) => [
      ...prev,
      {
        id: nextId(prev),
        name,
        email: String(form.get("email") || ""),
        phone: String(form.get("phone") || ""),
        trail: String(form.get("trail") || TRAILS[0]),
        toursBooked: 0,
        totalSpent: 0,
        status: "Active",
        joined: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      },
    ]);
    notify(`${name} added`);
    e.currentTarget.reset();
    setShowForm(false);
  }

  function startEdit(c: Client) { setEditingId(c.id); setEditDraft({ ...c }); }
  function saveEdit() {
    if (!editDraft) return;
    setClients((prev) => prev.map((c) => (c.id === editDraft.id ? editDraft : c)));
    notify(`${editDraft.name} updated`);
    setEditingId(null); setEditDraft(null);
  }
  function handleDelete(c: Client) {
    if (!window.confirm(`Delete ${c.name}? This can't be undone.`)) return;
    setClients((prev) => prev.filter((x) => x.id !== c.id));
    notify(`${c.name} deleted`);
  }

  return (
    <>
      <div className={styles.statGrid}>
        <StatCard label="Total clients" value={String(clients.length)} sub="All registered accounts" />
        <StatCard label="Active clients" value={String(active)} sub="Booked in the last 90 days" />
        <StatCard label="Tours booked" value={String(totalTours)} sub="Across all clients" />
        <StatCard label="Avg. spend" value={`RM ${avgSpend.toFixed(2)}`} sub="Per client, lifetime" />
      </div>

      <div className={styles.panel}>
        <div className={styles.panelHead}>
          <h2>Clients</h2>
          <button className="button buttonSmall" type="button" onClick={() => setShowForm((v) => !v)}>
            {showForm ? "Close" : "Add client"} <span>{showForm ? "×" : "+"}</span>
          </button>
        </div>

        {showForm && (
          <form className={styles.addForm} onSubmit={handleAdd}>
            <div className={styles.field}><label htmlFor="c-name">Name</label><input id="c-name" name="name" required /></div>
            <div className={styles.field}><label htmlFor="c-email">Email</label><input id="c-email" name="email" type="email" /></div>
            <div className={styles.field}><label htmlFor="c-phone">Phone</label><input id="c-phone" name="phone" /></div>
            <div className={styles.field}>
              <label htmlFor="c-trail">Preferred trail</label>
              <select id="c-trail" name="trail" defaultValue={TRAILS[0]}>
                {TRAILS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className={styles.formActions}>
              <button className="button buttonSmall" type="submit">Save client</button>
              <button className={styles.linkBtn} type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        )}

        <div className={styles.toolbar}>
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Search clients by name, email or trail…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search clients"
          />
          <select className={styles.filterSelect} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as "All" | ClientStatus)} aria-label="Filter by status">
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>Client</th><th>Trail</th><th>Tours</th><th>Spent</th><th>Status</th><th>Joined</th><th></th></tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const editing = editingId === c.id && editDraft;
                return (
                  <tr key={c.id}>
                    {editing ? (
                      <>
                        <td><input className={styles.editInput} value={editDraft!.name} onChange={(e) => setEditDraft({ ...editDraft!, name: e.target.value })} /></td>
                        <td>
                          <select className={styles.editInput} value={editDraft!.trail} onChange={(e) => setEditDraft({ ...editDraft!, trail: e.target.value })}>
                            {TRAILS.map((t) => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </td>
                        <td><input className={styles.editInput} type="number" min={0} value={editDraft!.toursBooked} onChange={(e) => setEditDraft({ ...editDraft!, toursBooked: Number(e.target.value) })} /></td>
                        <td><input className={styles.editInput} type="number" min={0} step="0.01" value={editDraft!.totalSpent} onChange={(e) => setEditDraft({ ...editDraft!, totalSpent: Number(e.target.value) })} /></td>
                        <td>
                          <select className={styles.editInput} value={editDraft!.status} onChange={(e) => setEditDraft({ ...editDraft!, status: e.target.value as ClientStatus })}>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </td>
                        <td>{c.joined}</td>
                        <td className={styles.rowActions}>
                          <button className={styles.actionBtn} onClick={saveEdit}>Save</button>
                          <button className={styles.actionBtn} onClick={() => { setEditingId(null); setEditDraft(null); }}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className={styles.primaryCell}>{c.name}<span className={styles.subText}>{c.email}</span></td>
                        <td>{c.trail}</td>
                        <td>{c.toursBooked}</td>
                        <td>RM {c.totalSpent.toFixed(2)}</td>
                        <td><Pill tone={c.status === "Active" ? "positive" : "negative"}>{c.status}</Pill></td>
                        <td>{c.joined}</td>
                        <td className={styles.rowActions}>
                          <button className={styles.actionBtn} onClick={() => startEdit(c)}>Edit</button>
                          <button className={`${styles.actionBtn} ${styles.actionDanger}`} onClick={() => handleDelete(c)}>Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className={styles.empty}>{clients.length === 0 ? "No clients yet." : "No clients match your search."}</div>
          )}
        </div>
      </div>
    </>
  );
}

function GuidesSection({ notify }: { notify: Notify }) {
  const [guides, setGuides] = useState(initialGuides);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState<Guide | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | GuideStatus>("All");

  const active = guides.filter((g) => g.status === "Active").length;
  const avgRating = guides.length ? guides.reduce((s, g) => s + g.rating, 0) / guides.length : 0;
  const totalTours = guides.reduce((s, g) => s + g.toursLed, 0);

  const filtered = guides.filter((g) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || g.name.toLowerCase().includes(q) || g.trails.toLowerCase().includes(q) || g.languages.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "All" || g.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  function handleAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    if (!name) return;
    setGuides((prev) => [
      ...prev,
      {
        id: nextId(prev),
        name,
        trails: String(form.get("trails") || TRAILS[0]),
        languages: String(form.get("languages") || "EN"),
        rating: 5,
        toursLed: 0,
        status: "Active",
      },
    ]);
    notify(`${name} added`);
    e.currentTarget.reset();
    setShowForm(false);
  }

  function startEdit(g: Guide) { setEditingId(g.id); setEditDraft({ ...g }); }
  function saveEdit() {
    if (!editDraft) return;
    setGuides((prev) => prev.map((g) => (g.id === editDraft.id ? editDraft : g)));
    notify(`${editDraft.name} updated`);
    setEditingId(null); setEditDraft(null);
  }
  function handleDelete(g: Guide) {
    if (!window.confirm(`Delete ${g.name}? This can't be undone.`)) return;
    setGuides((prev) => prev.filter((x) => x.id !== g.id));
    notify(`${g.name} deleted`);
  }

  return (
    <>
      <div className={styles.statGrid}>
        <StatCard label="Total guides" value={String(guides.length)} sub="Registered with ABC Tourism" />
        <StatCard label="Active guides" value={String(active)} sub="Available to be assigned" />
        <StatCard label="Avg. rating" value={avgRating.toFixed(1)} sub="Across all guides" />
        <StatCard label="Tours led" value={String(totalTours)} sub="Lifetime, all trails" />
      </div>

      <div className={styles.panel}>
        <div className={styles.panelHead}>
          <h2>Tour guides</h2>
          <button className="button buttonSmall" type="button" onClick={() => setShowForm((v) => !v)}>
            {showForm ? "Close" : "Add guide"} <span>{showForm ? "×" : "+"}</span>
          </button>
        </div>

        {showForm && (
          <form className={styles.addForm} onSubmit={handleAdd}>
            <div className={styles.field}><label htmlFor="g-name">Name</label><input id="g-name" name="name" required /></div>
            <div className={styles.field}>
              <label htmlFor="g-trails">Assigned trail</label>
              <select id="g-trails" name="trails" defaultValue={TRAILS[0]}>
                {TRAILS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className={styles.field}><label htmlFor="g-lang">Languages</label><input id="g-lang" name="languages" placeholder="EN, MS" /></div>
            <div className={styles.formActions}>
              <button className="button buttonSmall" type="submit">Save guide</button>
              <button className={styles.linkBtn} type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        )}

        <div className={styles.toolbar}>
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Search guides by name, trail or language…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search guides"
          />
          <select className={styles.filterSelect} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as "All" | GuideStatus)} aria-label="Filter by status">
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="On leave">On leave</option>
          </select>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>Guide</th><th>Trail(s)</th><th>Languages</th><th>Rating</th><th>Tours led</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {filtered.map((g) => {
                const editing = editingId === g.id && editDraft;
                return (
                  <tr key={g.id}>
                    {editing ? (
                      <>
                        <td><input className={styles.editInput} value={editDraft!.name} onChange={(e) => setEditDraft({ ...editDraft!, name: e.target.value })} /></td>
                        <td><input className={styles.editInput} value={editDraft!.trails} onChange={(e) => setEditDraft({ ...editDraft!, trails: e.target.value })} /></td>
                        <td><input className={styles.editInput} value={editDraft!.languages} onChange={(e) => setEditDraft({ ...editDraft!, languages: e.target.value })} /></td>
                        <td><input className={styles.editInput} type="number" min={0} max={5} step="0.1" value={editDraft!.rating} onChange={(e) => setEditDraft({ ...editDraft!, rating: Number(e.target.value) })} /></td>
                        <td><input className={styles.editInput} type="number" min={0} value={editDraft!.toursLed} onChange={(e) => setEditDraft({ ...editDraft!, toursLed: Number(e.target.value) })} /></td>
                        <td>
                          <select className={styles.editInput} value={editDraft!.status} onChange={(e) => setEditDraft({ ...editDraft!, status: e.target.value as GuideStatus })}>
                            <option value="Active">Active</option>
                            <option value="On leave">On leave</option>
                          </select>
                        </td>
                        <td className={styles.rowActions}>
                          <button className={styles.actionBtn} onClick={saveEdit}>Save</button>
                          <button className={styles.actionBtn} onClick={() => { setEditingId(null); setEditDraft(null); }}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className={styles.primaryCell}>{g.name}</td>
                        <td>{g.trails}</td>
                        <td>{g.languages}</td>
                        <td>{g.rating.toFixed(1)} ★</td>
                        <td>{g.toursLed}</td>
                        <td><Pill tone={g.status === "Active" ? "positive" : "neutral"}>{g.status}</Pill></td>
                        <td className={styles.rowActions}>
                          <button className={styles.actionBtn} onClick={() => startEdit(g)}>Edit</button>
                          <button className={`${styles.actionBtn} ${styles.actionDanger}`} onClick={() => handleDelete(g)}>Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className={styles.empty}>{guides.length === 0 ? "No guides yet." : "No guides match your search."}</div>
          )}
        </div>
      </div>
    </>
  );
}

function PackagesSection({ notify }: { notify: Notify }) {
  const [packages, setPackages] = useState(initialPackages);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState<Package | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | PackageStatus>("All");

  const activeCount = packages.filter((p) => p.status === "Active").length;
  const avgPrice = packages.length ? packages.reduce((s, p) => s + p.price, 0) / packages.length : 0;
  const totalBookings = packages.reduce((s, p) => s + p.bookings, 0);

  const filtered = packages.filter((p) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.trail.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  function handleAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    if (!name) return;
    setPackages((prev) => [
      ...prev,
      {
        id: nextId(prev),
        name,
        trail: String(form.get("trail") || TRAILS[0]),
        price: Number(form.get("price") || 0),
        duration: String(form.get("duration") || ""),
        capacity: Number(form.get("capacity") || 0),
        bookings: 0,
        status: "Draft",
      },
    ]);
    notify(`${name} added`);
    e.currentTarget.reset();
    setShowForm(false);
  }

  function startEdit(p: Package) { setEditingId(p.id); setEditDraft({ ...p }); }
  function saveEdit() {
    if (!editDraft) return;
    setPackages((prev) => prev.map((p) => (p.id === editDraft.id ? editDraft : p)));
    notify(`${editDraft.name} updated`);
    setEditingId(null); setEditDraft(null);
  }
  function handleDelete(p: Package) {
    if (!window.confirm(`Delete ${p.name}? This can't be undone.`)) return;
    setPackages((prev) => prev.filter((x) => x.id !== p.id));
    notify(`${p.name} deleted`);
  }

  return (
    <>
      <div className={styles.statGrid}>
        <StatCard label="Total packages" value={String(packages.length)} sub="Across all trails" />
        <StatCard label="Active packages" value={String(activeCount)} sub="Bookable right now" />
        <StatCard label="Avg. price" value={`RM ${avgPrice.toFixed(2)}`} sub="Per booking" />
        <StatCard label="Bookings" value={String(totalBookings)} sub="Lifetime, all packages" />
      </div>

      <div className={styles.panel}>
        <div className={styles.panelHead}>
          <h2>Packages</h2>
          <button className="button buttonSmall" type="button" onClick={() => setShowForm((v) => !v)}>
            {showForm ? "Close" : "Add package"} <span>{showForm ? "×" : "+"}</span>
          </button>
        </div>

        {showForm && (
          <form className={styles.addForm} onSubmit={handleAdd}>
            <div className={styles.field}><label htmlFor="p-name">Package name</label><input id="p-name" name="name" required /></div>
            <div className={styles.field}>
              <label htmlFor="p-trail">Trail</label>
              <select id="p-trail" name="trail" defaultValue={TRAILS[0]}>
                {TRAILS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className={styles.field}><label htmlFor="p-price">Price (RM)</label><input id="p-price" name="price" type="number" min={0} step="0.01" /></div>
            <div className={styles.field}><label htmlFor="p-duration">Duration</label><input id="p-duration" name="duration" placeholder="2.5 hrs" /></div>
            <div className={styles.field}><label htmlFor="p-capacity">Capacity</label><input id="p-capacity" name="capacity" type="number" min={0} /></div>
            <div className={styles.formActions}>
              <button className="button buttonSmall" type="submit">Save package</button>
              <button className={styles.linkBtn} type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        )}

        <div className={styles.toolbar}>
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Search packages by name or trail…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search packages"
          />
          <select className={styles.filterSelect} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as "All" | PackageStatus)} aria-label="Filter by status">
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>Package</th><th>Trail</th><th>Price</th><th>Duration</th><th>Capacity</th><th>Bookings</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const editing = editingId === p.id && editDraft;
                return (
                  <tr key={p.id}>
                    {editing ? (
                      <>
                        <td><input className={styles.editInput} value={editDraft!.name} onChange={(e) => setEditDraft({ ...editDraft!, name: e.target.value })} /></td>
                        <td>
                          <select className={styles.editInput} value={editDraft!.trail} onChange={(e) => setEditDraft({ ...editDraft!, trail: e.target.value })}>
                            {TRAILS.map((t) => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </td>
                        <td><input className={styles.editInput} type="number" min={0} step="0.01" value={editDraft!.price} onChange={(e) => setEditDraft({ ...editDraft!, price: Number(e.target.value) })} /></td>
                        <td><input className={styles.editInput} value={editDraft!.duration} onChange={(e) => setEditDraft({ ...editDraft!, duration: e.target.value })} /></td>
                        <td><input className={styles.editInput} type="number" min={0} value={editDraft!.capacity} onChange={(e) => setEditDraft({ ...editDraft!, capacity: Number(e.target.value) })} /></td>
                        <td>{p.bookings}</td>
                        <td>
                          <select className={styles.editInput} value={editDraft!.status} onChange={(e) => setEditDraft({ ...editDraft!, status: e.target.value as PackageStatus })}>
                            <option value="Active">Active</option>
                            <option value="Draft">Draft</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </td>
                        <td className={styles.rowActions}>
                          <button className={styles.actionBtn} onClick={saveEdit}>Save</button>
                          <button className={styles.actionBtn} onClick={() => { setEditingId(null); setEditDraft(null); }}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className={styles.primaryCell}>{p.name}</td>
                        <td>{p.trail}</td>
                        <td>RM {p.price.toFixed(2)}</td>
                        <td>{p.duration}</td>
                        <td>{p.capacity}</td>
                        <td>{p.bookings}</td>
                        <td><Pill tone={p.status === "Active" ? "positive" : p.status === "Archived" ? "negative" : "neutral"}>{p.status}</Pill></td>
                        <td className={styles.rowActions}>
                          <button className={styles.actionBtn} onClick={() => startEdit(p)}>Edit</button>
                          <button className={`${styles.actionBtn} ${styles.actionDanger}`} onClick={() => handleDelete(p)}>Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className={styles.empty}>{packages.length === 0 ? "No packages yet." : "No packages match your search."}</div>
          )}
        </div>
      </div>
    </>
  );
}

function MonitoringSection() {
  return (
    <>
      <div className={styles.monHead}>
        <div className={styles.loc}>Ipoh Old Town · Perak</div>
        <div className={styles.rangePill}>1–31 Aug 2026</div>
      </div>

      <div className={styles.statGrid}>
        {kpis.map((k) => (
          <div className={styles.kpiCard} key={k.label} style={{ "--kpi-accent": k.accent } as CSSProperties}>
            <div className={styles.statLabel}>{k.label}</div>
            <div className={styles.statValue}>{k.value}</div>
            <div className={`${styles.kpiDelta} ${styles[k.delta]}`}>{k.deltaText}</div>
            <div className={styles.statSub}>{k.desc}</div>
          </div>
        ))}
      </div>

      <div className={styles.panelRow}>
        <div className={styles.panel}>
          <h2>On &amp; Off-Peak Traffic</h2>
          <div className={styles.pSub}>Old Town foot traffic by hour, averaged across the month. Shows whether demand is concentrated (crowding risk) or spread out.</div>
          <div className={styles.bars}>
            {trafficBars.map((b) => (
              <div className={`${styles.col} ${b.peak ? styles.peak : ""}`} key={b.hr}>
                <div className={styles.bar} style={{ height: `${b.height}%` }}></div>
                <span className={styles.hr}>{b.hr}</span>
              </div>
            ))}
          </div>
          <div className={styles.legend}>
            <span><span className={`${styles.dot} ${styles.off}`}></span>Off-peak</span>
            <span><span className={`${styles.dot} ${styles.on}`}></span>Peak (kopitiam breakfast, Concubine Lane evening)</span>
          </div>
          <div className={styles.peakNote}>Morning peak tracks the breakfast rush at Sin Yoon Loong and Thean Chun; evening peak is Concubine Lane and Kong Heng Square filling up.</div>
        </div>

        <div className={styles.panel}>
          <h2>Visitor Distribution</h2>
          <div className={styles.pSub}>Share of active tours, by trail. Tracks popular routes, venue sequences and bottleneck locations.</div>
          {distribution.map((d) => (
            <div className={styles.distRow} key={d.name}>
              <div className={styles.dName}>{d.name}</div>
              <div className={styles.dTrack}><div className={styles.dFill} style={{ width: `${d.pct}%` }}></div></div>
              <div className={styles.dPct}>{d.pct}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.incidentPanel}>
        <div className={styles.incidentTop}>
          <div>
            <div className={styles.iNum}>0.9%</div>
            <div className={styles.iLabel}>Vendor Incident Rate — share of Fast Pass visits impacted by customer-facing operational issues, weighted by severity. Ideally low; this is a partner trust signal.</div>
          </div>
          <div className={styles.incidentTag}>2 open this week</div>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th>Vendor</th><th>Trail</th><th>Reported issue</th><th>Status</th></tr></thead>
            <tbody>
              {incidents.map((row) => (
                <tr key={row.vendor}>
                  <td className={styles.primaryCell}>{row.vendor}</td>
                  <td>{row.trail}</td>
                  <td>{row.issue}</td>
                  <td>
                    <span className={`${styles.pill} ${row.status === "ok" ? styles.pillPositive : styles.pillNegative}`}>
                      {row.statusText}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer className={styles.pageFooter}>ABC TOURISM · IPOH OLD TOWN · DATA REFRESHED EVERY 15 MIN</footer>
    </>
  );
}

type Toast = { id: number; message: string };

export default function AdminPage() {
  const [tab, setTab] = useState<"clients" | "guides" | "packages" | "monitoring">("clients");
  const [toasts, setToasts] = useState<Toast[]>([]);

  function notify(message: string) {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2600);
  }

  return (
    <>
      <header className="header">
        <Link className="logo" href="/" aria-label="ABC Tourism home">
          <Image className={styles.logoMark} src="/images/abc-tourism-logo.png" alt="ABC Tourism" width={640} height={430} priority />
        </Link>
        <nav aria-label="Admin navigation">
          <Link href="/">Site</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.intro}>
          <p className="eyebrow"><span /> Internal · Operations</p>
          <h1>Admin <em>panel.</em></h1>
          <p>Manage clients, tour guides and product packages across every ABC Tourism trail in Ipoh.</p>
        </section>

        <nav className={styles.tabs} aria-label="Admin sections">
          <button className={`${styles.tab} ${tab === "clients" ? styles.tabActive : ""}`} onClick={() => setTab("clients")}>Clients</button>
          <button className={`${styles.tab} ${tab === "guides" ? styles.tabActive : ""}`} onClick={() => setTab("guides")}>Tour Guides</button>
          <button className={`${styles.tab} ${tab === "packages" ? styles.tabActive : ""}`} onClick={() => setTab("packages")}>Packages</button>
          <button className={`${styles.tab} ${tab === "monitoring" ? styles.tabActive : ""}`} onClick={() => setTab("monitoring")}>Monitoring</button>
        </nav>

        {tab === "clients" && <ClientsSection notify={notify} />}
        {tab === "guides" && <GuidesSection notify={notify} />}
        {tab === "packages" && <PackagesSection notify={notify} />}
        {tab === "monitoring" && <MonitoringSection />}
      </main>

      <div className={styles.toastStack} aria-live="polite">
        {toasts.map((t) => <div key={t.id} className={styles.toast}>{t.message}</div>)}
      </div>
    </>
  );
}
