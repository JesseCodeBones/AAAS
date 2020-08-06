import {ScreenShotProvider} from "../ScreenShotProvider";
import {AndroidScreenShotProvider} from "../impl/Android/AndroidScreenShotProvider";
import {IOSScreenShotProvider} from "../impl/iOS/IOSScreenShotProvider";
abstract class Provider {
    abstract getProvider(): ScreenShotProvider;
}
class AndroidProvider extends Provider{

    private static instance:AndroidScreenShotProvider = new AndroidScreenShotProvider();

    getProvider(): ScreenShotProvider {
        return AndroidProvider.instance;
    }

}

class iOSProvider extends Provider{

    private static instance:IOSScreenShotProvider = new IOSScreenShotProvider();

    getProvider(): ScreenShotProvider {
        return iOSProvider.instance;
    }

}
export class ScreenShotProviderProvider {

    public static ANDROID:Provider = new AndroidProvider();
    public static IOS:Provider = new iOSProvider();
}

