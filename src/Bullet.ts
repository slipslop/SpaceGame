import Drawable from './iDrawable';
import Canvas from './Canvas';
import Config from './Config';

class Bullet implements Drawable {

    public posX : number;
    public posY: number;
    public angle: number;
    private velocity = 100;
    private config : Config;

    constructor(posX : number, posY: number, angle: number){

        this.posX = posX; 
        this.posY = posY;
        this.angle = angle;
        this.config = new Config();
    }

    draw(canvas: Canvas){

        canvas.setStrokeStyle('red', 1.5);
        
        let ctx = canvas.getCtx();

        ctx.beginPath();

        ctx.moveTo(
            this.posX,
            this.posY,
        );

        ctx.lineTo(
            this.posX + 15,
            this.posY,
        );

        ctx.stroke();
    
        this.posX += (this.velocity * Math.cos(this.angle) / 30);
        this.posY -=(this.velocity * Math.sin(this.angle) / 30);
    
    }

    checkOutOfBounds(canvas: Canvas){

        if( this.posX > canvas.getWidth() || this.posX < 0 ) return true;

        if( this.posY > canvas.getHeight() || this.posY < 0 ) return true;

    }

}

export default Bullet;