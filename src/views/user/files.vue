<!--
  功能：文件历史上传记录
  作者：gyh
  时间：2019年11月05日 11:12:32
  版本：v1.0
-->
<template>
  <div class="files-page">
    <div class="upload-clippings">
      <v-file-input
        v-model="uploadFile"
        class="my-input"
        :label="$t('file.inputLabel')"
        show-size
        prepend-icon="mdi-paperclip"
        accept="text/plain"
        dense
        outlined
      >
        <template v-slot:selection="{ text }">
          <v-chip small label color="primary">
            {{ text }}
          </v-chip>
        </template>
      </v-file-input>
      <v-btn
        block
        color="primary"
        :loading="uploadloading"
        @click="handleUpload()"
      >
        {{ $t('file.confirmUpload') }}
      </v-btn>
    </div>

    <div v-if="listData.length !== 0" class="files-page-container">
      <div v-if="!queryloading">
        <v-expansion-panels
          :popout="popout"
          :multiple="multiple"
          class="expansion-panels"
        >
          <v-expansion-panel v-for="(item, i) in listData" :key="i">
            <v-expansion-panel-header v-slot="{ open }">
              <v-row no-gutters>
                <v-col cols="5">My Clippings.txt</v-col>
                <v-col cols="7" class="secondText--text">
                  <v-fade-transition leave-absolute>
                    <v-row v-if="open" no-gutters style="width: 100%">
                      <v-col cols="12" align="end">
                        {{ $t('file.expandText') }}
                      </v-col>
                    </v-row>

                    <v-row v-else no-gutters style="width: 100%">
                      <v-col cols="12" align="end">
                        {{
                          timeComputed(item.createdAt)
                            | parseTime('{y}-{m}-{d} {h}:{i}:{s}')
                        }}
                      </v-col>
                    </v-row>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="button-container">
                <v-btn
                  color="primary"
                  depressed
                  class="mr-4 u-button"
                  :loading="analysisLoading"
                  @click="handleAnalysis(item)"
                >
                  {{ $t('file.analysis') }}
                </v-btn>
                <v-btn
                  color="info"
                  depressed
                  class="mr-4 u-button"
                  @click="handleDownload(item)"
                >
                  {{ $t('file.download') }}
                </v-btn>
                <v-btn
                  color="error"
                  depressed
                  class="mr-4 u-button"
                  @click="handleDelete(item)"
                >
                  {{ $t('file.delete') }}
                </v-btn>
                Size:{{ item.size / 1000 }}KB
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
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

      <div class="text-center">
        <v-pagination
          v-model="currentPage"
          :length="totalPage"
          :total-visible="7"
          next-icon="mdi-menu-right"
          prev-icon="mdi-menu-left"
        />
      </div>
    </div>

    <div v-else class="files-page-container-block">
      <Alert type="warning" :text="$t('info.nofiles')" />
    </div>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline"> {{ $t('dialog.title') }}</v-card-title>

        <v-card-text>
          {{ $t('dialog.content') }}
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="error darken-1"
            text
            :loading="deleteLoading"
            @click="confirmDelete"
          >
            {{ $t('dialog.confirm') }}
          </v-btn>

          <v-btn color="primary darken-1" text @click="dialog = false">
            {{ $t('dialog.cancle') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { add, deleteOne, findAllAndCount, analysisFile } from '@/api/files.js'
import { saveAs } from 'file-saver'
import mixin from '@/mixins/mixins.js'

export default {
  mixins: [mixin],
  data: () => ({
    // 组件相关
    popout: true,
    multiple: true,
    type: 'list-item-two-line',
    tile: true,

    uploadloading: false,
    analysisLoading: false,

    // 列表相关
    listData: [1],
    uploadFile: null
  }),
  computed: {
    timeComputed(val) {
      return function(val) {
        return new Date(val).getTime()
      }
    }
  },
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
      findAllAndCount(data)
        .then(result => {
          this.totalPage = parseInt(Math.ceil(result.data.total / this.count))
          this.listData = result.data.fileList
          this.queryloading = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 下载
    handleAnalysis(item) {
      const data = {
        fileId: item.id
      }
      this.analysisLoading = true
      analysisFile(data)
        .then(result => {
          console.log(result)
          this.$message({
            text: result.msg,
            color: 'success'
          })
        })
        .catch(err => {
          this.$message({
            text: err,
            color: 'error'
          })
        })
        .finally(() => {
          this.analysisLoading = false
        })
    },
    // 下载
    handleDownload(val) {
      const env = process.env.NODE_ENV
      console.log('env:', env)

      let urlPrefix
      if (env === 'development') {
        urlPrefix = 'http://127.0.0.1:8000/assets/uploads/'
      } else {
        urlPrefix = 'https://api.guoyiheng.xyz/assets/uploads/'
      }
      console.log(urlPrefix, val.fileName)

      saveAs(`${urlPrefix}${val.fileName}`, `My Clippings.txt`)
    },
    // 删除
    handleDelete(item) {
      this.dialog = true
      this.chooseDeleteItem = item
    },
    confirmDelete() {
      this.deleteLoading = true
      const data = {
        id: this.chooseDeleteItem.id
      }
      deleteOne(data)
        .then(result => {
          this.$message({
            text: this.$t('info.deleteSuccess'),
            color: 'success'
          })
          this.dialog = false
          this.handleQuery()
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.dialog = false
          this.deleteLoading = false
        })
    },
    handleUpload() {
      //   this.$axios
      //     .get('http://alipub.binfenyingyu.com/temp_1560738954837.jpg')
      //     .then(result => {
      //       console.log(result)
      //     })
      //     .catch(err => {})
      //   return
      const formData = new FormData()
      formData.append('file', this.uploadFile)
      if (this.uploadFile.size > 1000000) {
        this.$message({
          text: this.$t('info.fileSize'),
          color: 'error'
        })
        return
      }

      if (this.uploadFile.type !== 'text/plain') {
        this.$message({
          text: this.$t('info.fileType'),
          color: 'error'
        })
        return
      }
      this.uploadloading = true
      add(formData)
        .then(result => {
          this.$message({
            text: this.$t('info.uploadSuccess'),
            color: 'success'
          })
          this.uploadFile = null
          this.handleQuery()
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.uploadloading = false
        })
    }
  }
}
</script>

<style scoped lang="scss" type="text/css">
.files-page {
  position: relative;
  width: 100%;
  height: 100%;
  .upload-clippings {
    width: 100%;
    margin-top: 20px;
  }
  .files-page-container {
    width: 100%;
    margin-top: 40px;
  }
  .files-page-container-block {
    margin-top: 40px;
  }

  .text-center {
    margin-top: 20px;
  }
}
.my-input {
  width: 85%;
}
.v-expansion-panels--popout .v-expansion-panel {
  max-width: 100%;
}
</style>
