import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  // Hardcoded student info 
  const studentName = 'Vertti Ruotsalainen';
  const studentGroup = 'ATIS22K';

  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({ name: '', grade: '' });
  const [editingId, setEditingId] = useState(null);

  const apiUrl = 'http://localhost:5000/courses';

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await axios.get(apiUrl);
    setCourses(res.data);
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${apiUrl}/${editingId}`, formData);
    } else {
      await axios.post(apiUrl, formData);
    }
    setFormData({ name: '', grade: '' });
    setEditingId(null);
    fetchCourses();
  };

  const handleEdit = course => {
    setFormData({ name: course.name, grade: course.grade });
    setEditingId(course.id);
  };

  const handleDelete = async id => {
    await axios.delete(`${apiUrl}/${id}`);
    fetchCourses();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>{studentName}</h1>
      <h2>Group: {studentGroup}</h2>
      <h3>My Courses</h3>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          name="name"
          placeholder="Course Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="grade"
          placeholder="Grade"
          value={formData.grade}
          onChange={handleChange}
          required
        />
          <button type="submit">
          {editingId ? 'Update' : 'Add'} Course
        </button>
      </form>

      {/* Boxed table wrapper */}
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f9f9f9' }}>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #ddd' }}>Course Name</th>
              <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #ddd' }}>Grade</th>
              <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #ddd' }}>Edit</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{course.name}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{course.grade}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                  <button onClick={() => handleEdit(course)} style={{ marginRight: '8px' }}>Edit</button>
                  <button onClick={() => handleDelete(course.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;