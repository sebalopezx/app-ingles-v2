<!--
  VIEW — a single verb card.
  - Hover (desktop) or tap (mobile) reveals the translation and past forms.
  - The check button marks the verb as learned (independent of reveal).
-->
<script setup>
import { ref, computed } from "vue";
import { getVerbId } from "../models/verbsService.js";

const props = defineProps({
  verb: { type: Object, required: true },
  isLearned: { type: Boolean, default: false },
  revealAll: { type: Boolean, default: false },
});

const emit = defineEmits(["toggleLearned"]);

const revealed = ref(false);
const verbId = computed(() => getVerbId(props.verb));
const isRevealed = computed(() => revealed.value || props.revealAll);
const samePastForms = computed(
  () => props.verb.simplePast === props.verb.pastParticiple,
);

function toggleReveal() {
  revealed.value = !revealed.value;
}

function onCheck() {
  emit("toggleLearned", verbId.value);
}
</script>

<template>
  <article
    class="card"
    :class="[
      'card--' + verb.type,
      { 'is-revealed': isRevealed, 'is-learned': isLearned },
    ]"
    @click="toggleReveal"
  >
    <button
      type="button"
      class="card__check"
      :aria-pressed="isLearned"
      :aria-label="isLearned ? 'Mark as not learned' : 'Mark as learned'"
      :title="isLearned ? 'Learned' : 'Mark as learned'"
      @click.stop="onCheck"
    >
      ✓
    </button>

    <span class="card__type">{{ verb.type }}</span>
    <h3 class="card__word">{{ verb.infinitive }}</h3>

    <div class="card__back">
      <p class="card__translation">{{ verb.translation }}</p>
      <p class="card__forms">
        <span>{{ verb.simplePast }}</span>
        <template v-if="!samePastForms">
          <span class="card__sep">·</span>
          <span>{{ verb.pastParticiple }}</span>
        </template>
      </p>
    </div>

    <span class="card__hint">hover / tap</span>
  </article>
</template>
