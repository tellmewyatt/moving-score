export default class Clef {
  constructor (score, staff, clef = "gClef") {
    this.clef = clef
    this.score = score
    this.staff = staff
    this.position = {
      top: clef === "gClef" ? 3 : clef === "fClef" ? 1 : 2,
      left: 0.5 
    }
  }
  draw() {
    const { score, staff, position, clef } = this;
    const spacing =score.spacing*staff.spacing;
    score.ctx.font = `${spacing*staff.lines}px 'Music'` 
    score.ctx.fillText(score.glyph(clef), staff.position.left+position.left*spacing ,staff.position.top+position.top*spacing)
    score.ctx.fill()
  }
}
