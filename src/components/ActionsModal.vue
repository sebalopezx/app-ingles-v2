<!--
  VIEW — actions modal opened from the circular button in the controls.
  Two actions: hide all open cards, or reset everything.
-->
<script setup>
import { watch, onUnmounted } from "vue";

const props = defineProps({
  open: { type: Boolean, default: false },
});

const emit = defineEmits(["close", "hideAll", "resetAll"]);

function onKeydown(event) {
  if (event.key === "Escape") emit("close");
}

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      window.addEventListener("keydown", onKeydown);
    } else {
      window.removeEventListener("keydown", onKeydown);
    }
  },
);

onUnmounted(() => window.removeEventListener("keydown", onKeydown));
</script>

<template>
  <Transition name="modal">
    <div v-if="open" class="modal" @click.self="$emit('close')">
      <div
        class="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="actions-modal-title"
      >
        <div class="modal__head">
          <h3 id="actions-modal-title" class="modal__title">Opciones</h3>
          <button
            type="button"
            class="modal__close"
            aria-label="Cerrar"
            @click="$emit('close')"
          >
            ✕
          </button>
        </div>

        <div class="modal__actions">
          <button
            type="button"
            class="modal__option"
            @click="$emit('hideAll')"
          >
            <strong>Ocultar las cartas</strong>
            <small>Cierra todas las cartas abiertas.</small>
          </button>

          <button
            type="button"
            class="modal__option modal__option--danger"
            @click="$emit('resetAll')"
          >
            <strong>Resetear todo</strong>
            <small>Borra tu progreso y vuelve al inicio.</small>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
