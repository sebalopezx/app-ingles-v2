<!--
  VIEW — live clock. The date is shown in English on purpose,
  so learners absorb weekdays and months while they study.
-->
<script setup>
import { useClock } from "../composables/useClock.js";

const clock = useClock();
</script>

<template>
  <div class="clock" aria-label="Current date and time in English">
    <div class="clock__time">{{ clock.time }}</div>
    <div class="clock__date">
      {{ clock.weekday }}, {{ clock.day }}<sup>{{ clock.daySuffix }}</sup>
      {{ clock.month }} {{ clock.year }}
    </div>
  </div>
</template>
