import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TelaSaude from './pages/TelaSaude'
import TelaLogin from './pages/TelaLogin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaSaude />} />
        <Route path="/login" element={<TelaLogin />} />
      </Routes>
    </BrowserRouter>
  )
}
