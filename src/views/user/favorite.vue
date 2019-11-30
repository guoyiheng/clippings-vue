<!--
  功能：我喜欢
  作者：gyh
  时间：2019年11月06日 14:11:40
  版本：v1.0
-->
<template>
  <div class="favorite-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <div class="clippings-content">
            <div v-if="baseData.length !== 0" class="clippings-list">
              <div v-if="!queryloading">
                <span class="title">{{ $t('layout.favorite') }}</span>
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
                  :total-visible="7"
                  next-icon="mdi-menu-right"
                  prev-icon="mdi-menu-left"
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
import { findAllFavorite } from '@/api/favorite.js'
import mixin from '@/mixins/mixins.js'
import BookCard from '@/components/BookCard.vue'
import Top from '@/components/Top.vue'

export default {
  components: {
    BookCard,
    Top
  },
  mixins: [mixin],
  props: {},
  data() {
    return {
      type: 'list-item-two-line',
      tile: true,
      // 列表数据
      baseData: [1]
    }
  },
  computed: {},
  watch: {
    currentPage(n, o) {
      this.queryloading = true
      this.handleQuery(this.currentPage, this.count)
    }
  },
  created() {
    this.handleQuery(this.currentPage, this.count)
  },
  mounted() {},
  methods: {
    // 查询
    handleQuery(currentPage = 1, count = 10) {
      const data = {
        currentPage,
        count
      }
      findAllFavorite(data)
        .then(result => {
          this.totalPage = parseInt(Math.ceil(result.data.total / this.count))
          this.baseData = result.data.favoriteList
          this.queryloading = false
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
.favorite-page {
  width: 100%;
}
</style>
