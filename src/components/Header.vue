<!--
  VIEW — top header.
  Wide screens: brand (left) · nav (center) · clock (right).
  Narrow screens: everything stacked and centered — brand on top, clock in the
  middle, and a menu button that toggles the nav links below.
-->
<script setup>
import { ref } from "vue";
import Clock from "./Clock.vue";
import AppLogo from "./icons/AppLogo.vue";

const assetBase = import.meta.env.BASE_URL;
const menuOpen = ref(false);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
}
</script>

<template>
  <header class="header">
    <img
      class="header__flag header__flag--usa"
      :src="`${assetBase}flags/estados-unidos.png`"
      alt=""
      aria-hidden="true"
    />
    <img
      class="header__flag header__flag--chile"
      :src="`${assetBase}flags/chile.png`"
      alt=""
      aria-hidden="true"
    />

    <div class="header__brand">
      <AppLogo class="header__logo" />
      <h1 class="header__title">
        <span class="header__title-es">SPAN</span><span class="header__title-en">GLISH</span>
      </h1>
    </div>

    <Clock />

    <button
      type="button"
      class="nav-toggle"
      :aria-expanded="menuOpen"
      aria-controls="main-nav"
      @click="toggleMenu"
    >
      <span class="nav-toggle__icon" aria-hidden="true">☰</span>
      Menú
    </button>

    <nav id="main-nav" class="nav" :class="{ 'nav--open': menuOpen }">
      <RouterLink to="/" class="nav__link" @click="closeMenu">Inicio</RouterLink>
      <RouterLink to="/verbs" class="nav__link" @click="closeMenu">
        Verbos
      </RouterLink>
      <RouterLink to="/calendar" class="nav__link" @click="closeMenu">
        Calendario
      </RouterLink>
    </nav>
  </header>
</template>
