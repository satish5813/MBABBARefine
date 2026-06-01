import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiChartBar, HiSparkles, HiAcademicCap, HiBriefcase, HiRocketLaunch,
  HiCurrencyRupee, HiTrophy, HiArrowRight, HiXMark, HiCheckBadge,
  HiMagnifyingGlass, HiBolt, HiStar, HiFire, HiUsers, HiCog8Tooth,
  HiShieldCheck, HiLightBulb, HiChartPie,
} from "react-icons/hi2";
import mbaData from "./data.json";
import { bbaData } from "./bbaData";

/* ─── Domain config ───────────────────────────────────────────────── */
const DOMAIN_META = {
  "Business Analytics & BI":            { icon: HiChartBar,     color:"#6366F1", bg:"#EEF2FF", border:"#C7D2FE" },
  "Analytics & BI":                     { icon: HiChartBar,     color:"#6366F1", bg:"#EEF2FF", border:"#C7D2FE" },
  "AI & Business Automation":           { icon: HiSparkles,     color:"#8B5CF6", bg:"#F5F3FF", border:"#DDD6FE" },
  "AI & Productivity":                  { icon: HiSparkles,     color:"#8B5CF6", bg:"#F5F3FF", border:"#DDD6FE" },
  "Digital Marketing & Growth":         { icon: HiRocketLaunch, color:"#EC4899", bg:"#FDF2F8", border:"#FBCFE8" },
  "Digital Marketing":                  { icon: HiRocketLaunch, color:"#EC4899", bg:"#FDF2F8", border:"#FBCFE8" },
  "Sales, CRM & Revenue Operations":    { icon: HiBriefcase,    color:"#F97316", bg:"#FFF7ED", border:"#FED7AA" },
  "Sales & CRM":                        { icon: HiBriefcase,    color:"#F97316", bg:"#FFF7ED", border:"#FED7AA" },
  "Finance, FinTech & FP&A":            { icon: HiCurrencyRupee,color:"#10B981", bg:"#ECFDF5", border:"#A7F3D0" },
  "Finance":                            { icon: HiCurrencyRupee,color:"#10B981", bg:"#ECFDF5", border:"#A7F3D0" },
  "HR, People Analytics & Talent":      { icon: HiUsers,        color:"#0EA5E9", bg:"#F0F9FF", border:"#BAE6FD" },
  "Operations, Supply Chain & ERP":     { icon: HiCog8Tooth,    color:"#14B8A6", bg:"#F0FDFA", border:"#99F6E4" },
  "Operations":                         { icon: HiCog8Tooth,    color:"#14B8A6", bg:"#F0FDFA", border:"#99F6E4" },
  "Project, Product & Agile":           { icon: HiLightBulb,    color:"#F59E0B", bg:"#FFFBEB", border:"#FDE68A" },
  "Project & Product":                  { icon: HiLightBulb,    color:"#F59E0B", bg:"#FFFBEB", border:"#FDE68A" },
  "Risk, Compliance & Cyber-GRC":       { icon: HiShieldCheck,  color:"#EF4444", bg:"#FEF2F2", border:"#FECACA" },
  "Consulting, Strategy & Case Skills": { icon: HiChartPie,     color:"#6366F1", bg:"#EEF2FF", border:"#C7D2FE" },
  "Consulting Prep":                    { icon: HiChartPie,     color:"#6D28D9", bg:"#F5F3FF", border:"#DDD6FE" },
};
const getDM = (d) => DOMAIN_META[d] || { icon: HiAcademicCap, color:"#6366F1", bg:"#EEF2FF", border:"#C7D2FE" };

