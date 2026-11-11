import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight, Bell, Building2, Check, Circle, CloudRain, Cpu, Droplets,
  FlaskConical, Gauge, Globe2, GraduationCap, Leaf, MapPin, Package,
  Pause, Play, Radio, Ruler, Smartphone, Sprout, Sun, Thermometer, Timer,
  TriangleAlert, Users, Wallet, Waves, Wrench, X, Zap,
} from "lucide-react";

/* ───────────── EDIT ME ───────────── */
const PRESENTER = "Erneste";
const FULL_NAME = "Itangishaka Erneste";
const SKILLS = ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "PHP", "PostgreSQL", "MySQL"];
const BRAND_LOGO = "https://thumbs.dreamstime.com/b/web-467395551.jpg";
const PROFILE_IMAGE = "https://lh3.googleusercontent.com/a-/ALV-UjUizgOwMh4A4oWLADr0jg_la1R5gx9BImnEvf2A5TVWDwZ5uDIG9lCJGvGP9B6_zzCSX8d0zHFysfiQAZCL5s4z8tYwNE-JMORzJ2DC7bvLNTOF252ehhKX9IjUJddNjLKpYaaoaJ0w2EAD4QdQ7FnnHpX_I6Gwqdlr83JyAeValt0RPMB_3FKOxHlYWne_YRVtiDVcqi2MZHxfsZi2BnZ0c_kAubWJIwesgA5_ybJQ-WX8S9YrIptAN6eIC3XQyAUN25AbR4gsGEM8Ah6qTVfo0nZxs1fPlckdRvjR4QwIu_w6k3_YERkLLwm6rG7k5gT8fYtly4CDW9jvdPFCrfQXc4tNAKkpkbAPVWCU3aUjuCyOIyeGGI4o5LimRNDcHdYCnpQGowFK3qr3zRT8swwGhvrQdMAYmeH8k40vJB0Xu_cbWyDHHBsTlsR5g8dXx3tkNjPEWidBY0n33ykHhfSBjjZjGsiFrOuaSl8X-bJRgd22snR0h0UYqfj8WkS81xZYBoYytwq9sREabQ_3EgmIJ51YA9YSU53vbLNSacAF8qaKHH2hxYAeG0J-rdpVMvJzytFr8CUmsEM8PHAc13tjPQjXeQisnIEkreWK30BVuImzmWXRDLwNooyjjC0OJGRgyBOnIrrGhouHnONW-WhCea1ydC1nWc3wUY7f7rGJ9l_Qb2OKXcFKb90m3bcXM6G2pEg20kBi5KDQiRgNTZ11adze7oavfMgBv13CEkB05MZ_Xi6mZavJwIbOFGTaEAdnRhN10Lxom8__6xgqxjzH0NPAm2l51QLkIpM6f8qxT9ekIHEJJ-t3tW5GfH7wTfyGE211TudSA5Eel_hEMya2DURapWpI0x8GqQnrX2Yl6Z7OsVpRPOQia1HsLil3q3SefNm4Yvl79hAX2i4ZL1Yc3Lp1Lvh-fwSpPGUQYpl2SId-HhTd5bqELC60TMAmBcyNtZ1pUm6S9ujmIJWgY7dadTZEkoCyA3O1kxCRoLR3aiZsIGsjGr2tTUep1XdS5GpL-_jnvg_MkCO1sxETBtBj_wEbfpbF9X_uFhpLkcnUsZGExLJ9Oq87zMs=s432-c-no";
const PROBLEM_PARAGRAPH = "Agriculture is one of the most important sectors of Rwanda's economy, supporting millions of households and providing livelihoods for a large proportion of the population. However, farmers continue to face serious challenges that affect their productivity, income and ability to produce enough food. According to the National Institute of Statistics of Rwanda (NISR), approximately 2.2 million agricultural households, representing 65.3% of all households in Rwanda, depend on agriculture. Despite its importance, agricultural production remains highly vulnerable to unpredictable weather conditions, particularly irregular rainfall and prolonged dry periods. In its November 2025 report, the Food and Agriculture Organization (FAO) reported that rainfall in Rwanda during September and October 2025 was approximately 30% below the long-term average, affecting crop development, especially in the Eastern Province. This creates difficulties for farmers who depend on rainfall to provide sufficient water for their crops. Furthermore, NISR's 2024 Agricultural Household Survey found that only 5.6% of agricultural plots were irrigated, showing how limited access to irrigation remains a challenge. The situation is particularly concerning for small-scale farmers, as NISR's 2025 Season A Agricultural Survey found that only 12% practised irrigation. These challenges also have consequences for food affordability: according to NISR's Comprehensive Food Security and Vulnerability Analysis (2024), fresh food inflation increased from 1.5% in 2021/22 to 41.8% in 2022/23, partly due to unfavourable weather and poor agricultural performance. This raises an important question: How can we help farmers overcome unpredictable rainfall, manage water efficiently, reduce avoidable crop losses and improve agricultural productivity?";
const IMG = {
  hero: "https://www.twl-irrigation.com/wp-content/uploads/2021/11/Smart-irrigation.jpg",
  a: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9vRx6BLQXzRn6bCNZVOmlOB_dJRAqHOj9gB9y-cX4ywO2FRj-7cFbI8bh&s=10",
  b: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMD1-kHj4nHD6JUTyB5TMNxqddCjttG25rjw_TchGWi9e4PZJXXEZwU90&s=10",
  c: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo5Yc9wsBsCEbA4rC8YzneHOrvkEoPbyOMuvNvwm-TnbySILi-78RpwGSe&s=10",
};
/* ─────────────────────────────────── */

