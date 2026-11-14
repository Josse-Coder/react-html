function toggleMenu() {
    document.getElementById('nav-menu').classList.toggle('active');
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function pilihDanSalin(input) {
input.select();
input.setSelectionRange(0, 99999);

navigator.clipboard.writeText(input.value)
.then(() => {
    window.parent.showToast("Copy To Clipboard", "info"); // Pastikan 'info' adalah string
})
.catch(err => {
    console.error('Gagal menyalin teks: ', err);
});
}






function simulateLoading() {
const start = Date.now();
fetch("https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png", { mode: "no-cors" })
    .then(() => {
        const elapsed = Date.now() - start;
        console.log("Waktu loading:", elapsed, "ms");

        setTimeout(() => {
            document.getElementById("loading").style.display = "none";
        }, elapsed);
    })
    .catch(() => {
        setTimeout(() => {
            document.getElementById("loading").style.display = "none";
        }, 3000);
    });
}

// Call the simulateLoading function to start the loading screen
simulateLoading();





window.addEventListener('contextmenu', function (e) {
    e.preventDefault(); // Nonaktifkan menu klik kanan
    window.parent.showToast("KLIK KANAN DINONAKTIFKAN", "info")
});

// Mencegah refresh dengan tombol browser Back/Forward atau reload





document.addEventListener('keydown', function(event) {
    // Mencegah F12, Ctrl+Shift+I, dan Ctrl+U
    if (event.key === 'F12')
      {
        event.preventDefault();
          window.parent.showToast("F12 DINONAKTIFKAN!", "info")
    }
        });



document.addEventListener('keydown', function(event) {
    // Mencegah F12, Ctrl+Shift+I, dan Ctrl+U
    if (event.ctrlKey && event.shiftKey && event.key === 'I')
      {
        event.preventDefault();
       window.parent.showToast("CTRL + SHIFT + I DINONAKTIFKAN!", "info");
    }
        });


document.addEventListener('keydown', function(event) {
    // Mencegah F12, Ctrl+Shift+I, dan Ctrl+U
    if (event.ctrlKey && event.shiftKey && event.key === 'i')
      {
        event.preventDefault();
       window.parent.showToast("CTRL + SHIFT + i DINONAKTIFKAN!", "info");
    }
        });

document.addEventListener('keydown', function(event) {
// Cek jika tombol yang ditekan adalah Ctrl + U
if (event.ctrlKey && event.key === 'U') {
event.preventDefault(); // Mencegah default behavior
window.parent.showToast("CTRL + U DINONAKTIFKAN!", "info");
}
});

document.addEventListener('keydown', function(event) {
// Cek jika tombol yang ditekan adalah Ctrl + U
if (event.ctrlKey && event.key === 'u') {
event.preventDefault(); // Mencegah default behavior
window.parent.showToast("CTRL + u DINONAKTIFKAN!", "info");
}
});
function checkInternetConnection() {
    if (navigator.onLine) {
        // Jika online, sembunyikan notifikasi
        document.getElementById("status-container").style.display = "none";
    } else {
        // Jika offline, tampilkan notifikasi
        document.getElementById("status-container").style.display = "block";
    }
}

// Event listener ketika status online atau offline berubah
window.addEventListener("online", checkInternetConnection);
window.addEventListener("offline", checkInternetConnection);

// Mengecek koneksi saat halaman pertama kali dimuat
checkInternetConnection();
var form = document.getElementById('Send');
        form.addEventListener("submit", e => {
          e.preventDefault();
          fetch(form.action, {
              method : "POST",
              body: new FormData(document.getElementById("Send")),
          }).then(
              response => response.json()
          ).then((html) => {
            // you can put any JS code here
            window.parent.dismissPromiseToast(toastId);
            window.showToast("Sukses Mengirim", "success")
          });
        });


        function showDonationOptions() {
            Swal.fire({
                title: "Mau donasi/payment menggunakan apa kak?",
                icon: "question",
                showDenyButton: true,
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText: "Bank Payment",
                denyButtonText: "Saweria Donasi",
                cancelButtonText: "Batal",
                showCloseButton: true,
                footer: '<button id="qrcode-btn" class="swal2-confirm swal2-styled">QR Code</button>',
                didOpen: () => {
                    document.getElementById("qrcode-btn").addEventListener("click", () => {
                        showQRCode();
                    });
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "http://lynk.id/payme/jossestore"; // Ganti dengan URL Bank
                } else if (result.isDenied) {
                   window.location.href="https://saweria.co/jossechristianwijaya" // Ganti dengan URL Saweria
                }
            });
        }

        function showQRCode() {
            let qrImageUrl = "https://yourdomain.com/qrcode.png"; // Ganti dengan URL gambar QR Code

            Swal.fire({
                title: "Layanan Donasi QRcode Belum Ada",
                html: `
                    <p>Scan QR Code di bawah atau klik tombol untuk mendownload.</p>
                    <img src="${qrImageUrl}" id="qrImage" style="width: 200px; height: 200px; border: 1px solid #ccc;">
                `,
                showCancelButton: true,
                confirmButtonText: "Download QR Code"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.parent.showToast("Anda Tidak Di Izinkan", "error")
                }
            });
        }