import express from 'express';
import authRoutes from '../../entities/auth/auth.routes.js';
import userRoutes from '../../entities/user/user.routes.js';
import  dealerRoutes from '../../entities/addDealer/routes.js'
import submissionRoutes from '../../entities/addDealer/SUBMISSION/routes.js'
import sendEmail from '../../lib/sendEmail.js';
import { adminMail } from '../../core/config/config.js';
const router = express.Router();


router.use('/v1/auth', authRoutes);
router.use('/v1/user', userRoutes);

router.use("/v1/dealer", dealerRoutes);

router.use("/v1/submissions", submissionRoutes);


// Simple health endpoint to verify Resend email sending
router.get('/v1/health/email', async (req, res) => {
	try {
		const to = req.query.to || adminMail || 'delivered@resend.dev';
		const { success, id, error } = await sendEmail({
			to,
			subject: 'Hello World',
			html: '<strong>It works!</strong>',
		});

		res.status(success ? 200 : 500).json({ success, id, error });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});




export default router;
