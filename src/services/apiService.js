// Import the axios library for making HTTP requests
import axios from "axios";

// Define the apiService object to combine API calls
const apiService = {
  // Method to fetch onboarding data for a new user
  async fetchOnboardingData() {
    try {
      // POST request to the onboarding endpoint with data of the new user and device ID
      const response = await axios.post(
        "/api/mentoassignment/assignment/onboarding/start", // API endpoint
        { newUser: true, deviceId: "387c2863-6ee3-4a56-8210-225f774edade" }, // Data to be send with the request
        {
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
        }
      );
      // Returns the response data from the API
      return response.data;
    } catch (error) {
      // If an error occurs, catch it here and throw it
      console.error("Error fetching onboarding data:", error); // Log the error as well
      throw error;
    }
  },

  // Method to fetch skill learning data for a user based on temporary userID and selecteddomain
  async fetchSkillLearningData(tempUserId, selectedDomainId) {
    try {
      // POST request to fetch the skill learning data for the given user and domain
      const response = await axios.post(
        "/api/mentoassignment/assignment/onboarding/domains", // API endpoint
        {
          tempUserId: tempUserId, // Temporary userID
          selectedDomainId: selectedDomainId, // Selecteddomain ID
        },
        {
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
        }
      );
      // Returns the response data from the API
      return response.data;
    } catch (error) {
      // If an error occurs, catch it here and throw it
      console.error("Error fetching skill learning data:", error); // Log the error as well
      throw error;
    }
  },

  // Method to send an OTP request to the server
  async sendOtp(data) {
    try {
      // POST request to send OTP for user login
      const response = await axios.post(
        "/api/mentoassignment/assignment/onboarding/login", // API endpoint
        data, // Data to be send with the request
        {
          headers: {
            appflavour: "DEV", // Custom header for app flavor
            "Content-Type": "application/json", // Set the content type to JSON
          },
        }
      );
      // Returns the response from the OTP request
      return response;
    } catch (error) {
      // If an error occurs, catch it and throw the error
      console.error("Error sending OTP:", error); // Log the error as well
      throw error;
    }
  },
};

// Export the apiService object for the use in the application
export default apiService;
