<!-- VIEW (page) — Verbs: the full verb browser (progress, controls, grid). -->
<script setup>
import { ref } from "vue";
import ProgressBar from "../components/ProgressBar.vue";
import Controls from "../components/Controls.vue";
import VerbGrid from "../components/VerbGrid.vue";
import ActionsModal from "../components/ActionsModal.vue";
import { useVerbs } from "../composables/useVerbs.js";
import { useProgress } from "../composables/useProgress.js";
import { VERB_TYPE } from "../models/verbsService.js";

const { visibleVerbs, totalCount, query, type, shuffle, resetOrder } =
  useVerbs();
const { learned, learnedCount, toggleLearned, resetProgress } = useProgress();

const revealAll = ref(false);
const actionsOpen = ref(false);
// Bumping this counter tells every card to collapse back to its closed state.
const collapseSignal = ref(0);

function toggleRevealAll() {
  revealAll.value = !revealAll.value;
}

function hideAllCards() {
  revealAll.value = false;
  collapseSignal.value += 1;
  actionsOpen.value = false;
}

function resetAll() {
  resetProgress();
  resetOrder();
  query.value = "";
  type.value = VERB_TYPE.ALL;
  revealAll.value = false;
  collapseSignal.value += 1;
  actionsOpen.value = false;
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
      @open-actions="actionsOpen = true"
    />

    <VerbGrid
      :verbs="visibleVerbs"
      :learned="learned"
      :reveal-all="revealAll"
      :collapse-signal="collapseSignal"
      @toggle-learned="toggleLearned"
    />

    <ActionsModal
      :open="actionsOpen"
      @close="actionsOpen = false"
      @hide-all="hideAllCards"
      @reset-all="resetAll"
    />
  </section>
</template>
