/*
  MODEL — verbs data source and pure data operations.
  The JSON file acts as our "database". All access goes through here,
  so the rest of the app never touches the raw data directly.
*/
import verbs from "../data/verbs.json";

export const VERB_TYPE = {
  ALL: "all",
  REGULAR: "regular",
  IRREGULAR: "irregular",
};

/** Stable unique id for a verb (used for progress tracking). */
export function getVerbId(verb) {
  return verb.infinitive.toLowerCase();
}

/** Returns the full list of verbs. */
export function getAllVerbs() {
  return verbs;
}

/** Filters a list by free-text query (EN or ES) and verb type. */
export function filterVerbs(list, { query = "", type = VERB_TYPE.ALL } = {}) {
  const q = query.trim().toLowerCase();

  return list.filter((verb) => {
    if (type !== VERB_TYPE.ALL && verb.type !== type) return false;
    if (!q) return true;

    return (
      verb.infinitive.toLowerCase().includes(q) ||
      verb.translation.toLowerCase().includes(q) ||
      verb.simplePast.toLowerCase().includes(q) ||
      verb.pastParticiple.toLowerCase().includes(q)
    );
  });
}

/** Returns a new array with the items shuffled (Fisher–Yates). */
export function shuffleVerbs(list) {
  const result = [...list];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
