// Imports necessary functions from vue-router to handle routing in the Vue app
import { createRouter, createWebHistory } from "vue-router";

// Imports the Vue components that will be displayed for each route
import HomeScreen from "@/views/HomeScreen.vue"; // Home screen component (Screen1)
import SkillOption from "@/views/SkillOption.vue"; // Skill option component (Screen2)
import UserInfo from "@/views/UserInfo.vue"; // User info component (Screen3)
import OtpVerify from "@/views/OtpVerify.vue"; // OTP verification component (LastScreen)

// Define the routes for the application. Each route maps a path to a component.
const routes = [
  {
    path: "/", // path url for the home screen
    name: "HomeScreen", // Name of the route
    component: HomeScreen, // Component to be displayed when the location is accessed
  },
  {
    path: "/skill-option", // path url for the skill option screen
    name: "SkillOption", // Name of the route
    component: SkillOption, // Component to be displayed when the location is accessed
  },
  {
    path: "/user-info", // path url for the user information screen
    name: "UserInfo", // Name of the route
    component: UserInfo, // Component to be displayed when the location is accessed
  },
  {
    path: "/otp-verify", // path url for the OTP verification screen
    name: "OtpVerify", // Name of the route
    component: OtpVerify, // Component to be displayed when the location is accessed
  },
];

// Create the router instance using Vue Router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), //To use HTML5 history mode with the base URL from environment variables
  routes, // TO register the routes defined above
});

// Export the router instance for use in the Vue app
export default router;