const FONT = { fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif" };

function GlobalStyle() {
  return (
    <style>{`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
:root{--color-sky-50:#eff6ff;--color-sky-100:#dbeafe;--color-sky-200:#bfdbfe;--color-sky-300:#93c5fd;--color-sky-400:#60a5fa;--color-sky-500:#3b82f6;--color-sky-600:#2563eb;--color-sky-700:#1d4ed8;--color-sky-800:#1e40af;--color-sky-900:#1e3a8a;--color-sky-950:#172554}
@keyframes up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@keyframes fade{from{opacity:0}to{opacity:1}}
@keyframes grow{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes drop{0%{opacity:0;transform:translateY(0)}20%{opacity:1}100%{opacity:0;transform:translateY(90px)}}
@keyframes bar{from{width:0}to{width:100%}}
@keyframes pulseRing{0%{box-shadow:0 0 0 0 rgba(250,204,21,.7)}100%{box-shadow:0 0 0 24px rgba(250,204,21,0)}}
@keyframes loader-spin{to{transform:rotate(360deg)}}
@keyframes loader-wave{to{stroke-dashoffset:-32}}
@keyframes gentle-bounce{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-8px) scale(1.02)}}
.anim-up{animation:up .7s both}.anim-fade{animation:fade .6s both}
.anim-grow{animation:grow 1s .2s both;transform-origin:bottom}
.anim-float{animation:floaty 4s ease-in-out infinite}
.anim-float-slow{animation:floaty 6s ease-in-out infinite}
.anim-drop{animation:drop 1.6s linear infinite}
.anim-ring{animation:pulseRing 1.6s infinite}
.profile-bounce{animation:gentle-bounce 3.5s ease-in-out infinite;transform-origin:center;will-change:transform}
.loader-progress{transform-origin:60px 60px;animation:loader-spin 1.8s linear infinite}
.loader-wave{animation:loader-wave 1.3s linear infinite}
.thumb *{animation:none!important}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important}}
`}</style>
  );
}

/* ───────────── helpers ───────────── */
function SmartImg({ src, alt, className = "" }) {
  const [st, setSt] = useState("loading");
  return (
    <div className={`relative overflow-hidden bg-sky-100 ${className}`}>
      {st !== "ok" && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sky-200 to-emerald-200">
          <Sprout className={`h-12 w-12 text-emerald-700 ${st === "loading" ? "animate-pulse" : ""}`} aria-hidden="true" />
        </div>
      )}
      {st !== "error" && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setSt("ok")}
          onError={() => setSt("error")}
          className={`h-full w-full object-cover transition-opacity duration-700 ${st === "ok" ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}

const MARKS = {
  water: Droplets, time: Timer, crop: Sprout, community: Users, land: Sprout, money: Wallet,
  rain: CloudRain, decision: Gauge, cost: Wallet, plant: Sprout, sprinkler: Waves, ai: Cpu,
  location: MapPin, soil: FlaskConical, mobile: Smartphone, tank: Droplets, sun: Sun,
  tools: Wrench, leaf: Leaf, sensor: Radio, controller: Cpu, temperature: Thermometer,
  weather: CloudRain, reservoir: Droplets, play: Play, pause: Pause, stop: X, alert: Bell,
  data: Gauge, sync: Waves, history: Gauge, offline: Radio, farmer: Users, vegetable: Leaf,
  tomato: Sprout, onion: Sprout, food: Leaf, cooperative: Users, business: Building2,
  yes: Check, no: X, partly: Circle, package: Package, maintenance: Wrench, training: GraduationCap,
  build: Zap, measure: Ruler, risk: TriangleAlert, impact: Globe2,
};

function VisualIcon({ mark, className = "h-6 w-6" }) {
  const Icon = MARKS[mark] ?? Sprout;
  return <Icon className={className} aria-hidden="true" />;
}

function MarkLabel({ label, className = "" }) {
  const [mark, ...words] = label.split(" ");
  const text = MARKS[mark] ? words.join(" ") : label;
  if (!MARKS[mark]) return <span className={className}>{label}</span>;
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <VisualIcon mark={mark} className="h-5 w-5 shrink-0" />
      {text}
    </span>
  );
}

function Count({ to, dec = 0, suffix = "", prefix = "" }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf, t0;
    const step = (t) => {
      t0 = t0 ?? t;
      const p = Math.min((t - t0) / 1400, 1);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return (
    <>
      {prefix}
      {v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec })}
      {suffix}
    </>
  );
}

/* 1280x720 stage scaled to any width */
function Fit({ children, className = "", style }) {
  const ref = useRef(null);
  const [s, setS] = useState(0.3);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const upd = () => setS(el.clientWidth / 1280);
    upd();
    const ro = new ResizeObserver(upd);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: "16 / 9", ...style }}>
      <div className="absolute left-0 top-0" style={{ width: 1280, height: 720, transform: `scale(${s})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
}

const TONES = {
  light: "bg-white text-slate-800",
  dark: "bg-gradient-to-br from-emerald-900 via-green-800 to-sky-900 text-white",
  sun: "bg-gradient-to-br from-yellow-300 via-yellow-100 to-white text-emerald-950",
};

function Shell({ tone = "light", tag, title, children }) {
  return (
    <div className={`relative h-full w-full overflow-hidden px-16 py-11 ${TONES[tone]}`} style={FONT}>
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-400/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-green-400/25 blur-2xl" />
      <div className="relative anim-up">
        {tag && <span className="inline-block rounded-full bg-yellow-400 px-4 py-1 text-sm font-bold uppercase tracking-widest text-emerald-950">{tag}</span>}
        {title && <h2 className={`mt-3 text-[40px] font-extrabold leading-tight ${tone === "dark" ? "text-white" : "text-emerald-900"}`}>{title}</h2>}
      </div>
      <div className="relative mt-5">{children}</div>
    </div>
  );
}

const Src = ({ children }) => <p className="mt-2 text-[13px] font-medium opacity-60">{children}</p>;

/* ───────────── slides ───────────── */
function S1() {
  const team = [
    { name: "Itangishaka Erneste", role: "Software Developer", skills: SKILLS },
    { name: "Mutabazi Queen Peace", role: "Designer & Electronics Technician" },
    { name: "Keza Nadia", role: "Designer & Electronics Technician" },
  ];

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-gradient-to-br from-emerald-950 via-green-900 to-sky-950 px-14 py-8 text-white" style={FONT}>
      <div className="pointer-events-none absolute -right-20 -top-28 h-96 w-96 rounded-full bg-yellow-300/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-36 -left-20 h-96 w-96 rounded-full bg-sky-300/10 blur-3xl" />
      <header className="relative flex items-center justify-between border-b border-white/15 pb-4">
        <div className="flex items-center gap-3">
          <img src={BRAND_LOGO} alt="Project logo" className="h-12 w-12 rounded-xl bg-white object-contain p-1" />
          <span className="text-lg font-bold">Hinga Weze <span className="text-yellow-300">na Uhira</span></span>
        </div>
        <span className="rounded-full bg-yellow-300 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-950">S5 · MSII</span>
      </header>
      <div className="relative mt-7 flex flex-1 flex-col anim-up">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.2em] text-yellow-300">Our project</p>
            <h1 className="mt-2 text-[54px] font-extrabold leading-tight">Hinga Weze <span className="text-yellow-300">na Uhira</span></h1>
            <p className="mt-2 text-xl text-sky-100">Smart irrigation for resilient farms</p>
          </div>
          <div className="mb-1 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-sky-50">
            <Users className="h-5 w-5 text-yellow-300" aria-hidden="true" />
            Project team
          </div>
        </div>
        <div className="mt-7 grid grid-cols-3 gap-4">
          {team.map(({ name, role, skills }) => (
            <div key={name} className="min-h-[150px] rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-lg font-extrabold leading-snug">{name}</p>
              <p className="mt-2 text-sm font-semibold text-yellow-300">{role}</p>
              {skills && <p className="mt-3 text-xs leading-relaxed text-sky-100">{skills.join(" · ")}</p>}
            </div>
          ))}
        </div>
        <p className="mt-auto flex items-center gap-2 border-t border-white/15 pt-5 text-sm font-semibold text-sky-100">
          <Droplets className="h-5 w-5 text-yellow-300" aria-hidden="true" />
          Helping farmers make every drop count
        </p>
      </div>
    </div>
  );
}

