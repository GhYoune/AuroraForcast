<script setup>
import { useWeatherStore } from '@/stores/store';
import { onMounted } from 'vue';

const store = useWeatherStore()

const refreshWeather = async () => {
    await Promise.all([
        store.fetchHourlyForecast(),
    ])
}
const formatHour = (timestamp, timezone) => {
    const date = new Date((timestamp + timezone) * 1000)
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
    })
}
onMounted(async () => {
    try {
        await store.fetchHourlyForecast()
    } catch (error) {
        console.error('Failed to fetch forecast:', error)
    }
})
</script>

<template>

    <div class="h-full bg-blue-400 w-2/5 p-4 rounded-lg shadow-xl">
        <h3 class="text-white font-semibold text-lg p-2 h-1/6">Hourly Forcats</h3>
        <div v-if="store.loading">Loading ...</div>
        <div v-else-if="store.error">{{ store.error }}</div>
        <div v-else-if="store.hourlyForecast" class="h-5/6 w-full">
            <div v-for="forecast in store.hourlyForecast" :key="forecast.dt"
                class="text-white text-center flex justify-betweent items-center">
                <div class="text-sm mb-2">
                    {{ formatHour(forecast.dt, store.currentWeather.timezone) }}
                </div>
                <img :src="`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`"
                    :alt="forecast.weather[0].description" class="mx-auto w-10 h-10" />
                <div class="font-bold">
                    {{ Math.round(forecast.main.temp) }}°C
                </div>
            </div>
        </div>

    </div>
</template>