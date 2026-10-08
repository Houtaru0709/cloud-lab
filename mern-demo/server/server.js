const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Student = require("./Student/student");

const app = express();

// CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    console.log("📌 Database:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// Route mặc định kiểm tra trạng thái Server (Sửa lỗi Cannot GET /)
app.get("/", (req, res) => {
  res.status(200).json({
    message: "🚀 Backend Node.js đang hoạt động bình thường!",
    timestamp: new Date(),
  });
});

// Thêm sinh viên
app.post("/api/students", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Lấy danh sách sinh viên
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Cập nhật sinh viên
app.put("/api/students/:id", async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Xóa sinh viên
app.delete("/api/students/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});