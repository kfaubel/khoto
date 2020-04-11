import axios from 'axios';
import config from "./config.json";

export default class {
    static async loadSetting(host, user, key) {
        let settingUrl = `${config.httpsProxy}http://${host}/api/user/${user}/setting/key/${key}`;
        console.log(`loadSetting: ${settingUrl}`);

        let settingValue = "";

        try {
            // Load the list of albums
            let settingResult = await axios({
                method: 'get',
                url: settingUrl,
                responseType: 'text',
                headers: { 'Access-Control-Allow-Origin': '*' }
            })
            //console.log(settingResult);
            settingValue = settingResult.data;
        } catch (error) {
            console.log(`loadSetting caught for ${key}`)
            settingValue = "";
        }

        if (typeof settingValue === undefined || settingValue === "undefined") {
            console.log(`Settings::loadSetting query for user: ${user} and key: ${key} is undefined, setting to ""`);
            settingValue = "";
        }

        console.log(`Settings: loadSetting result for ${key}: ${settingValue}`);
        return settingValue;
    }

    // /api/user/:user/setting/key/:key/value/:value
    static async saveSetting (host, user, key, value) {
        let settingUrl = `${config.httpsProxy}http://${host}/api/user/${user}/setting/key/${key}/value/${value}`;
        console.log(`saveSetting: ${settingUrl}`);
        // Fire and don't wait
        try {
            axios({
                method: 'post',
                url: settingUrl,
                responseType: 'json',
                headers: { 'Access-Control-Allow-Origin': '*' }
            })
        } catch (error) {
            console.log(`Viewer::saveSetting failed: ${error}`)
        }
    }
}