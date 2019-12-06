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

<style lang="scss" type="text/css">
.v-navigation-drawer__border {
  background-color: #ffffff !important;
}
</style>
