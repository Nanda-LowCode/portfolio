/* ============================================================
   Nandakumar P A — Portfolio interactions
   ============================================================ */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const html = document.documentElement;

  /* ---------- NAV STUCK + PROGRESS + ACTIVE ---------- */
  const nav = $("#nav");
  const progress = $("#progress");
  const navLinks = $$('.nav-links a[href^="#"]');
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("stuck", y > 40);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // active section highlight
  const secObs = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      const id = "#" + e.target.id;
      navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["work", "demo", "journey", "stack", "ventures"].forEach(id => {
    const el = document.getElementById(id); if (el) secObs.observe(el);
  });

  /* ---------- HERO READY ---------- */
  requestAnimationFrame(() => $("#hero").classList.add("ready"));

  /* ---------- REVEAL ---------- */
  const io = new IntersectionObserver(
    es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  $$(".rv").forEach(el => io.observe(el));

  /* ---------- COUNTERS ---------- */
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || "";
    const t0 = performance.now(), dur = 1100;
    (function tick(now) {
      const p = Math.min(1, (now - t0) / dur);
      const v = Math.round(end * (1 - Math.pow(1 - p, 3)));
      el.innerHTML = v.toLocaleString() + (suf ? `<span class="u">${suf}</span>` : "");
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
    cio.unobserve(el);
  }), { threshold: 0.6 });
  $$("[data-count]").forEach(el => cio.observe(el));

  /* ---------- PROJECT CURSOR GLOW ---------- */
  document.addEventListener("pointermove", e => {
    const c = e.target.closest(".proj");
    if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty("--mx", (e.clientX - r.left) + "px");
    c.style.setProperty("--my", (e.clientY - r.top) + "px");
  });

  /* ============================================================
     TIMELINE DATA
     ============================================================ */
  const JOURNEY = [
    { when: "Jun 2025 — Present", co: "TCS", role: "Assistant Consultant · Kochi", pts: [
      "Built a Canvas app on SharePoint enabling secure internal ↔ external collaboration, with domain-level access control.",
      "Power Automate approval workflows for external-access requests, plus auto-revocation for compliance & governance.",
      "Shipped a Power Pages vendor portal (Liquid + Web APIs) for multi-step registration & document management.",
      "Resolved gnarly Dataverse Web API / FetchXML integrations — UTC alignment & HTML-entity encoding across stations."
    ]},
    { when: "Jul 2022 — May 2025", co: "HCLTech", role: "Lead Consultant · Bengaluru", pts: [
      "Led a team of three supporting Fusion & Citizen developers; ran Power Platform training for Blue Prism devs.",
      "Incident Management app replaced ServiceNow (PagerDuty-integrated) — cutting licensing cost & speeding tracking.",
      "Inventory app with real-time tracking, multi-level approvals & predictive analytics — proposed for multi-plant rollout.",
      "Built MFA OTP retrieval (Azure Key Vault + C#) and a Damage Reporting app with barcode/VIN scan & annotation."
    ]},
    { when: "Sep 2021 — Jul 2022", co: "Mindtree", role: "Module Lead · Bengaluru", pts: [
      "Embedded Canvas Custom Pages into Model-Driven apps, lifting UX and functionality.",
      "Power Automate flows triggering real-time security notifications for Dynamics 365 users.",
      "Ran error-free environment migrations via solutions; automated SharePoint & Azure Blob data flows.",
      "Led four developers with guidance, code reviews & mentoring."
    ]},
    { when: "Dec 2016 — Sep 2021", co: "Wipro", role: "Senior Software Engineer · Hyderabad", pts: [
      "Built & maintained enterprise PowerApps for the aviation sector.",
      "Led SharePoint Online migrations — converting legacy Nintex & InfoPath into modern PowerApps.",
      "Designed automated approval processes for business-critical operations; delivered hypercare support.",
      "Managed a SharePoint migration team ensuring data integrity & minimal disruption."
    ]}
  ];
  $("#timeline").innerHTML = JOURNEY.map(j => `
    <div class="tl-item rv">
      <span class="tl-dot"></span>
      <div class="tl-card">
        <div class="tl-when">${j.when}</div>
        <h3>${j.co}</h3>
        <div class="tl-role">${j.role}</div>
        <ul>${j.pts.map(p => `<li>${p}</li>`).join("")}</ul>
      </div>
    </div>`).join("");
  $$("#timeline .rv").forEach(el => io.observe(el));

  /* ============================================================
     PROJECTS DATA
     ============================================================ */
  const ic = {
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
    box: '<path d="M3 7l9-4 9 4-9 4-9-4Z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/>',
    scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
  };
  const PROJECTS = [
    { feat: true, kind: "HCLTech · Canvas App", icon: "bell", title: "Incident Management",
      desc: "A Canvas app that replaced ServiceNow for incident tracking, integrated directly with PagerDuty. Cut licensing costs and made triage faster and clearer for on-call teams.",
      tags: ["PowerApps", "PagerDuty", "Power Automate", "Dataverse"],
      impact: [["−$$$", "Licensing cost"], ["↑", "Triage speed"], ["1", "Tool retired"]] },
    { feat: true, kind: "HCLTech · Canvas App", icon: "box", title: "Inventory Management",
      desc: "Real-time inventory tracking with multi-level approvals and predictive analytics for production planning. Recognised in the company newsletter and proposed for rollout across multiple plants.",
      tags: ["PowerApps", "Power BI", "Predictive analytics", "Approvals"],
      impact: [["multi", "Plant rollout"], ["real-time", "Stock view"], ["★", "Newsletter feature"]] },
    { kind: "HCLTech · Canvas App", icon: "scan", title: "Damage Reporting",
      desc: "Vehicle damage reporting with barcode / VIN scanning, image capture and in-app annotation for precise visual documentation.",
      tags: ["Barcode / VIN", "Image capture", "Annotation"] },
    { kind: "HCLTech · Security", icon: "lock", title: "MFA OTP Retrieval",
      desc: "A secure OTP retrieval system for service accounts, built on Azure Key Vault with a C# backend.",
      tags: ["Azure Key Vault", "C#", "Security"] },
    { kind: "TCS · Canvas + Power Pages", icon: "users", title: "Secure External Collaboration",
      desc: "SharePoint-integrated collaboration with domain-level access control, approval workflows for external access, and automatic revocation once tasks complete.",
      tags: ["SharePoint", "Power Pages", "Access control", "Governance"] },
    { kind: "HCLTech · Canvas App", icon: "clock", title: "Shift Allowance",
      desc: "Automated shift approvals and payroll processing — cutting manual errors and processing time for operations teams.",
      tags: ["Power Automate", "Payroll", "Approvals"] }
  ];
  $("#projGrid").innerHTML = PROJECTS.map((p, i) => `
    <article class="proj rv ${p.feat ? "feat" : ""} ${i % 2 ? "rv-d1" : ""}">
      <div class="proj-top">
        <div class="proj-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${ic[p.icon]}</svg></div>
        <span class="proj-kind">${p.kind}</span>
      </div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="proj-tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
      ${p.impact ? `<div class="proj-impact">${p.impact.map(x => `<div class="pi"><b>${x[0]}</b><span>${x[1]}</span></div>`).join("")}</div>` : ""}
    </article>`).join("");
  $$("#projGrid .rv").forEach(el => io.observe(el));

  /* ============================================================
     SKILLS / STACK
     ============================================================ */
  const sIc = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    ms: '<path d="M12 3v18M3 12h18"/><rect x="3" y="3" width="18" height="18" rx="2"/>',
    code: '<path d="m8 6-6 6 6 6M16 6l6 6-6 6"/>',
    db: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/>',
    mig: '<path d="M21 12a9 9 0 1 1-9-9"/><path d="M21 3v6h-6"/>',
    cloud: '<path d="M17.5 19a4.5 4.5 0 0 0 .5-9 6 6 0 0 0-11.6-1.5A4 4 0 0 0 6 19h11.5Z"/>'
  };
  const STACK = [
    { ic: "grid", h: "Power Platform", tags: ["PowerApps Canvas", "Model-Driven", "Power Automate", "Power BI", "Power Pages", "Dataverse"] },
    { ic: "ms", h: "Microsoft 365", tags: ["SharePoint Online", "Dynamics 365", "InfoPath", "SharePoint Designer"] },
    { ic: "code", h: "Dev & Integration", tags: ["JavaScript", "HTML / CSS", "C#", "Azure Functions", "REST APIs", "FetchXML"] },
    { ic: "db", h: "Data", tags: ["Dataverse", "SQL Server", "SharePoint Lists", "PostgreSQL", "Supabase"] },
    { ic: "mig", h: "Migration & Automation", tags: ["ShareGate", "Metalogix", "Nintex", "CI/CD"] },
    { ic: "cloud", h: "Cloud & Modern Stack", tags: ["Azure Key Vault", "MFA", "Next.js", "React", "TypeScript", "Vercel", "Playwright"] }
  ];
  $("#stackGrid").innerHTML = STACK.map((s, i) => `
    <div class="stack-card rv ${i % 3 === 1 ? "rv-d1" : i % 3 === 2 ? "rv-d2" : ""}">
      <div class="sc-h"><span class="sc-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${sIc[s.ic]}</svg></span><h4>${s.h}</h4></div>
      <div class="sc-tags">${s.tags.map(t => `<span>${t}</span>`).join("")}</div>
    </div>`).join("");
  $$("#stackGrid .rv").forEach(el => io.observe(el));

  /* ============================================================
     APP DEMO
     ============================================================ */
  // screen nav
  const rail = $("#appRail");
  rail.addEventListener("click", e => {
    const btn = e.target.closest(".nav-item");
    if (!btn) return;
    $$(".nav-item", rail).forEach(b => b.classList.toggle("active", b === btn));
    const id = btn.dataset.screen;
    $$(".screen").forEach(s => s.classList.toggle("show", s.dataset.pane === id));
    if (id === "dash") drawChart();
    if (id === "reports") drawBars();
  });

  // dashboard range segmented
  const ranges = {
    today: { stock: "1,284", pend: "3", low: "12" },
    week:  { stock: "1,310", pend: "9", low: "18" },
    month: { stock: "1,402", pend: "27", low: "41" }
  };
  $('[data-seg="range"]').addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    $$('[data-seg="range"] button').forEach(x => x.classList.toggle("on", x === b));
    const d = ranges[b.dataset.r];
    $('[data-kdash="stock"]').textContent = d.stock;
    $('[data-kdash="pend"]').textContent = d.pend;
    $('[data-kdash="low"]').textContent = d.low;
    drawChart(b.dataset.r);
  });

  // toast
  let toastT;
  function toast(msg) {
    const t = $("#toast");
    $("#toastMsg").textContent = msg;
    t.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove("show"), 2200);
  }

  // INVENTORY data
  const STOCK = [
    { sku: "HYD-A12", nm: "Hydraulic Pump Seal", qty: 0, max: 120, st: "out", loc: "Bay A · R3", pt: 30, cat: "Hydraulics" },
    { sku: "BRG-7741", nm: "Tapered Roller Bearing", qty: 18, max: 200, st: "low", loc: "Bay B · R1", pt: 40, cat: "Bearings" },
    { sku: "FLT-0093", nm: "Inline Oil Filter", qty: 240, max: 300, st: "ok", loc: "Bay C · R5", pt: 60, cat: "Filters" },
    { sku: "BLT-5521", nm: "Timing Belt — 92T", qty: 64, max: 150, st: "ok", loc: "Bay A · R2", pt: 30, cat: "Fasteners" },
    { sku: "VLV-3380", nm: "Solenoid Valve 24V", qty: 9, max: 80, st: "low", loc: "Bay D · R4", pt: 20, cat: "Electrical" },
    { sku: "GSK-1190", nm: "Cylinder Head Gasket", qty: 0, max: 60, st: "out", loc: "Bay B · R6", pt: 15, cat: "Hydraulics" },
    { sku: "SNS-2207", nm: "Proximity Sensor", qty: 132, max: 160, st: "ok", loc: "Bay D · R1", pt: 40, cat: "Electrical" },
    { sku: "CBL-8842", nm: "Shielded Control Cable", qty: 410, max: 500, st: "ok", loc: "Bay C · R2", pt: 100, cat: "Electrical" }
  ];
  const stMeta = { ok: ["ok", "In stock"], low: ["low", "Low"], out: ["out", "Out"] };
  let stFilter = "all", stQuery = "";
  function renderStock() {
    const list = STOCK.filter(r =>
      (stFilter === "all" || r.st === stFilter) &&
      (r.nm.toLowerCase().includes(stQuery) || r.sku.toLowerCase().includes(stQuery))
    );
    $("#stockCount").textContent = `${list.length} item${list.length === 1 ? "" : "s"} shown`;
    $("#stockRows").innerHTML = list.length ? list.map(r => {
      const [cls, lab] = stMeta[r.st];
      const pct = Math.round((r.qty / r.max) * 100);
      return `<div class="row" data-sku="${r.sku}">
        <div class="nm">
          <span class="ic2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7l9-4 9 4-9 4-9-4Z"/><path d="M3 7v10l9 4 9-4V7"/></svg></span>
          <span><b>${r.nm}</b><small>${r.sku}</small></span>
        </div>
        <div class="qty">${r.qty} / ${r.max}<div class="bar2"><i style="width:${pct}%"></i></div></div>
        <span class="badge ${cls}">${lab}</span>
        <span style="color:var(--ink-mute)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px"><path d="m9 18 6-6-6-6"/></svg></span>
      </div>`;
    }).join("") : `<div style="padding:34px;text-align:center;color:var(--ink-mute);font-family:var(--font-mono);font-size:13px">No SKUs match “${stQuery}”.</div>`;
  }
  $("#stockSearch").addEventListener("input", e => { stQuery = e.target.value.toLowerCase().trim(); renderStock(); });
  $("#stockFilters").addEventListener("click", e => {
    const b = e.target.closest(".fpill"); if (!b) return;
    $$("#stockFilters .fpill").forEach(x => x.classList.toggle("on", x === b));
    stFilter = b.dataset.f; renderStock();
  });
  $("#stockRows").addEventListener("click", e => {
    const row = e.target.closest(".row"); if (!row) return;
    const item = STOCK.find(s => s.sku === row.dataset.sku);
    openDrawer(item);
  });
  renderStock();

  // APPROVALS data
  let APPR = [
    { id: 1, who: "Priya Menon", sku: "Reorder · HYD-A12 ×120", amt: "₹84,000" },
    { id: 2, who: "Arun Kumar", sku: "Reorder · GSK-1190 ×60", amt: "₹31,500" },
    { id: 3, who: "Divya Nair", sku: "Reorder · VLV-3380 ×70", amt: "₹52,250" }
  ];
  function initials(n) { return n.split(" ").map(x => x[0]).slice(0, 2).join(""); }
  function renderAppr() {
    const pending = APPR.filter(a => !a.done).length;
    $("#apprCount").textContent = pending;
    $("#apprCount").style.display = pending ? "" : "none";
    $('[data-kdash="pend"]').textContent = pending;
    $("#apprList").innerHTML = APPR.map(a => a.done ? `
      <div class="appr resolved">
        <div class="who"><span class="av">${initials(a.who)}</span><span><b>${a.who}</b><small>${a.sku}</small></span></div>
        <span class="done-tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" style="width:15px;height:15px"><path d="M20 6 9 17l-5-5"/></svg>${a.done}</span>
      </div>` : `
      <div class="appr" data-id="${a.id}">
        <div class="who"><span class="av">${initials(a.who)}</span><span><b>${a.who}</b><small>${a.sku} · ${a.amt}</small></span></div>
        <div class="appr-actions"><button class="mini rej" data-act="rej">Reject</button><button class="mini app" data-act="app">Approve</button></div>
      </div>`).join("");
  }
  $("#apprList").addEventListener("click", e => {
    const btn = e.target.closest("[data-act]"); if (!btn) return;
    const id = +btn.closest(".appr").dataset.id;
    const a = APPR.find(x => x.id === id);
    a.done = btn.dataset.act === "app" ? "Approved" : "Rejected";
    toast(`${a.who}'s request ${a.done.toLowerCase()}`);
    renderAppr();
  });
  renderAppr();

  /* ---------- INVENTORY DETAIL DRAWER ---------- */
  let apprSeq = APPR.length + 1;
  const drawer = $("#drawer"), scrim = $("#scrim");
  function openDrawer(item) {
    const pct = Math.round((item.qty / item.max) * 100);
    const [cls, lab] = stMeta[item.st];
    const need = Math.max(0, item.max - item.qty);
    $("#drawerBody").innerHTML = `
      <div><div class="dr-title">${item.nm}</div><div class="dr-sku">${item.sku} · ${item.cat}</div></div>
      <div>
        <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:12px;color:var(--ink-soft);margin-bottom:7px"><span>On hand</span><span>${item.qty} / ${item.max}</span></div>
        <div class="dr-gauge"><i style="width:0%"></i></div>
      </div>
      <div class="dr-meta">
        <div class="m"><div class="k">Status</div><div class="v"><span class="badge ${cls}">${lab}</span></div></div>
        <div class="m"><div class="k">Location</div><div class="v">${item.loc}</div></div>
        <div class="m"><div class="k">Reorder point</div><div class="v">${item.pt} units</div></div>
        <div class="m"><div class="k">Suggested qty</div><div class="v">${need} units</div></div>
      </div>
      <button class="dr-reorder" id="drReorder" ${item.st === "ok" ? "disabled" : ""}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 7l9-4 9 4-9 4-9-4Z"/><path d="M3 7v10l9 4 9-4V7"/></svg>
        ${item.st === "ok" ? "Stock healthy — no action" : "Request reorder"}
      </button>`;
    drawer.classList.add("show"); scrim.classList.add("show"); drawer.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => { const g = drawer.querySelector(".dr-gauge > i"); if (g) g.style.width = pct + "%"; });
    const rb = $("#drReorder");
    if (rb && !rb.disabled) rb.addEventListener("click", () => {
      APPR.push({ id: apprSeq++, who: "Auto-reorder", sku: `Reorder · ${item.sku} ×${need}`, amt: "pending cost" });
      renderAppr();
      closeDrawer();
      toast(`Reorder raised for ${item.sku}`);
    });
  }
  function closeDrawer() { drawer.classList.remove("show"); scrim.classList.remove("show"); drawer.setAttribute("aria-hidden", "true"); }
  $("#drawerX").addEventListener("click", closeDrawer);
  $("#scrim").addEventListener("click", closeDrawer);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeDrawer(); });
  const series = {
    today: [40, 55, 48, 70, 62, 88, 76, 95, 84, 110, 102, 120],
    week:  [60, 72, 65, 90, 110, 96, 130, 118, 140, 132, 155, 148],
    month: [90, 120, 105, 160, 145, 190, 175, 210, 230, 205, 250, 240]
  };
  function drawChart(r = "today") {
    const svg = $("#chart"); if (!svg) return;
    const data = series[r], W = 600, H = 170, pad = 8;
    const max = Math.max(...data) * 1.1, min = 0;
    const x = i => pad + (i * (W - pad * 2)) / (data.length - 1);
    const y = v => H - pad - ((v - min) / (max - min)) * (H - pad * 2);
    const line = data.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
    const area = `${line} L${x(data.length - 1)} ${H} L${x(0)} ${H} Z`;
    const ac = getComputedStyle(html).getPropertyValue("--accent").trim();
    svg.innerHTML = `
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${ac}" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="${ac}" stop-opacity="0"/>
      </linearGradient></defs>
      <path d="${area}" fill="url(#g)"/>
      <path d="${line}" fill="none" stroke="${ac}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" pathLength="1" style="stroke-dasharray:1;stroke-dashoffset:1;animation:dash 1s var(--ease-out) forwards"/>
      ${data.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="2.5" fill="${ac}" opacity="${i === data.length - 1 ? 1 : 0}"/>`).join("")}`;
    if (!$("#dashKf")) {
      const st = document.createElement("style"); st.id = "dashKf";
      st.textContent = "@keyframes dash{to{stroke-dashoffset:0}}";
      document.head.appendChild(st);
    }
  }

  /* ---------- BARS (reports) ---------- */
  function drawBars() {
    const cats = [["Hydraulics", 86], ["Bearings", 64], ["Filters", 48], ["Electrical", 72], ["Fasteners", 30]];
    $("#bars").innerHTML = cats.map(([n, v]) => `
      <div style="display:flex;align-items:center;gap:14px">
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--ink-soft);width:90px;flex:none">${n}</span>
        <div style="flex:1;height:12px;background:var(--paper-2);border-radius:6px;overflow:hidden">
          <i style="display:block;height:100%;width:0;background:var(--accent);border-radius:6px;transition:width .9s var(--ease-out)" data-w="${v}"></i>
        </div>
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--ink);width:34px;text-align:right">${v}</span>
      </div>`).join("");
    requestAnimationFrame(() => $$("#bars i").forEach(i => i.style.width = i.dataset.w + "%"));
  }

  // draw chart when demo first scrolls in
  const dio = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { drawChart(); dio.disconnect(); }
  }), { threshold: 0.25 });
  dio.observe($("#demo"));
})();
