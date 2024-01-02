import {
  svgElement,
  startButtonElement,
  stopButtonElement,
  paiElement,
  inCountElement,
  outCountElement,
  inRatioElement,
  outRatioElement
} from './elements'

const data = {
  running: false,
  count: {
    in: 0,
    out: 0
  }
}

const size = 100
const interval = 10

// 背景の線のY座標を格納する配列。
const lineYs: number[] = []

// 背景の線を描画する。
for (let i = 0; i <= size; i = i + interval) {
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

function run (): void {
  if (!data.running) return

  const newLine = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
  const x = getRandom(size)
  const y = getRandom(size)
  const degree = getRandom(360)
  const r = 5
  const dx = Math.cos(Math.PI / 180 * degree) * r
  const dy = Math.sin(Math.PI / 180 * degree) * r

  const xx = x + dx
  const yy = y + dy

  const isTouched = lineYs.some(lineY => inRange(lineY, y, yy))

  if (isTouched) {
    newLine.style.stroke = 'red'
    data.count.in++
  } else {
    newLine.style.stroke = 'blue'
    data.count.out++
  }

  newLine.setAttribute('points', `${x} ${y}, ${xx} ${yy}`)
  newLine.classList.add('needle')
  svgElement.appendChild(newLine)

  show()

  requestAnimationFrame(run)
}

function getRandom (x: number): number {
  return Math.random() * x
}

function inRange (x: number, min: number, max: number): boolean {
  return ((x - min) * (x - max) <= 0)
}

function show (): void {
  inCountElement.textContent = data.count.in.toString()
  outCountElement.textContent = data.count.out.toString()

  const both = data.count.in + data.count.out

  inRatioElement.textContent = ((data.count.in / both) * 100).toFixed(5)
  outRatioElement.textContent = ((data.count.out / both) * 100).toFixed(5)

  paiElement.textContent = (both / data.count.in).toFixed(15)
}
