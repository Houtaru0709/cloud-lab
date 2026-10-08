import { useEffect, useState } from "react";
import StudentForm from "./StudentForm";

function App() {
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // URL BACKEND PORT 5000
  const API_URL =
    "https://cuddly-space-palm-tree-wrp654g4ppjg3vvr9-5000.app.github.dev/api/students";

  // =========================
  // LẤY DANH SÁCH SINH VIÊN
  // =========================
  const fetchStudents = async () => {
    try {
      setLoading(true);

      console.log("Đang lấy danh sách sinh viên...");

      const res = await fetch(API_URL);

      const text = await res.text();

      console.log("HTTP Status:", res.status);
      console.log("Backend trả về:", text);

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "Backend không trả về JSON. Kiểm tra lại URL Backend."
        );
      }

      console.log("Danh sách sinh viên:", data);

      setStudents(data);
    } catch (error) {
      console.error("Lỗi lấy danh sách:", error);
    } finally {
      setLoading(false);
    }
  };

  // Chạy khi mở trang
  useEffect(() => {
    fetchStudents();
  }, []);

  // =========================
  // SỬA SINH VIÊN
  // =========================
  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editName,
          email: editEmail,
        }),
      });

      const text = await res.text();

      console.log("Update response:", text);

      if (!res.ok) {
        throw new Error(
          `Cập nhật thất bại. HTTP ${res.status}`
        );
      }

      let updatedStudent;

      try {
        updatedStudent = JSON.parse(text);
      } catch {
        throw new Error(
          "Backend không trả về JSON khi cập nhật."
        );
      }

      setStudents((prev) =>
        prev.map((student) =>
          student._id === id ? updatedStudent : student
        )
      );

      setEditId(null);
      setEditName("");
      setEditEmail("");

      alert("Cập nhật thành công!");
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert(error.message);
    }
  };

  // =========================
  // XÓA SINH VIÊN
  // =========================
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const text = await res.text();

      console.log("Delete response:", text);

      if (!res.ok) {
        throw new Error(
          `Xóa thất bại. HTTP ${res.status}`
        );
      }

      setStudents((prev) =>
        prev.filter((student) => student._id !== id)
      );

      alert("Xóa sinh viên thành công!");
    } catch (error) {
      console.error("Lỗi xóa:", error);
      alert(error.message);
    }
  };

  // =========================
  // GIAO DIỆN
  // =========================
  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2c3e50",
        }}
      >
        Danh sách sinh viên 2.0
      </h1>

      {/* Form thêm sinh viên */}
      <StudentForm onAdded={fetchStudents} />

      <h3>
        Tổng số sinh viên: {students.length}
      </h3>

      {/* Hiển thị loading */}
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
          }}
        >
          {/* Không có dữ liệu */}
          {students.length === 0 ? (
            <p>Chưa có sinh viên nào.</p>
          ) : (
            students.map((student) => (
              <li
                key={student._id}
                style={{
                  background: "#ecf0f1",
                  marginBottom: "10px",
                  padding: "12px",
                  borderRadius: "6px",
                }}
              >
                {/* ======================
                    FORM SỬA
                ====================== */}
                {editId === student._id ? (
                  <div>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) =>
                        setEditName(e.target.value)
                      }
                      placeholder="Tên sinh viên"
                    />

                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) =>
                        setEditEmail(e.target.value)
                      }
                      placeholder="Email"
                      style={{
                        marginLeft: "8px",
                      }}
                    />

                    <button
                      onClick={() =>
                        handleUpdate(student._id)
                      }
                      style={{
                        marginLeft: "8px",
                      }}
                    >
                      Lưu
                    </button>

                    <button
                      onClick={() => {
                        setEditId(null);
                        setEditName("");
                        setEditEmail("");
                      }}
                      style={{
                        marginLeft: "5px",
                      }}
                    >
                      Hủy
                    </button>
                  </div>
                ) : (
                  /* ======================
                     HIỂN THỊ SINH VIÊN
                  ====================== */
                  <div>
                    <strong>
                      {student.studentId}
                    </strong>

                    {" - "}

                    <strong>
                      {student.name}
                    </strong>

                    {" - "}

                    <em>
                      {student.email}
                    </em>

                    {/* Nút sửa */}
                    <button
                      onClick={() => {
                        setEditId(student._id);
                        setEditName(
                          student.name || ""
                        );
                        setEditEmail(
                          student.email || ""
                        );
                      }}
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      Sửa
                    </button>

                    {/* Nút xóa */}
                    <button
                      onClick={() =>
                        handleDelete(student._id)
                      }
                      style={{
                        marginLeft: "5px",
                      }}
                    >
                      Xóa
                    </button>
                  </div>
                )}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default App;