import gsap from 'gsap'
import React, { useEffect, useState} from 'react'
import axios from 'axios'

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    window.title = 'LoudBeats Shop - Contact'
    
    gsap.timeline()
    .fromTo('.right_contact', { opacity: 0, width: 0 }, { opacity: 1, width: "100%", duration: 1.5, ease: 'power2.in' })
    .fromTo('.right_contact > h1', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' })
    .fromTo('.right_contact > p', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, '<.2')
    .fromTo('.input', { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 1, stagger: .3, ease: 'power2.out' }, '<.2')
    .fromTo('.contact_btn', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power2.inOut' }, '<.4')
    .fromTo('.left_contact', { width: 0 }, { width: "100%", duration: 1.2, ease: 'power2.in' }, '<.1')
    .fromTo('.contact_img_bg', { width: "100%" }, { width: 0, duration: 1, ease: 'power2.inOut' })
    .fromTo('.left_contact img', { scale: 1.3, filter: 'blur(3px)' }, { scale: 1, filter: 'blur(0px)', duration: 2, ease: 'power2.inOut' }, '<.1')
    .fromTo('.left_contact > .logo', {y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, '<0.9')
    .fromTo('.left_contact img', { scale: 1 }, { scale: 1.1, duration: 10, ease: 'power2.inOut' })
  }, [])

  const sendMessage = async () => {
    if(name.length > 3 && email.length > 12 && message.length > 10) {
      await axios.post('/contact', {
        name: name, email: email, message: message
      })
    }
  }

  return (
    <div className='contact'>
      <div className="left_contact">
        <img src="./contact_img.webp" alt="" />
        <div className="contact_img_bg"></div>
        <div className="logo" style={{ color: '#fff', textAlign: 'center', marginLeft: 0 }}>  
          <h1>Loud</h1>
          <h1>Beats</h1>
        </div>
      </div>

      <form className="right_contact" onSubmit={sendMessage}>
        <img src="../contact_img.webp" alt="" />
        <h1>Contact Us</h1>
        <p>Feel free to contact us any time. We will get back to you as soon as we can!</p>

        <input className='input' type="text" placeholder='Name' onChange={e => setName(e.target.value)} />
        <input className='input' type="email" placeholder='Email' onChange={e => setEmail(e.target.value)} />
        <textarea className='input' name="" id="" cols="30" rows="10" placeholder='Message' onChange={e => setMessage(e.target.value)} ></textarea>
        <button className='contact_btn'>SEND</button>
      </form>

    </div>
  )
}

export default Contact