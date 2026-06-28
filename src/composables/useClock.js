/*
  CONTROLLER (composable) — live clock.
  Updates every second and exposes time + an English-formatted date,
  so learners pick up days, months and time naturally.
*/
import { ref, onMounted, onUnmounted } from "vue";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];

function pad(value) {
  return String(value).padStart(2, "0");
}

function ordinalSuffix(day) {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function buildClock(now) {
  const day = now.getDate();
  return {
    time: `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
    weekday: DAYS[now.getDay()],
    day,
    daySuffix: ordinalSuffix(day),
    month: MONTHS[now.getMonth()],
    year: now.getFullYear(),
  };
}

export function useClock() {
  const clock = ref(buildClock(new Date()));
  let intervalId;

  onMounted(() => {
    intervalId = setInterval(() => {
      clock.value = buildClock(new Date());
    }, 1000);
  });

  onUnmounted(() => clearInterval(intervalId));

  return clock;
}
