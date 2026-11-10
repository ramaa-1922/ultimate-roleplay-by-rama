# ULTIMATE ROLEPLAY — BY RAMA

Prototype game Android-ready berbasis HTML, CSS, JavaScript.

## Menjalankan
1. Ekstrak ZIP.
2. Buka `index.html` di browser modern, atau jalankan server lokal.
3. Buat karakter dan mulai bermain.
4. Data tersimpan otomatis di localStorage browser.

## Menjadi APK
Gunakan Node.js dan Capacitor:
```bash
npm init -y
npm install @capacitor/core @capacitor/cli
npx cap init "Ultimate Roleplay" "com.rama.ultimateroleplay"
```
Atur `webDir` ke folder web proyek (mis. `www`), salin file proyek ke `www`, lalu:
```bash
npm install @capacitor/android
npx cap add android
npx cap sync android
npx cap open android
```
Build APK melalui Android Studio. Perlu Android Studio + Android SDK.

## Sistem mod aman
Versi awal memakai manifest JSON deklaratif, bukan menjalankan JavaScript mentah. Ini disengaja: `eval()` terhadap kode paste bisa memberi mod akses berbahaya ke data/perangkat. Mod hanya dapat menambah konten melalui jenis yang diizinkan: `location`, `item`, `job`, `quest`, `event`.

Contoh mod:
```json
{
  "id": "mod-kota-rama",
  "name": "Mod Kota Baru",
  "apiVersion": 1,
  "content": [
    {
      "type": "location",
      "id": "pantai-rama",
      "name": "Pantai Rama",
      "description": "Pantai santai di pinggir kota."
    },
    {
      "type": "job",
      "id": "fotografer",
      "name": "Fotografer",
      "description": "Ambil foto untuk warga kota.",
      "pay": 180
    }
  ]
}
```
Masuk ke menu Mod Manager → Isi Contoh atau tempel JSON → Pasang Mod.

## Struktur
- `index.html`: antarmuka.
- `style.css`: tampilan.
- `js/game.js`: state, waktu, ekonomi dasar, save.
- `js/mods.js`: validasi dan pengelolaan mod.
- `js/app.js`: layar dan interaksi.

## Catatan fitur
Ini adalah fondasi v1 yang dapat dimainkan, bukan implementasi final seluruh daftar fitur. Multiplayer, transfer antarpemain, kendaraan lengkap, bisnis kompleks, kalender/cuaca dinamis, dan NPC dengan memori lanjutan belum tersedia.
