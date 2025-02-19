---
title: "Linux Dosya Sistemi"
layout: post
date: 2017-08-24 11:38
headerImage: true
image: "https://selmtalha.github.io/assets/blog/terminalbackls2.jpg"
tag: [linux dosya sistemi, linux , ubuntu , dosya sistemleri ,ext2,ext3,selim talha çağlar]
category: [Teknoloji,Linux]
author: SelmTalha
description: Linux Dosya Sistemi hakkında kısa bilgilendirme ..
---

Dosya yönetimi, verilerin sabit ve harici depolama birimlerine nasıl saklanacağı, organize edileceği ve buna bağlı olarak nasıl erişileceğini tanımlar. Linux işletim sisteminde en çok kullanılan dosya sistemi ext2 ve onun geliştirilmiş versiyonu olan ext3’tür.

#### EXT2 ?

1993 yılında geliştirilmiştir.İleriye dönük kolay geliştirilebilen bir dosya sistemi olarak tasarlanmıştır.Dolayısıyla dosya sistemi kodlarını kurulu bir sisteme uygulamak için birtakım yeni ayarlar yapılmasını gerektirmez.Bir dosya diske yazılırken, yazma işlemi bazen ardışık bloklar halinde, bazense ayrı ayrı bloklar halinde gerçekleşir. Ardışık bloklar halinde depolanmayan dosyalar, parçalanmış dosyalar (fragmented files) olarak adlandırılır. Parçalanmış dosyalar daha uzun sürede okunur.

#### EXT3 ?

Stephen Tweedie tarafından 2001 yılında geliştirilip kullanılmıştır.Halende günümüzde sıkça kullanılan dosya sistemlerinden biridir.Ext dosya sistemi standartlarının 3. sürümü ve Ext2 dosya sisteminin bir gelişmiş versiyonudur.Ext2 dosya sistemi yapısının sahip olduğu bütün özelliklerin yanısıra bir de günlükleme (journalling) özelliği vardır. Günlükleme özelliği, yapılan veya yapılmakta olan işlemlerin kayıtlarının tutulması işlemidir. Bu işlem sayesinde, sistemin zarar görmesi durumunda meydana gelen hasarlar, en kolay biçimde onarılabilir. Bunu faydası, herhangi bir sistem çökmesi durumunda, geri kurtarma işleminin süresinin azalmasıdır.

/bin  : Olması zorunlu temel komut dosyalarını içerir.

/boot  : Başlangıç için gerekli dosyaları bulundurur.

/dev  : Donanım dosyaları vardır.

/etc  : Sistem ayarlarını barındırır.

/lib  : Kütüphane dosyaları ve çekirdek(kernel) modülleri bulunur.

/media : Kaldırılabilir aygıtların (CD-ROM, USB bellek vb.) sisteme eklendiği klasördür.

/mnt  : Sistem açılışında otomatik olarak bağlanan sabit disk bölümleri bu dizin altında eklenir.

/opt  : Extra programların kurulması içindir.(3.Parti Yazılımlar)

/sbin  : Sistemi yöneticisiyle ilgili çalıştırabilir dosyaları tutar.

/srv  : Sistemin sunduğu hizmetlerle alakalıdır.

/tmp  : Geçici dosyaları tutmak içindir.

/usr  : Tüm kullanıcılarca paylaşılan verileri içeren dizindir.

/var  : Değişken verileri saklar.(Log dosyaları, e-posta ve yazıcı kuyrukları gibi)