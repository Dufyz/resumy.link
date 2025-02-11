import api from "@/config/api";
import { ApiError } from "@/errors/api-error";
import { Either, failure, success } from "@/lib/either";

export async function postFile(body: {
  file: File;
  file_path: string;
  filename?: string;
}): Promise<
  Either<
    ApiError,
    {
      file_path: string;
      message: string;
    }
  >
> {
  const formData = new FormData();
  formData.append("file", body.file);
  formData.append("file_path", body.file_path);

  if (body.filename) formData.append("filename", body.filename);

  try {
    const response = await api.post("/bucket", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return success(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return failure({
      status: error.response.status,
      message: error.response.data,
    });
  }
}
