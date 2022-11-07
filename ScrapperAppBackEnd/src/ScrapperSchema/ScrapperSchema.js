const mongoose = require('mongoose')

const schapperData = new mongoose.Schema({
   arr: {
      type: Array
   }
})

const ScrapperData = mongoose.model("SchapperData", schapperData)

module.exports = ScrapperData;