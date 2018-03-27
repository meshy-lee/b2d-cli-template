<template>
    <div class="statistic-tab-block">
        <ul>
            <li v-for="(v,index) in tabList" :class="{'selected': routeName === v.name}" :key='index'>
                <router-link :to="{name: v.name}">{{v.text}}</router-link>
                <slot :name='v.name'></slot>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'gtStatisticTab',
  props: {
    tabList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      routeName: this.$route.name,
      id: this.$route.params.id,
      timer: null
    }
  },
  watch: {
    $route () {
      this.id = this.$route.params.id
      this.routeName = this.$route.name
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.statistic-tab-block {
  margin-right: 5px;
  float: left;

  & > ul {
    & > li {
      width: 145px;
      float: left;
      padding: 15px 17px 12px 17px;
      font-size: 14px;
      color: #6d6d6d;
      position: relative;

      &:after {
        content: "";
        height: 14px;
        width: 1px;
        position: absolute;
        background: #dddddd;
        right: 0;
        top: 15px;
      }

      a {
        color: #6d6d6d;
      }

      &.selected {
        border-color: #01acf3;
        position: relative;
        a {
          color: #01acf3;
          font-weight: bold;
        }

        &:before {
          content: "";
          height: 2px;
          width: 145px;
          position: absolute;
          background: #01acf3;
          top: 45px;
          left: 0;
          z-index: 1;
        }
      }
    }
  }
  .help-msg-small {
    position: absolute;
    //right: 25px;
    top: 12px;
  }
}
</style>
