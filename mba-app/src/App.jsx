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
  HiBolt,
  HiStar,
  HiFire,
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

const HUES = ["hue-aurora", "hue-sunset", "hue-emerald", "hue-ocean", "hue-gold", "hue-candy"];
const CHIPS = ["chip-mint", "chip-peach", "chip-sky", "chip-lilac", "chip-sun", "chip-rose", "chip-teal"];
const domainHue = (d) => {
  const list = Object.keys(DOMAIN_ICONS);
  return HUES[list.indexOf(d) % HUES.length] || HUES[0];
};
const domainChip = (d) => {
  const list = Object.keys(DOMAIN_ICONS);
  return CHIPS[list.indexOf(d) % CHIPS.length] || CHIPS[0];
};

const packageFromRelevance = (score, program) => {
  const s = Number(score) || 3;
  if (program === "MBA") {
    return ["8–12 LPA", "10–16 LPA", "14–20 LPA", "20–28 LPA", "28–35+ LPA"][s - 1];
  }
  return ["3–5 LPA", "4–7 LPA", "6–9 LPA", "8–14 LPA", "12–18 LPA"][s - 1];
};

const TABS = [
  { id: "overview", label: "Overview", icon: HiSparkles, hue: "hue-aurora" },
  { id: "objectives", label: "Objectives", icon: HiTrophy, hue: "hue-gold" },
  { id: "pathways", label: "Pathways", icon: HiRocketLaunch, hue: "hue-emerald" },
  { id: "roles", label: "Role Paths", icon: HiBriefcase, hue: "hue-ocean" },
  { id: "certs", label: "Certifications", icon: HiAcademicCap, hue: "hue-candy" },
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
          transition={{ delay: i * 0.05, type: "spring", stiffness: 220 }}
          className={`text-lg ${i <= v ? "text-amber-400 drop-shadow-[0_2px_4px_rgba(251,191,36,0.5)]" : "text-slate-200"}`}
        >
          ★
        </motion.span>
      ))}
      <span className="ml-1.5 text-xs font-bold text-slate-700">{v}/5</span>
    </div>
  );
}

function ProgramSwitcher({ program, setProgram }) {
  return (
    <div className="glass-soft p-1.5 inline-flex">
      {["MBA", "BBA"].map((p) => (
        <button
          key={p}
          onClick={() => setProgram(p)}
          className={`relative px-8 sm:px-12 py-3 rounded-2xl font-extrabold text-sm sm:text-base transition-all ${
            program === p ? "text-white" : "text-indigo-600 hover:text-indigo-800"
          }`}
        >
          {program === p && (
            <motion.div
              layoutId="programPill"
              className="absolute inset-0 hue-aurora rounded-2xl glow-indigo"
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            />
          )}
          <span className="relative z-10 tracking-wide">{p}</span>
        </button>
      ))}
    </div>
  );
}

function Header({ program, setProgram }) {
  return (
    <header className="relative z-10 pt-6 pb-4 sm:pt-10 sm:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="glass-soft p-2.5">
              <img src="/logos/kl-logo.png" alt="KL" className="h-12 w-auto" />
            </div>
            <div className="glass-soft p-2.5">
              <img src="/logos/skill-logo.png" alt="Skill" className="h-12 w-auto" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-right"
          >
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-gradient-indigo leading-none">
              {program} Pathways
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1 flex items-center justify-end gap-1.5">
              <HiSparkles className="text-pink-500" />
              KL University · Skill Development Division
            </p>
          </motion.div>
        </div>
        <div className="mt-7 flex justify-center">
          <ProgramSwitcher program={program} setProgram={setProgram} />
        </div>
      </div>
    </header>
  );
}

