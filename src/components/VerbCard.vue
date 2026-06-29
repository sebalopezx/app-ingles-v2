<!--
  VIEW — a single verb card.
  - Click the card (mobile or desktop) to reveal the translation and past forms.
  - The hand icon at the bottom hints that the card is clickable; it fades out
    once the card is revealed.
  - The check button marks the verb as learned (independent of reveal).
-->
<script setup>
import { ref, computed, watch } from "vue";
import { getVerbId } from "../models/verbsService.js";
import HandClickIcon from "./icons/HandClickIcon.vue";
import TranslationIcon from "./icons/TranslationIcon.vue";
import SimplePastIcon from "./icons/SimplePastIcon.vue";
import ParticipleIcon from "./icons/ParticipleIcon.vue";

const props = defineProps({
  verb: { type: Object, required: true },
  isLearned: { type: Boolean, default: false },
  revealAll: { type: Boolean, default: false },
  collapseSignal: { type: Number, default: 0 },
});

const emit = defineEmits(["toggleLearned"]);

const revealed = ref(false);

// When the parent bumps the collapse signal, close this card.
watch(
  () => props.collapseSignal,
  () => {
    revealed.value = false;
  },
);
const verbId = computed(() => getVerbId(props.verb));
const isRevealed = computed(() => revealed.value || props.revealAll);

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
      :aria-label="isLearned ? 'Marcar como no aprendido' : 'Marcar como aprendido'"
      :title="isLearned ? 'Aprendido' : 'Marcar como aprendido'"
      @click.stop="onCheck"
    >
      ✓
    </button>

    <span class="card__type">{{ verb.type }}</span>
    <h3 class="card__word">{{ verb.infinitive }}</h3>

    <div class="card__back">
      <div class="card__back-inner">
        <p class="card__row card__row--translation">
          <TranslationIcon class="card__row-icon" />
          <span>{{ verb.translation }}</span>
        </p>
        <p class="card__row card__row--past">
          <SimplePastIcon class="card__row-icon" />
          <span>{{ verb.simplePast }}</span>
        </p>
        <p class="card__row card__row--past">
          <ParticipleIcon class="card__row-icon" />
          <span>{{ verb.pastParticiple }}</span>
        </p>
      </div>
    </div>

    <span class="card__hint" aria-hidden="true">
      <HandClickIcon />
    </span>
  </article>
</template>
