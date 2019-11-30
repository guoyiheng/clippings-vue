export default {
  data: () => ({
    // loading相关
    queryloading: true,

    // 分页相关
    currentPage: 1, // 当前页
    totalPage: 0, // 总页数
    count: 10, // 每页条数

    // dialog
    dialog: false,
    deleteLoading: false

  })
}
