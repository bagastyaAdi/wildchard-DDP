const fs = require("fs"); // digunakan untuk berinteraksi dengan sistem berkas (file system)seperti membaca file, menulis file, menghapus file, membuat direktori, dan banyak lagi.
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const barangFile = "barang.txt";

//gambaran awal atau tampilan awal
function showMainMenu() {
  console.log("├────────────────────────────────────────────────┤");
  console.log("│   Repository Barang PT Maju Kena Mundur Kena   │");
  console.log("├────────────────────────────────────────────────┤");
  console.log("│                                                │");
  console.log("│   Masukan pilihan Anda:                        │");
  console.log("│                                                │");
  console.log("│   1. Input Barang                              │");
  console.log("│   2. Lihat Daftar Barang                       │");
  console.log("│   3. Cari Barang                               │");
  console.log("│   4. Tentang Aplikasi                          │");
  console.log("│   5. Keluar                                    │");
  console.log("└────────────────────────────────────────────────┘");
  rl.question("> Pilih menu: ", (choice) => {
    handleMenuChoice(choice);
  });
}

function handleMenuChoice(choice) {
  switch (choice) {
    case "1":
      inputBarang();
      break;
    case "2":
      lihatDaftarBarang();
      break;
    case "3":
      cariBarang();
      break;
    case "4":
      tentangAplikasi();
      break;
    case "5":
      keluarAplikasi();
      break;
    default:
      console.log("Pilihan tidak valid.");
      showMainMenu();
  }
}
//isi dari menu imput
function inputBarang() {
  rl.question("Masukkan nama barang: ", (nama) => {
    rl.question("Masukkan harga barang: ", (harga) => {
      rl.question("Masukkan stok barang: ", (stok) => {
        const dataBarang = `${nama},${harga},${stok}\n`;
        fs.appendFile(barangFile, dataBarang, (err) => {
          if (err) throw err;
          console.log("Barang berhasil ditambahkan.");
          showMainMenu();
        });
      });
    });
  });
}

function lihatDaftarBarang() {
  fs.readFile(barangFile, "utf8", (err, data) => {
    if (err) {
      console.error("Terjadi kesalahan dalam membaca data barang.");
      showMainMenu();
      return;
    }
    if (data.trim() === "") {
      console.log("Daftar barang kosong.");
    } else {
      console.log("Daftar Barang:");
      const lines = data.trim().split("\n");
      lines.forEach((line, index) => {
        const [nama, harga, stok] = line.split(",");
        console.log(
          `${index + 1}. Nama: ${nama}, Harga: ${harga}, Stok: ${stok}`
        );
      });
    }
    showMainMenu();
  });
}

function cariBarang() {
  rl.question("Masukkan kata kunci pencarian: ", (kataKunci) => {
    fs.readFile(barangFile, "utf8", (err, data) => {
      if (err) {
        console.error("Terjadi kesalahan dalam membaca data barang.");
        showMainMenu();
        return;
      }
      if (data.trim() === "") {
        console.log("Daftar barang kosong.");
      } else {
        console.log("Hasil Pencarian:");
        const lines = data.trim().split("\n");
        lines.forEach((line, index) => {
          const [nama, harga, stok] = line.split(",");
          if (nama.toLowerCase().includes(kataKunci.toLowerCase())) {
            console.log(
              `${index + 1}. Nama: ${nama}, Harga: ${harga}, Stok: ${stok}`
            );
          }
        });
      }
      showMainMenu();
    });
  });
}

function tentangAplikasi() {
  console.log("Ini adalah aplikasi konsol untuk mengelola daftar barang.");
  showMainMenu();
}

function keluarAplikasi() {
  console.log("Terima kasih telah menggunakan aplikasi kami. Selamat tinggal!");
  rl.close(); // Menutup interface readline dan mengakhiri program
}

// Mengecek apakah file barang.txt sudah ada atau belum.
fs.access(barangFile, fs.constants.F_OK, (err) => {
  if (err) {
    // Jika file belum ada, maka buat file tersebut.
    fs.writeFile(barangFile, "", (err) => {
      if (err) throw err;
      console.log(`${barangFile} berhasil dibuat.`);
      showMainMenu();
    });
  } else {
    // Jika file sudah ada, langsung tampilkan menu utama.
    showMainMenu();
  }
});
