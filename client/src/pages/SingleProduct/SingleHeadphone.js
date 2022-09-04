import React, { useContext, useEffect, useRef } from 'react'
import Ranks from '../smallComponents/Ranks'
import { Link, useParams } from 'react-router-dom'
import GlobaleContext from '../../GlobaleContext'
import gsap from 'gsap'
import { motion } from 'framer-motion'
import Error from '../Error'

function SingleHeadphone() {
  let { id } = useParams()
  const state = useContext(GlobaleContext)
  const HeadphonesData = state.HeadphonesData

  let brandRef = useRef(null)
  let nameRef = useRef(null)
  let paragraphRef = useRef(null)
  let btnRef = useRef(null)

  let headphone = HeadphonesData.filter(p => p.id === parseInt(id))

  useEffect(() => {
    window.scrollTo({ top: 0 , behavior: 'smooth' })
    id && headphone.length !== 0 ? window.document.title = headphone[0].name : window.document.title = 'LoudBeats Shop - Home'

    gsap.fromTo(brandRef.current, { opacity: 0, y: 50}, { opacity: 1, y: 0, duration: 1, delay: 0.0 })
    gsap.fromTo(nameRef.current, { opacity: 0, y: 50}, { opacity: 1, y: 0, duration: 1, delay: 0.1 })
    gsap.fromTo(paragraphRef.current, { opacity: 0, y: 50}, { opacity: 1, y: 0, duration: 1, delay: 0.2 })
    gsap.fromTo(btnRef.current, { opacity: 0, y: 50}, { opacity: 1, y: 0, duration: 1, delay: 0.3 })
  }, [])

  if(HeadphonesData.length === 0 || headphone.length === 0) return <Error />

  return (
    <div className='singleproduct'>
      <div className="back">
        <img src="../../../backArrow.svg" alt="" />
        <Link to='/'>Back</Link>
      </div>
      <motion.img layoutId={headphone[0].imgs[0]} transition={{ duration: 1 }} src={headphone[0].imgs[0]} alt={headphone[0].name} />
      
      <div className="multicolor_background">
        <div className="first_color"></div>
        <div className="second_color"></div>
      </div>

      <div className="sp_infos">
        <span ref={brandRef}>{headphone[0].brand}</span>
        <h1 ref={nameRef}>{headphone[0].name}</h1>

        <div className="sp_p_container">
          <p ref={paragraphRef}>{headphone[0].description}</p>
        </div>

        <Ranks headphone={headphone} />

        <div className="sp_border"></div>
        <Link ref={btnRef} to={`/headphonedetails/${id}`} className="sp_btn">See more details</Link>
      </div>
    </div>
  )
}

export default SingleHeadphone