<template>
  <div class="test-chart" ref="el">
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script lang="ts" setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
const props = defineProps(['range', 'data', 'rows', 'labels', 'gap', 'button', 'buttontext'])

ChartJS.register(Title, Legend, BarElement, CategoryScale, LinearScale)
const el = ref<HTMLElement | null>(null)
const css = ref({})

function getCss(param: string, relative?: number) {
  if (relative) {
    const element = document.createElement('div');
    document.body.appendChild(element)
    element.style.fontSize = `calc(${(param in css.value ? css.value[param] : '')} * ${relative})`
    const value = getComputedStyle(element).fontSize
    document.body.removeChild(element)
    return value
  } else {
    return param in css.value ? css.value[param] : ''
  }
}

const chartData = computed(() => {
  return {
    labels: ['January', 'February', 'March'],
    datasets: [{
      data: [40, 22, 12],
      label: 'label',
      backgroundColor: getCss('--fg2'),
      hoverBackgroundColor: getCss('--fg')
    }],
  }
})

const chartOptions = computed(() => {
  return {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: false
    },
    elements: {
      bar: {
        borderColor: getCss('--fg')
      }
    },
    scales: {
      y: {
        ticks: {
          color: getCss('--fg2'),
          font: {
            size: getCss('fontSize', 0.75),
            family: getCss('fontFamily')
          },
          stepSize: 10,
          beginAtZero: true
        }
      },
      x: {
        ticks: {
          color: getCss('--fg2'),
          font: {
            size: getCss('fontSize', 0.75),
            family: getCss('fontFamily')
          },
          stepSize: 10,
          beginAtZero: true
        }
      },
    }
  }
})

onMounted(() => {
  const varvalues = ['--fg', '--fg2', '--bg', '--bg2', '--bg3', '--bc', '--link']
  const propvalues = ['fontSize', 'fontFamily']
  const style = getComputedStyle(el.value)
  varvalues.map((x) => {
    css.value[x] = style.getPropertyValue(x)
  })
  propvalues.map((x) => {
    css.value[x] = style[x]
  })

})
</script>

<style lang="less" scoped>
.test-chart {
  text-align: center;
  width: var(--pwidth);
  margin: 0 auto;
  padding: 1rem;
  border-radius: 0.25rem;
  background: var(--bg2);
}
</style>