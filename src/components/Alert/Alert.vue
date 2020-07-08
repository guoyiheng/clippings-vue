<!--
  功能：Message消息条
  作者：gyh
  时间：2019年10月31日 17:20:55
  版本：v1.0
-->
<template>
  <div v-if="show" class="alert-container">
    <v-alert :type="type" border="bottom" colored-border elevation="2">
      {{ text }}
    </v-alert>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    show: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
      default: "Hello, I'm a Message"
    },
    type: {
      type: String,
      default: 'info',
      validator: val => ['info', 'success', 'warning', 'error'].includes(val)
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss" type="text/css">
.alert-container {
  width: 90%;
  //   height: 60px;

  //   position: fixed;
  //   top: 10px;
  //   left: 0px;
  //   z-index: 9999;

  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
}
</style>
