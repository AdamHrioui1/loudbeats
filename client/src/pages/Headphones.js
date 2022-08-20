import React, { useContext, useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import GlobaleContext from '../GlobaleContext';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

function Headphone() {
    
    const state = useContext(GlobaleContext)
    const [activeMenu] = state.activeMenu
    const HeadphonesData = state.HeadphonesData

    const [counter, setCounter] = useState(0)
    const [top, setTop] = useState(0)
    const [left, setLeft] = useState(0)
    const [biggerThanHalf, setBiggerThanHalf] = useState(false)
    const [cursorIn, setCursorIn] = useState(false)
    const [active, setActive] = useState(false)
    const [activateAnimation, setActivateAnimation] = useState(false)

    const companyAnimation = useRef(null)
    const nameAnimation = useRef(null)
    const detailsAnimation = useRef(null)
    const hoverBtn = useRef(null)
    const currentCounter = useRef(null)
    const totalCounter = useRef(null)
    const imgsContainer = useRef(null)

    var distX, distY, x, y, touch, startTime, endTime;
    
    useEffect(() => {
        gsap.fromTo(companyAnimation.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.inOut'})
        gsap.fromTo(nameAnimation.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.inOut', delay: .2 })
        gsap.fromTo(detailsAnimation.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.inOut', delay: .3 })
        gsap.fromTo(currentCounter.current, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, duration: 1, ease: 'power2.inOut'})
    }, [counter])

    useEffect(() => {
        window.document.title = 'LoudBeats Shop - Headphones'

        setActivateAnimation(true)
        setTimeout(() => {
            setActivateAnimation(false)
        }, 1500);
    }, [])
    
    const mouseMoving = (e) => {
        if(window.innerWidth > 600) {
            setTop(e.clientY)
            setLeft(e.clientX)
            e.clientX > window.innerWidth / 2 ? setBiggerThanHalf(false) : setBiggerThanHalf(true)   
        }
    }

    const nextBtn = () => {
        setActive(true)
        setTimeout(() => {  
            setActive(false)
        }, 200);

        return counter === HeadphonesData.length-1 ? setCounter(HeadphonesData.length-1) : setCounter(counter+1)
    }

    const prevBtn = () => {
        setActive(true)
        setTimeout(() => {  
            setActive(false)
        }, 200);

        return counter === 0 ? setCounter(0) : setCounter(counter-1)
    }
    
    const seeDetails = () => {
        setActive(true)
        setTimeout(() => {  
            setActive(false)
        }, 200);
    }

    const startTouching = e => {
        touch = e.changedTouches[0];
        x = touch.clientX;
        y = touch.clientY;
        distX = 0;
        distY = 0;
        startTime = new Date().getTime();
    }

    const endTouching = e => {
        touch = e.changedTouches[0];
        distX = touch.clientX - x; 
        distY = touch.clientY - y;
        endTime = new Date().getTime() - startTime;

        if(distX > 20 && distY < 200 && endTime < 300){
            prevBtn()
        }
        else if(distX < -20 && distY < 200 && endTime < 300){
            nextBtn()
        }
    }

    return (
        <div className="App">
            <div className={`container ${activeMenu ? 'active' : ''}`} onTouchStart={e => startTouching(e)} onTouchEnd={e => endTouching(e)} onMouseMove={mouseMoving}>
                <div className="absolute_btns">
                    <div className="next_btn_container" onClick={prevBtn}></div>
                    <div className="prev_btn_container" onClick={nextBtn}></div>
                    <div className={!cursorIn && biggerThanHalf ? `hover_btn left_arrow ${active ? 'active': '' }` : !cursorIn && !biggerThanHalf ? `hover_btn right_arrow ${active ? 'active': ''}`: `transform_cursor ${active ? 'active': ''}`} style={{ top: top- 30 + 'px', left: left- 30 + 'px'}} ref={hoverBtn}>
                        <img src='../arrow.svg' alt="arrow svg" />
                    </div>

                    <div className='cursor' style={{ top: top + 'px', left: left + 'px'}} ></div>
                </div>

                <div className="infos">
                    <span ref={companyAnimation}>{HeadphonesData[counter].brand}</span>
                    <h1 ref={nameAnimation}>{HeadphonesData[counter].name}</h1>
                    <p ref={detailsAnimation}>{HeadphonesData[counter].description.length > 230 ? `${HeadphonesData[counter].description.slice(0, 230)}...` : HeadphonesData[counter].description}</p>
                    <Link to={`/singleheadphone/${HeadphonesData[counter].id}`} className='btn' onClick={seeDetails} onMouseEnter={() => setCursorIn(true)} onMouseOut={() => setCursorIn(false)}>See details</Link>
                </div>

                <div className={`imgs_container ${activateAnimation ? 'active' : ''}`} ref={imgsContainer} >
                    <div className="multicolor_background">
                        <div className="first_color"></div>
                        <div className="second_color"></div>
                    </div>   
                    {
                        HeadphonesData.map((p, i) => {
                            return (
                                <motion.img  key={p.id} layoutId={p.imgs[0]} src={p.imgs[0]} alt={p.name} transition={{ duration: 1 }} style={{ transform: 'translate(-50%, -50%)'}} className={i === counter-1 ? 'past' : i === counter ? 'main_img' : i === counter+1 ? 'nd_img' : i === counter+2 ? 'rd_img' : 'none'}/>
                            )
                        })
                    }
                </div>

                <div className="products_num">
                    <h1 ref={currentCounter} >{counter+1 >= 10 ? counter+1 : `0${counter+1}`}</h1>
                    <span ref={totalCounter} >/{HeadphonesData.length >= 10 ? HeadphonesData.length : `0${HeadphonesData.length}`}</span>
                </div>
            </div>
        </div>
    )
}

export default Headphone