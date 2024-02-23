import {
  generateUploadButton,
  generateUploadDropzone,
  generateUploader,
} from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter } from "@/app/api/uploadThing/core";

export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
export const UploadButton = generateUploadButton<OurFileRouter>();
export const Uploader = generateUploader<OurFileRouter>();

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
