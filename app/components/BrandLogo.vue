<script setup lang="ts">
import { imageAttributes } from '~/utils/images'
const source = '/assets/brand/logo-light.png'
</script>
<template><span class="brand-logo"><img :src="source" alt="Kilifi Creek Festival logo" v-bind="imageAttributes(source, '160px')" loading="eager" /></span></template>
