<!-- VIEW — top header: brand + live clock. -->
<script setup>
import Clock from "./Clock.vue";
</script>

<template>
  <header class="header">
    <div class="header__brand">
      <span class="header__logo">EN</span>
      <h1 class="header__title">English<span>App</span></h1>
    </div>
    <Clock />
  </header>
</template>
