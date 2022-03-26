<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/mtg-logo.png" />
    <HelloWorld msg="Welcome to MTG Card Search" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
