<!--
  功能：to top
  作者：gyh
  时间：2019年11月11日 16:00:13
  版本：v1.0
-->
<template>
  <transition name="top-animate">
    <v-btn
      v-show="isActive"
      class="mx-2"
      style="bottom:100px; right:5px"
      fixed
      fab
      color="primary"
      @click="handleToTop"
    >
      <v-icon dark>expand_less</v-icon>
    </v-btn>
  </transition>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      isActive: false
    }
  },
  computed: {},
  watch: {},
  created() {
    // 是否显示Top
    var that = this
    window.onscroll = function() {
      if (document.documentElement.scrollTop > 100) {
        that.isActive = true
      } else {
        that.isActive = false
      }
    }
  },
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
.top-animate-enter-active {
  transition: all 0.5s ease;
}
.top-animate-leave-active {
  transition: all 1s linear;
}
.top-animate-enter,
.top-animate-leave-to {
  transform: scale(0, 0) rotate(-90deg);
}
</style>
