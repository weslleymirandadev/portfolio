import Scene3D from './components/Scene3D'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import { LanguageProvider } from './contexts/LanguageContext'

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <Scene3D />
        <Navigation />
        
        <main>
          <section id="home">
            <Hero />
          </section>
          
          <section id="about">
            <About />
          </section>
          
          <section id="projects">
            <Projects />
          </section>
          
          <section id="contact">
            <Contact />
          </section>
        </main>
      </div>
    </LanguageProvider>
  )
}

export default App
