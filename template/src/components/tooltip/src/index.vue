<template>
<div class="help-msg-small help-m">
  <i class="mdp-iconfont icon-wenhao1"></i>
    <div class="tooltip hide left in">
        <div class="tooltip-arrow"></div>
        <div class="tooltip-inner">
            <slot></slot>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'tips'
}
</script>

<style lang="less" scoped>
.tooltip {
      margin-left: -141px !important;
      top: 14px !important;
      strong{
          color: #01acf3;
      }
  }
  .help-msg-small {
      display: inline-block;
      vertical-align: middle;
    text-align: center;
    margin-left: 5px;
    cursor: pointer;
    position: relative;
    .mdp-iconfont {
      font-size: 20px;
      color: #056c9c;
          font-weight: 500;
    }

      &:hover {
          .mdp-iconfont{
              color: #01acf3;
          }
          .tooltip {
              display: block;
          }
      }
      a{
          color: #01acf3;
          &:hover{
              text-decoration: underline;
              color: #01acf3;
          }
      }
  }

  .tooltip.left {
      padding: 0 5px;
      margin-left: -3px;

      .tooltip-arrow {
          top: 19px;
          left: 34%;
          margin-top: -8px;
          border-width: 0 12px 12px 12px;
          border-bottom-color: #2d6695;
          border-left-color: transparent;
          &:after{
              content: '';
              position: absolute;
              width: 0;
              height: 0;
              left: -12px;
              top: 1.5px;
              border-style: solid;
              border-width: 0 12px 12px 12px;
              border-color: rgba(16, 59, 94, 0.9);
              border-left-color: transparent;
              border-right-color: transparent;
          }
      }
  }

.tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
}

.tooltip-inner {
    margin-top: 22px;
    // margin-left: 70px;
    background-color: rgba(16, 59, 94, 0.9);
    color: #fff;
    width: 400px;
    text-align: left;
    font-weight: normal;
    padding: 20px;
    font-size: 14px;
    line-height: 25px;
    white-space: normal;
    border: 1px solid #2d6695;
    border-radius: 5px;
}

.tooltip {
    margin-left: 134px;
    font-size: 14px;
    opacity: 1;
    z-index: 10;
    position: absolute;
    display: block;
    line-height: 1.4;
    visibility: visible;

    &:hover {
        display: block;
    }
}

.hide {
    display: none;
}
</style>
