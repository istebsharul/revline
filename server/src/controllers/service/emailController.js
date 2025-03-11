import asyncErrors from "../../middlewares/catchAsyncErrors.js";
import { sendPurchaseOrderEmail } from "../../utils/emailService.js";

export const purchaseEmailController = asyncErrors(async (req, res) => {
    const { email, year, make, model, partName, customerName, customerAddress } = req.body;

    // Validate required fields
    if (!email?.trim()) {
        return res.status(400).json({ success: false, message: "Supplier email is required." });
    }

    if (!year || !make || !model || !partName) {
        return res.status(400).json({ success: false, message: "Incomplete part details! Please provide Year, Make, Model, and Part Name." });
    }

    if (!customerName || !customerAddress) {
        return res.status(400).json({ success: false, message: "Customer details are missing! Name and Address are required." });
    }

    try {
        // Call email service to send the purchase order email
        await sendPurchaseOrderEmail({
            email: email.trim(),
            year,
            make,
            model,
            partName,
            customerName,
            customerAddress
        });

        res.status(200).json({ success: true, message: "Purchase order email sent successfully!" });

    } catch (error) {
        console.error("Error sending purchase order email:", error);
        res.status(500).json({ success: false, message: "Failed to send the purchase order. Please try again." });
    }
});
