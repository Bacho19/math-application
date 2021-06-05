import React from 'react'
import TaskCard from '../TaskCard'
import s from './style/TasksList.module.css'

export default function TasksList({ tasks }) {
    return(
        <div>
            {tasks.tasks && tasks.tasks.length ? tasks.tasks.map((task, index) => {
                return <TaskCard task={task} index={index + 1} key={index} />
            }): <p className={s.noTasksText}>Задач пока нет..</p>}
        </div>
    )
}