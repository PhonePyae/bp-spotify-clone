import { User } from '../models/user.model.js';

export const getAllUsers = async (req, res, next) => {
    try {
        const currentUser = req.auth.userId;
        const users = await User.find({ _id: { $ne: currentUser } }); // Exclude the current user from the list
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}