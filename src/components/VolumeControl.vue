<template>
  <div class="volume-container" @mouseup="hover = false" @mousemove="slide">
    <div class="volume-range" ref="volumeRangeRef">
      <div class="volume" ref="volume">
        <div class="volume-button" @mousedown="hover = true"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'volume-control',
  props: ['volume'],
  data() {
    return {
      hover: false,
      volumeRangeWidth: '',
    }
  },
  mounted() {
    this.volumeRangeWidth = this.$refs.volumeRangeRef.getBoundingClientRect().width;
    // min = 0, max = volumeRangeWidth
    // Volume is a number between 0 and 1

    const volumeWidth = this.volumeRangeWidth * this.volume;
    this.$refs.volume.style.width = volumeWidth + 'px';
  },
  methods: {
    slide(event) {
      if (this.hover) {
        let x = event.offsetX;
        if (event.target.className == "volume-container") {
          x = Math.floor(x);

          if (x < 0) {
            x = 0; // check if it's too low
          }
          if (x > this.volumeRangeWidth) {
            x = this.volumeRangeWidth; // check if it's too high
          }
          this.$refs.volume.style.width = (x + 10) + 'px';

          const volumeInPercentage = x / this.volumeRangeWidth * 100;

          this.$emit('volumeChanged', volumeInPercentage)
        }

      }
    }
  }
}
</script>

<style scoped> body {
   background-color: #2a2a2a;
 }

 .volume-container {
   padding: 40px 0px;
   margin: 0px 20px;
 }

 .volume-range {
   height: 5px;
   width: 200px;
   background: #555;
   border-radius: 15px;

 }

 .volume-range>.volume {
   height: 5px;
   width: 50px;
   background: var(--spotify-green);
   border: none;
   border-radius: 10px;
   outline: none;
   position: relative;
 }

 .volume-range>.volume>.volume-button {
   width: 20px;
   height: 20px;
   border-radius: 20px;
   background: var(--white);
   position: absolute;
   right: 0;
   top: 50%;
   transform: translateY(-50%);
   outline: none;
 }
</style>