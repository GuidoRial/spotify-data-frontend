<template>
  <div class="how-to-use">
    <p class="explanation">{{ text }}</p>
  </div>
</template>
<script>
export default {
  props: {
    text: String,
  },
};
</script>
<style scoped>
.how-to-use {
  padding: 1rem;
}
.explanation {
  font-size: 1.5rem;
  color: var(--white);
}
</style>
