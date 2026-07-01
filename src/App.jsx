import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import PrintShop from './pages/PrintShop/PrintShop'
import { CartProvider } from './context/CartContext'

export default function App() {
  return (
    <CartProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/print-shop" element={<PrintShop />} />
      </Routes>
      <Footer />
    </CartProvider>
  )
}