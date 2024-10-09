<template>
  <div class="plot" ref="el">
    <div class="flex-frame">
      <div class="sticky-frame">
        <!-- plot labels -->
        <div class="labels">
          <label v-for="(label, k) in props.labels" :class="{ active: active === k, hidden: active < k }">{{ label
            }}</label>
        </div>

        <!-- plot frame -->
        <div class="plotframe">

          <!-- X + Y labels -->
          <label class="y" v-if="ylabel">{{ ylabel }} -></label>
          <label class="x" v-if="xlabel">{{ xlabel }} -></label>

          <!-- step labels -->
          <label class="xmax" v-if="props.xminmax">{{ props.xminmax[1] }}</label>
          <label class="ymax" v-if="props.yminmax">{{ props.yminmax[1] }}</label>
          <div class="xsteps">
            <div class="xstep" v-for="x in props.xsteps">
              <label>{{ getPosition(x, props.xsteps, props.xminmax) }}</label>
            </div>
          </div>
          <div class="ysteps">
            <div class="ystep" v-for="y in props.ysteps">
              <label>{{ getPosition(y, props.ysteps, props.yminmax) }}</label>
            </div>
          </div>

          <!-- data plots -->
          <div class="data-frame" v-for="(item, k) in data" :class="{ active: active === k, hidden: active < k }">
            <div class="data">
              <div class="point" v-for="point in item" :style="pointStyle(point)">
              </div>
            </div>
            <Smoothpath :points="item" :xminmax="props.xminmax" :yminmax="props.yminmax"></Smoothpath>
          </div>
        </div>
        <!-- progress -->
        <div class="progress">
          <div class="bar" :style="{ height: progress * 100 + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useElementBounding, useElementSize, useWindowSize } from '@vueuse/core'
const el = ref(null)

const { top } = useElementBounding(el)
const { height } = useElementSize(el)
const { height: winHeight } = useWindowSize()
const active = computed(() => {
  return Math.round(progress.value * (props.data.length - 1))
})

const progress = computed(() => {
  const progress = (top.value * -1) / (height.value - winHeight.value)
  return progress
})

const props = defineProps(['data', 'xminmax', 'yminmax', 'xlabel', 'ylabel', 'xsteps', 'ysteps', 'labels'])

function getPosition(k, stepcount, minmax) {
  return ((((minmax[1] - minmax[0]) / stepcount) * (k - 1)) + minmax[0]).toFixed(0)
}
function pointStyle(point) {
  return {
    left: (point[0] / (props.xminmax[1] - props.xminmax[0])) * 100 + '%',
    top: 100 - ((point[1] / (props.yminmax[1] - props.yminmax[0])) * 100) + '%',
  }
}
</script>

<style lang="less" scoped>
.plot {
  height: 300vh;
}

.flex-frame {
  height: calc(100vh - 3rem);
  position: sticky;
  top: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sticky-frame {
  position: relative;
  .row();
  width: 50rem;
  overflow: hidden;

  @media (orientation: landscape) and (min-aspect-ratio: 7/5) {
    // max-width: calc((100vh/ 5 * 8) - 10rem);
  }

  border-radius: 0.5rem 0.1rem 0.1rem 0.5rem;
  border: 1px solid var(--bc);
  background: var(--bg2);
  margin: 4rem auto;

  // display: flex;
  @media (max-width: 40rem) {
    max-width: 100%;
    border-radius: 0;
  }

}

.plotframe {
  margin: 3rem 4rem;
  position: relative;
  border: 1px solid var(--bc);
  flex: 1;
  aspect-ratio: 8/5;

  label {
    font-size: 0.75rem;
    line-height: 1;
    padding: 0;
    margin: 0;
    position: absolute;
  }

  label.x {
    bottom: -2.25rem;
  }

  label.y {
    left: -3rem;
    bottom: 0;
    transform: rotate(-90deg);
    transform-origin: 0 0;
  }

  label.xmax,
  label.ymax {
    position: absolute;
    color: var(--bg3);
    bottom: -1rem;
    right: 0;
  }

  label.xmax {
    bottom: -1rem;
    right: 0;
  }

  label.ymax {
    top: -0.5em;
    right: calc(100% + .5em);
    text-align: right;
  }

  .xsteps,
  .ysteps {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;

    >div {
      flex: 1;
      position: relative;

      label {
        position: absolute;
        color: var(--bg3);
      }
    }
  }

  .xsteps {
    >div {
      border-right: 1px solid var(--bc);

      &:last-child {
        border-right: 0;
      }

      label {
        top: calc(100% + 0.25em);
        text-align: left;
      }
    }
  }

  .ysteps {
    flex-direction: column-reverse;

    >div {
      border-top: 1px solid var(--bc);

      &:last-child {
        border-top: 0;
      }

      label {
        bottom: 0;
        right: calc(100% + .5em);
        text-align: right
      }
    }

  }
}

.labels {
  position: absolute;
  top: 0;
  width: 100%;

  label {
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0.5rem;
    color: var(--fg);
    text-align: center;
    transition: all 0.25s ease;

    &.active {
      opacity: 1;
    }
  }
}

.data-frame {
  opacity: 0.15;
  transition: all 0.5s ease;

  &.hidden {
    opacity: 0.15;
  }

  &.active {
    opacity: 1;
  }

  .data {
    .point {
      position: absolute;
      width: 0.5rem;
      height: 0.5rem;
      border: 2px solid var(--fg);
      border-radius: 100%;
      overflow: hidden;
      transform: translate(-0.25rem, -0.25rem);
      background: var(--fg2);
    }
  }
}

.progress {
  position: absolute;
  top: 0;
  right: 0;
  width: 0.125rem;
  height: 100%;
  background: var(--bg3);

  .bar {
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    background: var(--fg2);
  }
}
</style>