<template>
  <div class="outer">
    <div class="nav-main" ref="navbox">
      <canvas id="nav-canvas" style="position: absolute; z-index: -1; left: 0"></canvas>
      <span v-for="(item, index) in navs" :key="index" class="nav-span">
        <a class="nav-link" :class="{ 'nav-active': index === activeIndex }" @click="toggleNav(item, index)">
          <span>
            <customRender :rich="item.render" :item="item"></customRender>
          </span>
        </a>
      </span>
    </div>
  </div>
</template>

<script>
import { NavCanvas } from "./nav-canvas";
import { debounce } from "@/utils/index"
const defaultNav = [
  {
    icon: "el-icon-menu",
    key: "screen",
    name: "大屏管理",
  },
  {
    icon: "el-icon-folder-opened",
    key: "category",
    name: "分类管理",
  },
  {
    icon: "el-icon-location-information",
    key: "menu",
    name: "菜单管理",
  },
  {
    icon: "el-icon-set-up",
    key: "portal",
    name: "门户管理",
  },
  {
    icon: "el-icon-set-up",
    key: "permission",
    name: "权限管理",
  },
  /*{
        icon: 'el-icon-set-up',
        name: '数据源管理'
      }, {
        icon: 'el-icon-document',
        name: '接口文档'
      }, {
        icon: 'el-icon-document',
        name: '在线文档'
      }, {
        icon: 'el-icon-thumb',
        name: '点击购买'
      }*/
];

export default {
  name: "NavCanvas",
  components: {
    customRender: {
      props: {
        item: {},
        rich: {
          type: Function,
          default: (h, item) => {
            return <div></div>
          },
        },
      },
      render: function (h) {
        return this.rich(h, this.item)
      },
    },
  },
  props: {
    value: {},
    list: {
      type: Array,
      default: () => {
        return [{
          render(h) {
            return <div>111</div>
          },
          key: 1
        },{
          render(h) {
            return <div>222</div>
          },
          key: 2
        },{
          render(h) {
            return <div>333</div>
          },
          key: 3
        }]
      }
    }
  },
  data() {
    return {
      nc: null,
      navs: [],
      observer: null
    };
  },
  computed: {
    activeIndex() {
      const index = this.navs.map((_) => _.key).indexOf(this.value);
      return index > -1 ? index : 0;
    },
    activeNav() {
      return this.navs.find((_) => _.key == this.value);
    },
  },
  async mounted() {
    await this.getRouteList();
    if (!this.navs.length) return;
    this.nc = new NavCanvas(
      "nav-canvas",
      ".nav-main .nav-span",
      this.activeIndex
    );
    this.toggleNav(this.navs[0], 0);
    const box = this.$refs.navbox
    this.observer = new ResizeObserver(debounce(entries => {
      for (let entry of entries) {
        // 获取盒子的新宽度
        // const newWidth = entry.contentRect.width;
        console.log('盒子宽度变化为：');
        this.nc?.resize?.()
      }
    }, 10));
    this.observer.observe(box);
  },
  destroyed() {
    this.observer.disconnect(this.$refs.navbox)
  },
  methods: {
    async getRouteList() {
      this.navs = this.list
    },
    toggleNav(nav, index) {
      this.$emit("input", nav.key);
      this.$nextTick(() => {
        this.nc.toggle(this.activeIndex);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.outer {
  width: 100vh;
  height: 60px;
  transform: rotate(90deg) translateX(-60px);
  transform-origin: left bottom;
}

.nav-main {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  user-select: none;
  height: 60px;

  canvas {
    width: 100%;
  }

  .nav-span {
    padding-top: 7px;

    .nav-link {
      text-align: center;
      transition: color 0.2s;
      text-decoration: none !important;
      display: block;
      color: #b9c2cc;
      width: 124px;
      text-align: center;
      height: 60px;
      font-size: 14px;
      cursor: pointer;

      // padding: 0 40px;
      >span {
        display: inline-block;
        transform: rotate(270deg) translateX(40px);
        transform-origin: center;
        width: 60px;
        height: 124px;
        line-height: 20px;
        padding: 12px 8px 0 3px;
        box-sizing: border-box;
        overflow: hidden;
      }

      &.nav-active,
      &:hover {
        color: #fff !important;
      }
    }
  }
}
</style>