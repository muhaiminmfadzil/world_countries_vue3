<script setup lang="ts">
import { useCountryStore } from '@/stores/country'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
// Store
const countryStore = useCountryStore()
const { filterSelectedCountries } = storeToRefs(countryStore)

const chartOptions = computed(() => {
  return {
    dataLabels: {
      background: {
        enabled: true,
        foreColor: '#000',
        borderColor: null,
        borderRadius: 2,
        padding: 5,
        opacity: 0.5
      }
    },
    chart: {
      type: 'bar'
    },
    xaxis: {
      categories: filterSelectedCountries.value.map((country) => country.name),
      range: 1000000,
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
      },
      title: {
        text: 'Country'
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
        formatter: function (value: number) {
          return value + 'M'
        }
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
