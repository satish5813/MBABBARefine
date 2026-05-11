import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiChartBar,
  HiSparkles,
  HiAcademicCap,
  HiBriefcase,
  HiRocketLaunch,
  HiCurrencyRupee,
  HiTrophy,
  HiArrowRight,
  HiXMark,
  HiCheckBadge,
  HiMagnifyingGlass,
} from "react-icons/hi2";
import mbaData from "./data.json";
import { bbaData } from "./bbaData";

const DOMAIN_ICONS = {
  "Business Analytics & BI": HiChartBar,
  "AI & Business Automation": HiSparkles,
  "Digital Marketing & Growth": HiRocketLaunch,
  "Sales, CRM & Revenue Operations": HiBriefcase,
  "Finance, FinTech & FP&A": HiCurrencyRupee,
  "HR, People Analytics & Talent": HiAcademicCap,
  "Operations, Supply Chain & ERP": HiTrophy,
  "Project, Product & Agile": HiRocketLaunch,
  "Risk, Compliance & Cyber-GRC": HiCheckBadge,
  "Consulting, Strategy & Case Skills": HiBriefcase,
  "Sustainability & ESG": HiSparkles,
};

const DOMAIN_BG = [
  "bg-clay-mint",
  "bg-clay-peach",
  "bg-clay-sky",
  "bg-clay-lilac",
  "bg-clay-rose",
  "bg-clay-sun",
];
const domainColor = (d) => {
  const list = Object.keys(DOMAIN_ICONS);
  return DOMAIN_BG[list.indexOf(d) % DOMAIN_BG.length] || "bg-clay-sky";
};

const packageFromRelevance = (score, program) => {
  const s = Number(score) || 3;
  if (program === "MBA") {
    return ["8–12 LPA", "10–16 LPA", "14–20 LPA", "20–28 LPA", "28–35+ LPA"][s - 1];
  }
  return ["3–5 LPA", "4–7 LPA", "6–9 LPA", "8–14 LPA", "12–18 LPA"][s - 1];
};

const TABS = [
  { id: "overview", label: "Overview", icon: HiSparkles },
  { id: "objectives", label: "Objectives", icon: HiTrophy },
  { id: "pathways", label: "Pathways", icon: HiRocketLaunch },
  { id: "roles", label: "Role Paths", icon: HiBriefcase },
  { id: "certs", label: "Certifications", icon: HiAcademicCap },
];

function Stars({ n }) {
  const v = Number(n) || 0;
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
          className={`text-lg ${i <= v ? "text-klgold" : "text-slate-300"}`}
        >
          ★
        </motion.span>
      ))}
      <span className="ml-1 text-xs font-semibold text-slate-500">{v}/5</span>
    </div>
  );
}

function ProgramSwitcher({ program, setProgram }) {
  return (
    <div className="clay-inset bg-white/60 p-1.5 inline-flex">
      {["MBA", "BBA"].map((p) => (
        <button
          key={p}
          onClick={() => setProgram(p)}
          className={`relative px-7 sm:px-10 py-2.5 rounded-2xl font-bold text-sm sm:text-base transition-all ${
            program === p ? "text-white" : "text-indigo-700 hover:text-indigo-900"
          }`}
        >
          {program === p && (
            <motion.div
              layoutId="programPill"
              className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-clay-sm"
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            />
          )}
          <span className="relative z-10">{p}</span>
        </button>
      ))}
    </div>
  );
}

function Header({ program, setProgram }) {
  return (
    <header className="relative z-10 pt-6 pb-4 sm:pt-8 sm:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="clay-soft bg-white p-2.5">
              <img src="/logos/kl-logo.png" alt="KL" className="h-12 w-auto" />
            </div>
            <div className="clay-soft bg-white p-2.5">
              <img src="/logos/skill-logo.png" alt="Skill" className="h-12 w-auto" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-right"
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              {program} Pathways
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              KL University · Skill Development Centre
            </p>
          </motion.div>
        </div>
        <div className="mt-6 flex justify-center">
          <ProgramSwitcher program={program} setProgram={setProgram} />
        </div>
      </div>
    </header>
  );
}

