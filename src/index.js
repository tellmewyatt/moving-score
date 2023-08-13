import Score from './visual/Score.js'

const score = new Score(document.body)
score.init().then(() => {
  const system = score.addSystem({ top: 20, left: 200 }, 200)
  const ViolinI = system
    .addStaff("Violin I")
  ViolinI.addClef("gClef")
  const note =ViolinI.addNote("noteheadBlack", {left: 50, top: 0})
  note.length = 500
  system
    .addStaff("Violin II")
    .addClef("gClef")
  system.addStaff("Viola")
    .addClef("cClef")
  score.draw()
})
