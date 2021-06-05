import React, { useState, useEffect } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'
import { useHistory } from 'react-router-dom'
import s from './style/SignUp.module.css'

export default function SignUp() {
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  let history = useHistory()

  const registerHandler = async () => {
    try {
      await request('api/auth/register', 'POST', { ...form })
      window.M.toast({
        html: 'A link to verify your account has been sent to your email',
      })
      history.push('/login')
    } catch (e) {}
  }

  return (
    <div>
      <h2 className={s.signup__title}>Sign up</h2>
      <div className={s.form__wrapper}>
        <form className={s.form}>
          <input
            type="text"
            name="username"
            className={s.form__input}
            placeholder="Username"
            value={form.username}
            onChange={changeHandler}
          />
          <input
            type="email"
            name="email"
            className={s.form__input}
            placeholder="Email"
            value={form.email}
            onChange={changeHandler}
          />
          <input
            type="password"
            name="password"
            className={s.form__input}
            placeholder="Password"
            value={form.password}
            onChange={changeHandler}
          />
          <button
            className={s.form__btn}
            onClick={registerHandler}
            disabled={loading}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  )
}
