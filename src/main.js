// Import necessary libraries and components
import { createApp } from "vue"; // Vue 3 function to create the app
import App from "./App.vue"; // The root App component
import router from "./router"; // Vue Router instance for managing routes
import store from "./store"; // Vuex store instance for state management
import vuetify from "./plugins/vuetify"; // Vuetify plugin for UI components
import { loadFonts } from "./plugins/webfontloader"; // Web font loader plugin
// To call the loadFonts function to load necessary fonts
loadFonts();
// Create the Vue app instance with the root component (App)
const app = createApp(App);
// Use Vue Router, Vuex store, and Vuetify plugin
app
  .use(router) // Integrates Vue Router
  .use(store) // Integrates Vuex store
  .use(vuetify) // Integrates Vuetify UI library
  // To mount the app to the DOM element with the id "app"
  .mount("#app");
