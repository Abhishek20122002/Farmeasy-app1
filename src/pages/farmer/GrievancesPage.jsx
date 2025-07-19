import React, { useState } from 'react';
import { submitGrievance } from '../../services/farmer-service';

const GrievancesPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      return setMessage({ type: 'error', text: 'All fields are required!' });
    }

    setLoading(true);
    try {
      await submitGrievance(formData);
      setMessage({ type: 'success', text: 'Grievance submitted successfully!' });
      setFormData({ title: '', description: '' });
    } catch (error) {
      console.error('Grievance submission failed:', error);
      setMessage({ type: 'error', text: 'Failed to submit grievance. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-green-800">📩 Submit Grievance</h2>

      {message.text && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Enter grievance title"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Describe your issue"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Grievance'}
        </button>
      </form>
    </div>
  );
};

export default GrievancesPage;
