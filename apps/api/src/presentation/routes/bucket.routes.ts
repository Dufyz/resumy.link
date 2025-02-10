import { Router } from "express";

import * as BucketController from "../controllers/bucket.controller";

const bucketRoutes = Router();

bucketRoutes.post("/bucket", BucketController.handlePostFile);

export default bucketRoutes;
