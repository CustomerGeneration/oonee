"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type Variants,
} from "framer-motion";
import { Building2, Fingerprint, GitBranch, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import styles from "./ConversionArchitecture.module.css";

type Pillar = {
  number: string;
  title: string;
  icon: LucideIcon;
  body?: string;
  quote?: string;
  attribution?: string;
};

const PILLARS: Pillar[] = [
  {
    number: "01",
    title: "Parte dal business, non dal canale",
    icon: Building2,
    body: "Prima di scegliere come comunicare, capiamo cosa vendi, a chi, e perché dovrebbero comprare da te.",
  },
  {
    number: "02",
    title: "È un funnel adattivo",
    icon: GitBranch,
    quote:
      "Il funnel adattivo costruisce un percorso su misura per ogni singolo utente, step dopo step, abbandonando l'approccio generico.",
    attribution: "— Angelo Maiolini, Economy Magazine",
  },
  {
    number: "03",
    title: "È iper-personalizzata",
    icon: User,
    body: "Non comunichiamo a un pubblico. Comunichiamo a una persona. Concentrandoci non sul prodotto in sé, ma su come quel prodotto risolva concretamente il suo problema specifico.",
  },
  {
    number: "04",
    title: "Non è copiabile",
    icon: Fingerprint,
    body: "Ogni Conversion Architecture è unica perché ogni business è unico. Per questo funziona. Per questo non si replica.",
  },
];

const NODE_COUNT = PILLARS.length; // solo i 4 nodi: la spina termina nel pallino finale
const ENDED_AT = 0.985; // progress a cui il fronte luminoso raggiunge il pallino
const EASE: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

// cascata interna delle card: icona -> label -> titolo -> testo/citazione
const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

// cascata del blocco finale: soprat. -> titolo -> frase -> pulsante
const finaleVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.16, delayChildren: 0.05 },
  },
};
const finaleItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