/* ─── Specialization data ─────────────────────────────────────────── */
const MBA_SPECS = [
  { domain:"Business Analytics & BI",
    roles:[
      {t:"Business Analyst",s:"₹10–18 LPA",open:"8K+",cos:"Deloitte · TCS · Infosys"},
      {t:"BI Developer",s:"₹9–16 LPA",open:"5K+",cos:"Cognizant · Wipro · IBM"},
      {t:"Data Analyst",s:"₹8–14 LPA",open:"9K+",cos:"Amazon · Flipkart · Swiggy"},
      {t:"Analytics Manager",s:"₹18–28 LPA",open:"3K+",cos:"KPMG · Accenture · Google"},
    ],
    openings:"25K+", topCtc:"₹28L", src:"NASSCOM 2024",
    optCerts:[
      {n:"Google Data Analytics Certificate",c:"Free",jobs:"18K+",jobSrc:"Google/Coursera 2024",targetRoles:"Data Analyst · BI Analyst",pkg:"₹10–18 LPA",capstone:"Cyclistic bike-share 6-case analysis — clean, analyse & visualise in R/Tableau on Kaggle",impl:"6 courses · ~40 hrs · Coursera · self-paced audit"},
      {n:"NPTEL Business Analytics",c:"₹1,100",jobs:"12K+",jobSrc:"NPTEL 2024",targetRoles:"Business Analyst · Analytics Manager",pkg:"₹12–20 LPA",capstone:"Retail demand forecasting model — regression + trend report submitted on NPTEL portal",impl:"12-week IIT-led · weekly MCQ + assignments · ₹1,100 proctored exam"},
      {n:"Bloomberg Finance Fundamentals",c:"Free",jobs:"10K+",jobSrc:"Bloomberg LP 2024",targetRoles:"Business Analyst · Analytics Manager",pkg:"₹12–20 LPA",capstone:"Bloomberg data analysis project — extract financial datasets, analyse market trends & present BI insights report",impl:"~6 hrs on Bloomberg Platform · access via KL University Bloomberg Terminal · complete all 3 modules"},
    ]},
  { domain:"AI & Business Automation",
    roles:[
      {t:"AI Strategy Consultant",s:"₹14–22 LPA",open:"4K+",cos:"McKinsey · BCG · Deloitte"},
      {t:"Automation Analyst",s:"₹10–16 LPA",open:"6K+",cos:"UiPath · Infosys · TCS"},
      {t:"ML Business Analyst",s:"₹12–20 LPA",open:"5K+",cos:"Microsoft · IBM · Oracle"},
      {t:"AI Product Manager",s:"₹18–30 LPA",open:"3K+",cos:"Google · Amazon · Flipkart"},
    ],
    openings:"18K+", topCtc:"₹32L", src:"NASSCOM AI 2024",
    optCerts:[
      {n:"IBM AI Fundamentals (Coursera)",c:"Free",jobs:"14K+",jobSrc:"IBM/Coursera 2024",targetRoles:"AI Strategy Consultant · ML Business Analyst",pkg:"₹12–22 LPA",capstone:"Sentiment analysis app built with IBM Watson NLP APIs — deploy + document findings",impl:"5 IBM badges · ~30 hrs · Coursera free audit · earn digital IBM badge"},
      {n:"NPTEL AI for Managers",c:"₹1,100",jobs:"8K+",jobSrc:"NPTEL 2024",targetRoles:"AI Product Manager · Automation Analyst",pkg:"₹14–22 LPA",capstone:"AI adoption roadmap presentation for an assigned industry vertical — strategy + ROI deck",impl:"8-week IIT · video lectures + quizzes · ₹1,100 NPTEL proctored exam"},
    ]},
  { domain:"Digital Marketing & Growth",
    roles:[
      {t:"Digital Marketing Manager",s:"₹8–16 LPA",open:"10K+",cos:"Dentsu · Publicis · WPP India"},
      {t:"Performance Marketer",s:"₹9–15 LPA",open:"8K+",cos:"Zomato · Swiggy · Nykaa"},
      {t:"Growth Hacker",s:"₹10–18 LPA",open:"5K+",cos:"CRED · Meesho · OYO"},
      {t:"CMO Track",s:"₹22–35+ LPA",open:"7K+",cos:"HUL · P&G · Marico"},
    ],
    openings:"30K+", topCtc:"₹25L", src:"India Skills Report 2025",
    optCerts:[
      {n:"Google Digital Marketing & E-commerce",c:"Free",jobs:"22K+",jobSrc:"Google Career Certs 2024",targetRoles:"Digital Marketing Manager · Performance Marketer",pkg:"₹8–16 LPA",capstone:"End-to-end Google Ads + SEO audit campaign for a practice brand — ad copy, keywords & report",impl:"7 courses · ~180 hrs · Google Career Certs · free"},
      {n:"HubSpot Inbound Marketing",c:"Free",jobs:"15K+",jobSrc:"HubSpot Academy 2024",targetRoles:"Growth Hacker · CMO Track",pkg:"₹10–18 LPA",capstone:"Inbound campaign blueprint — buyer persona + content map + email nurture workflow deck",impl:"9 lessons · ~4 hrs · HubSpot Academy free · 60-question exam"},
    ]},
  { domain:"Sales, CRM & Revenue Operations",
    roles:[
      {t:"Sales Manager",s:"₹10–18 LPA",open:"15K+",cos:"Salesforce · HubSpot · Zoho"},
      {t:"CRM Analyst",s:"₹8–14 LPA",open:"8K+",cos:"TCS · HCL · Infosys"},
      {t:"Revenue Ops Lead",s:"₹14–22 LPA",open:"4K+",cos:"Freshworks · Chargebee · Razorpay"},
      {t:"KAM",s:"₹12–20 LPA",open:"13K+",cos:"HDFC · ICICI · Axis Bank"},
    ],
    openings:"40K+", topCtc:"₹22L", src:"LinkedIn India 2024",
    optCerts:[
      {n:"Salesforce Trailhead (CRM Basics)",c:"Free",jobs:"28K+",jobSrc:"Salesforce 2024",targetRoles:"CRM Analyst · Revenue Ops Lead",pkg:"₹8–14 LPA",capstone:"Build a custom CRM pipeline — leads, opportunities, dashboards in Trailhead Playground org",impl:"Trailhead.com · Admin Beginner path · free · earn Ranger badge"},
      {n:"HubSpot Sales Software Cert",c:"Free",jobs:"16K+",jobSrc:"HubSpot Academy 2024",targetRoles:"Sales Manager · KAM",pkg:"₹10–18 LPA",capstone:"Sales pipeline setup + deal stage automation + contact sequence in HubSpot CRM sandbox",impl:"5 lessons · ~2 hrs · HubSpot Academy free · certification exam"},
    ]},
  { domain:"Finance, FinTech & FP&A",
    roles:[
      {t:"Financial Analyst",s:"₹8–16 LPA",open:"8K+",cos:"KPMG · Deloitte · EY"},
      {t:"FP&A Manager",s:"₹14–24 LPA",open:"4K+",cos:"Goldman Sachs · JP Morgan · Citi"},
      {t:"FinTech Product Analyst",s:"₹12–20 LPA",open:"5K+",cos:"Razorpay · Paytm · PhonePe"},
      {t:"CFO Track",s:"₹25–40+ LPA",open:"5K+",cos:"HDFC Bank · Infosys · Reliance"},
    ],
    openings:"22K+", topCtc:"₹35L", src:"NASSCOM FinTech 2024",
    optCerts:[
      {n:"NPTEL Financial Management",c:"₹1,100",jobs:"14K+",jobSrc:"NASSCOM FinTech 2024",targetRoles:"Financial Analyst · FP&A Manager",pkg:"₹8–16 LPA",capstone:"3-year P&L + balance sheet projection for a simulated firm — submitted on NPTEL portal",impl:"12-week IIT · case assignments · ₹1,100 NPTEL proctored exam"},
      {n:"CFI Financial Modeling Intro",c:"Free",jobs:"10K+",jobSrc:"CFI Institute 2024",targetRoles:"FinTech Product Analyst · CFO Track",pkg:"₹12–20 LPA",capstone:"3-statement Excel financial model with DCF valuation for a sample company",impl:"3 modules · ~8 hrs · CFI free · build Excel capstone"},
      {n:"Bloomberg Market Concepts (BMC)",c:"Free",jobs:"15K+",jobSrc:"Bloomberg LP 2024",targetRoles:"Financial Analyst · FP&A Manager",pkg:"₹10–20 LPA",capstone:"Bloomberg Terminal simulation — analyse macroeconomic data, fixed income pricing & equity valuation across 4 modules",impl:"~8 hrs self-paced on Bloomberg · access via KL Bloomberg Terminal · pass all 4 module assessments · earn BMC digital badge"},
    ]},
  { domain:"HR, People Analytics & Talent",
    roles:[
      {t:"HR Business Partner",s:"₹8–14 LPA",open:"5K+",cos:"TCS · Wipro · Infosys"},
      {t:"People Analytics Lead",s:"₹12–20 LPA",open:"3K+",cos:"Accenture · Deloitte · IBM"},
      {t:"Talent Acquisition Manager",s:"₹10–16 LPA",open:"4K+",cos:"HCL · Capgemini · Cognizant"},
      {t:"CHRO Track",s:"₹22–35+ LPA",open:"3K+",cos:"Mahindra · ITC · Bajaj"},
    ],
    openings:"15K+", topCtc:"₹28L", src:"LinkedIn India 2024",
    optCerts:[
      {n:"NPTEL Human Resource Management",c:"₹1,100",jobs:"10K+",jobSrc:"NASSCOM HR 2024",targetRoles:"HR Business Partner · People Analytics Lead",pkg:"₹8–14 LPA",capstone:"HR policy design doc + people analytics dashboard for an assigned org case",impl:"8-week IIT · MCQ assignments · ₹1,100 NPTEL proctored exam"},
      {n:"SHRM Essentials of HR (Free Trial)",c:"Free",jobs:"7K+",jobSrc:"SHRM India 2024",targetRoles:"Talent Acquisition Manager · CHRO Track",pkg:"₹10–16 LPA",capstone:"HR audit checklist + talent acquisition plan for a simulated 200-person company",impl:"SHRM free trial · 5 modules · core HR competencies · online"},
    ]},
  { domain:"Operations, Supply Chain & ERP",
    roles:[
      {t:"Operations Manager",s:"₹10–18 LPA",open:"7K+",cos:"Amazon · Flipkart · Delhivery"},
      {t:"Supply Chain Analyst",s:"₹8–14 LPA",open:"6K+",cos:"Maersk · DHL · Reliance"},
      {t:"ERP Consultant",s:"₹9–16 LPA",open:"4K+",cos:"SAP · Oracle · Infosys"},
      {t:"COO Track",s:"₹20–35+ LPA",open:"3K+",cos:"Tata · L&T · Mahindra"},
    ],
    openings:"20K+", topCtc:"₹30L", src:"IBEF Manufacturing 2024",
    optCerts:[
      {n:"NPTEL Supply Chain Management",c:"₹1,100",jobs:"12K+",jobSrc:"IBEF 2024",targetRoles:"Supply Chain Analyst · Operations Manager",pkg:"₹8–14 LPA",capstone:"End-to-end supply chain map with inventory optimisation for a case manufacturer",impl:"12-week IIT · case studies + quizzes · ₹1,100 NPTEL exam"},
      {n:"Google Project Management Cert",c:"Free",jobs:"10K+",jobSrc:"Google Career Certs 2024",targetRoles:"ERP Consultant · COO Track",pkg:"₹9–16 LPA",capstone:"Full project charter + Agile sprint plan + stakeholder risk register for capstone project",impl:"6 courses · ~180 hrs · Coursera free audit"},
    ]},
  { domain:"Project, Product & Agile",
    roles:[
      {t:"Product Manager",s:"₹14–24 LPA",open:"6K+",cos:"Flipkart · Swiggy · CRED"},
      {t:"Agile Scrum Master",s:"₹10–18 LPA",open:"5K+",cos:"Infosys · TCS · Capgemini"},
      {t:"Project Manager",s:"₹9–16 LPA",open:"5K+",cos:"Wipro · HCL · Accenture"},
      {t:"VP Product Track",s:"₹25–40+ LPA",open:"2K+",cos:"Google · Microsoft · Razorpay"},
    ],
    openings:"18K+", topCtc:"₹35L", src:"Product School India 2024",
    optCerts:[
      {n:"Google Project Management Certificate",c:"Free",jobs:"14K+",jobSrc:"Google Career Certs 2024",targetRoles:"Project Manager · Product Manager",pkg:"₹9–16 LPA",capstone:"Sauce & Spoon restaurant ordering system — full PM lifecycle simulation with Agile artifacts",impl:"6 courses · ~180 hrs · Coursera free audit"},
      {n:"NPTEL Agile & Scrum Basics",c:"₹1,100",jobs:"8K+",jobSrc:"NPTEL 2024",targetRoles:"Agile Scrum Master · VP Product Track",pkg:"₹10–18 LPA",capstone:"Sprint retrospective + product backlog + velocity chart for an assigned software product",impl:"8-week IIT · sprint simulations · ₹1,100 NPTEL proctored exam"},
    ]},
  { domain:"Risk, Compliance & Cyber-GRC",
    roles:[
      {t:"Risk Analyst",s:"₹8–14 LPA",open:"4K+",cos:"KPMG · Deloitte · PwC"},
      {t:"Compliance Manager",s:"₹10–18 LPA",open:"4K+",cos:"RBI · SEBI · IRDAI"},
      {t:"Cyber-GRC Consultant",s:"₹12–20 LPA",open:"3K+",cos:"Infosys · TCS · HCL"},
      {t:"CISO Track",s:"₹25–40+ LPA",open:"1K+",cos:"HDFC Bank · TCS · Wipro"},
    ],
    openings:"12K+", topCtc:"₹32L", src:"NASSCOM Security 2024",
    optCerts:[
      {n:"ISC2 Certified in Cybersecurity (CC)",c:"Free",jobs:"8K+",jobSrc:"ISC2 India 2024",targetRoles:"Cyber-GRC Consultant · CISO Track",pkg:"₹8–14 LPA",capstone:"Cybersecurity risk assessment + incident response plan for a simulated SME",impl:"~14 hrs · ISC2 self-paced free · register ISC2.org · pass CC exam"},
      {n:"NPTEL Risk Management",c:"₹1,100",jobs:"6K+",jobSrc:"NPTEL 2024",targetRoles:"Risk Analyst · Compliance Manager",pkg:"₹10–18 LPA",capstone:"Risk register + mitigation matrix for an assigned industry compliance scenario",impl:"8-week IIT · case-based MCQs · ₹1,100 NPTEL proctored exam"},
    ]},
  { domain:"Consulting, Strategy & Case Skills",
    roles:[
      {t:"Management Consultant",s:"₹12–22 LPA",open:"3K+",cos:"McKinsey · BCG · Bain"},
      {t:"Strategy Analyst",s:"₹10–18 LPA",open:"4K+",cos:"Deloitte · EY · KPMG"},
      {t:"Business Transformation Lead",s:"₹16–28 LPA",open:"3K+",cos:"Accenture · IBM · Capgemini"},
      {t:"Partner Track",s:"₹35–50+ LPA",open:"<1K",cos:"MBB India · Big 4 · IB firms"},
    ],
    openings:"10K+", topCtc:"₹40L", src:"MBB India Placement 2024",
    optCerts:[
      {n:"BCG Strategy Open Course",c:"Free",jobs:"7K+",jobSrc:"BCG/Coursera 2024",targetRoles:"Strategy Analyst · Management Consultant",pkg:"₹12–22 LPA",capstone:"BCG-style case solution with slide deck — problem → hypothesis → data → recommendation",impl:"BCG website free · 4 modules + case library · complete all"},
      {n:"NPTEL Strategic Management",c:"₹1,100",jobs:"6K+",jobSrc:"NPTEL 2024",targetRoles:"Business Transformation Lead · Partner Track",pkg:"₹10–18 LPA",capstone:"PESTLE + Porter's 5 + SWOT analysis + growth strategy slide deck for assigned firm",impl:"12-week IIT · strategy case analyses · ₹1,100 NPTEL proctored exam"},
      {n:"Bloomberg Market Concepts (BMC)",c:"Free",jobs:"8K+",jobSrc:"Bloomberg LP 2024",targetRoles:"Strategy Analyst · Management Consultant",pkg:"₹12–22 LPA",capstone:"Macro-economic case analysis using Bloomberg data — build market sizing model for an assigned consulting case",impl:"~8 hrs self-paced Bloomberg · university Terminal access · pass 4 module assessments · earn BMC digital badge"},
    ]},
];

