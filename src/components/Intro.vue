<!-- VIEW — main page intro: what the app is and how to use it. -->
<script setup>
import HandClickIcon from "./icons/HandClickIcon.vue";
import TranslationIcon from "./icons/TranslationIcon.vue";
import SimplePastIcon from "./icons/SimplePastIcon.vue";
import ParticipleIcon from "./icons/ParticipleIcon.vue";
import ColorDot from "./ColorDot.vue";
</script>

<template>
  <section class="intro">
    <h2 class="intro__title">Verbos en pasado simple</h2>
    <p class="intro__lead">
      Explora todos los verbos y revela su traducción al instante. La idea es ir rápido: <strong class="text-spanish">mira, repite y memoriza</strong>.
    </p>

    <ul class="intro__steps">
      <li>
        <span class="intro__icon intro__icon--reveal"><HandClickIcon /></span>
        <span>
          <strong>Haz clic en una tarjeta</strong> — donde veas este icono,
          puedes hacer clic en la tarjeta para mostrar la
          traducción y los tiempos verbales.
        </span>
      </li>
      <li>
        <span class="intro__icon intro__icon--learn">✓</span>
        <span>
          <strong>Marcar como aprendido</strong> — toca el check para registrar
          tu progreso en la barra de arriba.
        </span>
      </li>
      <li>
        <span class="intro__icon intro__icon--shuffle">⇄</span>
        <span>
          <strong>Mezclar y ocultar</strong> — cambia el orden y revela las
          tarjetas una por una para ponerte a prueba.
        </span>
      </li>
    </ul>

    <h3 class="intro__subtitle">¿Cómo funciona cada sección?</h3>
    <ul class="intro__steps">
      <li>
        <span class="intro__icon intro__icon--numbers">123</span>
        <span>
          <strong>Números</strong> — escribe el número en inglés y verifica tu
          respuesta. Tus aciertos y errores quedan guardados.
        </span>
      </li>
      <li>
        <span class="intro__icon intro__icon--reveal"><HandClickIcon /></span>
        <span>
          <strong>Días y meses</strong> — puedes arrastrar cada palabra a su
          posición, o hacer clic en una para seleccionarla y luego clic en el
          recuadro donde creas que va.
        </span>
      </li>
    </ul>

    <h3 class="intro__subtitle">¿Qué muestra cada icono?</h3>
    <ul class="intro__legend">
      <li>
        <span class="intro__legend-icon intro__legend-icon--translation">
          <TranslationIcon />
        </span>
        <span><strong>Traducción</strong> — la palabra en español.</span>
      </li>
      <li>
        <span class="intro__legend-icon">
          <SimplePastIcon />
        </span>
        <span>
          <strong>Pasado simple</strong> — la forma del pasado (ej. <em>worked</em>,
          <em>went</em>).
        </span>
      </li>
      <li>
        <span class="intro__legend-icon">
          <ParticipleIcon />
        </span>
        <span>
          <strong>Pasado participio</strong> — se usa en los tiempos perfectos
          (ej. <em>worked</em>, <em>gone</em>).
        </span>
      </li>
    </ul>

    <h3 class="intro__subtitle">¿Qué representan los colores?</h3>
    <ul class="intro__legend">
      <li>
        <span class="intro__legend-icon">
          <ColorDot color="var(--color-spanish)" />
        </span>
        <span>Representa las palabras en — <strong>español</strong>.</span>
      </li>
      <li>
        <span class="intro__legend-icon">
          <ColorDot color="var(--color-regular)" />
        </span>
        <span>
          Representa los <strong>verbos regulares</strong> (ej. <em>worked</em>,
          <em>played</em>).
        </span>
      </li>
      <li>
        <span class="intro__legend-icon">
          <ColorDot color="var(--color-irregular)" />
        </span>
        <span>
          Representa los <strong>verbos irregulares</strong> (ej. <em>went</em>,
          <em>gone</em>).
        </span>
      </li>
    </ul>
  </section>
</template>
