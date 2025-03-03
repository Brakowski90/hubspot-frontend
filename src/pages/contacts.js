//src/pages/contacts.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    email: '',
    picture: '',
  });

  const hardcodedContact = {
    _id: 'hardcoded',
    name: 'Albert Einstein',
    phone: '123-456-7890',
    email: 'einstein@relativity.com',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg',
  };

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/contacts')
      .then((response) => setContacts([hardcodedContact, ...response.data]))
      .catch((error) => console.error('Error fetching contacts:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/contacts', newContact)
      .then((response) => {
        setContacts([...contacts, response.data]);
        setNewContact({ name: '', phone: '', email: '', picture: '' });
      })
      .catch((error) => console.error('Error adding contact:', error));
  };

  const deleteContact = (id) => {
    if (id === 'hardcoded') {
      alert('Cannot delete a hardcoded contact.');
      return;
    }
    axios
      .delete(`http://localhost:8000/api/contacts/${id}`)
      .then(() => setContacts(contacts.filter((contact) => contact._id !== id)))
      .catch((error) => console.error('Error deleting contact:', error));
  };

  return (
    <div style={{ padding: '20px', marginLeft: '250px' }}>
      <h1>Contacts</h1>

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
          <label style={{ display: 'block', marginBottom: '5px' }}>Contact Name:</label>
          <input
            type="text"
            name="name"
            value={newContact.name}
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
            value={newContact.phone}
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
            value={newContact.email}
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
            value={newContact.picture}
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
          Add Contact
        </button>
      </form>

      <ul>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <li
              key={contact._id}
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
                src={contact.picture || 'https://via.placeholder.com/50'}
                alt={contact.name}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: '15px',
                }}
              />
              <div style={{ flex: 1 }}>
                <strong>{contact.name}</strong> - {contact.phone} - {contact.email}
              </div>
              <button
                onClick={() => deleteContact(contact._id)}
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
          <li>No contacts available</li>
        )}
      </ul>
    </div>
  );
};

export default Contacts;
