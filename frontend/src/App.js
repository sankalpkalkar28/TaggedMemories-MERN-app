import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MemoryForm from './components/MemoryForm';
import MemoryCard from './components/MemoryCard';
import Footer from './components/Footer';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/memories';

function App() {
  const [memories, setMemories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      const response = await axios.get(API_URL);
      setMemories(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching memories:', error);
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      const response = await axios.post(API_URL, formData);
      setMemories([response.data, ...memories]);
    } catch (error) {
      console.error('Error creating memory:', error);
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, formData);
      setMemories(memories.map(memory => 
        memory._id === id ? response.data : memory
      ));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating memory:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this memory?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setMemories(memories.filter(memory => memory._id !== id));
      } catch (error) {
        console.error('Error deleting memory:', error);
      }
    }
  };

  const memoryToEdit = editingId ? memories.find(m => m._id === editingId) : null;

  return (
    <div className="app">
      <header className="header">
        <img src="https://tse4.mm.bing.net/th/id/OIP.HXnx7CAreLISeccdKg5SagHaHa?pid=Api&P=0&h=180" alt="TaggedMemories Logo" className="logo" />
        <h1>TaggedMemories</h1>
      </header>
      
      <div className="main-container">
        <div className="left-side">
          <h2>📸 My Memories</h2>
          {loading ? (
            <div className="loading">Loading memories...</div>
          ) : memories.length === 0 ? (
            <div className="no-memories">No memories yet. Create your first memory!</div>
          ) : (
            <div className="memories-grid">
              {memories.map(memory => (
                <MemoryCard
                  key={memory._id}
                  memory={memory}
                  onEdit={() => setEditingId(memory._id)}
                  onDelete={() => handleDelete(memory._id)}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="right-side">
          <MemoryForm
            onSubmit={editingId ? 
              (data) => handleUpdate(editingId, data) : 
              handleCreate
            }
            initialData={memoryToEdit}
            isEditing={!!editingId}
            onCancel={() => setEditingId(null)}
          />
        </div>
      </div>
      
      <Footer memoryCount={memories.length}/>
    </div>
  );
}

export default App;