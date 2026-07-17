# Fendi — Link Hub

Website kumpulan link dengan tema liquid glass + light blue.

## Struktur projek

```
link-hub/
├── index.html      → struktur & kandungan
├── css/
│   └── style.css    → design system, liquid glass, semua animation
├── js/
│   └── script.js     → cursor glow, ripple effect, parallax
└── README.md
```

## Cara guna

1. **Tukar link** — buka `index.html`, cari setiap `<a class="link-btn" href="#" ...>`,
   tukar `#` kepada URL sebenar anda.
2. **Tukar icon/label** — dalam setiap button ada `<span class="icon">🌐</span>` dan
   `<span class="label">Link 1 <small>...</small></span>` — tukar emoji dan teks ikut keperluan.
3. **Tambah/kurang button** — copy satu blok `<a class="link-btn">...</a>` untuk tambah,
   atau padam blok untuk kurangkan. Animation delay diset melalui `style="--delay:0.1s"`
   pada setiap button — susun ikut urutan (0.1s, 0.22s, 0.34s, ...) untuk kekalkan efek stagger.

## Deploy ke GitHub Pages

```bash
git init
git add .
git commit -m "Liquid glass link hub"
git branch -M main
git remote add origin <url-repo-anda>
git push -u origin main
```

Kemudian aktifkan GitHub Pages dalam **Settings → Pages → Branch: main**.

## Ciri-ciri

- **Liquid glass UI** — backdrop blur + saturate, sheen sweep on hover, border-radius
  yang berubah bentuk (liquid morph) semasa hover/klik.
- **Goo blob background** — SVG filter (`feGaussianBlur` + `feColorMatrix`) menghasilkan
  blob cecair yang bergabung antara satu sama lain secara organik.
- **Liquid distortion filter** — `feTurbulence` + `feDisplacementMap` tersedia (`#liquidDistort`)
  untuk digunakan pada mana-mana elemen jika mahu efek herotan cecair tambahan.
- **Cursor glow** — cahaya lembut yang mengikut pergerakan cursor (auto off pada touch device).
- **Ripple effect** — setiap klik button menghasilkan riak cecair dari titik klik.
- **Parallax blob** — blob bergerak halus mengikut posisi cursor.
- **Scroll/load reveal** — setiap elemen fade-in dengan stagger delay.
- **Respect `prefers-reduced-motion`** — semua animation automatik dimatikan jika
  pengguna set reduced motion pada sistem mereka.
