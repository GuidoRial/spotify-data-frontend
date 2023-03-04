<template>
  <div class="individual-step">
    <div
      :class="this.currentStep === this.stepNumber ? 'step-number-container-selected' : 'step-number-container-not-selected'">
      <p :class="this.currentStep === this.stepNumber ? 'step-number-selected' : 'step-number-not-selected'">{{
        this.stepNumber }}</p>
    </div>
    <div class="step-name">{{ this.stepName }}</div>
  </div>
</template>
<script>
export default {
  name: "individual-step",
  props: {
    currentStep: Number,
    stepNumber: Number,
    stepName: String,
  },
};
</script>

<style scoped>
.step-name {
  font-weight: 700;
  color: var(--white);
}

.step-number-not-selected {
  color: var(--white);
  font-weight: 700;
}

.step-number-selected {
  color: var(--black);
  font-weight: 700;
}

.step-number-container-selected {
  border: 1px solid var(--black);
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--white);
}

.step-number-container-not-selected {
  border: 1px solid var(--white);
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.individual-step {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0 1rem;
}</style>
