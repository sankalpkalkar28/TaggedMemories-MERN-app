const Memory = require('../models/Memory');
const fs = require('fs');
const path = require('path');

// Get all memories
exports.getMemories = async (req, res) => {
  try {
    const memories = await Memory.find().sort({ createdAt: -1 });
    res.json(memories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create memory
exports.createMemory = async (req, res) => {
  try {
    const { creator, title, message, tags } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const memory = new Memory({
      creator,
      title,
      message,
      tags: tags.split(',').map(tag => tag.trim()),
      imageUrl
    });

    const savedMemory = await memory.save();
    res.status(201).json(savedMemory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update memory
exports.updateMemory = async (req, res) => {
  try {
    const { creator, title, message, tags } = req.body;
    const memory = await Memory.findById(req.params.id);
    
    if (!memory) {
      return res.status(404).json({ message: 'Memory not found' });
    }

    memory.creator = creator;
    memory.title = title;
    memory.message = message;
    memory.tags = tags.split(',').map(tag => tag.trim());
    
    if (req.file) {
      // Delete old image
      if (memory.imageUrl) {
        const oldImagePath = path.join(__dirname, '..', memory.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      memory.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedMemory = await memory.save();
    res.json(updatedMemory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete memory
exports.deleteMemory = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);
    
    if (!memory) {
      return res.status(404).json({ message: 'Memory not found' });
    }

    // Delete image file
    if (memory.imageUrl) {
      const imagePath = path.join(__dirname, '..', memory.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await memory.deleteOne();
    res.json({ message: 'Memory deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};