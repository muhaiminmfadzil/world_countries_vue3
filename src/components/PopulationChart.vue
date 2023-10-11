<script setup lang="ts">
import { useCountryStore } from '@/stores/country'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
// Store
const countryStore = useCountryStore()
const { filterSelectedCountries } = storeToRefs(countryStore)
// Total no of country limit for graph visualization
const limit = 20
// Number to millions formatter
const toMillionsString = (value: number) => {
  return value + 'M'
}
const isOverLimit = computed(() => {
  return filterSelectedCountries.value.length > limit
})
// Options
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
      categories: isOverLimit.value
        ? []
        : filterSelectedCountries.value.map((country) => country.name),
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
// Data series
const dataSeries = computed(() => {
  return [
    {
      name: 'Populations',
      data: isOverLimit.value
        ? []
        : filterSelectedCountries.value.map((country) => (country.population / 1000000).toFixed(2))
    }
  ]
})
// 75% screen height
const height = computed(() => {
  return (70 / 100) * screen.height
})
</script>

<template>
  <div class="sticky h-screen ml-8 top-5">
    <div class="mt-5 text-sm text-center">Select up to 20 countries</div>
    <div v-if="isOverLimit" class="text-xs text-center text-red-600">
      Selection is over the given limit
    </div>
    <apexchart :options="chartOptions" :series="dataSeries" :height="height"></apexchart>
  </div>
</template>

<style scoped></style>
