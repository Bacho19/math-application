import React, { useState } from 'react'
import MathJax from 'react-mathjax'
import { FaLightbulb } from 'react-icons/fa'
import s from './style/TaskCard.module.css'

export default function TaskCard({ task, index }) {
  const [showHint, setShowHint] = useState(false)

  const hintHandler = (e) => {
    e.preventDefault()
    setShowHint(!showHint)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.task__name}>
        #{index}. {task.name}
      </div>
      <div className={s.task__content}>
        <MathJax.Provider>
          <MathJax.Node formula={task.task} />
        </MathJax.Provider>
      </div>
      <div className={s.task__footer}>
        <div className={s.task__hint}>
          <a href="#" onClick={hintHandler} className={s.task__footer__link}>
            <FaLightbulb className={s.idea} /> <span>Prompt</span>
          </a>
          {showHint && <div className={s.task__hint__content}>{task.hint}</div>}
        </div>
      </div>
    </div>
  )
}
