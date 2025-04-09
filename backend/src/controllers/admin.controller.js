import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary   from "../lib/cloudinary.js";

//Helper function to cloudinary upload
const uploadToCloudinary = async (file) => {
    try{
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto",
        });
        return result.secure_url;
    }
}

export const createSong = async (req, res, next  ) => {
    try{
        if(!req.files || !req.files.audioFile || !req.files.imageFile  ){
            return res.status(400).json({message: "Please upload all files"});
        }

        const {title, artist, albumId, duration} = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null,  
        }); 

        await song.save();

        // if song blogs to an album, add the song ID to the album's songs array
        if(albumId){
            await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song._id } // Add song ID to the album's songs array
            });
        }

        res.status(201).json({song});
    }catch(error){
        console.log('Error creating song:', error);
        next(error); 
    }
}