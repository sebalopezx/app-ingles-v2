<!-- VIEW (root) — composes the screen and wires controllers to components. -->
<script setup>
import { ref } from "vue";
import AppHeader from "./components/Header.vue";
import Intro from "./components/Intro.vue";
import ProgressBar from "./components/ProgressBar.vue";
import Controls from "./components/Controls.vue";
import VerbGrid from "./components/VerbGrid.vue";
import AppFooter from "./components/Footer.vue";
import { useVerbs } from "./composables/useVerbs.js";
import { useProgress } from "./composables/useProgress.js";

const { visibleVerbs, totalCount, query, type, shuffle, resetOrder } =
  useVerbs();
const { learned, learnedCount, toggleLearned, resetProgress } = useProgress();

const revealAll = ref(false);
function toggleRevealAll() {
  revealAll.value = !revealAll.value;
}
</script>

<template>
  <div class="app">
    <AppHeader />

    <Intro />

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

    <AppFooter />
  </div>
</template>
