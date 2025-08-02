import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing'

// Hook para gerenciar o scroll com suavização
function useScrollParallax() {
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [smoothScrollY, setSmoothScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }

    handleResize()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Suavização do scroll com lerp
  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const updateSmoothScroll = () => {
      setSmoothScrollY(prev => lerp(prev, scrollY, 0.05)) // Fator de suavização
    }

    const interval = setInterval(updateSmoothScroll, 16) // ~60fps
    return () => clearInterval(interval)
  }, [scrollY])

  return { scrollY: smoothScrollY, windowHeight }
}

// Componente otimizado para partículas
function OptimizedParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const [particleCount, setParticleCount] = useState(500)

  // Reduzir partículas baseado na performance
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const pixelRatio = window.devicePixelRatio
      const totalPixels = width * height * pixelRatio
      
      // Ajustar número de partículas baseado na resolução
      if (totalPixels > 2000000) { // 2M pixels
        setParticleCount(300)
      } else if (totalPixels > 1000000) { // 1M pixels
        setParticleCount(500)
      } else {
        setParticleCount(800)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return pos
  }, [particleCount])

  useFrame((state) => {
    if (pointsRef.current) {
      // Rotação base
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#39a9db"
        transparent
        opacity={0.4}
        sizeAttenuation={true}
      />
    </points>
  )
}

// Componente otimizado para cubos flutuantes
function OptimizedFloatingCubes() {
  const groupRef = useRef<THREE.Group>(null)
  const cubeCount = 5

  const colors = useMemo(() => ['#1c77c3', '#39a9db', '#40bcd8', '#f39237', '#d63230'], [])
  const positions = useMemo(() => {
    const pos = []
    for (let i = 0; i < cubeCount; i++) {
      const angle = (i / cubeCount) * Math.PI * 2
      const radius = 4
      pos.push([
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      ])
    }
    return pos
  }, [cubeCount])

  useFrame((state) => {
    if (groupRef.current) {
      // Rotação base
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
      
      // Animação dos cubos individuais
      groupRef.current.children.forEach((child, index) => {
        child.position.y = Math.sin(state.clock.elapsedTime + index) * 1.5
        child.rotation.x += 0.005
        child.rotation.z += 0.005
      })
    }
  })

  return (
    <group ref={groupRef}>
      {positions.map((pos, index) => (
        <mesh key={index} position={pos as [number, number, number]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial
            color={colors[index % colors.length]}
            transparent
            opacity={0.7}
            emissive={colors[index % colors.length]}
            emissiveIntensity={2}
            toneMapped={false}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}

// Esfera central com ganho de brilho
function OptimizedGlowingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { scrollY, windowHeight } = useScrollParallax()

  useFrame((state) => {
    if (meshRef.current) {
      // Rotação base
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.05
      
      // Ganho de brilho baseado no scroll
      const scrollProgress = scrollY / windowHeight
      const material = meshRef.current.material as THREE.MeshStandardMaterial
      if (material) {
        const baseEmissiveIntensity = 3
        const scrollEmissiveGain = scrollProgress * 5 // Ganho de brilho
        material.emissiveIntensity = baseEmissiveIntensity + scrollEmissiveGain
      }
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.1, 1]} /> {/* Detalhe fixo - sem perda */}
      <meshStandardMaterial
        color="#1c77c3"
        wireframe={true}
        emissive="#39a9db"
        emissiveIntensity={3}
        transparent
        opacity={0.6}
        roughness={0.2}
        metalness={0.8}
        toneMapped={false}
      />
    </mesh>
  )
}

// Componente de estrelas otimizado
function OptimizedStars() {
  const [starCount, setStarCount] = useState(3000)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const pixelRatio = window.devicePixelRatio
      const totalPixels = width * height * pixelRatio
      
      if (totalPixels > 2000000) {
        setStarCount(1500)
      } else if (totalPixels > 1000000) {
        setStarCount(2500)
      } else {
        setStarCount(3000)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Stars
      radius={80}
      depth={40}
      count={starCount}
      factor={3}
      saturation={0}
      fade
      speed={0.5}
    />
  )
}

export default function Scene3D() {
  const [bloomIntensity, setBloomIntensity] = useState(1.0)
  const { scrollY, windowHeight } = useScrollParallax()

  // Ajustar intensidade do bloom baseado na performance e scroll
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const pixelRatio = window.devicePixelRatio
      const totalPixels = width * height * pixelRatio
      
      if (totalPixels > 2000000) {
        setBloomIntensity(0.8)
      } else if (totalPixels > 1000000) {
        setBloomIntensity(1.0)
      } else {
        setBloomIntensity(1.2)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Ajustar bloom baseado no scroll
  const scrollProgress = scrollY / windowHeight
  const dynamicBloomIntensity = bloomIntensity + scrollProgress * 0.01 // Ganho de bloom no scroll

  // Calcular posição da câmera baseada no scroll
  const baseZ = 8
  const maxZoomOut = 50 // Distância máxima da câmera
  const cameraZ = baseZ + (scrollY * 0.01) // Movimento suave para trás

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, cameraZ], fov: 75 }}
        style={{ background: 'linear-gradient(to bottom, #000000, #0a0a0a)' }}
        gl={{
          antialias: false, // Desabilitar antialiasing para performance
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]} // Limitar pixel ratio
        performance={{ min: 0.5 }} // Configuração de performance
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#40bcd8" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#f39237" />

        <OptimizedGlowingSphere />
        <OptimizedFloatingCubes />
        <OptimizedParticles />
        <OptimizedStars />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping={false} // Desabilitar damping para performance
          target={[0, 0, 0]}
          minDistance={8}
          maxDistance={25}
        />

        <EffectComposer>
          <Bloom
            mipmapBlur
            luminanceThreshold={0.15}
            levels={7}
            intensity={dynamicBloomIntensity}
            luminanceSmoothing={0.05}
          />
          <ToneMapping />
        </EffectComposer>
      </Canvas>
    </div>
  )
} 