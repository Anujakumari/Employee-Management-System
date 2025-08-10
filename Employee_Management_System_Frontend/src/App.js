import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8080/api/employees/${formData.id}`, formData);
      } else {
        await axios.post('http://localhost:8080/api/employees', formData);
      }
      fetchEmployees();
      resetForm();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const resetForm = () => {
    setFormData({ id: null, firstName: '', lastName: '', email: '', department: '' });
    setIsEditing(false);
  };

  return (
    <div className="container">
      <h1>Employee Management System</h1>

      {/* Form */}
      <div className="form-section">
        <h2>{isEditing ? 'Edit Employee' : 'Add Employee'}</h2>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" />
        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" />
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
        <input type="text" name="department" value={formData.department} onChange={handleInputChange} placeholder="Department" />
        <div className="button-group">
          <button onClick={handleSubmit} className="add-btn">{isEditing ? 'Update' : 'Add'} Employee</button>
          {isEditing && <button onClick={resetForm} className="cancel-btn">Cancel</button>}
        </div>
      </div>

      {/* Employee List */}
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th><th>Last Name</th><th>Email</th><th>Department</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>
                <button onClick={() => handleEdit(employee)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(employee.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
