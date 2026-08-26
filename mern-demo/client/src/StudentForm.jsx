import { useState } from 'react';

function StudentForm({ onAdded }) {
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, name, email })
    });

    if (res.ok) {
      const newStudent = await res.json();
      if (onAdded) onAdded(newStudent);
      setStudentId('');
      setName('');
      setEmail('');
    } else {
      console.error('❌ Lỗi khi thêm sinh viên');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input placeholder="MSSV" value={studentId} onChange={e => setStudentId(e.target.value)} required />
      <input placeholder="Họ tên" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <button type="submit">Thêm sinh viên</button>
    </form>
  );
}

export default StudentForm;
