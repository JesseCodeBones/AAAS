import {ScreenShotProvider} from "../ScreenShotProvider";
import {PlatformType} from "../PlatformType";
import {AndroidScreenShotProvider} from "./Android/AndroidScreenShotProvider";
import {IOSScreenShotProvider} from "./iOS/IOSScreenShotProvider";

export class CommonFactory {

    private static androidScreenShotProvider:AndroidScreenShotProvider = new AndroidScreenShotProvider();
    private static iOSScreenShotProvider:IOSScreenShotProvider = new IOSScreenShotProvider();

    public static getScreenShotProvider(name:PlatformType):ScreenShotProvider {
        //TODO current solution is singleton, if there are too many user, we need to use Thread Poll
        if (name == PlatformType.Android) {
            return CommonFactory.androidScreenShotProvider;
        } else {
            return CommonFactory.iOSScreenShotProvider;
        }
    }

}