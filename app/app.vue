<template>
  <div class="min-h-screen w-full bg-background text-foreground">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useStyleTag(`
/* FIXME for some reason shadcn-vue isn't loading the css file properly, maybe a v4 compatability issue? */

@import url('assets/css/tailwind.css');
`)
</script>
