<template>
  <div :id="domId" class="particles-js"></div>
</template>

<script>
import "@/assets/js/particles";

export default {
  props: {
    config: Object,
    domId: String,
  },
  mounted() {
    if (typeof this.domId !== "string") throw new Error("Invalid DOM id provided");

    particlesJS(this.domId, this.config, () => {
      console.log("particles.js config loaded");
    });
  },
};
</script>

<style scoped>
.particles-js {
  margin: 0;
  padding: 0;
  position: static;
  left: 0;
  top: 0;
}
</style>
