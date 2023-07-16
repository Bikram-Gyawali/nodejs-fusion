const axios = require("axios");


class HTTPRequest{


    static async get(url, headers={}){
        return await axios.get(url, {
            headers
        })
    }


    static async post(url,data={}, headers={}){
        return await axios.post(url, data, {
            headers
        })
    }


    static async put(url,data={}, headers={}){
        return await axios.put(url, data, {
            headers
        })
    }


    static async delete(url, data={}, headers={}){
        return await axios.delete(url, data, {
            headers
        })
    }

}