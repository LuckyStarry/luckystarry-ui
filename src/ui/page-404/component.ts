import { v4 as uuid } from 'uuid'
import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'Page404' })
export default class Page404 extends Vue {
  public randomStyle(): any {
    let top: number = random(0, 100)
    let left: number = random(0, 100)
    let fontSize: number = Math.round(random(12, 36))
    let blur: number = Math.round(random(2, 200)) / 100
    let delay: number = Math.round(random(20, 40))
    let keyframes: string = animations[Math.round(random(0, 3))]
    return {
      ['top']: `${top}%`,
      ['left']: `${left}%`,
      ['font-size']: `${fontSize}px`,
      ['filter']: `blur(${blur}px)`,
      ['animation']: `${delay}s ${keyframes} infinite`
    }
  }

  public particles(text: string) {
    let length = Math.round(random(30, 50))
    let list = []
    for (let i = 0; i < length; i++) {
      list.push({ id: uuid(), style: this.randomStyle(), text })
    }
    return list
  }
}

const animations = ['float', 'floatReverse', 'float2', 'floatReverse2']

function random(min: number, max: number): number {
  let range = max - min
  let rand = Math.random()
  return min + rand * range
}
