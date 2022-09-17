<template>
  <button class="go-to-functionality-button" @click="redirectToChildren(this.route)">Go</button>
</template>
<script>
export default {
  name: "go-button",
  props: {
    route: Object,
  },
  methods: {
    redirectToChildren(route) {
      this.$router.push(route);
    },
  },
};
</script>
<style scoped>
.go-to-functionality-button {
  background-color: var(--black);
  border: 1px solid var(--spotify-green);
  width: 5rem;
  height: 1.5rem;
  color: var(--spotify-green);
  font-weight: 700;
  cursor: pointer;
  border-radius: 7px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}

.go-to-functionality-button:hover {
  background-color: var(--spotify-green);
  color: var(--black);
  opacity: 0.95;
}
</style>
