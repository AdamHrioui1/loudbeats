import React, { useContext, useEffect, useState } from 'react'
import GlobaleContext from '../../GlobaleContext'

function CartItem({ item }) {
    const state = useContext(GlobaleContext)
    const [cart, setCart] = state.cart

    const { id, imgs, name, price } = item
    const [Quantity, setQuantity] = useState(1)

    const increaseQuantity = () => {
        setQuantity(Quantity+1)
        cart.forEach(i => {i.id === id ? i.quantity = Quantity+1 : i.quantity = i.quantity })
        setCart([...cart])
    }

    const decreaseQuantity = () => {
        if(Quantity > 1) {
            setQuantity(Quantity-1)
            cart.forEach(i => {i.id === id ? i.quantity = Quantity-1 : i.quantity = i.quantity })
            setCart([...cart])
        }
        else {
            removeItem(id)
        }
    }

    const removeItem = (removedItem) => {
        setCart([...cart.filter(c => c.id !== removedItem)])
    }

    return (
        <div className="row">
            <div className="title_price">
                <img className='small_img' src={imgs[0]} alt="" />
                <div className="title_price_column">
                    <p className='p_title'>{name}</p>
                    <p className='price'>${price}</p>
                </div>
            </div>

            <div className="btns">
                <button onClick={increaseQuantity}>+</button>
                <span className='counter'>{Quantity}</span>
                <button onClick={decreaseQuantity}>-</button> 
            </div>

            <div className="final_product_price">${(price * Quantity).toFixed(2)}</div>
            <div className="remove_item" onClick={() => removeItem(id)}>
                <img src="../times.svg" alt="" />
            </div>
        </div>
    )
}

export default CartItem