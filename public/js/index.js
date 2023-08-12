import Score from './Score.js'

const score = new Score(document.body)
score.init().then(() => {
  const system = score.addSystem({ top: 20, left: 20 }, 200)
  system
    .addStaff("Violin I")
    .addClef("gClef")
  system
    .addStaff("Violin II")
    .addClef("gClef")
  system.addStaff("Viola")
    .addClef("cClef")
  score.draw()
})
