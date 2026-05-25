import React from 'react';
import './MemoryCard.css';

function MemoryCard({ memory, onEdit, onDelete }) {
  return (
    <div className="memory-card">
      <div className="memory-image">
        <img 
          src={`http://localhost:5000${memory.imageUrl}`} 
          alt={memory.title}
        />
      </div>
      <div className="memory-content">
        <h3>{memory.title}</h3>
        <p className="creator">By: {memory.creator}</p>
        <p className="message">{memory.message}</p>
        <div className="tags">
          {memory.tags.map((tag, index) => (
            <span key={index} className="tag">#{tag}</span>
          ))}
        </div>
        <div className="memory-actions">
          <button onClick={onEdit} className="edit-btn">Edit</button>
          <button onClick={onDelete} className="delete-btn">Delete</button>
        </div>
        <div className="memory-date">
          {new Date(memory.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

export default MemoryCard;