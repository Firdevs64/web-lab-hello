# CSS Kararlari (LAB-3)

## Breakpoint Secimi

- Mobil: varsayilan (0-639px)
- Tablet: 640px ve ustu
- Masaustu: 1024px ve ustu
  Bu degerler yaygin responsive pratiklere uygundur ve layout degisimlerini net ayirmayi saglar.

## Layout Tercihleri

- Navigasyon: Flexbox (flex-wrap ile) kullanildi. Ekran daralinca linkler alt satira gecer.
- Projeler: CSS Grid kullanildi.
  - repeat(auto-fit, minmax(280px, 1fr)) ile ekran genisligine gore otomatik kolon sayisi olusur.

## Design Tokens

- Renk, bosluk, radius ve yazi boyutlari :root icinde degiskenlerle tanimlandi.
- Clamp ile fluid typography uygulanarak yazi boyutlari ekrana gore akici hale getirildi.

## Responsive Strateji

- Mobile-first yaklasim kullanildi.
- 640px'de padding artirildi.
- 1024px'de max-width ile icerik ortalandi ve project grid 3 kolona ayarlandi.
