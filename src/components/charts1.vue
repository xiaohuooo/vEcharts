<template>
  <div class="chart" ref="chart" :style="style"></div>
</template>

  <script>
import * as echarts from 'echarts'
// import elementResizeDetectorMaker from "element-resize-detector";  //监测DOM元素大小变化包
export default {
  name: 'Chart',
  data() {
    return {
      chart: '',
    }
  },
  props: {
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
    },
    option: {
      type: Object,
      default() {
        return {
          title: {
            text: 'ECharts',
          },
          tooltip: {},
          legend: {
            data: [],
          },
          xAxis: {
            type: 'category',
            data: [],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [],
              type: 'line',
            },
          ],
        }
      },
    },
  },
  computed: {
    style() {
      return {
        width: this.width,
        height: this.height,
      }
    },
  },
  watch: {
    option: {
      handler(newVal, oldVal) {
        if (this.chart) {
          this.chart.setOption(newVal)
          this.chart.resize()
        } else {
          this.init()
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.init()
    window.addEventListener("resize", this.handleWindowResize);
    this.addChartResizeListener();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleWindowResize);
  },
  methods: {
    addChartResizeListener() {
      const instance = elementResizeDetectorMaker({
        strategy: "scroll",
        callOnAdd: true,
      });

      instance.listenTo(this.$el, () => {
        this.handleWindowResize()
      });
    },
    handleWindowResize() {
      if (!this.chart) return;
      this.chart.resize();
    },
    forceUpdate() {
      this.chart?.clear?.()
    },
    init() {
      this.chart = echarts.init(this.$refs.chart)
      this.chart.resize()
      this.chart.setOption(this.option)
      this.bindClick()
    },
    bindClick() {
      this.chart.off('click')
      this.chart.on('click', (e) => {
        if (e.marker) {
          this.$emit('click', e)
        }
      })
    },
  },
}
</script>
