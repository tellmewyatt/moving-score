var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import System from "./System.js";
export default class Score {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.glyphs;
        this.fontMeta;
        this.rastralSize = 5;
        this.durationThickness = 0.5;
        this.durationMargin = 1;
        this.lineWidth = 1;
        this.container.appendChild(this.canvas);
        this.children = [];
        this.textFont = "Georgia";
    }
    setupCanvas() {
        const { canvas, container } = this;
        const dpr = window.devicePixelRatio;
        canvas.setAttribute("width", container.clientWidth);
        canvas.setAttribute("height", container.clientHeight);
        var rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.height = "100%";
        canvas.style.width = "100%";
        this.ctx.scale(dpr, dpr);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadFonts();
            this.setupCanvas();
            return true;
        });
    }
    loadFonts() {
        return __awaiter(this, void 0, void 0, function* () {
            const MusicFont = yield new FontFace("Music", "url(/fonts/Leland/Leland.otf)").load();
            document.fonts.add(MusicFont);
            const response = yield fetch(`/glyphnames.json`);
            this.glyphs = yield response.json();
            const res = yield fetch(`../fonts/Leland/leland_metadata.json`);
            this.fontMeta = yield res.json();
            return true;
        });
    }
    glyph(string) {
        try {
            return decodeURIComponent(JSON.parse(`"\\u${this.glyphs[string].codepoint.slice(2)}"`));
        }
        catch (_a) {
            console.error(`Glyph ${string} not found`);
            return "Error";
        }
    }
    getGlyphBBox(string) {
        try {
            return this.fontMeta.glyphBBoxes[string];
        }
        catch (_a) {
            throw Error(`Unable to find bounding box for glyph ${string}`);
        }
    }
    addSystem(position, width) {
        this.children.push(new System(this, position, width));
        return this.children[this.children.length - 1];
    }
    draw() {
        this.children.forEach(child => child.draw());
    }
}
//# sourceMappingURL=Score.js.map