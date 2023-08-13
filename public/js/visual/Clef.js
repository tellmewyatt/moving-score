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
    const spacing =score.rastralSize*staff.size;
    score.ctx.font = `${spacing*(staff.lines-1)}px 'Music'` 
    score.ctx.textAlign = "left"
    score.ctx.fillText(score.glyph(clef), 
      staff.position.left+position.left*spacing,
      staff.position.top+position.top*spacing)
    score.ctx.fill()
  }
}
