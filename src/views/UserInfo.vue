<template>
  <!-- Background component with the progress bar -->
  <BackgroundImages :progress="progress">
    <template #progress-bar>
      <div class="progress-bar-container">
        <!-- ProgressBar component displays the progress percentage -->
        <ProgressBar :progress="progress" />
      </div>
    </template>

    <!-- User input form container -->
    <div class="user-info-content">
      <h3 class="heading">Great! Almost There</h3>

      <!-- Form to collect user information -->
      <v-form ref="form" class="form">
        <!-- Input label for the name field -->
        <p class="input-label">What should we call you?</p>
        <!-- Name input field with validation -->
        <!-- Rule for required field -->
        <v-text-field
          v-model="name"
          label="Name"
          outlined
          hide-details="auto"
          dense
          class="input-field"
          :rules="[rules.required]"
        />
        <!-- Input label for the mobile number -->
        <p class="input-label">Please Provide your Mobile number</p>
        <div class="phone-number-field">
          <v-row no-gutters>
            <!-- Country code selection dropdown -->
            <v-col cols="4">
              <v-select
                v-if="flattenedCountryCodes.length > 0"
                v-model="selectedCountryCode"
                :items="flattenedCountryCodes"
                item-text="display"
                item-value="code"
                outlined
                dense
                hide-details="auto"
                class="country-code-select"
              >
                <!--to display country codes which are avaiable, combine the country codes and selection for country codes as well-->
                <!-- Country code selection template -->
                <template #selection="{ item }">
                  <span v-if="item">
                    <!-- Display country flag and code -->
                    <img
                      :src="item.raw.flagUrl"
                      alt="Flag"
                      class="country-flag"
                    />
                    {{ item.raw.code }}
                  </span>
                </template>
                <template #item="{ item }">
                  <div v-if="item">
                    <!-- Country flag and code in dropdown menu -->
                    <img
                      :src="item.props.title.flagUrl"
                      alt="Flag"
                      class="country-flag"
                    />
                    {{ item.raw.code }}
                  </div>
                </template>
              </v-select>
            </v-col>

            <!-- Mobile number input field -->
            <v-col cols="8">
              <v-text-field
                v-model="mobileNumber"
                label="Mobile Number"
                outlined
                dense
                hide-details
                class="phone-number-input"
                :rules="[rules.required, rules.phoneNumber]"
                type="tel"
                @keypress="onlyDigits"
              />
              <!-- Bind mobile number input  and validation rules for the mobile number which allows only numeric inputs-->
            </v-col>
          </v-row>
        </div>

        <!-- Submit button for the form submission -->
        <v-btn @click="submitInfo" color="primary" class="next-button">
          Next
        </v-btn>
      </v-form>
    </div>
  </BackgroundImages>
</template>

<script>
// Import necessary modules and components
import { mapState } from "vuex";
import BackgroundImages from "@/components/BackgroundImages.vue"; // To import the BackgroundImages component
import ProgressBar from "@/components/ProgressBar.vue"; // To import ProgressBar component
import { getCountryCallingCode, getCountries } from "libphonenumber-js"; // Library for handling country codes and flags
import apiService from "@/services/apiService"; // API service to handle OTP request

// Generate flattened list of country codes with flags
const flattenedCountryCodes = getCountries().map((country) => ({
  code: `+${getCountryCallingCode(country)}`, // Format country calling code
  flagUrl: `https://flagcdn.com/16x12/${country.toLowerCase()}.png`, // Flag URL for the country
  display: `+${getCountryCallingCode(country)}`, // Display format for country code
}));

export default {
  components: { BackgroundImages, ProgressBar },
  data() {
    return {
      name: "", // Stores the user's name
      mobileNumber: "", // Stores the user's mobile number
      selectedCountryCode: "+91", // Default selected country code (India)
      rules: {
        required: (value) => !!value || "This field is required", // Validation for required fields
        phoneNumber: (value) =>
          /^\d{10}$/.test(value) || "Enter a valid 10-digit phone number", // Validation for phone number format
      },
    };
  },
  computed: {
    ...mapState(["progress", "tempUserId", "deviceId"]), // Map Vuex state to computed properties
    flattenedCountryCodes() {
      return flattenedCountryCodes; // Return flattened country codes list
    },
  },
  methods: {
    // Restrict input to digits only in the mobile number field
    onlyDigits(event) {
      const char = String.fromCharCode(event.keyCode); // Convert keypress to character
      if (!/[0-9]/.test(char)) {
        // If it's not a number, prevent default action
        event.preventDefault();
      }
    },
    // Submit user info and send OTP request
    async submitInfo() {
      if (this.$refs.form.validate()) {
        // Validate form before submitting
        // Save user info in Vuex store
        this.$store.dispatch("saveUserInfo", {
          name: this.name,
          mobileNumber: this.mobileNumber,
          mobileCountryCode: this.selectedCountryCode,
          mobileCountry: "INDIA", // Hardcoded country (India)
        });

        try {
          // Send OTP request via API service
          const response = await apiService.sendOtp({
            tempUserId: this.tempUserId,
            deviceId: this.deviceId,
            mobileCountryCode: this.selectedCountryCode,
            mobileCountry: "INDIA", // Hardcoded country (India)
            mobileNumber: this.mobileNumber,
            name: this.name,
          });

          if (response.status === 200) {
            // If OTP request is successful
            this.$store.commit("updateProgress", 100); // Update progress in Vuex store
            this.$router.push({ name: "OtpVerify" }); // Navigate to OTP verification page
          } else {
            alert("Failed to send OTP. Please try again."); // Show error message if OTP request fails
          }
        } catch (error) {
          console.error("Error:", error); // Log error to the console
          alert("Error sending OTP. Please try again."); // Show error message
        }
      } else {
        alert("Please fill in all required fields."); // Alert user if validation fails
      }
    },
  },
};
</script>

<style scoped>
/* Styles for the user info content section */
.user-info-content {
  font-family: "Poppins", sans-serif;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

/* Styles for the form container */
.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Heading style */
.heading {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: white;
}

/* Label styles for input fields */
.input-label {
  font-size: 0.9rem;
  color: white;
  margin-bottom: 5px;
  width: 60%;
  text-align: left;
}

/* Styles for input fields */
.input-field,
.phone-number-field {
  background-color: white;
  border-radius: 8px;
  width: 60%;
  margin-bottom: 20px;
}

.phone-number-field {
  display: flex;
  align-items: center;
  padding: 0 8px;
}

/* Styles for country code select and phone number input */
.country-code-select,
.phone-number-input {
  background-color: transparent;
  width: 100%;
}

/* Country flag image styling */
.country-flag {
  width: 12px;
  height: 12px;
  margin-right: 5px;
}

/* Style for the Next button */
.next-button {
  margin-top: 20px;
}
</style>
