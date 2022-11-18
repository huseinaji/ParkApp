# ParkApp
## Tools used
- Backend framework: expressJs

- Database: PostgreSql with Sequelize ORM

- Unit test: Jest, Supertest

## Available Scripts
In the backend project directory, you can run:

`npm run start` for start the app

`npm run test-dev` for development

`npm run test` for testing 

Open http://localhost:5000 to view it in your browser.
## Alur Sistem
### A. pencatatan:
- Ada pilihan kendaraan (mobil, motor)

- Ada inputan waktu masuk dan waktu keluar

- Tiap 1 jam mobil perlu membayar 5000, motor 2000

- Jam dibulatkan ke atas klo lebih dari 1 menit, misal mobil parkir 1 jam 1 menit 2 detik berarti bayarnya 10000, tetapi kalau 1 jam 56 detik bayarnya 5000

- 1 hari mobil perlu membayar 80000, motor 40000

- Hari tidak dibulatkan ke atas

### B. Data:
Di halaman ini tampilkan data parkir

tampilkan juga pencarian, tidak harus diisi semua:

- Tipe: mobil atau motor atau keduanya

- Waktu masuk dari x dan sampai y, bisa di isi salah satu atau keduanya

- Harga dari x dan sampai y, bisa di isi salah satu atau keduanya
