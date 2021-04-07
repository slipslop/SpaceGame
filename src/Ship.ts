import Config from './Config';
import iDrawable from './iDrawable';
import iEventListener from './iEventListener';
import Canvas from './Canvas';
import Bullet from './Bullet';

interface Thrust {
    x : number,
    y: number,
};

class Ship implements iDrawable, iEventListener {

    public posX: number;
    public posY: number;
    public radius: number;
    public angle: number;
    public rotation: number;
    public thrustingUp: boolean;
    public thrustingDown: boolean;
    public thrust: Thrust;
    public bullets: Array<Bullet>;
    public config: Config;

    private shipSize = 30;
    private shipThrust = 5;
    private turnSpeed = 360;
    private bulletFired : Boolean = false;

    constructor(canvas: Canvas){

        this.config = new Config();
        this.posX = canvas.getWidth() / 2;
        this.posY = canvas.getHeight() / 2;
        this.radius = this.shipSize / 2;
        this.angle = this.config.toRadians(90);
        this.rotation = 0;
        this.thrustingUp = false;
        this.thrustingDown = false;
        this.thrust = {
            x: 0,
            y: 0,
        };
        this.bullets = [];
        this.bindEvents();
        

    }

    calculateThrust() {
        if(this.thrustingUp){
            this.handleThrustingUp();
        }else if (this.thrustingDown){
            this.handleThrustingDown();
        }else{
            this.thrust.x *= 1-this.config.friction;
            this.thrust.y *= 1-this.config.friction;
        }
    }

    handleThrustingUp() {
        this.thrust.x += (this.shipThrust * Math.cos(this.angle) / this.config.fps);
        this.thrust.y -=(this.shipThrust * Math.sin(this.angle) / this.config.fps);
    }

    handleThrustingDown() {
        this.thrust.x -= (this.shipThrust * Math.cos(this.angle) / this.config.fps);
        this.thrust.y += (this.shipThrust * Math.sin(this.angle) / this.config.fps);
    }

    rotateLeft(){
        this.rotation = this.config.toRadians(this.turnSpeed) / this.config.fps;
       
    }

    rotateRight(){
        this.rotation = this.config.toRadians(-this.turnSpeed) / this.config.fps;
   
    }

    getShipNosePosition() {

        return {
            'x' : this.posX + this.radius * Math.cos(this.angle),
            'y' : this.posY - this.radius * Math.sin(this.angle)
        }

    }

    draw(canvas: Canvas) {

        let width = this.shipSize / 20;

        let ctx = canvas.getCtx();

        canvas.setStrokeStyle('white', width);

        ctx.beginPath();

        ctx.moveTo( //nose of the ship
            this.getShipNosePosition().x, 
            this.getShipNosePosition().y
        );
        
        ctx.lineTo( //rear left
            this.getRearLeftEquation()[0],
            this.getRearLeftEquation()[1],
        );
        
        ctx.lineTo( //rear right
            this.getRearRightEquation()[0],
            this.getRearRightEquation()[1]
        );
    
        ctx.closePath();
        ctx.stroke();
        
        this.angle += this.rotation;

        this.posX += this.thrust.x;
        this.posY += this.thrust.y;

        this.checkCollisions(canvas);

    }

    getRearLeftEquation(): [number, number] {
        return [
            this.posX - this.radius * (Math.cos(this.angle) + Math.sin(this.angle)),
            this.posY + this.radius * (Math.sin(this.angle) - Math.cos(this.angle))
        ];
    }
    
    getRearRightEquation(): [number, number] {
        return [
            this.posX - this.radius * (Math.cos(this.angle) - Math.sin(this.angle)),
            this.posY + this.radius * (Math.sin(this.angle) + Math.cos(this.angle))
        ];
    }

    keyDown(ev: KeyboardEvent){
        console.log(this.angle);
        
        
        switch(ev.code){
            case 'KeyA': //left arrow key (rotate ship left)
                this.rotateLeft();
                break;

            case 'KeyW': //arrow up (accelerate ship up)
                this.thrustingUp = true;
                break;

            case 'KeyD': //right arrow key (rotate ship right)
                this.rotateRight();
                break;

            case 'KeyS': //arrow down (accelerate ship down)
                this.thrustingDown = true;
                break;
             case 'Space':
                this.fireBullet();
                break;   
        }
    }

    keyUp(ev: KeyboardEvent){
        switch(ev.code){
            case 'KeyD': //left
            case 'KeyA': //right arrow key (stop rotating left)
                this.rotation = 0; 
                break;
            case 'KeyW': //arrow up (stop accelerate ship up)
                this.thrustingUp = false;
                break;
            case 'KeyS': //arrow down (stop accelerate ship down)
                this.thrustingDown = false;
                break;
            case 'Space':
                this.bulletFired = false;
                break;
        }
    }

    checkCollisions(canvas: Canvas) {
        if(this.leftBorder()){
                
            this.posX = canvas.getWidth() - this.radius;
            
        }else if(this.bottomBorder(canvas)){
           
            this.posY =  0 + this.radius;
            
        }else if(this.topBorder()){
            this.posY = canvas.getHeight() - this.radius;
            
        }else if(this.rightBorder(canvas)){
           
            this.posX = 0 + this.radius;
            
        }
    }

    leftBorder(){
        return this.posX < -25 + this.radius;
    }
    rightBorder(canvas: Canvas){
        return this.posX > canvas.getWidth() - this.radius + 25;
    }
    topBorder(){
        return this.posY < 12;
    }
    bottomBorder(canvas: Canvas){
        return this.posY > canvas.getHeight() - this.radius;
    }

    fireBullet(){
    console.log(this.angle);

        if( this.bulletFired ) return true;
        
        let nosePos = this.getShipNosePosition();

        let newBullet = new Bullet(nosePos.x,nosePos.y, this.angle);
    
        this.bullets.push(newBullet);

        this.bulletFired = true;
    
    }

    bindEvents(){
        document.addEventListener('keydown', this.keyDown.bind(this));
        document.addEventListener('keyup', this.keyUp.bind(this));
    }


}

export default Ship;