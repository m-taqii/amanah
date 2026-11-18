import ImageKit from "@imagekit/nodejs";
import dotenv from "dotenv";
dotenv.config();

function getImageKitClient() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

  if (!privateKey || !publicKey || !urlEndpoint) {
    throw new Error(
      "ImageKit credentials missing! Please configure IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, and IMAGEKIT_URL_ENDPOINT in your api/.env file."
    );
  }

  return new ImageKit({
    privateKey,
    publicKey,
    urlEndpoint,
  });
}

async function uploadImage(fileBuffer, fileName = "food.jpg", folder = "/food-donations") {
  const client = getImageKitClient();

  const fileData = Buffer.isBuffer(fileBuffer)
    ? fileBuffer.toString("base64")
    : fileBuffer;

  const sanitizedFileName = (fileName || `food_${Date.now()}.jpg`).replace(/[^a-zA-Z0-9.-]/g, "_");

  const response = await client.files.upload({
    file: fileData,
    fileName: sanitizedFileName,
    folder,
  });

  return response.url;
}

export { uploadImage };
export default uploadImage;