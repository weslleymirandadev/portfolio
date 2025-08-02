import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useSectionActive } from "../hooks/useSectionActive";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "../config/emailjs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Criar uma instância do SweetAlert2 com suporte a React
const MySwal = withReactContent(Swal);

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage(); // Obter language do contexto
  const isActive = useSectionActive("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Configurar o locale do SweetAlert2 com base no idioma
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        to_name: "Weslley Miranda",
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        reply_to: formData.email,
        to_email: "contato@weslleymiranda.dev",
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      // Alert de sucesso
      await MySwal.fire({
        icon: "success",
        title: t.contact.successTitle || "Sucesso!",
        text:
          t.contact.successMessage ||
          "Mensagem enviada com sucesso! Entraremos em contato em breve.",
        confirmButtonText: t.contact.confirmButton || "OK",
        customClass: {
          confirmButton: "bg-french-blue text-white hover:bg-picton-blue",
        },
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Email send error:", error);

      // Alert de erro
      await MySwal.fire({
        icon: "error",
        title: t.contact.errorTitle || "Erro!",
        text:
          t.contact.errorMessage ||
          "Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.",
        confirmButtonText: t.contact.confirmButton || "OK",
        customClass: {
          confirmButton: "bg-red-500 text-white hover:bg-red-600",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: "📧",
      label: "Email",
      value: "contato@weslleymiranda.dev",
      link: "mailto:contato@weslleymiranda.dev",
    },
    {
      icon: "📱",
      label: "Telefone",
      value: "+55 (41) 99585-0310",
      link: "tel:+5541995850310",
    },
    {
      icon: "🌐",
      label: "Portfolio",
      value: "weslleymiranda.dev",
      link: "https://www.weslleymiranda.dev",
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "linkedin.com/in/weslley-miranda",
      link: "https://linkedin.com/in/weslley-miranda",
    },
  ];

  return (
    <section
      ref={ref}
      id="contact"
      className={`py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative transition-all duration-300 ${
        isActive ? "section-active-bg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span className="gradient-text">
              {t.contact.title.split(" ")[0]}
            </span>{" "}
            {t.contact.title.split(" ").slice(1).join(" ")}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {t.contact.description}
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Left Column - Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col"
          >
            {/* Contact Info Section */}
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-aero">
                {t.contact.contactInfo}
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.link}
                    target={info.link.startsWith("http") ? "_blank" : "_self"}
                    rel={
                      info.link.startsWith("http") ? "noopener noreferrer" : ""
                    }
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4 glass-effect p-4 sm:p-6 rounded-xl hover:scale-105 transition-transform duration-300"
                  >
                    <div className="text-2xl sm:text-3xl flex-shrink-0">
                      {info.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-french-blue text-base sm:text-lg">
                        {info.label}
                      </p>
                      <p className="text-gray-300 text-sm sm:text-base truncate">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Media Section */}
            <div className="mt-6 sm:mt-8">
              <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-aero">
                {t.contact.socialMedia}
              </h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/weslleymirandadev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 sm:p-4 glass-effect rounded-xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
                >
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/weslley-miranda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 sm:p-4 glass-effect rounded-xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
                >
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-effect p-6 sm:p-8 rounded-2xl"
          >
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold mb-3 text-aero"
                  >
                    {t.contact.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 sm:py-4 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-french-blue focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                    placeholder={t.contact.form.namePlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-3 text-aero"
                  >
                    {t.contact.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 sm:py-4 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-french-blue focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                    placeholder={t.contact.form.emailPlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold mb-3 text-aero"
                  >
                    {t.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full h-32 sm:h-40 px-4 py-3 sm:py-4 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-french-blue focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 resize-none"
                    placeholder={t.contact.form.messagePlaceholder}
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 sm:px-8 sm:py-4 cursor-pointer bg-gradient-to-r from-french-blue to-picton-blue rounded-xl font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 text-base sm:text-lg mt-6"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  t.contact.form.send
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
