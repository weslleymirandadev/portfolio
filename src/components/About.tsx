import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useSectionActive } from "../hooks/useSectionActive";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const isActive = useSectionActive("about");

  const skills = [
    { name: "Next.js", level: 90, color: "bg-french-blue" },
    { name: "React.js", level: 95, color: "bg-picton-blue" },
    { name: "TypeScript", level: 85, color: "bg-aero" },
    { name: "Node.js", level: 88, color: "bg-carrot-orange" },
    { name: "Python", level: 82, color: "bg-persian-red" },
    { name: "Blockchain", level: 85, color: "bg-french-blue" },
    { name: "AI/ML", level: 80, color: "bg-picton-blue" },
    { name: "Docker", level: 85, color: "bg-aero" },
  ];

  return (
    <section
      ref={ref}
      id="about"
      className={`py-20 px-4 relative transition-all duration-300 ${
        isActive ? "section-active-bg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">{t.about.title.split(" ")[0]}</span>{" "}
            {t.about.title.split(" ").slice(1).join(" ")}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t.about.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Coluna Esquerda - Informações Pessoais */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-aero">
                {t.about.specializations}
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {t.about.description}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-french-blue rounded-full"></div>
                  <span className="text-gray-300">{t.about.blockchain}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-picton-blue rounded-full"></div>
                  <span className="text-gray-300">{t.about.ai}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-aero rounded-full"></div>
                  <span className="text-gray-300">{t.about.fullstack}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-carrot-orange rounded-full"></div>
                  <span className="text-gray-300">DevOps</span>
                </div>
              </div>
            </div>

            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-aero">
                {t.about.languages}
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="text-gray-300 text-sm sm:text-base">
                    {t.about.portuguese}
                  </span>
                  <span className="text-french-blue font-semibold text-sm sm:text-base">
                    {t.about.portugueseDesc}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="text-gray-300 text-sm sm:text-base">
                    {t.about.english}
                  </span>
                  <span className="text-picton-blue font-semibold text-sm sm:text-base">
                    {t.about.englishDesc}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="text-gray-300 text-sm sm:text-base">
                    {t.about.german}
                  </span>
                  <span className="text-aero font-semibold text-sm sm:text-base">
                    {t.about.germanDesc}
                  </span>
                </div>
              </div>
            </div>

            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-aero">
                {t.about.education.title}
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-french-blue pl-4">
                  <h4 className="text-lg font-semibold text-white">
                    {t.about.education.degree}
                  </h4>
                  <p className="text-gray-300">UniCesumar</p>
                  <p className="text-sm text-gray-400">
                    2025-2029 ({t.about.education.status})
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Coluna Direita - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-aero bg-gradient-to-r from-aero to-french-blue bg-clip-text text-transparent">
                {t.about.skills}
              </h3>
              <div className="space-y-6">
                {/* Frontend Development */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-picton-blue">
                    Frontend Development
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      {
                        name: "nextjs",
                        icon: "https://skillicons.dev/icons?i=nextjs",
                      },
                      {
                        name: "vite",
                        icon: "https://skillicons.dev/icons?i=vite",
                      },
                      {
                        name: "electron",
                        icon: "https://skillicons.dev/icons?i=electron",
                      },
                      {
                        name: "react",
                        icon: "https://skillicons.dev/icons?i=react",
                      },
                      {
                        name: "redux",
                        icon: "https://skillicons.dev/icons?i=redux",
                      },
                      {
                        name: "threejs",
                        icon: "https://skillicons.dev/icons?i=threejs",
                      },
                      {
                        name: "tailwindcss",
                        icon: "https://skillicons.dev/icons?i=tailwindcss",
                      },
                      {
                        name: "styledcomponents",
                        icon: "https://skillicons.dev/icons?i=styledcomponents",
                      },
                      {
                        name: "framer-motion",
                        icon: "https://avatars.githubusercontent.com/u/84441432?s=48&v=4",
                      },
                      {
                        name: "gsap",
                        icon: "https://avatars.githubusercontent.com/u/2386673?s=48&v=4",
                      },
                      {
                        name: "react-bits",
                        icon: "https://github.com/user-attachments/assets/6e4e9d4e-7227-49ed-b2bc-5ae9b80a2e53",
                      },
                    ].map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="flex items-center gap-2 p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors group relative"
                        aria-label={skill.name.replace("-", " ")}
                      >
                        <img
                          src={skill.icon}
                          alt={`${skill.name} icon`}
                          className="w-6 h-6"
                          onError={(e) =>
                            (e.currentTarget.style.display = "none")
                          }
                        />
                        <span className="text-gray-300 capitalize text-sm md:text-base truncate w-full">
                          {skill.name.replace("-", " ")}
                        </span>
                        <span className="absolute top-[-2rem] left-0 bg-gray-800 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                          {skill.name.replace("-", " ")}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Backend Development */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-picton-blue">
                    Backend Development
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      {
                        name: "nodejs",
                        icon: "https://skillicons.dev/icons?i=nodejs",
                      },
                      {
                        name: "nestjs",
                        icon: "https://skillicons.dev/icons?i=nestjs",
                      },
                      {
                        name: "graphql",
                        icon: "https://skillicons.dev/icons?i=graphql",
                      },
                      {
                        name: "typescript",
                        icon: "https://skillicons.dev/icons?i=typescript",
                      },
                      {
                        name: "python",
                        icon: "https://skillicons.dev/icons?i=python",
                      },
                      {
                        name: "webassembly",
                        icon: "https://skillicons.dev/icons?i=webassembly",
                      },
                    ].map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="flex items-center gap-2 p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors group relative"
                        aria-label={skill.name}
                      >
                        <img
                          src={skill.icon}
                          alt={`${skill.name} icon`}
                          className="w-6 h-6"
                          onError={(e) =>
                            (e.currentTarget.style.display = "none")
                          }
                        />
                        <span className="text-gray-300 capitalize text-sm md:text-base truncate w-full">
                          {skill.name}
                        </span>
                        <span className="absolute top-[-2rem] left-0 bg-gray-800 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Banco de Dados */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-picton-blue">
                    Databases
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      {
                        name: "mongodb",
                        icon: "https://skillicons.dev/icons?i=mongodb",
                      },
                      {
                        name: "postgresql",
                        icon: "https://skillicons.dev/icons?i=postgresql",
                      },
                      {
                        name: "redis",
                        icon: "https://skillicons.dev/icons?i=redis",
                      },
                      {
                        name: "prisma",
                        icon: "https://skillicons.dev/icons?i=prisma",
                      },
                    ].map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="flex items-center gap-2 p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors group relative"
                        aria-label={skill.name}
                      >
                        <img
                          src={skill.icon}
                          alt={`${skill.name} icon`}
                          className="w-6 h-6"
                          onError={(e) =>
                            (e.currentTarget.style.display = "none")
                          }
                        />
                        <span className="text-gray-300 capitalize text-sm md:text-base truncate w-full">
                          {skill.name}
                        </span>
                        <span className="absolute top-[-2rem] left-0 bg-gray-800 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* DevOps & Infrastructure */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-picton-blue">
                    DevOps & Infrastructure
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      {
                        name: "aws",
                        icon: "https://skillicons.dev/icons?i=aws",
                      },
                      {
                        name: "docker",
                        icon: "https://skillicons.dev/icons?i=docker",
                      },
                      {
                        name: "kubernetes",
                        icon: "https://skillicons.dev/icons?i=kubernetes",
                      },
                      {
                        name: "linux",
                        icon: "https://skillicons.dev/icons?i=linux",
                      },
                      {
                        name: "git",
                        icon: "https://skillicons.dev/icons?i=git",
                      },
                      {
                        name: "github",
                        icon: "https://skillicons.dev/icons?i=github",
                      },
                      {
                        name: "nginx",
                        icon: "https://skillicons.dev/icons?i=nginx",
                      },
                    ].map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="flex items-center gap-2 p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors group relative"
                        aria-label={skill.name}
                      >
                        <img
                          src={skill.icon}
                          alt={`${skill.name} icon`}
                          className="w-6 h-6"
                          onError={(e) =>
                            (e.currentTarget.style.display = "none")
                          }
                        />
                        <span className="text-gray-300 capitalize text-sm md:text-base truncate w-full">
                          {skill.name}
                        </span>
                        <span className="absolute top-[-2rem] left-0 bg-gray-800 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Deep Learning & Computer Vision */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-picton-blue">
                    Deep Learning & Computer Vision
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      {
                        name: "pytorch",
                        icon: "https://skillicons.dev/icons?i=pytorch",
                      },
                      {
                        name: "scikit-learn",
                        icon: "https://skillicons.dev/icons?i=sklearn",
                      },
                      {
                        name: "opencv",
                        icon: "https://skillicons.dev/icons?i=opencv",
                      },
                      {
                        name: "huggingface",
                        icon: "https://avatars.githubusercontent.com/u/25720743?s=48&v=4",
                      },
                    ].map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="flex items-center gap-2 p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors group relative"
                        aria-label={skill.name}
                      >
                        <img
                          src={skill.icon}
                          alt={`${skill.name} icon`}
                          className="w-6 h-6"
                          onError={(e) =>
                            (e.currentTarget.style.display = "none")
                          }
                        />
                        <span className="text-gray-300 capitalize text-sm md:text-base truncate w-full">
                          {skill.name}
                        </span>
                        <span className="absolute top-[-2rem] left-0 bg-gray-800 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Blockchain & Smart Contracts */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-picton-blue">
                    Blockchain & Smart Contracts
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      {
                        name: "ethereum",
                        icon: "https://img.icons8.com/?size=48&id=IhWBOFHtv6vx&format=png",
                      },
                      {
                        name: "solidity",
                        icon: "https://skillicons.dev/icons?i=solidity",
                      },
                      {
                        name: "rust",
                        icon: "https://skillicons.dev/icons?i=rust",
                      },
                      {
                        name: "openzeppelin",
                        icon: "https://avatars.githubusercontent.com/u/20820676?s=48&v=4",
                      },
                      {
                        name: "ethers.js",
                        icon: "https://avatars.githubusercontent.com/u/18492273?s=48&v=4",
                      },
                      {
                        name: "hardhat",
                        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hardhat/hardhat-original.svg",
                      },
                      {
                        name: "solana",
                        icon: "https://avatars.githubusercontent.com/u/58729655?s=48&v=4",
                      },
                      {
                        name: "anchor",
                        icon: "https://camo.githubusercontent.com/590ccfb4e70a27673047ee879ed409981c05b2da403e60b4aaa7961ccdb46001/68747470733a2f2f7062732e7477696d672e636f6d2f6d656469612f46565556614f3958454141756c764b3f666f726d61743d706e67266e616d653d736d616c6c",
                      },
                    ].map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="flex items-center gap-2 p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors group relative"
                        aria-label={skill.name}
                      >
                        <img
                          src={skill.icon}
                          alt={`${skill.name} icon`}
                          className="w-6 h-6"
                          onError={(e) =>
                            (e.currentTarget.style.display = "none")
                          }
                        />
                        <span className="text-gray-300 capitalize text-sm md:text-base truncate w-full">
                          {skill.name}
                        </span>
                        <span className="absolute top-[-2rem] left-0 bg-gray-800 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Testes & Qualidade */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-picton-blue">
                    Testing & Quality
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      {
                        name: "vitest",
                        icon: "https://skillicons.dev/icons?i=vitest",
                      },
                      {
                        name: "jest",
                        icon: "https://skillicons.dev/icons?i=jest",
                      },
                      {
                        name: "mocha",
                        icon: "https://avatars.githubusercontent.com/u/8770005?s=48&v=4",
                      },
                      {
                        name: "chai",
                        icon: "https://avatars.githubusercontent.com/u/1515293?s=48&v=4",
                      },
                      {
                        name: "playwright",
                        icon: "https://playwright.dev/img/playwright-logo.svg",
                      },
                    ].map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="flex items-center gap-2 p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors group relative"
                        aria-label={skill.name}
                      >
                        <img
                          src={skill.icon}
                          alt={`${skill.name} icon`}
                          className="w-6 h-6"
                          onError={(e) =>
                            (e.currentTarget.style.display = "none")
                          }
                        />
                        <span className="text-gray-300 capitalize text-sm md:text-base truncate w-full">
                          {skill.name}
                        </span>
                        <span className="absolute top-[-2rem] left-0 bg-gray-800 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
