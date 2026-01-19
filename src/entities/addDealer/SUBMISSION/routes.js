import express from 'express';
import {
  createAnnouncement,
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

export default router;
