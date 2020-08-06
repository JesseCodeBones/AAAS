import {ScreenShotProvider} from "../../ScreenShotProvider";
// @ts-ignore
const { exec } = require('child_process');

// @ts-ignore
const fs = require('fs');

export class AndroidScreenShotProvider implements ScreenShotProvider{
    async takeScreenShot(deviceId:String): Promise<string> {

        return new Promise((resolve, reject) => {
            //TODO implement this use ADB screen shot
            //command: adb -s deviceId exec-out screencap -p > screen.png
            let command:string = `adb -s ${deviceId} exec-out screencap -p > screen.png`;
            exec(command, (err, stdout, stderr) =>{
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                let bitmap = fs.readFileSync("screen.png");
                // @ts-ignore
                resolve(new Buffer(bitmap).toString('base64'));
            });
        });

    }

}