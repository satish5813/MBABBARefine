import { useState, useMemo } from "react";
import data from "./data.json";

const TABS = [
  { id: "bb", label: "BB" },
  { id: "objectives", label: "Program Objectives" },
  { id: "pathways", label: "Domain Pathways" },
  { id: "roles", label: "30+ LPA Role Paths" },
  { id: "certs", label: "Certifications" },
];

function Stars({ n }) {
  const v = Number(n) || 0;
  return (
    <span className="inline-flex items-center gap-0.5 text-klgold">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= v ? "" : "opacity-25"}>
          ★
        </span>
      ))}
      <span className="ml-1 text-xs text-slate-500">{v}/5</span>
    </span>
  );
}

function PriorityBadge({ p }) {
  const colors = {
    High: "bg-emerald-100 text-emerald-800 ring-emerald-200",
    Medium: "bg-amber-100 text-amber-800 ring-amber-200",
    Low: "bg-slate-100 text-slate-700 ring-slate-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${
        colors[p] || colors.Low
      }`}
    >
      {p || "—"}
    </span>
  );
}

function Header() {
  return (
    <header className="bg-gradient-to-r from-klblue via-blue-900 to-indigo-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/logos/kl-logo.png"
            alt="KL University"
            className="h-12 w-auto bg-white rounded p-1"
          />
          <img
            src="/logos/skill-logo.png"
            alt="Skill Development"
            className="h-12 w-auto bg-white rounded p-1"
          />
        </div>
        <div className="text-right">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">MBA</h1>
          <p className="text-xs sm:text-sm text-blue-100">
            Global Certification Pathways for Employability
          </p>
        </div>
      </div>
    </header>
  );
}

function Tabs({ active, setActive }) {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap gap-1 sm:gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition ${
              active === t.id
                ? "border-klgold text-klblue"
                : "border-transparent text-slate-600 hover:text-klblue hover:border-slate-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function BBTab() {
  const highlights = [
    { num: data.certs.length, label: "Formal Certifications" },
    {
      num: data.certs.filter((c) => c.priority === "High").length,
      label: "High-Priority Stack",
    },
    { num: data.paths.length, label: "30+ LPA Role Paths" },
    { num: data.roadmap.length, label: "Domain Roadmaps" },
  ];
  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-klblue to-indigo-800 text-white p-6 sm:p-10 shadow-lg">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">
          Welcome to the MBA – BB Pathway
        </h2>
        <p className="text-blue-100 max-w-3xl text-base sm:text-lg">
          The Business Builder (BB) pathway transforms MBA students into
          industry-ready professionals through a curated stack of low-cost and
          free global certifications, aligned to high-paying career paths.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          {highlights.map((h) => (
            <div
              key={h.label}
              className="bg-white/10 backdrop-blur rounded-xl p-4 ring-1 ring-white/20"
            >
              <div className="text-3xl font-bold text-klgold">{h.num}</div>
              <div className="text-xs uppercase tracking-wide text-blue-100 mt-1">
                {h.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white shadow ring-1 ring-slate-200 p-6">
          <h3 className="text-xl font-semibold text-klblue mb-3">
            What is BB?
          </h3>
          <p className="text-slate-700 leading-relaxed">
            BB stands for <strong>Business Builder</strong> — a structured,
            domain-wise journey that layers globally recognized credentials on
            top of MBA fundamentals. Students follow a "free-first, then
            low-cost" stack and graduate with a verifiable portfolio.
          </p>
        </div>
        <div className="rounded-xl bg-white shadow ring-1 ring-slate-200 p-6">
          <h3 className="text-xl font-semibold text-klblue mb-3">
            How It Works
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-slate-700">
            <li>Choose your target domain and role.</li>
            <li>Complete the free credentials stack first.</li>
            <li>Layer paid/low-cost certifications for depth.</li>
            <li>Build a portfolio of artifacts validated by industry.</li>
          </ol>
        </div>
      </section>

      <section className="rounded-xl bg-white shadow ring-1 ring-slate-200 p-6">
        <h3 className="text-xl font-semibold text-klblue mb-4">
          Source Notes & Planning Context
        </h3>
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-slate-700 list-disc list-inside">
          {data.notes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function ObjectivesTab() {
  const objectives = [
    {
      title: "Employability First",
      body:
        "Every certificate is mapped to MBA-relevant roles and includes a real portfolio artifact requirement.",
    },
    {
      title: "Cost-Conscious Learning",
      body:
        "Stack is built free-first; paid credentials are added only when ROI on placements is clear.",
    },
    {
      title: "Industry-Validated Outcomes",
      body:
        "All credentials are issued by recognized providers (Google, Microsoft, IBM, Salesforce, HubSpot, etc.).",
    },
    {
      title: "30+ LPA Trajectory",
      body:
        "Each pathway is benchmarked against realistic CTC logic for premium roles in consulting, analytics, product and growth.",
    },
    {
      title: "Portfolio-Driven Proof",
      body:
        "Students leave the program with dashboards, models, case decks and process maps — not just certificates.",
    },
    {
      title: "Specialization-Aligned",
      body:
        "Each path links to recommended MBA electives so academics and credentials reinforce each other.",
    },
  ];
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-klblue">Program Objectives & Outcomes</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {objectives.map((o) => (
          <div
            key={o.title}
            className="bg-white rounded-xl shadow ring-1 ring-slate-200 p-5 hover:shadow-lg transition"
          >
            <div className="h-1 w-10 bg-klgold rounded-full mb-3" />
            <h3 className="font-semibold text-lg text-klblue mb-2">
              {o.title}
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">{o.body}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow ring-1 ring-slate-200 p-6">
        <h3 className="text-xl font-semibold text-klblue mb-3">
          Expected Outcomes
        </h3>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          {[
            "Verifiable certifications from global vendors",
            "A portfolio of 4–6 industry-grade artifacts",
            "Interview-ready case studies & dashboards",
            "Domain specialization aligned to MBA electives",
            "Eligibility for premium roles up to 30+ LPA",
            "Confidence to pitch acquisition, ROI and process savings",
          ].map((o) => (
            <div key={o} className="flex items-start gap-2">
              <span className="text-klgold mt-0.5">✓</span>
              <span className="text-slate-700">{o}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PathwaysTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-klblue">Domain-wise Student Pathways</h2>
      <p className="text-slate-600">
        Follow your domain's roadmap — start free, layer low-cost, prove with
        portfolio.
      </p>
      <div className="grid md:grid-cols-2 gap-5">
        {data.roadmap.map((r) => (
          <div
            key={r.domain}
            className="bg-white rounded-xl shadow ring-1 ring-slate-200 overflow-hidden hover:shadow-lg transition"
          >
            <div className="bg-gradient-to-r from-klblue to-indigo-700 text-white px-5 py-3">
              <h3 className="font-semibold text-lg">{r.domain}</h3>
            </div>
            <div className="p-5 space-y-3 text-sm">
              <div>
                <div className="text-xs font-semibold uppercase text-emerald-700 mb-1">
                  Start Free
                </div>
                <div className="text-slate-700">{r.freeStart}</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase text-amber-700 mb-1">
                  Then Low-cost / Paid
                </div>
                <div className="text-slate-700">{r.paidAdd}</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase text-indigo-700 mb-1">
                  Portfolio Proof
                </div>
                <div className="text-slate-700">{r.portfolio}</div>
              </div>
              <div className="border-l-4 border-klgold pl-3 italic text-slate-600 bg-slate-50 py-2 rounded-r">
                "{r.pitch}"
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RolesTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-klblue">30+ LPA Role Paths</h2>
      <p className="text-slate-600">
        Premium career paths with required certification stacks, portfolio
        artifacts and a 90-day action plan.
      </p>
      <div className="space-y-4">
        {data.paths.map((p) => (
          <div
            key={p.no}
            className="bg-white rounded-xl shadow ring-1 ring-slate-200 p-5 hover:shadow-lg transition"
          >
            <div className="flex flex-wrap items-start gap-3 mb-3">
              <div className="bg-klblue text-white rounded-lg h-10 w-10 flex items-center justify-center font-bold">
                {p.no}
              </div>
              <div className="flex-1 min-w-[200px]">
                <h3 className="text-lg font-semibold text-klblue">{p.role}</h3>
                <p className="text-xs text-slate-500">{p.mbaFit}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-semibold text-slate-700">Certification Stack</div>
                <p className="text-slate-600">{p.stack}</p>
              </div>
              <div>
                <div className="font-semibold text-slate-700">Portfolio Proof</div>
                <p className="text-slate-600">{p.portfolio}</p>
              </div>
              <div>
                <div className="font-semibold text-slate-700">Target Employers</div>
                <p className="text-slate-600">{p.employers}</p>
              </div>
              <div>
                <div className="font-semibold text-slate-700">CTC Logic</div>
                <p className="text-slate-600">{p.ctcLogic}</p>
              </div>
            </div>
            <div className="mt-4 bg-amber-50 border-l-4 border-klgold p-3 rounded-r text-sm">
              <span className="font-semibold text-amber-900">90-Day Action: </span>
              <span className="text-slate-700">{p.action}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertsTab() {
  const [domain, setDomain] = useState("All");
  const [priority, setPriority] = useState("All");
  const [q, setQ] = useState("");

  const domains = useMemo(
    () => ["All", ...Array.from(new Set(data.certs.map((c) => c.domain)))],
    []
  );
  const priorities = ["All", "High", "Medium", "Low"];

  const filtered = data.certs.filter((c) => {
    if (domain !== "All" && c.domain !== domain) return false;
    if (priority !== "All" && c.priority !== priority) return false;
    if (q) {
      const s = q.toLowerCase();
      if (
        !`${c.name} ${c.provider} ${c.skills} ${c.roles}`
          .toLowerCase()
          .includes(s)
      )
        return false;
    }
    return true;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-klblue">Certifications Catalog</h2>
          <p className="text-slate-600 text-sm">
            {filtered.length} of {data.certs.length} formal certifications
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl ring-1 ring-slate-200 shadow-sm p-4 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-semibold text-slate-600 block mb-1">
            Search
          </label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Skill, provider, role..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-klblue text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1">
            Domain
          </label>
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-klblue text-sm bg-white"
          >
            {domains.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-klblue text-sm bg-white"
          >
            {priorities.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <div
            key={c.sno}
            className="bg-white rounded-xl shadow ring-1 ring-slate-200 p-5 hover:shadow-lg transition flex flex-col"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-klblue bg-blue-50 px-2 py-0.5 rounded">
                {c.domain}
              </span>
              <PriorityBadge p={c.priority} />
            </div>
            <h3 className="font-semibold text-slate-900 leading-snug mb-1">
              {c.name}
            </h3>
            <p className="text-xs text-slate-500 mb-2">
              {c.provider} • {c.level} • {c.time}
            </p>
            <Stars n={c.relevance} />
            <div className="mt-3 space-y-1 text-xs text-slate-700">
              <p>
                <span className="font-semibold">Skills:</span> {c.skills}
              </p>
              <p>
                <span className="font-semibold">Roles:</span> {c.roles}
              </p>
              <p>
                <span className="font-semibold">Artifact:</span> {c.artifact}
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-slate-600">
                {c.costCategory}{" "}
                {c.costINR && c.costINR !== "0" && (
                  <span className="text-slate-500">
                    (~₹{Number(c.costINR).toLocaleString("en-IN")})
                  </span>
                )}
              </span>
            </div>
            <a
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex justify-center items-center gap-1 bg-klblue text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-800 transition"
            >
              Open Pathway →
            </a>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-slate-500 py-10">
          No certifications match these filters.
        </p>
      )}
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("bb");
  return (
    <div className="min-h-full flex flex-col">
      <Header />
      <Tabs active={active} setActive={setActive} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {active === "bb" && <BBTab />}
        {active === "objectives" && <ObjectivesTab />}
        {active === "pathways" && <PathwaysTab />}
        {active === "roles" && <RolesTab />}
        {active === "certs" && <CertsTab />}
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} KL University • MBA Pathways • Prepared
          2026-05-11
        </div>
      </footer>
    </div>
  );
}
