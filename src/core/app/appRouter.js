import express from 'express';
import authRoutes from '../../entities/auth/auth.routes.js';
import userRoutes from '../../entities/user/user.routes.js';
import  dealerRoutes from '../../entities/addDealer/routes.js'
import submissionRoutes from '../../entities/addDealer/SUBMISSION/routes.js'
const router = express.Router();


router.use('/v1/auth', authRoutes);
router.use('/v1/user', userRoutes);

router.use("/v1/dealer", dealerRoutes);

router.use("/v1/submissions", submissionRoutes);





export default router;
