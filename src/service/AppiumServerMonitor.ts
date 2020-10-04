import {AppiumServerConst} from "./AppiumServerConst";

// @ts-ignore
const { exec } = require('child_process');



export class AppiumServerMonitor {
    private childProcess: any;
    private monitorID:number;

    constructor(){
        this.childProcess=null;
        this.monitorID = null;
    }


    /**
     * @returns
     * true -  means the server is started successfully,
     * false - means the server cannot be started
     * */
    startAppium():Promise<boolean> {

        return new Promise<boolean> (async resolve => {
            //run start Appium command
            let port = AppiumServerConst.PORT;
            // @ts-ignore
            let command: string = `node ${__dirname}/../../appium/appium --log-level error:debug  -g ${__dirname}/../../log/appium.log --address 127.0.0.1 --port ${port} --bootstrap-port 28267`;
            this.childProcess = exec(command, (err, stdout, stderr) => {

                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
            });
            resolve(true);
        });

    }
    /**
     *
     * check the status of appium server, if Appium server is down
     * restart the server
     * */
    checkStatus(){

        if (this.monitorID == null) {
            let checker = ()=>{
                if (this.childProcess == null || this.childProcess.exitCode != null || this.childProcess.pid == null || this.childProcess.killed) {
                    this.startAppium();
                }

            };

            this.monitorID = setInterval(checker, 1500);
        }
    }

    private static instance:AppiumServerMonitor = new AppiumServerMonitor();
    public static getInstance():AppiumServerMonitor{
        return AppiumServerMonitor.instance;
    }

}