import gsap from 'gsap'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import GlobaleContext from '../GlobaleContext'

function Navbar() {
  const state = useContext(GlobaleContext)
  const [activeMenu, setActiveMenu] = state.activeMenu
  const [cart] = state.cart

  useEffect(() => {
    gsap.fromTo('li', { x: "100%", opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power2.inOut' })
  }, [activeMenu])

  const getMenu = () => {
    if(window.innerWidth <= 900) {  
      setActiveMenu(!activeMenu)
    }
  }

  return (
    <nav>
      <Link to='/' className="logo">  
        <h1>Loud</h1>
        <h1>Beats</h1>
      </Link>

      <ul className={`${activeMenu ? 'active' : ''}`}>
        <li onClick={getMenu}>
          <Link to='/'>HEADPHONES</Link>
        </li>
        <li onClick={getMenu}>
          <Link to='/airpods'>AIRPODS</Link>
        </li>
        <li onClick={getMenu}>
          <Link to='/flexpods'>FLEXPODS</Link>
        </li>
        <li onClick={getMenu} className='cart_li'>
          <Link to='/cart'>CART</Link>
          <span>{cart.length > 0 ? cart.length : ''}</span>
        </li>
        <li onClick={getMenu}>
          <Link to='/contact'>CONTACT</Link>
        </li>
      </ul>

      <div className={`menu ${activeMenu ? 'active' : ''}`} onClick={getMenu}>
        <div className="first"></div>
        <div className="second"></div>
        <div className="third"></div>
      </div>
    </nav>
  )
}

export default Navbar