const BBA_SPECS = [
  { domain:"Analytics & BI",
    roles:[
      {t:"Junior Data Analyst",s:"₹3–5 LPA",open:"8K+",cos:"TCS · Wipro · Infosys"},
      {t:"BI Analyst Trainee",s:"₹4–7 LPA",open:"5K+",cos:"Cognizant · HCL · Capgemini"},
      {t:"Analytics Associate",s:"₹5–9 LPA",open:"4K+",cos:"Amazon · Flipkart · Swiggy"},
      {t:"Analytics Manager",s:"₹9–14 LPA",open:"3K+",cos:"Deloitte · KPMG · Accenture"},
    ],
    openings:"20K+", topCtc:"₹12L", src:"NASSCOM 2024",
    optCerts:[
      {n:"Google Data Analytics Certificate",c:"Free",jobs:"16K+",jobSrc:"Google/Coursera 2024",targetRoles:"Junior Data Analyst · BI Analyst Trainee",pkg:"₹4–7 LPA",capstone:"Cyclistic bike-share analysis — clean data, analyse trends & present findings on Google Sheets",impl:"6 courses · ~40 hrs · Coursera free audit"},
      {n:"NPTEL Data Analysis",c:"₹1,100",jobs:"9K+",jobSrc:"NPTEL 2024",targetRoles:"Analytics Associate · Analytics Manager",pkg:"₹5–9 LPA",capstone:"Sales data analysis + trend visualisation — Excel/Python project submitted on NPTEL portal",impl:"8-week IIT · Excel/Python exercises · ₹1,100 proctored exam"},
      {n:"Bloomberg Finance Fundamentals",c:"Free",jobs:"7K+",jobSrc:"Bloomberg LP 2024",targetRoles:"Analytics Associate · BI Analyst Trainee",pkg:"₹5–9 LPA",capstone:"Financial data analysis using Bloomberg — extract equity/market data & create Excel dashboard report",impl:"~6 hrs on Bloomberg Platform · KL University Terminal access · complete all 3 modules"},
    ]},
  { domain:"Digital Marketing",
    roles:[
      {t:"Social Media Executive",s:"₹3–5 LPA",open:"10K+",cos:"Dentsu · Publicis · WPP India"},
      {t:"SEO Analyst",s:"₹3–6 LPA",open:"7K+",cos:"iProspect · Performics · Webchutney"},
      {t:"Digital Marketing Exec",s:"₹4–8 LPA",open:"8K+",cos:"Zomato · Nykaa · Meesho"},
      {t:"Marketing Manager",s:"₹8–14 LPA",open:"3K+",cos:"HUL · P&G · Marico"},
    ],
    openings:"28K+", topCtc:"₹14L", src:"India Skills Report 2025",
    optCerts:[
      {n:"Google Digital Marketing Fundamentals",c:"Free",jobs:"20K+",jobSrc:"Google Skillshop 2024",targetRoles:"Digital Marketing Exec · SEO Analyst",pkg:"₹4–8 LPA",capstone:"Google Ads Search campaign setup + keyword plan for a practice brand on Google Skillshop",impl:"Google Skillshop · ~10 hrs · free · all units + final assessment"},
      {n:"Meta Blueprint Basics",c:"Free",jobs:"14K+",jobSrc:"Meta Blueprint 2024",targetRoles:"Social Media Executive · Marketing Manager",pkg:"₹4–8 LPA",capstone:"Facebook Ads campaign structure + creative brief for an assigned BBA brand project",impl:"Meta Blueprint free · 3 core courses · ~6 hrs · Digital Marketing Associate badge"},
    ]},
  { domain:"Sales & CRM",
    roles:[
      {t:"Sales Executive",s:"₹3–5 LPA",open:"15K+",cos:"HDFC Life · Bajaj Allianz · Policybazaar"},
      {t:"CRM Coordinator",s:"₹3–6 LPA",open:"8K+",cos:"Zoho · Freshworks · Salesforce India"},
      {t:"Inside Sales Rep",s:"₹4–7 LPA",open:"10K+",cos:"Meesho · Lenskart · UrbanClap"},
      {t:"Sales Manager",s:"₹8–14 LPA",open:"5K+",cos:"ICICI Bank · Axis Bank · SBI"},
    ],
    openings:"38K+", topCtc:"₹14L", src:"LinkedIn India 2024",
    optCerts:[
      {n:"HubSpot Sales Software Certificate",c:"Free",jobs:"22K+",jobSrc:"HubSpot Academy 2024",targetRoles:"Sales Executive · Inside Sales Rep",pkg:"₹4–7 LPA",capstone:"Full sales pipeline + email sequence + deal stage setup in HubSpot CRM sandbox",impl:"HubSpot Academy free · 5 lessons · ~2 hrs · certification exam"},
      {n:"Salesforce Trailhead CRM Basics",c:"Free",jobs:"18K+",jobSrc:"Salesforce 2024",targetRoles:"CRM Coordinator · Sales Manager",pkg:"₹4–7 LPA",capstone:"Salesforce org setup — leads, contacts, reports + dashboards in Trailhead Playground",impl:"Trailhead.com free · Salesforce Basics trail · Ranger badge"},
    ]},
  { domain:"Finance",
    roles:[
      {t:"Accounts Executive",s:"₹3–5 LPA",open:"8K+",cos:"Deloitte · EY · PwC India"},
      {t:"Finance Analyst Trainee",s:"₹4–7 LPA",open:"5K+",cos:"KPMG · Grant Thornton · BDO"},
      {t:"Banking Associate",s:"₹4–8 LPA",open:"4K+",cos:"HDFC · ICICI · Kotak Mahindra"},
      {t:"Finance Manager",s:"₹9–14 LPA",open:"3K+",cos:"Bajaj Finance · Reliance · Tata Capital"},
    ],
    openings:"20K+", topCtc:"₹14L", src:"NASSCOM FinTech 2024",
    optCerts:[
      {n:"NPTEL Financial Accounting",c:"₹1,100",jobs:"12K+",jobSrc:"NASSCOM FinTech 2024",targetRoles:"Accounts Executive · Finance Analyst Trainee",pkg:"₹4–7 LPA",capstone:"Journal entries + trial balance + final accounts for a simulated SME — submitted on NPTEL",impl:"8-week IIT · balance sheet exercises · ₹1,100 NPTEL exam"},
      {n:"Wall Street Mojo Finance Basics",c:"Free",jobs:"8K+",jobSrc:"WSM India 2024",targetRoles:"Banking Associate · Finance Manager",pkg:"₹4–8 LPA",capstone:"Personal finance model + stock analysis report using Wall Street Mojo templates",impl:"WallStreetMojo.com free · 4 modules · ~6 hrs · quizzes + digital certificate"},
      {n:"Bloomberg Market Concepts (BMC)",c:"Free",jobs:"10K+",jobSrc:"Bloomberg LP 2024",targetRoles:"Finance Analyst Trainee · Banking Associate",pkg:"₹4–8 LPA",capstone:"Bloomberg Terminal walkthrough — complete macroeconomics + currencies + fixed income + equities sections",impl:"~8 hrs self-paced · KL Bloomberg Terminal access · pass all 4 module assessments · earn BMC digital badge"},
    ]},
  { domain:"AI & Productivity",
    roles:[
      {t:"AI Tools Specialist",s:"₹4–7 LPA",open:"6K+",cos:"TCS · Infosys · HCL"},
      {t:"Automation Analyst Trainee",s:"₹4–8 LPA",open:"5K+",cos:"UiPath · Automation Anywhere · Blue Prism"},
      {t:"AI Product Tester",s:"₹5–9 LPA",open:"3K+",cos:"Wipro · Capgemini · LTIMindtree"},
      {t:"AI Ops Lead",s:"₹10–16 LPA",open:"2K+",cos:"Microsoft · IBM · Google India"},
    ],
    openings:"16K+", topCtc:"₹14L", src:"NASSCOM AI 2024",
    optCerts:[
      {n:"IBM AI Foundations (Coursera)",c:"Free",jobs:"11K+",jobSrc:"IBM/Coursera 2024",targetRoles:"AI Tools Specialist · AI Product Tester",pkg:"₹5–9 LPA",capstone:"AI use-case map for a business function — build automation concept with no-code tool",impl:"5 IBM badges · ~30 hrs · Coursera free audit"},
      {n:"Microsoft AI-900 Fundamentals",c:"₹1,500",jobs:"8K+",jobSrc:"Microsoft India 2024",targetRoles:"Automation Analyst Trainee · AI Ops Lead",pkg:"₹5–9 LPA",capstone:"Azure AI demo — cognitive services walkthrough + reflection report on Microsoft Learn",impl:"Microsoft Learn free path · ~10 hrs · AI-900 exam at test centre · ₹1,500"},
    ]},
  { domain:"Project & Product",
    roles:[
      {t:"Junior Project Analyst",s:"₹3–5 LPA",open:"5K+",cos:"Wipro · HCL · Infosys"},
      {t:"Product Associate",s:"₹4–8 LPA",open:"3K+",cos:"Swiggy · CRED · Razorpay"},
      {t:"Scrum Team Member",s:"₹4–7 LPA",open:"4K+",cos:"Capgemini · TCS · Accenture"},
      {t:"Product Manager",s:"₹10–16 LPA",open:"2K+",cos:"Flipkart · Zomato · Meesho"},
    ],
    openings:"14K+", topCtc:"₹16L", src:"Product School India 2024",
    optCerts:[
      {n:"Google Project Management Certificate",c:"Free",jobs:"10K+",jobSrc:"Google Career Certs 2024",targetRoles:"Junior Project Analyst · Product Associate",pkg:"₹4–8 LPA",capstone:"Sauce & Spoon PM simulation (condensed) — scope + timeline + risk register",impl:"6 courses · ~180 hrs · Coursera free audit"},
      {n:"NPTEL Project Management",c:"₹1,100",jobs:"7K+",jobSrc:"NPTEL 2024",targetRoles:"Scrum Team Member · Product Manager",pkg:"₹5–8 LPA",capstone:"WBS + Gantt chart + execution plan for an assigned BBA mini-project — submitted NPTEL",impl:"8-week IIT · scheduling exercises · ₹1,100 proctored exam"},
    ]},
  { domain:"Operations",
    roles:[
      {t:"Operations Executive",s:"₹3–5 LPA",open:"7K+",cos:"Amazon · Flipkart · Delhivery"},
      {t:"Supply Chain Associate",s:"₹3–6 LPA",open:"5K+",cos:"Maersk · DHL · Blue Dart"},
      {t:"Logistics Analyst",s:"₹4–7 LPA",open:"4K+",cos:"Gati · Ecom Express · XpressBees"},
      {t:"Operations Manager",s:"₹9–14 LPA",open:"2K+",cos:"Tata · L&T · Mahindra"},
    ],
    openings:"18K+", topCtc:"₹14L", src:"IBEF Manufacturing 2024",
    optCerts:[
      {n:"NPTEL Operations Management",c:"₹1,100",jobs:"11K+",jobSrc:"IBEF 2024",targetRoles:"Operations Executive · Logistics Analyst",pkg:"₹4–7 LPA",capstone:"Process flow map + bottleneck analysis + improvement plan for an assigned manufacturer",impl:"8-week IIT · process optimisation cases · ₹1,100 NPTEL exam"},
      {n:"Six Sigma White Belt (Free Online)",c:"Free",jobs:"7K+",jobSrc:"IISE India 2024",targetRoles:"Supply Chain Associate · Operations Manager",pkg:"₹5–8 LPA",capstone:"DMAIC mini-project — define process problem + measure baseline + recommend fixes",impl:"IASSC/6Sigma Study free · ~6 hrs · all modules · digital White Belt cert"},
    ]},
  { domain:"Consulting Prep",
    roles:[
      {t:"Junior Analyst (MBB Aspirant)",s:"₹4–7 LPA",open:"2K+",cos:"McKinsey · BCG · Bain"},
      {t:"Business Analyst Trainee",s:"₹4–8 LPA",open:"3K+",cos:"Deloitte · EY · KPMG"},
      {t:"Strategy Associate",s:"₹6–10 LPA",open:"2K+",cos:"Accenture · IBM · Capgemini"},
      {t:"Consultant",s:"₹10–16 LPA",open:"3K+",cos:"Big 4 · MBB · Boutique firms"},
    ],
    openings:"10K+", topCtc:"₹16L", src:"Consulting Hiring India 2024",
    optCerts:[
      {n:"BCG Online Consulting Basics",c:"Free",jobs:"6K+",jobSrc:"BCG/Coursera 2024",targetRoles:"Business Analyst Trainee · Strategy Associate",pkg:"₹6–10 LPA",capstone:"Mini case solution with recommendation slides — McKinsey-style 3-act structure",impl:"BCG website free · 4 modules + case library · complete all"},
      {n:"NPTEL Business Strategy",c:"₹1,100",jobs:"5K+",jobSrc:"NPTEL 2024",targetRoles:"Junior Analyst · Consultant",pkg:"₹5–9 LPA",capstone:"Industry strategy analysis deck — Porter's Five + growth options for an assigned BBA case",impl:"8-week IIT · strategy frameworks + cases · ₹1,100 NPTEL exam"},
    ]},
];

