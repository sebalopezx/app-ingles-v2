<!-- VIEW (root) — app shell: header + routed page + footer. -->
<script setup>
import AppHeader from "./components/Header.vue";
import AppFooter from "./components/Footer.vue";
</script>

<template>
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
</template>
