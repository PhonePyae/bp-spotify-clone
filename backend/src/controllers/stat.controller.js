import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";
import { Album } from "../models/album.model.js";

export const getStats = async (req, res, next) => {
    try {
        const [totalSongs, totalUsers, totalAlbums, uniqueArtists] = await Promise.all([
            Song.countDocuments(),
            User.countDocuments(),
            Album.countDocuments(),
            // Get unique artists from both songs and albums
            Song.aggregate([
                { $unionWith: {
                    coll: "albums", // Use the albums collection
                    pipeline: [], // No additional pipeline stages needed
                }},
                { $group: { _id: "$artist" } }, // Group by artist
                { $count: "uniqueArtists" } // Count unique artists
            ])
        ]); 

        res.status(200).json({
            totalSongs,
            totalUsers,
            totalAlbums,
            uniqueArtists: uniqueArtists[0].count || 0 // If no unique artists found, set to 0
        }); 

    } catch (error) {
        next(error); 
    }
}