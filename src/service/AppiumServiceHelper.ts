// @ts-ignore
const wdio = require("webdriverio");

export class AppiumServiceHelper {

    private sessionCache: Map<string, any> = new Map();

    private async createAndSave(deviceName: string, platform: string, platformVersion: string):Promise<any> {
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

    public async getSession(deviceName: string, platform: string, platformVersion: string): Promise<any> {

        if (this.sessionCache.get(deviceName)) {
            let cacheSession = this.sessionCache.get(deviceName);
            try {
                let status = await cacheSession.getPageSource();
            } catch (error) {
                //the session is dead, create new session
                return await this.createAndSave(deviceName, platform, platformVersion);
            }
            return cacheSession;
        } else {
            return await this.createAndSave(deviceName, platform, platformVersion);
        }

    }


    private static instance: AppiumServiceHelper = new AppiumServiceHelper();

    public static getInstance(): AppiumServiceHelper {
        return AppiumServiceHelper.instance;
    }

}