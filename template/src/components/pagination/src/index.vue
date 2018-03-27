<template>
    <div class="pagination-box clear">
        <div class="page-bar fr">
            <ul class="fl">
            <li class="first-li" :class="{'page-disabled':currentPage==1}"><a v-on:click="prevPage"><i class="iconfont icon-datepick-prev"></i></a></li>
            <template v-if='showHead'>
                <li>
                    <a v-on:click="pageChange(1)"> 1 </a>
                </li>
                <li>
                    <a v-on:click="pageChange(2)"> 2 </a>
                </li>
                <li  class="dot">
                    <span>...</span>
                </li>
            </template>
            <li v-for="index in pagenums"  v-bind:class="{ active: currentPage == index}" :key='index'>
                <a v-on:click="pageChange(index)">{{ index }}</a>
            </li>
            <template v-if='showTail'>
                <li  class="dot">
                    <span>...</span>
                </li>
                <li>
                    <a v-on:click="pageChange(totalPage-1)">{{ totalPage-1 }}</a>
                </li>
                <li>
                    <a v-on:click="pageChange(totalPage)">{{ totalPage }}</a>
                </li>
            </template>
            <li class="last-li" :class="{'page-disabled':currentPage==totalPage}"><a v-on:click="nextPage"><i class="iconfont icon-datepick-next"></i></a></li>
            </ul>
            <div class="leftover fl">
                <span class="mr-14">共<span>{{totalPage}}</span>页，</span>
                <label>到第<input class="page-val gt-input" type="text"  size="4" v-model='jump' v-on:keyup.enter="jumpTo"/></label><span>页</span>
                <input class="goto-page gt-btn" type="button" value="确定" @click='jumpTo'/>
            </div>
        </div>
    </div>
</template>

<script>
export default {

  name: 'pagination',

  props: ['currentPage', 'totalPage'],
  data () {
    return {
      jump: '',
      visiblePage: 5 // 写死
    }
  },
  computed: {
    pagenums () {
      let lowPage = 1
      let highPage = this.totalPage
      let pageArr = []
      if (this.totalPage > this.visiblePage) { // 总页数超过可见页数时，进一步处理；
        let subVisiblePage = Math.ceil(this.visiblePage / 2)
        if (this.currentPage > subVisiblePage && this.currentPage < this.totalPage - subVisiblePage + 1) { // 处理正常的分页
          lowPage = this.currentPage - subVisiblePage
          highPage = this.currentPage + subVisiblePage - 1
        } else if (this.currentPage <= subVisiblePage) { // 处理前几页的逻辑
          lowPage = 1
          highPage = this.visiblePage
        } else { // 处理后几页的逻辑
          lowPage = this.totalPage - this.visiblePage + 1
          highPage = this.totalPage
        }
      }
      // 确定了上下page边界后，要准备压入数组中了
      while (lowPage <= highPage) {
        pageArr.push(lowPage)
        lowPage++
      }
      return pageArr
    },
    showHead () {
      if (this.totalPage > 10 && this.currentPage > 5 && this.currentPage <= this.totalPage) {
        return true
      }
      return false
    },
    showTail () {
      if (this.totalPage > 10 && this.currentPage <= this.totalPage - 5) {
        return true
      }
      return false
    }
  },
  methods: {
    pageChange (page) {
      if (this.currentPage !== page) {
        this.$emit('page-change', page) // 父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
      }
    },
    prevPage () {
      if (this.currentPage - 1 !== 0) {
        this.$emit('page-change', this.currentPage - 1)
      }
    },
    nextPage () {
      if (this.currentPage + 1 <= this.totalPage) {
        this.$emit('page-change', this.currentPage + 1)
      }
    },
    jumpTo () {
      if (this.jump !== '' && (this.jump <= this.totalPage && this.jump > 0)) {
        this.$emit('page-change', Number(this.jump))
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './../../../assets/style/base.less';
.pagination-box{
    .page-bar{
        ul{
            li{
                list-style: none;
                float: left;
            }
            .first-li{
                margin-right: 4px;
            }
            .last-li{
                margin-left: 4px;
            }
            .first-li,.last-li{
                a{
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    line-height: 28px;
                }
            }
        }

    }
    .gt-input{
        width: 40px;
        min-width: 40px;
        background: none;
        color: @page-fontColor;
        border-color: @page-inputBorder;
    }
    .gt-btn{
        width: 45px;
        min-width: 45px;
        padding: 0;
        height: 30px;
        line-height: 0px;
    }
    .leftover{
        margin-left: 8px;
        line-height: 30px;
        color: @page-fontColor;
        label{
            margin: 0;
            font-weight: normal;
        }
        span{
            color: @page-fontColor;
        }
    }
}
.dot{
    padding: 4px 8px;
    line-height: 34px;
}
.page-bar li:first-child>a {
   margin-left: 0px
}
.page-bar a{
    float: left;
    padding: 4px 10px;
    margin-left: -1px;

    position: relative;

    font-size: 14px;
    text-decoration: none;

    border: 1px solid @page-borderColor;
    background: @page-bgColor;
    color: @page-fontColor;
    cursor: pointer;
}
.page-bar a:hover{
    background-color: @page-hover-bgColor;
    color: @page-hover-fontColor;
    i{
        color: @page-hover-fontColor;
    }
}
.page-bar .active a{
    color: @page-active-fontColor;
    cursor: default;
    background-color: @page-active-bgColor;
}
.page-bar i{
    font-style:normal;
    color: #6d6d6d;
    margin: 0px 4px;
    font-size: 12px;
    &:hover{
        color: #ffffff;
    }
}
.page-disabled{
    a{
        background-color: none;
        border-color: @page-borderColor;
        cursor: not-allowed;
        &:hover{
            background: none;
            i{
                color: #999999;
            }
        }
        i{
            color: #999999;
        }
    }
}
.mr-14{
    span{
        margin: 0 4px;
    }
}
.page-val{
    margin: 0 6px;
}
.goto-page{
    margin-left: 16px;
}
</style>
