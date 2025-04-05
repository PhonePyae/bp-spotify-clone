import { User } from "../models/user.model.js";

export const authCallback = async (req, res) => {
    try{
        const {id, firstName, lastName, imageUrl} = req.body;

        // Check if the user already exists in the database
        const user = await User.findOne({ clerkId: id });

        if (!user) {
            // If the user doesn't exist, create a new user
            const newUser = await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl   
            });
        }

        res.status(200).json({status: "success"});
    }catch(error){
        console.error("Error in auth callback ", error);
        res.status(500).json({status: "false", message: "Internal server error", error: error.message}); 
    }
};