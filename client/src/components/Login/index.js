import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/authContext'
import { useMessage } from '../../hooks/message.hook'
import s from './style/Login.module.css'

export default function Login() {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, request, clearError, error } = useHttp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [lToken, setLToken] = useState('')

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const LoginHandler = async (e) => {
    try {
      e.preventDefault()
      const data = await request('api/auth/login', 'POST', { email, password })
      auth.login(data.token, data.userId)
      setLToken(data.userId)
    } catch (e) {}
  }

  return (
    <div>
      <h2 className={s.login__title}>Login</h2>
      <div className={s.form__wrapper}>
        <form className={s.form}>
          <input
            type="email"
            name="email"
            className={s.form__input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            className={s.form__input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={s.form__btn}
            onClick={LoginHandler}
            disabled={loading}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
