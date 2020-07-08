<!--
  功能：登录页
  作者：gyh
  时间：2019年10月31日 14:05:58
  版本：v1.0
-->
<template>
  <div class="login-page">
    <v-form ref="form" v-model="valid" class="v-form">
      <v-layout column align-center justify-center class="layout-container">
        <p class="text-center mb-10 display-1">
          <span class="secondText--text">Your </span>
          <span class="primary--text">Kindle </span>
          <span class="danger--text">Clippings</span>
        </p>
        <div v-if="showLoginForm" class="input-container">
          <v-flex>
            <v-text-field
              v-model="loginForm.name"
              prepend-inner-icon="person"
              :label="$t('login.username')"
              outlined
              required
              dense
              counter
              :rules="nameRules"
              :loading="loading"
              @click:prepend-inner="handleClickPrepend1"
            />
          </v-flex>
          <v-flex>
            <v-text-field
              v-model="loginForm.password"
              prepend-inner-icon="lock"
              :label="$t('login.password')"
              outlined
              dense
              required
              :rules="passwordRules"
              :append-icon="
                passwordVisibility ? 'visibility' : 'visibility_off'
              "
              :type="passwordVisibility ? 'text' : 'password'"
              counter
              :loading="loading"
              @click:prepend-inner="handleClickPrepend2"
              @click:append="passwordVisibility = !passwordVisibility"
              @keyup.enter="handleValidate(0)"
            />
          </v-flex>
        </div>
        <div v-else class="input-container">
          <v-flex>
            <v-text-field
              v-model="registerForm.name"
              prepend-inner-icon="person"
              :label="$t('login.user')"
              outlined
              required
              dense
              counter
              :rules="nameRules"
              :loading="loading"
            />
          </v-flex>
          <v-flex>
            <v-text-field
              v-model="registerForm.email"
              prepend-inner-icon="email"
              :label="$t('login.email')"
              outlined
              required
              dense
              counter
              :rules="emailRules"
              :loading="loading"
            />
          </v-flex>
          <v-flex>
            <v-text-field
              v-model="registerForm.password"
              prepend-inner-icon="lock"
              :label="$t('login.password')"
              outlined
              dense
              required
              :rules="passwordRules"
              :append-icon="
                passwordVisibility ? 'visibility' : 'visibility_off'
              "
              :type="passwordVisibility ? 'text' : 'password'"
              counter
              :loading="loading"
              @click:append="passwordVisibility = !passwordVisibility"
              @keyup.enter="handleValidate(1)"
            />
          </v-flex>
        </div>

        <div v-show="showLoginForm" class="button-container">
          <v-btn
            :disabled="!valid"
            color="primary"
            class="mr-4 u-button"
            :loading="loading"
            @click="handleValidate(0)"
          >
            {{ $t('login.login') }}
          </v-btn>

          <v-btn color="default" class="u-button" @click="handleShow">
            {{ $t('login.register') }}
          </v-btn>
        </div>
        <div v-show="!showLoginForm" class="button-container">
          <v-btn
            :disabled="!valid"
            color="primary"
            class="mr-4 u-button"
            :loading="loading"
            @click="handleValidate(1)"
          >
            {{ $t('login.registerAndLogin') }}
          </v-btn>

          <v-btn color="default" class="u-button" @click="handleShow">
            {{ $t('login.returnLogin') }}
          </v-btn>
        </div>
        <Alert
          v-show="showActive"
          class="mt-12"
          type="warning"
          :text="$t('login.userActivate')"
        />
      </v-layout>
    </v-form>
    <div class="background-block bgColor" />
    <locale />
  </div>
</template>

<script>
import Locale from '@/components/Locale.vue'

export default {
  components: {
    Locale
  },
  props: {},
  data() {
    return {
      // 组件公共参数
      valid: true,
      solo: true,
      singleLine: true,
      loading: false,
      // 组件独有参数
      passwordVisibility: false,
      // 表单参数
      loginForm: {
        name: '',
        password: ''
      },
      registerForm: {
        name: '',
        password: '',
        email: ''
      },
      // 参数校验
      nameRules: [
        v => !!v || this.$t('login.usernameRequire'),
        v => (v && v.length >= 6 && v.length <= 20) || this.$t('login.nameRule')
      ],
      passwordRules: [
        v => !!v || this.$t('login.passwordRequire'),
        v =>
          (v && v.length >= 6 && v.length <= 20) ||
          this.$t('login.passwordRule')
      ],
      emailRules: [
        v => !!v || this.$t('login.emailRequire'),
        v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(v) || this.$t('login.emailRule')
        }
      ],
      showLoginForm: true,
      showActive: false
    }
  },
  computed: {},
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleShow() {
      this.showLoginForm = !this.showLoginForm
      this.showActive = false
    },
    handleValidate(value) {
      this.loading = true
      if (this.$refs.form.validate()) {
        if (value === 0) {
          this.handleLogin()
        } else {
          this.handleRegist()
        }
      } else {
        this.loading = false
      }
    },
    handleLogin() {
      this.$store
        .dispatch('user/login', this.loginForm)
        .then(res => {
          this.$router.push({ path: this.redirect || '/' })
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleRegist() {
      // 校验参数通过
      this.$store
        .dispatch('user/regist', this.registerForm)
        .then(res => {
          this.$message({
            color: 'success',
            text: this.$t('login.registerSuccess')
          })
          //   const t1 = setTimeout(() => {
          //     clearTimeout(t1)
          //     this.$router.push({ path: this.redirect || '/' })
          //   }, 1000)
          this.showActive = true
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleClickPrepend1() {
      this.$message({
        text: this.$t('login.clickPrepend1')
      })
    },
    handleClickPrepend2() {
      this.$message({
        text: this.$t('login.clickPrepend2')
      })
    }
  }
}
</script>

<style scoped lang="scss" type="text/css">
.background-block {
  position: fixed;
  top: 0px;
  width: 100%;
  height: 100%;

  z-index: -1;
}
.login-page {
  width: 100%;
  height: 100%;
  .v-form {
    .input-container {
      width: 400px;
    }
    .button-container {
      width: 400px;
      .u-button {
        min-width: 100px;
        height: 40px;
      }
    }
  }
  .layout-container {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
