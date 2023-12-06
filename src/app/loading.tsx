"use client";

import { Variants, motion } from "framer-motion";

const Example = () => {
  return (
    <div className="grid place-content-center px-4 py-24">
      <BarLoader />
    </div>
  );
};

const variants = {
  initial: {
    scaleY: 0.8,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 0.4,
      ease: "circIn",
    },
  },
} as Variants;

const BarLoader = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.1,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1"
    >
      <motion.div variants={variants} className="h-12 w-2 bg-blue-600" />
      <motion.div variants={variants} className="h-12 w-2 bg-blue-600" />
      <motion.div variants={variants} className="h-12 w-2 bg-blue-600" />
      <motion.div variants={variants} className="h-12 w-2 bg-blue-600" />
      <motion.div variants={variants} className="h-12 w-2 bg-blue-600" />
    </motion.div>
  );
};

export default Example;
