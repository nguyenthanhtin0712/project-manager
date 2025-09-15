-- Tạo bảng users
CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	role VARCHAR(10) CHECK (role IN ('admin', 'user')) DEFAULT 'user',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
	title VARCHAR(100) NOT NULL,
	description TEXT,
	deadline DATE,
	priority VARCHAR(10) CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
	status VARCHAR(10) CHECK (status IN ('todo', 'doing', 'done')) DEFAULT 'todo',
	tags VARCHAR(50)[] DEFAULT ARRAY[]::VARCHAR[],
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- bật extension (chỉ cần chạy 1 lần trên DB)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- chèn admin (mật khẩu 'admin'), nếu email đã tồn tại thì bỏ qua
INSERT INTO users (username, email, password, role)
VALUES (
  'admin',
  'admin@example.com',
  crypt('admin', gen_salt('bf')),
  'admin'
)
ON CONFLICT (email) DO NOTHING;

-- SELECT * 
-- FROM users
-- ORDER BY id ASC;