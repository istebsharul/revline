// routes/partDetailsRoutes.js
import express from "express";
import {
    getMakesByYear,
    getModelsByMakeAndYear,
    getParts,
    getTrimsByYearAndModel
} from "../controllers/user/formController.js";

const router = express.Router();

// Define routes
router.get("/makes/:year", getMakesByYear);
router.get("/model/:year/:make", getModelsByMakeAndYear);
router.get("/trim/:year/:model", getTrimsByYearAndModel);


// Routes for Parts
router.get('/parts',getParts);
export default router;
