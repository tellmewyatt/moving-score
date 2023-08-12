import Clef from "./Clef.js"
export default class Staff {
  constructor (
    score,
    name,
    position = {
      left: 20,
      top: 20
    },
    width
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
  drawLines () {
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
  draw () {
    this.drawLines()
    this.children.forEach(child => child.draw())
    console.log("drawing staff")
  }
  addClef (clef) {
    this.children.push( new Clef( this.score, this, clef))
  }
}
