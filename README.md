# Project Manager (Ứng dụng Quản lý Dự án)

## Mục tiêu

- Quản lý công việc cá nhân/nhóm
- Có thể mở rộng thành ứng dụng quản lý dự án mini

## Công nghệ

- Frontend: Vue.js
- Backend: Node.js + Express
- Database: PostgreSQL

## Tính năng

- Đăng nhập/Đăng ký (JWT)
- CRUD project, phân loại trạng thái (todo, doing, done)
- Quản lý deadline, ưu tiên, tag
- Export dữ liệu CSV
- Quan hệ user-project

## Cấu trúc thư mục

- `frontend/`: Vue.js client
- `backend/`: Node.js + Express API
- `database/`: migration, cấu hình Postgres

## Hướng dẫn

- Cài đặt các dependencies cho từng phần
- Chạy backend và frontend riêng biệt
- Cài các thư viện trước khi chạy
- npm install
- npm install @vitejs/plugin-vue --save-dev
- npm install pg
- npm install bcrypt
- npm install cors

- Chạy backend: npm start
- Chạy frontend: npm run dev