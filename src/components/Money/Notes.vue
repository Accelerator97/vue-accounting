<template>
    <div>
      <label class="notes">
        <span class="name">备注</span>
        <input type="text" placeholder="在这里输入备注" />
      </label>
    </div>
</template>

<script>
    export default {
        name:"Notes"
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.notes {
  font-size: 14px;
  background: #f5f5f5;
  display: block;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 64px;
    background: transparent;
    border: none;
    flex-grow: 1;
    padding-right: 16px;
  }
}
</style>