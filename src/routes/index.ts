
// @ts-ignore
var express = require('express');

export class IndexRouter {
    static getRouter():any{
        var index_router = express.Router();

        /* GET home page. */
        index_router.get('/', function(req, res, next) {
            res.render('index', { serverStarted: true });
        });

        return index_router;
    }
}