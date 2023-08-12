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
    this.spacing = 1; // Ratio to score spacing
    this.width = width;
    this.position = position;
    this.children = []; 
  }
  drawLines () {
    const { score } = this
    for (let l = 0; l < this.lines; l++) {
      score.ctx.strokeStyle = `${score.lineWidth}px black`
      score.ctx.moveTo(
        this.position.left, 
        this.position.top+l*this.spacing*score.staffSpacing)
      score.ctx.lineTo(
        this.position.left+this.width, 
        this.position.top+l*this.spacing*score.staffSpacing)
      score.ctx.stroke()
    }
  }
  draw () {
    this.drawLines()
    this.children.forEach(child => child.draw())
  }
}
