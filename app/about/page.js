import About from '../About'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-20">
        <About />
      </main>
      <Footer />
    </div>
  )
} 