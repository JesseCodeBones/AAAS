
export interface ScreenShotProvider {

    /**
     *
     * @param deviceId: device UDID
     * @return base64 value of image
     *
     *
     * */
    takeScreenShot(deviceId:String): Promise<string>;
}