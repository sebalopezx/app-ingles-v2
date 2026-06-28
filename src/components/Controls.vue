<!-- VIEW — search box, type filter, shuffle and reveal-all controls. -->
<script setup>
import { VERB_TYPE } from "../models/verbsService.js";
import ShuffleIcon from "./icons/ShuffleIcon.vue";
import SortIcon from "./icons/SortIcon.vue";
import EyeIcon from "./icons/EyeIcon.vue";
import EyeOffIcon from "./icons/EyeOffIcon.vue";

const query = defineModel("query", { type: String, default: "" });
const type = defineModel("type", { type: String, default: VERB_TYPE.ALL });

defineProps({
  revealAll: { type: Boolean, default: false },
});

defineEmits(["shuffle", "resetOrder", "toggleRevealAll", "openActions"]);

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
      <button
        type="button"
        class="btn-circle"
        data-tooltip="Mezclar"
        aria-label="Mezclar"
        @click="$emit('shuffle')"
      >
        <ShuffleIcon />
      </button>
      <button
        type="button"
        class="btn-circle"
        data-tooltip="Orden original"
        aria-label="Orden original"
        @click="$emit('resetOrder')"
      >
        <SortIcon />
      </button>
      <button
        type="button"
        class="btn-circle"
        :class="{ 'btn-circle--on': revealAll }"
        :data-tooltip="revealAll ? 'Ocultar todo' : 'Mostrar todo'"
        :aria-label="revealAll ? 'Ocultar todo' : 'Mostrar todo'"
        :aria-pressed="revealAll"
        @click="$emit('toggleRevealAll')"
      >
        <EyeOffIcon v-if="revealAll" />
        <EyeIcon v-else />
      </button>
      <button
        type="button"
        class="btn-circle btn-circle--danger"
        aria-label="Opciones de reinicio"
        data-tooltip="Opciones"
        @click="$emit('openActions')"
      >
        ✕
      </button>
    </div>
  </div>
</template>
