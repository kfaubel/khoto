import axios from 'axios';
import config from "../config.json";

// GET /api/v1/settings/<key>/<setting>
/**
 * 
 * @param {*} credentials khotoserver site
 * @param {*} key secret
 * @param {*} setting Settings value to revtrieve
 * @returns The saved setting or ""
 */
const loadSetting = async (credentials, key, setting) => {
    if (credentials.site === "") {
        console.warn(`Settings::loadSetting - No site specified, skipping`);
        return "";
    }

    let settingUrl = `${config.proto}://${credentials.site}/api/v1/settings/${key}/${setting}`;

    let settingValue = "";

    try {
        let settingResult = await axios({
            method: 'get',
            url: settingUrl,
            responseType: 'text'
        })
        console.log(`Settings: loadSetting query for key: ${key} and setting: ${setting} result: ${settingResult.status}`);
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

// PUT /api/v1/settings/<key>/<setting>/<value>
const saveSetting = async (credentials, key, setting, value) => {
    if (credentials.site === "") {
        console.warn(`Settings::saveSetting - No site specified, skipping`);
        return;
    }
    
    let settingUrl = `${config.proto}://${credentials.site}/api/v1/settings/${key}/${setting}/${value}`;
    
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

export { loadSetting, saveSetting}