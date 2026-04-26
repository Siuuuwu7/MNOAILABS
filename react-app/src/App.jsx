import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home.jsx'
import IndustryPage from './pages/IndustryPage.jsx'
import NotFound from './pages/NotFound.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Backgroundeffect from './components/Backgroundeffect.jsx'
import Cursor from './components/Cursor.jsx'
import { industries } from './data/industries.js'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <Backgroundeffect />
      <Cursor />
      <Nav />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {industries.map((ind) => (
            <Route
              key={ind.slug}
              path={`/industries/${ind.slug}`}
              element={<IndustryPage data={ind} />}
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
