import './App.css'
import logo from './assets/logo.png'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Generate from './pages/Generate'

function App() {

  return (
    <BrowserRouter>
      <nav className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#c2c4c7]">
        <Link to="/">
          <img src={logo} alt="logo" className="h-18 object-contain" />
        </Link>

        <Link to="/generate" className="font-sans font-medium bg-[#9b42df] text-white px-4 py-2 rounded-md">Generate</Link>
      </nav>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#6070ae] min-h-[calc(100vh-104px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<Generate />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
