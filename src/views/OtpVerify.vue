<template>
  <!-- Wrapper for the OTP entry screen, with a progress bar at the top -->
  <BackgroundImages :progress="progressValue">
    <!-- Progress Bar section inside BackgroundImages component -->
    <template #progress-bar>
      <div class="progress-bar-container">
        <!-- ProgressBar component displays the progress value -->
        <ProgressBar :progress="progressValue" />
      </div>
    </template>

    <!-- OTP entry content section -->
    <div class="otp-entry-content">
      <!-- Heading for the OTP entry page -->
      <h2 class="heading">Enter OTP !</h2>
      <!-- Subheading message indicating OTP was sent -->
      <p>OTP sent to provided number</p>

      <!-- Container for OTP input fields -->
      <div class="otp-input-container">
        <!-- Generate a text input field for each OTP digit -->
        <v-text-field
          v-for="(digit, index) in otpDigits"
          :key="index"
          v-model="otpDigits[index]"
          outlined
          maxlength="1"
          class="otp-input-box"
          :ref="`otp${index}`"
          @input="moveFocus(index)"
          type="tel"
        />
        <!--lopp to create 5 input fields, unique key for each of them, binds the otp digit to inputs, limits the input to 1, custom styling-->
      </div>

      <!-- Text link to resend OTP -->
      <p class="resend-text" @click="resendOtp">Did not receive yet? Resend</p>

      <!-- Verify button to trigger OTP verification -->
      <v-btn color="#009afe" @click="verifyOtp">Verify</v-btn>
    </div>
  </BackgroundImages>
</template>

<script>
// Import necessary components and services
import { mapGetters } from "vuex"; // Map state from Vuex to component
import BackgroundImages from "@/components/BackgroundImages.vue"; // Import BackgroundImages component
import ProgressBar from "@/components/ProgressBar.vue"; // Import ProgressBar component
import apiService from "@/services/apiService"; // Import API service for OTP related API calls

export default {
  components: { BackgroundImages, ProgressBar }, // Register components used in the template
  data() {
    return {
      otpDigits: ["", "", "", "", ""], // Array to store OTP digits
      progressValue: 100, // Progress value for progress bar
    };
  },
  computed: {
    ...mapGetters([
      // Map Vuex state to computed properties
      "tempUserId", // Temporary user ID
      "deviceId", // Device ID
      "mobileCountryCode", // Mobile country code
      "mobileCountry", // Mobile country
      "mobileNumber", // Mobile number
      "name", // User's name
    ]),
  },
  methods: {
    // Method to verify the OTP entered by the user
    verifyOtp() {
      const otp = this.otpDigits.join(""); // Join OTP digits into a single string
      if (otp.length === 5) {
        // Check if the OTP has 5 digits
        console.log("Verifying OTP:", otp); // Log OTP (you can replace this with actual verification logic)
      } else {
        alert("Please enter a complete 5-digit OTP."); // Alert if OTP is incomplete
      }
    },

    // Method to resend OTP when the user clicks "Resend"
    async resendOtp() {
      try {
        // Prepare data to resend OTP
        const data = {
          tempUserId: this.tempUserId,
          deviceId: this.deviceId,
          mobileCountryCode: this.mobileCountryCode,
          mobileCountry: this.mobileCountry,
          mobileNumber: this.mobileNumber,
          name: this.name,
        };

        // Call the API to resend OTP
        const response = await apiService.sendOtp(data);
        console.log("OTP resent successfully:", response); // Log the response
      } catch (error) {
        console.error("Error resending OTP:", error); // Handle errors if the OTP resend fails
      }
    },

    // Method to move the focus to the next OTP input field
    moveFocus(index) {
      // If it's not the last OTP input, move the focus to the next input field
      if (index < this.otpDigits.length - 1) {
        const nextRef = this.$refs[`otp${index + 1}`][0]; // Get the reference for the next input field
        if (nextRef && typeof nextRef.focus === "function") {
          nextRef.focus(); // Focus the next input field
        }
      }
    },
  },
};
</script>

<style scoped>
/* Styling for OTP entry content */
.otp-entry-content {
  font-family: "Poppins", sans-serif; /* Apply Poppins font */
  color: white; /* Text color set to white */
  display: flex; /* Use flexbox layout */
  flex-direction: column; /* Arrange items vertically */
  align-items: center; /* Center align items horizontally */
  justify-content: center; /* Center align items vertically */
  text-align: center; /* Center align text */
}

/* Styling for OTP input fields container */
.otp-input-container {
  display: flex; /* Use flexbox layout */
  gap: 0.5rem; /* Add space between OTP input boxes */
  margin: 20px 0; /* Add margin top and bottom */
}

/* Custom styling for each OTP input box */
.otp-input-box {
  width: 50px; /* Set width of OTP input box */
  max-height: 3.5em; /* Set maximum height */
  background-color: white; /* Set background color to white */
  border-radius: 10px; /* Rounded corners */
  text-align: center; /* Center the text inside the input box */
}

/* Styling for the resend text link */
.resend-text {
  margin: 10px 0; /* Add margin to top and bottom */
  color: #009afe; /* Set color for the resend text */
  font-size: 0.9rem; /* Font size for the text */
  cursor: pointer; /* Change cursor to pointer on hover */
}

/* For hover effect for resend text */
.resend-text:hover {
  text-decoration: underline; /* Underline the text on hover */
}
</style>
