import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TelaSaude from './pages/TelaSaude/Saude'

import TelaLocHosp from './pages/TelaLocHosp'
import TelaSobreNos from './pages/TelaSobreNos/SobreNos';
import TelaBuscaUnidades from './pages/TelaBuscaUnidades/BuscaUnidades';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaSaude />} />
        <Route path="/TelaLocHosp" element={<TelaLocHosp />} />
        <Route path="/sobre" element={<TelaSobreNos/>} />
        <Route path="/busca" element={<TelaBuscaUnidades/>} />
      </Routes>
    </BrowserRouter>
  )
}
