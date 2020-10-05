import { Bounds } from "./service/Bean/Bounds.js";
import { DumpElement } from "./service/Bean/DumpElement.js";

 class Vnc {

    public static ticktok:boolean = true;
    public dumping:boolean = false;
    private dumpRoot:any;
    public dumpXml:any;

    constructor(){
        //@ts-ignore
        this.dumpRoot = $(".dump");
    }

    

    public async extractVncImage():Promise<string>{

        Vnc.ticktok=false;
        return new Promise((resolve => {

            // @ts-ignore
            $.get('/deviceScreen', function (data) {
                resolve(data);
            });
        }));

    }


    public async extractUIDump():Promise<string>{

        return new Promise(resolve=>{
            //@ts-ignore
            $.get("/appium/pagesource", function(data){
                resolve(data);
            });
        });
    }

    public clearDump(){
        this.dumpRoot.html('');
    }

    public showRootDump(root:DumpElement){
        this.clearDump();
        //@ts-ignore
        this.dumpRoot.html($(`<ul><li style="cursor:pointer;">${root.toString()}</li></ul>`));
    }

}
let vnc = new Vnc();
function refreshVnc(){
    
    vnc.extractVncImage().then(data=>{
        Vnc.ticktok=true;
        // @ts-ignore
        $(".vnc-image").attr(
            {
                "style":`background-image:url(data:image/png;base64,${data})`
            }
        );
    });
}

setInterval(()=>{
    if (Vnc.ticktok) {
        refreshVnc();
    }
}, 100);


//UI Event
//@ts-ignore
$(".refresh").click(async ()=>{
    if(!vnc.dumping){
        vnc.dumping = true;
        let uidump = await vnc.extractUIDump();
        //@ts-ignore
        let xmlDoc = $.parseXML( uidump );
        //@ts-ignore
        let $xml = $( xmlDoc );
        vnc.dumpXml = $xml;
        if($xml[0].all.length>0) {
            let root = $xml[0].all[0];
            let className = root.className;
            let width = root.getAttribute("width");
            let height = root.getAttribute("height");
            let rootBounds:Bounds = new Bounds(0, 0, width, height);
            let rootElement:DumpElement = new DumpElement(className, 
                rootBounds,
                root.hasChildNodes(),
                root,
                root.attributes);
            
            vnc.showRootDump(rootElement);
        }


        vnc.dumping = false;
       
    }
});