function S2() {
  const stats = [
    ["30%", "below average rainfall", "Sep–Oct 2025; crop development was affected, especially in the Eastern Province.", "FAO · Nov 2025"],
    ["5.6%", "of agricultural plots irrigated", "Access to irrigation remains limited.", "NISR · Agricultural Household Survey 2024"],
    ["12%", "practised irrigation", "Reported in the Season A agricultural survey.", "NISR · Season A 2025"],
    ["1.5% → 41.8%", "fresh food inflation", "Rose from 2021/22 to 2022/23, partly amid adverse weather and poor agricultural performance.", "NISR · CFSVA 2024"],
  ];
  return (
    <Shell tag="The problem" title="Rwanda’s farmers can’t rely on the rain">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-4 flex flex-col justify-between rounded-3xl bg-emerald-800 p-6 text-white shadow-lg">
          <p className="text-sm font-bold uppercase tracking-widest text-yellow-300">Agriculture supports Rwanda</p>
          <div>
            <p className="text-6xl font-extrabold text-yellow-300"><Count to={2.2} dec={1} suffix="M" /></p>
            <p className="mt-1 text-xl font-bold">agricultural households</p>
            <p className="mt-3 text-lg leading-snug text-green-50"><b className="text-yellow-300">65.3%</b> of all households depend on agriculture for their livelihoods.</p>
          </div>
          <p className="text-xs text-green-100">NISR · Agricultural Household Survey 2024</p>
        </div>
        <div className="col-span-8 grid grid-cols-2 gap-4">
          {stats.map(([value, label, detail, source], i) => (
            <div key={label} className={`anim-up flex flex-col justify-between rounded-3xl border border-green-100 p-5 shadow-sm ${i % 2 ? "bg-green-50" : "bg-white"}`} style={{ animationDelay: `${i * 0.1}s` }}>
              <div>
                <p className={`text-3xl font-extrabold leading-tight ${i === 0 ? "text-blue-600" : "text-emerald-700"}`}>{value}</p>
                <p className="mt-1 text-base font-bold text-emerald-950">{label}</p>
                <p className="mt-1 text-[13px] leading-snug text-slate-600">{detail}</p>
              </div>
              <p className="mt-2 text-[11px] font-semibold text-emerald-700">{source}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 rounded-2xl bg-yellow-300 px-6 py-4 text-center text-[22px] font-extrabold leading-snug text-emerald-950">
        How can we help farmers manage water, protect harvests and grow more food despite unpredictable rainfall?
      </div>
      <p className="mt-2 text-[10px] text-slate-500">
        Sources: <a className="underline" href="https://statistics.gov.rw/" target="_blank" rel="noreferrer">NISR household surveys and CFSVA</a>; <a className="underline" href="https://www.fao.org/giews/countrybrief/country.jsp?code=RWA" target="_blank" rel="noreferrer">FAO Rwanda Country Brief, 12 Nov 2025</a>.
      </p>
    </Shell>
  );
}

function S3() {
  const bars = [
    ["74,375", 37, "bg-sky-500", "Under irrigation", "MINAGRI 2024/25"],
    ["102,000", 51, "bg-green-500", "Irrigated area 2025", "Rwanda climate plan"],
    ["200,000", 100, "bg-yellow-400", "Government target 2030", "Rwanda climate plan"],
  ];
  return (
    <Shell tag="The gap" title="Irrigation is the missing link">
      <div className="flex gap-10">
        <div className="w-1/2 rounded-3xl bg-slate-50 p-8 shadow-inner">
          <div className="flex h-[300px] items-end gap-6">
            {bars.map(([v, h, c, l], i) => (
              <div key={l} className="flex flex-1 flex-col items-center justify-end">
                <p className="mb-2 text-xl font-extrabold text-emerald-900">{v}</p>
                <div className={`anim-grow w-full rounded-t-2xl ${c}`} style={{ height: `${h * 2.4}px`, animationDelay: `${i * 0.2}s` }} />
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-6 text-center text-xs font-semibold text-slate-600">
            {bars.map(([, , , l, s]) => (
              <div key={l} className="flex-1"><p>{l}</p><p className="font-normal opacity-60">{s}</p></div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-slate-500">Hectares of irrigated land</p>
        </div>
        <div className="flex w-1/2 flex-col justify-center gap-5">
          {[
            ["community", "2.2 million", "agricultural households — 65.3% of all households (Agricultural Household Survey 2024)"],
            ["land", "30%", "of farming households own less than 0.2 ha — small plots need small, affordable systems"],
            ["money", "RWF 450 bn", "private-sector opportunity in climate-smart agriculture, led by irrigation (MINAGRI, RGF, IFC — 2025)"],
          ].map(([e, n, t]) => (
            <div key={n} className="flex items-start gap-4">
              <VisualIcon mark={e} className="h-9 w-9 shrink-0 text-emerald-700" />
              <p className="text-lg leading-snug text-slate-700"><b className="text-2xl text-emerald-800">{n}</b><br />{t}</p>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

function S4() {
  const items = [
    ["rain", "Unpredictable rain", "Farmers depend on rainfall that no longer follows the calendar."],
    ["time", "Hours lost to hand-watering", "Manual watering takes labour and time away from other work."],
    ["decision", "Guesswork", "Too much or too little water — crops suffer either way."],
    ["cost", "Automation is out of reach", "Affordable automated irrigation has limited access for small farms."],
  ];
  return (
    <Shell tag="Farmer pain points" title="A farmer cannot be everywhere at once">
      <div className="grid grid-cols-4 gap-5">
        {items.map(([e, t, d], i) => (
          <div key={t} className="anim-up rounded-3xl border-2 border-sky-100 bg-white p-6 shadow-lg" style={{ animationDelay: `${i * 0.12}s` }}>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-300 text-emerald-900"><VisualIcon mark={e} className="h-8 w-8" /></div>
            <h3 className="mt-4 text-xl font-bold text-emerald-900">{t}</h3>
            <p className="mt-2 text-[15px] leading-snug text-slate-600">{d}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-3xl bg-gradient-to-r from-emerald-700 to-sky-700 p-7 text-center text-2xl font-bold text-white shadow-xl">
        Result: wasted water · lower yields · unstable supply · <span className="text-yellow-300">rising prices</span>
      </div>
    </Shell>
  );
}

function S5() {
  return (
    <Shell tone="light" tag="Our solution" title="Hinga Weze na Uhira: irrigation that thinks">
      <div className="flex gap-10">
        <div className="grid w-5/12 grid-cols-2 grid-rows-2 gap-3">
          <SmartImg src={IMG.hero} alt="Smart irrigation" className="col-span-2 h-[210px] rounded-3xl shadow-lg" />
          <SmartImg src={IMG.a} alt="Irrigation field" className="h-[170px] rounded-3xl shadow-lg" />
          <SmartImg src={IMG.b} alt="Sprinklers" className="h-[170px] rounded-3xl shadow-lg" />
        </div>
        <div className="w-7/12 space-y-3">
          <p className="text-xl text-slate-600">An affordable, <b className="text-emerald-700">solar-powered</b> smart irrigation system for Rwandan farms.</p>
          {[
            ["ai", "AI decides when to water", "using soil, weather, climate and crop data"],
            ["rain", "Harvests & stores water underground", "from rain, rivers or lakes — safely, with little evaporation"],
            ["location", "Stays inside your field", "boundary lock so water never goes beyond the plot"],
            ["soil", "Reads soil health", "fertility insight to guide fertilizer use"],
            ["mobile", "Mobile app control", "monitor and command the farm from anywhere"],
          ].map(([e, t, d], i) => (
            <div key={t} className="anim-up flex items-center gap-4 rounded-2xl bg-emerald-50 p-3 pr-5" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-700 shadow"><VisualIcon mark={e} className="h-6 w-6" /></span>
              <p className="text-[17px] leading-tight"><b className="text-emerald-900">{t}</b> <span className="text-slate-600">— {d}</span></p>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

function S6() {
  const steps = [
    ["rain", "Collect", "Rain, river or lake water"],
    ["tank", "Store", "Underground reservoir"],
    ["soil", "Filter", "Keeps pipes unblocked"],
    ["sun", "Pump", "Solar-powered"],
    ["tools", "Distribute", "Pipes to every zone"],
    ["sprinkler", "Sprinkle", "Adjustable, rain-like"],
    ["leaf", "Grow", "Right water, right time"],
  ];
  return (
    <Shell tone="dark" tag="How it works" title="From rainwater to healthy crops">
      <div className="relative mt-10 flex gap-3">
        <div className="absolute left-10 right-10 top-8 h-1 rounded-full bg-yellow-300/60" />
        {steps.map(([e, t, d], i) => (
          <div key={t} className="anim-up relative flex-1 text-center" style={{ animationDelay: `${i * 0.15}s` }}>
            <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-yellow-300 bg-emerald-900 text-yellow-200"><VisualIcon mark={e} className="h-7 w-7" /></div>
            <p className="mt-3 text-xs font-bold text-yellow-300">STEP {i + 1}</p>
            <p className="text-lg font-bold">{t}</p>
            <p className="text-[13px] leading-tight text-sky-100">{d}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 grid grid-cols-3 gap-5">
        {[
          ["sensor Sensors", "Soil moisture, temperature, humidity and water level"],
          ["controller Controller", "Receives sensor data and runs the pump and valves — even offline"],
          ["mobile Mobile app", "Alerts, schedules, manual or automatic mode, history"],
        ].map(([t, d]) => (
          <div key={t} className="rounded-2xl bg-white/10 p-5 backdrop-blur">
            <p className="flex items-center gap-2 text-xl font-bold text-yellow-300"><MarkLabel label={t} /></p>
            <p className="mt-1 text-sky-50">{d}</p>
          </div>
        ))}
      </div>
    </Shell>
  );
}

function S7() {
  const inputs = ["plant Soil moisture", "temperature Temperature & humidity", "weather Weather & rain forecast", "crop Crop water needs", "reservoir Reservoir level", "soil Soil fertility", "location Field boundary"];
  const outs = [["play", "Start the pump", "when soil is dry and water is available"], ["pause", "Hold", "when rain is expected"], ["stop", "Stop", "at target moisture or a safe limit"], ["alert", "Alert the farmer", "in the app"]];
  return (
    <Shell tone="light" tag="The AI brain" title="Irrigation decisions powered by data">
      <div className="flex items-center gap-6">
        <div className="w-4/12 space-y-2">
          {inputs.map((t, i) => (
            <div key={t} className="anim-up rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-[17px] font-semibold text-sky-900" style={{ animationDelay: `${i * 0.08}s` }}><MarkLabel label={t} /></div>
          ))}
        </div>
        <ArrowRight className="h-10 w-10 text-yellow-500" aria-hidden="true" />
        <div className="anim-ring flex h-56 w-56 flex-col items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-sky-600 text-center text-white shadow-2xl">
          <Cpu className="h-14 w-14" aria-hidden="true" />
          <p className="mt-1 text-xl font-extrabold">AI engine</p>
          <p className="text-xs">several conditions<br />work together</p>
        </div>
        <ArrowRight className="h-10 w-10 text-yellow-500" aria-hidden="true" />
        <div className="w-4/12 space-y-3">
          {outs.map(([e, t, d], i) => (
            <div key={t} className="anim-up flex items-center gap-3 rounded-2xl bg-emerald-50 p-3" style={{ animationDelay: `${0.3 + i * 0.12}s` }}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-300 text-emerald-900"><VisualIcon mark={e} className="h-5 w-5" /></span>
              <p className="leading-tight"><b className="text-emerald-900">{t}</b><br /><span className="text-sm text-slate-600">{d}</span></p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-6 rounded-2xl bg-yellow-100 p-4 text-center text-[17px] font-semibold text-emerald-900">
        Example: a spinach farm's soil turns dry → AI checks crop needs, temperature, forecast and stored water → pump starts → stops at target moisture, never beyond the field boundary.
      </p>
    </Shell>
  );
}

function S8() {
  return (
    <Shell tone="sun" tag="Smart water" title="Store rain underground. Give it back like rain.">
      <div className="flex gap-10">
        <div className="relative h-[430px] w-[590px] shrink-0 overflow-hidden rounded-3xl border-4 border-white shadow-xl">
          <div className="absolute inset-x-0 top-0 h-[200px] bg-gradient-to-b from-sky-400 to-sky-100">
            <CloudRain className="absolute left-6 top-3 h-12 w-12 text-white" aria-hidden="true" />
            <CloudRain className="absolute left-40 top-6 h-10 w-10 text-white" aria-hidden="true" />
            <Sun className="absolute right-8 top-3 h-12 w-12 text-yellow-300" aria-hidden="true" />
            {[...Array(9)].map((_, i) => (
              <span key={i} className="anim-drop absolute h-4 w-1 rounded-full bg-sky-700/70" style={{ left: `${12 + i * 9.5}%`, top: 80, animationDelay: `${i * 0.2}s` }} />
            ))}
            {[18, 46, 74].map((l) => (<Waves key={l} className="absolute h-6 w-6 text-blue-600" style={{ left: `${l}%`, top: 56 }} aria-hidden="true" />))}
          </div>
          <div className="absolute inset-x-0 top-[200px] flex h-6 items-center justify-around bg-green-500">{[0, 1, 2, 3, 4, 5, 6].map((i) => <Sprout key={i} className="-mt-5 h-6 w-6 text-emerald-950" aria-hidden="true" />)}</div>
          <div className="absolute inset-x-0 bottom-0 top-[224px] bg-gradient-to-b from-amber-800 to-amber-950">
            <div className="absolute left-12 top-8 flex h-[130px] w-[330px] items-center justify-center rounded-2xl border-4 border-sky-300 bg-gradient-to-b from-sky-400 to-blue-700 text-center text-white shadow-inner">
              <div><Droplets className="mb-1 h-8 w-8 text-blue-300" aria-hidden="true" /><p className="font-bold">Underground reservoir</p><p className="text-xs text-sky-100">protected from evaporation</p></div>
            </div>
            <div className="absolute right-12 top-10 text-center text-sm font-semibold text-yellow-200"><Sun className="mx-auto h-8 w-8" aria-hidden="true" />Solar<br />pump → pipes<br />→ sprinklers</div>
            <div className="absolute bottom-3 left-4 text-xs text-amber-200">Sensors in soil: stop when moisture is enough</div>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-4">
          {[
            ["1", "Collect", "from rain, rivers or lakes"],
            ["2", "Store safely", "underground in the field — cooler, cleaner, less evaporation"],
            ["3", "Irrigate like rain", "gentle sprinklers from above, only where the crop is"],
            ["4", "Stop on time", "soil sensors confirm enough water, then the pump stops"],
          ].map(([n, t, d]) => (
            <div key={n} className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-2xl font-extrabold text-yellow-300">{n}</span>
              <p className="text-lg leading-snug"><b>{t}</b> — {d}</p>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

function PhoneMockup() {
  return (
    <div className="anim-float relative mx-auto h-[500px] w-[250px] overflow-hidden rounded-[2.4rem] border-[8px] border-slate-900 bg-slate-50 shadow-2xl">
      <div className="bg-gradient-to-r from-green-600 to-sky-600 px-4 pb-4 pt-6 text-white">
        <p className="text-[11px] opacity-80">Field A · Tomatoes</p>
        <p className="text-lg font-bold">Hinga Weze</p>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3 text-center text-[11px] font-semibold">
        {[["plant", "28%", "Soil"], ["temperature", "24°C", "Temp"], ["water", "68%", "Humidity"]].map(([mark, value, label]) => (
          <div key={label} className="rounded-xl bg-white p-2 shadow"><VisualIcon mark={mark} className="mx-auto h-4 w-4 text-emerald-700" /><p className="text-base font-extrabold text-emerald-700">{value}</p><p className="text-slate-500">{label}</p></div>
        ))}
      </div>
      <div className="mx-3 rounded-xl bg-white p-3 shadow">
        <div className="flex justify-between text-[11px] font-semibold"><span>Reservoir level</span><span>72%</span></div>
        <div className="mt-1 h-3 rounded-full bg-sky-100"><div className="h-3 w-[72%] rounded-full bg-gradient-to-r from-sky-400 to-blue-600" /></div>
      </div>
      <div className="mx-3 mt-3 flex items-center justify-between rounded-xl bg-yellow-300 p-3 text-[12px] font-bold text-emerald-950">
        <span>Status: Irrigating</span><span className="h-3 w-3 animate-ping rounded-full bg-green-600" />
      </div>
      <div className="mx-3 mt-3 flex gap-2 text-center text-[11px] font-bold">
        <span className="flex-1 rounded-lg bg-emerald-600 py-2 text-white">Automatic</span>
        <span className="flex-1 rounded-lg bg-slate-200 py-2 text-slate-600">Manual</span>
      </div>
      <div className="mx-3 mt-3 flex items-center gap-2 rounded-xl bg-white p-3 text-[11px] shadow"><Bell className="h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />Rain expected 16:00 — next run skipped</div>
      <div className="absolute inset-x-0 bottom-0 flex justify-around bg-white py-2 text-[11px] font-semibold text-slate-500"><span className="text-green-600">Home</span><span>History</span><span>Settings</span></div>
    </div>
  );
}

function S9() {
  return (
    <Shell tone="light" tag="Mobile app" title="Run your farm from your phone">
      <div className="flex items-center gap-12">
        <div className="w-5/12"><PhoneMockup /></div>
        <div className="w-7/12 space-y-4">
          {[
            ["data", "Live monitoring", "soil moisture, temperature, humidity, reservoir level, pump status"],
            ["sync", "Automatic or manual", "schedule runs or start the pump remotely"],
            ["alert", "Smart notifications", "dry soil, low water, rain coming, system alerts"],
            ["history", "History & water use", "see what was used and when, season by season"],
            ["offline", "Works offline", "basic automatic irrigation continues without internet"],
          ].map(([e, t, d], i) => (
            <div key={t} className="anim-up flex items-center gap-4 rounded-2xl bg-sky-50 p-4" style={{ animationDelay: `${i * 0.1}s` }}>
              <VisualIcon mark={e} className="h-7 w-7 shrink-0 text-emerald-700" />
              <p className="text-[17px] leading-tight"><b className="text-emerald-900">{t}</b> — <span className="text-slate-600">{d}</span></p>
            </div>
          ))}
          <p className="flex items-center gap-2 rounded-2xl bg-emerald-700 p-4 text-lg font-bold text-white"><Timer className="h-5 w-5 shrink-0 text-yellow-300" aria-hidden="true" />Be at work. Be at market. Your farm is still in your pocket.</p>
        </div>
      </div>
    </Shell>
  );
}

function S10() {
  return (
    <Shell tone="light" tag="Market" title="Who needs Hinga Weze na Uhira?">
      <div className="flex gap-8">
        <div className="w-1/2">
          <div className="flex flex-wrap gap-3">
            {["farmer Small-scale farmers", "vegetable Vegetable growers", "tomato Tomatoes", "onion Onions", "food Spinach & lettuce", "cooperative Cooperatives", "business Horticulture businesses"].map((t, i) => (
              <span key={t} className="anim-up rounded-full bg-emerald-100 px-5 py-3 text-lg font-semibold text-emerald-900" style={{ animationDelay: `${i * 0.08}s` }}><MarkLabel label={t} /></span>
            ))}
          </div>
          <div className="mt-8 rounded-3xl bg-yellow-100 p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-800">Where we start</p>
            <p className="mt-2 text-xl font-semibold text-emerald-950">Suitable small farms and vegetable growers first, then expand using customer feedback and field-test results.</p>
          </div>
        </div>
        <div className="grid w-1/2 grid-cols-2 gap-4">
          {[[2.2, 1, "M", "agricultural households"], [65.3, 1, "%", "of all Rwandan households"], [12, 0, "%", "practised irrigation in Season A 2025"], [88, 0, "%", "did not practise irrigation"]].map(([n, d, s, l], i) => (
            <div key={l} className={`rounded-3xl p-6 text-center shadow-lg ${i === 3 ? "bg-gradient-to-br from-green-600 to-sky-600 text-white" : "bg-sky-50"}`}>
              <p className={`text-5xl font-extrabold ${i === 3 ? "text-yellow-300" : "text-emerald-700"}`}><Count to={n} dec={d} suffix={s} /></p>
              <p className="mt-2 text-[15px] font-medium">{l}</p>
            </div>
          ))}
          <p className="col-span-2 text-xs text-slate-500">Sources: NISR Agricultural Household Survey 2024; NISR Season A Agricultural Survey 2025. 88% = 100% − 12%.</p>
        </div>
      </div>
    </Shell>
  );
}

function S11() {
  const cols = ["Manual watering", "Timers & basic kits", "Hinga Weze na Uhira"];
  const rows = [
    ["Decides using soil, weather & crop data", "x", "x", "y"],
    ["Stores rain & river water underground", "x", "x", "y"],
    ["Solar-powered pumping", "x", "p", "y"],
    ["Field-boundary lock", "x", "x", "y"],
    ["Soil fertility insight", "x", "x", "y"],
    ["Phone control, works offline", "x", "p", "y"],
    ["Saves farmer's time", "x", "p", "y"],
    ["Designed for small-farm budgets", "y", "p", "y"],
  ];
  const ic = { y: Check, x: X, p: Circle };
  return (
    <Shell tone="light" tag="Why we're different" title="More than a timer. A farming brain.">
      <div className="overflow-hidden rounded-3xl border-2 border-emerald-100 shadow-lg">
        <div className="grid grid-cols-[2.2fr_1fr_1fr_1.2fr] bg-emerald-800 text-center text-[15px] font-bold text-white">
          <div className="p-3 text-left">Feature</div>
          {cols.map((c, i) => (<div key={c} className={`p-3 ${i === 2 ? "bg-yellow-400 text-emerald-950" : ""}`}>{c}</div>))}
        </div>
        {rows.map(([f, ...v], r) => (
          <div key={f} className={`grid grid-cols-[2.2fr_1fr_1fr_1.2fr] items-center text-center text-xl ${r % 2 ? "bg-sky-50" : "bg-white"}`}>
            <div className="p-2 pl-4 text-left text-[16px] font-semibold text-slate-700">{f}</div>
            {v.map((x, i) => {
              const Icon = ic[x];
              return <div key={i} className={`p-2 ${i === 2 ? "bg-yellow-50" : ""}`}><Icon className={`mx-auto h-5 w-5 ${x === "x" ? "text-slate-400" : x === "p" ? "text-yellow-500" : "text-emerald-600"}`} aria-label={x === "y" ? "Yes" : x === "p" ? "Partly" : "No"} /></div>;
            })}
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-slate-500">Check: yes · circle: partly · x: no. General categories of solutions; competitor review to be refined with field research.</p>
    </Shell>
  );
}

function S12() {
  const rows = [
    ["ESP32 controller + soil moisture sensors", "1 set", 24000, "Confirmed"],
    ["100 W solar panel + charge controller", "1 set", 180000, "Estimate"],
    ["DC water pump, sized for pilot field", "1", 150000, "Estimate"],
    ["500 L water storage tank", "1", 120000, "Estimate"],
    ["Temperature / humidity sensor", "1", 25000, "Estimate"],
    ["Filter, screen and connectors", "1 set", 35000, "Estimate"],
    ["Mainline and irrigation pipes", "1 set", 110000, "Estimate"],
    ["Valves and sprinklers", "1 set", 80000, "Estimate"],
    ["Weatherproof enclosure, cable and fittings", "1 set", 50000, "Estimate"],
    ["Transport, assembly and field testing", "1 allowance", 70000, "Estimate"],
    ["Taxes, replacement parts and contingency", "1 allowance", 106000, "Contingency"],
  ];
  const total = rows.reduce((sum, [, , amount]) => sum + amount, 0);
  const formatRwf = (amount) => amount.toLocaleString("en-US");
  return (
    <Shell tone="light" tag="Estimated prototype budget" title="A complete pilot system under RWF 1 million">
      <div className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-lg">
        <div className="grid grid-cols-[2.4fr_.8fr_1.2fr] bg-emerald-800 px-5 py-3 text-sm font-bold text-white">
          <span>Resource</span><span>Qty</span><span className="text-right">Estimated cost (RWF)</span>
        </div>
        {rows.map(([item, quantity, amount], i) => (
          <div key={item} className={`grid grid-cols-[2.4fr_.8fr_1.2fr] items-center px-5 py-[7px] text-[14px] ${i % 2 ? "bg-green-50" : "bg-white"}`}>
            <span className="font-semibold text-emerald-950">{item}</span>
            <span className="text-slate-600">{quantity}</span>
            <span className="text-right font-semibold text-emerald-800">{formatRwf(amount)}</span>
          </div>
        ))}
        <div className="grid grid-cols-[2.4fr_.8fr_1.2fr] items-center bg-yellow-300 px-5 py-3 text-base font-extrabold text-emerald-950">
          <span>ESTIMATED PROJECT TOTAL</span><span /><span className="text-right">{formatRwf(total)} RWF</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-2xl bg-emerald-50 px-5 py-3 text-sm">
        <p className="font-semibold text-emerald-900"><Wallet className="mr-2 inline h-4 w-4" /> Estimated total: RWF {formatRwf(total)} · RWF 50,000 below the RWF 1,000,000 ceiling.</p>
        <p className="text-right text-slate-600">RWF 24,000 confirmed; all other line items are estimates pending local supplier quotes.</p>
      </div>
      <p className="mt-2 text-[11px] leading-snug text-slate-500">
        Estimates cover a one-zone pilot and include local delivery, assembly and a contingency allowance. Confirm specifications and prices with local suppliers before purchase. Context/specification references: <a className="underline" href="https://www.fao.org/giews/countrybrief/country.jsp?code=RWA" target="_blank" rel="noreferrer">FAO Rwanda Country Brief</a> · <a className="underline" href="https://www.dfrobot.com/product-1385.html" target="_blank" rel="noreferrer">DFRobot capacitive soil-sensor specifications</a>.
      </p>
    </Shell>
  );
}

function S13() {
  const streams = [["tools", "Installation", "Set-up of each farm system"], ["package", "Equipment sales", "Controllers, sensors, pumps, sprinklers"], ["maintenance", "Maintenance", "Service plans and spare parts"], ["training", "Farmer training", "Use, care and best practice"]];
  return (
    <Shell tone="light" tag="Business model" title="How the project earns revenue">
      <div className="grid grid-cols-4 gap-5">
        {streams.map(([e, t, d], i) => (
          <div key={t} className="anim-up rounded-3xl bg-gradient-to-b from-sky-50 to-emerald-50 p-6 text-center shadow-lg" style={{ animationDelay: `${i * 0.12}s` }}>
            <VisualIcon mark={e} className="mx-auto h-11 w-11 text-emerald-700" />
            <p className="mt-3 text-xl font-bold text-emerald-900">{t}</p>
            <p className="mt-1 text-[15px] text-slate-600">{d}</p>
          </div>
        ))}
      </div>
      <div className="mt-7 grid grid-cols-2 gap-6">
        <div className="rounded-3xl bg-emerald-800 p-6 text-white">
          <p className="text-xl font-bold text-yellow-300">Unit profit</p>
          <p className="mt-2 text-lg">Selling price − equipment − installation − service costs</p>
          <p className="mt-2 text-sm text-sky-100">Figures finalised from pilot results and supplier quotations.</p>
        </div>
        <div className="rounded-3xl bg-yellow-100 p-6 text-emerald-950">
          <p className="text-xl font-bold">Growth levers</p>
          <p className="mt-2 text-lg">Cooperative installations share set-up cost · partnerships with agricultural organisations widen access</p>
        </div>
      </div>
    </Shell>
  );
}

function S14() {
  const steps = [["farmer", "Confirm needs", "Farmer interviews and local supplier costs"], ["build", "Build prototype", "Assemble and test"], ["plant", "Community pilot", "Install with participating farmers"], ["measure", "Evaluate", "Water use, reliability, feedback — then expand"]];
  return (
    <Shell tone="dark" tag="Roadmap" title="From prototype to community pilot">
      <div className="relative mt-14 grid grid-cols-4 gap-5">
        <div className="absolute left-12 right-12 top-7 h-1 bg-yellow-300/60" />
        {steps.map(([e, t, d], i) => (
          <div key={t} className="anim-up relative" style={{ animationDelay: `${i * 0.2}s` }}>
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-yellow-300 text-2xl font-extrabold text-emerald-950">{i + 1}</div>
            <div className="mt-5 rounded-3xl bg-white/10 p-6 backdrop-blur">
              <VisualIcon mark={e} className="h-9 w-9 text-green-200" />
              <p className="mt-2 text-xl font-bold text-yellow-300">{t}</p>
              <p className="mt-1 text-sky-50">{d}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-10 text-center text-xl font-semibold text-sky-100">Result: real evidence on cost, reliability, farmer value and profit — before expansion.</p>
    </Shell>
  );
}

function S15() {
  return (
    <Shell tone="light" tag="Risks & impact" title="Honest about risks, clear on benefits">
      <div className="grid grid-cols-2 gap-8">
        <div className="rounded-3xl bg-slate-50 p-6 shadow-inner">
          <p className="flex items-center gap-2 text-2xl font-bold text-sky-800"><TriangleAlert className="h-6 w-6" aria-hidden="true" />Risks → our response</p>
          {[["Equipment failure", "maintenance & spare parts"], ["Limited internet", "local automatic operation"], ["Affordability", "group purchase, phased payment"], ["Farmer adoption", "training & feedback-led design"]].map(([r, a]) => (
            <p key={r} className="mt-3 flex items-center gap-3 rounded-xl bg-white p-3 text-[17px] shadow"><b className="w-44 text-slate-800">{r}</b><span>→</span><span className="text-emerald-700">{a}</span></p>
          ))}
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-emerald-700 to-sky-700 p-6 text-white shadow-xl">
          <p className="flex items-center gap-2 text-2xl font-bold text-yellow-300"><Globe2 className="h-6 w-6" aria-hidden="true" />Value to measure in the pilot</p>
          {[["farmer", "Farmers", "less hand-watering time, better irrigation decisions, smarter water use"], ["community", "Community", "local skills, installation & maintenance jobs, stronger livelihoods"], ["tomato", "Food system", "steadier harvests and supply in a changing climate"]].map(([e, t, d]) => (
            <div key={t} className="mt-3 flex gap-3 rounded-xl bg-white/10 p-3"><VisualIcon mark={e} className="h-6 w-6 shrink-0 text-yellow-300" /><p className="text-[17px] leading-tight"><b>{t}:</b> {d}</p></div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

function S16() {
  return (
    <div className="relative flex h-full w-full items-center overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-sky-900 px-16 text-white" style={FONT}>
      <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-yellow-400/20 blur-3xl" />
      <div className="relative z-10 w-3/5 pr-10 anim-up">
        <span className="rounded-full bg-yellow-400 px-4 py-1 text-sm font-bold uppercase tracking-widest text-emerald-950">The ask</span>
        <h2 className="mt-5 text-[52px] font-extrabold leading-tight">Let's build and test the <span className="text-yellow-300">first prototype</span></h2>
        <ul className="mt-6 space-y-3 text-xl text-sky-50">
          <li className="flex items-center gap-2"><Check className="h-5 w-5 text-yellow-300" />Confirm local material prices</li>
          <li className="flex items-center gap-2"><Check className="h-5 w-5 text-yellow-300" />Build and test the prototype</li>
          <li className="flex items-center gap-2"><Check className="h-5 w-5 text-yellow-300" />Run a community pilot with farmers</li>
        </ul>
        <p className="mt-6 text-xl font-semibold">Together we can turn better irrigation into a <span className="text-yellow-300">brighter future</span> for Rwanda's farmers.</p>
        <p className="mt-5 text-2xl font-extrabold text-yellow-300">Murakoze! · Thank you</p>
      </div>
      <div className="relative z-10 w-2/5 anim-up" style={{ animationDelay: ".2s" }}>
        <SmartImg src={IMG.c} alt="Farm" className="h-[440px] rounded-3xl border-4 border-yellow-300 shadow-2xl" />
      </div>
    </div>
  );
}

const SLIDES = [
  { n: "Hinga Weze na Uhira", c: S1 }, { n: "The problem", c: S2 }, { n: "The irrigation gap", c: S3 }, { n: "Farmer pain points", c: S4 },
  { n: "Our solution", c: S5 }, { n: "How it works", c: S6 }, { n: "The AI brain", c: S7 }, { n: "Smart water storage", c: S8 },
  { n: "Mobile app", c: S9 }, { n: "Market", c: S10 }, { n: "Why we're different", c: S11 }, { n: "Affordable by design", c: S12 },
  { n: "Business model", c: S13 }, { n: "Roadmap", c: S14 }, { n: "Risks & impact", c: S15 }, { n: "The ask", c: S16 },
];

/* ───────────── loaders ───────────── */
function Loader({ title, sub, messages, ms, onDone }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const t0 = Date.now();
    const id = setInterval(() => {
      const v = Math.min(((Date.now() - t0) / ms) * 100, 100);
      setP(v);
      if (v >= 100) { clearInterval(id); setTimeout(onDone, 250); }
    }, 40);
    return () => clearInterval(id);
  }, [ms, onDone]);
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-950 via-green-800 to-emerald-900 text-white" style={FONT}>
      <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-yellow-300/10 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-green-300/10 blur-3xl" />
      <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-white/5 shadow-[0_0_70px_rgba(253,224,71,0.12)]">
        <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full" role="img" aria-label="Animated water-wave loading indicator">
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="3" />
          <circle className="loader-progress" cx="60" cy="60" r="52" fill="none" stroke="#fde047" strokeLinecap="round" strokeWidth="3" strokeDasharray="92 235" />
          <path className="loader-wave" d="M24 52 C34 43 44 43 54 52 S74 61 84 52 S99 43 105 49" fill="none" stroke="#86efac" strokeLinecap="round" strokeWidth="3" strokeDasharray="18 8" />
          <path className="loader-wave" d="M17 65 C27 56 37 56 47 65 S67 74 77 65 S97 56 107 65" fill="none" stroke="#fde047" strokeLinecap="round" strokeWidth="3" strokeDasharray="18 8" />
          <path className="loader-wave" d="M24 78 C34 69 44 69 54 78 S74 87 84 78 S99 69 105 75" fill="none" stroke="#ffffff" strokeLinecap="round" strokeWidth="3" strokeDasharray="18 8" />
        </svg>
        <Droplets className="relative h-8 w-8 text-yellow-300" aria-hidden="true" />
      </div>
      <h1 className="relative mt-8 text-center text-4xl font-extrabold">{title}</h1>
      <p className="relative mt-2 text-green-100">{sub}</p>
      <div className="relative mt-8 h-2 w-72 overflow-hidden rounded-full bg-white/20">
        <div className="h-full rounded-full bg-yellow-300 transition-[width] duration-100" style={{ width: `${p}%` }} />
      </div>
      <p className="relative mt-3 h-5 text-sm text-yellow-200">{messages[Math.min(Math.floor((p / 100) * messages.length), messages.length - 1)]}</p>
    </div>
  );
}

/* ───────────── presenter ───────────── */
function Presenter({ start, onExit }) {
  const [i, setI] = useState(start);
  const next = useCallback(() => setI((x) => Math.min(x + 1, SLIDES.length - 1)), []);
  const prev = useCallback(() => setI((x) => Math.max(x - 1, 0)), []);
  useEffect(() => {
    const h = (e) => {
      if (["ArrowRight", " ", "PageDown", "Enter"].includes(e.key)) { e.preventDefault(); next(); }
      else if (["ArrowLeft", "PageUp", "Backspace"].includes(e.key)) prev();
      else if (e.key === "Home") setI(0);
      else if (e.key === "End") setI(SLIDES.length - 1);
      else if (e.key === "Escape") onExit();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [next, prev, onExit]);
  const Cur = SLIDES[i].c;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black" style={FONT}>
      <div className="relative" style={{ width: "min(100vw, calc(100vh * 16 / 9))" }}>
        <Fit>
          <div key={i} className="anim-fade h-full w-full"><Cur /></div>
        </Fit>
        <div className="absolute inset-y-0 left-0 w-1/5 cursor-w-resize" onClick={prev} />
        <div className="absolute inset-y-0 right-0 w-1/5 cursor-e-resize" onClick={next} />
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/60 to-transparent px-5 pb-3 pt-8 text-white opacity-0 transition-opacity hover:opacity-100">
          <button onClick={prev} aria-label="Previous slide" className="rounded-full bg-white/20 p-2 hover:bg-white/30"><ArrowRight className="h-4 w-4 rotate-180" /></button>
          <span className="text-sm font-semibold">{i + 1} / {SLIDES.length} · {SLIDES[i].n}</span>
          <div className="mx-3 h-1.5 flex-1 rounded-full bg-white/20"><div className="h-full rounded-full bg-yellow-300" style={{ width: `${((i + 1) / SLIDES.length) * 100}%` }} /></div>
          <button onClick={next} aria-label="Next slide" className="rounded-full bg-white/20 p-2 hover:bg-white/30"><ArrowRight className="h-4 w-4" /></button>
          <button onClick={onExit} className="rounded-full bg-yellow-400 px-4 py-1 text-sm font-bold text-emerald-950">Exit</button>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-white/10"><div className="h-full bg-yellow-300 transition-all duration-500" style={{ width: `${((i + 1) / SLIDES.length) * 100}%` }} /></div>
      </div>
    </div>
  );
}

/* ───────────── home ───────────── */
export default function Home() {
  const [phase, setPhase] = useState("home"); // home | loading | present
  const [start, setStart] = useState(0);
  const fsRef = useRef(false);

  useEffect(() => {
    const h = () => {
      if (fsRef.current && !document.fullscreenElement) { fsRef.current = false; setPhase("home"); }
    };
    document.addEventListener("fullscreenchange", h);
    return () => document.removeEventListener("fullscreenchange", h);
  }, []);

  const present = (from = 0) => {
    setStart(from);
    setPhase("loading");
    try {
      document.documentElement.requestFullscreen?.().then(() => (fsRef.current = true)).catch(() => {});
    } catch (e) { /* fullscreen optional */ }
  };
  const exit = useCallback(() => {
    fsRef.current = false;
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    setPhase("home");
  }, []);
  const toPresent = useCallback(() => setPhase("present"), []);

  if (phase === "loading")
    return (
      <>
        <GlobalStyle />
        <Loader title="Preparing your presentation" sub={`${SLIDES.length} slides · press Esc to exit`} ms={1800} onDone={toPresent}
          messages={["Loading slides…", "Loading images…", "Checking the projector…", "Good luck, " + PRESENTER + "!"]} />
      </>
    );

  if (phase === "present")
    return (
      <>
        <GlobalStyle />
        <Presenter start={start} onExit={exit} />
      </>
    );

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-white" style={FONT}>
      <GlobalStyle />
      <header className="relative z-10 flex items-center justify-between border-b border-green-100 bg-white/90 px-6 py-4 backdrop-blur sm:px-12">
        <div className="flex items-center gap-3">
          <img src={BRAND_LOGO} alt="Project logo" className="h-11 w-11 rounded-xl bg-white object-contain p-1 shadow-sm" />
          <div>
            <p className="text-lg font-extrabold leading-tight text-emerald-950">Hinga Weze <span className="text-emerald-700">na Uhira</span></p>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">Smart irrigation · Rwanda</p>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-8 sm:px-12">
        <section className="grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div className="anim-up">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-green-700">Smart agriculture · Rwanda</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-5xl">AI irrigation for more resilient farms.</h1>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Unpredictable rainfall and limited irrigation threaten farmers’ harvests and incomes. Hinga Weze na Uhira uses AI with soil and weather data to guide solar-powered watering, helping small farms use water wisely and reduce avoidable crop losses.
            </p>
            <div className="mt-6 flex items-center gap-4 rounded-2xl border border-green-100 bg-white p-3 shadow-sm">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-green-200 bg-blue-50 text-xl font-extrabold text-blue-900">
                {PROFILE_IMAGE
                  ? <img src={PROFILE_IMAGE} alt={`Profile of ${FULL_NAME}`} className="h-full w-full object-cover" />
                  : "IE"}
              </div>
              <div className="min-w-0">
                <p className="font-extrabold text-blue-950">{FULL_NAME}</p>
                <p className="text-sm font-semibold text-green-800">Programmer · Full-stack developer</p>
                <p className="mt-1 truncate text-xs text-slate-500">{SKILLS.join(" · ")}</p>
              </div>
            </div>
          </div>
          <div className="relative mx-auto h-[300px] w-full max-w-lg anim-up sm:h-[350px]" style={{ animationDelay: ".15s" }}>
            <SmartImg src={IMG.hero} alt="Smart irrigation in a farm field" className="anim-float-slow absolute right-0 top-0 h-[78%] w-[78%] rounded-[18px] border-4 border-white shadow-xl" />
            <SmartImg src={IMG.a} alt="Irrigated agricultural land" className="anim-float absolute bottom-0 left-0 h-[52%] w-[55%] rounded-[18px] border-4 border-white shadow-xl" />
            <SmartImg src={IMG.b} alt="Water sprinkler irrigating crops" className="absolute bottom-5 right-0 h-[40%] w-[43%] rounded-[18px] border-4 border-white shadow-xl" />
            <div className="absolute -bottom-2 right-5 rounded-xl border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-blue-950 shadow-md">
              <Cpu className="mr-2 inline h-4 w-4 text-green-700" />AI · Soil · Water
            </div>
          </div>
        </section>
        <div className="mt-8 flex justify-center">
          <button onClick={() => present(0)} className="group inline-flex items-center gap-3 rounded-full bg-green-700 px-9 py-4 text-lg font-extrabold text-white shadow-lg transition hover:-translate-y-1 hover:bg-green-800 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700">
            <Play className="h-5 w-5 fill-current text-yellow-300" aria-hidden="true" /> Start presentation <ArrowRight className="h-5 w-5 text-yellow-300 transition group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </div>
      </main>
    </div>
  );
}