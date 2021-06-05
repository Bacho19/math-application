import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './style/NotAuthHome.module.css'

export function NotAuthHome() {
  return (
    <div className={s.wrapper}>
      <div className={s.content__left}>
        <h2 className={s.content__left__title}>Mathematics</h2>
        <p className={s.content__left__text}>
          Limits and continuity · Derivatives: definition and basic rules ·
          Derivatives: chain rule and other advanced topics · Applications of
          derivatives
        </p>
        <NavLink to="/signup" className={s.content__left__btn}>
          Sign up
        </NavLink>
      </div>
      <div className={s.content__right}>
        <img
          src={'images/NotAuthHomeImg.png'}
          className={s.content__right__img}
          alt="Image"
        />
      </div>
    </div>
  )
}
