<template>
  <div class="pic-chart">
    <div class="frame">
      <div class="item" v-for="item in props.data.reduce((a, b) => a + b, 0)"
        :class="{ first: item < data[0], second: item < data[1] }"></div>
    </div>
    <ChartLabels :labels="props.labels" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['range', 'data', 'rows', 'labels', 'gap', 'button', 'buttontext'])

</script>

<style lang="less" scoped>
.pic-chart {}

.frame {
  margin: 2rem;
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  gap: 0.5rem;

  .item {
    background: var(--bg3);
    border-radius: 0.25rem;
    border-radius: 100%;
    aspect-ratio: 1/1;
    opacity: 0;
    animation: popin 0.5s @easeInOutExpo 0s 1 forwards;
    transform: scale(0.4);

    &.second {
      background: var(--fg2);
    }

    &.first {
      background: var(--fg);
    }

    @keyframes popin {
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
}

each(range(100), {
  .item:nth-child(@{index}) {
    animation-delay: @index * 0.008s;
  }
})
</style>