# Brief — Redesign sezione "Conversion Architecture" (sito oonee)

Sostituisci la sezione attuale del sito oonee che contiene il titolo
"La Conversion Architecture è il metodo proprietario di oonee." e le 4 card 01–04,
con una versione **scroll-driven "teatrale"**. Mantieni ESATTAMENTE i testi (in fondo).
Usa l'approccio di stile già in uso nel progetto (Tailwind o CSS module) e i font già presenti nel sito.

## Riferimento visivo
Nella stessa cartella trovi `oonee-conversion-architecture-teatrale.html`.
Usalo come **riferimento esatto** di look & feel, animazioni e finale: replicalo fedelmente,
reimplementandolo in **React + Framer Motion**.

## Comportamento base
- Una spina verticale che si "riempie" dall'alto verso il basso mentre si scrolla, con un punto luminoso sul fronte che la percorre.
- 4 nodi agganciati alla spina, alternati a sinistra/destra su desktop (zig-zag). Quando il fronte luminoso raggiunge un nodo, questo si "aggancia": il pallino si accende, parte un piccolo ramo orizzontale verso la card e la card entra.
- Nodo finale di convergenza in fondo.
- Mobile/tablet (< 820px): spina a sinistra, tutte le card a piena larghezza a destra, rami verso destra.

## Layer teatrale
1. **Palcoscenico / spotlight**: i nodi non ancora raggiunti restano "al buio" (pallino spento, card non visibile). Il nodo raggiunto diventa "current": si accende uno spotlight (alone radiale ciano dietro la card) e la card ha bordo/ombra più marcati. Lo spotlight illumina UN solo step alla volta; quelli già passati restano visibili ma senza spotlight. Scrollando indietro gli stati si aggiornano.
2. **Cometa**: il punto sulla spina è una cometa con scia luminosa che la segue e un alone che pulsa.
3. **Corrente**: la parte piena della spina ha un gradiente luminoso in movimento continuo (energia che scorre).
4. **Entrata recitata**: ogni card entra da sfocata → a fuoco (blur 5px → 0) + sale + scala .95 → 1 con easing a leggero overshoot, e gli elementi interni compaiono a cascata: icona → numero/label → titolo → testo/citazione.
5. **Lock-in**: quando un nodo si attiva, dal pallino parte un anello che si espande e svanisce (scatto di aggancio).
6. **Finale**: raggiunto il nodo finale, parte UNA volta sola un "surge" di luce che percorre tutta la spina dall'alto al basso + un bagliore morbido su tutta la sezione, e il nodo finale entra in cascata con enfasi.
7. **Intro** (titolo + testo) che entra con rise/fade a cascata quando la sezione compare in viewport.

## Tecnico
- Componente client ("use client"). Usa Framer Motion (installa `framer-motion` se assente):
  `useScroll({ target, offset: ["start 0.6", "end 0.4"] })` → mappa il progress all'altezza della spina e alla posizione della cometa; stato active/current dei nodi calcolato dal progress; entrate con `whileInView` o variants/`staggerChildren`.
- Impeccabile sia desktop sia mobile. Su mobile NIENTE blur persistente sulle card (il blur solo come transizione d'entrata).
- Solo transform/opacity/filter, throttle in requestAnimationFrame, listener passivi, niente layout thrash.
- prefers-reduced-motion: tutto statico e visibile, cometa nascosta, nessuna animazione continua.
- SSR-safe: contenuti nel DOM e leggibili anche senza JS (niente opacity:0 permanente lato server).

## Stile (coerente col sito)
- Sfondo navy molto scuro + griglia "blueprint" tenue sfumata ai bordi + vignettatura leggera (profondità da palcoscenico).
- Accento ciano come il logo iceberg (~#3EB4F7), bianco-ciano per i punti di luce (~#A9E0FF), glow ciano su cometa/pallini/finale.
- Monospace per numeri 01–04 ed etichette. Numero gigante "ghost" ciano dietro ogni card.

## Vincoli
- "oonee" SEMPRE minuscolo, anche a inizio frase/titolo.
- NON toccare le altre sezioni del sito.

## Testi (identici)
- **Intro titolo**: "La Conversion Architecture è il metodo proprietario di oonee."
- **Intro paragrafo**: "Non è un funnel. Non è una strategia pre-confezionata. Non è il template che vedi su LinkedIn. È un'architettura cucita su misura per il tuo business: costruita step dopo step, partendo da chi vendi, non dal canale che usi."
- **01 — PARTE DAL BUSINESS, NON DAL CANALE** — "Prima di scegliere come comunicare, capiamo cosa vendi, a chi, e perché dovrebbero comprare da te."
- **02 — È UN FUNNEL ADATTIVO** — citazione: "Il funnel adattivo costruisce un percorso su misura per ogni singolo utente, step dopo step, abbandonando l'approccio generico." — Angelo Maiolini, Economy Magazine
- **03 — È IPER-PERSONALIZZATA** — "Non comunichiamo a un pubblico. Comunichiamo a una persona. Concentrandoci non sul prodotto in sé, ma su come quel prodotto risolva concretamente il suo problema specifico."
- **04 — NON È COPIABILE** — "Ogni Conversion Architecture è unica perché ogni business è unico. Per questo funziona. Per questo non si replica."
- **Nodo finale** (in cascata, dopo il surge): titolo "La tua Conversion Architecture. Una sola. Irripetibile. Funzionante." (con "Conversion Architecture" in evidenza ciano) → promessa "Vendi di più." → CTA pulsante "Inizia da qui" (pill ciano con glow, freccia → che scorre in hover). href placeholder "#": la destinazione la definiamo dopo.

## Output
Poi fai il build, riavvia il dev server e dammi l'URL.
