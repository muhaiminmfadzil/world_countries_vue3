<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import CountrySearch from '@/components/CountrySearch.vue'
import CountryTable from '@/components/CountryTable.vue'
import { getAllCountries } from '@/api/countriesApi'

// Data
const isLoading = ref(true)
const isError = ref(false)
let countries = reactive([])

const fetchAllCountries = async () => {
  isLoading.value = true
  const resp = await getAllCountries()
  if (resp.success) {
    countries = resp.data
  } else {
    isError.value = true
  }
  isLoading.value = false
}

onMounted(() => {
  fetchAllCountries()
})
</script>

<template>
  <!-- Search -->
  <CountrySearch data-test="search" />
  <!-- Table -->
  <CountryTable data-test="table" />
  <div>{{ countries }}</div>
</template>

<style scoped></style>
