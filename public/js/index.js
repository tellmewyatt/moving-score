const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")
let GlyphNames;
document.body.appendChild(canvas)
canvas.setAttribute("width", window.innerWidth)
canvas.setAttribute("height", window.innerHeight)
function setupCanvas() {
  const dpr = window.devicePixelRatio;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height =rect.height * dpr;
  ctx.scale(dpr, dpr)
  canvas.style.width = `${rect.width}px`
  canvas.style.height = `${rect.height}px`
}
const GLOBALS = {
  staffSpacing: 5,
  lineWidth: 1
}
const Staff = {
  lines: 5,
  spacing: 1,
  width: 500,
  position: {
    left: 20,
    top: 20
  },
  drawLines: function () {
    for (let l = 0; l < this.lines; l++) {
      ctx.strokeStyle = `${GLOBALS.lineWidth}px black`
      ctx.moveTo(
        this.position.left, 
        this.position.top+l*this.spacing*GLOBALS.staffSpacing)
      ctx.lineTo(
        this.position.left+this.width, 
        this.position.top+l*this.spacing*GLOBALS.staffSpacing)
      ctx.stroke()
    }
  },
  draw: function () {
    this.drawLines()
  }
}
const Clef = {
  draw: function () {
    ctx.font = "36px 'Music'" 
    console.log(Glyph("gClef"))
    ctx.fillText(Glyph("gClef"), 100, 100)
    ctx.fill()
  }
}
async function loadFonts() {
  const MusicFont = await new FontFace("Music", 
    "url(/fonts/Leland/Leland.otf)").load()
  document.fonts.add(MusicFont)
  const response = await fetch(`/glyphnames.json`)
  GlyphNames = await response.json()
  return true
}
function Glyph(string) {
  return decodeURIComponent(JSON.parse(`"\\u${GlyphNames[string].codepoint.slice(2)}"`));
}
loadFonts().then(() => {
  setupCanvas()
  Staff.draw()
  Clef.draw()
  const con = document.createElement("div")
  document.body.appendChild(con)
})
