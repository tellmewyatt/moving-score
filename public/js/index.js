import Score from './Score.js'

const score = new Score(document.body)
score.init().then(() => {
  score.addStaff("Violin I", { top: 20, left: 20}, 200)
  score.draw()
})
