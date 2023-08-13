import System from "./System.js"
export default class Score {
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  glyphs: any;
  fontMeta: any;
  rastralSize: number;
  durationThickness: number;
  durationMargin: number;
  lineWidth: number;
  children: any[]
  textFont: string;
  constructor(container: HTMLElement) {
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
    this.textFont = "Georgia"
  }
  setupCanvas(){
    const {canvas, container} = this
    const dpr = window.devicePixelRatio;
    canvas.setAttribute("width", 
      `${container.clientWidth}px`)
    canvas.setAttribute("height", 
      `${container.clientHeight}px`)
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width*dpr;
    canvas.height = rect.height*dpr;
    canvas.style.height = "100%"
    canvas.style.width = "100%"
    this.ctx.scale(dpr, dpr)
  }
  async init(){
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
  glyph(glyphname: string):string {
    try {
    return decodeURIComponent(JSON.parse(
      `"\\u${this.glyphs[glyphname].codepoint.slice(2)}"`));
    }
    catch {
      console.error(`Glyph ${glyphname} not found`)
      return "Error"
    }
  }
  getGlyphBBox(glyphname: string): { bBoxNE: [number, number], bBoxSW: [number, number] } {
    try {
      return this.fontMeta.glyphBBoxes[glyphname]
    }
    catch {
      throw Error(`Unable to find bounding box for glyph ${glyphname}`)
    }
  }
  addSystem(position: { top: number, left: number }, width: number): System {
    this.children.push(new System(this, position, width))
    return this.children[this.children.length-1]
  }
  draw(): void {
    this.children.forEach(child => child.draw())
  }
}
