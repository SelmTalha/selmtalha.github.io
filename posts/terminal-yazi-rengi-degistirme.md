---
title: Terminal Yazı Rengi Değiştirme Rehberi
date: 2025-03-03
reading: 7 dk okuma
tag: Linux
tags: Linux, Terminal, Renk, Özelleştirme
subtitle: Linux terminalinde yazı renklerini değiştirme ve özelleştirme yöntemleri
---

Bu yazımda terminal yazı rengini kendi görsel zevkinize göre değiştirebileceğiniz ayarları göstermeye çalışacağım.

Öncelikle Elementary Os Hera 5.1.7 kullandığımı belirtmeliyim.

Dosyalardan veri çektiğim bir python uygulaması üzerinde çalışıyordum.Uygulama içinde  bu dosya içeriklerini getirmeden önce dizinlerin içini görmek için herzaman kullandığım ls komutunu yazdım. Çıktıda beni rahatsız eden hatta yazıyı seçmeme rağmen okuyamadığım bir yeşillik vardı.Yazı rengi yeşil olsa yine siyah içerisinde hoş gözükebilirdi ancak yazı background'u gerçekten çok kötüydü.Onu kaldırmak istedim.Bir süre 'dir' komutu ile dosyaları listeledim.Sonrasında bu iş böyle olmaz deyip görsellik arayışına girdim ve terminal yazı rengini de değiştirebileceğim bazı detaylar öğrendim.Şimdi o detayları kısaca anlatalım.

### .bashrc dosyası nedir ?

BASH, Bourne Again Shell(Bourne Tekrarı Yazılım)'in kısaltmasıdır.Bash, Brian Fox tarafından GNU Projesi için Bourne kabuğuna özgür yazılım alternatifi olarak yazılmıştır. .bashrc'de bir kabuk betiğidir.Kullanıcı her yeni kabuk açtığında çalıştırılır.Linux dağıtımlarında kullanıcıların terminal oturumunu kullanırken kendi hazırladığı komutları çalıştıran,boyama işlemleri yapan pek çok bash dosyasından biridir.

.Bashrc dosyası, bir kabuğu her açtığınızda çalıştırmak istediğiniz komutları çalıştırır.

Örneğin terminali her açtığımda Merhaba Selim yazmasını istiyorum yada kullanıcı adımın seltron olduğunu ele alırsak merhaba seltron demesini istiyorum.Bu durumda yapmam gerekenler:


`~$ nano ~/.bashrc`

içeriğin en alt satırına 

`~$ echo Merhaba $USER !`

yazıp kaydedelim ve çıkalım CTRL+S(CTRL+O) ve CTRL+X<br>
yeni bir terminal sekmesi açtığımızda işlem tamam.

Yada mesela terminal işlemlerimi kısaltmak istiyorum ve her defasında 

`~$ sudo apt update`<br>
`~$ sudo apt upgrade`<br>
`~$ sudo apt autoremove`<br>
`~$ sudo apt autoclean yada clean `<br>

komutlarını yazmak istemiyorum.(Kesinlikle yazmanızı tavsiye ederim ama bash yazma mantığı için bunu anlatıyorum.)

O zaman yine bu dosya içine bir değişken oluşturup bu işlemleri onun içine atmalıyız.
Aynen şu şekilde :

`alias s_up="sudo apt update && sudo apt upgrade -y && sudo apt autoremove && sudo apt autoclean && sudo apt clean"`

CTRL+S ve CTRL+X yapıp çıkalım ve terminali yenilediğimizde artık sisteme s_up diye bir komut ekledik.Bu komut içerisinde yukarıda sıraladığımız işlemleri sırasıyla yapabilecek bir güce sahip.  Bu mantıkta kendi bash komutlarınızı yazıp geliştirebilirsiniz.

### Gelelim ls komutundaki arkaplan rengi sorununa !

.bashrc ile terminal üzerinde çalışmasını istediğimiz komutları yazabiliyoruz dedik. Aynı şekilde renk ayarlamaları da yapabiliyoruz.Ben sorunumu şu satırı .bashrc sonuna ekleyerek hallettim.

`LS_COLORS=$LS_COLORS:'tw=00;33:ow=01;33:'; export LS_COLORS`

