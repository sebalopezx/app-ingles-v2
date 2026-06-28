/*
  MODEL — persistence for "learned" verbs using localStorage.
  Stored as an array of verb ids; exposed to the app as a Set.
*/
const STORAGE_KEY = "app-ingles-v2:learned";

/** Loads the set of learned verb ids from localStorage. */
export function loadLearned() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const ids = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(ids) ? ids : []);
  } catch {
    return new Set();
  }
}

/** Persists the set of learned verb ids to localStorage. */
export function saveLearned(learnedSet) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...learnedSet]));
  } catch {
    /* storage unavailable (private mode / quota) — ignore silently */
  }
}