function Tabs({ active, setActive }) {
  return (
    <nav className="sticky top-3 z-20 mx-auto max-w-7xl px-4 sm:px-6 mb-6">
      <div className="clay-soft bg-white/85 backdrop-blur-md p-2 flex flex-wrap gap-1 justify-center">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`relative px-3 sm:px-5 py-2.5 rounded-2xl text-sm font-semibold flex items-center gap-2 transition-all ${
                active === t.id
                  ? "text-white"
                  : "text-indigo-700 hover:bg-indigo-50"
              }`}
            >
              {active === t.id && (
                <motion.div
                  layoutId="tabPill"
                  className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-clay-sm"
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                />
              )}
              <Icon className="relative z-10 text-lg" />
              <span className="relative z-10 hidden sm:inline">{t.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function HeroBanner({ data, program }) {
  const highlights = [
    {
      num: data.certs.length,
      label: "Global Certifications",
      icon: HiAcademicCap,
      bg: "bg-clay-sky",
    },
    {
      num: data.certs.filter((c) => c.priority === "High").length,
      label: "High Priority",
      icon: HiTrophy,
      bg: "bg-clay-peach",
    },
    {
      num: data.paths.length,
      label: "Career Paths",
      icon: HiBriefcase,
      bg: "bg-clay-mint",
    },
    {
      num: data.roadmap.length,
      label: "Domain Roadmaps",
      icon: HiRocketLaunch,
      bg: "bg-clay-lilac",
    },
  ];
  const topPackage = program === "MBA" ? "30+ LPA" : "12–18 LPA";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="clay bg-gradient-to-br from-white via-clay-lilac to-clay-sky p-6 sm:p-10 relative overflow-hidden"
    >
      <motion.div
        className="absolute -top-16 -right-16 w-72 h-72 bg-pink-300/40 rounded-full blur-3xl animate-float"
        aria-hidden
      />
      <motion.div
        className="absolute -bottom-16 -left-16 w-72 h-72 bg-indigo-300/40 rounded-full blur-3xl animate-float-slow"
        aria-hidden
      />
      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 clay-btn bg-white text-indigo-600 font-bold text-xs uppercase tracking-wider mb-4"
        >
          <HiSparkles /> {data.programInfo.duration}
        </motion.div>
        <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 bg-clip-text text-transparent">
          {data.programInfo.title}
        </h2>
        <p className="mt-4 text-slate-700 text-base sm:text-lg max-w-3xl font-medium">
          {data.programInfo.tagline}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="clay-soft bg-gradient-to-br from-emerald-400 to-teal-500 text-white px-5 py-3 font-bold">
            🎯 Target: {topPackage}
          </div>
          <div className="clay-soft bg-white text-indigo-700 px-5 py-3 font-bold">
            🏆 {data.programInfo.target}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ y: -6, scale: 1.03 }}
                className={`clay-soft ${h.bg} p-5 cursor-default`}
              >
                <Icon className="text-2xl text-indigo-700 mb-2" />
                <div className="text-3xl font-extrabold text-indigo-900">
                  {h.num}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 mt-1">
                  {h.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

function OverviewTab({ data, program }) {
  return (
    <div className="space-y-6">
      <HeroBanner data={data} program={program} />
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="clay bg-white p-6"
        >
          <div className="clay-soft bg-clay-peach w-12 h-12 flex items-center justify-center mb-3">
            <HiSparkles className="text-2xl text-orange-600" />
          </div>
          <h3 className="text-xl font-bold text-indigo-900 mb-2">
            What is Business Builder?
          </h3>
          <p className="text-slate-700 leading-relaxed">
            A structured, domain-wise journey that layers globally recognized
            credentials on top of {program} fundamentals. Students follow a
            <b> free-first → low-cost </b> stack and graduate with a verifiable
            portfolio that maps directly to roles and packages.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="clay bg-white p-6"
        >
          <div className="clay-soft bg-clay-mint w-12 h-12 flex items-center justify-center mb-3">
            <HiRocketLaunch className="text-2xl text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-indigo-900 mb-2">
            How It Works
          </h3>
          <ol className="space-y-2 text-slate-700">
            {[
              "Choose your target domain and role",
              "Complete the free credentials stack first",
              "Layer paid / low-cost certifications for depth",
              "Build a portfolio of artifacts that wins interviews",
              "See your projected package per certification path",
            ].map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="clay-soft bg-clay-sun w-6 h-6 flex items-center justify-center text-xs font-bold text-indigo-700 shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="clay bg-white p-6"
      >
        <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
          <HiCheckBadge className="text-emerald-500" /> Source Notes & Planning
        </h3>
        <div className="grid sm:grid-cols-2 gap-2 text-sm text-slate-700">
          {data.notes.map((n, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-emerald-500 mt-0.5">✓</span>
              <span>{n}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function ObjectivesTab({ program }) {
  const objectives = [
    {
      title: "Employability First",
      body:
        "Every credential maps to a real role and includes a required portfolio artifact.",
      icon: HiBriefcase,
      bg: "bg-clay-peach",
    },
    {
      title: "Cost-Conscious Stack",
      body:
        "Free credentials first; paid certs only when placement ROI is clear.",
      icon: HiCurrencyRupee,
      bg: "bg-clay-mint",
    },
    {
      title: "Industry-Validated",
      body:
        "Issued by Google, Microsoft, IBM, Salesforce, HubSpot, AWS and other recognized providers.",
      icon: HiCheckBadge,
      bg: "bg-clay-sky",
    },
    {
      title:
        program === "MBA" ? "30+ LPA Trajectory" : "8–18 LPA Trajectory",
      body:
        program === "MBA"
          ? "Each path is benchmarked against realistic CTC logic for premium roles."
          : "Each path equips freshers for strong first jobs with growth runway.",
      icon: HiTrophy,
      bg: "bg-clay-sun",
    },
    {
      title: "Portfolio-Driven Proof",
      body:
        "Students leave with dashboards, models, case decks, process maps — not just certificates.",
      icon: HiAcademicCap,
      bg: "bg-clay-lilac",
    },
    {
      title: "Specialization-Aligned",
      body:
        "Each path links to recommended electives so academics and credentials reinforce each other.",
      icon: HiSparkles,
      bg: "bg-clay-rose",
    },
  ];
  return (
    <div className="space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-extrabold text-indigo-900"
      >
        🎯 Program Objectives & Outcomes
      </motion.h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {objectives.map((o, i) => {
          const Icon = o.icon;
          return (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="clay bg-white p-6"
            >
              <div className={`clay-soft ${o.bg} w-14 h-14 flex items-center justify-center mb-3`}>
                <Icon className="text-2xl text-indigo-700" />
              </div>
              <h3 className="text-lg font-bold text-indigo-900 mb-2">
                {o.title}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">{o.body}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function PathwaysTab({ data }) {
  return (
    <div className="space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-extrabold text-indigo-900"
      >
        🛤️ Domain-wise Student Pathways
      </motion.h2>
      <p className="text-slate-600 -mt-3">
        Start free, layer low-cost, prove with portfolio.
      </p>
      <div className="grid md:grid-cols-2 gap-5">
        {data.roadmap.map((r, i) => (
          <motion.div
            key={r.domain}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="clay bg-white overflow-hidden"
          >
            <div className={`${domainColor(r.domain)} p-5`}>
              <h3 className="text-xl font-extrabold text-indigo-900">
                {r.domain}
              </h3>
            </div>
            <div className="p-5 space-y-3 text-sm">
              <Step color="bg-clay-mint" label="Start Free" body={r.freeStart} />
              <Step color="bg-clay-sun" label="Then Paid / Low-cost" body={r.paidAdd} />
              <Step color="bg-clay-lilac" label="Portfolio Proof" body={r.portfolio} />
              <div className="clay-inset bg-white p-3 italic text-slate-700">
                "{r.pitch}"
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Step({ color, label, body }) {
  return (
    <div className="flex gap-3">
      <div
        className={`clay-soft ${color} shrink-0 w-9 h-9 flex items-center justify-center`}
      >
        <HiArrowRight className="text-indigo-700" />
      </div>
      <div>
        <div className="text-xs font-bold uppercase text-indigo-600 tracking-wide">
          {label}
        </div>
        <div className="text-slate-700">{body}</div>
      </div>
    </div>
  );
}

function RolesTab({ data }) {
  return (
    <div className="space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-extrabold text-indigo-900"
      >
        💼 Career Role Paths · See your package
      </motion.h2>
      <div className="space-y-5">
        {data.paths.map((p, i) => (
          <motion.div
            key={p.no}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.01 }}
            className="clay bg-white p-6"
          >
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="clay-soft bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-14 h-14 flex items-center justify-center text-xl font-extrabold">
                {p.no}
              </div>
              <div className="flex-1 min-w-[200px]">
                <h3 className="text-xl font-extrabold text-indigo-900">
                  {p.role}
                </h3>
                <p className="text-sm text-slate-500">{p.mbaFit}</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="clay-soft bg-gradient-to-br from-emerald-400 to-teal-500 text-white px-5 py-3 font-extrabold text-lg flex items-center gap-2"
              >
                <HiCurrencyRupee /> {p.package}
              </motion.div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <InfoCard color="bg-clay-sky" title="Certification Stack" body={p.stack} />
              <InfoCard color="bg-clay-peach" title="Portfolio Proof" body={p.portfolio} />
              <InfoCard color="bg-clay-mint" title="Target Employers" body={p.employers} />
              <InfoCard color="bg-clay-lilac" title="CTC Logic" body={p.ctcLogic} />
            </div>
            <div className="mt-4 clay-inset bg-clay-sun p-4">
              <span className="font-extrabold text-amber-900">⚡ 90-Day Action: </span>
              <span className="text-slate-700">{p.action}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function InfoCard({ color, title, body }) {
  return (
    <div className={`clay-soft ${color} p-4`}>
      <div className="text-xs font-extrabold uppercase tracking-wide text-indigo-700 mb-1">
        {title}
      </div>
      <p className="text-slate-800 text-sm">{body}</p>
    </div>
  );
}

function CertModal({ cert, program, onClose }) {
  if (!cert) return null;
  const pkg = packageFromRelevance(cert.relevance, program);
  const Icon = DOMAIN_ICONS[cert.domain] || HiAcademicCap;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-indigo-900/40 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 30 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          onClick={(e) => e.stopPropagation()}
          className="clay bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 clay-btn bg-white w-10 h-10 flex items-center justify-center text-indigo-700"
          >
            <HiXMark />
          </button>
          <div className={`clay-soft ${domainColor(cert.domain)} w-16 h-16 flex items-center justify-center mb-4`}>
            <Icon className="text-3xl text-indigo-700" />
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            {cert.domain}
          </div>
          <h2 className="text-2xl font-extrabold text-indigo-900 mt-1">
            {cert.name}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {cert.provider} • {cert.level} • {cert.time}
          </p>
          <div className="mt-3"><Stars n={cert.relevance} /></div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mt-5 clay bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 text-white p-5 text-center"
          >
            <div className="text-xs font-bold uppercase tracking-widest opacity-90">
              Projected Package
            </div>
            <div className="text-4xl font-extrabold mt-1">{pkg}</div>
            <div className="text-xs opacity-90 mt-1">
              if you complete this certification path & build the portfolio
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-3 mt-5">
            <Info label="Cost" body={`${cert.costCategory} · ₹${Number(cert.costINR || 0).toLocaleString("en-IN")}`} />
            <Info label="Priority" body={cert.priority} />
            <Info label="MBA Specialization" body={cert.specialization} />
            <Info label="Portfolio Artifact" body={cert.artifact} />
            <Info label="Core Skills" body={cert.skills} full />
            <Info label="Best-fit Roles" body={cert.roles} full />
          </div>
          <a
            href={cert.url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 clay-btn bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-6 py-3 inline-flex items-center justify-center gap-2 font-extrabold w-full"
          >
            Open Student Pathway <HiArrowRight />
          </a>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Info({ label, body, full }) {
  return (
    <div className={`clay-soft bg-white p-3 ${full ? "sm:col-span-2" : ""}`}>
      <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
        {label}
      </div>
      <div className="text-sm text-slate-700 mt-0.5">{body || "—"}</div>
    </div>
  );
}

function CertsTab({ data, program }) {
  const [domain, setDomain] = useState("All");
  const [priority, setPriority] = useState("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);

  const domains = useMemo(
    () => ["All", ...Array.from(new Set(data.certs.map((c) => c.domain)))],
    [data]
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
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-extrabold text-indigo-900">
          🎓 Certifications Catalog
        </h2>
        <p className="text-slate-600 mt-1">
          {filtered.length} of {data.certs.length} certifications · click any
          card for your projected package.
        </p>
      </motion.div>

      <div className="clay bg-white p-4 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[200px] relative">
          <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search skills, providers, roles..."
            className="w-full pl-11 pr-4 py-3 clay-inset bg-white text-sm font-medium focus:outline-none"
          />
        </div>
        <select
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="px-4 py-3 clay-inset bg-white text-sm font-semibold text-indigo-800 focus:outline-none"
        >
          {domains.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-4 py-3 clay-inset bg-white text-sm font-semibold text-indigo-800 focus:outline-none"
        >
          {priorities.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      <motion.div layout className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <AnimatePresence>
          {filtered.map((c, i) => {
            const Icon = DOMAIN_ICONS[c.domain] || HiAcademicCap;
            const pkg = packageFromRelevance(c.relevance, program);
            return (
              <motion.button
                key={c.sno + c.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: Math.min(i * 0.03, 0.4) }}
                whileHover={{ y: -8, rotate: -0.5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpen(c)}
                className="clay bg-white p-5 text-left flex flex-col"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className={`clay-soft ${domainColor(c.domain)} w-12 h-12 flex items-center justify-center shrink-0`}>
                    <Icon className="text-xl text-indigo-700" />
                  </div>
                  <span
                    className={`clay-soft px-3 py-1 text-[10px] font-extrabold uppercase ${
                      c.priority === "High"
                        ? "bg-clay-mint text-emerald-700"
                        : c.priority === "Medium"
                        ? "bg-clay-sun text-amber-700"
                        : "bg-clay-rose text-rose-700"
                    }`}
                  >
                    {c.priority}
                  </span>
                </div>
                <h3 className="font-extrabold text-indigo-900 leading-snug">
                  {c.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {c.provider} · {c.level} · {c.time}
                </p>
                <div className="mt-2"><Stars n={c.relevance} /></div>

                <div className="clay-soft bg-gradient-to-br from-emerald-400 to-teal-500 text-white mt-4 p-3 text-center">
                  <div className="text-[10px] uppercase tracking-widest font-bold opacity-90">
                    Projected Package
                  </div>
                  <div className="text-xl font-extrabold">{pkg}</div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-semibold">
                    {c.costCategory}
                  </span>
                  <span className="text-indigo-600 font-bold flex items-center gap-1">
                    View pathway <HiArrowRight />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-slate-500 py-10">
          No certifications match these filters.
        </p>
      )}

      <CertModal cert={open} program={program} onClose={() => setOpen(null)} />
    </div>
  );
}

export default function App() {
  const [program, setProgram] = useState("MBA");
  const [active, setActive] = useState("overview");

  const data = program === "MBA" ? mbaData : bbaData;
  useEffect(() => setActive("overview"), [program]);

  return (
    <div className="min-h-full bg-clay-canvas">
      <Header program={program} setProgram={setProgram} />
      <Tabs active={active} setActive={setActive} />
      <main className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${program}-${active}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {active === "overview" && <OverviewTab data={data} program={program} />}
            {active === "objectives" && <ObjectivesTab program={program} />}
            {active === "pathways" && <PathwaysTab data={data} />}
            {active === "roles" && <RolesTab data={data} />}
            {active === "certs" && <CertsTab data={data} program={program} />}
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="relative z-10 py-6 text-center text-xs text-slate-500 font-medium">
        © {new Date().getFullYear()} KL University · Skill Development Centre ·
        Prepared 2026-05-11
      </footer>
    </div>
  );
}
