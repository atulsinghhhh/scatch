import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({ 
        cloud_name: process.env.CLOUDIARY_NAME,
        api_key: process.env.CLOUDIARY_API_KEY, 
        api_secret: process.env.CLOUDIARY_API_SECERT
});

const uploadCloudiary=async(localPathfile)=>{
    try {
        if(!localPathfile) return null;
    
        const uploadResult = await cloudinary.uploader.upload(localPathfile,{
            resource_type:"auto",
        })
        // console.log(uploadResult.url)
        fs.unlinkSync(localPathfile);
        return uploadResult;
    } catch (error) {
        fs.unlinkSync(localPathfile);
        null;
    }
}

export {uploadCloudiary}