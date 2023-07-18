<template>
  <a-layout class="client_layout w-100 h-100">
    <div>
      <router-link to="/version1">第一版</router-link> |
      <router-link to="/version2">第二版</router-link>
    </div>

    <a-layout-content class="client_content">
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  props: ["id"],
};
</script>

<style lang="less" scoped>
.client {
  &_layout {
    // background-color: #282a3e;
  }

  &_content {
    min-height: auto;
    // background: @main-content;
    height: 100%;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
}
</style>
