// Import the axios library for making HTTP requests
import axios from "axios";
//const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

// Define the apiService object to organize API-related methods
const apiService = {
  // Method to fetch onboarding data for a new user
  async fetchOnboardingData() {
    try {
      // Make a POST request to the onboarding API endpoint
      const response = await axios.post(
        //`${CORS_PROXY}https://4caeisr4q3.execute-api.us-east-1.amazonaws.com/dev/mentoapp/onboarding/start`, // API endpoint
        //"https://4caeisr4q3.execute-api.us-east-1.amazonaws.com/dev/mentoapp/onboarding/start",
        "/api/mentoassignment/assignment/onboarding/start",
        {
          newUser: true, // Indicates a new user
          deviceId: "387c2863-6ee3-4a56-8210-225f774edade", // Unique device identifier
        },
        {
          headers: {
            //"Access-Control-Allow-Origin":"*",
            //"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            //"Access-Control-Allow-Headers": "Content-Type",
            "Content-Type": "application/json", // Specify that the data is in JSON format
          },
        }
      );
      // Return the response data received from the API
      return response.data;
    } catch (error) {
      // Log and rethrow the error if the API call fails.
      console.error("Error fetching onboarding data:", error);
      throw error;
    }
  },

  // Method to fetch skill learning data for a user
  async fetchSkillLearningData(tempUserId, selectedDomainId) {
    try {
      // Make a POST request to fetch skill learning data
      const response = await axios.post(
        "/api/mentoassignment/assignment/onboarding/domains", // API endpoint
        {
          tempUserId: tempUserId, // Temporary user identifier
          selectedDomainId: selectedDomainId, // Domain selected by the user
        },
        {
          headers: {
            "Content-Type": "application/json", // Specify that the data is is JSON format
          },
        }
      );
      // Return the response data received from the API
      return response.data;
    } catch (error) {
      // Log and rethrow the error if the API call fails.
      console.error("Error fetching skill learning data:", error);
      throw error;
    }
  },

  // Method to send an OTP request
  async sendOtp(data) {
    try {
      // Make a POST request to send OTP data
      const response = await axios.post(
        "/api/mentoassignment/assignment/onboarding/login", // API endpoint
        data, // Payload containing OTP request details
        {
          headers: {
            appflavour: "DEV", // Custom header to indicate app environment
            "Content-Type": "application/json", // Specify that the data is in JSON format
          },
        }
      );
      // Return the entire response object
      return response;
    } catch (error) {
      // Log and rethrow the error if the API call fails.
      console.error("Error sending OTP:", error);
      throw error;
    }
  },
};

// Export the apiService object to make it available for use in other parts of the application
export default apiService;
