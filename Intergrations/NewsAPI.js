const axios = require('axios');
const {apikey} = require('../config')

exports.getLiveNews = async function getLiveNews(ctx) {
    const url = `http://api.mediastack.com/v1/news?access_key=${apikey}`
    const config = {
        method: 'get',
        url: url
    }
    const LiveNews = await axios(config)

    if (LiveNews.data){
        const result = LiveNews.data
        ctx.status = 200;
        ctx.body = {
            Message: "Live news",
            result
        }
    }else{
        ctx.status = 500;
        ctx.body = {
            Message: 'Something went wrong, try again later'
        }
    }
    
}

exports.getLocalNews = async function getlocalNews(ctx){
    const country = ctx.params.country
    const url = `http://api.mediastack.com/v1/news?access_key=${apikey}&countries=${country}`
    const config = {
        method: 'get',
        url: url
    }

    const LocalNews = await axios(config)

    if(LocalNews.data){
        const result = LocalNews.data
        ctx.status = 200;
        ctx.body = {
            Message: "Local News",
            result
        }
    }else{
        ctx.status = 500;
        ctx.body = {
            Message: "Something went wrong, try again later"
        }
    }
}