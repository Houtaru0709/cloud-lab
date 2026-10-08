# 1. Sử dụng Node.js phiên bản nhẹ (Alpine)
FROM node:20-alpine

# 2. Tạo thư mục làm việc bên trong container
WORKDIR /app

# 3. Sao chép package.json và package-lock.json để cài đặt dependencies trước (tối ưu Docker cache)
COPY package*.json ./

# 4. Cài đặt các thư viện (chỉ cài production dependencies)
RUN npm install --production

# 5. Sao chép toàn bộ source code vào container
COPY . .

# 6. Khai báo cổng 5000 để Render nhận diện
EXPOSE 5000

# 7. Ép biến môi trường PORT=5000 và khởi chạy ứng dụng
ENV PORT=5000
CMD ["node", "server.js"]