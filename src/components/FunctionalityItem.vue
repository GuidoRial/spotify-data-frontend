<template>
  <div class="individual-functionality-item">
    <div class="functionality-title-and-description">
      <p class="font-weight-bold functionality-title">{{ this.title }}</p>
      <p class="functionality-description">⎼ {{ this.description }}</p>
    </div>
    <GoButton :route="this.route" />
  </div>
</template>
<script>
import GoButton from "./GoButton.vue";
export default {
  name: "functionality-item",
  props: {
    title: String,
    description: String,
    route: Object,
  },
  components: { GoButton },
};
</script>
<style scoped>
.individual-functionality-item {
  border-bottom: 1px solid var(--spotify-green);
  margin: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem;
}
.functionality-title-and-description {
  display: flex;
  gap: 0.3rem;
  align-items: center;
  justify-content: center;
}
.functionality-title {
  font-size: 1.1rem;
  color: var(--white);
}
.functionality-description {
  font-size: 1.1rem;
  color: var(--dark-gray);
}
</style>
