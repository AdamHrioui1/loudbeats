import React, { createContext, useState, useEffect } from 'react'
import AirpodsData from './data/AirpodsData'
import FlexpodsData from './data/FlexpodsData'
import HeadphonesData from './data/HeadphonesData'

export const GlobaleContext = createContext()

export const DataProvider = ({ children }) => {
    
    const [activeMenu, setActiveMenu] = useState(false)
    const [cart, setCart] = useState([])

    function AddToCart(currentProduct) {
        const item = cart.some(i => i.id === currentProduct.id)
        !item && setCart([...cart, {...currentProduct, quantity: 1}])
    }

    const state = {
        activeMenu: [activeMenu, setActiveMenu],
        HeadphonesData: HeadphonesData,
        AirpodsData: AirpodsData,
        FlexpodsData: FlexpodsData,
        cart: [cart, setCart],
        AddToCart: AddToCart
    }

    return (
        <GlobaleContext.Provider value={state}>
            { children }
        </GlobaleContext.Provider>
    )
}

export default GlobaleContext