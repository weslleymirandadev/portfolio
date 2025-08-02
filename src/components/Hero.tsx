import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "../contexts/LanguageContext";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    ).fromTo(
      subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <div className="text-center z-10">
        <div className="select-none">
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        <motion.h1
          ref={titleRef}
          className="inline text-4xl md:text-8xl font-bold"
        >
          <span className="gradient-text">Weslley</span>
          <span className="text-white">Miranda</span>
        </motion.h1>
        <div className="select-none">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        <motion.p
          ref={subtitleRef}
          className="text-xl md:text-2xl my-8 text-aero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.p
          className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-gray-300 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          className="flex sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <a
            href="#projects"
            className="px-8 py-4 bg-gradient-to-r from-french-blue to-picton-blue rounded-full font-semibold hover:scale-105 transition-transform duration-300"
          >
            {t.hero.viewProjects}
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border-2 border-[var(--french-blue)] text-[var(--french-blue)] rounded-full font-semibold hover:bg-[var(--french-blue)] hover:text-white transition-all duration-300"
          >
            {t.hero.contact}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
