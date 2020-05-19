import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: BackToTop.name })
export default class BackToTop extends Vue {
  @Prop({ default: 400 }) private visibilityHeight!: number
  @Prop({ default: 'fade' }) private transitionName!: string
  @Prop({ default: 0 }) private backPosition!: number
  @Prop({
    default: () => {
      return {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px',
        background: '#e7eaf1'
      }
    }
  })
  private customStyle!: object

  private visible = false
  private isMoving = false
  private interval?: number

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  private handleScroll() {
    this.visible = window.pageYOffset > this.visibilityHeight
  }

  private backToTop() {
    if (this.isMoving) return
    const start = window.pageYOffset
    let i = 0
    this.isMoving = true
    const interval = setInterval(() => {
      const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500))
      if (next <= this.backPosition) {
        window.scrollTo(0, this.backPosition)
        clearInterval(interval)
        this.isMoving = false
      } else {
        window.scrollTo(0, next)
      }
      i++
    }, 16.7)
  }

  private easeInOutQuad(t: number, b: number, c: number, d: number) {
    // tslint:disable-next-line: no-conditional-assignment
    if ((t /= d / 2) < 1) return (c / 2) * t * t + b
    return (-c / 2) * (--t * (t - 2) - 1) + b
  }
}
