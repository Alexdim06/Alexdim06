<script setup>
import { RouterLink } from 'vue-router';
import { cv } from '../data/cv';
import CvPanel from '../components/CvPanel.vue';
</script>

<template>
  <div class="relative min-h-screen overflow-x-hidden">
    <div
      class="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-acid/20 blur-3xl"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(243,241,233,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(243,241,233,0.025)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:linear-gradient(180deg,#000_0%,transparent_85%)]"
      aria-hidden="true"
    />

    <header class="no-print sticky top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-xl">
      <div class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <RouterLink
          to="/"
          class="font-display text-lg font-extrabold tracking-tight text-paper"
          aria-label="Back to portfolio"
        >
          AD<span class="text-acid">.</span>
        </RouterLink>
        <nav class="flex flex-wrap items-center gap-2 sm:gap-3" aria-label="CV navigation">
          <RouterLink
            to="/"
            class="rounded-full px-3 py-1.5 text-sm text-muted transition hover:text-acid"
          >
            Portfolio
          </RouterLink>
          <RouterLink
            to="/#hire"
            class="rounded-full px-3 py-1.5 text-sm text-muted transition hover:text-acid"
          >
            Hiring snapshot
          </RouterLink>
          <a
            :href="cv.pdfUrl"
            download="Aleksandar-Dimitrov-CV.pdf"
            class="rounded-full border border-acid/35 bg-acid/10 px-3 py-1.5 text-sm font-semibold text-acid transition hover:bg-acid/20"
          >
            Download PDF
          </a>
        </nav>
      </div>
    </header>

    <main id="resume" class="relative z-10 mx-auto max-w-5xl px-4 py-6 pb-16 sm:px-6 sm:py-8">
      <article
        class="cv-sheet relative overflow-hidden rounded-3xl border border-acid/20 bg-[linear-gradient(180deg,#121614_0%,#0d100e_100%)] p-4 shadow-[0_28px_70px_rgba(0,0,0,0.38)] sm:p-6"
      >
        <div class="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-acid via-[#7ee787] via-orange to-acid" />

        <header class="relative z-10 grid gap-5 border-b border-white/10 pb-5 sm:grid-cols-[168px_1fr] sm:gap-6">
          <div class="relative mx-auto aspect-[3/4] w-40 shrink-0 sm:mx-0 sm:w-[168px]">
            <div
              class="absolute -inset-1.5 rounded-[22px] border border-acid/35 animate-pulse"
              aria-hidden="true"
            />
            <picture class="relative block h-full w-full overflow-hidden rounded-[18px] border border-acid/30 bg-ink shadow-2xl">
              <source type="image/webp" :srcset="cv.portraitWebp" />
              <img
                :src="cv.portrait"
                alt="Aleksandar Dimitrov"
                width="480"
                height="640"
                class="h-full w-full object-cover object-[center_32%]"
                decoding="async"
              />
            </picture>
            <span
              class="absolute bottom-2 left-2 rounded-full border border-acid/35 bg-ink/85 px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-wide text-acid backdrop-blur"
            >
              Sofia · EU
            </span>
          </div>

          <div class="min-w-0">
            <div
              class="mb-2 inline-flex items-center gap-2 rounded-full border border-acid/30 bg-acid/10 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-acid"
            >
              <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-acid" />
              {{ cv.status }}
            </div>
            <p class="mb-1 text-xs font-bold uppercase tracking-[0.05em] text-dim">
              {{ cv.role }}
            </p>
            <h1 class="font-display text-4xl font-extrabold leading-[0.98] tracking-tight sm:text-5xl">
              Aleksandar <em class="font-serif font-normal not-italic text-muted">Dimitrov</em>
            </h1>
            <p class="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-[0.92rem]">
              {{ cv.tagline }}
            </p>
            <dl class="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <div
                v-for="item in cv.metrics"
                :key="item.label"
                class="rounded-xl border border-acid/15 bg-acid/[0.04] px-2.5 py-2"
              >
                <dt class="text-[0.58rem] font-bold uppercase tracking-wide text-acid">
                  {{ item.label }}
                </dt>
                <dd class="font-display text-sm font-bold leading-tight text-paper">
                  {{ item.value }}
                </dd>
              </div>
            </dl>
            <div class="no-print mt-4 flex flex-wrap gap-2">
              <a
                :href="cv.pdfUrl"
                download="Aleksandar-Dimitrov-CV.pdf"
                class="rounded-full bg-acid px-4 py-2 text-sm font-semibold text-ink transition hover:brightness-110"
              >
                Download PDF
              </a>
              <a
                href="mailto:alex.06dimitrov@gmail.com"
                class="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-paper transition hover:border-acid/30 hover:text-acid"
              >
                Email
              </a>
            </div>
          </div>
        </header>

        <div class="relative z-10 mt-5 grid gap-3 lg:grid-cols-[0.72fr_1.28fr] lg:gap-4">
          <aside class="grid gap-3 content-start">
            <CvPanel title="Contact">
              <ul class="space-y-0">
                <li
                  v-for="(item, index) in cv.contact"
                  :key="item.label"
                  class="grid gap-0.5 py-2"
                  :class="index ? 'border-t border-white/[0.07]' : ''"
                >
                  <span class="text-[0.58rem] font-bold uppercase tracking-wide text-dim">{{ item.label }}</span>
                  <a
                    :href="item.href"
                    class="break-words text-sm font-semibold text-paper transition hover:text-acid"
                    :target="item.external ? '_blank' : undefined"
                    :rel="item.external ? 'noreferrer' : undefined"
                  >
                    {{ item.text }}
                  </a>
                </li>
              </ul>
            </CvPanel>

            <CvPanel title="Core stack">
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tag in cv.stack"
                  :key="tag"
                  class="rounded-full border border-acid/20 px-2 py-0.5 text-[0.64rem] font-semibold text-paper"
                >
                  {{ tag }}
                </span>
              </div>
            </CvPanel>

            <CvPanel title="Security & infra">
              <ul class="space-y-1">
                <li
                  v-for="item in cv.security"
                  :key="item"
                  class="relative pl-3.5 text-sm text-muted before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-acid"
                >
                  {{ item }}
                </li>
              </ul>
            </CvPanel>

            <CvPanel title="Focus">
              <ul class="space-y-1">
                <li
                  v-for="item in cv.focus"
                  :key="item"
                  class="relative pl-3.5 text-sm text-muted before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-acid"
                >
                  {{ item }}
                </li>
              </ul>
            </CvPanel>

            <CvPanel title="Languages">
              <ul>
                <li
                  v-for="(lang, index) in cv.languages"
                  :key="lang.name"
                  class="flex justify-between gap-3 py-1.5 text-sm"
                  :class="index < cv.languages.length - 1 ? 'border-b border-white/[0.07]' : ''"
                >
                  <strong>{{ lang.name }}</strong>
                  <span class="text-muted">{{ lang.level }}</span>
                </li>
              </ul>
            </CvPanel>

            <CvPanel title="Availability" accent>
              <p class="text-sm leading-relaxed text-muted">{{ cv.availability }}</p>
            </CvPanel>
          </aside>

          <div class="grid gap-3 content-start">
            <CvPanel title="Profile">
              <p class="text-sm leading-relaxed text-muted">{{ cv.profile }}</p>
            </CvPanel>

            <CvPanel title="Experience">
              <article
                v-for="(job, index) in cv.experience"
                :key="job.title"
                :class="index ? 'mt-3 border-t border-white/[0.07] pt-3' : ''"
              >
                <div class="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 class="font-display text-[0.92rem] font-bold tracking-tight">{{ job.title }}</h3>
                  <time class="whitespace-nowrap text-[0.62rem] font-bold uppercase tracking-wide text-acid">
                    {{ job.period }}
                  </time>
                </div>
                <p v-if="job.compact" class="text-sm leading-relaxed text-muted">{{ job.text }}</p>
                <ul v-else class="ml-4 list-disc space-y-1 text-sm text-muted marker:text-acid">
                  <li v-for="(line, i) in job.bullets" :key="i">{{ line }}</li>
                </ul>
              </article>
            </CvPanel>

            <CvPanel title="Selected products">
              <div class="grid gap-3 sm:grid-cols-2">
                <article
                  v-for="product in cv.products"
                  :key="product.name"
                  class="rounded-xl border border-white/[0.09] bg-white/[0.015] p-3"
                >
                  <header class="mb-1 flex items-center justify-between gap-2">
                    <h3 class="font-display text-sm font-bold">{{ product.name }}</h3>
                    <span
                      class="rounded-full border px-1.5 py-0.5 text-[0.56rem] font-bold uppercase tracking-wide"
                      :class="product.badgeClass"
                    >
                      {{ product.badge }}
                    </span>
                  </header>
                  <p class="mb-1 text-[0.68rem] text-dim">{{ product.meta }}</p>
                  <p class="text-sm leading-relaxed text-muted">{{ product.description }}</p>
                  <a
                    :href="product.href"
                    class="mt-2 inline-block text-xs font-bold text-acid transition hover:underline"
                    :target="product.external ? '_blank' : undefined"
                    :rel="product.external ? 'noreferrer' : undefined"
                  >
                    {{ product.external ? 'systemaweb.com →' : 'Case study →' }}
                  </a>
                </article>
              </div>
            </CvPanel>

            <CvPanel title="More">
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 class="mb-2 text-[0.64rem] font-bold uppercase tracking-[0.06em] text-acid">
                    Certificates
                  </h3>
                  <p class="text-sm leading-relaxed text-muted">{{ cv.certificates }}</p>
                </div>
                <div>
                  <h3 class="mb-2 text-[0.64rem] font-bold uppercase tracking-[0.06em] text-acid">
                    How I work
                  </h3>
                  <p class="text-sm leading-relaxed text-muted">{{ cv.howIWork }}</p>
                </div>
              </div>
            </CvPanel>
          </div>
        </div>
      </article>
    </main>
  </div>
</template>
