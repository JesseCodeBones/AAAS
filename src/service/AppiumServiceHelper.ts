// @ts-ignore
const wdio = require("webdriverio");

export class AppiumServiceHelper {

    private sessionCache: Map<string, any> = new Map();

    public async getSession(deviceName: string, platform: string, platformVersion: string): Promise<any> {

        if (this.sessionCache.get(deviceName)) {
            return this.sessionCache.get(deviceName);
        } else {
            const opts = {
                path: '/wd/hub',
                port: 14567,
                capabilities: {
                    platformName: platform,
                    platformVersion: platformVersion,
                    automationName: 'UiAutomator2',
                    "deviceName": deviceName,
                    "noReset": true
                }
            };
            let client = await wdio.remote(opts);
            this.sessionCache.set(deviceName, client);
            return client;
        }

    }


    private static instance: AppiumServiceHelper = new AppiumServiceHelper();

    public static getInstance(): AppiumServiceHelper {
        return AppiumServiceHelper.instance;
    }

}