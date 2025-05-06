import { v2 as cloudinary } from 'cloudinary';
require("dotenv").config();

// Initialize Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadImageToCloudinary = async (imageBuffer: Buffer): Promise<string> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            // { resource_type: 'image' },
            (error, result) => {
                if (error || !result) {
                    console.error('Error uploading image to Cloudinary:', error);
                    return reject(error || new Error('Error uploading image to Cloudinary'));
                }
                resolve(result.secure_url);
            }
        );
        uploadStream.end(imageBuffer);
    })
};


export const removeFileFromCloudinary  = async (fileUrl: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(fileUrl);
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw new Error('Error deleting image from Cloudinary');
  }
}
