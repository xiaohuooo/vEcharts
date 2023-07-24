<template>
  <div class="title">
    <span class="word">{{ title }}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: left;
  align-items: center;
  padding-left: 32px;
  margin-bottom: 10px;
  height: 38px;
  //   background: url("~@/assets/plyh/home/title_short.png");
  background-size: 100%;
  font-size: 22px;
  font-family: YouSheBiaoTiHei;
  font-weight: 400;
  color: #ffffff;
  line-height: 38px;
  text-shadow: 0px 0px 9px #158eff;
  .word {
    font-size: 22px;
    font-family: YouSheBiaoTiHei-Regular, YouSheBiaoTiHei;
    font-weight: 400;
    color: #ffffff;
    line-height: 38px;
    text-shadow: 0px 0px 9px #158eff;
    -webkit-background-clip: text;
    -webkit-text-fill-color: #fff;
  }
}
</style>
