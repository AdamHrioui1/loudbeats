import React, { useContext, useEffect, useRef } from 'react'
import Ranks from '../smallComponents/Ranks'
import { Link, useParams } from 'react-router-dom'
import GlobaleContext from '../../GlobaleContext'
import gsap from 'gsap'
import { motion } from 'framer-motion'

function SingleHeadphone() {
  let { id } = useParams()
  const state = useContext(GlobaleContext)
  const HeadphonesData = state.HeadphonesData

  let brandRef = useRef(null)
  let nameRef = useRef(null)
  let paragraphRef = useRef(null)
  let btnRef = useRef(null)

  let headphone = HeadphonesData.filter(p => p.id === parseInt(id))
  const { brand, name, description, imgs } = headphone[0]

  useEffect(() => {
    window.scrollTo({ top: 0 , behavior: 'smooth' })
    id ? window.document.title = name : window.document.title = 'LoudBeats Shop - Home'

    gsap.fromTo(brandRef.current, { opacity: 0, y: 50}, { opacity: 1, y: 0, duration: 1, delay: 0.0 })
    gsap.fromTo(nameRef.current, { opacity: 0, y: 50}, { opacity: 1, y: 0, duration: 1, delay: 0.1 })
    gsap.fromTo(paragraphRef.current, { opacity: 0, y: 50}, { opacity: 1, y: 0, duration: 1, delay: 0.2 })
    gsap.fromTo(btnRef.current, { opacity: 0, y: 50}, { opacity: 1, y: 0, duration: 1, delay: 0.3 })
  }, [])

  if(HeadphonesData.length === 0) return ''

  return (
    <div className='singleproduct'>
      <div className="back">
        <img src="../../../backArrow.svg" alt="" />
        <Link to='/'>Back</Link>
      </div>
      <motion.img layoutId={imgs[0]} transition={{ duration: 1 }} src={imgs[0]} alt={name} />
      
      <div className="multicolor_background">
        <div className="first_color"></div>
        <div className="second_color"></div>
      </div>

      <div className="sp_infos">
        <span ref={brandRef}>{brand}</span>
        <h1 ref={nameRef}>{name}</h1>

        <div className="sp_p_container">
          <p ref={paragraphRef}>{description}</p>
        </div>

        <Ranks headphone={headphone} />

        <div className="sp_border"></div>
        <Link ref={btnRef} to={`/headphonedetails/${id}`} className="sp_btn">See more details</Link>
      </div>
    </div>
  )
}

export default SingleHeadphone