import express from 'express';
import {
    getMarketingCampaigns,
    createMarketingCampaign,
    updateMarketingCampaign
} from '../controllers/marketingAdsController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

router.route('/marketing/campaigns').get(isAuthenticatedUser, authorizeRoles('admin'), getMarketingCampaigns);
router.route('/marketing/campaign').post(isAuthenticatedUser, authorizeRoles('admin'), createMarketingCampaign);
router.route('/marketing/campaign/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateMarketingCampaign);

export default router;
