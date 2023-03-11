<template>
  <button :class="type === 'primary' ? ['primary-button', 'btn'] : ['secondary-button', 'btn']">{{text}}</button>
</template>

<script>
export default {
  name: 'action-btn',
  props: ['text', 'type']
}
</script>

<style scoped>
.btn {
  width: 7rem;
  height: 2.3rem;
  cursor: pointer;
  font-weight: 700;
  border-radius: var(--border-small)
}

.primary-button {
  background-color: var(--spotify-green);
  color: var(--white);
}

.secondary-button {
  background-color: var(--white);
  color: var(--spotify-green);
  border-radius: var(--border-small)
}
</style>
