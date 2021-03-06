import axios from 'axios';
import config from "./config.json";

    // /api/user/:user/setting/key/:key
    export async function loadSetting(host, user, key) {
        let settingUrl = `${config.proto}://${host}/api/user/${user}/setting/key/${key}`;
        //console.log(`loadSetting: ${settingUrl}`);

        let settingValue = "";

        try {
            let settingResult = await axios({
                method: 'get',
                url: settingUrl,
                responseType: 'text',
                headers: { 'Access-Control-Allow-Origin': '*' }
            })
            settingValue = settingResult.data;
        } catch (error) {
            console.log(`loadSetting caught for ${key}`)
            settingValue = "";
        }

        if (typeof settingValue === undefined || settingValue === "undefined") {
            console.log(`Settings::loadSetting query for user: ${user} and key: ${key} is undefined, setting to ""`);
            settingValue = "";
        }

        console.log(`Settings::loadSetting result for ${key}: ${settingValue}`);
        return settingValue;
    }

    // /api/user/:user/setting/key/:key/value/:value
    export async function saveSetting(host, user, key, value) {
        let settingUrl = `${config.proto}://${host}/api/user/${user}/setting/key/${key}/value/${value}`;
        //console.log(`saveSetting: ${settingUrl}`);
        
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

