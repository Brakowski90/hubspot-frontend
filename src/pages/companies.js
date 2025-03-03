// //src/pages/companies

import { useState, useEffect } from 'react';
import axios from 'axios';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: '',
    phone: '',
    email: ''
  });

  // Fetch existing companies on component load
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/companies')
      .then((response) => setCompanies(response.data))
      .catch((error) => console.error('Error fetching companies:', error));
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompany({
      ...newCompany,
      [name]: value
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Post new company to the backend
    axios
      .post('http://localhost:8000/api/companies', newCompany)
      .then((response) => {
        // Add the newly added company to the companies list
        setCompanies([...companies, response.data]);

        // Clear the form
        setNewCompany({ name: '', phone: '', email: '' });
      })
      .catch((error) => console.error('Error adding company:', error));
  };

  // Handle deleting a company
  const deleteCompany = (id) => {
    axios
      .delete(`http://localhost:8000/api/companies/${id}`)
      .then(() => {
        // Remove the deleted company from the state
        setCompanies(companies.filter((company) => company._id !== id));
      })
      .catch((error) => console.error('Error deleting company:', error));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Companies</h1>

      {/* Form to add new company */}
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#f9f9f9',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px'
        }}
      >
        <h2 style={{ marginBottom: '15px', color: '#555' }}>Add a New Company</h2>
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
          >
            Company Name:
          </label>
          <input
            type="text"
            name="name"
            value={newCompany.name}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
          >
            Phone Number:
          </label>
          <input
            type="text"
            name="phone"
            value={newCompany.phone}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={newCompany.email}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Add Company
        </button>
      </form>

      {/* Display companies list */}
      <ul
        style={{
          listStyleType: 'none',
          padding: '0',
          marginTop: '20px'
        }}
      >
        {companies.length > 0 ? (
          companies.map((company) => (
            <li
              key={company._id}
              style={{
                backgroundColor: '#fff',
                padding: '15px',
                borderRadius: '5px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <strong>{company.name}</strong> <br />
                <span style={{ color: '#555' }}>{company.phone}</span> <br />
                <span style={{ color: '#888' }}>{company.email}</span>
              </div>
              <button
                onClick={() => deleteCompany(company._id)}
                style={{
                  backgroundColor: '#ff4d4f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                X
              </button>
            </li>
          ))
        ) : (
          <li style={{ textAlign: 'center', color: '#888' }}>
            No companies available
          </li>
        )}
      </ul>
    </div>
  );
};

export default Companies;
