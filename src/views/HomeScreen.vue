<template>
  <!-- Template for home screen page -->
  <BackgroundImages :progress="progress">
    <!-- Position of Progress Bar inside the BackgroundImages -->
    <template #progress-bar>
      <ProgressBar :progress="progress" />
    </template>

    <!-- Main content section inside onboarding page -->
    <div class="onboarding-content">
      <!-- Heading for domain selection message -->
      <h3 class="heading">{{ domainSelectionMessage }}</h3>

      <!-- Subheading with additional details about the domain -->
      <p class="subheading">{{ domainSelectionMessageDetails }}</p>

      <!-- Displaying a list of domain options -->
      <div class="domain-options">
        <!-- Loop through the domains and create a CardLayout for each domain -->
        <CardLayout
          v-for="domain in domains"
          :key="domain.domainId"
          :imageSrc="s3url + '/' + domain.image"
          :title="domain.name"
          :description="domain.description"
          alignment="left"
          @click="selectDomain(domain)"
        />
        <!--This contains loop through each domain, unique key for each domain, domain image URL, domain name, description, card alignment and to handle card click event-->
      </div>
    </div>
  </BackgroundImages>
</template>

<script>
// To import necessary components and services
import { mapState, mapActions } from "vuex";
import apiService from "@/services/apiService"; // To import API service for fetching data
import BackgroundImages from "@/components/BackgroundImages.vue"; // To Import BackgroundImages component
import ProgressBar from "@/components/ProgressBar.vue"; // To Import ProgressBar component
import CardLayout from "@/components/CardLayout.vue"; // To import CardLayout component

// Function to generate a unique UUID for the device
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default {
  components: {
    BackgroundImages, // This to register BackgroundImages component
    ProgressBar, //  This to register ProgressBar component
    CardLayout, //  This to register CardLayout component
  },
  computed: {
    ...mapState(["progress", "deviceId"]), // to map progress and deviceId from Vuex store to component
  },
  data() {
    return {
      s3url: "", // URL for the S3 bucket where images are stored of the option screen
      domainSelectionMessage: "", // Message for domain selection heading
      domainSelectionMessageDetails: "", // Additional details for domain selection
      domains: [], // Array to hold domain options
    };
  },
  async created() {
    // If deviceId does not exist in Vuex store, it will generate a new UUID
    if (!this.deviceId) {
      const newDeviceId = generateUUID();
      this.saveDeviceId(newDeviceId); // Save the new deviceId in Vuex store
    }

    // To Fetch onboarding data from API
    try {
      // try Case
      const data = await apiService.fetchOnboardingData(); // For API call to fetch onboarding data
      this.s3url = data.appurls.s3url; // To Set S3 URL from API response
      this.domainSelectionMessage = data.domainSelectionMessage; // To Set heading message from API
      this.domainSelectionMessageDetails = data.domainSelectionMessageDetails; // To Set subheading message
      this.domains = data.domains; // To Set domain options list from API

      // Saves tempUserId if available in the API response
      if (data.tempUserId) {
        this.saveTempUserId(data.tempUserId);
      } else {
        console.error("tempUserId not found in API response");
      }
    } catch (error) {
      console.error("Error fetching onboarding data:", error); // to handle error if API call fails
    }
  },
  methods: {
    ...mapActions([
      "updateProgress", // Action to update progress in Vuex store
      "saveTempUserId", // Action to save tempUserId in Vuex store
      "saveSelectedDomainId", // Action to save selected domain ID in Vuex store
      "saveDeviceId", // Action to save deviceId in Vuex store
    ]),

    // Method to handle domain selection
    selectDomain(domain) {
      if (!domain || !domain.domainId) {
        console.error("No domain selected");
        return;
      }

      this.saveSelectedDomainId(domain.domainId); // To Save selected domainId in Vuex store
      this.updateProgress(50); // To update progress to 50%
      this.$router.push({ name: "SkillOption" }); // For navigating to the SkillOption page
    },
  },
};
</script>

<style scoped>
/* Import Poppins font */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
/* Styling for onboarding page content */
.onboarding-content {
  font-family: "Poppins", sans-serif; /* Apply Poppins font */
  margin-top: 2rem; /* Add margin on top */
  text-align: center; /* Center align text */
  color: white; /* Sets text color to white */
}

.heading {
  font-size: 1.2rem; /* Heading font size */
}

.subheading {
  font-size: 0.8rem; /* Subheading font size */
  color: white; /* Sets subheading color to white */
  margin-bottom: 2rem; /* Adds margin to bottom */
}

.domain-options {
  display: flex; /* Uses flexbox layout */
  flex-wrap: wrap; /* Allow wrapping of items */
  gap: 1rem; /* Add gap between items */
  justify-content: center; /* Center items */
}

.progress-bar-container {
  width: 70%; /* Sets width of progress bar container */
  margin: 0 auto; /* Centers the container */
  display: flex; /* Uses flexbox layout */
  justify-content: center; /* Centers the content */
}

@media (max-width: 576px) {
  /* Responsive styling for small screens */
  .heading {
    font-size: 1rem; /* To adjust heading font size */
  }
  .subheading {
    font-size: 0.65rem; /* To adjust subheading font size */
  }
  .domain-options {
    gap: 1rem; /* To adjust gap between domain cards */
  }
}
</style>
