import Canvas from './Canvas';
import Config from './Config';
import Ship from './Ship';

let canvas = new Canvas();
let config = new Config();
let ship = new Ship(canvas);

canvas.setBackground('black');
ship.draw(canvas);
console.log(canvas.getHeight());
console.log(config.fps);


setInterval(update, 1000 / config.fps);

function update(){
  
    canvas.drawBackground('black');

    ship.calculateThrust();

    ship.draw(canvas);

    ship.bullets.forEach(function(bullet){
        bullet.draw(canvas);
        if ( bullet.checkOutOfBounds(canvas) ) ship.bullets.shift();
    });

}
