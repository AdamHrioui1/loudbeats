import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import CountUpAnimation from './CountUpAnimation';

function AirpodRanks({ airpod }) {
  const [counter, setCounter] = useState(0)
  const [left, setLeft] = useState(0)
  const [arrowTop, setArrowTop] = useState(0)
  const [arrowLeft, setArrowLeft] = useState(0)
  const [btnIsActive, setBtnIsActive] = useState(0)
  const [CounterAnimation, setCounterAnimation] = useState(false)

  const chargeIn = useRef()
  const SingleCharge = useRef(null)
  const ChargingCase = useRef(null)

  const { shortInfo } = airpod[0]

  useEffect(() => {
    gsap.fromTo(chargeIn.current, { width: 0 }, { width: shortInfo.chargeIn*100/2.5+'%', duration: 1, delay: .7})
    gsap.fromTo(SingleCharge.current, { width: 0 }, { width: shortInfo.SingleCharge*100/11+'%', duration: 1, delay: .7})
    gsap.fromTo(ChargingCase.current, { width: 0 }, { width: shortInfo.ChargingCase*100/80+'%', duration: 1, delay: .7})
    setCounterAnimation(!CounterAnimation)
  }, [counter])
  

  useEffect(() => {
    resize()
  }, [])
  
  window.addEventListener('resize', () => {
    resize()
  })

  const resize = () => {
    if(window.innerWidth >= 1050) {
      setLeft(33)
    }
    if(window.innerWidth <= 1050 && window.innerWidth > 650) {
      setLeft(50)
    }
    if(window.innerWidth <= 650) {
      setLeft(0)
    }
  }

  const slider = () => {
    setBtnIsActive(true)
    setTimeout(() => {
      setBtnIsActive(false)
    }, 200);

    if(window.innerWidth >= 1050) {
      counter >= 2 ? setCounter(0) : setCounter(counter+1)
    }
    if(window.innerWidth <= 1050 && window.innerWidth > 650) {
      counter >= 3 ? setCounter(0) : setCounter(counter+1)
    }
  }

  const mouseMoving = e => {
    if(window.innerWidth > 650) {
      setArrowTop(e.clientY)
      setArrowLeft(e.clientX)
    }
  }

  return (
    <div className="ranks_big_container" onClick={slider} onMouseMove={mouseMoving}>
      <div className={`rank_hover_btn ${btnIsActive ? 'active' : ''}`} style={{ top: arrowTop+"px", left: arrowLeft+"px" }}>
        <div className={`rank_arrow ${btnIsActive ? 'active' : ''}`}></div>
      </div>

      <div className="rank_second_container">
        <div className="col" style={{ left: 0*left-(left*counter)+'%' }} >
          <span>Charge in</span>
          <div className="bar_container">
            <div ref={chargeIn} className="range_bar"></div>
          </div>

          <span className='range_data'><CountUpAnimation duration={2000} counter={counter}>{shortInfo.chargeIn}</CountUpAnimation>h of 2.5h</span>
        </div>

        <div className="col" style={{ left: 1*left-(left*counter)+'%' }} >
          <span>Single charge</span>
          <div className="bar_container">
            <div ref={SingleCharge} className="range_bar"></div>
          </div>

          <span className='range_data'><CountUpAnimation duration={2000} counter={counter}>{shortInfo.SingleCharge}</CountUpAnimation>h of 11h</span>
        </div>

        <div className="col" style={{ left: 2*left-(left*counter)+'%' }} >
          <span>Charging case</span>
          <div className="bar_container">
            <div ref={ChargingCase} className="range_bar"></div>
          </div>

          <span className='range_data'><CountUpAnimation duration={2000} counter={counter}>{shortInfo.ChargingCase}</CountUpAnimation>h of 80h</span>
        </div>

        <div className="col" style={{ left: 3*left-(left*counter)+'%' }} >
          <span>Bluetooth</span>
          <span className='small_info'><CountUpAnimation duration={2000} counter={counter}>{shortInfo.Bluetooth}</CountUpAnimation></span>
        </div>

        <div className="col" style={{ left: 4*left-(left*counter)+'%' }} >
          <span>Charger</span>
          <span className='small_info'>{shortInfo.Charger}</span>
        </div>
      </div>
    </div>
  )
}

export default AirpodRanks