<script setup lang="ts">
import { useCountryStore } from '@/stores/country'
import { storeToRefs } from 'pinia'
// Store
const countryStore = useCountryStore()
const { filterSelectedCountries } = storeToRefs(countryStore)

const chartOptions = {
  dataLabels: {
    enabled: false,
    style: {
      fontSize: '14px',
      fontWeight: 'bold',
      colors: ['#2563eb']
    },
    background: {
      enabled: true,
      foreColor: '#FFF',
      borderColor: null,
      borderRadius: 2,
      padding: 5
    }
  },
  chart: {
    type: 'bar',
    toolbar: {
      show: false
    }
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

const dataSeries = [
  {
    name: 'Populations',
    data: [1000, 500, 300]
  }
]
</script>

<template>
  <apexchart
    class="sticky top-0 h-screen ml-8"
    :options="chartOptions"
    :series="dataSeries"
  ></apexchart>
</template>

<style scoped></style>
