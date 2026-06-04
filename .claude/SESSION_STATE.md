# Stato sessione — Oonee

## DATA
2026-06-04

## FATTO oggi
- Sistemata la **hero mobile**: mantenuta la **scena 3D Spline anche su mobile** (non più rimossa).
- Wordmark **"oonee" intero** (non più tagliato a "one"), **payoff completo** (non più tagliato a destra), **montagna grande**, **un solo "Scopri"**, **margini laterali a posto**.
  - Soluzione: su mobile la scena è in un contenitore `aspect-[8/9]` a larghezza piena → l'intera composizione entra senza tagli; altezza hero = scena (niente fasce nere). Desktop invariato (full-bleed 100svh).
- Risolto l'**hydration error** dell'iframe in `components/Hero.tsx`: l'`<iframe>` della scena ora si **monta solo lato client** (flag `mounted` in `useEffect`) → 0 `<iframe>` nell'HTML server, nessun mismatch. Verificato con cattura console: 0 errori su home e /survey.

## STATO
- **Hero mobile: OK** (verificata sul telefono vero).
- **Da rifinire su mobile** le sezioni sotto: *Non vendiamo marketing* (Manifesto), *Conversion Architecture*, *card numerate (4 pilastri)*, *Programmi*, *Press/Menzioni stampa*, *Founder*, *CTA finale* → soprattutto **spaziature e tipografia** su mobile.

## DA FARE PROSSIMA VOLTA
- L'utente **rivedrà testi e contenuti** (copy).
- Poi: **rifinitura mobile** delle sezioni sotto la hero + **inserimento contenuti veri**.

## COME RIAVVIARE
```bash
cd ~/Desktop/oonee
npm run dev -- -H 0.0.0.0 -p 3000
```
- Porta: **3000**
- URL dal telefono (stessa Wi-Fi): **http://192.168.1.4:3000**
- (L'IP `192.168.1.4` può cambiare: verificarlo con `ipconfig getifaddr en0`.)

## NOTE
- **Verificare SEMPRE il mobile sul telefono VERO**, non nella device-mode di DevTools: DevTools rende male il WebGL della scena 3D e dà falsi problemi (è stato il motivo di molti avanti-indietro).
- La scena 3D è un **iframe** verso il viewer Spline (`my.spline.design/nexusmountain-...`): WebGL, testo "baked-in". Non modificare la configurazione della scena.
- Non sostituire mai l'asset reale con grafiche inventate.
