<template>
    <div>
      <div class="gt-modal__header" slot="modal-header">
          <div class="gt-modal__header__title">新增</div>
      </div>
      <div class="gt-modal__body" slot="modal-body">
        <div class="gt-form-bd-auto">
          <div class="gt-form-group">
              <label class="gt-form__label">IP</label>
              <div class="gt-form__content" :class="{'gt--error':errors.has('ip')}">
                  <input class="gt-form-control" v-validate data-vv-validate-on='blur' data-vv-rules="required" type="text" name="ip" v-model="ip"/>
              </div>
          </div>
        </div>
      </div>
      <div class="gt-modal__footer" slot="modal-footer">
          <button class="gt-btn-line" @click="close">取消</button>
          <button class="gt-btn-solid"  @click="validate">确定</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'domainListModal',
  data () {
    return {
      ip: ''
    }
  },
  methods: {
    close () {
      this.$emit('closeModal')
    },
    validate () {
      this.$validator.validateAll().then(flag => {
        if (flag) this.comfirm()
      }).catch(() => {
        // eventBus.$emit('validateFaile');
      })
    }
  }
}
</script>

<style lang='less' scoped>
.gt-form__content, .gt-form__label{
  margin-bottom: 0;
  padding-bottom: 0;
}
</style>
