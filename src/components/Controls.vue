<!-- VIEW — search box, type filter, shuffle and reveal-all controls. -->
<script setup>
import { VERB_TYPE } from "../models/verbsService.js";

const query = defineModel("query", { type: String, default: "" });
const type = defineModel("type", { type: String, default: VERB_TYPE.ALL });

defineProps({
  revealAll: { type: Boolean, default: false },
});

defineEmits(["shuffle", "resetOrder", "toggleRevealAll"]);

const FILTERS = [
  { value: VERB_TYPE.ALL, label: "All" },
  { value: VERB_TYPE.REGULAR, label: "Regular" },
  { value: VERB_TYPE.IRREGULAR, label: "Irregular" },
];
</script>

<template>
  <div class="controls">
    <div class="controls__search">
      <span class="controls__search-icon" aria-hidden="true">⌕</span>
      <input
        v-model="query"
        type="search"
        class="controls__input"
        placeholder="Search in English or Spanish…"
        aria-label="Search verbs"
      />
    </div>

    <div class="controls__filters" role="group" aria-label="Filter by type">
      <button
        v-for="filter in FILTERS"
        :key="filter.value"
        type="button"
        class="pill"
        :class="{ 'pill--active': type === filter.value }"
        :data-type="filter.value"
        @click="type = filter.value"
      >
        {{ filter.label }}
      </button>
    </div>

    <div class="controls__actions">
      <button type="button" class="btn" @click="$emit('shuffle')">
        ⇄ Shuffle
      </button>
      <button type="button" class="btn" @click="$emit('resetOrder')">
        ↺ Reset order
      </button>
      <button
        type="button"
        class="btn"
        :class="{ 'btn--on': revealAll }"
        :aria-pressed="revealAll"
        @click="$emit('toggleRevealAll')"
      >
        {{ revealAll ? "🙈 Hide all" : "👁 Reveal all" }}
      </button>
    </div>
  </div>
</template>
