<!-- VIEW (root) — app shell: header + routed page + footer. -->
<script setup>
import AppHeader from "./components/Header.vue";
import AppFooter from "./components/Footer.vue";

const backgroundImage = `url("${import.meta.env.BASE_URL}fondo_ingles.jpg")`;
</script>

<template>
  <div class="app-shell">
    <div
      class="app-bg"
      :style="{ backgroundImage }"
      aria-hidden="true"
    ></div>

    <div class="app">
      <AppHeader />

      <main>
        <RouterView v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>

      <AppFooter />
    </div>
  </div>
</template>
