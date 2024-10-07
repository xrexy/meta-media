<template>
  <div class="min-h-screen w-full bg-background text-foreground">
    <!-- TODO: Better colors -->
    <UiSonner theme="dark" position="bottom-center" rich-colors />

    <p @click="toast.error('Hello, World!')">hi</p>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';

useStyleTag(`
/* FIXME for some reason shadcn-vue isn't loading the css file properly, maybe a v4 compatability issue? */

@import url('assets/css/tailwind.css');
`)
useHead({
  htmlAttrs: {
    lang: 'en-US',
    class: 'dark'
  },
})

</script>
