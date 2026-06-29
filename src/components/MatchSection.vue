<!-- COMPONENT — drag-and-drop / click-to-place word matching game. -->
<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { loadMatches, saveMatches, clearMatches } from "../models/matchStore.js";
import HandClickIcon from "./icons/HandClickIcon.vue";

const props = defineProps({
  title: { type: String, required: true },
  items: { type: Array, required: true }, // [{ en, es }]
  storageKey: { type: String, required: true },
  columns: { type: Number, default: 1 },
});

const matches = reactive(loadMatches(props.storageKey));
const poolOrder = ref([]);
const dragging = ref(null);
const selected = ref(null);  // for tap/click interaction
const wrongSlot = ref(null);
const overSlot = ref(null);

onMounted(() => {
  const matched = new Set(Object.values(matches));
  poolOrder.value = [...props.items]
    .filter((item) => !matched.has(item.en))
    .sort(() => Math.random() - 0.5);
});

watch(matches, (val) => saveMatches(props.storageKey, { ...val }), { deep: true });

const pool = computed(() =>
  poolOrder.value.filter((item) => !Object.values(matches).includes(item.en))
);
const matchedCount = computed(() => Object.keys(matches).length);
const gridRows = computed(() => Math.ceil(props.items.length / props.columns));
const allDone = computed(() =>
  props.items.length > 0 && props.items.every((item) => matches[item.es] === item.en)
);

function attemptPlace(item, target) {
  if (item.es === target.es) {
    matches[target.es] = item.en;
  } else {
    wrongSlot.value = target.es;
    setTimeout(() => (wrongSlot.value = null), 500);
  }
}

// Drag
function onDragStart(item) {
  dragging.value = item;
  selected.value = null;
}
function onDragEnd() {
  dragging.value = null;
  overSlot.value = null;
}
function onDrop(target) {
  overSlot.value = null;
  if (!dragging.value) return;
  attemptPlace(dragging.value, target);
  dragging.value = null;
}

// Click / tap
function onChipClick(item) {
  selected.value = selected.value?.en === item.en ? null : item;
}
function onSlotClick(target) {
  if (matches[target.es] || !selected.value) return;
  attemptPlace(selected.value, target);
  selected.value = null;
}

function reset() {
  Object.keys(matches).forEach((k) => delete matches[k]);
  clearMatches(props.storageKey);
  selected.value = null;
  poolOrder.value = [...props.items].sort(() => Math.random() - 0.5);
}
</script>

<template>
  <div class="match">
    <div class="match__head">
      <div class="match__title-group">
        <h3 class="match__title">{{ title }}</h3>
        <span class="match__title-icon" aria-hidden="true"><HandClickIcon /></span>
      </div>
      <div class="match__head-right">
        <button
          v-if="matchedCount > 0"
          type="button"
          class="match__reset"
          @click="reset"
        >
          Reiniciar
        </button>
        <span class="match__counter">
          <span class="match__counter-current" :class="{ 'is-done': allDone }">
            {{ matchedCount }}
          </span>
          <span class="match__counter-sep">/</span>
          <span class="match__counter-total">{{ items.length }}</span>
        </span>
      </div>
    </div>

    <div v-if="allDone" class="match__success">
      ¡Perfecto! Todos los pares correctos.
    </div>

    <!-- Chip pool -->
    <div
      v-if="pool.length > 0"
      class="match__pool"
      :class="{ 'match__pool--selecting': !!selected }"
    >
      <div
        v-for="item in pool"
        :key="item.en"
        class="match__chip"
        :class="{ 'match__chip--selected': selected?.en === item.en }"
        draggable="true"
        @dragstart="onDragStart(item)"
        @dragend="onDragEnd"
        @click="onChipClick(item)"
      >
        {{ item.en }}
      </div>
    </div>

    <!-- Drop targets -->
    <ul
      class="match__targets"
      :class="{ 'match__targets--two-col': columns === 2 }"
      :style="columns > 1 ? { '--match-rows': gridRows } : {}"
    >
      <li v-for="item in items" :key="item.es" class="match__row">
        <div
          class="match__slot"
          :class="{
            'is-over': overSlot === item.es && !matches[item.es],
            'is-correct': matches[item.es] === item.en,
            'is-wrong': wrongSlot === item.es,
            'can-drop': selected && !matches[item.es],
          }"
          @dragover.prevent="overSlot = item.es"
          @dragleave="overSlot = null"
          @drop="onDrop(item)"
          @click="onSlotClick(item)"
        >
          <span v-if="matches[item.es]" class="match__matched">
            {{ matches[item.es] }}
          </span>
          <span v-else class="match__placeholder">···</span>
        </div>
        <span class="match__badge">{{ item.es }}</span>
      </li>
    </ul>
  </div>
</template>
