const axios = require('axios');
const { Newsapikey } = require('../config')
const NodeCache = require('node-cache')
const cache = new NodeCache()

exports.getLiveNews = async function getLiveNews(ctx) {
    const url = `http://api.mediastack.com/v1/news?access_key=${Newsapikey}`
    const config = {
        method: 'get',
        url: url
    }

    const cacheData = cache.get("liveNews")
    if (cacheData) {
        console.log("get from cache");
        ctx.status = 200;
        ctx.body = {
            Message: "Live news get from cache",
            cacheData
        }
    } else {
        try {
            const LiveNews = await axios(config)
            if (LiveNews.data) {
                const result = LiveNews.data
                cache.set("liveNews", result, 600)
                ctx.status = 200;
                ctx.body = {
                    Message: "Live news",
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
}

exports.getLocalNews = async function getlocalNews(ctx) {
    const country = ctx.params.country
    const url = `http://api.mediastack.com/v1/news?access_key=${Newsapikey}&countries=${country}`
    const config = {
        method: 'get',
        url: url
    }

    const cacheData = cache.get("LocalNews")
    if (cacheData) {
        console.log("get from cache");
        ctx.status = 200;
        ctx.body = {
            Message: "local news get from cache",
            cacheData
        }
    } else {
        try {
            const LocalNews = await axios(config)
            if (LocalNews.data) {
                const result = LocalNews.data
                cache.set("LocalNews", result, 600)
                ctx.status = 200;
                ctx.body = {
                    Message: "Local News",
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
}