import React from 'react'
import { AiFillMail } from 'react-icons/ai'
import { AiFillPhone } from 'react-icons/ai'
import s from './style/Footer.module.css'

export function Footer() {
    return(
        <div className={s.footer}>
            <div className={s.footer__container}>
                <div className={s.content__left}>
                    <span className={s.content__left__text}>© 2021 All rights reserved</span>
                </div>
                <div className={s.content__right}>
                    <div className={s.content__right__item}>
                        <AiFillMail className={s.content__right__icon} />
                        <span className={s.content__right__text}>example@gmail.com</span>
                    </div>
                    <div className={s.content__right__item}>
                        <AiFillPhone className={`${s.content__right__icon} ${s.icon__phone}`} />
                        <span className={s.content__right__text}>555-55-55-55</span>
                    </div>
                </div>
            </div>
        </div>
    )
}