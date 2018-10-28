const mongoos = require("mongoose");
const Schema = mongoos.Schema;

const orderSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  order: {
    type: Number,
    required: true,
  },
  list: [
    {
      name: {
        type: String
      },
      quantity: {
        type: String
      },
      cost: {
        type: String
      },
    }
  ]
})

module.exports = mongoos.model("orders", orderSchema)