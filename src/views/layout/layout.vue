<!--
  功能：ui布局
  作者：gyh
  时间：2019年11月01日 17:58:18
  版本：v1.0
-->
<template>
  <v-app id="inspire">
    <v-app-bar
      app
      :elevate-on-scroll="elevateOnScroll"
      color="layoutBar"
      class="my-header"
    >
      <v-app-bar-nav-icon class="primaryText--text" @click="drawer = !drawer" />
      <span class="title ml-3 mr-5 primaryText--text">
        {{ $t('layout.titlePre') }} &nbsp;
        <span class="font-weight-light" />
        {{ $t('layout.clippings') }}
      </span>
      <v-autocomplete
        v-model="select"
        :loading="searchLoading"
        :items="searchList"
        :search-input.sync="searchItem"
        cache-items
        flat
        hide-no-data
        hide-details
        :label="$t('layout.search')"
        solo-inverted
        prepend-inner-icon="search"
        class="hidden-xs-only"
        item-text="content"
        item-value="id"
      />
      <v-spacer />
      <locale
        top="15px"
        select-color="primaryText--text"
        default-color="localex--text"
        :fixed="fixed"
      />
      <v-btn
        depressed
        color="layoutBar"
        class="primaryText--text"
        :class="showLogout ? '' : 'hidden-xs-only'"
        @click="handleLogout"
      >
        {{ $t('layout.logout') }}
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      color="layoutBg"
      class="my-navigation"
      touchless
      @touchmove.prevent
    >
      <v-list dense>
        <template v-for="(item, i) in menuItems">
          <v-layout
            v-if="item.heading"
            :key="i"
            row
            align-center
            style="padding:0 16px;"
          >
            <v-flex v-if="item.heading !== 'user'" xs6>
              <v-subheader class="primaryText--text">
                {{ item.heading }}
              </v-subheader>
            </v-flex>

            <v-flex v-else xs12>
              <v-subheader
                class="flex flex-column justify-center align-start"
                style="height:140px;"
              >
                <v-icon color="primaryIcon" @click="handleClickHeader">{{
                  item.headerImg
                }}</v-icon>

                <span class="title mt-2 font-weight-bold primaryText--text">{{
                  item.username
                }}</span>
              </v-subheader>
            </v-flex>
          </v-layout>
          <v-divider v-else-if="item.divider" :key="i" class="my-3 divider" />
          <v-list-item v-else :key="i" @click="handleToPage(item)">
            <v-list-item-action>
              <v-icon color="primaryIcon">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="primaryText--text">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content class="my-content">
      <v-container fluid fill-height class="bgColor my-container">
        <v-layout justify-start align-start>
          <router-view :key="key" />
        </v-layout>
      </v-container>
      <div class="background-block bgColor" />
    </v-content>
  </v-app>
</template>

<script>
import { searchNorAorC } from '@/api/clippings'
import Locale from '@/components/Locale.vue'

export default {
  components: {
    Locale
  },
  props: {},
  data: () => ({
    fixed: false,
    drawer: null,
    elevateOnScroll: true,
    searchList: [],
    baseList: [],
    searchItem: '',
    select: null,
    searchLoading: false,

    // 显示登出
    showLogout: false,
    lastTime: 0,
    timer: null,
    clickTime: 0
  }),
  computed: {
    key() {
      return this.$route.fullPath
    },
    menuItems() {
      return [
        {
          heading: 'user',
          username: this.$store.getters.userInfo.name,
          headerImg: 'person_pin'
        },
        { divider: true },
        { icon: 'folder', text: this.$t('layout.clippings') },
        { icon: 'favorite', text: this.$t('layout.favorite') },
        { divider: true },
        { heading: this.$t('layout.files') },
        { icon: 'cloud', text: this.$t('layout.history') },
        { divider: true },
        // { heading: '用户' },
        { icon: 'person', text: this.$t('layout.person') },
        { icon: 'settings', text: this.$t('layout.settings') },
        { icon: 'help', text: this.$t('layout.help') }
        // { divider: true }
        // { icon: 'delete', text: '垃圾箱' }
      ]
    }
  },
  watch: {
    searchItem(n, o) {
      if (n && n !== '') {
        this.handleSearch(n)
      }
    },
    select(n) {
      console.log(n)
      this.$router.push({
        name: 'Clippings',
        query: {
          clippingId: n
        }
      })
    }
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * 路由跳转
     */
    handleToPage(item) {
      console.log(item)
      if (
        item.text === this.$t('layout.history') &&
        this.$route.name !== 'Files'
      ) {
        this.$router.push({
          name: 'Files'
        })
      } else if (
        item.text === this.$t('layout.person') &&
        this.$route.name !== 'Home'
      ) {
        this.$router.push({
          name: 'Home'
        })
      } else if (
        item.text === this.$t('layout.clippings') &&
        this.$route.name !== 'Clippings'
      ) {
        this.$router.push({
          name: 'Clippings'
        })
      } else if (
        item.text === this.$t('layout.favorite') &&
        this.$route.name !== 'Favorite'
      ) {
        this.$router.push({
          name: 'Favorite'
        })
      } else if (
        item.text === this.$t('layout.help') &&
        this.$route.name !== 'Help'
      ) {
        this.$router.push({
          name: 'Help'
        })
      } else if (
        item.text === this.$t('layout.settings') &&
        this.$route.name !== 'Setting'
      ) {
        this.$router.push({
          name: 'Setting'
        })
      } else if (
        item.text === this.$t('layout.delete') &&
        this.$route.name !== 'Trash'
      ) {
        this.$router.push({
          name: 'Trash'
        })
      }
    },
    /**
     * 登出
     */
    handleLogout() {
      this.$store
        .dispatch('user/resetToken')
        .then(res => {
          this.$router.replace({ path: '/login' })
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleSearch(val) {
      const data = {
        search: val
      }
      this.searchLoading = true
      searchNorAorC(data)
        .then(result => {
          this.baseList = result.data.baseList
          this.searchList = []
          this.baseList.forEach(item => {
            this.searchList.push(item)
          })
          this.searchLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleClickHeader() {
      var currentTime = new Date().getTime()
      // 记录两次相连的点击时间间隔，大于1秒，重新记录点击次数
      this.clickTime =
        currentTime - this.lastTime < 1000 ? this.clickTime + 1 : 1
      this.lastTime = new Date().getTime()
      console.log('count', this.clickTime)
      if (this.clickTime > 4) {
        this.showLogout = true
        console.log('点击4次以上执行这部分代码')
      }
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
</style>
