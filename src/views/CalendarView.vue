<!-- VIEW (page) — Calendar: word-matching game for days and months + number game. -->
<script setup>
import MatchSection from "../components/MatchSection.vue";
import NumberGame from "../components/NumberGame.vue";

const DAYS = [
  { en: "Monday", es: "Lunes" },
  { en: "Tuesday", es: "Martes" },
  { en: "Wednesday", es: "Miércoles" },
  { en: "Thursday", es: "Jueves" },
  { en: "Friday", es: "Viernes" },
  { en: "Saturday", es: "Sábado" },
  { en: "Sunday", es: "Domingo" },
];

const MONTHS = [
  { en: "January", es: "Enero" },
  { en: "February", es: "Febrero" },
  { en: "March", es: "Marzo" },
  { en: "April", es: "Abril" },
  { en: "May", es: "Mayo" },
  { en: "June", es: "Junio" },
  { en: "July", es: "Julio" },
  { en: "August", es: "Agosto" },
  { en: "September", es: "Septiembre" },
  { en: "October", es: "Octubre" },
  { en: "November", es: "Noviembre" },
  { en: "December", es: "Diciembre" },
];
</script>

<template>
  <div class="stack">
    <NumberGame />
    <MatchSection title="Días de la semana" :items="DAYS" storage-key="app-ingles-v2:match-days" :columns="2" />
    <MatchSection title="Meses del año" :items="MONTHS" storage-key="app-ingles-v2:match-months" :columns="2" />
  </div>
</template>
