

export class NavCanvas {
    j = 0.85;
    k = 10;
    l = 4;
  
    canvas;
    tabs;
  
    pattern;
  
    tabWidthList;
    tabHeight = 0
  
    opt = {
      currentIndex: 0,
      nextIndex: 1,
      speed: 1,
      timer: 0,
      width: 200,
      height: 100,
      animating: false,
      curDisX: 0,
      distance: 0,
    }
    constructor(el, tabSelector, selectedTabIndex = 0) {
      this.canvas = document.getElementById(el)
      this.tabs = document.querySelectorAll(tabSelector)
  
      const { opt } = this
      this.calcTabs()
      this.initCanvas(this.canvas, opt.width, opt.height)
      this.createPattern(this.canvas)
      this.createBootomLine(this.canvas)
      this.startDraw(0)
  
      this.toggle(selectedTabIndex)
    }
  
    initCanvas (canvas, width, height) {
      const ctx = canvas.getContext('2d')
      const { devicePixelRatio } = window
      canvas.width = width * devicePixelRatio
      canvas.height = height * devicePixelRatio
      // canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
  
    calcTabs () {
      const { opt, tabs } = this
      const ws = []
      let totalWidth = 0
      tabs.forEach(node => {
        ws.push(totalWidth)
        totalWidth += node.offsetWidth
      })
  
      ws[0] = -20
      ws.push(totalWidth)
  
      this.tabWidthList = ws
      console.log(ws, '-ws')
      this.tabHeight = tabs[0].offsetHeight + 0
      opt.height = this.tabHeight + 20
      opt.width = parseInt(window.getComputedStyle(this.canvas, null).width)
      console.log(opt, '-opt')
    }

    createBootomLine(canvas) {
      const { opt } = this
      const ctx = canvas.getContext('2d')
      ctx.lineWidth = 1
      ctx.strokeStyle = `#fff`
      //开始一条路径
      ctx.beginPath()
      //把路径移动到画布中的指定点，不创建线条
      ctx.moveTo(20, 20)
      //添加一个新点，然后在画布中创建从该点到最后指定点的线条
      ctx.lineTo(opt.width, 20)
      //绘制已定义的路径
      ctx.stroke()
      //创建从当前点回到起始点的路径
      ctx.closePath()
    }

    createPattern (canvas) {
      const w = 140, h = 63, r = 1
      const imgCanvas = document.createElement('canvas')
  
      imgCanvas.width = w
      imgCanvas.height = h
      imgCanvas.style.width = `${w / r}px`
      imgCanvas.style.height = `${h / r}px`
  
      const ctx = imgCanvas.getContext('2d')
      //缩放 宽高 100%
      ctx.scale(r, r)
      const gradient = ctx.createLinearGradient(0, 0, 0, imgCanvas.height);
      gradient.addColorStop(0, 'rgba(29, 190, 171, 0.8)'); // 不透明的#1DBEAB
      gradient.addColorStop(1, 'rgba(29, 190, 171, 0)'); // 透明的#1DBEAB
 
      this.pattern = gradient
    }
  
    calcAVGSpeed (a) {
      const { l, j, k } = this
      let b = (l * j * a + k * (1 - j) * a) / (k * l * 20)
      b = Math.max(Math.abs(b), 2.5) * Math.sign(b)
      return b
    }
  
    getCurSpeed (a, b) {
      const { l, j, k, opt } = this
      return Math.abs(a) > Math.abs(j * b) ? l * opt.speed : k * opt.speed
    }
  
    calCurve (ctx, a, b, c, d, e) {
      ctx.bezierCurveTo(a + e, b, c - e, d, c, d)
    }
  
    drawHightlight (index) {
      const { opt } = this
      const ctx = this.canvas.getContext('2d')
      const d = 0.3
  
      //clearRect 在给定的矩形内清除指定的像素,这里清完了
      ctx.clearRect(0, 0, 2 * opt.width, 2 * opt.height)
      ctx.shadowColor = 'rgba(29,190,171, 1)'
      ctx.shadowBlur = 5
      ctx.strokeStyle = '#004CB3'
      ctx.lineWidth = 0.8
      ctx.fillStyle = 'none'
      this.draw(ctx, false)
  
      //这里绘制了外围边框线条
      const gradient = ctx.createLinearGradient(0, 0, opt.width, opt.height)
      const f = index - d
      gradient.addColorStop(Math.min(1, Math.max(0, 0 + f)), 'rgba(0,0,0,0)')
      gradient.addColorStop(Math.min(1, Math.max(0, 0 + f + 0.1)), '#8ed6ff')
      gradient.addColorStop(Math.min(1, 0 + f + d), '#8ed6ff')
      gradient.addColorStop(Math.min(1, 0 + f + d + 0.1), 'rgba(0,0,0,0)')
      gradient.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.lineWidth = 1.5
      ctx.strokeStyle = gradient
      ctx.fillStyle = this.pattern
      this.draw(ctx, true)
    }
  
    startDraw (index) {
      this.drawHightlight(index)
  
      this.opt.timer = requestAnimationFrame(() => {
        this.startDraw((index + 0.005) % 1.6)
      })
    }
  
    draw (ctx, trueorfalse) {
      const { opt, tabWidthList, tabHeight } = this
      const navindex = opt.currentIndex
      const tableHeight = tabHeight
      const f = 0,
        g = 40,
        i = 20,
        j = 0.5,
        k = 2.5
      let l = 0
  
      ctx.beginPath()
      ctx.moveTo(-50, opt.height + 10)
      ctx.lineTo(-50, tableHeight + j)
  
      if (opt.animating) {
        const m = this.getCurSpeed(opt.curDisX, opt.distance)
        l = Math.min(Math.abs(opt.distance), Math.abs(opt.curDisX + m)) * Math.sign(m)
      }
  
      ctx.lineTo(f + tabWidthList[navindex] + l - g / 2, tableHeight + j)
      this.calCurve(
        ctx,
        f + tabWidthList[navindex] + l - g / 2,
        tableHeight + j,
        f + tabWidthList[navindex] + l + g / 2,
        k + j,
        i,
      )
  
      if (opt.animating) {
        const o = tabWidthList[opt.nextIndex + 1] - tabWidthList[opt.nextIndex]
        ctx.lineTo(f + tabWidthList[navindex] + o + l - g / 2, k + j)
        this.calCurve(
          ctx,
          f + tabWidthList[navindex] + o + l - g / 2, k + j,
          f + tabWidthList[navindex] + o + l + g / 2,
          tableHeight + j,
          i,
        )
      } else {
        //lineTo 添加一个新点 宽度长度
        ctx.lineTo(f + tabWidthList[navindex + 1] + l - g / 2, k + j)
        this.calCurve(
          ctx,
          f + tabWidthList[navindex + 1] + l - g / 2, k + j,
          f + tabWidthList[navindex + 1] + l + g / 2,
          tableHeight + j,
          i,
        )
      }
  
      ctx.lineTo(opt.width + 10, tableHeight + j)
      ctx.lineTo(opt.width + 10, opt.height + 10)
      ctx.closePath()
      ctx.stroke()
  
      if (trueorfalse) {
        ctx.fill()
      }
  
      if (trueorfalse && opt.animating) {
        opt.curDisX = l
        if (Math.abs(l) >= Math.abs(opt.distance)) {
          opt.animating = false
          opt.currentIndex = opt.nextIndex
        }
      }
    }
  
    toggle (navindex) {
      const { opt, tabWidthList } = this
      if (navindex !== opt.currentIndex
        && tabWidthList
        && tabWidthList.length
        && (!opt.animating || navindex !== opt.nextIndex)) {
        opt.animating = true
        opt.distance = tabWidthList[navindex] - tabWidthList[opt.currentIndex]
        opt.speed = this.calcAVGSpeed(opt.distance)
        opt.curDisX = 0
        opt.nextIndex = navindex
      }
    }
  
    resize () {
      const { opt } = this
      if (opt.timer) {
        cancelAnimationFrame(opt.timer)
      }
      this.calcTabs()
      this.initCanvas(this.canvas, opt.width, opt.height)
      this.startDraw(0)
    }
  }
  