import React, { useContext, useState, useCallback, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import s from './style/IsAuthNavbar.module.css'
import { useHttp } from '../../hooks/http.hook'
import { Loader } from '../Loader'

export function IsAuthNavbar() {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { token } = useContext(AuthContext)

  const onLogout = (event) => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  const [currentUser, setCurrentUser] = useState(null)

  const { request, loading } = useHttp()
  const [adminReady, setAdminReady] = useState(false)

  const fetchUser = useCallback(async () => {
    try {
      const fetched = await request('/api/auth/get-user', 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setCurrentUser(fetched)
      setAdminReady(true)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  if (loading || !adminReady) {
    return <Loader />
  }

  return (
    <div className={s.navbar}>
      <div className={s.logo}>Math</div>
      <div className={s.menu}>
        <li className={s.li}>
          <NavLink
            to="/profile"
            className={s.item}
            activeClassName={s.active__item}
          >
            Profile
          </NavLink>
        </li>
        <li className={s.li}>
          <NavLink
            to="/toc"
            className={s.item}
            activeClassName={s.active__item}
          >
            Topics
          </NavLink>
        </li>
        {currentUser && currentUser.isAdmin && (
          <li className={s.li}>
            <NavLink
              to="/generate"
              className={s.item}
              activeClassName={s.active__item}
            >
              Add tasks
            </NavLink>
          </li>
        )}
      </div>
      <a href="/" className={s.btn} onClick={onLogout}>
        Logout
      </a>
    </div>
  )
}
