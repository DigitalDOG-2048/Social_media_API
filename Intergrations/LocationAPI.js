const axios = require('axios');
const { LocationApiKey } = require('../config')



exports.getCurrentLocation = async function getCurrentLocation(ctx) {
    const ip = ctx.params.ip_address;
    const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=${LocationApiKey}&ip_address=${ip} `

    const config = {
        method: 'get',
        url: url
    }
    try {
        const location = await axios(config)
        //console.log(location.data);

        if (location) {
            const { timezone, flag, currency, connection,city_geoname_id,region_iso_code,region_geoname_id,postal_code,country_geoname_id,
                country_is_eu,continent,continent_code,continent_geoname_id,security, ...result } = location.data
            ctx.status = 200;
            ctx.body = {
                result
            }
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            Message: "Something went wrong, please try again",
            Error: error
        }
    }
}