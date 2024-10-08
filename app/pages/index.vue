<template>
  <div>
    <!-- TODO: Better colors -->
    <UiSonner theme="dark" position="bottom-center" rich-colors />


    <template v-if="status == 'pending'">
      <h1>Loading...</h1>
    </template>

    <template v-else-if="status == 'error'">
      <h1>Error</h1>
    </template>

    <template v-else-if="status == 'success'">
      <div v-for="file in data">
        {{ file.createdAt }}
        <img :src="`/${mediaDir}/${file.fileName}`" />
      </div>
    </template>
  </div>
</template>



<script setup lang="ts">
const { status, data } = await useLazyFetch('/api/files')

const appConfig = useAppConfig();
const mediaDir = appConfig.mediaDir.split('public/')[1]

</script>
