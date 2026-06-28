<!-- VIEW — the grid of verb cards (with an empty state). -->
<script setup>
import VerbCard from "./VerbCard.vue";
import { getVerbId } from "../models/verbsService.js";

const props = defineProps({
  verbs: { type: Array, required: true },
  learned: { type: Set, required: true },
  revealAll: { type: Boolean, default: false },
});

defineEmits(["toggleLearned"]);

function isLearned(verb) {
  return props.learned.has(getVerbId(verb));
}
</script>

<template>
  <p v-if="verbs.length === 0" class="grid-empty">
    No verbs match your search. Try another word.
  </p>

  <div v-else class="grid">
    <VerbCard
      v-for="verb in verbs"
      :key="getVerbId(verb)"
      :verb="verb"
      :is-learned="isLearned(verb)"
      :reveal-all="revealAll"
      @toggle-learned="$emit('toggleLearned', $event)"
    />
  </div>
</template>
