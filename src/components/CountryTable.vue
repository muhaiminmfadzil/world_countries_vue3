<script setup lang="ts">
import CountryTableHead from '@/components/CountryTableHead.vue'
import CountryTableBody from '@/components/CountryTableBody.vue'
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="flow-root">
      <div class="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <table class="min-w-full border-separate border-spacing-0">
            <!-- Table Head -->
            <CountryTableHead />
            <!-- Table Body -->
            <CountryTableBody />
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
