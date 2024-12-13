<template>
  <!-- Background container with a progress bar -->
  <BackgroundImages :progress="progress">
    <!-- Progress Bar section inside BackgroundImages component -->
    <template #progress-bar>
      <div class="progress-bar-container">
        <!-- ProgressBar component that displays the progress value -->
        <ProgressBar :progress="progress" />
      </div>
    </template>

    <!-- Main content for skill options -->
    <div class="skill-option-content">
      <!-- Heading that displays the question text -->
      <h3 class="heading">{{ questionText }}</h3>

      <!-- Container for the option cards -->
      <div class="options-container">
        <!-- Loop through options and create a card for each option -->
        <v-card
          v-for="option in options"
          :key="option.optionId"
          class="option-card"
          outlined
          @click="selectOption(option)"
        >
          <!--loop to run on avaiable option, optionid as key for each card, click and move to next step-->
          <div class="card-content">
            <!-- Display option image with dynamic URL -->
            <!--S3 url to fetch the option images-->
            <img
              :src="s3url + '/' + option.image"
              alt="Option Image"
              class="option-image"
            />
            <!-- Option text -->
            <h3>{{ option.text }}</h3>
          </div>
        </v-card>
      </div>
    </div>
  </BackgroundImages>
</template>

<script>
// Import necessary components and services
import { mapState, mapActions } from "vuex"; // Map Vuex state and actions
import apiService from "@/services/apiService"; // Import API service for data fetching
import BackgroundImages from "@/components/BackgroundImages.vue"; // Import BackgroundImages component
import ProgressBar from "@/components/ProgressBar.vue"; // Import ProgressBar component

export default {
  components: {
    BackgroundImages, // Register BackgroundImages component
    ProgressBar, // Register ProgressBar component
  },
  computed: {
    // Map required state from Vuex store
    ...mapState(["progress", "tempUserId", "selectedDomainId"]),
  },
  data() {
    return {
      s3url: "https://mysa-img.devtest.thestudypod.com", // URL for S3 image storage
      questionText: "", // Text of the question
      options: [], // Array to hold options for the question
    };
  },
  async created() {
    try {
      // Check if tempUserId and selectedDomainId are available in Vuex
      if (!this.tempUserId || !this.selectedDomainId) {
        console.error(
          "No tempUserId or selectedDomainId found. Make sure they are saved in Vuex"
        );
        return;
      }

      // Fetch skill learning data based on tempUserId and selectedDomainId
      const data = await apiService.fetchSkillLearningData(
        this.tempUserId,
        this.selectedDomainId
      );

      // Check if data exists and populate questionText and options
      if (data && data.length > 0) {
        this.questionText = data[0].questionText;
        this.options = data[0].options;
      } else {
        console.error("API response missing questionText or options");
      }
    } catch (error) {
      console.error("API response error or missing fields:", error); // Handle API errors
    }
  },
  methods: {
    // Map actions from Vuex store
    ...mapActions(["updateProgress", "saveSelectedOptionId"]),

    // Method to handle option selection
    selectOption(option) {
      this.updateProgress(75); // Update progress to 75% after option selection
      this.saveSelectedOptionId(option.optionId); // Save selected option in Vuex
      this.$router.push({ name: "UserInfo" }); // Navigate to next page (UserInfo)
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

/* Styling for skill option content */
.skill-option-content {
  font-family: "Poppins", sans-serif; /* Set font to Poppins */
  margin-top: 2rem; /* Add top margin */
  text-align: center; /* Center text */
  color: white; /* Set text color to white */
}

/* Styling for the question heading */
.heading {
  font-size: 1.2rem; /* Set font size */
  margin-bottom: 2rem; /* Add bottom margin */
}

/* Container for option cards */
.options-container {
  display: flex; /* Use flexbox layout */
  flex-wrap: wrap; /* Allow wrapping of cards */
  gap: 2rem; /* Add gap between cards */
  justify-content: center; /* Center the cards horizontally */
}

/* Styling for individual option cards */
.option-card {
  text-align: center; /* Center text in the card */
  display: flex; /* Use flexbox layout for card */
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Align items in the center */
  width: 30%; /* Set card width */
}

/* Content inside each card */
.card-content {
  display: flex; /* Use flexbox layout */
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Align items in the center */
  margin: 1rem; /* Add margin around the content */
  text-align: center; /* Center text inside the card */
}

/* Styling for option text */
h3 {
  font-size: 0.84rem; /* Set font size for the option text */
  font-weight: 600; /* Set font weight to semi-bold */
  margin: 0; /* Remove margin */
}

/* Styling for option image inside the card */
.option-image {
  width: 3rem; /* Set width of the option image */
  height: 2.7rem; /* Set height of the option image */
  border-radius: 50%; /* Make the image circular */
  object-fit: cover; /* Ensure image covers the area */
  margin-bottom: 1rem; /* Add margin at the bottom */
}

/* Responsive design for smaller screens */
@media (max-width: 576px) {
  .heading {
    font-size: 1.4rem; /* Increase font size for smaller screens */
  }

  .option-card {
    width: 140px; /* Reduce width of option cards */
  }

  .option-image {
    width: 30px; /* Reduce image size */
    height: 30px; /* Set image height to 30px */
  }

  .options-container {
    gap: 0.8rem; /* Reduce gap between cards */
  }
}
</style>
