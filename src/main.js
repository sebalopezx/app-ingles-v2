import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router/index.js";

// Global styles (order matters: tokens first, then base, then components).
import "./styles/theme.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components.css";

createApp(App).use(router).mount("#app");
