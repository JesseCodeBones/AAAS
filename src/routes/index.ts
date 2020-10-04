
import { Session } from "inspector";
import { AppiumServerMonitor } from "../service/AppiumServerMonitor";
import { AppiumServiceHelper } from "../service/AppiumServiceHelper";
// @ts-ignore
import { ScreenShotProviderProvider } from "../service/provider/ScreenShotProviderProvider";
// @ts-ignore
var express = require('express');

export class IndexRouter {
    static getRouter(): any {
        var index_router = express.Router();

        async function wait(ms) {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, ms)
            });
        }

        index_router.get("/appium/pagesource", async function(req, res) {
            let session:any = await AppiumServiceHelper.getInstance().getSession("9e6c2fcb", "Android", "8.0");
            let pageSource:any = await session.getPageSource();
            res.end(pageSource);
        });

        index_router.get('/vnc', async function (req, res) {
            //@ts-ignore
            
            res.render('vnc', { deviceId: "9e6c2fcb" });
        });

        /* GET home page. */
        index_router.get('/', function (req, res, next) {
            res.render('index', { serverStarted: true });
        });
        //R28M31LFZLP
        index_router.get('/deviceScreen', function (req, res, next) {

            ScreenShotProviderProvider.ANDROID.getProvider().takeScreenShot("9e6c2fcb").then(data => {
                res.end(data);
            });
        });


        return index_router;
    }
}