import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Setup from "./pages/Setup"
import './App.scss'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Setup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
