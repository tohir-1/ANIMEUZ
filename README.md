# AnimeUZ

HTML5 + CSS3 + Vanilla JavaScript (framework yo‘q). LocalStorage, Fetch API ishlatilmaydi (backend yo‘q), HTML5 video player.

## Ishga tushirish
1. Arxivni oching.
2. `index.html` faylini brauzerda ikki marta bosib oching (server shart emas).
   Yoki: `python -m http.server 8000` → http://localhost:8000

## Ma’lumotlarni o‘zgartirish (`js/data.js`)
- Postersiz holatda chiroyli avtomatik poster chiziladi. O‘z rasmlaringiz uchun `assets/images/` ga qo‘ying va anime obyektida `poster`/`banner` yo‘lini yozing.
- Faqat birinchi 3 anime (Naruto, One Piece, Bleach) ning dastlabki 4 qismi **demo video** (ochiq litsenziyali Blender filmlari) bilan ulangan. Qolgan qismlarda "Video hozircha mavjud emas" chiqadi.
- Haqiqiy video: qismga `videoType:"html5"` + `videoUrl:"https://...mp4"` (ixtiyoriy `sources:[{label:"720p",url:"..."}]` — sifat tanlash), yoki `videoType:"youtube"` / `"embed"`. Faqat huquqingiz bo‘lgan manbalarni ishlating.

## Tekshirish ro‘yxati
- [ ] Header: logo, menyu, qidiruv (🔍), sevimlilar soni, tema, mobil menyu
- [ ] Hero carousel (nuqtalar, strelkalar, avto-aylanish)
- [ ] Katalog: qidiruv, 5 ta filter, 4 ta saralash, "Ko‘proq yuklash"
- [ ] Details: 4 tugma (Online ko‘rish, Google, Sevimli, Ulashish), noto‘g‘ri ID → bosh sahifa
- [ ] Watch: play, progress, ovoz, fullscreen, oldingi/keyingi qism, qismlar ro‘yxati
- [ ] Sevimlilar: qo‘shish/o‘chirish, bo‘sh holat, yangilanganda saqlanishi
- [ ] Janrlar sahifasi, tema saqlanishi, oxirgi ko‘rilgan qism

## Netlify
1. https://app.netlify.com/drop ga kiring.
2. `AnimeUZ` papkasini sudrab tashlang — sayt tayyor.
(Yoki GitHub'ga yuklab, Netlify'da "Import from Git" → Build command bo‘sh, Publish directory `.`)

## Kelajak
Backend (Node/Express yoki Supabase), admin panel (anime/qism qo‘shish), foydalanuvchi akkauntlari, izohlar, tomosha tarixi, CDN video xosting (HLS), sitemap.xml.
