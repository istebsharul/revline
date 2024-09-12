import express from 'express';
import { createInventoryEntry, getAllInventoryEntries, getInventoryEntryById, updateInventoryEntry, deleteInventoryEntry,importProducts } from '../controllers/inventoryController.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/add', createInventoryEntry);            // POST /api/inventory/
router.get('/list', getAllInventoryEntries);           // GET /api/inventory/
router.get('/:id', getInventoryEntryById);         // GET /api/inventory/:id
router.put('/:id', updateInventoryEntry);          // PUT /api/inventory/:id
router.delete('/:id', deleteInventoryEntry);       // DELETE /api/inventory/:id
router.post('/import', upload.single('file'), importProducts);

export default router;
