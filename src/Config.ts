class Config {

    public fps      : number;
    public friction : number;

    constructor(){

        this.fps = 30;
        this.friction = 0.02;

    }

    toRadians(degrees: number){
        return degrees / 180 * Math.PI;
    }

}

export default Config;