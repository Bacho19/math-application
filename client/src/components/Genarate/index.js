import React, { useState, useCallback, useEffect } from 'react'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { Loader } from '../Loader'
import { useMessage } from '../../hooks/message.hook'
import s from './style/Generate.module.css'

export default function Generate() {
  const history = useHistory()

  const message = useMessage()

  const { request, loading, error, clearError } = useHttp()
  const [title, setTitle] = useState('')
  const [titleNum, setTitleNum] = useState('')
  const [url, setUrl] = useState('')
  const [taskTitle, setTaskTitle] = useState('')
  const [taskContent, setTaskContent] = useState(``)
  const [taskHint, setTaskHint] = useState('')

  const [selectedToc, setSelectedToc] = useState()

  const [tocsList, setTocsList] = useState([])

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/tasks/toc', 'GET', null)
      setTocsList(fetched)
    } catch (e) {}
  }, [request])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if (loading) {
    return <Loader />
  }

  // const createDocHandler = async () => {
  //     try {
  //         await request('/api/tasks/generate', 'POST', {title, url})
  //         history.push('/toc')
  //         window.M.toast({html: 'Topic added'})
  //     } catch (e) {}
  // }

  const createDocHandler = async () => {
    try {
      await request('/api/tasks/generate', 'POST', { title, titleNum, url })
      setTitle('')
      setUrl('')
      history.push('/toc')
      window.M.toast({ html: 'Topic added' })
    } catch (e) {}
  }

  const addTaskHandler = async () => {
    try {
      await request('/api/tasks/generate/task', 'POST', {
        selectedToc: selectedToc.value,
        taskTitle,
        taskContent,
        taskHint,
      })
      setTaskTitle('')
      setTaskContent('')
      history.push('/toc')
      window.M.toast({ html: 'Taks added' })
    } catch (e) {}
  }

  const options = tocsList.map((item) => {
    return {
      value: item.title,
      label: item.title,
    }
  })

  return (
    <div>
      <div className={s.generate__wrapper}>
        <h2 className={s.generate__title}>Create a topic</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Text a topic"
        />
        <input
          type="text"
          value={titleNum}
          onChange={(e) => setTitleNum(e.target.value)}
          placeholder="Text number of the topic"
        />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Text topic's url"
        />
        <button
          className={`waves-effect waves-light btn ${s.generate__button}`}
          onClick={createDocHandler}
        >
          Create the topic
        </button>
      </div>
      <div className={s.generate__wrapper}>
        <h2 className={s.generate__title}>Add a task</h2>
        <Select
          options={options}
          className={s.select}
          placeholder="Choise a topic"
          onChange={setSelectedToc}
          searchable
        />
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Text a task's title"
        />
        <input
          type="text"
          value={taskContent}
          onChange={(e) => setTaskContent(e.target.value)}
          placeholder="Paste a task's latex code"
        />
        <input
          type="text"
          value={taskHint}
          onChange={(e) => setTaskHint(e.target.value)}
          placeholder="Text a prompt"
        />
        <button
          className={`waves-effect waves-light btn ${s.generate__button}`}
          onClick={addTaskHandler}
        >
          Add the task
        </button>
      </div>
    </div>
  )
}
