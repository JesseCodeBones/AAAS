import { Bounds } from "./service/Bean/Bounds.js";
import { DumpElement } from "./service/Bean/DumpElement.js";
import { UUID } from "./service/util/UUID.js";

class Vnc {

    public static ticktok: boolean = true;
    public dumping: boolean = false;
    private dumpRoot: any;
    public dumpXml: any;

    private rootBounds:Bounds;

    public elementCache: Map<string, DumpElement> = new Map();

    constructor() {
        //@ts-ignore
        this.dumpRoot = $(".dump");
    }



    public async extractVncImage(): Promise<string> {

        Vnc.ticktok = false;
        return new Promise((resolve => {

            // @ts-ignore
            $.get('/deviceScreen', function (data) {
                resolve(data);
            });
        }));

    }


    public async extractUIDump(): Promise<string> {

        return new Promise(resolve => {
            //@ts-ignore
            $.get("/appium/pagesource", function (data) {
                resolve(data);
            });
        });
    }

    public clearDump() {
        this.dumpRoot.html('');
    }

    public showDetail(element: DumpElement) {
        console.log(element.attributes.length);
    }

    public setChildNode(element: DumpElement):string{
        let uuid: string = UUID.getInstance().genUUID();
        this.elementCache.set(uuid, element);
        return uuid;
    }

    public showRootDump(root: DumpElement) {
        this.clearDump();
        let uuid: string = UUID.getInstance().genUUID();
        this.elementCache.set(uuid, root);
        this.rootBounds = root.bounds;
        //@ts-ignore
        this.dumpRoot.html($(`<ul>
                                <li style="cursor:pointer;">
                                  <span class="expand-child" uuid="${uuid}">${root.toString()}</span>
                                  <span class="ui-element" uuid="${uuid}">🔎</span>
                                </li>
                              </ul>`));
    }


    public highlight(element:DumpElement) {
        //@ts-ignore
        $(".vnc-image>.highlight").remove();

        let rootScale = (this.rootBounds.height - this.rootBounds.y)/(this.rootBounds.width-this.rootBounds.x);
        //@ts-ignore
        let vncHeight = $(".vnc-image").height();
        //@ts-ignore
        let vncWidth = $(".vnc-image").width();
        //@ts-ignore
        let vncScale = vncHeight/vncWidth;

        let deviceHeight:number = -1, deviceWidth:number=-1, offsetHeight = -1, offsetWidth = -1;

        if(rootScale > vncScale) {
            deviceHeight = vncHeight;
            deviceWidth = vncWidth / rootScale;
            offsetHeight = 0;
            offsetWidth = (1/2 - 1/(2*rootScale))*vncWidth;
        } else {
            deviceHeight = vncWidth * rootScale;
            deviceWidth = vncWidth;
            offsetHeight = (vncHeight - deviceHeight)/2;
            offsetWidth = 0;
        }

        let heightScale = (this.rootBounds.height - this.rootBounds.y)/deviceHeight, widthScale = (this.rootBounds.width-this.rootBounds.x)/deviceWidth;

        let elementHeight = (element.bounds.height)/heightScale;
        let elementWidth = (element.bounds.width)/widthScale;
        let elementOffsetX = offsetHeight + element.bounds.x/widthScale;
        let elementOffwetY = offsetWidth + element.bounds.y/heightScale;
        //@ts-ignore
        $(".vnc-image").append($(`
            <div class = "highlight" style="border:2px solid red;height:${elementHeight-4}px; width:${elementWidth-4}px; left:${elementOffwetY}px; top:${elementOffsetX}px; position:absolute">
            </div>
        `));
    }

}
let vnc = new Vnc();

//@ts-ignore
$(document).on('mouseover', ".dump li", function(event){
    //@ts-ignore
    let uuid = $(event.target).attr('uuid');
    let element = vnc.elementCache.get(uuid);
    vnc.highlight(element);
});

//@ts-ignore
$(document).on('click', ".properties-pop-window>.close", function (event) {
    //@ts-ignore
    $(".properties-pop-window").remove();
});

//@ts-ignore
$(document).on('click', ".expand-child", function (event) {
    //@ts-ignore
    let uuid = $(event.target).attr('uuid');
    let element = vnc.elementCache.get(uuid);
    if(!element.hasChildren) return;

    let childrenNodes = vnc.elementCache.get(uuid).orgData.children;
    if(childrenNodes){
        let content = '';
        for(let child of childrenNodes) {
            let bounds = child.getAttribute("bounds").match(/\d+/g);
            let elementBounds:Bounds = new Bounds(Number(bounds[1]),
                                                    Number(bounds[0]),
                                                    Number(bounds[2] - Number(bounds[0])),
                                                    Number(bounds[3] - Number(bounds[1])));
            let element:DumpElement = new DumpElement(
                child.className,
                elementBounds,
                child.childElementCount >0,
                child,
                child.attributes
            )
            let uuid = vnc.setChildNode(element);
            content += `<li style="cursor:pointer;    white-space: nowrap;display: block;">
                        <span class="expand-child" uuid="${uuid}">${element.toString()}</span>
                        <span class="ui-element" uuid="${uuid}">🔎</span>
                    </li>`;
        }
        //@ts-ignore
        let html = $(`<ul>${content}</ul>`);
        //@ts-ignore
        $(event.target).parent().append(html);

    }
});

//@ts-ignore
$(document).on('click', ".ui-element", function (event) {
    //@ts-ignore
    $(".properties-pop-window").remove();
    //@ts-ignore
    let uuid = $(event.target).attr('uuid');
    let content: string = "";
    for (let attr of vnc.elementCache.get(uuid).attributes) {
        content += `<div>${attr['name']}=${attr['value']}</div>`;
    }
    //@ts-ignore
    let pageWidth = $("body").width();
    //@ts-ignore
    let popwindow = $(`
        <div class="properties-pop-window" style="right:${pageWidth-event.pageX}px; top:${event.pageY}px">
            <div class="close">Close</div>
            <div class="values">
            ${content}
            </div>
        </div>
    `);
    //@ts-ignore
    $("body").append(popwindow);
});

function refreshVnc() {

    vnc.extractVncImage().then(data => {
        Vnc.ticktok = true;
        // @ts-ignore
        $(".vnc-image").attr(
            {
                "style": `background-image:url(data:image/png;base64,${data})`
            }
        );
    });
}

setInterval(() => {
    if (Vnc.ticktok) {
        refreshVnc();
    }
}, 100);


//UI Event
//@ts-ignore
$(".refresh").click(async () => {
    if (!vnc.dumping) {
        vnc.dumping = true;
        let uidump = await vnc.extractUIDump();
        //@ts-ignore
        let xmlDoc = $.parseXML(uidump);
        //@ts-ignore
        let $xml = $(xmlDoc);
        vnc.dumpXml = $xml;
        if ($xml[0].all.length > 0) {
            let root = $xml[0].all[0];
            let className = root.className;
            let width = root.getAttribute("width");
            let height = root.getAttribute("height");
            let rootBounds: Bounds = new Bounds(0, 0, width, height);
            let rootElement: DumpElement = new DumpElement(className,
                rootBounds,
                root.hasChildNodes(),
                root,
                root.attributes);

            vnc.showRootDump(rootElement);
        }


        vnc.dumping = false;

    }
});