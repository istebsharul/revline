import logger from "../utils/logger.js";

const asyncErrors = (requestHandler) => {
    return (req, res, next) => {
        try {
            Promise.resolve(requestHandler(req, res, next)).catch(next);
        } catch (error) {
            logger.error(error);
            next(error);
        }
    };
};

export default asyncErrors;