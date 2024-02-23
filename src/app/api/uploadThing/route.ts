import { createNextRouteHandler } from "uploadthing/next";

import { OurFileRouter } from "./core";

export const { GET, POST } = createNextRouteHandler({ router: OurFileRouter });
