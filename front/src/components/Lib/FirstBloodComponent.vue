<template>
  <div>
    <VueParticleJs :config="particlesConfig" :domId=domId :style="displayStyle" style="visibility: " />
  </div>
</template>

<script>
import VueParticleJs from "@/components/Lib/VueParticleJs.vue"; // Путь к вашему компоненту VueParticleJs
import {mapState} from 'vuex';

export default {
  components: {
    VueParticleJs,
  },
  computed: {
    ...mapState(["firstBloodRowIndex"]),
  displayStyle() {
      return this.index === this.firstBloodRowIndex ? 'visibility: visible;' : 'visibility: collapse;';
  }},
  props:{
    domId: String,
    index: Number
  },
  data() {
    return {
      particlesConfig: {
        "particles": {
          "number": {
            "value": 800,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#ff0000"
          },
          "shape": {
            "type": "edge",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "@/assets/img/blood.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.7,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 5,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": false,
            "distance": 500,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 2
          },
          "move": {
            "enable": true,
            "speed": 6,
            "direction": "right",
            "random": false,
            "straight": true,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": false,
              "mode": "bubble"
            },
            "onclick": {
              "enable": false,
              "mode": "repulse"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 0.5
              }
            },
            "bubble": {
              "distance": 400,
              "size": 4,
              "duration": 0.3,
              "opacity": 1,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      }
    }
  },
};
</script>
<style scoped>

</style>
