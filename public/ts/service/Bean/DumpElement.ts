import { Bounds } from "./Bounds";

export class DumpElement{
    public discription: string;
    public bounds: Bounds;
    public hasChildren: boolean;
    public attributes: Array<any>;
    public orgData: any;

    public constructor(discription:string, bounds:Bounds, hasChildren:boolean ,orgData:any, attributes?:Array<any>){

        this.discription = discription;
        this.bounds = bounds;
        this.hasChildren = hasChildren;
        this.orgData = orgData;
        this.attributes = attributes;
    }

    public toString():string{

        return `${this.hasChildren?"+  ":""}${this.discription}    ${this.bounds.toString()}`;
    }
}