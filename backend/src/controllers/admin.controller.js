import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary   from "../lib/cloudinary.js";

//Helper function to cloudinary upload
const uploadToCloudinary = async (file) => {
    try{
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto",
        }); // Upload the file to Cloudinary
        return result.secure_url; // Return the secure URL of the uploaded file
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error); 
        throw new Error("Cloudinary upload failed"); // Throw an error if upload fails
    }
}

// @desc    Create a new song
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

// @desc    Delete a song
export const deleteSong = async (req, res, next) => {
    try{
        const { id } = req.params;
        const song = await Song.findById(id);

        if(!song){
            return res.status(404).json({message: "Song not found"});
        }

        // Delete the song from the album if it belongs to one
        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: { songs: song._id } // Remove song ID from the album's songs array
            });
        }

        // Delete the song from Cloudinary
        await cloudinary.uploader.destroy(song.audioUrl);
        await cloudinary.uploader.destroy(song.imageUrl);  

        await Song.findByIdAndDelete(id); // Delete the song from the database

        res.status(200).json({message: "Song deleted successfully"});
    }catch(error){
        console.log('Error deleting song:', error);
        next(error); 
    }
} 

// @desc    Create a new album
export const createAlbum = async (req, res, next) => {
    try {
        const { title, artist, releaseYear } = req.body;
        const { imageFile } = req.files;

        const imageUrl = await uploadToCloudinary(imageFile);

        const album = new Album({
            title,
            artist,
            releaseYear,
            imageUrl,
        });

        await album.save(); // Save the album to the database
        res.status(201).json({ album });
    } catch (error) {
        console.log('Error creating album:', error);
        next(error); // Pass the error to the next middleware
    }
} 

// @desc    Delete an album
export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Song.deleteMany({ albumId: id }); // Delete all songs associated with the album
        await Album.findByIdAndDelete(id); // Delete the album from the database
        res.status(200).json({ message: "Album deleted successfully" });
    } catch (error) {
        console.log('Error deleting album:', error);
        next(error); // Pass the error to the next middleware 
    }
}