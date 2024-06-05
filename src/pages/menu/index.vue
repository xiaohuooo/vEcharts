<template>
  <div class="menuNav">
    <Nav :list="list" :value="value" @input="changeValue"></Nav>
  </div>
</template>

<script>
import Nav from '@/components/nav'
export default {
  components: { Nav },
  data() {
    return {
      value: 1,
      list: [
        {
          key: 0,
        },
        {
          render(h) {
            return h('div', { class: 'nav' }, [
              h('img', {
                attrs: {
                  class: 'img',
                  alt: '',
                //   src: require('@/assets/img/renyuan.png'),
                },
              }),
              h('span', { class: 'title' }, '人员'),
              h('br'),
              h('span', { class: 'title' }, '管理'),
            ])
          },
          key: 1,
        },
        {
          render(h) {
            return h('div', { class: 'nav' }, [
              h('img', {
                attrs: {
                  class: 'img',
                  alt: '',
                //   src: require('@/assets/img/huanjing.png'),
                },
              }),
              h('span', { class: 'title' }, '环境'),
              h('br'),
              h('span', { class: 'title' }, '监测'),
            ])
          },
          key: 2,
        },
        {
          render(h) {
            return h('div', { class: 'nav' }, [
              h('img', {
                attrs: {
                  class: 'img',
                  alt: '',
                //   src: require('@/assets/img/shipin.png'),
                },
              }),
              h('span', { class: 'title' }, '视频'),
              h('br'),
              h('span', { class: 'title' }, '监控'),
            ])
          },
          key: 3,
        },
        {
          render(h) {
            return h('div', { class: 'nav' }, [
              h('img', {
                attrs: {
                  class: 'img',
                  alt: '',
                //   src: require('@/assets/img/shebei.png'),
                },
              }),
              h('span', { class: 'title' }, '设备'),
              h('br'),
              h('span', { class: 'title' }, '管控'),
            ])
          },
          key: 4,
        },
      ],
    }
  },
  methods: {
    changeValue(key) {
      if (key !== 0) {
        this.value = key
      }
    },
  },
}
</script>

<style lang="less" scoped>
.menuNav {
  /deep/ .nav {
    .img {
      width: 40px;
      height: 40px;
    //   transform: scale(2);
    }
    .title {
      font-family: PingFang SC, PingFang SC;
      font-size: 14px;
      color: #d7ebff;
      line-height: 18px;
    }
  }
}
</style>