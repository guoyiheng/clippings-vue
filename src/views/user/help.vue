<!--
  功能：帮助
  作者：gyh
  时间：2019年11月06日 14:17:32
  版本：v1.0
-->
<template>
  <div style="width:100%">
    <v-card outlined style="width:100%" class="mt-4">
      <v-card-title>
        {{ $t('help.how') }}
      </v-card-title>
      <v-card-text style="width:100%">
        <p>{{ $t('help.step1') }}</p>
        <p>{{ $t('help.step2') }}</p>
      </v-card-text>
    </v-card>
    <v-card outlined style="width:100%" class="mt-8">
      <v-card-title>
        {{ $t('help.demo') }}
      </v-card-title>
      <v-card-text style="width:100%">
        <v-row>
          <v-col cols="4" justify-center class="d-flex align-center">
            My Clippings.txt
          </v-col>
          <v-col cols="8">
            <v-btn
              color="primary"
              depressed
              class="mr-4 u-button"
              @click="handleDownload()"
            >
              {{ $t('file.download') }}
            </v-btn>
            Size:15.6KB
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { saveAs } from 'file-saver'
export default {
  data() {
    return {}
  },
  created() {},
  methods: {
    // 下载
    handleDownload() {
      const url = 'https://api.guoyiheng.xyz/assets/uploads/1_1573720165978.txt'
      saveAs(`${url}`, `My Clippings.txt`)
    }
  }
}
</script>

<style scoped lang="scss" type="text/css"></style>
