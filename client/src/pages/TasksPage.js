import React, {useState, useCallback, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import TasksList from "../components/TasksList";

function TasksPage() {
    const {request, loading} = useHttp()
    const [tasks, setTasks] = useState([])
    const tasksUrl = useParams().url

    const getTasks = useCallback(async () => {
        try {
            const fetched = await request(`/api/tasks/toc/${tasksUrl}`, 'GET', null)
            setTasks(fetched)
        } catch (e) {}
    }, [tasksUrl, request])

    useEffect(() => {
        getTasks()
    }, [getTasks])

    if (loading) {
        return <Loader />
    }

    return(
        <div>
            {!loading && <TasksList tasks={tasks} />}
        </div>
    )
}

export default TasksPage