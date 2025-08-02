import React, { createContext, useContext, useState, useEffect } from 'react'
import { pt } from '../locales/pt'
import { en } from '../locales/en'

type Language = 'pt' | 'en'
type Translations = typeof pt

interface LanguageContextType {
  language: Language
  t: Translations
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: React.ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt')

  useEffect(() => {
    // Recuperar idioma salvo no localStorage
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'pt' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    }
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === 'pt' ? 'en' : 'pt'
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  const t = language === 'pt' ? pt : en

  const value: LanguageContextType = {
    language,
    t,
    toggleLanguage
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
} 