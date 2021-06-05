import React from 'react'
import s from './style/NotAuthNavbar.module.css'
import { NavLink } from 'react-router-dom'

export function NotAuthNavbar() {
  return (
    <div className={s.navbar}>
      <NavLink to="/" className={s.logo}>
        Math
      </NavLink>
      <div>
        <NavLink to="/signup" className={`${s.btn} ${s.btn__left}`}>
          Sign up
        </NavLink>
        <NavLink to="/login" className={s.btn}>
          Login
        </NavLink>
      </div>
    </div>
  )
}
