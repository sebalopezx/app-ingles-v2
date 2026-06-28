/*
  CONTROLLER (composable) — tracks which verbs are marked as "learned".
  Wraps the progressStore model and keeps reactive state in sync.
*/
import { ref, computed } from "vue";
import { loadLearned, saveLearned } from "../models/progressStore.js";

export function useProgress() {
  const learned = ref(loadLearned());
  const learnedCount = computed(() => learned.value.size);

  function toggleLearned(verbId) {
    const next = new Set(learned.value);
    if (next.has(verbId)) {
      next.delete(verbId);
    } else {
      next.add(verbId);
    }
    saveLearned(next);
    learned.value = next;
  }

  function resetProgress() {
    const empty = new Set();
    saveLearned(empty);
    learned.value = empty;
  }

  return { learned, learnedCount, toggleLearned, resetProgress };
}
