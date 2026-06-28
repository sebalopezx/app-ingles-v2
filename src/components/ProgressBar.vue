<!-- VIEW — overall learning progress across all verbs. -->
<script setup>
import { computed } from "vue";

const props = defineProps({
  learnedCount: { type: Number, required: true },
  total: { type: Number, required: true },
});

defineEmits(["reset"]);

const percent = computed(() =>
  props.total === 0 ? 0 : Math.round((props.learnedCount / props.total) * 100),
);
</script>

<template>
  <div class="progress">
    <div class="progress__head">
      <span class="progress__label">Your progress</span>
      <span class="progress__count">
        {{ learnedCount }} / {{ total }} learned · {{ percent }}%
      </span>
      <button
        v-if="learnedCount > 0"
        type="button"
        class="progress__reset"
        title="Reset learned verbs"
        @click="$emit('reset')"
      >
        Reset
      </button>
    </div>
    <div
      class="progress__track"
      role="progressbar"
      :aria-valuenow="percent"
      :aria-valuemin="0"
      :aria-valuemax="100"
    >
      <div class="progress__fill" :style="{ width: percent + '%' }" />
    </div>
  </div>
</template>
