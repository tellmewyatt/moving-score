import Score from "./Score";
import Staff from "./Staff";

export default class Clef {
  clef: string;
  score: Score;
  staff: Staff;
  position: { top: number, left: number }
  constructor (score: Score, staff: Staff, clef: string = "gClef") {
    this.clef = clef
    this.score = score
    this.staff = staff
    this.position = {
      top: clef === "gClef" ? 3 : clef === "fClef" ? 1 : 2,
      left: 0.5 
    }
  }
  draw(): void {
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
