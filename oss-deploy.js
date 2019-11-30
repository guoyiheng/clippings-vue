// oss-deploy.js
const OSS = require('ali-oss')
const fs = require('fs')

const client = new OSS({
  region: 'xxx',
  accessKeyId: 'xxx',
  accessKeySecret: 'xxx',
  bucket: 'xxx'
})

async function put(fileName) {
  try {
    await client.put(fileName, './dist/' + fileName)
    console.log('File Upload Success: ', fileName)
  } catch (e) {
    console.log('File Upload Failed: ', fileName)
  }
}

// 读取打包后的 dist 路径，按照原文件夹结构，进行上传
const readFileList = (path, filesList) => {
  const files = fs.readdirSync(path)
  files.forEach(itm => {
    if (itm) {
      const stat = fs.statSync(path + itm)
      if (stat.isDirectory()) {
        readFileList(path + itm + '/', filesList)
      } else {
        filesList.push(path + itm)
      }
    }
  })
  return filesList
}
const dist = readFileList('./dist/', [])

// 递归执行文件上传操作
let i = 0
const l = dist.length
const uploadAsset = () => {
  if (i < l) {
    const name = dist[i].split('./dist/')[1]
    put(name)
    i++
    uploadAsset()
  }
}
uploadAsset()
