<!-- COMPONENT — drag-and-drop word matching game for a set of pairs. -->
<script setup>
import { ref, reactive, computed, onMounted } from "vue";

const props = defineProps({
  title: { type: String, required: true },
  items: { type: Array, required: true }, // [{ en, es }]
});

const poolOrder = ref([]);
onMounted(() => {
  poolOrder.value = [...props.items].sort(() => Math.random() - 0.5);
});

const dragging = ref(null);
const matches = reactive({});  // { es: en } confirmed correct pairs
const wrongSlot = ref(null);   // es key flashing on wrong drop
const overSlot = ref(null);    // es key highlighted on dragover

const pool = computed(() =>
  poolOrder.value.filter((item) => !Object.values(matches).includes(item.en))
);

const matchedCount = computed(() => Object.keys(matches).length);

const allDone = computed(() =>
  props.items.length > 0 &&
  props.items.every((item) => matches[item.es] === item.en)
);

function onDragStart(item) {
  dragging.value = item;
}

function onDragEnd() {
  dragging.value = null;
  overSlot.value = null;
}

function onDrop(target) {
  overSlot.value = null;
  if (!dragging.value) return;
  if (dragging.value.es === target.es) {
    matches[target.es] = dragging.value.en;
  } else {
    wrongSlot.value = target.es;
    setTimeout(() => (wrongSlot.value = null), 500);
  }
  dragging.value = null;
}

function reset() {
  Object.keys(matches).forEach((k) => delete matches[k]);
  poolOrder.value = [...props.items].sort(() => Math.random() - 0.5);
}
</script>

<template>
  <div class="match">
    <div class="match__head">
      <h3 class="match__title">{{ title }}</h3>
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

    <!-- Chip pool: English words to drag -->
    <div class="match__pool" :class="{ 'match__pool--empty': !pool.length }">
      <div
        v-for="item in pool"
        :key="item.en"
        class="match__chip"
        draggable="true"
        @dragstart="onDragStart(item)"
        @dragend="onDragEnd"
      >
        {{ item.en }}
      </div>
    </div>

    <!-- Drop targets: slot (left) + Spanish badge (right) -->
    <ul class="match__targets">
      <li v-for="item in items" :key="item.es" class="match__row">
        <div
          class="match__slot"
          :class="{
            'is-over': overSlot === item.es && !matches[item.es],
            'is-correct': matches[item.es] === item.en,
            'is-wrong': wrongSlot === item.es,
          }"
          @dragover.prevent="overSlot = item.es"
          @dragleave="overSlot = null"
          @drop="onDrop(item)"
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
