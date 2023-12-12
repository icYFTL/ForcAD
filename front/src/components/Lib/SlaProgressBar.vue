<template>
  <div class="sla-progress">
    <div class="progress-line" :style="{ width: percentToPixels, backgroundColor: progressColor }"></div>
    <div>{{ Percent.toFixed(2) }}%</div>
  </div>
</template>

<script>
export default {
  name: 'SlaProgressBar',
  props: {
    Percent: Number,
  },
  computed: {
    progressColor() {
      if (this.Percent > 90.0) {
        return '#008000';
      } else if (this.Percent > 70) {
        return '#5da130';
      } else if (this.Percent > 60) {
        return '#ffff00';
      } else if (this.Percent > 50) {
        return '#ffa000';
      } else {
        return '#f80000';
      }
    },
    percentToPixels() {
      const maxWidth = 100;
      return `${(maxWidth * this.Percent) / 100}px`;
    },
  },
};
</script>

<style scoped lang="scss">
.sla-progress {
  display: flex;
  flex-flow: row nowrap;
  gap: 5px;
  align-items: center;
}

.progress-line {
  height: 2px;
}
</style>
