<!--
  Reusable colored dot.
  Pass ANY CSS color through the `color` prop, including a theme variable:
    <ColorDot color="var(--color-spanish)" />
  Because it uses the same CSS variables as the rest of the app, the dots
  always match the real colors (change the theme and they update too).
-->
<script setup>
defineProps({
  color: { type: String, default: "currentColor" },
});
</script>

<template>
  <span
    class="color-dot"
    :style="{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }"
  ></span>
</template>

<style scoped>
.color-dot {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
}
</style>
