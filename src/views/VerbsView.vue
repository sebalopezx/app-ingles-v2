<!-- VIEW (page) — Verbs: the full verb browser (progress, controls, grid). -->
<script setup>
import { ref } from "vue";
import ProgressBar from "../components/ProgressBar.vue";
import Controls from "../components/Controls.vue";
import VerbGrid from "../components/VerbGrid.vue";
import { useVerbs } from "../composables/useVerbs.js";
import { useProgress } from "../composables/useProgress.js";

const { visibleVerbs, totalCount, query, type, shuffle, resetOrder } =
  useVerbs();
const { learned, learnedCount, toggleLearned, resetProgress } = useProgress();

const revealAll = ref(false);
function toggleRevealAll() {
  revealAll.value = !revealAll.value;
}
</script>

<template>
  <section class="section">
    <ProgressBar
      :learned-count="learnedCount"
      :total="totalCount"
      @reset="resetProgress"
    />

    <Controls
      v-model:query="query"
      v-model:type="type"
      :reveal-all="revealAll"
      @shuffle="shuffle"
      @reset-order="resetOrder"
      @toggle-reveal-all="toggleRevealAll"
    />

    <VerbGrid
      :verbs="visibleVerbs"
      :learned="learned"
      :reveal-all="revealAll"
      @toggle-learned="toggleLearned"
    />
  </section>
</template>
