<script setup>
import { useWeatherStore } from '@/stores/store'
import { onMounted } from 'vue'

const store = useWeatherStore()
const fetchHistorical = async () => {
    if (store.currentWeather) {
        const { coord } = store.currentWeather
        await store.fetchHistoricalForecast(coord.lat, coord.lon)
    } else {
        alert('Please fetch the current weather first!')
    }
}

onMounted(async () => {
    await store.fetchCurrentWeather()
    await store.fetchHourlyForecast()
})
</script>

<template>

    <div class=" bg-blue-400 w-full px-3 rounded-lg space-y-3 shadow-xl mx-auto">
        <h3 class="text-white font-semibold text-lg p-2 h-1/3">5-Days Forcast</h3>
        <div v-if="store.loading">Loading ...</div>
        <div v-else-if="store.error">{{ store.error }}</div>
        <div v-else-if="store.historicalForecast.length" class="mt-4">
            <div v-for="(day, index) in store.historicalForecast" :key="index" class="grid grid-cols-5 gap-4">
                <p class="text-white">{{ new Date(day.current.dt * 1000).toLocaleDateString() }}</p>
                <p class="text-white">Temp: {{ Math.round(day.current.temp) }}°C</p>
                <p class="text-white">Weather: {{ day.current.weather[0].description }}</p>
            </div>
        </div>
    </div>
</template>