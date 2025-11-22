---
title: Linux Dosya Sistemi Rehberi
date: 2025-03-08
reading: 14 dk okuma
tag: Linux
tags: Linux, Dosya Sistemi, Sistem, Yönetim
subtitle: Linux dosya sistemi yapısı, komutları ve pratik kullanım örnekleri
---

## Linux Dosya Sistemi Yapısı

Linux dosya sistemi, hiyerarşik bir yapıya sahiptir.

### Temel Dizinler

- `/` - Kök dizin
- `/home` - Kullanıcı dizinleri
- `/etc` - Sistem konfigürasyonu
- `/var` - Değişken veriler

## Önemli Komutlar

### Dosya İşlemleri

```bash
ls -la          # Dosyaları listele
cp kaynak hedef # Dosya kopyala
mv eski yeni    # Dosya taşı/ yeniden adlandır
rm dosya        # Dosya sil
```

### Dizin İşlemleri

```bash
mkdir dizin     # Dizin oluştur
rmdir dizin     # Boş dizin sil
cd dizin        # Dizin değiştir
pwd             # Mevcut dizini göster
```

## İzinler ve Sahiplik

```bash
chmod 755 dosya    # İzinleri değiştir
chown user:group   # Sahiplik değiştir
```

## Pratik İpuçları

- `~` ev dizinini temsil eder
- `.` mevcut dizini, `..` üst dizini temsil eder
- `*` wildcard karakter olarak kullanılır

## Sonuç

Linux dosya sistemi, güçlü ve esnek bir yapıya sahiptir.

