import { NEXT_PUBLIC_BUCKET_URL } from "@/config";

export default function getS3Image(path: string) {
  return `${NEXT_PUBLIC_BUCKET_URL}/${path}`;
}
