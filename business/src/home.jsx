import { useCallback, useEffect, useRef, useState } from "react";

/* ───────────── EDIT ME ───────────── */
const PRESENTER = "Erneste";
const FULL_NAME = "Itangishaka Erneste";
const CONTACT = { phone: "+250 7XX XXX XXX", email: "your@email.com" };
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
@keyframes up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@keyframes fade{from{opacity:0}to{opacity:1}}
@keyframes grow{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes drop{0%{opacity:0;transform:translateY(0)}20%{opacity:1}100%{opacity:0;transform:translateY(90px)}}
@keyframes bar{from{width:0}to{width:100%}}
@keyframes pulseRing{0%{box-shadow:0 0 0 0 rgba(250,204,21,.7)}100%{box-shadow:0 0 0 24px rgba(250,204,21,0)}}
.anim-up{animation:up .7s both}.anim-fade{animation:fade .6s both}
.anim-grow{animation:grow 1s .2s both;transform-origin:bottom}
.anim-float{animation:floaty 4s ease-in-out infinite}
.anim-drop{animation:drop 1.6s linear infinite}
.anim-ring{animation:pulseRing 1.6s infinite}
.thumb *{animation:none!important}
`}</style>
  );
}

/* ───────────── helpers ───────────── */
function SmartImg({ src, alt, className = "", fallback = "💧" }) {
  const [st, setSt] = useState("loading");
  return (
    <div className={`relative overflow-hidden bg-sky-100 ${className}`}>
      {st !== "ok" && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sky-200 to-emerald-200">
          <span className={`text-6xl ${st === "loading" ? "animate-pulse" : ""}`}>{fallback}</span>
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
  return (
    <div className="relative flex h-full w-full items-center overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-sky-900 px-16 text-white" style={FONT}>
      <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-yellow-400/20 blur-3xl" />
      <div className="absolute -bottom-20 right-40 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="relative z-10 w-1/2 pr-10 anim-up">
        <span className="rounded-full bg-yellow-400 px-4 py-1 text-sm font-bold uppercase tracking-widest text-emerald-950">AI · Solar · Rainwater</span>
        <h1 className="mt-6 text-[68px] font-extrabold leading-[1.05]">
          Hinga Weze <span className="text-yellow-300">na Uhira</span>
        </h1>
        <p className="mt-5 text-2xl text-sky-100">AI irrigation that waters the right amount, at the right time — while you work.</p>
        <div className="mt-8 flex gap-3 text-sm font-semibold">
          {["💧 Save water", "⏱ Save time", "🌾 Grow more"].map((t) => (
            <span key={t} className="rounded-full bg-white/15 px-4 py-2 backdrop-blur">{t}</span>
          ))}
        </div>
        <p className="mt-10 text-sm text-sky-200">Pitch by {FULL_NAME} · Kigali, Rwanda</p>
      </div>
      <div className="relative z-10 w-1/2 anim-up" style={{ animationDelay: ".2s" }}>
        <SmartImg src={IMG.hero} alt="Smart irrigation" className="h-[470px] rounded-3xl border-4 border-yellow-300 shadow-2xl" />
        <div className="anim-float absolute -bottom-5 -left-8 rounded-2xl bg-white px-5 py-3 text-emerald-900 shadow-xl">
          <p className="text-xs font-semibold text-slate-500">Soil moisture</p>
          <p className="text-3xl font-extrabold text-sky-600">28% <span className="text-base text-green-600">→ irrigating</span></p>
        </div>
      </div>
    </div>
  );
}

function S2() {
  const stats = [
    ["54.8", 1, "%", "of Rwanda's workforce depends on agriculture", "The New Times, 2026"],
    ["13.4", 1, "%", "of farmers practise irrigation (12% of small-scale farmers)", "NISR Season A 2025"],
    ["1", 0, "M+ ha", "at high risk of soil erosion; ~25 t/ha topsoil lost a year", "Rwanda climate plan"],
  ];
  return (
    <Shell tag="The problem" title="When weather turns, harvests and prices follow">
      <div className="flex gap-8">
        <div className="w-5/12 rounded-3xl bg-gradient-to-br from-yellow-300 to-yellow-100 p-8 text-emerald-950 shadow-lg">
          <p className="text-sm font-bold uppercase tracking-widest">Kinigi Irish potatoes</p>
          <div className="mt-5 flex items-end gap-6">
            <div className="text-center">
              <div className="anim-grow w-24 rounded-t-xl bg-green-600" style={{ height: 40 }} />
              <p className="mt-2 text-xl font-extrabold">200</p>
              <p className="text-xs font-semibold">RWF · 2017</p>
            </div>
            <div className="text-center">
              <div className="anim-grow w-24 rounded-t-xl bg-sky-700" style={{ height: 230 }} />
              <p className="mt-2 text-xl font-extrabold">1,500</p>
              <p className="text-xs font-semibold">RWF · today</p>
            </div>
            <p className="pb-16 text-6xl font-extrabold text-emerald-800">7.5×</p>
          </div>
          <p className="mt-4 text-sm font-medium">Unpredictable rain → unpredictable harvests → unstable supply and prices.</p>
          <p className="mt-1 text-xs opacity-60">Farmer-reported market prices</p>
        </div>
        <div className="flex w-7/12 flex-col gap-4">
          {stats.map(([n, d, suf, label, src], i) => (
            <div key={label} className="anim-up flex items-center gap-5 rounded-2xl border-l-8 border-sky-500 bg-sky-50 p-5 shadow" style={{ animationDelay: `${0.2 + i * 0.15}s` }}>
              <p className="w-44 text-5xl font-extrabold text-emerald-700">
                <Count to={parseFloat(n)} dec={d} suffix={suf} />
              </p>
              <div>
                <p className="text-lg font-semibold leading-snug text-slate-800">{label}</p>
                <p className="text-xs font-medium text-slate-500">{src}</p>
              </div>
            </div>
          ))}
          <div className="rounded-2xl bg-emerald-800 p-5 text-white shadow">
            <p className="text-4xl font-extrabold text-yellow-300">10–15%</p>
            <p className="font-medium">projected fall in staple-crop yields by 2050 as the climate warms (Rwanda NDC 3.0)</p>
          </div>
        </div>
      </div>
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
            ["🏡", "2.2 million", "agricultural households — 65.3% of all households (Agricultural Household Survey 2024)"],
            ["🏔", "30%", "of farming households own less than 0.2 ha — small plots need small, affordable systems"],
            ["💰", "RWF 450 bn", "private-sector opportunity in climate-smart agriculture, led by irrigation (MINAGRI, RGF, IFC — 2025)"],
          ].map(([e, n, t]) => (
            <div key={n} className="flex items-start gap-4">
              <span className="text-4xl">{e}</span>
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
    ["☔", "Unpredictable rain", "Farmers depend on rainfall that no longer follows the calendar."],
    ["⏱", "Hours lost to hand-watering", "Manual watering takes labour and time away from other work."],
    ["🤔", "Guesswork", "Too much or too little water — crops suffer either way."],
    ["💸", "Automation is out of reach", "Affordable automated irrigation has limited access for small farms."],
  ];
  return (
    <Shell tag="Farmer pain points" title="A farmer cannot be everywhere at once">
      <div className="grid grid-cols-4 gap-5">
        {items.map(([e, t, d], i) => (
          <div key={t} className="anim-up rounded-3xl border-2 border-sky-100 bg-white p-6 shadow-lg" style={{ animationDelay: `${i * 0.12}s` }}>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-300 text-4xl">{e}</div>
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
          <SmartImg src={IMG.a} alt="Irrigation field" fallback="🌱" className="h-[170px] rounded-3xl shadow-lg" />
          <SmartImg src={IMG.b} alt="Sprinklers" fallback="🚿" className="h-[170px] rounded-3xl shadow-lg" />
        </div>
        <div className="w-7/12 space-y-3">
          <p className="text-xl text-slate-600">An affordable, <b className="text-emerald-700">solar-powered</b> smart irrigation system for Rwandan farms.</p>
          {[
            ["🧠", "AI decides when to water", "using soil, weather, climate and crop data"],
            ["🌧", "Harvests & stores water underground", "from rain, rivers or lakes — safely, with little evaporation"],
            ["📍", "Stays inside your field", "boundary lock so water never goes beyond the plot"],
            ["🧪", "Reads soil health", "fertility insight to guide fertilizer use"],
            ["📱", "Mobile app control", "monitor and command the farm from anywhere"],
          ].map(([e, t, d], i) => (
            <div key={t} className="anim-up flex items-center gap-4 rounded-2xl bg-emerald-50 p-3 pr-5" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow">{e}</span>
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
    ["🌧", "Collect", "Rain, river or lake water"],
    ["🕳", "Store", "Underground reservoir"],
    ["🧪", "Filter", "Keeps pipes unblocked"],
    ["☀️", "Pump", "Solar-powered"],
    ["🔧", "Distribute", "Pipes to every zone"],
    ["🚿", "Sprinkle", "Adjustable, rain-like"],
    ["🌿", "Grow", "Right water, right time"],
  ];
  return (
    <Shell tone="dark" tag="How it works" title="From rainwater to healthy crops">
      <div className="relative mt-10 flex gap-3">
        <div className="absolute left-10 right-10 top-8 h-1 rounded bg-yellow-300/60" />
        {steps.map(([e, t, d], i) => (
          <div key={t} className="anim-up relative flex-1 text-center" style={{ animationDelay: `${i * 0.15}s` }}>
            <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-yellow-300 bg-emerald-900 text-3xl">{e}</div>
            <p className="mt-3 text-xs font-bold text-yellow-300">STEP {i + 1}</p>
            <p className="text-lg font-bold">{t}</p>
            <p className="text-[13px] leading-tight text-sky-100">{d}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 grid grid-cols-3 gap-5">
        {[
          ["📡 Sensors", "Soil moisture, temperature, humidity and water level"],
          ["🧩 Controller", "Receives sensor data and runs the pump and valves — even offline"],
          ["📱 Mobile app", "Alerts, schedules, manual or automatic mode, history"],
        ].map(([t, d]) => (
          <div key={t} className="rounded-2xl bg-white/10 p-5 backdrop-blur">
            <p className="text-xl font-bold text-yellow-300">{t}</p>
            <p className="mt-1 text-sky-50">{d}</p>
          </div>
        ))}
      </div>
    </Shell>
  );
}

function S7() {
  const inputs = ["🌱 Soil moisture", "🌡 Temperature & humidity", "⛅ Weather & rain forecast", "🌾 Crop water needs", "🪣 Reservoir level", "🧪 Soil fertility", "📍 Field boundary"];
  const outs = [["▶", "Start the pump", "when soil is dry and water is available"], ["⏸", "Hold", "when rain is expected"], ["⏹", "Stop", "at target moisture or a safe limit"], ["🔔", "Alert the farmer", "in the app"]];
  return (
    <Shell tone="light" tag="The AI brain" title="Irrigation decisions powered by data">
      <div className="flex items-center gap-6">
        <div className="w-4/12 space-y-2">
          {inputs.map((t, i) => (
            <div key={t} className="anim-up rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-[17px] font-semibold text-sky-900" style={{ animationDelay: `${i * 0.08}s` }}>{t}</div>
          ))}
        </div>
        <div className="text-5xl text-yellow-500">➜</div>
        <div className="anim-ring flex h-56 w-56 flex-col items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-sky-600 text-center text-white shadow-2xl">
          <span className="text-6xl">🧠</span>
          <p className="mt-1 text-xl font-extrabold">AI engine</p>
          <p className="text-xs">several conditions<br />work together</p>
        </div>
        <div className="text-5xl text-yellow-500">➜</div>
        <div className="w-4/12 space-y-3">
          {outs.map(([e, t, d], i) => (
            <div key={t} className="anim-up flex items-center gap-3 rounded-2xl bg-emerald-50 p-3" style={{ animationDelay: `${0.3 + i * 0.12}s` }}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-300 text-xl">{e}</span>
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
            <span className="absolute left-6 top-3 text-5xl">☁️</span>
            <span className="absolute left-40 top-6 text-4xl">🌧</span>
            <span className="absolute right-8 top-3 text-5xl">☀️</span>
            {[...Array(9)].map((_, i) => (
              <span key={i} className="anim-drop absolute h-4 w-1 rounded bg-sky-700/70" style={{ left: `${12 + i * 9.5}%`, top: 80, animationDelay: `${i * 0.2}s` }} />
            ))}
            {[18, 46, 74].map((l) => (<span key={l} className="absolute text-2xl" style={{ left: `${l}%`, top: 56 }}>🚿</span>))}
          </div>
          <div className="absolute inset-x-0 top-[200px] flex h-6 items-center justify-around bg-green-500 text-lg">{[0, 1, 2, 3, 4, 5, 6].map((i) => <span key={i} className="-mt-5">🌱</span>)}</div>
          <div className="absolute inset-x-0 bottom-0 top-[224px] bg-gradient-to-b from-amber-800 to-amber-950">
            <div className="absolute left-12 top-8 flex h-[130px] w-[330px] items-center justify-center rounded-2xl border-4 border-sky-300 bg-gradient-to-b from-sky-400 to-blue-700 text-center text-white shadow-inner">
              <div><p className="text-3xl">💧</p><p className="font-bold">Underground reservoir</p><p className="text-xs text-sky-100">protected from evaporation</p></div>
            </div>
            <div className="absolute right-12 top-10 text-center text-sm font-semibold text-yellow-200">☀️ Solar<br />pump ➜ pipes<br />➜ sprinklers</div>
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

function Phone() {
  return (
    <div className="anim-float relative mx-auto h-[500px] w-[250px] overflow-hidden rounded-[2.4rem] border-[8px] border-slate-900 bg-slate-50 shadow-2xl">
      <div className="bg-gradient-to-r from-green-600 to-sky-600 px-4 pb-4 pt-6 text-white">
        <p className="text-[11px] opacity-80">Field A · Tomatoes</p>
        <p className="text-lg font-bold">Hinga Weze</p>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3 text-center text-[11px] font-semibold">
        {[["🌱", "28%", "Soil"], ["🌡", "24°C", "Temp"], ["💧", "68%", "Humidity"]].map(([e, v, l]) => (
          <div key={l} className="rounded-xl bg-white p-2 shadow"><p>{e}</p><p className="text-base font-extrabold text-emerald-700">{v}</p><p className="text-slate-500">{l}</p></div>
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
      <div className="mx-3 mt-3 rounded-xl bg-white p-3 text-[11px] shadow">🔔 Rain expected 16:00 — next run skipped</div>
      <div className="absolute inset-x-0 bottom-0 flex justify-around bg-white py-2 text-[11px] font-semibold text-slate-500"><span className="text-green-600">Home</span><span>History</span><span>Settings</span></div>
    </div>
  );
}

function S9() {
  return (
    <Shell tone="light" tag="Mobile app" title="Run your farm from your phone">
      <div className="flex items-center gap-12">
        <div className="w-5/12"><Phone /></div>
        <div className="w-7/12 space-y-4">
          {[
            ["📊", "Live monitoring", "soil moisture, temperature, humidity, reservoir level, pump status"],
            ["🔄", "Automatic or manual", "schedule runs or start the pump remotely"],
            ["🔔", "Smart notifications", "dry soil, low water, rain coming, system alerts"],
            ["📈", "History & water use", "see what was used and when, season by season"],
            ["📶", "Works offline", "basic automatic irrigation continues without internet"],
          ].map(([e, t, d], i) => (
            <div key={t} className="anim-up flex items-center gap-4 rounded-2xl bg-sky-50 p-4" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="text-3xl">{e}</span>
              <p className="text-[17px] leading-tight"><b className="text-emerald-900">{t}</b> — <span className="text-slate-600">{d}</span></p>
            </div>
          ))}
          <p className="rounded-2xl bg-emerald-700 p-4 text-lg font-bold text-white">Be at work. Be at market. Your farm is still in your pocket. ⏱</p>
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
            {["👩‍🌾 Small-scale farmers", "🥬 Vegetable growers", "🍅 Tomatoes", "🧅 Onions", "🥗 Spinach & lettuce", "🤝 Cooperatives", "🏢 Horticulture businesses"].map((t, i) => (
              <span key={t} className="anim-up rounded-full bg-emerald-100 px-5 py-3 text-lg font-semibold text-emerald-900" style={{ animationDelay: `${i * 0.08}s` }}>{t}</span>
            ))}
          </div>
          <div className="mt-8 rounded-3xl bg-yellow-100 p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-800">Where we start</p>
            <p className="mt-2 text-xl font-semibold text-emerald-950">Suitable small farms and vegetable growers first, then expand using customer feedback and field-test results.</p>
          </div>
        </div>
        <div className="grid w-1/2 grid-cols-2 gap-4">
          {[[2.2, 1, "M", "agricultural households"], [65.3, 1, "%", "of all Rwandan households"], [13.4, 1, "%", "of farmers irrigate today"], [86.6, 1, "%", "do not — our opportunity"]].map(([n, d, s, l], i) => (
            <div key={l} className={`rounded-3xl p-6 text-center shadow-lg ${i === 3 ? "bg-gradient-to-br from-green-600 to-sky-600 text-white" : "bg-sky-50"}`}>
              <p className={`text-5xl font-extrabold ${i === 3 ? "text-yellow-300" : "text-emerald-700"}`}><Count to={n} dec={d} suffix={s} /></p>
              <p className="mt-2 text-[15px] font-medium">{l}</p>
            </div>
          ))}
          <p className="col-span-2 text-xs text-slate-500">Sources: Agricultural Household Survey 2024; NISR Season A 2025. 86.6% = 100% − 13.4%.</p>
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
  const ic = { y: "✅", x: "❌", p: "🟡" };
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
            {v.map((x, i) => (<div key={i} className={`p-2 ${i === 2 ? "bg-yellow-50" : ""}`}>{ic[x]}</div>))}
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-slate-500">✅ yes · 🟡 partly · ❌ no. General categories of solutions; competitor review to be refined with field research.</p>
    </Shell>
  );
}

function S12() {
  const rows = [
    ["1", "ESP32 controller", "1", "14,000"],
    ["2", "Soil moisture sensors", "2", "10,000"],
    ["3", "Temperature / humidity sensor", "1", "To confirm"],
    ["4", "Solar panel + pump", "1", "Quote in progress"],
    ["5", "Tank, filter, pipes, sprinklers", "set", "Quote in progress"],
  ];
  return (
    <Shell tone="sun" tag="Affordable by design" title="Low-cost parts, local installation">
      <div className="flex gap-8">
        <div className="w-7/12 overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="grid grid-cols-[.4fr_2.6fr_.5fr_1.4fr] bg-emerald-800 p-3 text-sm font-bold text-white"><span>No.</span><span>Item</span><span>Qty</span><span className="text-right">Cost (RWF)</span></div>
          {rows.map(([n, i, q, c], k) => (
            <div key={n} className={`grid grid-cols-[.4fr_2.6fr_.5fr_1.4fr] p-3 text-[16px] ${k % 2 ? "bg-sky-50" : ""}`}>
              <span>{n}</span><span className="font-semibold">{i}</span><span>{q}</span>
              <span className={`text-right font-bold ${/\d/.test(c) ? "text-emerald-700" : "text-slate-400"}`}>{c}</span>
            </div>
          ))}
          <div className="flex justify-between bg-yellow-300 p-3 text-lg font-extrabold text-emerald-950"><span>Brain + first sensors (confirmed)</span><span>24,000 RWF</span></div>
        </div>
        <div className="w-5/12 space-y-3">
          <p className="text-lg font-bold text-emerald-900">How we keep it affordable</p>
          {["Low-power ESP32 controller, sensors and solar power", "Start with one zone, add more as you grow", "Group purchase for cooperatives", "Phased payment options to explore", "Local installation and maintenance"].map((t) => (
            <p key={t} className="flex gap-3 rounded-xl bg-white/70 p-3 text-[16px] font-medium"><span>💚</span>{t}</p>
          ))}
          <p className="text-xs opacity-70">Final prices confirmed from supplier quotations during the pilot.</p>
        </div>
      </div>
    </Shell>
  );
}

function S13() {
  const streams = [["🔧", "Installation", "Set-up of each farm system"], ["📦", "Equipment sales", "Controllers, sensors, pumps, sprinklers"], ["🛠", "Maintenance", "Service plans and spare parts"], ["🎓", "Farmer training", "Use, care and best practice"]];
  return (
    <Shell tone="light" tag="Business model" title="How the project earns revenue">
      <div className="grid grid-cols-4 gap-5">
        {streams.map(([e, t, d], i) => (
          <div key={t} className="anim-up rounded-3xl bg-gradient-to-b from-sky-50 to-emerald-50 p-6 text-center shadow-lg" style={{ animationDelay: `${i * 0.12}s` }}>
            <p className="text-5xl">{e}</p>
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
  const steps = [["🧑‍🌾", "Confirm needs", "Farmer interviews and local supplier costs"], ["🔌", "Build prototype", "Assemble and test"], ["🌱", "Community pilot", "Install with participating farmers"], ["📏", "Evaluate", "Water use, reliability, feedback — then expand"]];
  return (
    <Shell tone="dark" tag="Roadmap" title="From prototype to community pilot">
      <div className="relative mt-14 grid grid-cols-4 gap-5">
        <div className="absolute left-12 right-12 top-7 h-1 bg-yellow-300/60" />
        {steps.map(([e, t, d], i) => (
          <div key={t} className="anim-up relative" style={{ animationDelay: `${i * 0.2}s` }}>
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-yellow-300 text-2xl font-extrabold text-emerald-950">{i + 1}</div>
            <div className="mt-5 rounded-3xl bg-white/10 p-6 backdrop-blur">
              <p className="text-4xl">{e}</p>
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
          <p className="text-2xl font-bold text-sky-800">⚠ Risks → our response</p>
          {[["Equipment failure", "maintenance & spare parts"], ["Limited internet", "local automatic operation"], ["Affordability", "group purchase, phased payment"], ["Farmer adoption", "training & feedback-led design"]].map(([r, a]) => (
            <p key={r} className="mt-3 flex items-center gap-3 rounded-xl bg-white p-3 text-[17px] shadow"><b className="w-44 text-slate-800">{r}</b><span>→</span><span className="text-emerald-700">{a}</span></p>
          ))}
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-emerald-700 to-sky-700 p-6 text-white shadow-xl">
          <p className="text-2xl font-bold text-yellow-300">🌍 Value to measure in the pilot</p>
          {[["👩‍🌾", "Farmers", "less hand-watering time, better irrigation decisions, smarter water use"], ["🏘", "Community", "local skills, installation & maintenance jobs, stronger livelihoods"], ["🍅", "Food system", "steadier harvests and supply in a changing climate"]].map(([e, t, d]) => (
            <div key={t} className="mt-3 flex gap-3 rounded-xl bg-white/10 p-3"><span className="text-3xl">{e}</span><p className="text-[17px] leading-tight"><b>{t}:</b> {d}</p></div>
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
          <li>✔ Confirm local material prices</li>
          <li>✔ Build and test the prototype</li>
          <li>✔ Run a community pilot with farmers</li>
        </ul>
        <p className="mt-6 text-xl font-semibold">Together we can turn better irrigation into a <span className="text-yellow-300">brighter future</span> for Rwanda's farmers.</p>
        <div className="mt-6 flex gap-4 text-base font-semibold">
          <span className="rounded-full bg-white/15 px-4 py-2">📞 {CONTACT.phone}</span>
          <span className="rounded-full bg-white/15 px-4 py-2">✉ {CONTACT.email}</span>
        </div>
        <p className="mt-5 text-2xl font-extrabold text-yellow-300">Murakoze! · Thank you</p>
      </div>
      <div className="relative z-10 w-2/5 anim-up" style={{ animationDelay: ".2s" }}>
        <SmartImg src={IMG.c} alt="Farm" fallback="🌾" className="h-[440px] rounded-3xl border-4 border-yellow-300 shadow-2xl" />
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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-900 via-green-800 to-sky-900 text-white" style={FONT}>
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white/10 anim-ring">
        <span className="anim-float text-6xl">💧</span>
      </div>
      <h1 className="mt-8 text-4xl font-extrabold">{title}</h1>
      <p className="mt-2 text-sky-100">{sub}</p>
      <div className="mt-8 h-3 w-72 overflow-hidden rounded-full bg-white/20">
        <div className="h-full rounded-full bg-gradient-to-r from-yellow-300 to-green-400" style={{ width: `${p}%` }} />
      </div>
      <p className="mt-3 h-5 text-sm text-yellow-200">{messages[Math.min(Math.floor((p / 100) * messages.length), messages.length - 1)]}</p>
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
          <button onClick={prev} className="rounded-full bg-white/20 px-3 py-1 text-sm font-bold hover:bg-white/30">←</button>
          <span className="text-sm font-semibold">{i + 1} / {SLIDES.length} · {SLIDES[i].n}</span>
          <div className="mx-3 h-1.5 flex-1 rounded-full bg-white/20"><div className="h-full rounded-full bg-yellow-300" style={{ width: `${((i + 1) / SLIDES.length) * 100}%` }} /></div>
          <button onClick={next} className="rounded-full bg-white/20 px-3 py-1 text-sm font-bold hover:bg-white/30">→</button>
          <button onClick={onExit} className="rounded-full bg-yellow-400 px-4 py-1 text-sm font-bold text-emerald-950">Exit</button>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-white/10"><div className="h-full bg-yellow-300 transition-all duration-500" style={{ width: `${((i + 1) / SLIDES.length) * 100}%` }} /></div>
      </div>
    </div>
  );
}

/* ───────────── home ───────────── */
function greeting(d) {
  const h = parseInt(d.toLocaleString("en-US", { timeZone: "Africa/Kigali", hour: "numeric", hour12: false }), 10) % 24;
  if (h >= 5 && h < 12) return ["Good morning", "Mwaramutse", "🌅"];
  if (h >= 12 && h < 18) return ["Good afternoon", "Mwiriwe", "☀️"];
  return ["Good evening", "Mwiriwe", "🌙"];
}

export default function Home() {
  const [phase, setPhase] = useState("boot"); // boot | home | loading | present
  const [start, setStart] = useState(0);
  const [now, setNow] = useState(new Date());
  const fsRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

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
  const toHome = useCallback(() => setPhase("home"), []);
  const toPresent = useCallback(() => setPhase("present"), []);

  const [hi, rw, emoji] = greeting(now);
  const time = now.toLocaleTimeString("en-GB", { timeZone: "Africa/Kigali", hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString("en-GB", { timeZone: "Africa/Kigali", weekday: "long", day: "numeric", month: "long", year: "numeric" });

  if (phase === "boot")
    return (
      <>
        <GlobalStyle />
        <Loader title="Hinga Weze na Uhira" sub="Smart irrigation for Rwanda" ms={2200} onDone={toHome}
          messages={["Warming up the soil sensors…", "Collecting rainwater…", "Teaching the AI to farm…", "Ready!"]} />
      </>
    );

  if (phase === "loading")
    return (
      <>
        <GlobalStyle />
        <Loader title="Preparing your presentation" sub={`${SLIDES.length} slides · press Esc to exit`} ms={1800} onDone={toPresent}
          messages={["Loading slides…", "Loading images…", "Checking the projector…", "Good luck, " + PRESENTER + "! 🍀"]} />
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
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50" style={FONT}>
      <GlobalStyle />
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-emerald-100 bg-white/80 px-6 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-sky-600 text-xl">💧</span>
          <p className="text-lg font-extrabold text-emerald-900">Hinga Weze <span className="text-sky-600">na Uhira</span></p>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden text-sm font-semibold text-slate-500 sm:block">{time} · Kigali</span>
          <button onClick={() => present(0)} className="rounded-full bg-yellow-400 px-6 py-2 font-bold text-emerald-950 shadow transition hover:scale-105 hover:bg-yellow-300">▶ Present</button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-green-700 to-sky-700 p-8 text-white shadow-xl sm:p-12">
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-yellow-400/25 blur-3xl" />
          <p className="relative text-sm font-semibold text-sky-100">{date}</p>
          <h1 className="relative mt-2 text-4xl font-extrabold sm:text-5xl">{emoji} {hi}, {PRESENTER}!</h1>
          <p className="relative mt-1 text-2xl font-bold text-yellow-300">{rw}!</p>
          <p className="relative mt-4 max-w-2xl text-lg text-sky-50">Your pitch is ready: {SLIDES.length} slides, about 8 minutes. Pick any slide to start from there, or present from the beginning.</p>
          <div className="relative mt-6 flex flex-wrap items-center gap-4">
            <button onClick={() => present(0)} className="rounded-full bg-yellow-400 px-8 py-3 text-lg font-extrabold text-emerald-950 shadow-lg transition hover:scale-105 hover:bg-yellow-300">▶ Present from start</button>
            <span className="text-sm text-sky-100">← → / Space to move · Esc to exit</span>
          </div>
        </section>

        <h2 className="mt-10 text-2xl font-extrabold text-emerald-900">All slides</h2>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SLIDES.map((s, idx) => {
            const C = s.c;
            return (
              <button key={s.n} onClick={() => present(idx)} className="group overflow-hidden rounded-2xl bg-white text-left shadow-md ring-1 ring-emerald-100 transition hover:-translate-y-1 hover:shadow-xl hover:ring-yellow-400">
                <div className="thumb pointer-events-none"><Fit><C /></Fit></div>
                <div className="flex items-center justify-between p-3">
                  <p className="flex items-center gap-3 font-bold text-emerald-900">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-300 text-sm">{idx + 1}</span>{s.n}
                  </p>
                  <span className="text-xs font-semibold text-sky-600 opacity-0 transition group-hover:opacity-100">Present ▶</span>
                </div>
              </button>
            );
          })}
        </div>
        <p className="mt-10 text-center text-sm text-slate-400">Hinga Weze na Uhira · {FULL_NAME}</p>
      </main>
    </div>
  );
}