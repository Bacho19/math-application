import React, {useEffect} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useParams, useHistory} from 'react-router-dom'
import {useMessage} from '../hooks/message.hook'

const VerifyPage = () => {

    const {request, error, clearError} = useHttp()
    const message = useMessage()
    const history = useHistory()

    const emailToken = useParams().emailToken

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const verifyHandler = async () => {
        try {
            await request(`/api/auth/verify-email/${emailToken}`, 'GET') //, { emailToken: emailToken }
            history.push('/login')
            window.M.toast({html: 'Аккаунт активирован'})
        } catch (e) {}
    }

    const style = {
        verifyWrapper: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px'
        },
        verifyLink: {
            color: '#ffffff',
            backgroundColor: '#455a64',
            padding: '15px 12px',
            fontSize: '20px',
            borderRadius: '15px'
        }
    }

    return(
        <div style={style.verifyWrapper}>
            <a href="#" onClick={verifyHandler} style={style.verifyLink}>
                Активировать аккаунт
            </a>
        </div>
    )
}

export default VerifyPage