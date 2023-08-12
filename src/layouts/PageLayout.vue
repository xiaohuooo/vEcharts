<template>
  <a-layout class="client_layout w-100 h-100">
    <div
      style="display: flex; align-items: center; justify-content: space-between"
    >
      <a-menu v-model="current" mode="horizontal" :theme="theme">
        <a-menu-item key="version1">
          <router-link to="/version1">第一版</router-link>
        </a-menu-item>
        <a-menu-item key="version2">
          <router-link to="/version2">第二版</router-link>
        </a-menu-item>
        <a-menu-item key="version3">
          <router-link to="/version3">第三版</router-link>
        </a-menu-item>
        <a-menu-item key="version4">
          <router-link to="/version4">第四版</router-link>
        </a-menu-item>
      </a-menu>
      <a-switch
        default-checked
        checked-children="dark"
        un-checked-children="light"
        @change="changeTheme"
      />
    </div>
    <div
      class="left"
      :style="`--x:${currPath == 'version2' ? ' 402px' : '570px'}`"
    ></div>
    <div
      class="right"
      :style="`--x:${currPath == 'version2' ? ' 402px' : '570px'}`"
    ></div>
    <div class="mid"></div>
    <a-layout-content class="client_content">
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      current: ["version1"],
      theme: "dark", //light dark
    };
  },
  mounted() {},
  computed: {
    currPath() {
      return this.$route.name;
    },
  },

  methods: {
    handleClick(e) {
      console.log("click ", e);
      this.current = e.key;
    },
    changeTheme(checked) {
      this.theme = checked ? "dark" : "light";
    },
  },
};
</script>

<style lang="less" scoped>
@midH: 139;
@otherH: @midH + 0px;

.client {
  &_layout {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .left {
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      width: var(--x);
      height: calc(100%);
      background: linear-gradient(
        90deg,
        #151a30 14%,
        rgba(21, 26, 48, 0.85) 49%,
        rgba(21, 26, 48, 0) 100%
      );
      // z-index: -1;
    }
    .right {
      pointer-events: none;
      position: absolute;
      top: 0;
      right: 0;
      width: var(--x);
      height: calc(100%);
      background: linear-gradient(
        90deg,
        rgba(21, 26, 48, 0) 14%,
        rgba(21, 26, 48, 0.85) 49%,
        #151a30 100%
      );
      // z-index: -1;
    }
    .mid {
      pointer-events: none;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: @midH + 0px;
      background: linear-gradient(
        180deg,
        rgba(8, 25, 53, 0) 0%,
        rgba(8, 25, 53, 0.49) 48%,
        #081935 100%
      );
    }
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
