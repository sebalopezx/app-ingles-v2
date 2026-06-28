<!-- COMPONENT — number-to-English typing game. -->
<script setup>
import { ref, shallowRef, computed, watch } from "vue";
import { toEnglish, toSpanish, normalizeAnswer } from "../models/numberWords.js";
import { loadStats, saveStats, clearStats } from "../models/numberStatsStore.js";

const RANGES = [
  { label: "Fácil", min: 1, max: 20 },
  { label: "Medio", min: 1, max: 100 },
  { label: "Difícil", min: 1, max: 1000 },
];

const range = shallowRef(RANGES[0]);
const current = ref(roll(RANGES[0]));
const input = ref("");
const result = ref(null); // null | 'correct' | 'wrong'
const { correct: savedCorrect, wrong: savedWrong } = loadStats();
const correctCount = ref(savedCorrect);
const wrongCount = ref(savedWrong);

watch([correctCount, wrongCount], ([c, w]) => saveStats(c, w));

function roll(r = range.value) {
  return Math.floor(Math.random() * (r.max - r.min + 1)) + r.min;
}

function setRange(r) {
  range.value = r;
  next();
}

function verify() {
  if (!input.value.trim()) return;
  const expected = normalizeAnswer(toEnglish(current.value));
  const actual = normalizeAnswer(input.value);
  if (actual === expected) {
    result.value = "correct";
    correctCount.value++;
  } else {
    result.value = "wrong";
    wrongCount.value++;
  }
}

function next() {
  current.value = roll();
  input.value = "";
  result.value = null;
}

function resetGame() {
  correctCount.value = 0;
  wrongCount.value = 0;
  clearStats();
  next();
}

function onKey(e) {
  if (e.key === "Enter") result.value ? next() : verify();
}

const englishWord = computed(() => toEnglish(current.value));
const spanishWord = computed(() => toSpanish(current.value));
</script>

<template>
  <div class="numgame">
    <div class="numgame__head">
      <h3 class="numgame__title">Números</h3>
      <div class="numgame__ranges">
        <button
          v-for="r in RANGES"
          :key="r.label"
          type="button"
          class="pill"
          :class="{ 'pill--active': range === r }"
          @click="setRange(r)"
        >
          {{ r.label }}
        </button>
      </div>
    </div>

    <!-- Card: number (left) + stats (right) + reset (bottom) -->
    <div class="numgame__card">
      <div class="numgame__card-body">
        <div class="numgame__card-left">
          <span class="numgame__number">{{ current }}</span>
          <span class="numgame__hint">Escribe este número en inglés</span>
        </div>
        <div class="numgame__card-right">
          <div class="numgame__stat">
            <span class="numgame__stat-icon">✅</span>
            <span class="numgame__stat-value numgame__stat-value--correct">{{ correctCount }}</span>
          </div>
          <div class="numgame__stat">
            <span class="numgame__stat-icon">❌</span>
            <span class="numgame__stat-value numgame__stat-value--wrong">{{ wrongCount }}</span>
          </div>
        </div>
      </div>
      <div class="numgame__card-footer">
        <button type="button" class="numgame__reset" @click="resetGame">
          Reiniciar
        </button>
      </div>
    </div>

    <!-- Input + action -->
    <div class="numgame__row">
      <input
        v-model="input"
        type="text"
        class="numgame__input"
        placeholder="Escribe en inglés…"
        :disabled="!!result"
        autocomplete="off"
        @keydown="onKey"
      />
      <button
        v-if="!result"
        type="button"
        class="numgame__btn"
        @click="verify"
      >
        Verificar
      </button>
      <button
        v-else
        type="button"
        class="numgame__btn numgame__btn--next"
        @click="next"
      >
        Siguiente →
      </button>
    </div>

    <!-- Result -->
    <div
      v-if="result"
      class="numgame__result"
      :class="`numgame__result--${result}`"
    >
      <template v-if="result === 'correct'">
        Correcto — en español: <strong>{{ spanishWord }}</strong>
      </template>
      <template v-else>
        Era: <strong>{{ englishWord }}</strong> — en español:
        <strong>{{ spanishWord }}</strong>
      </template>
    </div>
  </div>
</template>
