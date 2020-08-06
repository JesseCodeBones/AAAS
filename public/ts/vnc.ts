 class Vnc {

    public static ticktok:boolean = true;

    public async extractVncImage():Promise<string>{

        Vnc.ticktok=false;
        console.log('tick');
        return new Promise((resolve => {

            // @ts-ignore
            $.get('/deviceScreen', function (data) {
                resolve(data);
            });
        }));

    }
}

function refreshVnc(){
    let vnc = new Vnc();
    vnc.extractVncImage().then(data=>{
        Vnc.ticktok=true;
        console.log('tok');
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