import asyncErrors from '../../middlewares/catchAsyncErrors.js';
import PartsDetails from '../../models/form/partsDetails.js';
import Part from '../../models/parts.js';
import logger from '../../utils/logger.js';

// 1. Search for makes using Year
export const getMakesByYear = asyncErrors(async (req, res) => {
    const { year } = req.params;
    logger.info(`Fetching Makes for ${year}`);
    try {
        const parts = await PartsDetails.findOne({ year: year });
        // const makes = parts.length > 0 ? parts[0].makes.map(make => make.name) : [];
        res.json(parts);
    } catch (error) {
        logger.error(`Error fetching makes for year ${year}: ${error.message}`); // Log the error
        res.status(500).json({ message: error.message });
    }
});

// 2. Search for models using makes and year
export const getModelsByMakeAndYear = asyncErrors(async (req, res) => {
    const { year, make } = req.params;
    try {
        const parts = await PartsDetails.find({ year: year, "makes.name": make });
        if (parts.length > 0) {
            const models = parts[0].makes.find(m => m.name === make)?.models.map(model => model.name) || [];
            res.json(models);
        } else {
            logger.warn(`No parts found for year ${year} and make ${make}.`); // Log a warning if no parts found
            res.json([]); // No parts found
        }
    } catch (error) {
        logger.error(`Error fetching models for year ${year} and make ${make}: ${error.message}`); // Log the error
        res.status(500).json({ message: error.message });
    }
});

// 3. Search for trims using year and model
export const getTrimsByYearAndModel = asyncErrors(async (req, res) => {
    const { year, model } = req.params;
    try {
        const parts = await PartsDetails.find({ year: year });
        const trims = parts.length > 0 ? 
            parts[0].makes.flatMap(make => 
                make.models.find(m => m.name === model)?.trims || []
            ) : [];
        res.json(trims);
    } catch (error) {
        logger.error(`Error fetching trims for year ${year} and model ${model}: ${error.message}`); // Log the error
        res.status(500).json({ message: error.message });
    }
});

export const getParts = asyncErrors(async (req, res) => {
    try {
        const partsList = await Part.find(); // Assuming Part is your Mongoose model
        if (partsList.length === 0) {
            logger.warn('No parts found in the database');
            return res.status(404).json({ message: 'No parts found' });
        }
        // console.log(partsList); // Optional, for debugging
        res.json(partsList);
        logger.info('Parts fetched successfully');
    } catch (error) {
        logger.error(`Error fetching parts list: ${error.message}`, { error }); // Log with error message and stack trace
        res.status(500).json({ message: 'Server error, unable to fetch parts' });
    }
});
