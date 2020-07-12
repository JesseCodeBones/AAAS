import {AppiumServerConst} from "./AppiumServerConst";

// @ts-ignore
const { exec } = require('child_process');
export class AppiumServerMonitor {




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
            exec(command, (err, stdout, stderr) => {

                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
            });
            resolve(true);
        });

    }



    /**
     *
     * @returns{Promise<boolean>}
     * when return true value, the server is started
     *
     * when return false value, the server is not run
     * */
    checkStatus():Promise<boolean>{

        return new Promise<boolean> (resolve => {
            // @ts-ignore
            const server = require('http').createServer().listen(AppiumServerConst.PORT);
            // @ts-ignore
            const server = require('http')
                .createServer()
                .listen(AppiumServerConst.PORT, () => {
                    server.close()
                    resolve(false);
                }).on('error', () => {
                    resolve(true);
                })

        });

    }

}