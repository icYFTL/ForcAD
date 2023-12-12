<template>
  <div id="app" :class="{'app-light': !theme, 'app-dark': theme}">
    <header>
      <topbar/>
    </header>
    <container>
      <slot/>
    </container>
    <footer class="footer">
      <div class="first-blood-layout" :class="{ 'red-screen': firstBloodScreen }"></div>
      <button v-if="isDev" @click="toggleRed">Toggle Red</button>
      <button v-if="isDev" @click="setFirstBlood">First blood</button>
      <div class="footer-author">
        Powered by
        <span class="team">C4T BuT S4D</span> CTF team
        <br>
        <span style="font-family: '8bits',sans-serif; font-size: 1.8em">
          <a target="_blank" style="text-decoration: none; color: inherit;" href="https://github.com/icYFTL">icYFTL</a>
          with <img src="@/assets/img/heart.png" alt="heart" width="20px" height="20px"></span>
      </div>
    </footer>
  </div>
</template>

<script>
import Container from '@/components/Lib/Container.vue';
import Topbar from '@/components/General/Topbar.vue';
import io from 'socket.io-client';
import {serverUrl} from '@/config';
import {mapState} from 'vuex';

export default {
  components: {
    Container,
    Topbar,
  },

  data: function () {
    return {
      server: null,
    };
  },
  methods: {
    toggleRed() {
      this.$store.commit('toggleFirstBloodScreen');
      setTimeout(() => {
        this.$store.commit('toggleFirstBloodScreen');
      }, 5000);
    },
    setFirstBlood() {
      this.$store.commit('setFirstBloodRowIndex', 1);
    }
  },

  computed: {
    ...mapState(['theme', 'firstBloodScreen']),
    isDev() {
      return import.meta.env.DEV;
    }
  },

  created: async function () {
    let connectionErrors = 0;
    this.server = io(`${serverUrl}/game_events`, {
      forceNew: true,
      transports: ['websocket', 'polling'],
    });
    this.server.on('connect_error', (err) => {
      this.server.io.opts.transports = ['polling', 'websockets'];
      if (connectionErrors > 0) {
        console.error('Connection error:', err.message);
        this.error = "Can't connect to server";
      }
      connectionErrors += 1;
    });
    this.server.on('init_scoreboard', ({data}) => {
      this.error = null;
      this.$store.dispatch('handleInitScoreboardMessage', data);
    });
    this.server.on('update_scoreboard', ({data}) => {
      this.error = null;
      this.$store.dispatch('handleUpdateScoreboardMessage', data);
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/style-light";
@import "@/assets/css/style-dark";
@font-face {
  font-family: '8bits';
  src: url('@/assets/fonts/EightBits.ttf')  format('truetype');
}

#app {
  height: 100%;
  display: flex;

  flex-flow: column nowrap;

  & > :nth-child(2) {
    flex-grow: 1;
  }
}

.footer .footer-author {
  text-align: center;
  margin-top: 3em;
  margin-bottom: 15px;
}

.first-blood-layout {
  top: 0;
  left: 0;
  position: absolute;
  width: 100vw;
  height: 100vh;
  opacity: 0.5;
  z-index: 10000;
  background-color: transparent;
  transition: background-color 1s ease-in-out;
  pointer-events: none;
}

.red-screen {
  background-color: red;
  transition: background-color 5s ease-in-out;
}
</style>
