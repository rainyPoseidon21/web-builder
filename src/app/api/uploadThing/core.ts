import { auth } from "@clerk/nextjs";
import { FileRouter, createUploadthing } from "uploadthing/server";

const f = createUploadthing();

const authenticateUser = () => {
  const user = auth();
  //   If you throw, the user will not be able to upload
  if (!user) throw new Error("Unauthorized");
  //   Whatever is returned here is accessible in onUploadComplete as "metadata"
  return user;
};

// FileRouter for you app, can contain multiple FileRoutes
export const OurFileRouter = {
  // Define as many FileRoutes as you like, each with unique routeslug
  subaccountLogo: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(authenticateUser)
    .onUploadComplete(() => {}),
  avatar: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(authenticateUser)
    .onUploadComplete(() => {}),
  agencyLogo: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(authenticateUser)
    .onUploadComplete(() => {}),
  media: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(authenticateUser)
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof OurFileRouter;
