CREATE DATABASE IF NOT EXISTS db_lab_web;
USE db_lab_web;

CREATE TABLE IF NOT EXISTS produk (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama_produk VARCHAR(100) NOT NULL,
  kategori VARCHAR(50) NOT NULL,
  harga DECIMAL(10, 2) NOT NULL,
  stok INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO produk (nama_produk, kategori, harga, stok) VALUES
('Keyboard Mekanikal TKL', 'Periferal', 650000.00, 15),
('Mouse Gaming Wireless', 'Periferal', 350000.00, 20),
('Monitor LED 24 Inci 144Hz', 'Display', 1850000.00, 8);
