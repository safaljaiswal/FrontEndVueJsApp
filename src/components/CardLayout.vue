<template>
  <!-- Card component to display image, title, and description -->
  <v-card class="card-option" outlined @click="handleClick">
    <div :class="['card-content', alignmentClass]">
      <!-- Display image from imageSrc prop -->
      <img :src="imageSrc" alt="Option Image" class="option-image" />
      <!-- Display title passed as prop -->
      <h3>{{ title }}</h3>
      <!-- render description if it exists -->
      <p v-if="description">{{ description }}</p>
    </div>
  </v-card>
</template>

<script>
export default {
  // props: image source, title, description, and alignment
  props: {
    imageSrc: {
      type: String,
      required: true, // imageSrc for the card to display an image
    },
    title: {
      type: String,
      required: true, // title for the card to display the title
    },
    description: {
      type: String,
      default: "", // default empty string if description is not present
    },
    alignment: {
      type: String,
      default: "left", // default alignment to left
    },
  },
  computed: {
    // Compute the alignment class based on the alignment prop
    alignmentClass() {
      return this.alignment === "center" ? "align-center" : "align-left";
    },
  },
  methods: {
    // generate a click event when a click is done
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
/* Styling for the card */
.card-option {
  width: 35%; /* Width of the card */
  padding: 0.8rem; /* Padding inside the card */
  cursor: pointer; /* Cursor changed to pointer on hover */
}

/* Styling for content inside the card */
.card-content {
  display: flex;
  flex-direction: column; /* places items vertically */
}

/* Center alignment style*/
.align-center {
  align-items: center; /* Centers the content horizontally */
  text-align: center; /* Centers the text */
}

/* Left alignment style */
.align-left {
  align-items: flex-start; /* Align content to the left */
  text-align: left; /* Left align the text */
}

/* Styling for the image */
.option-image {
  width: 3rem; /* Image width */
  height: 2.7rem; /* Image height */
  border-radius: 50%; /* Make the image circular */
  object-fit: cover; /* Make sure the image covers the area without being pixilated */
  margin-bottom: 10px; /* Space below the images */
}

/* Styling for the title */
h3 {
  font-size: 0.84rem; /* Font size of the title */
  font-weight: 600; /* Bold font weight */
  margin: 0; /* Remove margin from around the title */
}

/* Styling for description text */
p {
  font-size: 0.65rem; /* Font size of the description */
  font-weight: 500; /* Medium font weight */
  margin: 5px 0 0 0; /* Space at the top of the description */
}

/* Responsive styles for small screens like mobile and tablets */
@media (max-width: 576px) {
  .option-image {
    width: 2rem; /* Smaller image on small screens */
    height: 1.7rem; /* Smaller image height on small screens */
  }
  h3 {
    font-size: 0.7rem; /* Smaller font size for the title on small screens */
  }
  p {
    font-size: 0.5rem; /* Smaller font size for the description on small screens */
  }
}
</style>
