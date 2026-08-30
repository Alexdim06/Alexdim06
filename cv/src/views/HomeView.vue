<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { cv, assetBase } from '../data/cv';

const menuOpen = ref(false);
const sofiaTime = ref('--:--');
let clockTimer;

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function updateClock() {
  sofiaTime.value = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Sofia',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());
}

onMounted(() => {
  updateClock();
  clockTimer = setInterval(updateClock, 30_000);
});

onUnmounted(() => {
  clearInterval(clockTimer);
});

const stackMarquee = [
  'Vue', 'Angular', 'Strapi', 'PostgreSQL', 'MongoDB', 'DevOps', 'Mentoring', 'Real-time systems',
];

const timeline = [
  {
    time: 'Oct 2025 — Present',
    title: 'Full-Stack Developer · Industria Technology',
    text: 'Vue, Angular, and Strapi across frontend and content architecture, PostgreSQL and MongoDB in production, DevOps workflows, security practices, and frontend mentoring.',
  },
  {
    time: '7-month internship (same team)',
    title: 'Business Analyst Intern → Developer path',
    text: 'User stories, process analysis, and sprint planning — integrated into full-stack delivery at Industria.',
  },
  {
    time: '2022 — 2024',
    title: 'Auto Mechanic',
    text: 'Diagnostics, repairs, customer communication, and inventory under real-world pressure.',
  },
  {
    time: '2021 — 2022',
    title: 'Florist',
    text: 'Customer service, product arrangement, and retail organization.',
  },
];

const faqs = [
  {
    q: 'Where are you based, and can you work remote?',
    a: 'Sofia, Bulgaria (EU). Available for remote, hybrid, and on-site roles in Bulgaria and the EU.',
    open: true,
  },
  {
    q: 'What roles are you targeting?',
    a: 'Full-stack roles with strong frontend delivery. Vue, Angular, and Strapi are the deepest stack — plus DevOps, CMS architecture, and mentoring.',
  },
  {
    q: 'How soon can you start?',
    a: 'Available for full-stack roles.',
  },
  {
    q: 'English?',
    a: 'Yes. This site, product case studies, and day-to-day engineering work are in English. Bulgarian is native.',
  },
  {
    q: 'Can you share NestSyncFlow source?',
    a: 'The product is private. The case study covers architecture and decisions. I can walk through implementation in an interview.',
  },
];
</script>

