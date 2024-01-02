import {
  svgElement,
  startButtonElement,
  stopButtonElement
} from './elements'

const data = {
  running: false
}

// 背景の線のY座標を格納する配列。
const lineYs = []

// 背景の線を描画する。
for (let i = 0; i <= 100; i = i + 10) {
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
  line.setAttribute('points', `0 ${i}, 100 ${i}`)
  line.classList.add('background-line')
  svgElement.appendChild(line)
  lineYs.push(i)
}

startButtonElement.addEventListener('click', () => {
  data.running = true
  startButtonElement.disabled = true
  stopButtonElement.disabled = false
  run()
})

stopButtonElement.addEventListener('click', () => {
  data.running = false
  startButtonElement.disabled = false
  stopButtonElement.disabled = true
})

function run (): void {}
