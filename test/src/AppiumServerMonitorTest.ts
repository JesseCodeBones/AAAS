// @ts-ignore
var assert = require('assert');
import {AppiumServerMonitor} from "../../runtime/service/AppiumServerMonitor";
// @ts-ignore
describe('AppiumServerMonitor test', function () {
    // @ts-ignore
    it('check the status of Appium server', function () {
        let appiumServerMonitor = new AppiumServerMonitor();
        let result = appiumServerMonitor.checkStatus();
        assert.ok(!result)
    });
})