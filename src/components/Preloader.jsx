import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Fast, smooth counter simulation matching asset initialization time (~1.2s)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 600); // match fade duration
          }, 200);
          return 100;
        }
        // Organic non-linear progress increments
        const increment = Math.floor(Math.random() * 12) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center pointer-events-auto select-none"
        >
          {/* Minimal Brand Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center gap-8"
          >
            <h1 className="font-display font-light text-3xl sm:text-4xl tracking-[0.35em] text-neutral-950 uppercase">
              AUFA
            </h1>

            {/* Subtle Progress Bar */}
            <div className="w-28 sm:w-36 h-[1.5px] bg-neutral-100 overflow-hidden relative rounded-full">
              <motion.div
                className="h-full bg-neutral-900 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
