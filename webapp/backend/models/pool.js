const mongoose = require("mongoose");
const { useImperativeHandle } = require("react");

const poolSchema = new mongoose.Schema({
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Users',
        require:true
    },
    user_id:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Users'
        }
    ],
    card_id:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'credit_cards'
        }
    ]
    
    
});
module.exports = mongoose.model("pools", userSchema);