/* ─── Misc helpers ─────────────────────────────────────────────────── */
const packageFromRelevance = (score, program) => {
  const s = Number(score) || 3;
  return program === "MBA"
    ? ["8–12 LPA","10–16 LPA","14–20 LPA","20–28 LPA","28–35+ LPA"][s - 1]
    : ["3–5 LPA","4–7 LPA","6–9 LPA","8–14 LPA","12–18 LPA"][s - 1];
};

const TABS = [
  { id:"overview",       label:"Overview",         icon:HiSparkles },
  { id:"specializations",label:"Specializations",  icon:HiAcademicCap },
  { id:"roles",          label:"Career Paths",      icon:HiBriefcase },
  { id:"certs",          label:"Certifications",    icon:HiCheckBadge },
];

/* ─── Stars ─────────────────────────────────────────────────────────── */
function Stars({ n }) {
  const v = Number(n) || 0;
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`text-base ${i<=v?"text-amber-400":"text-slate-200"}`}>★</span>
      ))}
      <span className="ml-1 text-xs font-bold text-slate-500">{v}/5</span>
    </div>
  );
}

/* ─── Header ─────────────────────────────────────────────────────────── */
function Header({ program, setProgram }) {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        {/* Logos */}
        <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur rounded-xl p-1.5 border border-white/20">
            <img src="/logos/kl-logo.png" alt="KL" className="h-10 w-auto" />
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-1.5 border border-white/20">
            <img src="/logos/skill-logo.png" alt="Skill" className="h-10 w-auto" />
          </div>
          <div className="hidden sm:block">
            <div className="text-white font-display font-bold text-base leading-tight">KL University</div>
            <div className="text-indigo-300 text-xs font-semibold">Skill Development Division</div>
          </div>
        </motion.div>
        {/* Title */}
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} className="text-center flex-1 min-w-[180px]">
          <h1 className="font-display font-extrabold text-white text-2xl sm:text-3xl leading-none tracking-tight">
            {program} Career Pathways
          </h1>
          <p className="text-indigo-300 text-xs mt-0.5 font-semibold">2026 · Placement Intelligence</p>
        </motion.div>
        {/* Switcher */}
        <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}}
          className="flex items-center bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-1 gap-1">
          {[{p:"MBA",label:"MBA",sub:"PG"},{p:"BBA",label:"BBA",sub:"UG"}].map(({p,label,sub}) => (
            <button key={p} onClick={()=>setProgram(p)}
              className={`relative px-5 py-2 rounded-xl font-extrabold text-sm transition-all flex items-center gap-1.5 ${
                program===p ? "text-white" : "text-white/60 hover:text-white/80"}`}>
              {program===p && (
                <motion.div layoutId="progPill"
                  className={`absolute inset-0 rounded-xl ${p==="MBA"?"bg-indigo-600":"bg-emerald-600"}`}
                  transition={{type:"spring",stiffness:320,damping:28}}/>
              )}
              <span className="relative z-10">{label}</span>
              <span className={`relative z-10 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                program===p ? "bg-white/20":"bg-white/10"}`}>{sub}</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Tab bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-0 border-t border-white/10">
        {TABS.map(t => {
          const Icon = t.icon;
          const isActive = false; // will be set via prop
          return null; // rendered below via Tabs component
        })}
      </div>
    </header>
  );
}

/* ─── Tab nav (separate from header for cleaner state management) ──── */
function TabNav({ active, setActive }) {
  return (
    <div className="sticky top-[73px] z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1 sm:gap-2 overflow-x-auto">
        {TABS.map(t => {
          const Icon = t.icon;
          const isA = active === t.id;
          return (
            <button key={t.id} onClick={()=>setActive(t.id)}
              className={`relative flex items-center gap-1.5 px-4 py-3.5 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${
                isA
                  ? "border-indigo-600 text-indigo-700"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}>
              <Icon className={`text-base ${isA?"text-indigo-600":""}`}/>
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Overview ───────────────────────────────────────────────────────── */
function OverviewTab({ data, program }) {
  const topPkg = program==="MBA" ? "₹35–50 LPA" : "₹12–18 LPA";
  const stats = [
    { n:data.certs.length, l:"Certifications", icon:HiAcademicCap, color:"#6366F1" },
    { n:data.certs.filter(c=>c.priority==="High").length, l:"High Priority", icon:HiFire, color:"#F97316" },
    { n:data.paths.length, l:"Career Paths", icon:HiBriefcase, color:"#10B981" },
    { n:data.roadmap.length, l:"Domain Roadmaps", icon:HiRocketLaunch, color:"#EC4899" },
  ];
  return (
    <div className="space-y-6">
      {/* Hero */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-pink-600 p-8 sm:p-12 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNnptMC0zMHY2aC02di02aDZ6bTI0IDMwdjZoLTZ2LTZoNnptMC0zMHY2aC02di02aDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"/>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"/>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"/>
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4 border border-white/30">
            <HiBolt className="text-yellow-300"/> {data.programInfo.duration}
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight mb-3">
            {data.programInfo.title}
          </h2>
          <p className="text-white/85 text-base sm:text-lg max-w-2xl leading-relaxed mb-6">
            {data.programInfo.tagline}
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="bg-white/20 backdrop-blur border border-white/30 rounded-2xl px-5 py-3 font-extrabold flex items-center gap-2">
              <HiTrophy className="text-yellow-300 text-xl"/> Target: {topPkg}
            </div>
            <div className="bg-white/15 backdrop-blur border border-white/25 rounded-2xl px-5 py-3 font-bold flex items-center gap-2 text-sm">
              <HiStar className="text-yellow-300"/> {data.programInfo.target}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s,i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.l} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
              transition={{delay:i*0.08}} whileHover={{y:-4}}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 cursor-default">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{background:`${s.color}18`}}>
                <Icon className="text-xl" style={{color:s.color}}/>
              </div>
              <div className="text-3xl font-display font-extrabold" style={{color:s.color}}>{s.n}</div>
              <div className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wide">{s.l}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Info cards */}
      <div className="grid md:grid-cols-2 gap-5">
        <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center mb-4">
            <HiSparkles className="text-violet-600 text-2xl"/>
          </div>
          <h3 className="font-display text-xl font-extrabold text-slate-900 mb-2">What is Career Builder?</h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            A structured domain-wise journey that layers globally recognized credentials on top of{" "}
            <b className="text-indigo-700">{program}</b> fundamentals. Students follow a{" "}
            <b className="text-pink-600">free-first → low-cost</b> stack and graduate with a verifiable
            portfolio that maps directly to India roles and packages.
          </p>
        </motion.div>
        <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4">
            <HiRocketLaunch className="text-emerald-600 text-2xl"/>
          </div>
          <h3 className="font-display text-xl font-extrabold text-slate-900 mb-2">How It Works</h3>
          <ol className="space-y-2 text-sm text-slate-600">
            {["Choose your target specialization & role","Complete free credentials first","Add 1–2 optional low-cost certs (student choice)","Build a portfolio of real artifacts","Land your target CTC"].map((s,i)=>(
              <li key={i} className="flex items-center gap-3">
                <span className="shrink-0 w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-extrabold flex items-center justify-center">{i+1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Specializations Tab ─────────────────────────────────────────── */
const ROLE_LEVELS = ["Entry","Mid","Senior","Lead"];

function SpecCard({ spec, program, index }) {
  const dm = getDM(spec.domain);
  const Icon = dm.icon;
  const badge  = program === "MBA" ? "PG" : "UG";
  const badgeColor = program === "MBA" ? "#6366F1" : "#10B981";

  return (
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
      transition={{delay:index*0.04, type:"spring", stiffness:160}}
      className="w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md">

      {/* ── Domain header row ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
        style={{background:`linear-gradient(135deg,${dm.color} 0%,${dm.color}CC 100%)`}}>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center shadow-inner">
            <Icon className="text-xl text-white"/>
          </div>
          <div>
            <div className="font-display font-extrabold text-white text-base leading-tight">{spec.domain}</div>
            <div className="text-white/70 text-[11px] font-semibold mt-0.5">
              {spec.roles.length} roles · India 2026 · {spec.src}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-white font-extrabold text-xl leading-none">{spec.openings}</div>
            <div className="text-white/65 text-[10px] font-semibold mt-0.5">Annual openings · India</div>
          </div>
          <div className="w-px h-8 bg-white/30"/>
          <div className="text-center">
            <div className="text-white font-extrabold text-xl leading-none">{spec.topCtc}</div>
            <div className="text-white/65 text-[10px] font-semibold mt-0.5">Top CTC</div>
          </div>
          <div className="w-px h-8 bg-white/30"/>
          <span className="text-xs font-extrabold px-3 py-1.5 rounded-xl bg-white/20 border border-white/30 text-white">
            {badge}
          </span>
        </div>
      </div>

      {/* ── Job Roles Table ── */}
      <div className="border-b border-slate-200">
        {/* table header */}
        <div className="grid grid-cols-[2.5rem_2fr_1.4fr_0.9fr_0.9fr_2fr] text-[9px] font-extrabold uppercase tracking-widest bg-slate-800 text-slate-300">
          <div className="px-3 py-2.5 text-center border-r border-slate-700">#</div>
          <div className="px-3 py-2.5 border-r border-slate-700 flex items-center gap-1">
            <HiBriefcase className="text-slate-400 shrink-0"/> Job Role
          </div>
          <div className="px-3 py-2.5 border-r border-slate-700 flex items-center gap-1">
            <HiCurrencyRupee className="text-slate-400 shrink-0"/> Package (2026)
          </div>
          <div className="px-2 py-2.5 border-r border-slate-700 text-center">Level</div>
          <div className="px-2 py-2.5 border-r border-slate-700 text-center flex items-center justify-center gap-1">
            <HiUsers className="text-slate-400 shrink-0 text-[9px]"/> Openings
          </div>
          <div className="px-3 py-2.5 flex items-center gap-1">
            <HiTrophy className="text-slate-400 shrink-0 text-[9px]"/> Top Companies
          </div>
        </div>
        {/* rows */}
        {spec.roles.map((r, i) => (
          <div key={i} className={`grid grid-cols-[2.5rem_2fr_1.4fr_0.9fr_0.9fr_2fr] border-t border-slate-100 ${i%2===0?"bg-white":"bg-slate-50/60"}`}>
            <div className="px-3 py-3 text-center border-r border-slate-100 flex items-center justify-center">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white"
                style={{background:dm.color}}>{i+1}</span>
            </div>
            <div className="px-3 py-3 border-r border-slate-100 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{background:dm.color}}/>
              <span className="text-xs font-semibold text-slate-800 leading-snug">{r.t}</span>
            </div>
            <div className="px-3 py-3 border-r border-slate-100 flex items-center">
              <span className="text-xs font-extrabold" style={{color:dm.color}}>{r.s}</span>
            </div>
            <div className="px-2 py-3 border-r border-slate-100 flex items-center justify-center">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md whitespace-nowrap"
                style={{
                  background: i===0?"#FEF3C7":i===1?"#EFF6FF":i===2?"#F5F3FF":"#F0FDF4",
                  color:       i===0?"#92400E":i===1?"#1E40AF":i===2?"#5B21B6":"#14532D"
                }}>
                {ROLE_LEVELS[i]}
              </span>
            </div>
            <div className="px-2 py-3 border-r border-slate-100 flex items-center justify-center">
              <span className="text-sm font-extrabold" style={{color:dm.color}}>{r.open}</span>
            </div>
            <div className="px-3 py-3 flex items-center">
              <div className="flex flex-wrap gap-1">
                {r.cos.split(" · ").map((co,ci)=>(
                  <span key={ci} className="text-[10px] font-semibold px-2 py-0.5 rounded-md border"
                    style={{background:`${dm.color}0D`,color:dm.color,borderColor:`${dm.color}30`}}>
                    {co}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Optional Certifications Table ── */}
      <div className="p-5 bg-slate-50/50">
        {/* Section header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{background:dm.color}}>
              <HiCheckBadge className="text-white text-xs"/>
            </div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">Optional Certifications</span>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border"
            style={{background:`${dm.color}12`,color:dm.color,borderColor:`${dm.color}35`}}>
            Pick any 1 · Student choice · Not mandatory
          </span>
        </div>

        {/* Cert table */}
        <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
          {/* header */}
          <div className="grid grid-cols-[2.2fr_0.8fr_0.9fr_1.6fr_1.2fr] text-[9px] font-extrabold uppercase tracking-widest text-white"
            style={{background:`linear-gradient(90deg,${dm.color} 0%,${dm.color}BB 100%)`}}>
            <div className="px-3 py-2.5 border-r border-white/20">Certification</div>
            <div className="px-2 py-2.5 border-r border-white/20 text-center">Cost</div>
            <div className="px-2 py-2.5 border-r border-white/20 text-center">India Jobs</div>
            <div className="px-2 py-2.5 border-r border-white/20">Target Roles</div>
            <div className="px-2 py-2.5 text-center">Est. Package</div>
          </div>

          {spec.optCerts.map((cert, ci) => {
            const isFree = cert.c === "Free";
            return (
              <div key={ci} className="border-t border-slate-200">
                {/* data row */}
                <div className={`grid grid-cols-[2.2fr_0.8fr_0.9fr_1.6fr_1.2fr] items-stretch ${ci%2===0?"bg-white":"bg-slate-50"}`}>
                  <div className="px-3 py-3 border-r border-slate-100 flex items-start gap-1.5">
                    <HiAcademicCap className="text-sm mt-0.5 shrink-0" style={{color:dm.color}}/>
                    <span className="text-[11px] font-bold text-slate-800 leading-snug">{cert.n}</span>
                  </div>
                  <div className="px-2 py-3 border-r border-slate-100 flex items-center justify-center">
                    <span className="text-[11px] font-extrabold px-2 py-1 rounded-lg whitespace-nowrap"
                      style={isFree?{background:"#DCFCE7",color:"#15803D"}:{background:"#DBEAFE",color:"#1D4ED8"}}>
                      {cert.c}
                    </span>
                  </div>
                  <div className="px-2 py-3 border-r border-slate-100 text-center">
                    <div className="text-sm font-extrabold leading-none" style={{color:dm.color}}>{cert.jobs}</div>
                    <div className="text-[9px] text-slate-400 font-semibold mt-1 leading-tight">{cert.jobSrc}</div>
                  </div>
                  <div className="px-2 py-3 border-r border-slate-100">
                    {cert.targetRoles.split(" · ").map((r,ri)=>(
                      <div key={ri} className="flex items-center gap-1 mb-1 last:mb-0">
                        <div className="w-1 h-1 rounded-full shrink-0" style={{background:dm.color}}/>
                        <span className="text-[10px] font-semibold text-slate-700 leading-tight">{r}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-2 py-3 text-center flex flex-col items-center justify-center gap-0.5">
                    <span className="text-xs font-extrabold" style={{color:dm.color}}>{cert.pkg}</span>
                    <span className="text-[9px] text-slate-400 font-semibold">w/ this cert</span>
                  </div>
                </div>

                {/* capstone row */}
                <div className="grid grid-cols-[4rem_1fr] border-t border-dashed border-slate-200"
                  style={{background:isFree?"#F0FDF4":"#EFF6FF"}}>
                  <div className="px-3 py-2 flex items-center gap-1 border-r border-dashed border-slate-200">
                    <HiTrophy className="text-xs shrink-0" style={{color:isFree?"#16A34A":"#2563EB"}}/>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider"
                      style={{color:isFree?"#16A34A":"#2563EB"}}>Capstone</span>
                  </div>
                  <div className="px-3 py-2">
                    <span className="text-[10px] text-slate-700 font-medium leading-snug">{cert.capstone}</span>
                  </div>
                </div>

                {/* how row */}
                <div className="grid grid-cols-[4rem_1fr] border-t border-dashed border-slate-200 bg-slate-50">
                  <div className="px-3 py-2 flex items-center gap-1 border-r border-dashed border-slate-200">
                    <HiRocketLaunch className="text-xs text-slate-400 shrink-0"/>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">How</span>
                  </div>
                  <div className="px-3 py-2">
                    <span className="text-[10px] text-slate-500 font-medium leading-snug">{cert.impl}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function SpecializationsTab({ program }) {
  const specs = program === "MBA" ? MBA_SPECS : BBA_SPECS;
  const badge  = program === "MBA" ? "PG" : "UG";
  const topPkg = program === "MBA" ? "₹35–50 LPA" : "₹12–18 LPA";
  const accentColor = program === "MBA" ? "#4338CA" : "#065F46";
  const accentBg    = program === "MBA" ? "#EEF2FF" : "#ECFDF5";

  return (
    <div className="space-y-5">
      {/* Page header */}
      <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}
        className="flex flex-wrap items-end justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-extrabold px-3 py-1 rounded-full"
              style={{background:accentBg,color:accentColor}}>
              {badge} · {program}
            </span>
            <span className="text-xs text-slate-500 font-semibold">KL University · 2026</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
            {specs.length} Specialization Tracks
          </h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Full data table: job roles · India salary · market openings · certifications · capstone projects
          </p>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-5 py-3 rounded-2xl font-extrabold shadow-lg text-sm">
          <HiTrophy className="text-yellow-300"/> Target: {topPkg}
        </div>
      </motion.div>

      {/* Full-width table stack */}
      <div className="space-y-4">
        {specs.map((spec, i) => (
          <SpecCard key={spec.domain} spec={spec} program={program} index={i}/>
        ))}
      </div>
    </div>
  );
}

/* ─── Career Paths ───────────────────────────────────────────────────── */
function RolesTab({ data, program }) {
  const CHIPS = ["bg-indigo-50 text-indigo-700","bg-pink-50 text-pink-700","bg-emerald-50 text-emerald-700","bg-amber-50 text-amber-700","bg-sky-50 text-sky-700","bg-violet-50 text-violet-700"];
  return (
    <div className="space-y-6">
      <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">Career Role Paths</h2>
        <p className="text-slate-500 mt-1 text-sm font-medium">Target role · certification stack · portfolio proof · India CTC</p>
      </motion.div>
      <div className="space-y-4">
        {data.paths.map((p, i) => {
          const chipClass = CHIPS[i % CHIPS.length];
          return (
            <motion.div key={p.no} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}}
              transition={{delay:i*0.05}} whileHover={{x:4}}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="flex flex-wrap items-center gap-4 p-5 border-b border-slate-50">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-display text-2xl font-extrabold text-white shadow-lg"
                  style={{background:`linear-gradient(135deg,${["#6366F1","#EC4899","#10B981","#F59E0B","#0EA5E9","#8B5CF6","#F97316","#14B8A6","#EF4444","#6D28D9"][i%10]},${["#8B5CF6","#F97316","#0EA5E9","#EF4444","#6366F1","#EC4899","#F59E0B","#6366F1","#F97316","#EC4899"][i%10]})`}}>
                  {p.no}
                </div>
                <div className="flex-1 min-w-[180px]">
                  <h3 className="font-display text-lg sm:text-xl font-extrabold text-slate-900">{p.role}</h3>
                  <p className="text-sm text-slate-500 mt-0.5 font-medium">{p.mbaFit}</p>
                </div>
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2.5 rounded-xl font-extrabold text-base shadow-md flex items-center gap-1.5">
                  <HiCurrencyRupee className="text-yellow-200"/> {p.package}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y sm:divide-y-0 divide-slate-50">
                {[["Cert Stack",p.stack],["Portfolio",p.portfolio],["Employers",p.employers],["CTC Logic",p.ctcLogic]].map(([lbl,val])=>(
                  <div key={lbl} className="p-4">
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">{lbl}</div>
                    <div className="text-xs text-slate-700 font-medium leading-relaxed">{val}</div>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 bg-amber-50 border-t border-amber-100 flex items-start gap-2.5">
                <HiBolt className="text-amber-500 text-base shrink-0 mt-0.5"/>
                <p className="text-xs font-medium text-amber-800"><b className="font-extrabold">90-Day Action: </b>{p.action}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Certifications Tab ─────────────────────────────────────────────── */
function CertModal({ cert, program, onClose }) {
  if (!cert) return null;
  const pkg = packageFromRelevance(cert.relevance, program);
  const dm = getDM(cert.domain);
  const Icon = dm.icon;
  return (
    <AnimatePresence>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div initial={{scale:0.9,y:30,opacity:0}} animate={{scale:1,y:0,opacity:1}}
          exit={{scale:0.9,y:30,opacity:0}} transition={{type:"spring",stiffness:260,damping:26}}
          onClick={e=>e.stopPropagation()}
          className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative">
          <button onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition">
            <HiXMark/>
          </button>
          {/* colored top band */}
          <div className="h-2 rounded-t-3xl" style={{background:`linear-gradient(90deg,${dm.color},${dm.color}80)`}}/>
          <div className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
                style={{background:dm.color}}>
                <Icon className="text-2xl text-white"/>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-widest" style={{color:dm.color}}>{cert.domain}</span>
                <h2 className="font-display text-xl font-extrabold text-slate-900 leading-tight mt-0.5">{cert.name}</h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">{cert.provider} · {cert.level} · {cert.time}</p>
              </div>
            </div>
            <Stars n={cert.relevance}/>

            {/* Package highlight */}
            <div className="mt-4 rounded-2xl p-5 text-center text-white"
              style={{background:`linear-gradient(135deg,${dm.color},${dm.color}cc)`}}>
              <div className="text-xs font-extrabold uppercase tracking-widest opacity-90 mb-1 flex items-center justify-center gap-1">
                <HiTrophy/> Projected Package (India)
              </div>
              <div className="font-display text-4xl font-extrabold">{pkg}</div>
              <div className="text-xs opacity-80 mt-1">if certification path + portfolio completed</div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {[["Cost",`${cert.costCategory} · ₹${Number(cert.costINR||0).toLocaleString("en-IN")}`],
                ["Priority",cert.priority],
                ["Specialization",cert.specialization],
                ["Portfolio",cert.artifact]].map(([l,v])=>(
                <div key={l} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">{l}</div>
                  <div className="text-xs font-semibold text-slate-700 mt-1">{v||"—"}</div>
                </div>
              ))}
            </div>

            <a href={cert.url} target="_blank" rel="noreferrer"
              className="mt-5 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-extrabold text-sm transition hover:opacity-90"
              style={{background:dm.color}}>
              Open Certification Page <HiArrowRight/>
            </a>
          </div>
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

  const domains = useMemo(()=>["All",...Array.from(new Set(data.certs.map(c=>c.domain)))],[data]);
  const filtered = data.certs.filter(c=>{
    if (domain!=="All" && c.domain!==domain) return false;
    if (priority!=="All" && c.priority!==priority) return false;
    if (q && !`${c.name} ${c.provider} ${c.roles}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });
  const prioStyle = p => p==="High"
    ? {bg:"#FEF2F2",text:"#DC2626",border:"#FECACA"}
    : p==="Medium"
    ? {bg:"#FFFBEB",text:"#D97706",border:"#FDE68A"}
    : {bg:"#EFF6FF",text:"#2563EB",border:"#BFDBFE"};

  return (
    <div className="space-y-5">
      <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">Certifications Catalog</h2>
        <p className="text-slate-500 mt-1 text-sm font-medium">
          <b className="text-indigo-700">{filtered.length}</b> of {data.certs.length} · click any card for India package projection
        </p>
      </motion.div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-wrap gap-3">
        <div className="flex-1 min-w-[220px] relative">
          <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input value={q} onChange={e=>setQ(e.target.value)}
            placeholder="Search name, provider, roles…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 text-sm font-medium focus:outline-none bg-slate-50 transition"/>
        </div>
        <select value={domain} onChange={e=>setDomain(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 bg-slate-50 focus:outline-none focus:border-indigo-400 transition">
          {domains.map(d=><option key={d}>{d}</option>)}
        </select>
        <select value={priority} onChange={e=>setPriority(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 bg-slate-50 focus:outline-none focus:border-indigo-400 transition">
          {["All","High","Medium","Low"].map(p=><option key={p}>{p}</option>)}
        </select>
      </div>

      {/* Cards grid */}
      <motion.div layout className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence>
          {filtered.map((c,i) => {
            const dm = getDM(c.domain);
            const Icon = dm.icon;
            const pkg = packageFromRelevance(c.relevance, program);
            const ps = prioStyle(c.priority);
            return (
              <motion.button key={c.sno+c.name} layout
                initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}}
                exit={{opacity:0,scale:0.95}} transition={{delay:Math.min(i*0.025,0.3)}}
                whileHover={{y:-5}} whileTap={{scale:0.98}}
                onClick={()=>setOpen(c)}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm text-left flex flex-col overflow-hidden hover:shadow-md transition-all duration-200">
                {/* colored top strip */}
                <div className="h-1" style={{background:dm.color}}/>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm" style={{background:dm.color}}>
                      <Icon className="text-base text-white"/>
                    </div>
                    <span className="text-[10px] font-extrabold px-2 py-1 rounded-lg border"
                      style={{background:ps.bg,color:ps.text,borderColor:ps.border}}>
                      {c.priority}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-slate-900 text-sm leading-snug mb-1">{c.name}</h3>
                  <p className="text-xs text-slate-500 font-medium mb-2">{c.provider} · {c.level} · {c.time}</p>
                  <Stars n={c.relevance}/>
                  {/* Package */}
                  <div className="mt-3 rounded-xl p-3 text-center" style={{background:`${dm.color}12`}}>
                    <div className="text-[9px] font-extrabold uppercase tracking-widest mb-0.5" style={{color:dm.color}}>Projected Package</div>
                    <div className="font-display font-extrabold text-xl" style={{color:dm.color}}>{pkg}</div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500">{c.costCategory}</span>
                    <span className="font-extrabold flex items-center gap-1" style={{color:dm.color}}>
                      View detail <HiArrowRight className="text-xs"/>
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filtered.length===0 && (
        <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center text-slate-500 font-medium">
          No certifications match. Try different filters.
        </div>
      )}
      <CertModal cert={open} program={program} onClose={()=>setOpen(null)}/>
    </div>
  );
}

/* ─── Root ───────────────────────────────────────────────────────────── */
export default function App() {
  const [program, setProgram] = useState("MBA");
  const [active, setActive] = useState("overview");
  const data = program === "MBA" ? mbaData : bbaData;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header program={program} setProgram={setProgram}/>
      <TabNav active={active} setActive={setActive}/>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-16">
        <AnimatePresence mode="wait">
          <motion.div key={`${program}-${active}`}
            initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}
            exit={{opacity:0,y:-12}} transition={{duration:0.22}}>
            {active==="overview"        && <OverviewTab data={data} program={program}/>}
            {active==="specializations" && <SpecializationsTab program={program}/>}
            {active==="roles"           && <RolesTab data={data} program={program}/>}
            {active==="certs"           && <CertsTab data={data} program={program}/>}
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-xs font-semibold">
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src="/logos/kl-logo.png" alt="KL" className="h-7 opacity-60"/>
          <img src="/logos/skill-logo.png" alt="Skill" className="h-7 opacity-60"/>
        </div>
        © {new Date().getFullYear()} KL University · Skill Development Division · MBA & BBA Career Pathways 2026
      </footer>
    </div>
  );
}
