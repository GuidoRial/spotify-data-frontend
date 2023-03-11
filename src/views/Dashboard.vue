<template>
  <Navbar />
  <div class="individual-functionality-container">
    <FunctionalitySection v-for="(functionality, i) in features" :key="i" :groupTitle="functionality.groupTitle"
      :groupSections="functionality.groupSections" />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import appFeatures from "./appFeatures";
import FunctionalitySection from "@/components/FunctionalitySection.vue";

export default {
  name: "dashboard",
  data() {
    return {
      features: appFeatures,
    };
  },
  components: {
    Navbar,
    FunctionalitySection,
  }
};
</script>
<style>
.individual-functionality-container {
  background-color: var(--black);
  padding: 1rem 5rem;
  height: 85.9vh;
}
</style>
