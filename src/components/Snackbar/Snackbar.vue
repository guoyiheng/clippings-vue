<!--
  功能：snackbar消息条
  作者：gyh
  时间：2019年10月31日 17:20:55
  版本：v1.0
-->
<template>
  <div v-if="snackbar">
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :color="color"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn v-if="showClose" dark text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    color: {
      type: String,
      default: 'cyan darken-2'
    },
    mode: {
      type: String,
      default: ''
    },
    snackbar: {
      type: Boolean,
      dafault: false
    },
    showClose: {
      type: Boolean,
      dafault: false
    },
    text: {
      type: String,
      default: "Hello, I'm a snackbar"
    },
    timeout: {
      type: Number,
      default: 3000
    },
    x: {
      type: String,
      default: null
    },
    y: {
      type: String,
      default: 'top'
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
