/*
  MODEL — persistence for number-game stats (correct / wrong counts).
*/
const STORAGE_KEY = "app-ingles-v2:number-stats";

export function loadStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : null;
    return { correct: data?.correct ?? 0, wrong: data?.wrong ?? 0 };
  } catch {
    return { correct: 0, wrong: 0 };
  }
}

export function saveStats(correct, wrong) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ correct, wrong }));
  } catch {
    /* storage unavailable — ignore silently */
  }
}

export function clearStats() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
