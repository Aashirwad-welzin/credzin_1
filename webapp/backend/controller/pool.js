const User = require('../models/User');
const Card = require("../models/card")
const Pool = require("../models/pool")

exports.verifyContacts= async(req,res)=>{
    try{
        const userId= req.id
        const contact = req.body.contact
         
        const userToadd = await User.findOne({contact:contact})
        if(!userId){
            return res.status(404).json({
                messsage:`This user not available on credzin`,
            })
            
        }
        return res.stauts(200).json({
            message:`You can add this no: ${contact} to the Pool`
        })

    }
    catch(err){
        return res.status(500).json({
            message:`Network error`,
            err: message.err
        })

    }
};
exports.addedToPool=async(req, res)=>{
    try{
        const userId = req.id
        const contact = req.body

        const useradmin = await User.findById({_ID:userId})
        const poolUser = await User.findOne({contact:contact})

        if (!poolUser) {
            return res.status(404).json({
                success: false,
                message: "User with the given contact not found"
            });
        }
         const pool= new Pool({
            admin:useradmin._id,
            user_id:[poolUser._id],
            card_id:[poolUser.CardAdded]

         })
        await pool.save()

        useradmin.poolCreated=pool._id
        await useradmin.save()

        poolUser.poolJoined = pool._id
        await  poolUser.save()
        return res.status(200).joson({
            message:`pool created`,
            pool:pool
        })


    }
    catch(err){
        return res.status(500).json({
            message:`network error`,
            err:err.message
        }) 

    }
}