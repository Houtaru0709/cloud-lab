import { useEffect, useState } from 'react';
import StudentForm from './StudentForm';

function App() {
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  // Lấy danh sách sinh viên từ backend
  const fetchStudents = async () => {
    const res = await fetch('http://localhost:5000/api/students'); // sửa URL
    setStudents(await res.json());
  };

  useEffect(() => { fetchStudents(); }, []);

  // Hàm sửa sinh viên
  const handleUpdate = async (id) => {
    const res = await fetch(`http://localhost:5000/api/students/${id}`, { // sửa URL
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName, email: editEmail })
    });
    const updated = await res.json();
    setStudents(students.map(s => s._id === id ? updated : s));
    setEditId(null);
    setEditName('');
    setEditEmail('');
  };

  // Hàm xóa sinh viên
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/students/${id}`, { method: 'DELETE' }); // sửa URL
    setStudents(students.filter(s => s._id !== id));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Danh sách sinh viên</h1>

      {/* Form thêm sinh viên */}
      <StudentForm onAdded={fetchStudents} />

      {/* Danh sách sinh viên */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {students.map(s => (
          <li key={s._id} style={{ background: '#ecf0f1', marginBottom: '8px', padding: '10px', borderRadius: '4px' }}>
            {editId === s._id ? (
              <div>
                <input
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  placeholder="Tên mới"
                  style={{ marginRight: '8px' }}
                />
                <input
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  placeholder="Email mới"
                  style={{ marginRight: '8px' }}
                />
                <button onClick={() => handleUpdate(s._id)}>Lưu</button>
                <button onClick={() => setEditId(null)}>Hủy</button>
              </div>
            ) : (
              <div>
                <strong>{s.name}</strong> - <em>{s.email}</em>
                <button style={{ marginLeft: '10px' }} onClick={() => {
                  setEditId(s._id);
                  setEditName(s.name);
                  setEditEmail(s.email);
                }}>Sửa</button>
                <button style={{ marginLeft: '5px' }} onClick={() => handleDelete(s._id)}>Xóa</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
