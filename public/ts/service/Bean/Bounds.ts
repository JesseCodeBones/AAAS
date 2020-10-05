export class Bounds{
    x: number;
    y: number;
    height: number;
    width: number;

    public constructor(x:number, y:number, width:number, height:number){
        this.x = x;
        this.y = y;
        this.height=height;
        this.width=width;
    }

    public toString():string{

        return `[${this.x}, ${this.y} - ${this.width}, ${this.height}]`;
    }
}