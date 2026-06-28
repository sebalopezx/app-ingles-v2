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
  { value: VERB_TYPE.ALL, label: "Todos" },
  { value: VERB_TYPE.REGULAR, label: "Regulares" },
  { value: VERB_TYPE.IRREGULAR, label: "Irregulares" },
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
        placeholder="Busca en inglés o español…"
        aria-label="Buscar verbos"
      />
    </div>

    <div class="controls__filters" role="group" aria-label="Filtrar por tipo">
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
        ⇄ Mezclar
      </button>
      <button type="button" class="btn" @click="$emit('resetOrder')">
        ↺ Orden original
      </button>
      <button
        type="button"
        class="btn"
        :class="{ 'btn--on': revealAll }"
        :aria-pressed="revealAll"
        @click="$emit('toggleRevealAll')"
      >
        {{ revealAll ? "🙈 Ocultar todo" : "👁 Mostrar todo" }}
      </button>
    </div>
  </div>
</template>
