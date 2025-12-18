// export const fadeUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

/* ----------------------------------
   Base easing + duration
---------------------------------- */
export const ease = [0.4, 0, 0.2, 1];

/* ----------------------------------
   Fade Up (cards, rows, sections)
---------------------------------- */
export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease,
    },
  },
};

/* ----------------------------------
   Stagger Container (lists, tables)
---------------------------------- */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

/* ----------------------------------
   Hover micro-interactions
---------------------------------- */
export const hoverScale = {
  whileHover: {
    scale: 1.02,
    transition: { duration: 0.15, ease },
  },
};

/* ----------------------------------
   Reduced-motion safe variant
---------------------------------- */
export const noMotion = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 1, y: 0 },
};
