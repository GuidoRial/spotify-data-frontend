<template>
  <div class="functionality-section">
    <h2 class="section-title">{{ groupTitle }}</h2>
    <FunctionalityItem
      v-for="(functionality, i) in groupSections"
      :key="i"
      :title="functionality.title"
      :description="functionality.description"
      :route="functionality.route" />
  </div>
</template>

<script>
import FunctionalityItem from "./FunctionalityItem.vue";
export default {
  name: "functionality-section",
  props: {
    groupTitle: String,
    groupSections: Array,
  },
  components: { FunctionalityItem },
};
</script>
<style scoped>
.section-title {
  margin-top: 1rem;
  color: var(--spotify-green) !important;
}
</style>
