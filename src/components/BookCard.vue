<template>
  <v-card class="mx-auto book-card-container" :loading="saveLoading" outlined>
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="3" class=" text--primary">
            {{ baseData.bookName }}
          </v-col>
          <v-spacer />
          <v-col cols="12" sm="5">
            {{ baseData.addTime }}
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="3">
            {{ baseData.author }}
          </v-col>
          <v-spacer />
          <v-col cols="12" sm="5">
            {{ $t('bookCard.loc') }} {{ baseData.location }}
          </v-col>
        </v-row>
        <v-row>
          <v-col v-if="!showEditContent" cols="12">
            {{ baseData.content }}
          </v-col>
          <v-col v-else cols="12">
            <v-textarea v-model="textarea" solo counter :rules="contentRule" />
          </v-col>
        </v-row>

        <v-row v-if="showEditContent">
          <v-col cols="3" sm="1">
            <v-btn
              color="primary"
              text
              icon
              :loading="saveLoading"
              @click="handleSaveContent"
            >
              <v-icon>check</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="3" sm="1">
            <v-btn color="error" text icon @click="handleCancleContent">
              <v-icon>close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-container v-if="!showEditContent" fluid>
        <v-row>
          <v-col cols="3" sm="1">
            <v-btn color="primary" text icon @click="handleEditContent">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="3" sm="1">
            <v-btn
              text
              icon
              :color="baseData.favorite === 1 ? 'pink' : 'grey'"
              :loading="favoriteLoading"
              @click="handleEditFavorite"
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3" sm="1">
            <v-btn color="warning" text icon @click="handleDelete">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">{{ $t('dialog.title') }}</v-card-title>

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
  </v-card>
</template>

<script>
import { updateOne, deleteOne } from '@/api/bookcard.js'

export default {
  props: {
    bookData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      baseData: this.bookData,
      // 内容编辑
      showEditContent: false,
      textarea: '',
      contentRule: [v => v.length <= 1000 || this.$t('bookCard.contentRule')],

      // loading 相关
      saveLoading: false,
      favoriteLoading: false,
      // dialog
      dialog: false,
      deleteLoading: false
    }
  },
  watch: {
    bookData(n) {
      this.baseData = n
    }
  },
  methods: {
    handleEditFavorite() {
      const that = this
      const data = {
        favorite: that.baseData.favorite === 1 ? 0 : 1,
        id: that.baseData.id
      }
      that.favoriteLoading = true
      updateOne(data)
        .then(result => {
          that.$message({
            text: that.baseData.favorite === 1 ? '取消喜欢' : '添加到我喜欢',
            color: 'success'
          })
          that.baseData.favorite === 1
            ? (that.baseData.favorite = 0)
            : (that.baseData.favorite = 1)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          that.favoriteLoading = false
        })
    },
    handleEditContent() {
      this.showEditContent = true
      this.textarea = this.baseData.content
    },
    handleSaveContent() {
      const that = this
      if (that.textarea.length > 1000) {
        this.$message({
          text: '长度不超过1000字',
          color: 'error'
        })
        return
      }
      const data = {
        content: that.textarea,
        id: that.baseData.id
      }
      that.saveLoading = true
      updateOne(data)
        .then(result => {
          that.$message({
            text: '修改成功',
            color: 'success'
          })
          this.baseData.content = that.textarea
          this.showEditContent = false
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          that.saveLoading = false
        })
    },
    handleCancleContent() {
      this.showEditContent = false
    },

    // 删除
    handleDelete(item) {
      this.dialog = true
    },
    confirmDelete() {
      const that = this
      that.deleteLoading = true

      const data = {
        id: that.baseData.id
      }
      deleteOne(data)
        .then(result => {
          that.$message({
            text: '删除成功',
            color: 'success'
          })
          that.dialog = false
          that.$emit('remove-item', that.bookData.id)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          that.dialog = false
          that.deleteLoading = false
        })
    }
  }
}
</script>

<style scoped>
.book-card-container {
  margin-bottom: 10px;
}
</style>