tw ve ow nin kaç olduğunu öğrenmek isterseniz yada diğer ayarlara (.mp3 formatındaki dosyalara .jpg dosyalarına vs) renk değişikliği yapmak isterseniz ;

`~$ echo $LS_COLORS`

ile 

`rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01   35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37  41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*  tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01 31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01; 31:* tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.   zip=01 31:*.z=01;31:*.Z=01;31:*.dz=01;31:*.gz=01;31:*.   lrz=01;31:* lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*. tzst=01;31:* bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01; 31:*.tz=01;31:* deb=01;31:*.rpm=01;31:*.jar=01; 31:*. war=01;31:*.ear=01 31:*.sar=01;31:*.rar=01;31:*.alz=01;  31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01; 31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*. esd=01;31:*.jpg=01 35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01; 35:*.gif=01;35:*. bmp=01;35:*.pbm=01;35:*.pgm=01;35:*. ppm=01;35:*.tga=01 35:*.xbm=01;35:*.xpm=01;35:*.tif=01; 35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35: *.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35: *.ogm=01; 35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35: *.vob=01;35:*. qt=01;35:*.nuv=01;35:* wmv=01;35:*.asf=01;35:*.rm=01;35: *.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01; 35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01; 35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*. aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00; 36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*. ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00; 36:*.spx=00;36:*.xspf=00;36::tw=00;33:ow=01;33:`

buradan değerleri değiştirebilirsiniz.Kalıcı olması için yine aynı şekilde kodunuzu .bashrc betiğinin son satırlarına doğru yazabilirsiniz.

Örnek : # Terminale alttaki kodu girerseniz terminali kapatana kadar bu değerler ile çalışma yapabilirsiniz. Dizin rengi mavi olarak ayarlandı.

`~$ LS_COLORS="di=36"`<br>
`~$ export LS_COLORS"`

di,ow,tw gibi kısaltmaların türkçelerini de aşağıya bırakalım.

fi -> Normal Dosya<br>
di -> Dizin<br>
ln -> Sembolik Bağlantı<br>
ow -> (o,+w) biçiminde yazılabilir ve yapışkan olmayan dizinler<br>
tw -> (o, w+) biçiminde yazılabilir ve yapışkan dizinler<br>
sg -> Setgid olan dosya (g + s)<br>
su -> Setuid olan dosya (u + s)<br>
cd -> Dizindeki karakterler(CHAR, CHR)<br>
bd -> Bloklama ,cihazı engelleme<br>
*.uzanti ->Bu ifadedeki tüm uzantilar ayrı ayrı ele alınabilir.Örn: *.mp3,*.jpg,*.gif,*.avi ..vb<br>

Dönelim hatayı düzelttiğimiz son satırda yazdığımıza.
00;33 Renk kodları o fosforlu arkaplanı kaldırıp yerine kırmızı yazı olarak gözükmesini sağladı.Eğer üçüncü bir değer girseydik arkaplan rengi verebilirdik. 00;33;40 gibi.
Peki diğer renkleri seçmek istersek ? 
-! O zaman da renk kodlarını bilmemiz gerekecek.
Renk kodları 3' e ayrılıyor :

#### Noktalı virgülden önceki ilk kısım metin stilini temsil eder.

00 -> Normal (Hiçbirşey yok)<br>
01 -> Kalın<br>
04 -> Alt çizgi<br>
05 -> Yanıp Sönme<br>
07 -> Ters<br>
08 -> Gizli<br>

#### İkinci bölüm renk :

30 -> Siyah<br>
31 -> Kırmızı<br>
32 -> Yeşil<br>
33 -> Sarı<br>
34 -> Mavi<br>
35 -> Macenta(Mor)<br>
36 -> Cam Göbeği<br>
37 -> Gri-Beyaz<br>

#### Üçüncü bölüm ise arkaplan renkleri :

40	Siyah arka plan<br>
41	Kırmızı arka plan<br>
42	Yeşil arka plan<br>
43	Turuncu arka plan<br>
44	Mavi arka plan<br>
45	Mor arka plan<br>
46	Camgöbeği arka plan<br>
47	Gri arkaplan<br>

Bu bilgiler ışığında .bashrc betiği içindeki renk kodlarını değiştirerek olumlu sonuç alabilirsiniz.
Default değeri unutursam yada ilk haline dönmek istersem gibi düşünceleriniz varsa .bashrc betiğini kopyalamanızı öneririm.