function Tabs({ active, setActive }) {
  return (
    <nav className="sticky top-3 z-30 mx-auto max-w-7xl px-4 sm:px-6 mb-7">
      <div className="glass p-2 flex flex-wrap gap-1 justify-center">
        {TABS.map((t) => {
          const Icon = t.icon;
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`relative px-3 sm:px-5 py-2.5 rounded-2xl text-sm font-bold flex items-center gap-2 transition-all ${
                isActive ? "text-white" : "text-indigo-700 hover:text-indigo-900"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="tabPill"
                  className={`absolute inset-0 ${t.hue} rounded-2xl glow-indigo`}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
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

function StatTile({ num, label, Icon, hue, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      whileHover={{ y: -8, scale: 1.04 }}
      className="relative glass-soft p-5 shine-on-hover lift cursor-default overflow-hidden"
    >
      <div className={`absolute -top-6 -right-6 w-24 h-24 ${hue} rounded-full opacity-30 blur-2xl`} />
      <div className={`w-12 h-12 rounded-2xl ${hue} flex items-center justify-center mb-3 shadow-lg`}>
        <Icon className="text-2xl text-white drop-shadow" />
      </div>
      <div className="font-display text-4xl font-extrabold text-gradient-indigo">{num}</div>
      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mt-1">
        {label}
      </div>
    </motion.div>
  );
}

function HeroBanner({ data, program }) {
  const highlights = [
    { num: data.certs.length, label: "Global Certifications", Icon: HiAcademicCap, hue: "hue-ocean" },
    { num: data.certs.filter((c) => c.priority === "High").length, label: "High Priority", Icon: HiFire, hue: "hue-gold" },
    { num: data.paths.length, label: "Career Paths", Icon: HiBriefcase, hue: "hue-emerald" },
    { num: data.roadmap.length, label: "Domain Roadmaps", Icon: HiRocketLaunch, hue: "hue-candy" },
  ];
  const topPackage = program === "MBA" ? "30+ LPA" : "12–18 LPA";

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative glass-pop p-6 sm:p-10 overflow-hidden"
    >
      {/* decorative blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 hue-aurora rounded-full opacity-30 blur-3xl animate-float" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 hue-sunset rounded-full opacity-25 blur-3xl animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-pink-400 rounded-full sparkle" />
      <div className="absolute top-10 left-1/3 w-2 h-2 bg-amber-400 rounded-full sparkle" style={{animationDelay:"1s"}} />
      <div className="absolute bottom-12 right-1/4 w-2.5 h-2.5 bg-indigo-400 rounded-full sparkle" style={{animationDelay:"2s"}} />

      <div className="relative">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full hue-aurora text-white font-bold text-xs uppercase tracking-wider mb-5 shadow-lg"
        >
          <HiBolt className="text-amber-200" /> {data.programInfo.duration}
        </motion.div>
        <h2 className="font-display text-4xl sm:text-6xl font-extrabold leading-[1.05] text-gradient-indigo">
          {data.programInfo.title}
        </h2>
        <p className="mt-5 text-slate-700 text-base sm:text-lg max-w-3xl font-medium leading-relaxed">
          {data.programInfo.tagline}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hue-emerald text-white px-6 py-3.5 rounded-2xl font-extrabold flex items-center gap-2 glow-emerald"
          >
            <HiTrophy className="text-amber-200 text-xl" /> Target: {topPackage}
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hue-sunset text-white px-6 py-3.5 rounded-2xl font-extrabold flex items-center gap-2 glow-pink"
          >
            <HiStar className="text-amber-200 text-xl" /> {data.programInfo.target}
          </motion.div>
        </div>

        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((h, i) => (
            <StatTile key={h.label} {...h} delay={0.1 * i} />
          ))}
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
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ y: -4 }}
          className="glass p-7 relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 hue-sunset rounded-full opacity-20 blur-2xl" />
          <div className="w-14 h-14 rounded-2xl hue-sunset flex items-center justify-center mb-4 shadow-lg">
            <HiSparkles className="text-2xl text-white" />
          </div>
          <h3 className="font-display text-2xl font-extrabold text-gradient-sunset mb-3">
            What is Career Builder?
          </h3>
          <p className="text-slate-700 leading-relaxed">
            A structured, domain-wise journey that layers globally recognized
            credentials on top of <b className="text-indigo-700">{program}</b> fundamentals.
            Students follow a <b className="text-pink-600">free-first → low-cost</b> stack
            and graduate with a verifiable portfolio that maps directly to roles and packages.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ y: -4 }}
          className="glass p-7 relative overflow-hidden"
        >
          <div className="absolute -bottom-10 -right-10 w-40 h-40 hue-emerald rounded-full opacity-20 blur-2xl" />
          <div className="w-14 h-14 rounded-2xl hue-emerald flex items-center justify-center mb-4 shadow-lg">
            <HiRocketLaunch className="text-2xl text-white" />
          </div>
          <h3 className="font-display text-2xl font-extrabold text-gradient-emerald mb-3">
            How It Works
          </h3>
          <ol className="space-y-2.5 text-slate-700">
            {[
              "Choose your target domain and role",
              "Complete the free credentials stack first",
              "Layer paid / low-cost certifications for depth",
              "Build a portfolio of artifacts that wins interviews",
              "See your projected package per certification path",
            ].map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`shrink-0 w-7 h-7 rounded-xl ${HUES[i % HUES.length]} text-white text-xs font-extrabold flex items-center justify-center shadow-md`}>
                  {i + 1}
                </span>
                <span className="pt-0.5">{s}</span>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-7"
      >
        <h3 className="font-display text-2xl font-extrabold text-gradient-indigo mb-5 flex items-center gap-2.5">
          <span className="w-10 h-10 rounded-xl hue-emerald flex items-center justify-center shadow-md">
            <HiCheckBadge className="text-xl text-white" />
          </span>
          Source Notes & Planning
        </h3>
        <div className="grid sm:grid-cols-2 gap-2.5 text-sm text-slate-700">
          {data.notes.map((n, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-indigo-50/60 transition"
            >
              <span className="shrink-0 w-5 h-5 rounded-full hue-emerald flex items-center justify-center shadow">
                <HiCheckBadge className="text-white text-xs" />
              </span>
              <span>{n}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function ObjectivesTab({ program }) {
  const objectives = [
    { title: "Employability First", body: "Every credential maps to a real role and includes a required portfolio artifact.", icon: HiBriefcase, hue: "hue-sunset" },
    { title: "Cost-Conscious Stack", body: "Free credentials first; paid certs only when placement ROI is clear.", icon: HiCurrencyRupee, hue: "hue-emerald" },
    { title: "Industry-Validated", body: "Issued by Google, Microsoft, IBM, Salesforce, HubSpot, AWS and other recognized providers.", icon: HiCheckBadge, hue: "hue-ocean" },
    { title: program === "MBA" ? "30+ LPA Trajectory" : "8–18 LPA Trajectory", body: program === "MBA" ? "Each path is benchmarked against realistic CTC logic for premium roles." : "Each path equips freshers for strong first jobs with growth runway.", icon: HiTrophy, hue: "hue-gold" },
    { title: "Portfolio-Driven Proof", body: "Students leave with dashboards, models, case decks, process maps — not just certificates.", icon: HiAcademicCap, hue: "hue-aurora" },
    { title: "Specialization-Aligned", body: "Each path links to recommended electives so academics and credentials reinforce each other.", icon: HiSparkles, hue: "hue-candy" },
  ];
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-display text-4xl font-extrabold text-gradient-indigo">
          Program Objectives & Outcomes
        </h2>
        <p className="text-slate-600 mt-2 font-medium">Six pillars that drive measurable career outcomes.</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {objectives.map((o, i) => {
          const Icon = o.icon;
          return (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 180 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="glass p-6 relative overflow-hidden shine-on-hover"
            >
              <div className={`absolute -top-12 -right-12 w-32 h-32 ${o.hue} rounded-full opacity-25 blur-2xl`} />
              <div className={`relative w-14 h-14 rounded-2xl ${o.hue} flex items-center justify-center mb-4 shadow-lg`}>
                <Icon className="text-2xl text-white" />
              </div>
              <h3 className="font-display text-lg font-extrabold text-slate-900 mb-2">
                {o.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{o.body}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function Step({ tone, label, body }) {
  return (
    <div className="flex gap-3">
      <div className={`${tone} shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-md`}>
        <HiArrowRight className="text-white" />
      </div>
      <div>
        <div className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600">
          {label}
        </div>
        <div className="text-slate-700 mt-0.5">{body}</div>
      </div>
    </div>
  );
}

function PathwaysTab({ data }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-display text-4xl font-extrabold text-gradient-sunset">
          Domain-wise Student Pathways
        </h2>
        <p className="text-slate-600 mt-2 font-medium">Start free, layer low-cost, prove with portfolio.</p>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-5">
        {data.roadmap.map((r, i) => (
          <motion.div
            key={r.domain}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -8 }}
            className="glass overflow-hidden relative lift"
          >
            <div className={`${domainHue(r.domain)} p-6 text-white relative overflow-hidden`}>
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
              <h3 className="font-display text-xl font-extrabold relative drop-shadow">
                {r.domain}
              </h3>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <Step tone="hue-emerald" label="Start Free" body={r.freeStart} />
              <Step tone="hue-gold" label="Then Paid / Low-cost" body={r.paidAdd} />
              <Step tone="hue-candy" label="Portfolio Proof" body={r.portfolio} />
              <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-pink-50 border border-indigo-100 p-4 italic text-slate-700 font-medium">
                "{r.pitch}"
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function InfoCard({ chip, title, body }) {
  return (
    <div className={`${chip} p-4 rounded-2xl shadow-sm`}>
      <div className="text-[10px] font-extrabold uppercase tracking-widest opacity-80 mb-1">
        {title}
      </div>
      <p className="text-sm font-medium leading-relaxed">{body}</p>
    </div>
  );
}

function RolesTab({ data }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-display text-4xl font-extrabold text-gradient-emerald">
          Career Role Paths · See your package
        </h2>
        <p className="text-slate-600 mt-2 font-medium">Each role maps to a stack, portfolio proof, and target CTC.</p>
      </motion.div>
      <div className="space-y-5">
        {data.paths.map((p, i) => (
          <motion.div
            key={p.no}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.01 }}
            className="glass p-6 relative overflow-hidden lift"
          >
            <div className={`absolute -top-12 -right-12 w-44 h-44 ${HUES[i % HUES.length]} rounded-full opacity-20 blur-3xl`} />
            <div className="relative flex flex-wrap items-center gap-4 mb-5">
              <div className={`w-16 h-16 rounded-2xl ${HUES[i % HUES.length]} text-white flex items-center justify-center font-display text-2xl font-extrabold shadow-lg`}>
                {p.no}
              </div>
              <div className="flex-1 min-w-[200px]">
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
                  {p.role}
                </h3>
                <p className="text-sm text-slate-600 mt-1">{p.mbaFit}</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05, rotate: -1 }}
                className="hue-emerald text-white px-5 py-3 rounded-2xl font-extrabold text-lg flex items-center gap-2 glow-emerald"
              >
                <HiCurrencyRupee className="text-amber-200" /> {p.package}
              </motion.div>
            </div>
            <div className="grid md:grid-cols-2 gap-3 text-sm relative">
              <InfoCard chip="chip-sky" title="Certification Stack" body={p.stack} />
              <InfoCard chip="chip-peach" title="Portfolio Proof" body={p.portfolio} />
              <InfoCard chip="chip-mint" title="Target Employers" body={p.employers} />
              <InfoCard chip="chip-lilac" title="CTC Logic" body={p.ctcLogic} />
            </div>
            <div className="mt-4 rounded-2xl chip-sun p-4 flex items-start gap-3 relative">
              <HiBolt className="text-2xl shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold">90-Day Action: </span>
                <span className="font-medium">{p.action}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Info({ label, body, full }) {
  return (
    <div className={`glass-soft p-3.5 ${full ? "sm:col-span-2" : ""}`}>
      <div className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600">
        {label}
      </div>
      <div className="text-sm text-slate-800 mt-1 font-medium">{body || "—"}</div>
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
        className="fixed inset-0 z-50 bg-indigo-950/50 backdrop-blur-md flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.85, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.85, y: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-pop max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-xl hue-aurora text-white flex items-center justify-center shadow-lg hover:scale-110 transition"
          >
            <HiXMark />
          </button>
          <div className={`w-16 h-16 rounded-2xl ${domainHue(cert.domain)} flex items-center justify-center mb-4 shadow-xl`}>
            <Icon className="text-3xl text-white" />
          </div>
          <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${domainChip(cert.domain)}`}>
            {cert.domain}
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 leading-tight">
            {cert.name}
          </h2>
          <p className="text-sm text-slate-600 mt-2 font-medium">
            {cert.provider} • {cert.level} • {cert.time}
          </p>
          <div className="mt-3"><Stars n={cert.relevance} /></div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mt-5 hue-emerald text-white p-6 text-center rounded-3xl relative overflow-hidden glow-emerald"
          >
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-amber-300/30 rounded-full blur-2xl" />
            <div className="relative">
              <div className="text-xs font-extrabold uppercase tracking-widest opacity-95 flex items-center justify-center gap-1.5">
                <HiTrophy className="text-amber-200" /> Projected Package
              </div>
              <div className="font-display text-5xl font-extrabold mt-1 drop-shadow">{pkg}</div>
              <div className="text-xs opacity-90 mt-2">
                if you complete this certification path & build the portfolio
              </div>
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
            className="mt-6 hue-aurora text-white px-6 py-4 rounded-2xl inline-flex items-center justify-center gap-2 font-extrabold w-full glow-indigo hover:scale-[1.02] transition shine-on-hover"
          >
            Open Student Pathway <HiArrowRight />
          </a>
        </motion.div>
      </motion.div>
    </AnimatePresence>
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
      if (!`${c.name} ${c.provider} ${c.skills} ${c.roles}`.toLowerCase().includes(s)) return false;
    }
    return true;
  });

  const priorityChip = (p) =>
    p === "High" ? "chip-rose" : p === "Medium" ? "chip-sun" : "chip-sky";

  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-display text-4xl font-extrabold text-gradient-sunset">
          Certifications Catalog
        </h2>
        <p className="text-slate-600 mt-2 font-medium">
          <b className="text-indigo-700">{filtered.length}</b> of {data.certs.length} certifications · click any
          card for your projected package.
        </p>
      </motion.div>

      <div className="glass p-4 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[220px] relative">
          <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500 text-lg" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search skills, providers, roles..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border-2 border-indigo-100 focus:border-indigo-400 text-sm font-medium focus:outline-none transition"
          />
        </div>
        <select
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="px-4 py-3 rounded-2xl bg-white border-2 border-indigo-100 focus:border-indigo-400 text-sm font-bold text-indigo-800 focus:outline-none transition"
        >
          {domains.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-4 py-3 rounded-2xl bg-white border-2 border-indigo-100 focus:border-indigo-400 text-sm font-bold text-indigo-800 focus:outline-none transition"
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
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: Math.min(i * 0.03, 0.4) }}
                whileHover={{ y: -10, rotate: -0.4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpen(c)}
                className="glass p-5 text-left flex flex-col relative overflow-hidden shine-on-hover lift"
              >
                <div className={`absolute -top-10 -right-10 w-28 h-28 ${domainHue(c.domain)} rounded-full opacity-25 blur-2xl`} />
                <div className="relative flex items-start justify-between gap-2 mb-3">
                  <div className={`w-12 h-12 rounded-2xl ${domainHue(c.domain)} flex items-center justify-center shrink-0 shadow-lg`}>
                    <Icon className="text-xl text-white" />
                  </div>
                  <span className={`${priorityChip(c.priority)} px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest`}>
                    {c.priority}
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-slate-900 leading-snug relative">
                  {c.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium relative">
                  {c.provider} · {c.level} · {c.time}
                </p>
                <div className="mt-2 relative"><Stars n={c.relevance} /></div>

                <div className="relative hue-emerald text-white mt-4 p-3.5 rounded-2xl text-center shadow-lg overflow-hidden">
                  <div className="absolute -top-3 -right-3 w-16 h-16 bg-white/20 rounded-full blur-xl" />
                  <div className="relative text-[10px] uppercase tracking-widest font-bold opacity-95">
                    Projected Package
                  </div>
                  <div className="relative font-display text-2xl font-extrabold">{pkg}</div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs relative">
                  <span className="text-slate-600 font-bold">
                    {c.costCategory}
                  </span>
                  <span className="text-indigo-600 font-extrabold flex items-center gap-1">
                    View pathway <HiArrowRight />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="glass p-10 text-center">
          <p className="text-slate-600 font-medium">No certifications match these filters.</p>
        </div>
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
    <div className="min-h-full canvas-bg">
      <span className="blob blob-mint" aria-hidden />
      <span className="blob blob-sun" aria-hidden />
      <Header program={program} setProgram={setProgram} />
      <Tabs active={active} setActive={setActive} />
      <main className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${program}-${active}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28 }}
          >
            {active === "overview" && <OverviewTab data={data} program={program} />}
            {active === "objectives" && <ObjectivesTab program={program} />}
            {active === "pathways" && <PathwaysTab data={data} />}
            {active === "roles" && <RolesTab data={data} />}
            {active === "certs" && <CertsTab data={data} program={program} />}
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="relative z-10 py-8 text-center text-xs text-slate-500 font-semibold">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-soft">
          <HiSparkles className="text-pink-500" />
          © {new Date().getFullYear()} KL University · Skill Development Division
          <HiSparkles className="text-indigo-500" />
        </div>
      </footer>
    </div>
  );
}
