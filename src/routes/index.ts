
// @ts-ignore
import {ScreenShotProviderProvider} from "../service/provider/ScreenShotProviderProvider";
// @ts-ignore
var express = require('express');

export class IndexRouter {
    static getRouter():any{
        var index_router = express.Router();

        /* GET home page. */
        index_router.get('/', function(req, res, next) {
            res.render('index', { serverStarted: true });
        });
        //R28M31LFZLP
        index_router.get('/deviceScreen', function(req, res, next) {

            ScreenShotProviderProvider.ANDROID.getProvider().takeScreenShot("R28M31LFZLP").then(data=>{
                res.end(data);
            });
        });

        /* GET vnc page. */
        index_router.get('/vnc', function(req, res, next) {
            res.render('vnc', { deviceId: "R28M31LFZLP" });
        });


        return index_router;
    }
}