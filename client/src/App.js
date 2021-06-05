import React, {useState, useEffect, useCallback} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/authContext";
import {IsAuthNavbar} from "./components/IsAuthNavbar";
import {NotAuthNavbar} from "./components/NotAuthNavbar";
import {Footer} from './components/Footer'
import {Loader} from "./components/Loader";
import {useHttp} from "./hooks/http.hook";
import 'materialize-css'

function App() {
    const {token, login, logout, userId, ready} = useAuth()
    const {request, loading} = useHttp()
    const isAuthenticated = !!token
    const [adminReady, setAdminReady] = useState(false)

    const [currentUser, setCurrentUser] = useState(null)
    const fetchUser = useCallback(async () => {
        try {
            if (isAuthenticated) {
                const fetched = await request('/api/auth/get-user', 'GET', null, {
                    Authorization: `Bearer ${token}`
                })
                setCurrentUser(fetched)
                setAdminReady(true)
            }
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])
    const routes = useRoutes(isAuthenticated, currentUser && currentUser.isAdmin)

    if (isAuthenticated && loading) {
        return <Loader />
    }

    if (isAuthenticated && !ready) {
        return <Loader />
    }

    if (isAuthenticated && !adminReady) {
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <Router>
                <div className="body">
                    <div className="app">
                        {isAuthenticated ? <IsAuthNavbar />: <NotAuthNavbar />}
                        { routes }
                    </div>
                    <Footer />
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App