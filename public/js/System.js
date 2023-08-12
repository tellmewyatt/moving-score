import Staff from "./Staff.js"
export default class System {
  constructor(score, position, width) {
    this.score = score
    this.position = position;
    this.width = width
    this.children = []
    this.staffSpacing = 100 
  }
  getLastStaff() {
    const { children } = this
    let lastStaff = null
    children.forEach(child => {
      if(child instanceof Staff) lastStaff = child
    })
    return lastStaff
  }
  addStaff(name) {
    // Returns the added Staff object
    const { score, position, width, staffSpacing } = this
    const lastStaff = this.getLastStaff()
    let pos = {
      top: position.top,
      left: position.left
    }
    if(lastStaff !== null) 
      pos.top = position.top+lastStaff.position.top+staffSpacing
    this.children.push(new Staff(
      score,
      name,
      pos,
      width,
    )) 
    return this.children[this.children.length-1]
  }
  draw() {
    const { score, children, position } = this
    let bottomStaff = null
    children.forEach(child => {
      child.draw()
      if(child instanceof Staff) bottomStaff = child
    })
    let endPosition = null
    if(bottomStaff) endPosition = {
      left: position.left,
      top: position.top
      +bottomStaff.position.top
    }
    score.ctx.strokeStyle = `${score.lineWidth}px black`
    score.ctx.moveTo(position.left, position.top)
    score.ctx.lineTo(endPosition.left, endPosition.top)
    score.ctx.stroke();
  }
}
