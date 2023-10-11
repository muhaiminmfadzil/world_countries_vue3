<script setup lang="ts">
import { useCountryStore } from '@/stores/country'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
// Store
const countryStore = useCountryStore()
const { filterSelectedCountries } = storeToRefs(countryStore)

// Number to millions formatter
const toMillionsString = (value: number) => {
  return value + 'M'
}

const chartOptions = computed(() => {
  return {
    dataLabels: {
      style: {
        colors: ['#333']
      },
      formatter: (value: number) => toMillionsString(value)
    },
    chart: {
      type: 'bar'
    },
    xaxis: {
      categories: filterSelectedCountries.value.map((country) => country.name),
      labels: {
        show: true
      },
      title: {
        text: 'Populations (in millions)'
      }
    },
    yaxis: {
      labels: {
        rotate: -45
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true
      }
    },
    tooltip: {
      y: {
        formatter: (value: number) => toMillionsString(value)
      }
    }
  }
})

const dataSeries = computed(() => {
  return [
    {
      name: 'Populations',
      data: filterSelectedCountries.value.map((country) =>
        (country.population / 1000000).toFixed(2)
      )
    }
  ]
})
</script>

<template>
  <apexchart
    class="sticky h-screen ml-8 top-2"
    :options="chartOptions"
    :series="dataSeries"
  ></apexchart>
</template>

<style scoped></style>
