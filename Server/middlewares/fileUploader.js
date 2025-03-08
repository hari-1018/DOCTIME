const multer = require("multer");
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3 = require("../config/s3config");


const bucketName = process.env.AWS_BUCKET_NAME;

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
      // Only allow images
      if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
    }
  });
  
  const uploadToS3 = async (file) => {
    // Determine folder based on file fieldname or other criteria
    let folder = 'profile_images';

    const fileName = `${folder}/${Date.now()}_${file.originalname.replace(/\s+/g, '-')}`;
    
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    
    try {
      const command = new PutObjectCommand(params);
      await s3.send(command);
      return fileName;
    } catch (error) {
      console.error("Error uploading to S3:", error);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  };

  const generatePresignedUrl = async (key) => {
    try {
      if (!key || typeof key !== 'string') {
        console.error("Invalid key provided to generatePresignedUrl:", key);
        return null;
      }
      // If key already contains the full URL, extract just the path part
      if (key && key.includes('amazonaws.com')) {
        // Extract the key from a full S3 URL
        const urlParts = key.split('amazonaws.com/');
        if (urlParts.length > 1) {
          key = urlParts[1];
        }
      }
      
      // Only proceed if we have a valid key
      if (!key) return null;
      
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
      });
      
      // URL will expire in 1 hour (3600 seconds)
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      return url;
    } catch (error) {
      console.error("Error generating pre-signed URL:", error);
      return null;
    }
  };

module.exports = { upload, uploadToS3, generatePresignedUrl };