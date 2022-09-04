import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimateSharedLayout } from 'framer-motion'
import Navbar from './navbar/Navbar'
import Airpods from './pages/Airpods'
import FlexPods from './pages/FlexPods'
import Headphones from './pages/Headphones'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import SingleHeadphone from './pages/SingleProduct/SingleHeadphone'
import SingleAirpods from './pages/SingleProduct/SingleAirpods'
import SingleFlexpod from './pages/SingleProduct/SingleFlexpod'
import AirpodDetails from './pages/ProductDetails/AirpodDetails'
import FlexpodsDetails from './pages/ProductDetails/FlexpodsDetails'
import Cart from './pages/Cart/Cart'
import Contact from './pages/Contact'
import Error from './pages/Error'

function Routers() {
  return (
    <AnimateSharedLayout>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Headphones />} />
          <Route path='/airpods' element={<Airpods />} />
          <Route path='/flexpods' element={<FlexPods />} />
          <Route path='/contact' element={<Contact />} />
          
          <Route path='/singleheadphone/:id' element={<SingleHeadphone />} />
          <Route path='/singleairpod/:id' element={<SingleAirpods />} />
          <Route path='/singleflexpod/:id' element={<SingleFlexpod   />} />
          
          <Route path='/headphonedetails/:id' element={<ProductDetails />} />
          <Route path='/airpoddetails/:id' element={<AirpodDetails />} />
          <Route path='/flexpoddetails/:id' element={<FlexpodsDetails />} />

          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </AnimateSharedLayout>
  )
}

export default Routers