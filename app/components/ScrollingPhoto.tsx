"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHOTOS = [
  "/Mibilabo2.JPG",
  "/mibilabo3.JPG",
  "/Mibilabo1.jpg",
  "/Mibilabo2.JPG",
  "/mibilabo3.JPG",
  "/Mibilabo1.jpg",
];

export default function ScrollingPhoto() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docH = document.body.scrollHeight - window.innerHeight;

      // Show after scrolling past hero
      setVisible(scrollY > 300);

      // Change photo every ~600px of scroll
      const newIndex = Math.floor(scrollY / 600) % PHOTOS.length;
      setIndex(newIndex);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
          style={{ width: 180 }}
        >
          <div className="rounded-2xl overflow-hidden shadow-xl shadow-[#7F7CAF]/15"
            style={{ height: 240 }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={PHOTOS[index]}
                alt=""
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
