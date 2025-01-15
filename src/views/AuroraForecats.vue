<script setup>
import ForcastToday from '@/components/ForcastToday.vue';
import HistoricalForcast from '@/components/HistoricalForcast.vue';
import HourlyForcast from '@/components/HourlyForcast.vue';
import TheHeader from '@/components/TheHeader.vue';
</script>
<template>

    <div class="h-screen">
        <div class="h-2/12">
            <TheHeader />
        </div>
        <div class="h-6/12 p-2">
            <div class="w-full flex space-x-4">
                <ForcastToday />
                <HourlyForcast />
            </div>
        </div>
        <div class="h-4/12">
            <HistoricalForcast />
        </div>
    </div>
</template>