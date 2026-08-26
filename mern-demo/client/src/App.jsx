import { useEffect, useState } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Lấy danh sách sinh viên từ backend
  useEffect(() => {
    fetch('/api/students')
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  // Thêm sinh viên mới
  const addStudent = async (e) => {
    e.preventDefault();
    await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, name, email })
    });
    const res = await fetch('/api/students');
    setStudents(await res.json());
    setStudentId('');
    setName('');
    setEmail('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Danh sách sinh viên</h1>

      <form onSubmit={addStudent} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          placeholder="MSSV"
          value={studentId}
          onChange={e => setStudentId(e.target.value)}
        />
        <input
          style={{ flex: 2, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          placeholder="Họ tên"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          style={{ flex: 2, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button
          type="submit"
          style={{ padding: '8px 12px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Thêm sinh viên
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {students.map(s => (
          <li
            key={s._id}
            style={{
              background: '#ecf0f1',
              marginBottom: '8px',
              padding: '10px',
              borderRadius: '4px'
            }}
          >
            <strong>{s.studentId}</strong> - {s.name} - <em>{s.email}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
