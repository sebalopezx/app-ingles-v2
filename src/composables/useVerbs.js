/*
  CONTROLLER (composable) — owns the verb list state: search query,
  type filter and order. Reads from the verbsService model and exposes
  the visible (filtered) list.
*/
import { ref, computed } from "vue";
import {
  VERB_TYPE,
  filterVerbs,
  getAllVerbs,
  shuffleVerbs,
} from "../models/verbsService.js";

export function useVerbs() {
  const allVerbs = getAllVerbs();

  const baseList = ref(allVerbs);
  const query = ref("");
  const type = ref(VERB_TYPE.ALL);

  const visibleVerbs = computed(() =>
    filterVerbs(baseList.value, { query: query.value, type: type.value }),
  );

  function shuffle() {
    baseList.value = shuffleVerbs(baseList.value);
  }

  function resetOrder() {
    baseList.value = allVerbs;
  }

  return {
    visibleVerbs,
    totalCount: allVerbs.length,
    query,
    type,
    shuffle,
    resetOrder,
  };
}