export default function ConversionArchitecture() {
  const reduced = useReducedMotion();

  const flowRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);

  // frazioni (0..1) del centro di ogni nodo rispetto all'altezza della spina
  const [fractions, setFractions] = useState<number[]>([]);
  const [active, setActive] = useState<boolean[]>(() =>
    Array(NODE_COUNT).fill(false),
  );
  const [current, setCurrent] = useState(-1);
  const [ended, setEnded] = useState(false); // pallino acceso + finale visibile (reversibile)
  const [finale, setFinale] = useState(false); // surge + bloom: una sola volta

  // animazioni abilitate solo lato client e senza prefers-reduced-motion;
  // a riposo i contenuti restano visibili (SSR-safe, leggibili senza JS)
  const [enabled, setEnabled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: flowRef,
    offset: ["start 0.6", "end 0.4"],
  });

  // la spina si riempie e la cometa scorre seguendo il progress (no re-render)
  const fillHeight = useTransform(scrollYProgress, (v) =>
    `${Math.max(0, Math.min(1, v)) * 100}%`,
  );
  const cometOpacity = useTransform(
    scrollYProgress,
    [0, 0.012, 0.97, 1],
    [0, 1, 1, 0],
  );

  // misura le frazioni dei nodi (al mount, al resize, al load dei font)
  useLayoutEffect(() => {
    const measure = () => {
      const flow = flowRef.current;
      if (!flow) return;
      const h = flow.offsetHeight || 1;
      const fr = nodeRefs.current.map((n) =>
        n ? (n.offsetTop + n.offsetHeight / 2) / h : 1,
      );
      setFractions(fr);
    };
    measure();
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 400); // ricalcolo dopo i font
    if (document.fonts?.ready) document.fonts.ready.then(measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 820px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!reduced) setEnabled(true);
  }, [reduced]);

  // reduced motion: tutto già "agganciato" e visibile, pallino e finale compresi
  useEffect(() => {
    if (reduced) {
      setActive(Array(NODE_COUNT).fill(true));
      setCurrent(NODE_COUNT - 1);
      setEnded(true);
      setFinale(true);
    }
  }, [reduced]);

  // aggiorna stato active/current/ended/finale dal progress (con guardia anti-thrash)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduced || fractions.length !== NODE_COUNT) return;
    const eps = 0.005;
    let cur = -1;
    const next = fractions.map((f, i) => {
      const on = v >= f - eps;
      if (on) cur = i;
      return on;
    });
    setActive((prev) =>
      prev.length === next.length && prev.every((p, i) => p === next[i])
        ? prev
        : next,
    );
    setCurrent((prev) => (prev === cur ? prev : cur));

    const isEnded = v >= ENDED_AT;
    setEnded((prev) => (prev === isEnded ? prev : isEnded));
    if (isEnded) setFinale(true);
  });

  const enableAnim = enabled && !reduced;

  // varianti card: entra sfocata + sale + scala, con cascata interna
  const cardVariants = (fromX: number): Variants => ({
    hidden: { opacity: 0, filter: "blur(5px)", x: fromX, y: 16, scale: 0.95 },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.75,
        ease: EASE,
        staggerChildren: 0.08,
        delayChildren: 0.14,
      },
    },
  });

  // props condizionali: a riposo (SSR/no-JS/reduced) niente animazione
  const introMotion = (delay: number) =>
    enableAnim
      ? {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.85, delay, ease: EASE },
        }
      : {};

  const finaleMotion = enableAnim
    ? {
        variants: finaleVariants,
        initial: "hidden",
        animate: ended ? "show" : "hidden",
      }
    : {};

  return (
    <section id="conversion-architecture" className={styles.root}>
      <div className={styles.bp} aria-hidden />
      <div className={styles.vig} aria-hidden />
      <div
        className={cx(styles.bloom, finale && !reduced && styles.bloomActive)}
        aria-hidden
      />

      <div className={cx(styles.wrap, "py-20 sm:py-28")}>
        {/* intro */}
        <div className={styles.intro}>
          <motion.div className={styles.eyebrow} {...introMotion(0.05)}>
            il metodo
          </motion.div>
          <motion.h2 className={styles.title} {...introMotion(0.2)}>
            La Conversion Architecture è il metodo proprietario di{" "}
            <span className={styles.lo}>oonee</span>.
          </motion.h2>
          <motion.p className={styles.lead} {...introMotion(0.38)}>
            Non è un funnel. Non è una strategia pre-confezionata. Non è il
            template che vedi su LinkedIn. È un&apos;architettura cucita su
            misura per il tuo business: costruita step dopo step, partendo da
            chi vendi, non dal canale che usi.
          </motion.p>
        </div>

        {/* flow: la spina, i 4 nodi e il pallino di convergenza terminale */}
        <div className={cx(styles.flow, ended && styles.endlit)} ref={flowRef}>
          <div className={styles.spine}>
            {reduced ? (
              <div className={styles.spineFill} style={{ height: "100%" }} />
            ) : (
              <motion.div
                className={styles.spineFill}
                style={{ height: fillHeight }}
              />
            )}
          </div>

          {!reduced && <div className={styles.surge} />}
          {!reduced && finale && (
            <div className={cx(styles.surge, styles.surgeActive)} />
          )}

          {enableAnim && (
            <motion.div
              className={styles.comet}
              style={{ top: fillHeight, opacity: cometOpacity }}
              aria-hidden
            />
          )}

          {/* nodi 01–04 */}
          {PILLARS.map((pillar, i) => {
            const side = i % 2 === 0 ? "left" : "right";
            const fromX = isMobile ? 28 : side === "left" ? -40 : 40;
            const isActive = active[i];
            const cardMotion = enableAnim
              ? {
                  variants: cardVariants(fromX),
                  initial: "hidden",
                  animate: isActive ? "show" : "hidden",
                }
              : {};
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.number}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                className={cx(
                  styles.node,
                  side === "left" ? styles.nodeLeft : styles.nodeRight,
                  isActive && styles.active,
                  current === i && styles.current,
                )}
              >
                <div className={styles.spot} aria-hidden />

                <motion.div className={styles.card} {...cardMotion}>
                  <span className={styles.num} aria-hidden>
                    {pillar.number}
                  </span>
                  <motion.span variants={item} className={styles.ico}>
                    <Icon size={30} strokeWidth={1.7} aria-hidden />
                  </motion.span>
                  <motion.div variants={item} className={styles.lab}>
                    {pillar.number}
                  </motion.div>
                  <motion.h3 variants={item} className={styles.cardTitle}>
                    {pillar.title}
                  </motion.h3>

                  {pillar.body && (
                    <motion.p variants={item} className={styles.body}>
                      {pillar.body}
                    </motion.p>
                  )}

                  {pillar.quote && (
                    <>
                      <motion.blockquote
                        variants={item}
                        className={styles.quote}
                      >
                        “{pillar.quote}”
                      </motion.blockquote>
                      <motion.cite variants={item} className={styles.cite}>
                        {pillar.attribution}
                      </motion.cite>
                    </>
                  )}
                </motion.div>

                <span className={styles.connector} aria-hidden>
                  <span className={styles.branch} />
                  <span className={styles.lockring} />
                  <span className={styles.knob} />
                </span>
              </div>
            );
          })}

          {/* pallino di convergenza: la spina finisce qui */}
          <span className={styles.cknob} aria-hidden />
        </div>

        {/* finale: fuori dalla spina, libero, nessuna linea lo attraversa */}
        <motion.div className={styles.finale} {...finaleMotion}>
          <motion.div variants={enableAnim ? finaleItem : undefined} className={styles.conv}>
            il tuo prossimo passo
          </motion.div>
          <motion.h3 variants={enableAnim ? finaleItem : undefined} className={styles.big}>
            La tua <span className={styles.g}>Conversion Architecture</span>.
            <br />
            Una sola. Irripetibile. Funzionante.
          </motion.h3>
          <motion.p variants={enableAnim ? finaleItem : undefined} className={styles.invite}>
            Sei qui. Il tuo prossimo cliente è a un&apos;architettura di
            distanza.
          </motion.p>
          <motion.div variants={enableAnim ? finaleItem : undefined}>
            <a className={styles.cta} href="#">
              Inizia da qui
              <span className={styles.ctaAr} aria-hidden>
                →
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
