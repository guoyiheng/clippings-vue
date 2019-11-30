<!--
  功能：切换语言
  作者：gyh
  时间：2019年11月13日 10:05:24
  版本：v1.0
-->
<template>
  <v-btn
    :fixed="fixed"
    depressed
    text
    style="z-index:9999;"
    class="font-weight-medium"
    :style="fixed ? { top: top, right: right } : {}"
    @click="hanleChangeLocale"
  >
    <span
      :class="[this.$i18n.locale === 'zh' ? selectColor : defaultColor]"
      style="margin-bottom:2px;"
    >
      中文
    </span>
    <span class="localex--text">/</span>
    <span :class="[this.$i18n.locale === 'en' ? selectColor : defaultColor]">
      EN
    </span>
  </v-btn>
</template>

<script>
export default {
  props: {
    fixed: {
      type: Boolean,
      default: true
    },
    top: {
      type: String,
      default: '20px'
    },
    right: {
      type: String,
      default: '10px'
    },
    selectColor: {
      type: String,
      default: 'localeS--text'
    },
    defaultColor: {
      type: String,
      default: 'localeD--text'
    }
  },
  created() {
    if (localStorage.getItem('locale')) {
      this.$i18n.locale = localStorage.getItem('locale')
    }
  },
  methods: {
    hanleChangeLocale() {
      let locale
      if (localStorage.getItem('locale')) {
        locale = localStorage.getItem('locale')
      } else {
        locale = this.$i18n.locale
      }

      if (locale === 'zh') {
        localStorage.setItem('locale', 'en')
        this.$i18n.locale = localStorage.getItem('locale')
      } else {
        localStorage.setItem('locale', 'zh')
        this.$i18n.locale = localStorage.getItem('locale')
      }
    }
  }
}
</script>

<style scoped lang="scss" type="text/css"></style>
