<template>
  <div class="topbar" :class="{'topbar-light': !theme, 'topbar-dark': theme}">
    <div class="theme-togler">
      <img src="@/assets/img/dark-toggle.svg" alt="Touch me" @click="onThemeToggle">
    </div>
    <router-link class="tp live-button" to="/live/"> Live</router-link>
    <div :class="progressBarClass" :style="{ width: `${roundProgress}%` }"/>
    <div class="tp">Round: {{round}}  <!--TODO: Animation -->
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  beforeRouteLeave: function (to, from, next) {
    clearInterval(this.timer);
    next();
  },
  data: function () {
    return {
      timer: null
    };
  },

  computed: {
    ...mapState(['round', 'roundProgress', 'theme']),
    progressBarClass() {
      // if (this.roundProgress === 100){
      //   this.roundProgress = 0;
      //   return 'progress-bar-no-transition';
      // }
      return 'progress-bar';
    }
  },

  created: async function () {
    await this.$store.dispatch('fetchRoundTime');
    this.timer = setInterval(
        () => this.$store.dispatch('calculateRoundProgress'),
        500
    );


  },
  methods: {
    async onThemeToggle() {
      await this.$store.commit('toggleDarkTheme');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/style-light";
@import "@/assets/css/style-dark";

.tp {
  z-index: 1;
}


.live-button {
  background-color: #4CAF50; /* Зеленый цвет */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  position: relative;
  overflow: hidden;
  text-decoration: none;
}

.live-button::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  opacity: 0;
  transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
}

.live-button:hover::before {
  width: 120px;
  height: 120px;
  opacity: 1;
}

.topbar {
  z-index: 1;
  position: relative;
  padding: 1em;
  display: flex;
  flex-flow: row nowrap;

  justify-content: space-between;
  align-items: center;
}

.progress-bar {
  background-color: #00ff00;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.5;
  animation: progressBarAnimation 1s linear; /* Добавьте анимацию */
}

@keyframes progressBarAnimation {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

.theme-togler {
  z-index: 10000;
}

.theme-togler img {

  width: 30px;
  height: 30px;
  cursor: pointer;
}
</style>
