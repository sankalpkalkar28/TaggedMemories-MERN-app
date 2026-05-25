const express = require('express');
const router = express.Router();
const { getMemories, createMemory, updateMemory, deleteMemory } = require('../controllers/memoryController');
const upload = require('../middleware/upload');

router.get('/', getMemories);
router.post('/', upload.single('image'), createMemory);
router.put('/:id', upload.single('image'), updateMemory);
router.delete('/:id', deleteMemory);

module.exports = router;