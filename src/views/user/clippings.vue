<!--
  功能：剪报
  作者：gyh
  时间：2019年11月06日 14:11:57
  版本：v1.0
-->
<template>
  <div class="clippings-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="3" justify-center>
          <v-card class="mx-auto" max-width="400">
            <v-list :dense="dense" :flat="flat">
              <v-subheader>{{ $t('clippings.book') }}</v-subheader>
              <v-list-item-group
                v-if="bookList.length !== 0"
                v-model="book"
                color="primary"
              >
                <div v-if="!bookLoading">
                  <v-list-item v-for="(item, i) in bookList" :key="i">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ i === 0 ? $t('clippings.allBook') : item.bookName }}
                        <span class="grey--text text--lighten-1 ml-2">{{
                          item.count
                        }}</span>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </div>

                <div v-else class="skeleton-loader-group">
                  <div v-for="(item, i) in 5" :key="i">
                    <v-skeleton-loader
                      ref="skeleton"
                      :type="type"
                      :tile="tile"
                      class="mx-auto"
                    />
                  </div>
                </div>
              </v-list-item-group>

              <div v-else>
                <Alert type="warning" :text="$t('clippings.nobook')" />
              </div>
            </v-list>
          </v-card>
        </v-col>

        <v-col cols="12" sm="9">
          <div ref="bookListRef" class="clippings-content">
            <div v-if="baseData.length !== 0" class="clippings-list">
              <div v-if="!queryloading">
                <!-- <span class="title">{{
                  book === 0 || !book
                    ? $t('clippings.allBook')
                    : bookList[book].bookName
                }}</span> -->
                <div v-for="(item, index) in baseData" :key="index">
                  <book-card :book-data="item" @remove-item="handleDelete" />
                </div>
              </div>
              <div v-else class="skeleton-loader-group">
                <div v-for="(item, i) in 5" :key="i">
                  <v-skeleton-loader
                    ref="skeleton"
                    :type="type"
                    :tile="tile"
                    class="mx-auto"
                  />
                </div>
              </div>
              <div class="text-center" style="margin-top:20px">
                <v-pagination
                  v-model="currentPage"
                  :length="totalPage"
                  next-icon="mdi-menu-right"
                  prev-icon="mdi-menu-left"
                  :total-visible="7"
                />
              </div>
            </div>
            <div v-else>
              <Alert type="warning" :text="$t('info.noclippings')" />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <top />
  </div>
</template>

<script>
import {
  findAllAndCount,
  findAllBook,
  findAllClippingsByBook,
  find
} from '@/api/clippings.js'
import mixin from '@/mixins/mixins.js'
import BookCard from '@/components/BookCard.vue'
import Top from '@/components/Top.vue'

export default {
  components: {
    BookCard,
    Top
  },
  mixins: [mixin],
  data: () => ({
    // 组件相关
    flat: true,
    dense: true,

    collapse: false,
    extensionHeight: 1000,

    type: 'list-item-two-line',
    tile: true,

    // 页面相关
    book: 0,
    bookName: '',
    bookList: [1],

    // 列表数据
    baseData: [1],

    // loading相关
    bookLoading: true,

    // 搜索id
    clippingId: ''
  }),
  watch: {
    currentPage(n, o) {
      this.queryloading = true
      this.handleQuery(this.currentPage, this.count)
    },
    book(n, o) {
      const that = this
      if (n === 0 || !n) {
        this.handleQuery(this.currentPage, this.count, () => {
          this.$vuetify.goTo(this.$refs.bookListRef, {
            easings: 'easeInOutCubic',
            duration: 500,
            offset: 10
          })
        })
        return
      }
      this.bookList.forEach((item, index) => {
        if (n === index) {
          that.bookName = item.bookName
          return
        }
      })
      this.handleQueryAllClippingsByBook(
        that.currentPage,
        that.count,
        that.bookName,
        () => {
          this.$vuetify.goTo(this.$refs.bookListRef, {
            easings: 'easeInOutCubic',
            duration: 500,
            offset: 10
          })
        }
      )
    }
  },
  created() {
    this.clippingId = this.$route.query.clippingId
    if (this.clippingId && this.clippingId !== '') {
      this.handleQueryById(this.clippingId)
    } else {
      this.handleQuery(this.currentPage, this.count)
    }
    this.handleQueryAllBook()
  },
  mounted() {},
  methods: {
    // 查询
    handleQuery(currentPage = 1, count = 10, callback) {
      const data = {
        currentPage,
        count
      }
      findAllAndCount(data)
        .then(result => {
          this.totalPage = parseInt(Math.ceil(result.data.total / this.count))
          this.baseData = result.data.clippingList
          this.queryloading = false

          callback && callback()
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleQueryById(val) {
      const data = {
        id: val
      }
      find(data)
        .then(result => {
          this.totalPage = parseInt(Math.ceil(result.data.total / this.count))
          this.baseData = result.data.clippingList
          this.queryloading = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleQueryAllBook() {
      findAllBook()
        .then(result => {
          this.bookList = result.data.baseList
          this.bookLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleQueryAllClippingsByBook(currentPage = 1, count = 10, val, callback) {
      const data = {
        currentPage,
        count,
        bookName: val
      }

      findAllClippingsByBook(data)
        .then(result => {
          this.totalPage = parseInt(Math.ceil(result.data.total / this.count))
          this.baseData = result.data.baseList

          callback && callback()
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleDelete() {
      this.handleQuery(this.currentPage, this.count)
    }
  }
}
</script>

<style scoped lang="scss" type="text/css">
.clippings-page {
  width: 100%;
}
</style>
