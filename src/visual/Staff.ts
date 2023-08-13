import Clef from "./Clef.js"
import Note from "./Note.js";
import Score from "./Score.js";
export default class Staff {
  score: Score;
  name: string;
  position: { top: number, left: number };
  width: number;
  lines: number;
  children: any[];
  height: number
  size: number
  constructor (
    score: Score,
    name: string,
    position: { top: number, left: number } = {
      left: 20,
      top: 20
    },
    width: number
  ) {
    this.score = score // Pointer to containing score
    this.name = name
    this.lines = 5;
    this.size = 1; // Ratio of staff size
    this.width = width;
    this.position = position;
    this.children = []; 
    this.height = (this.lines-1)*this.size*score.rastralSize
  }
  drawLines (): void {
    const { score } = this
    for (let l = 0; l < this.lines; l++) {
      score.ctx.strokeStyle = `${score.lineWidth}px black`
      score.ctx.moveTo(
        this.position.left, 
        this.position.top+l*this.size*score.rastralSize)
      score.ctx.lineTo(
        this.position.left+this.width, 
        this.position.top+l*this.size*score.rastralSize)
      score.ctx.stroke()
    }
  }
  drawLabel (): void {
    const { score } = this
    const ctx = score.ctx
    const fontSize = 3*this.size*score.rastralSize;
    ctx.textAlign = "right"
    ctx.font = `${fontSize}px ${score.textFont}`
    ctx.fillText(this.name,
      this.position.left - score.rastralSize,
      this.position.top + score.rastralSize*3)
  }
  draw (): void {
    this.drawLines()
    this.drawLabel()
    this.children.forEach(child => child.draw())
  }
  addClef (clef: string): Clef {
    this.children.push( new Clef( this.score, this, clef))
    return this.children[this.children.length - 1]
  }
  addNote (glyph: string, position: { top: number, left: number }, accidental: string): Note {
    this.children.push(
      new Note(this.score, this, position, glyph, accidental))
    return this.children[this.children.length - 1]
  }
}
