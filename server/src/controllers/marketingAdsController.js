import MarketingAds from '../models/marketingAdsModel.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';

// Get All Marketing Campaigns
export const getMarketingCampaigns = asyncErrors(async (req, res) => {
    const campaigns = await MarketingAds.find();

    res.status(200).json({ campaigns });
});

// Create Marketing Campaign
export const createMarketingCampaign = asyncErrors(async (req, res) => {
    const { userId, platform, campaignName, status, impressions, clicks, spend } = req.body;

    const campaign = new MarketingAds({
        userId,
        platform,
        campaignName,
        status,
        impressions,
        clicks,
        spend
    });

    await campaign.save();

    res.status(201).json({ message: 'Marketing campaign created successfully', campaign });
});

// Update Marketing Campaign
export const updateMarketingCampaign = asyncErrors(async (req, res) => {
    const { id } = req.params;
    const { status, impressions, clicks, spend } = req.body;

    const campaign = await MarketingAds.findByIdAndUpdate(
        id,
        { status, impressions, clicks, spend, updatedAt: Date.now() },
        { new: true, runValidators: true }
    );

    if (!campaign) {
        return res.status(404).json({ message: 'Campaign not found' });
    }

    res.status(200).json({ message: 'Marketing campaign updated successfully', campaign });
});
