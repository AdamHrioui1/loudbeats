import React, { useContext, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Link, useParams } from 'react-router-dom'
import GlobaleContext from '../../GlobaleContext'
import { motion } from 'framer-motion'

function AirpodDetails() {
    const { id } = useParams()
    const state = useContext(GlobaleContext)
    const AirpodsData = state.AirpodsData
    const [cart] = state.cart
    const AddToCart = state.AddToCart

    const [popupImg, setPopupImg] = useState('')
    const [itemInTheCart, setItemInTheCart] = useState(false)

    const currentProduct = AirpodsData.filter(h => h.id === parseInt(id))
    const { imgs, info, price, name } = currentProduct[0]

    useEffect(() => {
        const zoomOutImg = document.querySelectorAll('.zoomOutImg')
        window.scrollTo({ top: 0 , behavior: 'smooth' })
        id ? window.document.title = name : window.document.title = 'LoudBeats Shop - Home'

        setTimeout(() => {
            zoomOutImg.forEach((z, i) => {
                setTimeout(() => {
                    gsap.fromTo(z, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 0.9, duration: 1, ease: 'power2.in'})
                }, (i+1)*200);
            })
        }, 100);

        setTimeout(() => {
            zoomOutImg.forEach((z, i) => {
                setTimeout(() => {
                    gsap.fromTo(z, { scale: 1.1 }, { scale: 1, duration: 5, ease: 'power2.inOut' })
                }, (i+1)*200);
            })
        }, 1200);

        gsap.timeline()
            .fromTo('.desc_li', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: .1, ease: 'power2.inOut' })
            .fromTo('.price h1', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: .1, ease: 'power2.inOut' }, .6)
            .fromTo('.price .price_btn span', { opacity: 0 }, { opacity: 1, duration: 1, stagger: .1, ease: 'power2.inOut' }, 1)
            .fromTo('.price_btn img', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: .1, ease: 'power2.inOut'}, '<0')
    
        const item = cart.some(i => i.id === parseInt(id))
        item && setItemInTheCart(true)
    }, [])
    
    const addtocart = () => {
        const item = cart.some(i => i.id === parseInt(id))
        setItemInTheCart(true)
        !item && AddToCart(currentProduct[0])
    }
        
    if(AirpodsData.length === 0) return ''

    return (
        <div className='all_details_container'>
            <div className="back">
                <img src="../../../backArrow.svg" alt="svg arrow" />
                <Link to={`/singleairpod/${id}`}>Back</Link>
            </div>   
            <div className="all_details">
                <h1 className='title'>Description</h1>
                <ul>
                    {
                        info.map((li, i) => {
                            return <li className='desc_li' key={i}>{li}</li>
                        })
                    }
                </ul>

                <div className="price">
                    <div className="price_btn">
                        <span onClick={addtocart}>{itemInTheCart ? 'ITEM IN THE CART' : 'BUY FOR'}</span>
                        {itemInTheCart ? '' : <img src="../../../upArrow.svg" alt={name} /> }
                    </div>
                    <h1>${price}</h1>
                </div>
            </div>
        
            <div className="imgs_container_absolute">

                <motion.div layoutId={imgs[0]} transition={{ duration: 1 }} className="image__container">
                    <img style={{ opacity: 1 }} src={imgs[0]} alt={name} onClick={() => setPopupImg(imgs[0])} />
                </motion.div>
                <div className="image__container" onClick={() => setPopupImg(imgs[1])} >
                    <img className='zoomOutImg' src={imgs[1]} alt={name} />
                </div>
                <div className="image__container" onClick={() => setPopupImg(imgs[2])}>
                    <img className='zoomOutImg' src={imgs[2]} alt={name} />
                </div>

                <div className="multicolor_background" style={{ transform: 'translate(-50%, -50%)' }}>
                    <div className="first_color"></div>
                    <div className="second_color"></div>
                </div>

            </div>

            <div className={`popup ${popupImg.length > 0 ? 'show': 'hide'}`}>
                <div className="times" onClick={() => setPopupImg('')} ></div>
                <img src={popupImg} alt={name} className='popup_img'/>
            </div>
        </div>
    )
}

export default AirpodDetails