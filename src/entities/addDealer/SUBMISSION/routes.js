import express from "express";
import {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  getDashboardTotals,
} from "./controller.js";

const router = express.Router();

router.post("/", createAnnouncement);
router.get("/", getAllAnnouncements);
router.get("/totals", getDashboardTotals);
router.get("/:id", getAnnouncementById);

export default router;
