import express from 'express';
import {
  createAnnouncement,
  deleteAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  getDashboardTotals,
  verifyDealerId
} from './controller.js';

const router = express.Router();

router.post('/verify-dealer', verifyDealerId);
router.post('/', createAnnouncement);
router.get('/', getAllAnnouncements);
router.get('/totals', getDashboardTotals);
router.get('/:id', getAnnouncementById);
router.delete('/:id', deleteAnnouncement);

export default router;
