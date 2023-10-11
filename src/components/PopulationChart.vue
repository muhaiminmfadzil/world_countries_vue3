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
      labels: {
        show: true,
        style: {
          fontSize: '11px',
          fontWeight: 500
        },
        rotate: -45
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true
      }
    }
  }
})

const dataSeries = computed(() => {
  return [
    {
      name: 'Populations',
      data: filterSelectedCountries.value.map(
        (country) => country.population
        // Intl.NumberFormat('en').format(country.population)
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
