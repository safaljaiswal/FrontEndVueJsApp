<template>
  <!-- Container for the progress bar -->
  <div class="progress-bar">
    <!-- Progress element that adjusts width depending upon 'progress' prop -->
    <div class="progress" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<script>
// The script defines the components behavior
export default {
  // progress is a required prop of type Number to represent the percentage of the progress
  props: {
    progress: {
      type: Number,
      required: true, // The progress value must be provided when using the component
    },
  },
};
</script>

<style scoped>
/* Styling for the main progress bar container */
.progress-bar {
  width: 50%; /* width of the progress bar */
  height: 6px; /* Height of the progress bar */
  background-color: #e0e0e0; /* Light gray background color for the empty part of the bar */
  border-radius: 4px; /* Rounded corners for the container */
  margin-left: auto; /* Center the progress bar horizontally from the left */
  margin-right: auto; /* Center the progress bar horizontally from the right*/
}

/* Styling for the actual progress bar that fills based on the progress prop */
.progress {
  height: 100%; /* Fill the entire height of the container */
  background-color: #009afe; /* Blue color for the filled part */
  border-radius: 4px; /* Rounded corners for the filled part */
}
</style>
