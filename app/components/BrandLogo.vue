<script setup lang="ts">
import { imageAttributes } from '~/utils/images'
withDefaults(defineProps<{ light?: boolean }>(), { light: false })
</script>
<template><span class="brand-logo"><img :src="light ? '/assets/brand/logo-light.png' : '/assets/brand/logo-dark.png'" alt="Kilifi Creek Festival Logo" v-bind="imageAttributes(light ? '/assets/brand/logo-light.png' : '/assets/brand/logo-dark.png', '160px')" loading="eager" /></span></template>
