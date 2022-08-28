<template>
  <h2>Dashboard</h2>
  <button @click="logout">Log out</button>
</template>
<script>
export default {
  name: "dashboard",
  data() {
    return {
      code: localStorage.getItem("code"),
    };
  },
  mounted() {
    // console.log(this.code);
    if (!localStorage.getItem("code")) {
      this.$router.push("/login");
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("code");
      this.$router.push("login");
    },
  },
};
</script>
