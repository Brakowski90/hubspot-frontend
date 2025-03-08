// src/pages/companies.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: '',
    phone: '',
    email: '',
    picture: '',
  });
  const [editingCompany, setEditingCompany] = useState(null); // Track the company being edited
  const [showForm, setShowForm] = useState(false); // Toggle form visibility

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/companies')
      .then((response) => setCompanies(response.data))
      .catch((error) => console.error('Error fetching companies:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompany({ ...newCompany, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCompany) {
      axios
        .put(`http://localhost:8000/api/companies/${editingCompany._id}`, newCompany)
        .then((response) => {
          setCompanies(
            companies.map((company) =>
              company._id === editingCompany._id ? response.data : company
            )
          );
          setEditingCompany(null);
        })
        .catch((error) => console.error('Error updating company:', error));
    } else {
      axios
        .post('http://localhost:8000/api/companies', newCompany)
        .then((response) => {
          setCompanies([...companies, response.data]);
        })
        .catch((error) => console.error('Error adding company:', error));
    }
    setNewCompany({ name: '', phone: '', email: '', picture: '' });
    setShowForm(false);
  };

  const deleteCompany = (id) => {
    axios
      .delete(`http://localhost:8000/api/companies/${id}`)
      .then(() => setCompanies(companies.filter((company) => company._id !== id)))
      .catch((error) => console.error('Error deleting company:', error));
  };

  const startEditing = (company) => {
    setNewCompany(company);
    setEditingCompany(company);
    setShowForm(true);
  };

  return (
    <div 
      style={{ 
        padding: '50px', 
        marginLeft: '200px',
        maxWidth: '800px',  // Make the company list container narrower
        margin: '0 auto'  // Center the container
      }}
    >
      <h1 style={{ textAlign: 'center' }}>Companies</h1>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {showForm ? 'Cancel' : 'Add New Company'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginBottom: '20px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        >
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Company Name:</label>
            <input
              type="text"
              name="name"
              value={newCompany.name}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Phone Number:</label>
            <input
              type="text"
              name="phone"
              value={newCompany.phone}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input
              type="email"
              name="email"
              value={newCompany.email}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Picture URL:</label>
            <input
              type="text"
              name="picture"
              value={newCompany.picture}
              onChange={handleInputChange}
              placeholder="Enter picture URL"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {editingCompany ? 'Save Changes' : 'Add Company'}
          </button>
        </form>
      )}

      <ul>
        {companies.length > 0 ? (
          companies.map((company) => (
            <li
              key={company._id}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            >
              <img
                src={company.picture || 'https://via.placeholder.com/50'}
                alt={company.name}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: '15px',
                }}
              />
              <div style={{ flex: 1 }}>
                <strong>{company.name}</strong> - {company.phone} - {company.email}
              </div>
              <button
                onClick={() => startEditing(company)}
                style={{
                  backgroundColor: '#ffc107',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '5px 10px',
                  cursor: 'pointer',
                  marginRight: '5px',
                }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteCompany(company._id)}
                style={{
                  backgroundColor: '#ff4d4f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '5px 10px',
                  cursor: 'pointer',
                }}
              >
                X
              </button>
            </li>
          ))
        ) : (
          <li>No companies available</li>
        )}
      </ul>
    </div>
  );
};

export default Companies;
