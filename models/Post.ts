const postMongoose = require("mongoose");

const PostSchema = new postMongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        max: 1000,
    },
    img: {
        type: String,
    },
    likes: {
        type: Array,
    },
},
{timestamps : true}
);

module.exports = postMongoose.model("Post", PostSchema);