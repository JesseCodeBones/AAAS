
//@ts-ignore
import {AppiumServerMonitor} from "../service/AppiumServerMonitor";

// @ts-ignore
var express = require('express');

let monitor = new AppiumServerMonitor();
export class IndexRouter {
    static getRouter():any{
        var index_router = express.Router();

        /* GET home page. */
        index_router.get('/', function(req, res, next) {
            monitor.checkStatus();
            res.render('index', { serverStarted: true });
        });

        return index_router;
    }
}