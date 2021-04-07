class Canvas{

    public canv: HTMLCanvasElement;
    private ctx;

    constructor() {
        
        this.canv = <HTMLCanvasElement> document.getElementById("gameCanvas");
        
        this.ctx = this.canv.getContext("2d");

    }

    getHeight() {
        return this.canv.height;
    }

    getWidth(){
        return this.canv.width;
    }

    getCtx(){
        return this.ctx;
    }

    setBackground(color: string){
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0,0, this.getWidth(), this.getHeight());
    }

    setStrokeStyle(color: string, width: number) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
    }

    drawBackground(color: string) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.getWidth(), this.getHeight());
    }

}

export default Canvas;