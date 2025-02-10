import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import sharp from "sharp";
import { randomUUID } from "crypto";
import { AWS_DATA } from "../../../infra/config";

export class S3MediaService {
  private s3Client: S3Client;
  private bucket: string;
  private region: string;

  constructor() {
    this.region = AWS_DATA.aws_region;
    this.bucket = AWS_DATA.aws_bucket_name;

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: AWS_DATA.aws_access_key_id,
        secretAccessKey: AWS_DATA.aws_secret_access_key,
      },
    });
  }

  /**
   * Uploads an image to S3 with optional resizing and quality settings.
   * @param file - The image buffer to be uploaded.
   * @param path - The folder path where the file should be stored.
   * @param options - Optional image processing settings.
   * @returns The stored file path (not the full URL).
   */
  async uploadImage(
    file: Buffer,
    path: string,
    filename?: string,
    options?: { width?: number; height?: number; quality?: number }
  ): Promise<string> {
    try {
      // Process image using sharp
      const processedImage = await sharp(file)
        .resize(options?.width ?? 400, options?.height ?? 400, {
          fit: "cover",
          position: "center",
        })
        .jpeg({ quality: options?.quality ?? 80 })
        .toBuffer();

      const fileName = filename ?? `${randomUUID()}`;
      const key = `${path}/${fileName}`.replace(/\/+/g, "/"); // Normalize path

      // Upload to S3
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: processedImage,
          ContentType: "image/jpeg",
        })
      );

      return key; // Return only the path, not the full URL
    } catch (error) {
      console.error("Error uploading to S3:", error);
      throw new Error("Failed to upload file to S3");
    }
  }

  /**
   * Deletes an image from S3 given its path.
   * @param filePath - The path of the file to delete.
   */
  async deleteImage(filePath: string): Promise<void> {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucket,
          Key: filePath,
        })
      );
    } catch (error) {
      console.error("Error deleting from S3:", error);
      throw new Error("Failed to delete file from S3");
    }
  }
}

export const s3MediaService = new S3MediaService();
