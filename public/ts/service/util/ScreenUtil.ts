import { Bounds } from "../Bean/Bounds.js";
import { Point } from "../Bean/Point.js";

export class ScreenUtil{

    public static pagePointsToDevicePoint(vncPoint:Point, vncSize:Point, deviceBound:Bounds):Point {

        let vncScale:number = vncSize.y/vncSize.x;
        let rootScale:number = Number(deviceBound.height)/Number(deviceBound.width);
        let deviceHeight:number = Number(deviceBound.height);
        let deviceWidth:number = Number(deviceBound.width);

        let devicePointY:number = -1;
        let devicePointX:number = -1;

        if(rootScale > vncScale) {
            devicePointY = deviceHeight * vncPoint.y / vncSize.y;
            let offsetX = (vncSize.x - (vncSize.y/deviceHeight * deviceWidth)) / 2;
            devicePointX = (vncPoint.x - offsetX)*deviceHeight / vncSize.y;
        } else {
            devicePointX = deviceWidth / vncSize.x * vncPoint.x;
            devicePointY = deviceWidth / vncSize.x * vncPoint.y - ((deviceWidth/vncSize.x*vncSize.y - deviceHeight)/2)
        }

        return new Point(devicePointX, devicePointY);
    }
}