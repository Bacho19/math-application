import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import NotAuthHomePage from './pages/NotAuthHomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import VerifyPage from "./pages/VerifyPage";
import TocPage from "./pages/TocPage";
import GeneratePage from "./pages/GeneratePage";
import TasksPage from "./pages/TasksPage";

export const useRoutes = (isAuthenticated, isAdmin) => {
    if (isAuthenticated) {
        return(
            <Switch>
                <Route path="/profile" exact><ProfilePage /></Route>
                <Route path="/toc" exact><TocPage /></Route>
                <Route path="/toc/:url"><TasksPage /></Route>
                {isAdmin && <Route path="/generate"><GeneratePage /></Route>}
                <Redirect to="/profile" />
            </Switch>
        )
    }
    return(
        <Switch>
            <Route path="/" exact><NotAuthHomePage /></Route>
            <Route path="/signup" exact><SignUpPage /></Route>
            <Route path="/login" exact><LoginPage /></Route>
            <Route path="/verify-email/:emailToken"><VerifyPage /></Route>
            <Redirect to="/" />
        </Switch>
    )
}
