const db = require('../config/database');

const ProdukModel = {
  // READ (semua data)
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM produk ORDER BY id DESC');
    return rows;
  },

  // CREATE
  create: async (data) => {
    const sql = `
      INSERT INTO produk (nama_produk, kategori, harga, stok)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
      data.nama_produk,
      data.kategori,
      data.harga,
      data.stok
    ]);
    return result;
  },

  // READ (satu data berdasarkan id)
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM produk WHERE id = ?', [id]);
    return rows[0];
  },

  // UPDATE
  update: async (id, data) => {
    const sql = `
      UPDATE produk
      SET nama_produk = ?, kategori = ?, harga = ?, stok = ?
      WHERE id = ?
    `;
    const [result] = await db.query(sql, [
      data.nama_produk,
      data.kategori,
      data.harga,
      data.stok,
      id
    ]);
    return result;
  },

  // DELETE
  delete: async (id) => {
    const sql = 'DELETE FROM produk WHERE id = ?';
    const [result] = await db.query(sql, [id]);
    return result;
  },

  // ===== KHUSUS PERCOBAAN KEAMANAN (Pengalaman 6) =====

  // TIDAK AMAN: konkatenasi langsung (sangat rentan!)
  getByKategoriInsecure: async (kategoriInput) => {
    const rawSql = `SELECT * FROM produk WHERE kategori = '${kategoriInput}'`;
    console.log('\n[RAW VULNERABLE SQL QUERY]:', rawSql);
    const [rows] = await db.query(rawSql);
    return rows;
  },

  // AMAN: prepared statement
  getByKategoriSecure: async (kategoriInput) => {
    const secureSql = 'SELECT * FROM produk WHERE kategori = ?';
    console.log('\n[PREPARED STATEMENT QUERY]:', secureSql, 'WITH VALUE:', [kategoriInput]);
    const [rows] = await db.query(secureSql, [kategoriInput]);
    return rows;
  }
};

module.exports = ProdukModel;
