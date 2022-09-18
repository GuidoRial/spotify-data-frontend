<template>
  <div class="title-container">
    <div class="spinner">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" />
      </svg>
    </div>
    <h1 class="title">loading...</h1>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital@1&display=swap");

body {
  background: rgb(15, 6, 24);
  background: linear-gradient(322deg, rgba(15, 6, 24, 1) 20%, rgba(46, 19, 78, 1) 100%);
}

.title {
  display: flex;
  justify-content: center;
  color: var(--spotify-green);
  font-family: Poppins;
  user-select: none;
  text-shadow: 3px 3px var(--black);
}

.title-container {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.spinner {
  display: flex;
  justify-content: center;
}

svg {
  width: 50%;
  max-width: 10rem;
  animation: rotate 3.6s linear infinite;
}

circle {
  fill: none;
  stroke: var(--spotify-green);
  stroke-width: 8px;
  stroke-dasharray: 300;
  animation: outline 2s cubic-bezier(0.77, 0, 0.18, 1) infinite;
}

@keyframes outline {
  0% {
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dashoffset: 300;
  }
  100% {
    stroke-dashoffset: 600;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0turn);
  }
  to {
    transform: rotate(-1turn);
  }
}
</style>
