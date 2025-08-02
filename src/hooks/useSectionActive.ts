import { useState, useEffect } from 'react'

export function useSectionActive(sectionId: string) {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById(sectionId)
      if (!section) return

      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calcular quando a seção está no meio da tela
      const sectionTop = rect.top
      const sectionBottom = rect.bottom
      const screenMiddle = windowHeight / 2
      
      // Seção está ativa quando passa do meio da tela
      const isInMiddle = sectionTop <= screenMiddle && sectionBottom >= screenMiddle
      
      setIsActive(isInMiddle)
    }

    // Verificar no carregamento inicial
    handleScroll()
    
    // Adicionar listener de scroll
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sectionId])

  return isActive
} 