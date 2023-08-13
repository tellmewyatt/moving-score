import Score from "./Score";
import Staff from "./Staff";

export default class Note {
  score: Score;
  staff: Staff;
  position: { top: number, left: number };
  glyphName: string;
  glyph: string
  accidental: string;
  length: number
  constructor (score: Score, staff: Staff, position: { top: number, left: number }, glyph: string, accidental: string) {
    this.score = score;
    this.staff = staff;
    // position.top is in notes from top line
    // position.left is in pixels
    this.position = position 
    this.glyphName = glyph;
    this.glyph = score.glyph(glyph)
    this.accidental = accidental // Provide accidental as glyph
    this.length = 0 
  } 
  getTruePosition(): { top: number, left: number }{
    const { score, staff, position } = this
    return {
      top: staff.position.top + position.top*score.rastralSize/2,
      left: staff.position.left + position.left
    }
  }
  draw(): void {
    const { glyph, score, staff } = this
    const pos = this.getTruePosition()
    const spacing =score.rastralSize*staff.size;
    score.ctx.textAlign = "left"
    score.ctx.font = `${spacing*(staff.lines-1)}px 'Music'` 
    score.ctx.fillStyle = "black"
    score.ctx.fillText(glyph, pos.left, pos.top)
    score.ctx.fill()
    if(this.length > 0) this.drawLength()
  }
  getWidth(): number {
    const bBox = this.score.getGlyphBBox(this.glyphName)
    return bBox.bBoxNE[1] - bBox.bBoxSW[1]
  }
  drawLength(): void {
    const {score, staff} = this
    const bBox = score.getGlyphBBox(this.glyphName)
    const thickness = score.durationThickness*score.rastralSize
    const spacing = score.rastralSize*staff.size;
    const takenWidth = (bBox.bBoxNE[1]-bBox.bBoxSW[1])*spacing+score.durationMargin*spacing
    const position = this.getTruePosition()
    if(takenWidth < this.length) {
      this.score.ctx.fillRect(
        takenWidth+position.left, 
        position.top - thickness/2,
        this.length - takenWidth,
        thickness)
    }
  }
}
