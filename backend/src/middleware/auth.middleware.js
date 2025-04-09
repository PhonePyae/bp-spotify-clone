import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
    if(!req.auth.userId) {
        return res.status(401).json({ message: 'Unauthorized - you must be logged in.' }); 
    }

    next(); 
};


export const requireAdmin = async (req, res, next) => {
    try{
        const cusrrentUser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === cusrrentUser.primaryEmailAddress?.emailAddress;
        if(!isAdmin){
            return res.status(403).json({ message: 'Forbidden - you must be an admin.' });
        }
        next();
    }catch(error){
        next(error);
    }
};