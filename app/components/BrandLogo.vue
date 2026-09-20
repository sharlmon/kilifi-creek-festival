<script setup lang="ts">
import { imageAttributes } from '~/utils/images'
const props = withDefaults(defineProps<{ light?: boolean, compact?: boolean }>(), { light: false, compact: false })
const source = computed(() => props.compact ? '/assets/brand/header-icon.png' : props.light ? '/assets/brand/logo-light.png' : '/assets/brand/logo-dark.png')
</script>
<template><span class="brand-logo" :class="{ 'brand-logo-compact': compact }"><img :src="source" alt="Kilifi Creek Festival logo" v-bind="imageAttributes(source, '160px')" loading="eager" /></span></template>
