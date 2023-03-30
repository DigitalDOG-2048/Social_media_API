const axios = require('axios');
const { Newsapikey } = require('../config')

exports.getLiveNews = async function getLiveNews(ctx) {
    const url = `http://api.mediastack.com/v1/news?access_key=${Newsapikey}`
    const config = {
        method: 'get',
        url: url
    }

    try {
        const LiveNews = await axios(config)
        if (LiveNews.data) {
            const result = LiveNews.data
            ctx.status = 200;
            ctx.body = {
                Message: "Live news",
                result
            }
        }
    } catch (error) {
        ctx.status = 400;
        ctx.body = {
            Message: "Something went wrong, please try again",
            Error: error
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

    try {
        const LocalNews = await axios(config)
        if (LocalNews.data) {
            const result = LocalNews.data
            ctx.status = 200;
            ctx.body = {
                Message: "Local News",
                result
            }
        }

    } catch (error) {
        ctx.status = 400;
        ctx.body = {
            Message: "Something went wrong, please try again",
            Error: error
        }
    }
}