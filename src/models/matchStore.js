/*
  MODEL — persistence for match-game progress (correct pairs per section).
  Each section uses its own key so days and months are stored independently.
*/

export function loadMatches(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveMatches(storageKey, matches) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(matches));
  } catch {
    /* storage unavailable — ignore silently */
  }
}

export function clearMatches(storageKey) {
  try {
    localStorage.removeItem(storageKey);
  } catch {}
}
