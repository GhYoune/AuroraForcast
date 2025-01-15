<script setup>
import { Sparkles } from 'lucide-vue-next';


</script>
<template>
    <div class="bg-blue-400 flex items-center justify-between space-x-3 py-4 px-2">
        <div class="flex items-center space-x-3">
            <Sparkles size="28" color="" />
            <h1 class="text-xl font-semibold text-white">Aurora Forecast</h1>
        </div>
        <div class="text-white">
            <w-input class="mb1" label="Search" bg-color="light-blue-dark1" round>
            </w-input>
        </div>

    </div>
</template>