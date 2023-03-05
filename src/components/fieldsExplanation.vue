<template>
  <div class="text-group" v-for="field in fieldsArray">
    <p class="font-weight-bold title">{{ field.title }}</p>
    <p class="description">{{ field.description }}</p>
  </div>
</template>
<script>
export default {
  name: 'field-explanations',
  props: ['fieldsArray'],
}
</script>
<style scoped>
.text-group {
  display: flex;
  gap: 0.3rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;

}

.title {
  font-size: 1.1rem;
  color: var(--white);
  text-align: left;
  width: 100%
}

.description {
  font-size: 1.1rem;
  color: var(--dark-gray);
  text-align: left;
  width: 100%
}
</style>