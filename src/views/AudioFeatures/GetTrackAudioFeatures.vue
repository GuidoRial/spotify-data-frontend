<template>
  <Navbar />
</template>
<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "get-track-audio-features",
  components: {
    Navbar,
  },
  mounted() {
    console.log("track");
  },
};
</script>

