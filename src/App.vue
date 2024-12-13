<template>
  <!-- The main vuetify application component -->
  <v-app>
    <v-main>
      <!-- Router view where different pages will be displayed based on the routes -->
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// Default export of the Vue component
export default {
  name: "App", // Name of the component

  // Data function returns the component's data properties (currently empty)
  data: () => ({
    //
  }),
};
</script>
