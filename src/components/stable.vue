<template>
  <div class="transparent_table">
    <div class="table_header">
      <div :style="{ width: item.width ? item.width : 100 / options.length + '%' }" class="table_header_one" v-for="(item, index) in options" :key="index">
        {{ item.tableName }}
      </div>
    </div>
    <div class="table_body_out" :style="loopOutStyle" :class="{ loop: hasLoop}">
      <div class="table_body" :style="loopInnerStyle">
        <div class="table_tr" v-for="(el, index) in loopData" :key="index">
          <div
            :style="{
              width: item.width ? item.width : 100 / options.length + '%',
            }"
            class="table_body_one"
            v-for="item in options"
            :key="item.prop"
          >
            <a-tooltip :defaultVisible="false" v-tooltip="'multi'" :disabled.sync="el.popdisabled" placement="left" :title="getTitle(el, item)" :get-popup-container="getContainer">
              <template v-if="item.rich">
                <customRender :rich="item.rich" :item="el"></customRender>
              </template>
              <template v-else>
                {{ el[item.prop] }}
              </template>
            </a-tooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  components: {
    customRender: {
      props: {
        item: {},
        rich: {
          type: Function,
          default: (h, item) => {
            return <div></div>;
          },
        },
      },
      render: function (h) {
        return this.rich(h, this.item);
      },
    },
  },
  props: {
    loopCount: {
      type: Number,
    },
    loopInterval: {
      type: Number,
      default: 15
    },
    options: {
      type: Array,
      default: () => [
        {
          tableName: '养护参数',
          prop: 'type',
        },
        {
          tableName: '参数值',
          prop: 'num',
        },
      ],
    },
    data: {
      type: Array,
      default: () => [
        {
          type: '视频监控',
          num: 39,
        },
        {
          type: '挖机',
          num: 48,
        },
        {
          type: '自卸车',
          num: 189,
        },
        {
          type: '11',
          num: 189,
        },
        {
          type: 'bb',
          num: 189,
        },
      ],
    },
  },
  data() {
    return {
      innerTitle: '',
    };
  },
  computed: {
    hasLoop() {
      return this.loopCount > 0 && this.data.length > this.loopCount
    },
    loopInnerStyle() {
      if(this.hasLoop) {
        return {
          'animation-duration': `${this.data.length / this.loopCount * this.loopInterval}s`
        }
      }
      return {}
    },
    loopOutStyle() {
      if(this.hasLoop) {
        return {
          height: 40 * this.loopCount + 'px'
        }
      }
      return {}
    },
    loopData() {
      if(this.hasLoop) {
        return [...this.data, ...this.data]
      } else {
        return this.data
      }
    }
  },
  methods: {
    getContainer() {
      return document.body;
    },
    getTitle(el, item) {
      if (el.popdisabled) return '';
      if (item.rich) {
        return '';
      }
      return el[item.prop] || '';
    },
  },
};
</script>

<style lang="less" scoped>
@keyframes scroll {
  0% {
    transform: translateY(0); /* 初始位置 */
  }
  100% {
    transform: translateY(-50%); /* 向上滚动 100% 的高度 */
  }
}
.transparent_table {
  font-size: 12px;
  color: #fff;
  background: rgba(27, 52, 91, 0.6);
  padding: 8px;
  .table_header {
    display: flex;
    flex-direction: row;
    font-weight: 500;
    height: 28px;
    background: rgba(21, 116, 210, 0.6);
    line-height: 28px;
    padding: 0 10px;
    .table_header_one {
    }
  }
  .table_body_out {
    overflow: hidden;
    &.loop {
      .table_body {
        animation: scroll 10s linear infinite;
      }
    }
  }
  .table_body {
    display: flex;
    flex-direction: column;
    .table_tr {
      display: flex;
      flex-direction: row;
      height: 28px;
      line-height: 28px;
      padding: 0 10px;
      &:nth-child(2n) {
        background: rgba(27, 52, 91, 0.6);
      }
      .table_body_one {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        > span {
          display: inline-block;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
