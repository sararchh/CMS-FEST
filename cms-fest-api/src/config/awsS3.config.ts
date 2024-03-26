import dotenv from "dotenv";
import { S3Client } from "@aws-sdk/client-s3";
import { environment } from "./environment.config";
dotenv.config();

const s3Client = new S3Client({
  region: environment.S3_REGION,
  credentials: {
    accessKeyId: environment.S3_ACCESS_KEY,
    secretAccessKey: environment.S3_SECRET_KEY,
  },
});

export default s3Client;
