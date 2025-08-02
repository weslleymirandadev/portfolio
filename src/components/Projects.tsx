import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useSectionActive } from "../hooks/useSectionActive";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();
  const isActive = useSectionActive("projects");

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const projects = [
    {
      title: "Briatori Essence",
      description:
        language === "pt"
          ? "Site de perfumaria com Next.js, TypeScript, autenticação JWT e integração com API dos Correios para cálculo de frete."
          : "Perfumery website with Next.js, TypeScript, JWT authentication and Correios API integration for shipping calculation.",
      descriptionEn:
        "Perfumery website with Next.js, TypeScript, JWT authentication and Correios API integration for shipping calculation.",
      images: ["/briatori/briatoriessence1.jpg", "/briatori/briatoriessence2.jpg"],
      tech: ["React.js", "Next.js", "next-auth", "TypeScript", "JWT", "Correios API"],
      link: "https://www.briatoriessence.com",
      status: { live: "Live", development: false },
    },
    {
      title: "AI4Web3",
      description:
        language === "pt"
          ? "Plataforma descentralizada de educação em IA com Web3, certificações NFT e marketplace para modelos treinados."
          : "Decentralized AI education platform with Web3, NFT certifications and marketplace for trained models.",
      descriptionEn:
        "Decentralized AI education platform with Web3, NFT certifications and marketplace for trained models.",
      images: ["/ai4web3/ai4web31.jpg", "/ai4web3/ai4web32.jpg"],
      tech: [
        "Next.js",
        "GraphQL",
        "Kubernetes",
        "Python",
        "Solidity",
        "FastAPI",
        "PostgreSQL",
        "IPFS",
        "Web3.py",
        "NestJS",
        "Express",
        "PrismaORM",
        "Docker",
        "AWS",
        "WebAssembly",
        "PyTorch",
        "ethers.js",
      ],
      link: "https://ai4web3.net",
      status: { live: "Live", development: t.projects.status.development },
    },
  ];

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <section
      ref={ref}
      id="projects"
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
            <span className="gradient-text">
              {t.projects.title.split(" ")[0]}
            </span>{" "}
            {t.projects.title.split(" ").slice(1).join(" ")}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t.projects.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
              className="project-card flex flex-col h-full hover:scale-105 transition-transform duration-300"
            >
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 h-48 overflow-hidden">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover cursor-pointer rounded-tl-xl"
                      onClick={() => handleImageClick(project.images[0])}
                    />

                    <img
                      src={project.images[1]}
                      alt={project.title}
                      className="w-full h-full object-cover cursor-pointer rounded-tr-xl"
                      onClick={() => handleImageClick(project.images[1])}
                    />
                </div>
                <div className="glass-effect px-8 pb-8 pt-2 rounded-b-2xl flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-white">
                      {project.title}
                    </h3>
                    {project.status && (
                      <span className="inline-block px-3 py-1 bg-carrot-orange/20 text-carrot-orange text-sm rounded-full mb-4">
                        {project.status.development
                          ? t.projects.underDevelopment
                          : ""}
                      </span>
                    )}
                    <p className="text-gray-300 leading-relaxed mb-6 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3 text-aero">
                        {t.projects.technologies}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-0.5 bg-gray-700/50 text-gray-300 text-[10px] rounded-full border border-gray-600"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {project.status.development ? (
                    <motion.a
                      href="#projects"
                      rel="noopener noreferrer"
                      className="bg-[var(--french-blue)]/20 inline-block py-3 px-2 rounded-md font-semibold cursor-not-allowed text-center"
                    >
                      {t.projects.viewProject}
                    </motion.a>
                  ) : (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[var(--french-blue)] inline-block py-3 px-2 rounded-md font-semibold cursor-pointer hover:bg-[var(--french-blue)]/80 transition-colors duration-300 text-center"
                    >
                      {t.projects.viewProject}
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal para imagem ampliada */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="relative"
              onClick={(e) => e.stopPropagation()} // Impede o fechamento ao clicar na imagem
            >
              <img
                src={selectedImage}
                alt="Amplified Project Image"
                className="max-h-[80vh] max-w-[80vw] object-contain"
              />
              <button
                className="absolute top-4 right-4 text-white text-2xl bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700"
                onClick={handleCloseModal}
              >
                X
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}