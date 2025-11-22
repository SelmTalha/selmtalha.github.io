# Selim's Digital Chronicle - Statik Website

Modern ve modüler bir statik HTML/CSS/JavaScript website yapısı.

## 📁 Dosya Yapısı

```
/
├── index.html                    # Ana sayfa (Anasayfa)
├── about.html                    # Hakkımda sayfası
├── chess-blog.html              # Satranç yazıları listesi
├── photograph-gallery.html      # Fotoğraf galerisi
├── blog-post.html               # Blog yazısı detay sayfası (örnek)
│
├── css/
│   └── styles.css               # Ortak CSS stilleri
│
├── js/
│   ├── components.js            # 🔥 Navbar & Footer (TEK NOKTADAN YÖNETİM!)
│   ├── main.js                  # Vanta.js ve genel fonksiyonlar
│   └── gallery.js               # Galeri özel fonksiyonları
│
└── attached_assets/             # Kullanıcı varlıkları (resimler vb.)
```

## ✨ Özellikler

### 🎯 Modüler Yapı
- **Tek Noktadan Navbar Yönetimi**: `js/components.js` dosyasındaki navbar'ı değiştirdiğinizde TÜM sayfalara otomatik yansır
- **Ortak Footer**: Footer da tek yerden yönetilir
- **Ortak Stiller**: `css/styles.css` dosyasında tüm ortak CSS kodları

### 🎨 Tasarım
- **Vanta.js** animasyonlu arka planlar
- **Tailwind CSS** ile responsive tasarım
- **Feather Icons** modern ikonlar
- **Gradient** indigo-purple-gray renk paleti
- **Asimetrik Köşeler** (`rounded-tl-[5px] rounded-br-[5px]`) signature tasarım

### 📱 Sayfalar
1. **Ana Sayfa** (`index.html`) - Typewriter efekti ile karşılama
2. **Hakkımda** (`about.html`) - Biyografi, yetenekler, timeline
3. **Satranç Yazıları** (`chess-blog.html`) - Blog kartları
4. **Fotoğraf Galerisi** (`photograph-gallery.html`) - Lightbox modal, kategori filtreleme
5. **Blog Detay** (`blog-post.html`) - Markdown destekli yazı gösterimi

## 🔧 Navbar Değiştirme (ÖNEMLİ!)

Navbar'ı değiştirmek için **SADECE** `js/components.js` dosyasını düzenleyin:

```javascript
// js/components.js içinde navItems dizisini düzenleyin
const navItems = [
    { href: 'index.html', code: 'AA', label: 'Anasayfa', id: 'home' },
    { href: 'about.html', code: 'HA', label: 'Hakkımda', id: 'about' },
    // Yeni sayfa eklemek için:
    { href: 'yeni-sayfa.html', code: 'YS', label: 'Yeni Sayfa', id: 'yeni' }
];
```

Kaydettiğinizde **TÜM sayfalarda** navbar otomatik güncellenir! 🎉

## 🚀 Kullanım

1. **Sayfaları düzenleyin**: Her HTML dosyası kendi içeriğini barındırır
2. **Stilleri değiştirin**: `css/styles.css` dosyasını düzenleyin
3. **Navbar/Footer güncelleyin**: `js/components.js` dosyasını düzenleyin
4. **Yeni sayfa ekleyin**: 
   - Yeni HTML dosyası oluşturun
   - `js/components.js` içinde navItems dizisine ekleyin
   - HTML'de `<div id="navbar-container"></div>` ve `<div id="footer-container"></div>` ekleyin
   - Script'leri dahil edin: `<script src="js/components.js"></script>`

## 📦 Gerekli CDN Kütüphaneleri

Tüm sayfalarda kullanılan:
- **Tailwind CSS**: `https://cdn.tailwindcss.com`
- **Feather Icons**: `https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js`
- **Vanta.js**: `https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js`

Özel sayfalar için:
- **Typed.js** (Ana sayfa): `https://cdn.jsdelivr.net/npm/typed.js@2.0.12`
- **Marked.js** (Blog detay): `https://cdn.jsdelivr.net/npm/marked/marked.min.js`

## 🎨 Renk Paleti

```css
/* Ana Renkler */
Indigo: #5b21b6 (bg-indigo-600, bg-indigo-900)
Purple: #7c3aed (bg-purple-600, bg-purple-900)
Gray: #111827 (bg-gray-900)

/* Vurgular */
Orange: #ea580c (fotoğrafçılık)
Pink: #ec4899 (aksan rengi)
Yellow: #ca8a04 (hakkımda)
Green: #16a34a (öğrenme)
```

## 📝 Not

Bu proje **tamamen statik** bir yapıdır. Sunucu tarafı işlem gerektirmez, doğrudan tarayıcıda çalışır. Herhangi bir web sunucusunda veya GitHub Pages'de host edilebilir.

---

**Geliştirici:** Selim Talha Çağlar  
**Tarih:** Ocak 2025  
**Lisans:** Tüm hakları saklıdır
