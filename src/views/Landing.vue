<template>
  <nav class="navbar">
    <h1>Spotify Data analysis</h1>
    <div>
      <ul>
        <li>
          <router-link to="/login"> Start </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "landing",
  data() {
    return {
      code: window.location.search.substring(6),
    };
  },
  mounted() {
    // console.log(this.code);
    // if (this.code) {
    //   this.$router.push("/dashboard");
    // } else {
    //   this.$router.push("/login");
    // }
  },
};
</script>

<style>

</style>
