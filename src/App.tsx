import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Setup from "./pages/Setup"
import Results from "./pages/Results"
import './App.scss'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Setup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
