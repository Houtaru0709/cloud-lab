import { useState } from "react";

function StudentForm({ onAdded }) {
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // URL BACKEND PORT 5000
  const API_URL =
    "https://cuddly-space-palm-tree-wrp654g4ppjg3vvr9-5000.app.github.dev/api/students";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          name,
          email,
        }),
      });

      const text = await res.text();

      console.log("HTTP Status:", res.status);
      console.log("Backend trả về:", text);

      if (!res.ok) {
        throw new Error(
          `Thêm sinh viên thất bại. HTTP ${res.status}`
        );
      }

      let newStudent;

      try {
        newStudent = JSON.parse(text);
      } catch {
        throw new Error(
          "Backend không trả về JSON. Kiểm tra lại Backend."
        );
      }

      console.log("Sinh viên mới:", newStudent);

      // Cập nhật lại danh sách
      if (onAdded) {
        await onAdded();
      }

      // Xóa form
      setStudentId("");
      setName("");
      setEmail("");

      alert("Thêm sinh viên thành công!");
    } catch (error) {
      console.error("Lỗi thêm sinh viên:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: "20px",
        display: "flex",
        gap: "5px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <input
        type="text"
        placeholder="MSSV"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Họ tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Đang thêm..." : "Thêm sinh viên"}
      </button>
    </form>
  );
}

export default StudentForm;