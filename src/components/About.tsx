import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useSectionActive } from '../hooks/useSectionActive'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()
  const isActive = useSectionActive('about')

  const skills = [
    { name: "Next.js", level: 90, color: "bg-french-blue" },
    { name: "React.js", level: 95, color: "bg-picton-blue" },
    { name: "TypeScript", level: 85, color: "bg-aero" },
    { name: "Node.js", level: 88, color: "bg-carrot-orange" },
    { name: "Python", level: 82, color: "bg-persian-red" },
    { name: "Blockchain", level: 85, color: "bg-french-blue" },
    { name: "AI/ML", level: 80, color: "bg-picton-blue" },
    { name: "Docker", level: 85, color: "bg-aero" },
  ]

  return (
    <section 
      ref={ref} 
      id="about"
      className={`py-20 px-4 relative transition-all duration-300 ${
        isActive ? 'section-active-bg' : ''
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
            <span className="gradient-text">{t.about.title.split(' ')[0]}</span> {t.about.title.split(' ').slice(1).join(' ')}
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
              <h3 className="text-2xl font-bold mb-6 text-aero">{t.about.specializations}</h3>
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
              </div>
            </div>

            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-aero">{t.about.languages}</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">{t.about.portuguese}</span>
                  <span className="text-french-blue font-semibold">{t.about.portugueseDesc}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">{t.about.english}</span>
                  <span className="text-picton-blue font-semibold">{t.about.englishDesc}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">{t.about.german}</span>
                  <span className="text-aero font-semibold">{t.about.germanDesc}</span>
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
              <h3 className="text-2xl font-bold mb-8 text-aero">{t.about.skills}</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-aero font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${skill.color}`}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-aero">{t.about.education.title}</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-french-blue pl-4">
                  <h4 className="text-lg font-semibold text-white">{t.about.education.degree}</h4>
                  <p className="text-gray-300">UniCesumar</p>
                  <p className="text-sm text-gray-400">2025-2029 ({t.about.education.status})</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 