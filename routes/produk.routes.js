const express = require('express');
const router = express.Router();
const produkController = require('../controllers/produk.controller');
const ProdukModel = require('../models/produk.model');

// READ
router.get('/produk', produkController.getDaftarProduk);

// CREATE
router.get('/produk/tambah', produkController.getFormTambah);
router.post('/produk/tambah', produkController.postTambahProduk);

// UPDATE
router.get('/produk/edit/:id', produkController.getFormEdit);
router.post('/produk/edit/:id', produkController.postUpdateProduk);

// DELETE
router.post('/produk/hapus/:id', produkController.postHapusProduk);

// ===== PENGUJIAN KEAMANAN (Pengalaman 6) =====
router.get('/uji-keamanan', async (req, res) => {
  const inputPayload = req.query.kategori; // Menangkap query string URL (?kategori=...)

  // Skenario A: Kueri Rentan Injeksi (aktifkan untuk Tes 1, comment Skenario B)
  // const hasil = await ProdukModel.getByKategoriInsecure(inputPayload);

  // Skenario B: Kueri Aman Prepared Statement (aktifkan untuk Tes 2)
  const hasil = await ProdukModel.getByKategoriSecure(inputPayload);

  res.json({
    input: inputPayload,
    totalDataDitemukan: hasil.length,
    data: hasil
  });
});

module.exports = router;
