import mongoose from 'mongoose';

const { Schema } = mongoose;

const marketingAdsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    platform: { type: String, required: true },
    campaignName: { type: String, required: true },
    status: { type: String, enum: ['active', 'paused', 'completed'], required: true },
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    spend: { type: Schema.Types.Decimal128, default: 0.0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const MarketingAds = mongoose.model('MarketingAds', marketingAdsSchema);

export default MarketingAds;
