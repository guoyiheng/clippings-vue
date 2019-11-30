<template>
  <v-app id="app">
    <router-view class="bgColor" />
    <div id="message-slot" />
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="scss" type="text/css"></style>
