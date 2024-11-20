<template>
  <div class="test-pie-chart" ref="el">
    <Pie class="piechart" :options="chartOptions" :data="chartData" />
    <ChartLabels :labels="props.labels" />
  </div>
</template>

<script lang="ts" setup>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'
import type { PieControllerChartOptions, ChartData } from 'chart.js'
const props = defineProps(['range', 'data', 'rows', 'labels', 'gap', 'button', 'buttontext'])

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)
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

const chartData = computed<ChartData>(() => {
  return {
    datasets: [{
      label: 'Dataset 1',
      data: props.data,
      backgroundColor: [getCss('--fg'), getCss('--fg2'), getCss('--bg3')],
      hoverBackgroundColor: [getCss('--fg'), getCss('--fg2'), getCss('--bg3')],
      borderWidth: 2,
      borderColor: getCss('--bg2')
    }],
  }
})

const chartOptions = computed<PieControllerChartOptions>(() => {
  return {
    responsive: true,
    cutout: 0,
    elements: {
      bar: {
        borderColor: getCss('--fg')
      }
    },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
        position: 'right',
        labels: {
          color: getCss('--fg'),
          borderWidth: 0,
          font: {
            size: getCss('fontSize', 0.8)
          }
        }
      },
    },
    scales: {
    }
  }
})

onMounted(() => {
  const varvalues = ['--f', '--fg', '--fg2', '--bg', '--bg2', '--bg3', '--bc', '--link']
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
.test-pie-chart {
  text-align: center;
  width: var(--pwidth);
  margin: 0 auto;
  padding: 0;
  border-radius: 0.25rem;
  background: var(--bg2);

  .piechart {
    margin: 2rem auto;
    width: 20rem;
  }
}
</style>