import {ScreenShotProvider} from "../../ScreenShotProvider";

export class IOSScreenShotProvider implements ScreenShotProvider{
    async takeScreenShot(deviceId:String): Promise<string> {
        //TODO implement this with iTools
        return undefined;
    }

}