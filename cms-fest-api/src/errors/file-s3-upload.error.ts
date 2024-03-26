import { ApplicationError } from "@/protocols";

export function FileUploadError(): ApplicationError {
  return {
    name: "FileUploadError",
    message: "failed to upload file, check and try again.",
  };
}