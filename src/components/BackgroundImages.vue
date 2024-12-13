<template>
  <!-- Background component that sets background image based on day or night -->
  <div :class="backgroundClass" class="background-container">
    <div class="content-box">
      <!-- Space for rendering a progress bar -->
      <slot name="progress-bar"></slot>

      <!-- Main content space -->
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Props passed to this component, including the progress value
  props: {
    progress: {
      type: Number,
      default: 0, // Default progress value is 0
    },
  },
  data() {
    return {
      dayBackground: require("@/assets/background-day.png"), // Importing background images for day
      nightBackground: require("@/assets/background-night.png"), // // Importing background images for night
    };
  },
  // Computed property to determine the background day or night
  computed: {
    backgroundClass() {
      const hour = new Date().getHours(); // Fetch current time
      const isDay = hour >= 6 && hour < 18; // Checks if it is day or night
      return isDay ? "daytime-background" : "nighttime-background"; // Set the backgorund according to the time
    },
  },
};
</script>

<style scoped>
/* Container for background and content */
.background-container {
  position: relative; /* Position for the container*/
  height: 100vh; /* Full height of the viewport */
  display: flex;
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
}
/* Box for content*/
.content-box {
  border-radius: 15px;
  padding: 20px; /** padding for the box */
  width: 90%; /* 90% of the available width */
  max-width: 650px; /* max width of 650px */
  text-align: center; /** Text alignment */
}
/* Margin for content section */
.content {
  margin-top: 20px;
}
/* background style for day*/
.daytime-background {
  background-image: url("@/assets/background-day.png"); /* Daytime image */
  background-size: cover; /* Covers entire container */
  background-position: center center; /* To center the background */
}
/* background style for night*/
.nighttime-background {
  background-image: url("@/assets/background-night.png"); /* Nighttime image */
  background-size: cover; /* Covers entire container */
  background-position: center center; /* Center the background */
}
</style>
