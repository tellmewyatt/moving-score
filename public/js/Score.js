import Staff from "./Staff.js"
export default class Score {
  constructor(container) {
    this.container = container;
    this.canvas = document.createElement("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.glyphs;
    this.staffSpacing = 5;
    this.lineWidth = 1;
    this.container.appendChild(this.canvas)
    this.children = []
  }
  setupCanvas() {
    const dpr = window.devicePixelRatio;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.setAttribute("width", 
      this.container.clientWidth)
    this.canvas.setAttribute("height", 
      this.container.clientHeight)
    this.canvas.width = rect.width * dpr;
    this.canvas.height =rect.height * dpr;
    this.ctx.scale(dpr, dpr)
    this.canvas.style.width = `${rect.width}px`
    this.canvas.style.height = `${rect.height}px`
  }
  async init() {
    await this.loadFonts()
    this.setupCanvas()
    return true
  }
  async loadFonts() {
    const MusicFont = await new FontFace("Music", 
      "url(/fonts/Leland/Leland.otf)").load()
    document.fonts.add(MusicFont)
    const response = await fetch(`/glyphnames.json`)
    this.glyphs = await response.json()
    return true
  }
  glyph(string) {
    return decodeURIComponent(JSON.parse(
      `"\\u${this.glyphs[string].codepoint.slice(2)}"`));
  }
  addStaff(name, position, width) {
    this.children.push(new Staff(
    this,
    name,
    position = {
      left: 20,
      top: 20
    },
    width
    )) 
  }
  draw() {
    for (let child of this.children) {
      child.draw()
    }
  }
}
