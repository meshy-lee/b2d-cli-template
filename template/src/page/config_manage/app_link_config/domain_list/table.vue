<template>
  <div class="common-table-box">
    <table class="table">
      <thead>
          <tr>
              <th><span>id</span></th>
              <th><span>域名前缀</span></th>
              <th><span>完整链接</span></th>
              <th><span>状态</span></th>
              <th><span>操作</span></th>
          </tr>
      </thead>
      <tbody>
          <tr v-for='(v, $index) in renderList' v-if='resultList.length' :key='$index'>
              <td>{{v}}</td>
              <td>{{v}}</td>
              <td>{{v}}</td>
              <td>{{v}}</td>
              <td class="table-operate-cell">
                <a class="goto" href="javaScript:;" @click='deleted(v)'>删除</a>
              </td>
          </tr>
          <tr v-if='!renderList.length&&!isLoading'>
              <td colspan="7"  class="no-data">
                  <h3>暂无数据</h3>
              </td>
          </tr>
          <tr v-if='isLoading && !renderList.length'>
              <td colspan="7"  class="no-data">
                  <gt-loading></gt-loading>
              </td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'domainListDisplayTable',
  props: {
    tableList: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    renderList () {
      return [...this.tableList]
    }
  },
  methods: {
    deleted (v) {
      this.$confirm({hideHeader: false, title: '删除', body: '确认删除？删除后不可恢复！', hideCloseIcon: false}).then(result => {
        if (result) {
          this.$emit('deletdComfirm')
        } else {
          // todo after click cancel
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.common-table-box{
  margin-top: 20px;
}
</style>
