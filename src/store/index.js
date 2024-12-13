// src/store/index.js
// Import Vuex to create the store
import { createStore } from "vuex";

// Create and export the Vuex store
export default createStore({
  // State: Holds the applications reactive data
  state: {
    // Define default values for various pieces of state
    progress: 25, // Progress for the progress bar each screen represent 25%
    tempUserId: null, // Temporary userID
    selectedDomainId: null, // Selected domainID
    selectedOptionId: null, // Selected optionID
    deviceId: null, // DeviceID
    mobileCountryCode: null, // Country code for the user mobile number
    mobileCountry: null, // Country name of the mobile
    mobileNumber: null, // User mobile number
    name: null, // User name
  },

  // Mutations: Functions to directly modify the state
  mutations: {
    // To update the progress state
    updateProgress(state, progress) {
      state.progress = progress;
    },
    // To save the deviceID to the state
    saveDeviceId(state, deviceId) {
      state.deviceId = deviceId;
    },
    // To save the temporary userID to the state
    saveTempUserId(state, tempUserId) {
      state.tempUserId = tempUserId;
    },
    // To save the selected domainID to the state
    saveSelectedDomainId(state, domainId) {
      state.selectedDomainId = domainId;
    },
    // To save the selected optionID to the state
    saveSelectedOptionId(state, optionId) {
      state.selectedOptionId = optionId;
    },
    // To save the user information name and mobile number to the state
    saveUserInfo(
      state,
      { mobileCountryCode, mobileCountry, mobileNumber, name }
    ) {
      state.mobileCountryCode = mobileCountryCode;
      state.mobileCountry = mobileCountry;
      state.mobileNumber = mobileNumber;
      state.name = name;
    },
  },

  // Actions: Functions that commit mutations uses async operation
  actions: {
    // To update progress calls mutation to changes the progress value
    updateProgress({ commit }, progress) {
      commit("updateProgress", progress);
    },
    //To save the deviceId calls mutation to store the deviceId
    saveDeviceId({ commit }, deviceId) {
      commit("saveDeviceId", deviceId);
    },
    // To save the temporary userId calls the mutation to store the temporary userId
    saveTempUserId({ commit }, tempUserId) {
      commit("saveTempUserId", tempUserId);
    },
    // To save the selected domainId calls the mutation to store the domainId
    saveSelectedDomainId({ commit }, domainId) {
      commit("saveSelectedDomainId", domainId);
    },
    // Save the selected optionId calls the mutation to store the optionId
    saveSelectedOptionId({ commit }, optionId) {
      commit("saveSelectedOptionId", optionId);
    },
    // To save the user information calls the mutation to store user data
    saveUserInfo({ commit }, userInfo) {
      commit("saveUserInfo", userInfo);
    },
  },

  // Getters: Functions to access specific pieces of state
  getters: {
    // To get the progress value from the state
    progress: (state) => state.progress,
    // To get the temporary user ID from the state
    tempUserId: (state) => state.tempUserId,
    // To get the selected domain ID from the state
    selectedDomainId: (state) => state.selectedDomainId,
    // To get the selected option ID from the state
    selectedOptionId: (state) => state.selectedOptionId,
    //To get the device ID from the state
    deviceId: (state) => state.deviceId,
    // To get the mobile country code from the state
    mobileCountryCode: (state) => state.mobileCountryCode,
    // To get the mobile country name from the state
    mobileCountry: (state) => state.mobileCountry,
    //To get the mobile number from the state
    mobileNumber: (state) => state.mobileNumber,
    //To get the user's name from the state
    name: (state) => state.name,
  },
});
