import React, { useContext, useEffect, useRef, useState } from 'react'
import GlobaleContext from '../../GlobaleContext'
import CartItem from '../smallComponents/CartItem'
import gsap from 'gsap'
import CountUpAnimation from '../smallComponents/CountUpAnimation'
import autoAnimate from '@formkit/auto-animate'
import { useAutoAnimate } from '@formkit/auto-animate/react'

function Cart() {
    const state = useContext(GlobaleContext)
    const [cart] = state.cart
    const [total, setTotal] = useState(cart.reduce((prev, current) => prev + current.price * current.quantity , 0))
    const [showPopup, setShowPopup] = useState(false)
    
    const [parent] = useAutoAnimate()
    const popupAnimation = useRef()

    useEffect(() => {
        window.document.title = 'LoudBeats Shop - Cart'

        gsap.timeline()
        .fromTo('.cart_container_h1', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' })
        .fromTo('.table_header *', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power2.out', stagger: .1 }, '<0.3')
        .fromTo('.row', {
            x: 100,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.1,
            delay: .5
        }, '0.5')
        .fromTo('.total *', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power2.out', stagger: .1 }, '<0.3')
        .fromTo('.paypal_btn', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power2.out', stagger: .1 }, '<0.3')
    }, [])

    useEffect(() => {
        setTotal(cart.reduce((prev, current) => prev + current.price * current.quantity , 0))
    })

    const showpopup = () => {
        setShowPopup(true)
    }

    const hidePopup = () => {
        setShowPopup(false)
    }
    

    return (
        <div className='cart_container'>
            <h1 className='cart_container_h1'>{cart.length > 0 ? `(${cart.length}) Item in my cart` : 'No item in the cart'}</h1>

            <div className="table" ref={parent}>
                {
                    cart.length > 0 &&
                    <div className="table_header">
                        <div className="title_price">
                            <span className='item1'>ITEM</span>
                            <span>UNIT PRICE</span>
                        </div>
                        <span className='quantity'>QUANTITY</span>
                        <span className='item2'>FINAL PRICE</span>
                        <span className='item3'>REMOVE</span>
                    </div>
                }

                {
                    cart.map(item => {
                        return <CartItem key={item.id} item={item} />
                    })
                }
            </div>

            {
                cart.length > 0 &&
                <div className="total">
                    <h1>Total</h1>
                    <h1>$<CountUpAnimation counter={total} duration={500}>{total.toFixed(2)}</CountUpAnimation></h1>
                </div>
            }
            {
                cart.length > 0 &&
                <div className="paypal_btn" onClick={showpopup}>
                    <img src="../paypal.svg" alt="" />
                </div>
            }

            
            <div className={`popup ${showPopup ? 'show': 'hide'}`}>
                <h1>All the items are out of store!</h1>
                <div className="times" onClick={hidePopup} ></div>
            </div>
        </div>
    )
}

export default Cart