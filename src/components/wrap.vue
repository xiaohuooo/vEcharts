<template>
  <div class="wrap_container">
    <titleBox :title="title">
      <span
        v-if="showToggle"
        @click="toggle"
        class="toggle"
        :class="{ toggled: toggled }"
      ></span>
    </titleBox>
    <div class="content" v-show="!toggled">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import titleBox from "./title.vue";
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    showToggle: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    titleBox,
  },
  data() {
    return {
      toggled: false,
    };
  },
  methods: {
    toggle() {
      this.toggled = !this.toggled;
    },
  },
};
</script>

<style lang="less" scoped>
.wrap_container {
  width: 344px;
  .toggle {
    width: 20px;
    height: 20px;
    display: inline-block;
    // background: url("~@/assets/plyh/home/arrow_top.png") no-repeat;
    background-position: center center;
    background-size: 62 * 0.5px 50 * 0.5px;
    cursor: pointer;
    transition: all 0.2s ease;
    &.toggled {
      transform: rotate(180deg);
    }
  }
  .content {
    font-size: 14px;
    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    line-height: 25px;
    text-indent: 2em;
    text-align: left;
  }
}
</style>
