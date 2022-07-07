import axios from 'axios';
import config from "./config.json";

    // GET /api/settings/<key>/<setting>
    /**
     * 
     * @param {*} host khotoserver hostname
     * @param {*} key secret
     * @param {*} setting Settings value to revtrieve
     * @returns The saved setting or ""
     */
    export async function loadSetting(host, key, setting) {
        if (host === "") {
            console.warn(`Settings::loadSetting - No host specified, skipping`);
            return "";
        }

        let settingUrl = `${config.proto}://${host}/api/settings/${key}/${setting}`;

        let settingValue = "";

        try {
            let settingResult = await axios({
                method: 'get',
                url: settingUrl,
                responseType: 'text'
            })
            settingValue = settingResult.data;
        } catch (error) {
            console.error(`loadSetting caught for ${setting}`)
            settingValue = "";
        }

        if (typeof settingValue === "undefined" || settingValue === "") {
            console.log(`Settings::loadSetting query for key: ${key} and setting: ${setting} is undefined, setting to ""`);
            settingValue = "";
        }

        console.log(`Settings::loadSetting result for ${setting}: ${settingValue}`);
        return settingValue;
    }

    // PUT /api/settings/<key>/<setting>/<value>
    export async function saveSetting(host, key, setting, value) {
        if (host === "") {
            console.warn(`Settings::saveSetting - No host specified, skipping`);
            return;
        }
        
        let settingUrl = `${config.proto}://${host}/api/settings/${key}/${setting}/${value}`;
        
        // Fire and don't wait
        try {
            axios({
                method: 'put',
                url: settingUrl,
                responseType: 'json'
            })
            console.log(`Settings::saveSetting ${setting}: ${value} success`);
        } catch (error) {
            console.log(`Settings::saveSetting ${setting}: ${value} failed: ${error}`)
        }
    }

