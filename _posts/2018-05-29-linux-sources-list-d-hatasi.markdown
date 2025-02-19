---
title: "Linux /etc/apt/sources.list.d/ Hatasının Kesin Çözümü"
layout: post
date: 2018-05-29 03:27
tag: [linux,terminal hataları,terminal,sources.list.d/ hatası]
headerImage: true
image: "https://selmtalha.github.io/assets/blog/terminalbackls3.jpg"
description: "Linux /etc/apt/sources.list.d/ hatası kesin çözümü"
category: [Teknoloji,Linux]
author: SelmTalha
externalLink: false
---

##### Windows,Ubuntu ,Mint ardından 4.işletim sistemi olarak eOs'a geçiş yaptığım şu zamanlarda hala hata ayıklamaları ve konsola alışmakla uğraşıyorum.Daha öncesinde ubuntu kullanmış olsamda uzun süre ayrı kalmam sıfırdan başlamamı gerektirdi.Bu süreçte öğrendiklerimi paylaşarak hem kendime ileride dönüp bakabileceğim notlar hemde yeni linux kullanıcılarının terminallerde sıklıkla karşılaştığı hatalara çözüm sunmaya çalışacağım.

`sudo apt update `

##### komutu sonrasında aldığım ubuntudan hatırladığım bir hatanın ,sonunda kesin bir çözümünü buldum. Hata çıktısı şu şekildedir:

`N: Geçersiz bir dosya adı uzantısına sahip olduğu için '/etc/apt/sources.list.d/' dizinindeki 'THE_PPA.list.save' dosyası yok sayılıyor.`

##### bu hata ne kadar çok ppa yüklerseniz o kadar göze çarpan bir sorun haline gelebiliyor.Dizine dosya kaydetmeyi yok saymanızı istiyor.Aksi halde .save dosyalarını /etc/apt/sources.list.d/ adresinden manuel olarak kaldırana kadar bu PPA'dan hiçbir şey yükleyemezsiniz.

##### Ubuntu kullandığım zamanlarda bu sorunu şu komut ile düzeltmeye çalışmıştım.

` sudo rm -r /etc/apt/sources.list.d/*.save`

##### Ancak bu işlem sürekli tekrar gerektiren bir işlem.Her ppa yüklediğinizde daha çok hata ile yeniden karşınıza gelince biraz can sıkıyor.Bu son bulduğum komut ile bu sorundan ilelebet kurtulabilirsiniz. 

` echo "Dir::Ignore-Files-Silently:: \"(.save|.distUpgrade)$\";" | sudo tee /etc/apt/apt.conf.d/99ignoresave`

##### Bilgisayarı yeniden başlatınız yada sistemin kendini yenilemesi için oturumdan çıkış yapıp yeniden giriniz.

##### Umarım sorununuza yardımcı olabilmişimdir.Sağlıcakla kalın ..





