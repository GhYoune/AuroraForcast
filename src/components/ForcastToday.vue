<script setup>
import { useWeatherStore } from '@/stores/store';
import axios from 'axios';
import { Droplet, MapPin, RefreshCcw, Thermometer, Wind } from 'lucide-vue-next';
import { ref, computed, onMounted } from 'vue';

const store = useWeatherStore()
onMounted(async () => {
    if (!store.currentWeather) {
        await store.fetchCurrentWeather()
    }
})
const refreshWeather = async () => {
    await Promise.all([
        store.fetchCurrentWeather(),
    ])
}
console.log('API Key:', import.meta.env.VITE_OPENWEATHER_API_KEY)


</script>

<template>

    <div class="h-full bg-blue-400 w-3/5 p-4 rounded-lg space-y-3 shadow-xl">
        <div v-if="store.loading">Loading...</div>
        <div v-else-if="store.error">{{ store.error }}</div>
        <div v-else-if="store.currentWeather" class="space-y-3">
            <div class="flex justify-between h-1/5">
                <div class="space-y-2">
                    <div class="flex justify-start items-center">
                        <MapPin color="#ffffff" strokeWidth="2.5" />
                        <h2 class="text-2xl font-semibold text-white px-2">
                            {{ store.currentWeather.name }}
                        </h2>
                    </div>
                    <h3 class="text-lg px-2 font-semibold text-white">{{ store.locationTime }}</h3>
                </div>
                <RefreshCcw color="#ffffff" strokeWidth="2.5"
                    class="hover:bg-slate-400 cursor-pointer transition ease-in-out duration-300 rounded-2xl"
                    @click="refreshWeather" />
            </div>
            <div class="h-3/5">
                <div class="text-7xl text-white font-bold flex items-center justify-center h-3/5">
                    <img :src="`http://openweathermap.org/img/wn/${store.currentWeather.weather[0].icon}@2x.png`"
                        :alt="store.currentWeather.weather[0].description" style="width: 120px; height: 120px;" />
                    <div class="">
                        {{ Math.round(store.currentWeather.main.temp) }}°C
                        <h3 class="text-white text-base "> {{ store.currentWeather.weather[0].main }}
                        </h3>
                    </div>
                </div>
            </div>
            <div class="h-1/5 w-3/4 flex justify-between items-center text-white font-semibold text-xs mx-auto">
                <div class="flex flex-col justify-center items-center space-y-1 p-3 ">
                    <Thermometer />
                    <div>Feels Like</div>
                    <div> {{ Math.round(store.currentWeather.main.feels_like) }}°C</div>
                </div>
                <div class="flex flex-col justify-center items-center space-y-1 p-3">
                    <Droplet />
                    <div>Humidity</div>
                    <div>{{ store.currentWeather.main.humidity }}%</div>
                </div>
                <div class="flex flex-col justify-center items-center space-y-1 p-3">
                    <Wind />
                    <div>Wind </div>
                    <div>{{ store.currentWeather.wind.speed }}m/s</div>
                </div>
            </div>
        </div>
    </div>
</template>