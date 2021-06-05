import React from 'react'
import s from './style/TocPagination.module.css'

export default function TocPagination({ titlesPerPage, totalTitles, paginate }) {

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalTitles / titlesPerPage); i++) {
        pageNumbers.push(i)
    }

    return(
        <div className={s.pagination__wrapper}>
            <ul className="pagination">
                {pageNumbers.map(number =>(
                    <li key={number} className="waves-effect active" style={{marginRight: '7px'}}>
                        <a onClick={() => paginate(number)} className="teal lighten-2">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}