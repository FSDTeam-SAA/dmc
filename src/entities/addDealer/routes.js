import express from "express";
import {
  createDealer,
  getAllDealers,
  getDealerById,
  updateDealerPut,
  updateDealerPatch,
  deleteDealer,
} from "./controller.js";

const router = express.Router();

router.post("/create", createDealer);          // Create
router.get("/", getAllDealers);          // Get all
router.get("/:id", getDealerById);       // Get each
router.put("/:id", updateDealerPut);     // Update (PUT)
router.patch("/:id", updateDealerPatch); // Patch
router.delete("/:id", deleteDealer);     // Delete

export default router;
