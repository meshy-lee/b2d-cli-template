<template>
  <div>
    <div class="unit-body">
      <div class="unit-filter">
        <div class="filter-wrap">
          <div  class="filter-row">
              <div class="horizontal-from-group">
                <div class="group-cell">
                  <label>IP：</label><input type="text" class="gt-input" placeholder="请输入IP" v-model='modelVal.ip'/>
                </div>
              </div>
              <div class="horizontal-from-group">
                <div class="group-cell">
                  <the-btn>aa</the-btn>
                <button v-hideFocus class="gt-btn-line gt--secondary" type="button" @click='search'>搜索</button>
                </div>
              </div>
          </div>
        </div>
      </div>
      <domain-list-display-table :tableList='tableList' :isLoading='isLoading' @deletdComfirm='init'></domain-list-display-table>
      <div class="pagination-wrap">
          <pagination v-if='!isLoading' :currentPage='paginationOpt.currentPage' :totalPage='paginationOpt.totalPage' @page-change='pageChange'>
          </pagination>
      </div>
      <gt-modal-wrapper ref="modalWrap">
        <domain-list-modal slot="modal-body" @comfirm='comfirm' @closeModal='close'></domain-list-modal>
      </gt-modal-wrapper>
    </div>
  </div>
</template>

<script>
import domainListDisplayTable from './table'
import domainListModal from './modal/domain_list_modal'
import eventBus from '@/store/eventBus'
export default {
  name: 'domainList',
  data () {
    return {
      modelVal: {
        ip: ''
      },
      paginationOpt: {
        currentPage: 1,
        totalPage: 8
      },
      isLoading: true,
      tableList: []
    }
  },
  methods: {
    search () {},
    pageChange () {},
    init () {},
    openModal () {
      this.$refs.modalWrap.openModal()
    },
    close () {
      this.$refs.modalWrap.closeModal()
    },
    comfirm () {
      this.init()
      this.close()
    }
  },
  created () {
    eventBus.$on('appLinkConfigAdd', this.openModal)
  },
  destroyed () {
    eventBus.$off('appLinkConfigAdd', this.openModal) // homie 记得删除事件绑定
  },
  components: {
    domainListModal,
    domainListDisplayTable
  }
}
</script>

<style lang='less' scoped>
</style>