<template>
  <div class="relative overflow-x-hidden">
    <div
      class="pointer-events-none absolute -left-24 top-32 h-80 w-80 rounded-full bg-acid/10 blur-3xl"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -right-16 top-[40%] h-72 w-72 rounded-full bg-orange/10 blur-3xl"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(243,241,233,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(243,241,233,0.025)_1px,transparent_1px)] [background-size:36px_36px]"
      aria-hidden="true"
    />

    <header class="sticky top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <a href="#home" class="font-display text-xl font-extrabold tracking-tight text-paper" aria-label="Home">
          AD<span class="text-acid">.</span>
        </a>
        <button
          type="button"
          class="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 sm:hidden"
          :aria-expanded="menuOpen"
          aria-controls="site-nav"
          aria-label="Toggle navigation"
          @click="toggleMenu"
        >
          <span class="block h-0.5 w-5 bg-paper transition" :class="menuOpen ? 'translate-y-2 rotate-45' : ''" />
          <span class="block h-0.5 w-5 bg-paper transition" :class="menuOpen ? 'opacity-0' : ''" />
          <span class="block h-0.5 w-5 bg-paper transition" :class="menuOpen ? '-translate-y-2 -rotate-45' : ''" />
        </button>
        <nav
          id="site-nav"
          class="items-center gap-1 sm:flex"
          :class="menuOpen ? 'absolute left-0 right-0 top-full flex flex-col border-b border-white/10 bg-ink/95 p-4' : 'hidden'"
          aria-label="Primary navigation"
        >
          <a href="#about" class="rounded-full px-3 py-2 text-sm text-muted transition hover:text-acid" @click="menuOpen = false">About</a>
          <a href="#projects" class="rounded-full px-3 py-2 text-sm text-muted transition hover:text-acid" @click="menuOpen = false">Work</a>
          <a href="#experience" class="rounded-full px-3 py-2 text-sm text-muted transition hover:text-acid" @click="menuOpen = false">Journey</a>
          <RouterLink to="/resume" class="rounded-full px-3 py-2 text-sm text-muted transition hover:text-acid" @click="menuOpen = false">CV</RouterLink>
          <a href="#contact" class="rounded-full bg-acid px-4 py-2 text-sm font-semibold text-ink transition hover:brightness-110" @click="menuOpen = false">Let's talk</a>
        </nav>
      </div>
    </header>

    <main>
      <section id="home" class="relative mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-16">
        <div class="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div>
            <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-acid/30 bg-acid/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-acid">
              <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-acid" />
              Available
            </div>
            <p class="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-dim">Full-stack developer · Sofia, Bulgaria</p>
            <h1 class="font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              I turn curiosity into
              <span class="bg-gradient-to-r from-acid via-[#d8ff8a] to-orange bg-clip-text text-transparent">working software.</span>
            </h1>
            <p class="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              I'm Aleksandar, a full-stack developer at Industria Technology working with Vue, Angular, and Strapi.
              I also contribute to DevOps delivery, security-minded server practices, and frontend mentoring.
            </p>
            <div class="mt-7 flex flex-wrap gap-3">
              <a href="#projects" class="rounded-full bg-acid px-5 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110">Explore my work ↘</a>
              <RouterLink to="/resume" class="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-paper transition hover:border-acid/30 hover:text-acid">View CV</RouterLink>
              <a :href="cv.pdfUrl" download="Aleksandar-Dimitrov-CV.pdf" class="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-paper transition hover:border-acid/30 hover:text-acid">Download PDF</a>
            </div>
            <dl class="mt-8 grid grid-cols-3 gap-3">
              <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <dt class="font-display text-lg font-bold text-acid">Vue</dt>
                <dd class="text-xs text-muted">+ Angular & Strapi</dd>
              </div>
              <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <dt class="font-display text-lg font-bold text-acid">2</dt>
                <dd class="text-xs text-muted">flagship products</dd>
              </div>
              <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <dt class="font-display text-lg font-bold text-acid">Sofia</dt>
                <dd class="text-xs text-muted">EU remote · hybrid</dd>
              </div>
            </dl>
          </div>

          <div class="relative mx-auto w-full max-w-md lg:max-w-none">
            <div class="absolute -left-4 top-8 hidden flex-col gap-2 sm:flex" aria-hidden="true">
              <span v-for="tag in ['Vue', 'Angular', 'Strapi', 'DevOps']" :key="tag" class="rounded-full border border-acid/20 bg-ink/80 px-3 py-1 text-xs font-semibold text-paper backdrop-blur">{{ tag }}</span>
            </div>
            <div class="relative overflow-hidden rounded-[28px] border border-acid/25 bg-[linear-gradient(180deg,#151a17_0%,#0d100e_100%)] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
              <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-acid via-orange to-acid" />
              <span class="absolute right-4 top-4 rounded-full border border-white/10 bg-ink/80 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-muted backdrop-blur">
                Sofia · {{ sofiaTime }}
              </span>
              <picture>
                <source type="image/webp" :srcset="cv.portraitWebp" />
                <img
                  :src="cv.portrait"
                  alt="Aleksandar Dimitrov outdoors in Sofia"
                  width="768"
                  height="1024"
                  class="aspect-[3/4] w-full rounded-[20px] object-cover object-[center_32%]"
                  fetchpriority="high"
                  decoding="async"
                />
              </picture>
              <div class="mt-3 flex justify-between text-xs font-semibold uppercase tracking-wide text-dim">
                <span>Developer</span>
                <span>Problem solver</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="hire" class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div class="grid gap-8 rounded-3xl border border-acid/20 bg-[linear-gradient(135deg,rgba(200,255,71,0.06),rgba(255,120,90,0.04))] p-6 sm:p-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.08em] text-acid">Hiring snapshot</p>
            <h2 class="mt-2 font-display text-3xl font-extrabold tracking-tight text-paper sm:text-4xl">
              What a recruiter needs <em class="not-italic text-muted">in one glance.</em>
            </h2>
            <p class="mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
              Full-stack developer in Sofia at Industria Technology. Strongest in Vue, Angular, and Strapi, with PostgreSQL, MongoDB, DevOps, and frontend mentoring in the same role.
            </p>
            <div class="mt-6 flex flex-wrap gap-3">
              <a :href="cv.pdfUrl" download="Aleksandar-Dimitrov-CV.pdf" class="rounded-full bg-acid px-5 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110">Download PDF</a>
              <RouterLink to="/resume" class="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-paper transition hover:border-acid/30 hover:text-acid">Open online CV</RouterLink>
            </div>
          </div>
          <dl class="grid gap-3 sm:grid-cols-2">
            <div v-for="item in [
              { dt: 'Role fit', dd: 'Full-stack, Vue, Angular, CMS, product-minded delivery' },
              { dt: 'Now', dd: 'Full-stack at Industria Technology · Sofia' },
              { dt: 'Stack', dd: 'Vue, Angular, Strapi, PostgreSQL, MongoDB, Git, Agile' },
              { dt: 'Proof', dd: 'NestSyncFlow case study · UVE live on Chrome & Firefox' },
              { dt: 'Languages', dd: 'Bulgarian · English' },
              { dt: 'Availability', dd: 'Available for full-stack roles.' },
            ]" :key="item.dt" class="rounded-2xl border border-white/10 bg-ink/40 p-4">
              <dt class="text-[0.65rem] font-bold uppercase tracking-wide text-acid">{{ item.dt }}</dt>
              <dd class="mt-1 text-sm leading-relaxed text-paper">{{ item.dd }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section id="about" class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.08em] text-acid">01 / About</p>
            <h2 class="mt-2 font-display text-3xl font-extrabold tracking-tight text-paper sm:text-4xl">
              Practical thinking, <em class="not-italic text-muted">technical curiosity.</em>
            </h2>
          </div>
          <div>
            <p class="text-lg font-medium leading-relaxed text-paper">I connect frontend quality, backend content architecture, delivery, and people around one product goal.</p>
            <p class="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              At Industria Technology, I work with Vue, Angular, and Strapi across full-stack product delivery — PostgreSQL and MongoDB in production-shaped stacks, DevOps workflows, and security-minded server practices. I also coordinate and mentor frontend developers so the team ships consistently.
            </p>
            <div class="mt-8 grid gap-4 sm:grid-cols-3">
              <div v-for="group in [
                { title: 'Frontend systems', text: 'Vue · Angular · JavaScript · HTML · CSS' },
                { title: 'Backend & content', text: 'Strapi · Node.js · PostgreSQL · MongoDB · CMS' },
                { title: 'Delivery & leadership', text: 'DevOps · Security · Git · Agile · Mentoring' },
              ]" :key="group.title" class="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <h3 class="text-sm font-bold text-acid">{{ group.title }}</h3>
                <p class="mt-2 text-sm text-muted">{{ group.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="overflow-hidden border-y border-white/10 py-4" aria-hidden="true">
        <div class="flex w-max animate-[marquee_28s_linear_infinite] gap-8">
          <div v-for="n in 2" :key="n" class="flex shrink-0 items-center gap-8">
            <template v-for="(item, i) in stackMarquee" :key="`${n}-${item}`">
              <span class="text-sm font-semibold uppercase tracking-[0.12em] text-dim">{{ item }}</span>
              <span v-if="i < stackMarquee.length - 1" class="text-acid">✦</span>
            </template>
          </div>
        </div>
      </div>

      <section id="projects" class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div class="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.08em] text-acid">02 / Products & selected work</p>
            <h2 class="mt-2 font-display text-3xl font-extrabold tracking-tight text-paper sm:text-4xl">
              Ideas shaped into <em class="not-italic text-muted">real products.</em>
            </h2>
          </div>
          <div class="flex flex-wrap gap-4 text-sm">
            <a :href="`${assetBase}projects/nestsyncflow.html`" class="font-semibold text-acid transition hover:underline">NestSyncFlow case study ↗</a>
            <a :href="`${assetBase}projects/uve.html`" class="font-semibold text-acid transition hover:underline">UVE showcase ↗</a>
          </div>
        </div>

        <div class="grid gap-6">
          <article class="grid overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,#141916_0%,#0f1210_100%)] lg:grid-cols-[1fr_1fr]">
            <div class="p-6 sm:p-8">
              <p class="text-xs font-bold uppercase tracking-wide text-dim">01 / Flagship product</p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span v-for="tag in ['React', 'Express', 'PostgreSQL', 'WebSocket']" :key="tag" class="rounded-full border border-white/10 px-2.5 py-1 text-xs text-muted">{{ tag }}</span>
              </div>
              <h3 class="mt-4 font-display text-2xl font-bold text-paper">NestSyncFlow</h3>
              <p class="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                A full-stack product platform built around synchronized workflows: secure JWT authentication, Prisma-backed data, live updates, analytics, and a Stripe-ready monetization model.
              </p>
              <div class="mt-6 flex flex-wrap items-center gap-4">
                <a :href="`${assetBase}projects/nestsyncflow.html`" class="text-sm font-bold text-acid transition hover:underline">Explore case study ↗</a>
                <span class="text-xs uppercase tracking-wide text-dim">Private product</span>
              </div>
            </div>
            <div class="border-t border-white/10 bg-ink/50 p-4 lg:border-l lg:border-t-0">
              <div class="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0d0b]">
                <div class="flex items-center gap-2 border-b border-white/10 px-3 py-2 text-xs text-muted">
                  <span class="h-2 w-2 rounded-full bg-orange/80" />
                  <span class="h-2 w-2 rounded-full bg-acid/80" />
                  <span class="h-2 w-2 rounded-full bg-white/30" />
                  <span class="ml-2">nestsync / overview</span>
                  <span class="ml-auto rounded-full bg-acid/15 px-2 py-0.5 text-[0.6rem] font-bold uppercase text-acid">Live</span>
                </div>
                <div class="grid gap-3 p-4">
                  <div class="grid grid-cols-3 gap-2">
                    <div v-for="stat in [
                      { label: 'Workflow state', value: 'Synced', sub: 'Live' },
                      { label: 'Team updates', value: 'Real-time', sub: 'Socket' },
                      { label: 'Analytics', value: 'Ready', sub: 'Events' },
                    ]" :key="stat.label" class="rounded-xl border border-white/10 p-3">
                      <p class="text-[0.6rem] uppercase tracking-wide text-dim">{{ stat.label }}</p>
                      <p class="font-display text-sm font-bold text-paper">{{ stat.value }}</p>
                      <p class="text-[0.65rem] text-acid">{{ stat.sub }}</p>
                    </div>
                  </div>
                  <div class="rounded-xl border border-white/10 p-3">
                    <div class="mb-2 flex justify-between text-xs text-muted"><span>Workflow activity</span><span>Last 7 days</span></div>
                    <div class="flex h-16 items-end gap-1">
                      <span v-for="(h, i) in [35, 55, 40, 70, 50, 85, 60, 75]" :key="i" class="flex-1 rounded-t bg-gradient-to-t from-acid/20 to-acid" :style="{ height: `${h}%` }" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article class="grid overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,#141916_0%,#0f1210_100%)] lg:grid-cols-[1.2fr_0.8fr]">
            <div class="p-6 sm:p-8">
              <p class="text-xs font-bold uppercase tracking-wide text-dim">02 / Browser product ecosystem</p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span v-for="tag in ['Browser extension', 'Web platform', 'Stripe', 'Chrome + Firefox']" :key="tag" class="rounded-full border border-white/10 px-2.5 py-1 text-xs text-muted">{{ tag }}</span>
              </div>
              <h3 class="mt-4 font-display text-2xl font-bold text-paper">UVE × SystemaWeb</h3>
              <p class="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                One connected product: UVE is the Ultimate Video Enhancer extension, while SystemaWeb is its official product, content, and Pro licensing platform — 0.1×–16× speed, up to 600% volume boost, subtitles, templates, and per-site preferences.
              </p>
              <div class="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                <a :href="`${assetBase}projects/uve.html`" class="font-bold text-acid transition hover:underline">Explore showcase ↗</a>
                <a href="https://systemaweb.com/" target="_blank" rel="noreferrer" class="font-bold text-acid transition hover:underline">Product website ↗</a>
                <a href="https://chromewebstore.google.com/detail/ultimate-video-enhancer-u/iiikemfogmgcndndggdcbpilpbkpkkji" target="_blank" rel="noreferrer" class="font-bold text-acid transition hover:underline">Chrome ↗</a>
                <a href="https://addons.mozilla.org/en-US/firefox/addon/ultimate-video-enhancer-uve/" target="_blank" rel="noreferrer" class="font-bold text-acid transition hover:underline">Firefox ↗</a>
              </div>
            </div>
            <div class="flex items-center justify-center border-t border-white/10 p-8 lg:border-l lg:border-t-0">
              <div class="relative flex h-44 w-44 items-center justify-center rounded-full border border-acid/20 bg-acid/5">
                <span class="flex h-16 w-16 items-center justify-center rounded-full bg-acid text-ink">
                  <svg viewBox="0 0 24 24" class="h-7 w-7" fill="currentColor" aria-hidden="true"><path d="M8 6.8v10.4L18.2 12 8 6.8z" /></svg>
                </span>
                <span v-for="(label, i) in ['Chrome', 'Web', 'Firefox', 'Pro']" :key="label" class="absolute rounded-full border border-white/10 bg-ink px-2 py-1 text-[0.6rem] font-bold uppercase tracking-wide text-muted" :style="{ transform: `rotate(${i * 90}deg) translateY(-88px) rotate(${-i * 90}deg)` }">{{ label }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="experience" class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div class="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.08em] text-acid">03 / Journey</p>
            <h2 class="mt-2 font-display text-3xl font-extrabold tracking-tight text-paper sm:text-4xl">
              Experience beyond <em class="not-italic text-muted">the code.</em>
            </h2>
            <ul class="mt-8 space-y-2 text-sm text-muted">
              <li>Craft before frameworks</li>
              <li>People before process</li>
              <li>Products that last</li>
            </ul>
          </div>
          <div>
            <div class="space-y-0 border-l border-acid/25 pl-6">
              <article v-for="item in timeline" :key="item.title" class="relative pb-8 last:pb-0">
                <span class="absolute -left-[calc(1.5rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-acid" />
                <time class="text-xs font-bold uppercase tracking-wide text-acid">{{ item.time }}</time>
                <h3 class="mt-1 font-display text-lg font-bold text-paper">{{ item.title }}</h3>
                <p class="mt-2 text-sm leading-relaxed text-muted">{{ item.text }}</p>
              </article>
            </div>
            <div class="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <p class="text-xs font-bold uppercase tracking-wide text-acid">Certificates</p>
              <ul class="mt-3 space-y-1 text-sm text-muted">
                <li>JavaScript Fundamentals</li>
                <li>HTML & CSS Advanced</li>
                <li>Agile / Scrum Foundations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.08em] text-acid">04 / Hiring FAQ</p>
            <h2 class="mt-2 font-display text-3xl font-extrabold tracking-tight text-paper sm:text-4xl">
              Practical answers <em class="not-italic text-muted">before the first call.</em>
            </h2>
          </div>
          <div class="space-y-3">
            <details
              v-for="item in faqs"
              :key="item.q"
              class="group rounded-2xl border border-white/10 bg-white/[0.02] p-4 open:border-acid/25 open:bg-acid/[0.03]"
              :open="item.open"
            >
              <summary class="cursor-pointer list-none font-semibold text-paper marker:content-none">{{ item.q }}</summary>
              <p class="mt-3 text-sm leading-relaxed text-muted">{{ item.a }}</p>
            </details>
          </div>
        </div>
      </section>

      <section id="contact" class="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6">
        <div class="rounded-3xl border border-acid/20 bg-[linear-gradient(135deg,rgba(200,255,71,0.08),rgba(255,120,90,0.05))] p-8 text-center sm:p-12">
          <p class="text-xs font-bold uppercase tracking-[0.08em] text-acid">05 / Contact</p>
          <h2 class="mt-3 font-display text-3xl font-extrabold tracking-tight text-paper sm:text-4xl">
            Have a challenge? <em class="not-italic text-muted">Let's build the answer.</em>
          </h2>
          <p class="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            Available for full-stack roles, collaborations, and conversations with people who care about useful software.
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-3">
            <a href="mailto:alex.06dimitrov@gmail.com" class="rounded-full bg-acid px-5 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110">alex.06dimitrov@gmail.com</a>
            <a :href="cv.pdfUrl" download="Aleksandar-Dimitrov-CV.pdf" class="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-paper transition hover:border-acid/30 hover:text-acid">Download PDF</a>
            <RouterLink to="/resume" class="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-paper transition hover:border-acid/30 hover:text-acid">View CV</RouterLink>
          </div>
          <div class="mt-6 flex justify-center gap-6 text-sm">
            <a href="https://github.com/Alexdim06" target="_blank" rel="noreferrer" class="text-muted transition hover:text-acid">GitHub</a>
            <a href="https://www.linkedin.com/in/aleksandar-dimitrov-pya16/" target="_blank" rel="noreferrer" class="text-muted transition hover:text-acid">LinkedIn</a>
          </div>
        </div>
      </section>
    </main>

    <footer class="border-t border-white/10 py-8">
      <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 text-sm text-dim sm:px-6">
        <p>© {{ new Date().getFullYear() }} Aleksandar Dimitrov</p>
        <p>Designed with intent. Built with Vue 3 & Tailwind CSS.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
</style>
