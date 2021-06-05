import React from 'react'
import {Link} from 'react-router-dom'
import s from './style/TitlesList.module.css'

export default function TitlesList({ titles }) {
    return(
        <div className={s.link__wrapper}>
            { titles.map((title, index) => {
                return(<Link to={`/toc/${title.url}`} key={title._id} className={s.link__item}>§{title.titleNum} {title.title}</Link>)
            })}
        </div>
    )  
}





