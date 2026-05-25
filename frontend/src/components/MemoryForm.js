import React, { useState, useEffect } from 'react';
import './MemoryForm.css';

function MemoryForm({ onSubmit, initialData, isEditing, onCancel }) {
  const [formData, setFormData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    image: null
  });
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        creator: initialData.creator,
        title: initialData.title,
        message: initialData.message,
        tags: initialData.tags.join(', '),
        image: null
      });
      setPreview(initialData.imageUrl);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file
    });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('creator', formData.creator);
    submitData.append('title', formData.title);
    submitData.append('message', formData.message);
    submitData.append('tags', formData.tags);
    if (formData.image) {
      submitData.append('image', formData.image);
    }
    onSubmit(submitData);
    
    if (!isEditing) {
      setFormData({
        creator: '',
        title: '',
        message: '',
        tags: '',
        image: null
      });
      setPreview('');
    }
  };

  return (
    <div className="memory-form">
      <h2>{isEditing ? '✏️ Edit Memory' : '✨ Creating a Memory'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Creator Name *</label>
          <input
            type="text"
            name="creator"
            value={formData.creator}
            onChange={handleChange}
            required
            placeholder="Your name"
          />
        </div>
        
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Memory title"
          />
        </div>
        
        <div className="form-group">
          <label>Message *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Write your memory..."
          />
        </div>
        
        <div className="form-group">
          <label>Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="vacation, family, birthday"
          />
        </div>
        
        <div className="form-group">
          <label>Choose Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}
        </div>
        
        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            {isEditing ? 'Update' : 'Submit'}
          </button>
          {isEditing && (
            <button type="button" onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
          )}
          {!isEditing && (
            <button type="reset" className="clear-btn" onClick={() => {
              setFormData({
                creator: '',
                title: '',
                message: '',
                tags: '',
                image: null
              });
              setPreview('');
            }}>
              Clear
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default MemoryForm;