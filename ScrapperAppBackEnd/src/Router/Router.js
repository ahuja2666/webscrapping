const express = require('express')
const Router = express.Router()
const ScrapperData = require('../ScrapperSchema/ScrapperSchema')
const axios = require('axios')
const cheerio = require('cheerio')
const datakeys = ['rank',
    'name',
    'price',
    "1h",
    "24h",
    "7d",
    'marketCap',
    'vaolume',
    'circulatingSupply'
];


let objectid = "";

const getdata = async () => {
    let arrofobj = [];
    try {
        const data = await axios.get("https://coinmarketcap.com/")
        const finalData = await (data.data)
        const $ = cheerio.load(finalData)
        const elementSelector = "#__next > div > div.main-content > div.sc-4vztjb-0.cLXodu.cmc-body-wrapper > div > div:nth-child(1) > div.h7vnx2-1.bFzXgL > table > tbody > tr"
        $(elementSelector).each((index, element) => {
            const dataObj = {};
            let keyindex = 0;
            if (index <= 9) {
                $(element).children().each((childindex, childelement) => {
                    const tdValue = ($(childelement).text())
                    if (tdValue) {
                        if (tdValue == 'rank') {
                            dataObj[datakeys[keyindex]] = parseInt(tdValue)
                            keyindex++
                        }
                        else {
                            dataObj[datakeys[keyindex]] = (tdValue)
                            keyindex++
                        }
                        arrofobj.push(dataObj)
                        let map = new Map()
                        arrofobj = arrofobj.filter((each) => {
                            if (map.has(each.rank)) {

                            } else {
                                map.set(each.rank);
                                return each
                            }
                        })
                    }
                })


            }

        })

        return arrofobj;


    }
    catch (error) {
        return (error.message)
    }
}

setInterval(async () => {
    const data = await getdata()
    const updateData = await ScrapperData.updateOne({ _id: "636899d1b11c08f2219a6a4a" }, { arr: data });
    console.log("data updated")
    console.log(updateData);
}, 5000)

Router.get('/getdata', async (req, res) => {
    const datax = await ScrapperData.findOne({ _id: "636899d1b11c08f2219a6a4a" })
    res.send(datax)
})

module.exports = Router