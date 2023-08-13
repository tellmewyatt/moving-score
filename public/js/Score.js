import System from "./System.js"
export default class Score {
  constructor(container) {
    this.container = container;
    this.canvas = document.createElement("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.glyphs;
    this.fontMeta;
    this.rastralSize = 5;
    this.durationThickness = 0.5 // Note continuation width is half the width of the rastral size
    this.durationMargin = 1 // Margin between note and its duration continuation line
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
    const res = await fetch(`../fonts/Leland/leland_metadata.json`)
    this.fontMeta = await res.json()
    return true
  }
  glyph(string) {
    try {
    return decodeURIComponent(JSON.parse(
      `"\\u${this.glyphs[string].codepoint.slice(2)}"`));
    }
    catch {
      console.error(`Glyph ${string} not found`)
      return "Error"
    }
  }
  getGlyphBBox(string) {
    try {
      return this.fontMeta.glyphBBoxes[string]
    }
    catch {
      throw Error(`Unable to find bounding box for glyph ${string}`)
    }
  }
  addSystem(position, width) {
    this.children.push(new System(this, position, width))
    return this.children[this.children.length-1]
  }
  draw() {
    this.children.forEach(child => child.draw())
  }
}
