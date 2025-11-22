---
title: "🎮 SelTCraft Tanıtımı"
layout: post
date: 2018-08-09 22:22
headerImage: false
projects: true
hidden: true # don't count this post in blog pagination
description: "SelTCraft Oyun Tanıtımı"
category: Projelerim
author: SelmTalha
externalLink: false
img: "img/selcraft.jpg"
---

Üniversiteye hazırlandığım dönemde başladığım ve bitirmek için herşeyi erteleyip üzerinde yoğunlaştığım 6 aylık game maker tecrübemin meyvesini sizlere sunuyorum.

Yıl 2017 .Sistem gereksinimleri ve bilgisayar donanımı itibariyle iyi bir bilgisayara sahip olmadığımdan 3d oyunlar yerine 2d platform oyunlarına ilgimin yoğunlaştığı bu dönemde amacım yeni neslin özgün düşünce yapısını geliştiren minecraft'ın 2 boyutlu versiyonunu yapmaktı.Bunun için bolca minecraft çakması oyunların incelemesini yaptım.

Henüz kod yazma seviyemin gelişmemiş olmasını göz önünde bulundurarak bazı durumlarda işimi fazlasıyla kolaylaştıracağını düşündüğüm , içerisinde hem kod yazmayı ve hem de sürükle bırak yöntemini barındıran editör game maker'i seçtim.

Sprite içeriklerinin hazırlanmasında iyi olmadığım için o konuda yalnızca geometrik şekilleri kullandım.Minecraft oyunu içerisinde ki karakterlerin kare ve dikdörtgenden oluşması da bu durumu destekledi.

Oyun yapımını parçalara ayırdım.Algoritmanın önemini o zamanlarda bilmediğim için yapmam gereken kısmı bir gün içerisinde bitirmeliydim. Diğer günlere sarktığında hem kod fazlalığı hemde bilmediğim kısımların araştırılması sırasında eskiyi unutma artabilirdi.

İlk bölüm, harita içerisinde kutuların rastgele bir şekilde yerleşmesiydi. Bunun için 3 günlük video takibi ve metinsel araştırmalarla uğraştım.Sonunda yapabileceğim kod bloklarına hakim olduğumda yazmaya başladım.Kutular rastgele yerleşmişti.Ancak Ağaç için oluşturduğum bloklar çimlerin altında kalmıştı.Toprağın altında ağaç kökleri ve rastgele :) Bu sorunun çözümü için şu an bildiğim ama o zamanlar daha çok ezbere başvurduğum sınıflandırmaları kullandım.Bu şekilde ağaç toprağın üstünde ve yaprak ağaç kökünün üstünde olacak şekilde hoş bir görünüm elde ettim.

İkinci bölüm, level mantığı kurmak ve kutuların kırılmasıydı.(buna efekti paint vasıtasıyla yaptım) Level için ,istenilen kutu miktarında parçalama yapmaktı. En başta 20 kutu için bir level atlatıp sonra 10'ar kutu artırarak leveli yükselttim.(20-30-40..)

Üçüncü bölüm, gökyüzünün renk değiştirmesiydi.Bunu game makerin zaman araçlarını kullanarak yaptım.Hava karardığında kutuların renginin koyulaşması ve gökyüzü tamamen karardığında siyah olmasını sağladım.

Dördüncü bölüm, slot ve envanter sistemini öğrenmekti.Bu bölüm bu oyunu belkide en uzun sürede bitirmeme neden olan kısımdı.Çünkü slot ve envanter sistemini anlayabilmek için yaklaşık 12 tane tutorial yapmıştım. Slotların kontrol edilmesi envanterden slota aktarım.Aslında oyun dinamiklerinde istediğim şey yalnızca slottu.Farenin yuvarlak kısmını oynattığımda slottaki diğer kutuları seçicek ve onlar farenin sağ tuşu ile yere koyabilicektim.Ancak slot fazlasıyla matematik ve ince hesap gerektirdi.Şimdilerde aynı yapıyı gözümün önüne getirdiğimde bu kadar uğraşmama gerek yokmuş 6-7 satırla da halledebilirmişim diyorum :)

Beşinci ve son bölüm , slottan aldığım kutuları (ağaç ,çimen ,demir , altın) sağ tuş ile başka bir katı cismin üzerine koyabilmek ve önceki bölümlerdeki yapılanları burda birleştirmekti.Ne yazık ki bu bölüme kadar yavaş yavaş gelen dağılmalar ve ilgi alanının farklı alanlara yönelmesi beni konudan uzaklaştırmaya başlamıştı.Bu sebepten bu bölüme ait yapabildiğim tek şey slottan aldığımız kutuları sağ tuş ile katı cisimlerin üzerine koyabilmek oldu. Diğer level , gece - gündüz renk değişimi , kutu kararmaları gibi oyun dinamiklerini bu bölüme geçiremedim. Oyunun elimde kaynak dosyasının olmaması sebebiyle de devamını getiremedim.

5.Bölüm'e ait oyunun .exe halini de videonun altındaki linkten indirebilirsiniz. 
Buraya kadar anlattığım herşeyin kısa bir video tanıtımını da aşağıya bırakıyorum. İyi seyirler ... ↓

<iframe width="560" height="315" src="https://www.youtube.com/embed/mmWk3dlJ5Pc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[SelTCraft - 6.1.0.2](https://github.com/SelmTalha/seltcraft/blob/master/SelTCraft-6.1.0.2.exe?raw=true)

