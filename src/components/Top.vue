<!--
  功能：to top
  作者：gyh
  时间：2019年11月11日 16:00:13
  版本：v1.0
-->
<template>
  <v-btn
    class="mx-2"
    style="bottom:100px; right:5px"
    fixed
    fab
    color="primary"
    @click="handleToTop"
  >
    <v-icon dark>expand_less</v-icon>
  </v-btn>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleToTop() {
      this.$vuetify.goTo(0, {
        easings: 'easeInOutCubic',
        duration: 500,
        offset: 10
      })
    }
  }
}
</script>

<style scoped lang="scss" type="text/css">
</style>
