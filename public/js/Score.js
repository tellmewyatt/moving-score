import System from "./System.js"
export default class Score {
  constructor(container) {
    this.container = container;
    this.canvas = document.createElement("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.glyphs;
    this.rastralSize = 5;
    this.lineWidth = 1;
    this.container.appendChild(this.canvas)
    this.children = []
  }
  setupCanvas() {
    const {canvas, container} = this
    const dpr = window.devicePixelRatio;
    canvas.setAttribute("width", 
      container.clientWidth)
    canvas.setAttribute("height", 
      container.clientHeight)
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width*dpr;
    canvas.height = rect.height*dpr;
    canvas.style.height = "100%"
    canvas.style.width = "100%"
    this.ctx.scale(dpr, dpr)
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
  addSystem(position, width) {
    this.children.push(new System(this, position, width))
    return this.children[this.children.length-1]
  }
  draw() {
    this.children.forEach(child => child.draw())
  }
}
