// Base Imports 
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Components 
import Layout from './components/Layout';
import Info from './pages/lnfo';
import Plan from './pages/Plan';
import AddOns from './pages/AddOns';
import Summary from './pages/Summary';
import Confirmation from './pages/Confirmation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Info />} />
          <Route path='plan' element={<Plan />} />
          <Route path='add-ons' element={<AddOns />} />
          <Route path='summary' element={<Summary />} />
          <Route path='confirmation' element={<Confirmation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;