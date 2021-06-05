import React, {useState, useEffect, useCallback} from 'react'
import {useAuth} from "../../hooks/auth.hook";
import {useHttp} from "../../hooks/http.hook";
import {Loader} from "../Loader";
import s from './style/Profile.module.css'

export default function Profile() {

    const {token} = useAuth()
    const {request, loading} = useHttp()
    const [adminReady, setAdminReady] = useState(false)

    const [currentUser, setCurrentUser] = useState(null)
    const fetchUser = useCallback(async () => {
        try {
            const fetched = await request('/api/auth/get-user', 'GET', null, {
                Authorization: `Bearer ${token}`
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
    // setTimeout(() => {
    //     if (currentUser === null) {
    //         return logout()
    //     }
    // }, 5700)
    return(
        <div className={s.wrapper}>
            <div className={s.info}>
                <img src={"images/profile-img.png"} className={s.info__img} alt="profile-image"/>
                <div className={s.info__text}>
                    <p className={s.info__text__item}>
                        <span className={s.info__text__span}>Nickname:</span>{currentUser && !loading && currentUser.username}
                    </p>
                    <p className={s.info__text__item}>
                        <span className={s.info__text__span}>E-mail:</span>{currentUser && !loading && currentUser.email}
                    </p>
                    <p className={s.info__text__item} style={{marginTop: '20px'}}>
                        {currentUser && !loading && currentUser.isAdmin && <span className={s.info__text__span__admin}>ADMIN</span>}
                    </p>
                </div>
            </div>
        </div>
    )
}