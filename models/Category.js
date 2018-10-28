const mongoos = require("mongoose");
const Schema = mongoos.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    default: "",
  },
  user: {
    ref: "users",
    type: Schema.Types.ObjectId
  }
})

module.exports = mongoos.model("categorys", categorySchema)