import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
export const useWeatherStore = defineStore('weather', {
  state: () => ({
    currentWeather: null,
    hourlyForecast: null,
    historicalForecast: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchCurrentWeather(city = 'London') {
      this.loading = true
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
        )
        this.currentWeather = response.data
        this.error = null
      } catch (e) {
        this.error = 'Could not load weather data'
        console.error('Error:', e)
      } finally {
        this.loading = false
      }
    },
    async fetchHourlyForecast(city = 'London') {
      this.loading = true
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
        )
        this.hourlyForecast = response.data.list.slice(0, 5)
        this.error = null
      } catch (e) {
        this.error = 'Could not load forecast data'
        console.log(e)

        console.error('Error:', e)
      } finally {
        this.loading = false
      }
    },
    async fetchFiveDayForecast(city = 'London') {
      this.loading = true
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
        )
        this.fiveDayForecast = response.data.list.filter((_, index) => index % 8 === 0)
      } catch (e) {
        this.error = 'Could not load 5-day forecast data'
        console.error('Error:', e)
      } finally {
        this.loading = false
      }
    },
  },

  getters: {
    locationTime: (state) => {
      if (!state.currentWeather) return ''

      const timestamp = state.currentWeather.dt * 1000
      const timezone = state.currentWeather.timezone
      const locationDate = new Date(timestamp + timezone * 1000)

      return locationDate.toLocaleString('en-US', {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC',
      })
    },
  },
})
