import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

import S3Config from "@/config/awsS3.config";
import { environment } from "@/config/environment.config";

async function uploadBanner(file: any): Promise<string> {
  const { filename } = file;
  const pathfile = file.path;
  try {
    const fileContent = fs.readFileSync(pathfile);

    const uploadParams = {
      Bucket: environment.S3_NAME_BUCKET,
      Key: filename,
      Body: fileContent,
    };

    const command = new PutObjectCommand(uploadParams);

    await S3Config.send(command);

    const bucketEndpoint = `https://${environment.S3_NAME_BUCKET}.s3.amazonaws.com/`;
    const objectUrl = `${bucketEndpoint}${filename}`;

    return objectUrl;
  } catch (error) {
    console.log("error upload banner: ", error);
    return null;
  } 
}

async function deleteFileAwsS3(filename: string): Promise<Boolean> {
  try {
    const deleteParams = {
      Bucket: environment.S3_NAME_BUCKET,
      Key: filename,
    };

    const command = new DeleteObjectCommand(deleteParams);

    await S3Config.send(command);

    return true;
  } catch (error) {
    return false;
  }
}

const fileS3UploadService = {
  deleteFileAwsS3,
  uploadBanner,
};

export default fileS3UploadService;
