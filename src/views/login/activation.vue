<!--
  功能：功能描述
  作者：gyh
  时间：2019年11月20日 10:16:51
  版本：v1.0
-->
<template>
  <div class="activation-page  d-flex justify-center align-center">
    <div v-if="!showError" class="activation-status" @click="handleToLogin">
      <Alert type="success" :text="$t('activation.success')" />
    </div>
    <div v-else class="activation-status" @click="handleToLogin">
      <Alert type="error" :text="$t('activation.error')" />
    </div>
  </div>
</template>

<script>
import { activation } from '@/api/activation.js'
export default {
  components: {},
  props: {},
  data() {
    return {
      code: '',
      showError: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.code = this.$route.query.code
    if (!this.code) {
      this.showError = true
    } else {
      this.handleQuery(this.code)
    }
  },
  mounted() {},
  methods: {
    handleQuery(code) {
      const params = {
        code
      }
      activation(params)
        .then(result => {
          console.log(result)
          this.showError = false
          const t1 = setTimeout(() => {
            clearTimeout(t1)
            this.$router.push({
              name: 'Login'
            })
          }, 1000)
        })
        .catch(err => {
          this.showError = true
          console.log(err)
        })
    },
    handleToLogin() {
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>

<style scoped lang="scss" type="text/css">
.activation-page {
  width: 100%;
  height: 100%;
  .activation-status {
    width: 90%;
  }
}
</style>
