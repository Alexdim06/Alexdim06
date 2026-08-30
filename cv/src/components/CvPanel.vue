<script setup>
defineProps({
  title: { type: String, required: true },
  accent: { type: Boolean, default: false },
});
</script>

<template>
  <section
    class="rounded-2xl border p-4 sm:p-[0.9rem] transition duration-200 hover:-translate-y-px"
    :class="accent
      ? 'border-acid/30 bg-acid/5'
      : 'border-white/10 bg-ink/50 hover:border-acid/25 hover:bg-acid/[0.03]'"
  >
    <h2 class="mb-3 text-[0.64rem] font-bold uppercase tracking-[0.06em] text-acid">
      {{ title }}
    </h2>
    <slot />
  </section>
</template>
